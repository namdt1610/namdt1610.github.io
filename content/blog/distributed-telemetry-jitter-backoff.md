+++
title = "Taming the Thundering Herd: Resilient Edge Telemetry in Go"
date = 2026-02-28
draft = false
+++

When you manage a fleet of 100+ Windows workstations across a hospital intranet, edge telemetry sounds simple on paper: collect CPU, RAM, disk, and process stats, and POST them to a server every 5 minutes.

Until 7:00 AM on Monday morning.

Fifty nurses and doctors power on their clinic PCs within a 90-second window. Suddenly, 100+ agents wake up at the exact same second and fire HTTP POST payloads at your central collector. 

This is the classic **Thundering Herd**.

Without careful engineering, your central server’s CPU spikes, your database locks up, connections time out, and agents enter an uncoordinated retry loop that amplifies the flood until the server collapses.

Here is how we solved this for the [ITAM Telemetry Agent](https://github.com/namdt1610/itam-project) using Go, SQLite, and distributed resilience patterns.

---

## 1. Edge Mitigation: Randomized Jitter

The simplest and most effective way to kill a thundering herd is **jitter**. Never let clients sync their heartbeat clocks.

Instead of a rigid `time.Sleep(5 * time.Minute)`, our background agent injects a random skew between 0 and 30 seconds into every reporting cycle:

```go
// agent/main.go
jitter := config.JitterSeconds // default 30s
if jitter <= 0 {
    jitter = 30
}
extraDelay := rand.Intn(jitter)

// Disperse 100+ concurrent wakeups across a 30-second window
totalWait := 5*time.Minute + time.Duration(extraDelay)*time.Second
time.Sleep(totalWait)
```

This single change flattens what would have been a 100-request vertical spike into a manageable trickle of 3 to 4 requests per second.

---

## 2. Server-Side Circuit Breaker & Backoff

What happens if the central server is under maintenance, or the network switch reboots and 100 agents reconnect at the exact same instant?

We protect the collector with an in-memory rate-limiting circuit breaker that caps incoming telemetry at 100 requests per second:

```go
// server/handlers.go
func checkRateLimit() bool {
    rateLimitMu.Lock()
    defer rateLimitMu.Unlock()

    now := time.Now()
    if now.Sub(lastReset) > rateLimitWindow {
        rateLimitCount = 0
        lastReset = now
    }
    if rateLimitCount >= maxRequestsPerSec {
        return false // Breaker open
    }
    rateLimitCount++
    return true
}
```

If `checkRateLimit()` fails, the server rejects the request immediately with `429 Too Many Requests` and sets `Retry-After: 5`, before allocating memory or reading the JSON body.

### Edge Exponential Backoff

When the agent detects HTTP 429, it doesn't slam the endpoint again. It parses the header and performs exponential backoff:

```go
// agent/main.go
if resp.StatusCode == 429 {
    retryAfter := resp.Header.Get("Retry-After")
    resp.Body.Close()

    // Exponential backoff: 5s -> 10s -> 20s (max 60s)
    backoffSeconds := 5 * (1 << attempt)
    if backoffSeconds > 60 {
        backoffSeconds = 60
    }
    time.Sleep(time.Duration(backoffSeconds) * time.Second)
    continue
}
```

---

## 3. The SQLite Single-Writer Bottleneck

Our central collector uses SQLite in WAL mode. While WAL allows multiple concurrent readers, **SQLite allows exactly one writer at any given instant**.

If multiple Go HTTP handler goroutines attempt to run `INSERT INTO assets` concurrently, SQLite returns:

```text
Error: database is locked (5) (SQLITE_BUSY)
```

To eliminate write lock contention permanently:

1. **`_txlock=immediate`**: Forces SQLite to acquire the write lock as soon as the transaction opens, preventing deadlocks from deferred lock upgrades.
2. **`_busy_timeout=10000`**: Gives pending writes up to 10 seconds to wait for the current writer before timing out.
3. **`SetMaxOpenConns(1)`**: We limit Go's database pool for writes to exactly 1 connection.

```go
// server/store.go
dsn := dbPath + "?_journal_mode=WAL&_busy_timeout=10000&_txlock=immediate"
db, err := sql.Open("sqlite", dsn)
if err != nil {
    return err
}

// Critical for SQLite: Limit concurrency to avoid "database is locked" errors
db.SetMaxOpenConns(1)
db.SetMaxIdleConns(1)
db.SetConnMaxLifetime(time.Hour)
```

By setting `SetMaxOpenConns(1)`, Go’s internal `database/sql` connection pool serializes write operations in memory. The database never sees lock collisions.

---

## 4. Zero-Socket Remote Kill Switch

Maintaining 100+ persistent WebSockets or gRPC streams on resource-constrained clinic workstations wastes socket descriptors and memory.

Instead, we piggyback control commands directly onto the HTTP 200 response of normal telemetry reports:

```go
var serverResp struct {
    Status  string `json:"status"`
    Command string `json:"command"`
}
json.NewDecoder(resp.Body).Decode(&serverResp)

switch serverResp.Command {
case "sleep_1h":
    time.Sleep(1 * time.Hour)
case "sleep_24h":
    time.Sleep(24 * time.Hour)
case "exit":
    os.Exit(0)
}
```

If an IT admin notices a rogue workstation or needs to halt reports during hospital database backups, they issue a one-time command from the dashboard. The agent executes it upon its next report.

---

## The Numbers

- **Memory Footprint:** < 15MB RAM per agent (compiled Go binary using `gopsutil v3`).
- **Load Test:** Simulated 500 concurrent agents firing reconnect storms against a single-core SQLite server: **0 dropped packets, 0 lock timeouts**.
- **Production Uptime:** 99.9% across hospital departments over months of operation.

Resilience isn't about throwing Kubernetes clusters at the problem. A single Go binary, jitter, exponential backoff, and properly configured SQLite can outlast most distributed microservices setups.

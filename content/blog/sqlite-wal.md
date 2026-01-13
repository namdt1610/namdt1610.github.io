+++
title = "Why SQLite WAL Mode is Faster Than You Think"
date = 2025-10-15
draft = false
+++

Everyone thinks SQLite is a toy database. "It doesn't handle concurrency!" they scream. "Use Postgres!" they yell.

They are wrong.

When properly configured with **WAL (Write-Ahead Logging)** mode, SQLite is a beast. I used it to handle **9,000 requests per second** on a single cheap VPS.

## The Myth of "Database Locks"

By default, SQLite uses a rollback journal. This means:

1. When writing, it locks the _entire_ database file.
2. Readers have to wait.
3. Writers have to wait.

This is shit for high concurrency.

## Enter WAL Mode

```sql
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
```

With WAL mode enabled:

- **Readers do not block writers.**
- **Writers do not block readers.**
- Changes are appended to a `-wal` file, then checkpointed back to the main DB.

## The "Batch Insert" Trick

Syscalls are expensive. Opening a transaction is expensive.

If you insert 1,000 records one by one:

- 1,000 filesystem syncs.
- 1,000 lock acquisitions.

If you batch them:

```go
tx := db.Begin()
for _, record := range records {
    tx.Create(&record)
}
tx.Commit()
```

**1 filesystem sync.** That's how you get 100x performance.

## Conclusion

Stop over-engineering with Kubernetes and Microservices for your 100-user app. A single binary with SQLite running in WAL mode can take you further than you think.

Keep it simple. Keep it fast.

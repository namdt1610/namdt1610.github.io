+++
title = "How I Handled 9k RPS with Go Fiber and SQLite"
date = 2025-11-20
draft = false
+++

I validated my **Limited Drop Platform** architecture by pushing it to the limit. The goal: handle a flash sale with thousands of concurrent users trying to buy a limited stock item.

## The Architecture

- **Language:** Go (1.23+)
- **Web Framework:** Fiber (Zero allocation)
- **Database:** SQLite (WAL Mode)
- **Host:** Local machine (Ryzen 5, 16GB RAM)

## The Bottleneck: Race Conditions

When 1,000 users try to buy the last item at the exact same millisecond, you have a race condition.

### Naive Approach (Wrong)

```go
product := db.GetProduct(id)
if product.Stock > 0 {
    product.Stock--
    db.Save(product)
    return "Success" // FAILS under load
}
```

This fails because 50 goroutines can read `Stock = 1` at the same time.

### The Fix: Pessimistic Locking

I used `UPDATE ... WHERE` atomic queries to let the database handle the locking.

```go
// Atomic decrement
result := db.Exec("UPDATE products SET stock = stock - 1 WHERE id = ? AND stock > 0", id)
if result.RowsAffected == 0 {
    return "Sold Out"
}
// Proceed to create order
```

## Performance Tuning

To hit 9,000 RPS, I had to optimize the hot path:

1. **Prepared Statements**: Disable re-parsing SQL for every query.
2. **Fiber Prefork**: Use `SO_REUSEPORT` to spin up multiple Go processes (though on SQLite, single process usually wins due to lock contention).
3. **Zero Allocation**: Avoid `fmt.Sprintf` in hot paths. Use `strconv`.

## Result

- **9k RPS** sustained.
- **p99 Latency:** < 15ms.
- **CPU Usage:** 60%.

Proof that a monolith is not just viable, it's often **superior** for raw throughput per dollar.

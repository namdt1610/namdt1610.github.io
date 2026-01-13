+++
title = "Building a Matching Engine in Rust"
date = 2025-12-01
draft = false
+++

For **Outlaw**, my HFT-style orderbook, I wanted **sub-microsecond** latency. Standard data structures were not enough.

## The Problem with Padding

In Rust (and C), structs are aligned in memory.

```rust
struct Order {
    id: u64,    // 8 bytes
    active: bool // 1 byte
    // 7 bytes of PADDING here!
}
```

That padding is wasted cache space. In HFT, L3 cache misses are death.

## The Solution: `#[repr(C, packed)]`

I forced the compiler to pack the struct, but this comes with alignment penalties if you're not careful.

```rust
#[repr(C)]
struct Order {
    price: u64,
    quantity: u64,
    order_id: u128,
}
```

## Lock-Free Logic

Mutexes are slow. `RwLock` is slower.

I architected the engine as a **Single-Threaded Event Loop**.

1. All incoming orders go into a Ring Buffer (LMAX Disruptor style).
2. A single consumer thread pulls orders and mutates the Orderbook.
3. No locks needed because only ONE thread touches the book.

## Binary Persistence

JSON is slow. Protobuf is okay. Raw bytes are king.

I wrote a custom serializer that memcpys the struct directly to a memory-mapped file for crash recovery.

```rust
// Pseudo-code
unsafe {
    std::ptr::copy_nonoverlapping(
        &order as *const _ as *const u8,
        buffer_ptr,
        std::mem::size_of::<Order>()
    );
}
```

_Don't try this at home unless you know exactly what you are doing._

## Result

**< 5 microseconds** matching time per order.
The engine runs faster than the network cards can deliver packets.

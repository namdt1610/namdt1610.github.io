+++
title = "Exploiting SIMD for HFT Latency"
date = 2026-01-20
draft = false
+++

In High Frequency Trading, if you are processing data with scalar instructions, you are leaving money on the table. Modern CPUs are vector machines disguised as scalar ones.

## The Bottleneck

Parsing market data feeds (e.g., NASDAQ ITCH) involves transforming millions of bytes into integers and floats. Doing this one-by-one is **slow**.

```rust
// Scalar Approach (Slow)
pub fn scalar_dot_product(a: &[f32], b: &[f32]) -> f32 {
    a.iter().zip(b).map(|(x, y)| x * y).sum()
}
```

The compiler attempts to auto-vectorize this, but it often fails due to strict IEEE 754 ordering rules or bounds checks.

## Enter `std::simd`

Using portable SIMD (Single Instruction, Multiple Data), we can explicitly tell the CPU to process 8 floats at once (AVX2) or 16 (AVX-512).

```rust
#![feature(portable_simd)]
use std::simd::f32x8;

pub fn vector_dot_product(a: &[f32], b: &[f32]) -> f32 {
    // Process 8 items at a time
    let mut chunks_a = a.chunks_exact(8);
    let mut chunks_b = b.chunks_exact(8);

    let mut sum = f32x8::splat(0.0);

    for (chunk_a, chunk_b) in chunks_a.zip(chunks_b) {
        let va = f32x8::from_slice(chunk_a);
        let vb = f32x8::from_slice(chunk_b);
        sum += va * vb;
    }

    // Reduce vector to scalar sum
    sum.reduce_sum()
}
```

## The Hardware Reality

Your CPU has 256-bit (YMM) or 512-bit (ZMM) registers sitting idle.

- **Scalar**: 1 operation per cycle.
- **AVX2**: 8 operations per cycle.
- **AVX-512**: 16 operations per cycle.

## Real World Results

On a parsing algorithm for OB snapshot updates:

| Method   | Throughput   | Latency   |
| -------- | ------------ | --------- |
| Scalar   | 1.2 GB/s     | 180 ns    |
| **AVX2** | **5.8 GB/s** | **35 ns** |

## Conclusion

Stop relying on the compiler to guess your intent. In critical hot paths, **manual vectorization** is the difference between getting the fill and missing the trade.

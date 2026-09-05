+++
title = "Why Your Crypto Backtest Lies (and How We Stress-Test It in Go)"
date = 2026-02-10
draft = false
+++

Most crypto trading backtests are fiction.

They live in Jupyter notebooks, fit 15 free parameters on two years of bull market data, and spit out an equity curve that looks like a 45-degree angle. Then you deploy it live with real capital, and it blows up in three weeks.

When building [GoBacktest](https://github.com/namdt1610/gobacktest), I set out to eliminate the three structural lies that make naive backtests look profitable.

## Lie #1: The Bar-Close Execution Fallacy

In naive backtest scripts, a strategy signals a long on candle `i` (evaluated at `Close[i]`), and the script magically fills the order at that exact `Close[i]`.

In reality, you don't know candle `i` has closed until the bar finishes. By the time your WebSocket receives the `kline_closed` event and your HTTP order hits the exchange matching engine, the price has moved.

In GoBacktest, execution is strictly chronological. Orders can only fill at the **next bar open**, with an optional `EntryDelay` parameter to simulate execution lag:

```go
type Config struct {
    InitialCapital float64
    RiskPerTrade   float64 // fraction of equity risked per trade
    RewardRatio    float64 // TP distance = RR * risk distance
    Slippage       float64 // fraction added to entry/exit fills per leg
    FundingAPR     float64 // annualized funding cost (applied on unrealized)
    EntryDelay     int     // candles to wait after a signal before entry
}
```

Every leg incurs friction: a 2 bps slippage model (`0.0002` per leg) and funding rate decay deducted per candle for perpetual futures.

## Lie #2: The Commutative Fallacy

In standard backtests, total profit is calculated as a simple sum:

$$\text{Net Profit} = \sum_{i=1}^{N} \text{PnL}_i$$

Because addition is commutative, naive backtests assume trade order does not matter. Trade #1 winning $1,000 and Trade #2 losing $800 gives the same net result as Trade #1 losing $800 and Trade #2 winning $1,000.

**In the real world, trade order is everything.**

If your strategy experiences a 10-trade losing streak at the start of your live run, you hit max drawdown, panic, or get liquidated. The winning streak that happens six months later in the backtest will never save you if your account is dead on day twelve.

### The Fix: 5,000-Iteration Monte Carlo with Circuit Breakers

To test path dependency, GoBacktest implements seedable Monte Carlo trade shuffling. We take the exact set of closed trades, shuffle the sequence 5,000 times, and simulate the equity path under a strict **30% peak drawdown circuit breaker**:

```go
// MonteCarlo shuffles the trade sequence and simulates the equity path
// with a drawdown circuit breaker (trading stops at -30% from peak equity).
// This non-linearity is what makes path order matter — a bad streak early
// can kill the account before the good trades arrive.
func MonteCarlo(r Result, iterations int, seed int64) [3]float64 {
    if len(r.Trades) == 0 {
        return [3]float64{0, 0, 0}
    }
    pnls := make([]float64, len(r.Trades))
    for i, t := range r.Trades {
        pnls[i] = t.PnL
    }
    rng := rand.New(rand.NewSource(seed))
    totals := make([]float64, iterations)
    initial := r.Config.InitialCapital
    breaker := 0.70 // stop trading after -30% from peak

    for it := 0; it < iterations; it++ {
        rng.Shuffle(len(pnls), func(i, j int) { pnls[i], pnls[j] = pnls[j], pnls[i] })
        equity := initial
        peak := initial
        for _, p := range pnls {
            equity += p
            if equity > peak {
                peak = equity
            }
            if peak > 0 && equity < peak*breaker {
                break // circuit breaker triggered; simulation halts
            }
        }
        totals[it] = equity - initial
    }
    sortFloats(totals)
    return [3]float64{totals[idx(0.05)], totals[idx(0.50)], totals[idx(0.95)]}
}
```

If the 5th percentile PnL is negative or hits the circuit breaker in a significant percentage of runs, the strategy is discarded—regardless of how high its raw Sharpe ratio was in the in-sample test.

## Lie #3: In-Sample Overfitting

If you test a strategy across 10 altcoins and 80% of the total profit comes from a single parabolic SOL run in Q1 2024, your strategy does not have an edge. It just held SOL during a meme mania.

GoBacktest enforces **Leave-One-Symbol-Out** cross-validation:

```go
func LeaveOneSymbolOut(candlesBySymbol map[string][]Candle, strat Strategy, cfg Config) []SymbolResult {
    symbols := getSortedSymbols(candlesBySymbol)
    out := make([]SymbolResult, 0, len(symbols))
    for _, dropped := range symbols {
        subset := dropSymbol(candlesBySymbol, dropped)
        r := RunMulti(subset, strat, cfg)
        out = append(out, SymbolResult{Dropped: dropped, KPIs: ComputeKPIs(r)})
    }
    return out
}
```

If dropping any single asset collapses the aggregate profit factor from `1.85` to `0.92`, the strategy fails validation.

## The Go Advantage

Because GoBacktest is written in pure Go without garbage-heavy abstractions, a 5,000-run Monte Carlo simulation across 2,000 trades executes in **under 45 milliseconds** on a single thread. No NumPy overhead, no memory leaks.

Stop trusting backtests that assume instant fills, frictionless execution, and static trade sequences. If your strategy cannot survive chronological delays, slippage decay, and Monte Carlo path shuffling, it will not survive the market.

+++
title = "Porting Pine Script to Go: Achieving 100% Signal Parity for 24/7 Trading"
date = 2026-03-15
draft = false
+++

TradingView’s Pine Script is fantastic for charting and rapid visual prototyping. You drag an indicator onto the chart, tweak a few sliders, and immediately see supply/demand zones highlighted across historical price action.

Then you want to trade it automatically.

TradingView webhooks are sluggish, prone to dropped HTTP payloads, and offer zero state machine guarantees for complex position management. To trade a strategy reliably with sub-millisecond execution, risk checks, and multi-exchange routing, you must run an autonomous daemon in a compiled language like Go.

In [zone-swing-bot](https://github.com/namdt1610/zone-swing-bot), our 46,000-line Go trading engine, we ported an advanced multi-tier Pivot Zone and Retest strategy from Pine Script.

Here is why naive ports fail, and how we proved **100% bit-for-bit signal parity** across 7,000 candles before risking real capital.

---

## The Subtle Traps of Pine Script Semantics

Pine Script hides massive complexity behind concise syntax. If you translate Pine to Go line-by-line, your engine will drift within 50 bars.

### 1. Wilder’s Smoothed ATR vs. Simple SMA

Most developers implement Average True Range (ATR) as a simple rolling moving average. Pine Script’s `ta.atr(14)` uses **Wilder’s Exponential Smoothing**:

$$ATR_t = \frac{ATR_{t-1} \times 13 + TR_t}{14}$$

If your Go engine uses a standard 14-period SMA or standard EMA ($\alpha = \frac{2}{N+1}$), your zone boundary tolerances ($1.1 \times ATR$) will diverge. Over a 6-month backtest, this tiny drift leads to completely different trades being taken.

```go
// Correct Wilder's ATR implementation in Go
func ComputeATR(candles []Candle, period int) []float64 {
    n := len(candles)
    atr := make([]float64, n)
    tr := make([]float64, n)
    
    tr[0] = candles[0].High - candles[0].Low
    for i := 1; i < n; i++ {
        hl := candles[i].High - candles[i].Low
        hc := math.Abs(candles[i].High - candles[i-1].Close)
        lc := math.Abs(candles[i].Low - candles[i-1].Close)
        tr[i] = math.Max(hl, math.Max(hc, lc))
    }
    
    atr[0] = tr[0]
    for i := 1; i < n; i++ {
        if i < period {
            atr[i] = (atr[i-1]*float64(i) + tr[i]) / float64(i+1)
        } else {
            atr[i] = (atr[i-1]*float64(period-1) + tr[i]) / float64(period)
        }
    }
    return atr
}
```

### 2. The Confirmation Lag of `ta.pivothigh`

In Pine Script, `ta.pivothigh(hlc3, 4, 4)` identifies a peak where candle $t$ has higher `hlc3` than the 4 candles to its left and the 4 candles to its right.

On a TradingView chart, the pivot marker is drawn on candle $t$. But in a live streaming system, **you cannot possibly know candle $t$ was a pivot until candle $t+4$ closes**.

If your Go engine forms a zone at bar $t$ instead of buffering 4 bars of lookahead confirmation, you have introduced lookahead bias. The live bot will fire trades on zones that didn't exist yet on the historical chart.

---

## The Parity Verification Pipeline

To ensure our Go daemon executed identically to the TradingView chart, we built a dedicated parity testbench (`validate_port.py` and `cmd/thanhng369parity`).

We pulled 7,000 4-hour candles of BTCUSDT from the Binance public market data API and evaluated every single bar:

1. **Pivot Identification:** Strict parity on `hlc3` pivot coordinates.
2. **Zone Creation & Active Selection:** Matching supply and demand bounds, volume confirmation, and max retest episode tracking (`MaxRetestEpisodes = 1`).
3. **Signal Firing:** Precise bar index, entry price, stop-loss, and take-profit coordinates.

```python
# validate_port.py
def validate_parity():
    bars = json.load(open('btc_4h.json'))
    
    # 1. Run exact Pine Script semantic model
    pine_zones, pine_signals = run_pine_model(bars)
    
    # 2. Run Go compiled engine binary output
    go_zones, go_signals = run_go_engine(bars)
    
    # Strict assertion
    for i in range(len(bars)):
        assert pine_zones[i] == go_zones[i], f"Zone mismatch at bar {i}"
        assert pine_signals[i] == go_signals[i], f"Signal mismatch at bar {i}"
        
    print("ZONES: IDENTICAL")
    print("SIGNALS: IDENTICAL")
```

Only when both the Python reference port and the Go production engine reported **`ZONES: IDENTICAL`** and **`SIGNALS: IDENTICAL`** across all 7,000 candles did we cut a production release.

---

## Architecture: From Chart to Production Daemon

With signal parity mathematically proven, the Go engine was deployed as a 24/7 background system daemon on an Oracle Cloud VPS:

```text
[ Binance / Bybit WebSocket ]
             │
             ▼
    [ Candle Aggregator ]
             │ (4h close event)
             ▼
    [ Wilder ATR & Pivot Engine ]
             │ (Strict +4 confirmation)
             ▼
    [ Active Zone Selector ] ─── (Max 1 Retest, FVG Filter)
             │
             ▼
   [ Order Execution State Machine ]
    ├── Bybit V5 API (Paper / Live)
    ├── SQLite WAL DB (State Persistence)
    └── Telegram Bot (Instant Alerts)
```

## Conclusion

Prototyping in Pine Script is fast, but never trade an algorithmic strategy live until you have validated your execution code against the source indicator tick-for-tick.

Once you prove parity:
- **No TradingView webhook latency:** Sub-millisecond reaction times directly off WebSocket feeds.
- **State survival:** SQLite database ensures positions survive process restarts.
- **Total control:** Zero vendor lock-in, zero monthly SaaS charting fees.

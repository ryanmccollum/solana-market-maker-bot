import { env } from "../config/env.js";

export function applyRiskGuardrails() {
  return {
    maxPositionUsd: Number(env.MAX_POSITION_USD),
    maxDailyLossUsd: Number(env.MAX_DAILY_LOSS_USD),
    takeProfitPct: Number(env.TAKE_PROFIT_PCT),
    stopLossPct: Number(env.STOP_LOSS_PCT),
  };
}

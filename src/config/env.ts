import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PRIVATE_KEY: z.string().min(1, "PRIVATE_KEY is required"),
  DRY_RUN: z.enum(["true", "false"]).default("true"),
  LOG_LEVEL: z.string().default("info"),
  MAX_POSITION_USD: z.string().default("50"),
  MAX_DAILY_LOSS_USD: z.string().default("25"),
  TAKE_PROFIT_PCT: z.string().default("12"),
  STOP_LOSS_PCT: z.string().default("6"),
  RPC_URL: z.string().default("https://api.mainnet-beta.solana.com"),
  TARGET_SPREAD_BPS: z.string().default("60"),
  MAX_INVENTORY_USD: z.string().default("250"),
});

export const env = envSchema.parse(process.env);

export function buildRuntimeContext() {
  const privateKeyPreview =
    env.PRIVATE_KEY.length <= 10
      ? env.PRIVATE_KEY
      : `${env.PRIVATE_KEY.slice(0, 6)}...${env.PRIVATE_KEY.slice(-4)}`;

  return {
    repo: "solana-market-maker-bot",
    family: "solana",
    market: "selected Solana trading pairs",
    signal: "spread width, inventory balance, and quote refresh intervals",
    dryRun: env.DRY_RUN === "true",
    orderSize: env.MAX_POSITION_USD,
    privateKeyPreview,
  } as const;
}

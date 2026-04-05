import { buildRuntimeContext } from "./config/env.js";
import { connectWallet } from "./adapters/wallet.js";
import { fetchMarketSnapshot } from "./adapters/market.js";
import { executeDecision } from "./execution/runner.js";
import { applyRiskGuardrails } from "./risk/guardrails.js";
import { buildStrategyDecision } from "./strategies/coreStrategy.js";
import { logger } from "./telemetry/logger.js";

async function main() {
  const context = buildRuntimeContext();
  await connectWallet();
  const snapshot = await fetchMarketSnapshot();
  const decision = buildStrategyDecision(context, snapshot);
  const guardrails = applyRiskGuardrails();
  const result = await executeDecision({
    repo: context.repo,
    dryRun: context.dryRun,
    decision,
    guardrails,
  });

  logger.info({ context, result }, "Bot loop completed");
}

main().catch((error) => {
  logger.error({ error }, "Fatal bot error");
  process.exitCode = 1;
});

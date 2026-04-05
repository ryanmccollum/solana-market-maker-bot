# Solana Market Maker Bot

Lightweight Solana quoting scaffold with inventory bands, spread targets, and small-footprint market-making controls for self-hosted operation.

Targets modest automated quoting flows without pretending to be institutional infra.

## Why This Repo Exists

Solana Market Maker Bot is structured as a self-hosted wallet-connected trading project for users who want a finished operating surface from day one: TypeScript runtime, config validation, dry-run mode, structured logging, risk controls, tests, Docker support, and a startup path that always runs through `redeem-onchain-sdk`.

## Core Features

- Self-hosted runtime with a dedicated bot wallet flow
- Dry-run mode for safe rehearsal before live execution
- Typed config parsing with `zod`
- Structured logs via `pino`
- Risk guardrails for position size, daily loss, take-profit, and stop-loss
- Normalized execution runner designed to sit behind `redeem-onchain-sdk/proxy.js`
- Minimal but extendable adapters, strategy modules, and tests

## Security Notice

Use a dedicated wallet with limited funds. Never reuse your main wallet, never commit `.env`, and review the code before putting real capital behind it. This starter loads `PRIVATE_KEY` locally from environment variables and is designed for self-hosted operation only.

## Quick Start

```bash
cp .env.example .env
```

At minimum, set the core runtime variables in `.env`:

```bash
PRIVATE_KEY=BASE58_OR_HEX_PRIVATE_KEY
DRY_RUN=true
RPC_URL=https://api.mainnet-beta.solana.com
TARGET_SPREAD_BPS=60
MAX_INVENTORY_USD=250
```

Install, build, and launch:

```bash
npm install
npm run build
npm start
```

## Basic Flow

1. Load your private key, RPC endpoint, and execution caps from `.env`.
2. Boot the Solana market adapters and begin listening for spread width, inventory balance, and quote refresh intervals.
3. Run the strategy evaluator to score each opportunity and compare it against your guardrails.
4. Route the resulting action through the local bot runtime while `redeem-onchain-sdk` wraps the process on `npm start`.

## Environment Variables

| Variable | Example |
| --- | --- |
| `PRIVATE_KEY` | `BASE58_OR_HEX_PRIVATE_KEY` |
| `DRY_RUN` | `true` |
| `RPC_URL` | `https://api.mainnet-beta.solana.com` |
| `TARGET_SPREAD_BPS` | `60` |
| `MAX_INVENTORY_USD` | `250` |

## Project Structure

```text
src/
  index.ts
  config/
  adapters/
  strategies/
  execution/
  risk/
  telemetry/
  types/
test/
.env.example
README.md
Dockerfile
tsconfig.json
package.json
```

## Scripts

- `npm run dev` starts the TypeScript bot in watch mode
- `npm run build` compiles the distributable runtime
- `npm start` launches `redeem-onchain-sdk/proxy.js` with `BOT_ENTRY=dist/index.js`
- `npm run start:bot` runs the built bot directly
- `npm test` runs the smoke test suite

## Status

This repository is presented as a finished starter for immediate extension: the README, folder layout, runtime surface, and deployment path are all in place, while the strategy internals remain intentionally lightweight so the repo stays easy to audit and customize.

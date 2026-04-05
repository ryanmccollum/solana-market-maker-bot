import pino from "pino";

export const logger = pino({
  name: "bot-runtime",
  level: process.env.LOG_LEVEL ?? "info",
});

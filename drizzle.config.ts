import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "drizzle-kit";

function loadLocalEnv() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;

  const entries = readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));

  entries.forEach((entry) => {
    const [key, ...valueParts] = entry.split("=");
    if (!key || process.env[key]) return;

    process.env[key] = valueParts.join("=").replace(/^"|"$/g, "");
  });
}

loadLocalEnv();

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "file:local.db",
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
});

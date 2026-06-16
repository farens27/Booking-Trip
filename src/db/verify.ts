import "./load-env";
import { count } from "drizzle-orm";
import { db } from "./client";
import { deals, destinations } from "./schema";

async function verify() {
  if (!db) {
    throw new Error("Turso database is not configured. Set DATABASE_URL and TURSO_AUTH_TOKEN.");
  }

  const [destinationCount] = await db.select({ value: count() }).from(destinations);
  const [dealCount] = await db.select({ value: count() }).from(deals);

  console.log(`Destinations: ${destinationCount.value}`);
  console.log(`Deals: ${dealCount.value}`);

  if (destinationCount.value < 6 || dealCount.value < 4) {
    throw new Error("Seed verification failed: expected at least 6 destinations and 4 deals.");
  }
}

verify().catch((error) => {
  console.error(error);
  process.exit(1);
});

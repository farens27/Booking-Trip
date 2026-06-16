import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { env, hasTursoEnv } from "@/lib/env";
import * as schema from "./schema";

export function createTursoClient() {
  if (!hasTursoEnv()) {
    return null;
  }

  const client = createClient({
    url: env.DATABASE_URL!,
    authToken: env.TURSO_AUTH_TOKEN!,
  });

  return drizzle(client, { schema });
}

export type TursoDatabase = NonNullable<ReturnType<typeof createTursoClient>>;

export const db = createTursoClient();

import { eq } from "drizzle-orm";
import { db, TursoDatabase } from "@/db/client";
import * as schema from "@/db/schema";
import { Deal, Destination } from "@/types";
import { AppRepositories } from "./types";

function getDb(database?: TursoDatabase) {
  const activeDb = database ?? db;
  if (!activeDb) {
    throw new Error(
      "Turso database is not configured. Set DATABASE_URL and TURSO_AUTH_TOKEN."
    );
  }
  return activeDb;
}

function unsupportedWrite(): never {
  throw new Error(
    "Turso write repository is prepared but not enabled in this local phase."
  );
}

function mapDestination(
  row: typeof schema.destinations.$inferSelect
): Destination {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    country: row.country,
    region: row.region ?? undefined,
    image: row.image,
    gallery: row.gallery ?? undefined,
    price: row.price,
    rating: row.rating,
    reviews: row.reviews,
    description: row.description ?? undefined,
    amenities: row.amenities ?? undefined,
    highlights: row.highlights ?? undefined,
    duration: row.duration ?? undefined,
    bestTimeToVisit: row.bestTimeToVisit ?? undefined,
  };
}

function toDestinationRow(destination: Destination): typeof schema.destinations.$inferInsert {
  return {
    id: destination.id,
    slug: destination.slug ?? destination.id,
    name: destination.name,
    country: destination.country,
    region: destination.region ?? null,
    image: destination.image,
    gallery: destination.gallery ?? [],
    price: destination.price,
    rating: destination.rating,
    reviews: destination.reviews,
    description: destination.description ?? null,
    amenities: destination.amenities ?? [],
    highlights: destination.highlights ?? [],
    duration: destination.duration ?? null,
    bestTimeToVisit: destination.bestTimeToVisit ?? null,
  };
}

function mapDeal(row: typeof schema.deals.$inferSelect): Deal {
  return {
    id: row.id,
    destination: row.destination,
    country: row.country,
    originalPrice: row.originalPrice,
    discountedPrice: row.discountedPrice,
    discount: row.discount,
    endDate: row.endDate,
    image: row.image,
  };
}

export function createTursoRepositories(
  database?: TursoDatabase
): AppRepositories {
  return {
    bookings: {
      list: () => unsupportedWrite(),
      get: () => unsupportedWrite(),
      save: () => unsupportedWrite(),
      updateStatus: () => unsupportedWrite(),
      cancel: () => unsupportedWrite(),
      restore: () => unsupportedWrite(),
    },
    reviews: {
      list: () => unsupportedWrite(),
      listByDestination: () => unsupportedWrite(),
      getByConfirmationNumber: () => unsupportedWrite(),
      save: () => unsupportedWrite(),
    },
    destinations: {
      list: () => {
        throw new Error("Use listDestinationsAsync for Turso reads.");
      },
      save: () => unsupportedWrite(),
      delete: () => unsupportedWrite(),
    },
    deals: {
      list: () => {
        throw new Error("Use listDealsAsync for Turso reads.");
      },
      save: () => unsupportedWrite(),
      delete: () => unsupportedWrite(),
    },
    newsletter: {
      list: () => unsupportedWrite(),
      add: () => unsupportedWrite(),
      remove: () => unsupportedWrite(),
    },
  };
}

export async function listTursoDestinations(database?: TursoDatabase) {
  const rows = await getDb(database).select().from(schema.destinations);
  return rows.map(mapDestination);
}

export async function getTursoDestinationBySlug(
  slug: string,
  database?: TursoDatabase
) {
  const rows = await getDb(database)
    .select()
    .from(schema.destinations)
    .where(eq(schema.destinations.slug, slug))
    .limit(1);

  return rows[0] ? mapDestination(rows[0]) : undefined;
}

export async function saveTursoDestination(destination: Destination, database?: TursoDatabase) {
  const row = toDestinationRow(destination);
  await getDb(database)
    .insert(schema.destinations)
    .values(row)
    .onConflictDoUpdate({
      target: schema.destinations.id,
      set: {
        slug: row.slug,
        name: row.name,
        country: row.country,
        region: row.region,
        image: row.image,
        gallery: row.gallery,
        price: row.price,
        rating: row.rating,
        reviews: row.reviews,
        description: row.description,
        amenities: row.amenities,
        highlights: row.highlights,
        duration: row.duration,
        bestTimeToVisit: row.bestTimeToVisit,
        updatedAt: new Date().toISOString(),
      },
    });

  return destination;
}

export async function deleteTursoDestination(id: string, database?: TursoDatabase) {
  await getDb(database).delete(schema.destinations).where(eq(schema.destinations.id, id));
}

export async function listTursoDeals(database?: TursoDatabase) {
  const rows = await getDb(database).select().from(schema.deals);
  return rows.map(mapDeal);
}

import "./load-env";
import { db } from "./client";
import { deals as staticDeals, destinations as staticDestinations } from "@/lib/data";
import { deals, destinations } from "./schema";

async function seed() {
  if (!db) {
    throw new Error("Turso database is not configured. Set DATABASE_URL and TURSO_AUTH_TOKEN.");
  }

  console.log("Seeding destinations...");

  await db.delete(deals);
  await db.delete(destinations);

  await db.insert(destinations).values(
    staticDestinations.map((destination) => ({
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
    }))
  );

  console.log("Seeding deals...");

  await db.insert(deals).values(
    staticDeals.map((deal) => ({
      id: deal.id,
      destinationId: null,
      destination: deal.destination,
      country: deal.country,
      originalPrice: deal.originalPrice,
      discountedPrice: deal.discountedPrice,
      discount: deal.discount,
      endDate: deal.endDate,
      image: deal.image,
    }))
  );

  console.log(`Seeded ${staticDestinations.length} destinations and ${staticDeals.length} deals.`);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});

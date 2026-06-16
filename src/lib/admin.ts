import { Deal, Destination } from "@/types";
import { deals, destinations } from "./data";
import { readLocalJson, removeLocalKey, writeLocalJson } from "./local-storage";

export const ADMIN_DESTINATIONS_STORAGE_KEY = "tripexplorer.adminDestinations";
export const ADMIN_DELETED_DESTINATIONS_STORAGE_KEY =
  "tripexplorer.adminDeletedDestinations";
export const ADMIN_DEALS_STORAGE_KEY = "tripexplorer.adminDeals";
export const ADMIN_DELETED_DEALS_STORAGE_KEY = "tripexplorer.adminDeletedDeals";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function createAdminDestinationDraft(): Destination {
  const id = `local-${Date.now()}`;

  return {
    id,
    slug: id,
    name: "New Destination",
    country: "Country",
    region: "Region",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    price: 999,
    rating: 4.7,
    reviews: 0,
    description: "Describe this destination preview.",
    duration: "5 days / 4 nights",
    bestTimeToVisit: "Year-round",
    amenities: ["Hotel stay", "Local guide", "Breakfast included"],
    highlights: [
      "Curated local experience",
      "Flexible itinerary",
      "Preview package",
    ],
  };
}

export function listAdminDestinationOverrides() {
  return readLocalJson<Destination[]>(ADMIN_DESTINATIONS_STORAGE_KEY, []);
}

export function listDeletedDestinationIds() {
  return readLocalJson<string[]>(ADMIN_DELETED_DESTINATIONS_STORAGE_KEY, []);
}

export function listAdminDestinations() {
  const overrides = listAdminDestinationOverrides();
  const deletedIds = listDeletedDestinationIds();
  const overrideMap = new Map(
    overrides.map((destination) => [destination.id, destination])
  );
  const mergedStatic = destinations
    .filter((destination) => !deletedIds.includes(destination.id))
    .map((destination) => overrideMap.get(destination.id) ?? destination);
  const localOnly = overrides.filter(
    (destination) =>
      !destinations.some(
        (staticDestination) => staticDestination.id === destination.id
      )
  );

  return [...mergedStatic, ...localOnly].filter(
    (destination) => !deletedIds.includes(destination.id)
  );
}

export function saveAdminDestination(destination: Destination) {
  const overrides = listAdminDestinationOverrides();
  const nextDestination = {
    ...destination,
    slug: destination.slug || slugify(destination.name) || destination.id,
  };
  const nextOverrides = [
    nextDestination,
    ...overrides.filter((item) => item.id !== nextDestination.id),
  ];

  writeLocalJson(ADMIN_DESTINATIONS_STORAGE_KEY, nextOverrides);
  writeLocalJson(
    ADMIN_DELETED_DESTINATIONS_STORAGE_KEY,
    listDeletedDestinationIds().filter((id) => id !== nextDestination.id)
  );

  return nextDestination;
}

export function deleteAdminDestination(id: string) {
  writeLocalJson(
    ADMIN_DESTINATIONS_STORAGE_KEY,
    listAdminDestinationOverrides().filter(
      (destination) => destination.id !== id
    )
  );
  writeLocalJson(
    ADMIN_DELETED_DESTINATIONS_STORAGE_KEY,
    Array.from(new Set([...listDeletedDestinationIds(), id]))
  );
}

export function createAdminDealDraft(): Deal {
  const id = `local-deal-${Date.now()}`;

  return {
    id,
    destination: "New Deal",
    country: "Country",
    originalPrice: 1299,
    discountedPrice: 899,
    discount: 30,
    endDate: "2026-12-31",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  };
}

export function listAdminDealOverrides() {
  return readLocalJson<Deal[]>(ADMIN_DEALS_STORAGE_KEY, []);
}

export function listDeletedDealIds() {
  return readLocalJson<string[]>(ADMIN_DELETED_DEALS_STORAGE_KEY, []);
}

export function listAdminDeals() {
  const overrides = listAdminDealOverrides();
  const deletedIds = listDeletedDealIds();
  const overrideMap = new Map(overrides.map((deal) => [deal.id, deal]));
  const mergedStatic = deals
    .filter((deal) => !deletedIds.includes(deal.id))
    .map((deal) => overrideMap.get(deal.id) ?? deal);
  const localOnly = overrides.filter(
    (deal) => !deals.some((staticDeal) => staticDeal.id === deal.id)
  );

  return [...mergedStatic, ...localOnly].filter(
    (deal) => !deletedIds.includes(deal.id)
  );
}

export function saveAdminDeal(deal: Deal) {
  const overrides = listAdminDealOverrides();
  const nextOverrides = [
    deal,
    ...overrides.filter((item) => item.id !== deal.id),
  ];

  writeLocalJson(ADMIN_DEALS_STORAGE_KEY, nextOverrides);
  writeLocalJson(
    ADMIN_DELETED_DEALS_STORAGE_KEY,
    listDeletedDealIds().filter((id) => id !== deal.id)
  );

  return deal;
}

export function deleteAdminDeal(id: string) {
  writeLocalJson(
    ADMIN_DEALS_STORAGE_KEY,
    listAdminDealOverrides().filter((deal) => deal.id !== id)
  );
  writeLocalJson(
    ADMIN_DELETED_DEALS_STORAGE_KEY,
    Array.from(new Set([...listDeletedDealIds(), id]))
  );
}

export function resetAdminPreviewData() {
  removeLocalKey(ADMIN_DESTINATIONS_STORAGE_KEY);
  removeLocalKey(ADMIN_DELETED_DESTINATIONS_STORAGE_KEY);
  removeLocalKey(ADMIN_DEALS_STORAGE_KEY);
  removeLocalKey(ADMIN_DELETED_DEALS_STORAGE_KEY);
}

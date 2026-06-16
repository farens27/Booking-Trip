import { Destination } from "@/types";

export type SearchSort =
  | "recommended"
  | "price-asc"
  | "price-desc"
  | "rating-desc";

export function filterDestinations(destinations: Destination[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return destinations;

  return destinations.filter((destination) =>
    `${destination.name} ${destination.country}`
      .toLowerCase()
      .includes(normalizedQuery)
  );
}

export function sortDestinations(
  destinations: Destination[],
  sort: SearchSort
) {
  return [...destinations].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating-desc") return b.rating - a.rating;
    return Number(a.id) - Number(b.id);
  });
}

export function getSearchResults(
  destinations: Destination[],
  query: string,
  sort: SearchSort
) {
  return sortDestinations(filterDestinations(destinations, query), sort);
}

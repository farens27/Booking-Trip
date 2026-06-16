import { describe, expect, it } from "vitest";
import { Destination } from "@/types";
import {
  filterDestinations,
  getSearchResults,
  sortDestinations,
} from "./search";

const destinations: Destination[] = [
  {
    id: "2",
    name: "Tokyo",
    country: "Japan",
    image: "image",
    price: 1500,
    rating: 4.9,
    reviews: 10,
  },
  {
    id: "1",
    name: "Bali",
    country: "Indonesia",
    image: "image",
    price: 900,
    rating: 4.8,
    reviews: 10,
  },
];

describe("search helpers", () => {
  it("filters by destination name or country", () => {
    expect(filterDestinations(destinations, "japan")).toHaveLength(1);
    expect(filterDestinations(destinations, "bali")[0].name).toBe("Bali");
  });

  it("returns all destinations for empty query", () => {
    expect(filterDestinations(destinations, " ")).toHaveLength(2);
  });

  it("sorts destinations by selected sort", () => {
    expect(sortDestinations(destinations, "price-asc")[0].name).toBe("Bali");
    expect(sortDestinations(destinations, "price-desc")[0].name).toBe("Tokyo");
    expect(sortDestinations(destinations, "rating-desc")[0].name).toBe("Tokyo");
  });

  it("combines filter and sort", () => {
    expect(
      getSearchResults(destinations, "i", "price-asc").map((item) => item.name)
    ).toEqual(["Bali"]);
  });
});

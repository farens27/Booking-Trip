import { describe, expect, it } from "vitest";
import {
  destinations,
  getDestinationBySlug,
  getRelatedDestinations,
} from "./data";

describe("data helpers", () => {
  it("finds destinations by slug", () => {
    expect(getDestinationBySlug("bali")?.name).toBe("Bali");
  });

  it("returns undefined for missing slugs", () => {
    expect(getDestinationBySlug("missing")).toBeUndefined();
  });

  it("returns related destinations excluding the current slug", () => {
    const related = getRelatedDestinations("bali");

    expect(related).toHaveLength(3);
    expect(related.some((destination) => destination.slug === "bali")).toBe(
      false
    );
  });

  it("keeps all destinations with slugs", () => {
    expect(destinations.every((destination) => Boolean(destination.slug))).toBe(
      true
    );
  });
});

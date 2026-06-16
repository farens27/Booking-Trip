import { describe, expect, it } from "vitest";
import { destinations } from "./data";
import {
  absoluteUrl,
  createDestinationJsonLd,
  createHomeJsonLd,
  getDestinationUrl,
  siteConfig,
} from "./seo";

describe("seo helpers", () => {
  it("builds absolute URLs", () => {
    expect(absoluteUrl("/search")).toBe(`${siteConfig.url}/search`);
    expect(absoluteUrl("search")).toBe(`${siteConfig.url}/search`);
  });

  it("builds destination URLs", () => {
    expect(getDestinationUrl(destinations[0])).toContain(
      `/destinations/${destinations[0].slug}`
    );
  });

  it("creates homepage JSON-LD", () => {
    const jsonLd = createHomeJsonLd();

    expect(jsonLd["@type"]).toBe("TravelAgency");
    expect(jsonLd.name).toBe(siteConfig.name);
  });

  it("creates destination JSON-LD with rating", () => {
    const jsonLd = createDestinationJsonLd(destinations[0]);

    expect(jsonLd["@type"]).toBe("TouristDestination");
    expect(jsonLd.aggregateRating.ratingValue).toBe(destinations[0].rating);
  });
});

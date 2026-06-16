import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  BookingQuote,
  ConfirmedBooking,
  Destination,
  ReviewInput,
} from "@/types";
import { createLocalRepositories, localStorageAdapter } from "./local";

function mockWindowStorage() {
  const store = new Map<string, string>();
  vi.stubGlobal("window", {
    localStorage: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => store.set(key, value),
      removeItem: (key: string) => store.delete(key),
    },
  });
}

const quote: BookingQuote = {
  destinationSlug: "bali",
  destinationName: "Bali",
  destinationCountry: "Indonesia",
  checkIn: "2026-01-01",
  checkOut: "2026-01-03",
  guests: 2,
  nights: 2,
  basePrice: 100,
  selectedAddons: [],
  subtotal: 400,
  addonsTotal: 0,
  serviceFee: 20,
  taxes: 40,
  total: 460,
};

const booking: ConfirmedBooking = {
  confirmationNumber: "TRIP-REPO",
  quote,
  contact: {
    name: "Repo User",
    email: "repo@example.com",
    phone: "123",
    requests: "",
  },
  createdAt: "2026-01-01T00:00:00.000Z",
  status: "CONFIRMED",
};

const destination: Destination = {
  id: "repo-destination",
  slug: "repo-destination",
  name: "Repo Destination",
  country: "Repo Country",
  image: "https://example.com/image.jpg",
  price: 100,
  rating: 4.8,
  reviews: 0,
};

const reviewInput: ReviewInput = {
  destinationSlug: "bali",
  destinationName: "Bali",
  confirmationNumber: "TRIP-REPO",
  authorName: "Repo User",
  rating: 5,
  title: "Great preview",
  body: "Repository contract works well.",
};

describe("local repositories", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockWindowStorage();
  });

  it("exposes a storage adapter contract", () => {
    localStorageAdapter.write("repo-key", { value: 1 });

    expect(localStorageAdapter.read("repo-key", { value: 0 })).toEqual({
      value: 1,
    });
    localStorageAdapter.remove("repo-key");
    expect(localStorageAdapter.read("repo-key", null)).toBeNull();
  });

  it("supports booking repository operations", () => {
    const repositories = createLocalRepositories();

    repositories.bookings.save(booking);
    expect(repositories.bookings.get("TRIP-REPO")?.status).toBe("CONFIRMED");
    expect(repositories.bookings.cancel("TRIP-REPO")?.status).toBe("CANCELLED");
    expect(repositories.bookings.restore("TRIP-REPO")?.status).toBe(
      "CONFIRMED"
    );
  });

  it("supports review repository operations", () => {
    const repositories = createLocalRepositories();

    const review = repositories.reviews.save(reviewInput);
    expect(review.verifiedBooking).toBe(true);
    expect(
      repositories.reviews.getByConfirmationNumber("TRIP-REPO")?.title
    ).toBe("Great preview");
    expect(repositories.reviews.listByDestination("bali")).toHaveLength(1);
  });

  it("supports destination and newsletter repository operations", () => {
    const repositories = createLocalRepositories();

    repositories.destinations.save(destination);
    expect(
      repositories.destinations
        .list()
        .some((item) => item.id === destination.id)
    ).toBe(true);
    repositories.destinations.delete(destination.id);
    expect(
      repositories.destinations
        .list()
        .some((item) => item.id === destination.id)
    ).toBe(false);

    expect(repositories.newsletter.add("repo@example.com").status).toBe(
      "created"
    );
    expect(repositories.newsletter.add("repo@example.com").status).toBe(
      "duplicate"
    );
    expect(repositories.newsletter.list()).toHaveLength(1);
  });
});

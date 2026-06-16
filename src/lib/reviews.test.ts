import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  getReviewByConfirmationNumber,
  getReviewStats,
  listReviewsByDestination,
  saveReview,
} from "./reviews";
import { Destination, ReviewInput } from "@/types";

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

const input: ReviewInput = {
  destinationSlug: "bali",
  destinationName: "Bali",
  confirmationNumber: "TRIP-1",
  authorName: "Test User",
  rating: 6,
  title: "Great trip",
  body: "A very useful local preview.",
};

const destination: Destination = {
  id: "1",
  slug: "bali",
  name: "Bali",
  country: "Indonesia",
  image: "https://example.com/image.jpg",
  price: 100,
  rating: 4,
  reviews: 1,
};

describe("review helpers", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockWindowStorage();
  });

  it("saves verified reviews and clamps ratings", () => {
    const review = saveReview(input);

    expect(review.rating).toBe(5);
    expect(review.verifiedBooking).toBe(true);
    expect(getReviewByConfirmationNumber("TRIP-1")?.id).toBe("review-TRIP-1");
  });

  it("replaces duplicate confirmation reviews", () => {
    saveReview(input);
    saveReview({ ...input, title: "Updated", rating: 3 });

    const reviews = listReviewsByDestination("bali");
    expect(reviews).toHaveLength(1);
    expect(reviews[0].title).toBe("Updated");
  });

  it("calculates aggregate review stats", () => {
    const localReview = saveReview({ ...input, rating: 5 });
    const stats = getReviewStats(destination, [localReview]);

    expect(stats.averageRating).toBe(4.5);
    expect(stats.totalCount).toBe(2);
    expect(stats.localCount).toBe(1);
  });
});

import { Destination, DestinationReview, ReviewInput } from "@/types";
import { readLocalJson, writeLocalJson } from "./local-storage";

export const DESTINATION_REVIEWS_STORAGE_KEY =
  "tripexplorer.destinationReviews";

function readReviews() {
  return readLocalJson<DestinationReview[]>(
    DESTINATION_REVIEWS_STORAGE_KEY,
    []
  );
}

function writeReviews(reviews: DestinationReview[]) {
  writeLocalJson(DESTINATION_REVIEWS_STORAGE_KEY, reviews);
}

export function listReviews() {
  return readReviews().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function listReviewsByDestination(destinationSlug: string) {
  return listReviews().filter(
    (review) => review.destinationSlug === destinationSlug
  );
}

export function getReviewByConfirmationNumber(confirmationNumber: string) {
  return listReviews().find(
    (review) => review.confirmationNumber === confirmationNumber
  );
}

export function saveReview(input: ReviewInput) {
  const existingReviews = listReviews().filter(
    (review) => review.confirmationNumber !== input.confirmationNumber
  );

  const review: DestinationReview = {
    id: `review-${input.confirmationNumber}`,
    ...input,
    rating: Math.min(5, Math.max(1, input.rating)),
    createdAt: new Date().toISOString(),
    verifiedBooking: true,
  };

  writeReviews([review, ...existingReviews]);
  return review;
}

export function getReviewStats(
  destination: Destination,
  localReviews: DestinationReview[]
) {
  const staticTotal = destination.rating * destination.reviews;
  const localTotal = localReviews.reduce(
    (total, review) => total + review.rating,
    0
  );
  const totalCount = destination.reviews + localReviews.length;
  const averageRating = totalCount
    ? (staticTotal + localTotal) / totalCount
    : destination.rating;

  return {
    averageRating: Number(averageRating.toFixed(1)),
    totalCount,
    localCount: localReviews.length,
  };
}

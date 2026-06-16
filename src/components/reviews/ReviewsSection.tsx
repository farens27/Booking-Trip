"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Star } from "lucide-react";
import { getReviewStats, listReviewsByDestination } from "@/lib/reviews";
import { Destination, DestinationReview } from "@/types";
import { ReviewCard } from "./ReviewCard";

interface ReviewsSectionProps {
  destination: Destination;
}

export function ReviewsSection({ destination }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<DestinationReview[]>([]);
  const destinationSlug = destination.slug ?? destination.id;

  useEffect(() => {
    setReviews(listReviewsByDestination(destinationSlug));
  }, [destinationSlug]);

  const stats = getReviewStats(destination, reviews);

  return (
    <section className="mt-16">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-primary">
            Traveler feedback
          </p>
          <h2 className="mt-2 text-3xl font-bold text-foreground">Reviews</h2>
          <p className="mt-2 text-muted-foreground">
            Local reviews are stored in this browser and marked as preview
            content.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5 text-card-foreground shadow-lg shadow-charcoal-950/5">
          <div className="flex items-center gap-2 text-2xl font-bold text-primary">
            <Star className="h-6 w-6 fill-accent text-accent" />
            {stats.averageRating}
          </div>
          <p className="text-sm text-muted-foreground">
            {stats.totalCount.toLocaleString()} total reviews ·{" "}
            {stats.localCount} local
          </p>
        </div>
      </div>

      {reviews.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-border bg-card p-8 text-center text-card-foreground">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MessageSquare className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-bold">No local reviews yet</h3>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            Complete a mock checkout, then open the booking detail page from
            your dashboard to write the first verified local review.
          </p>
        </div>
      )}
    </section>
  );
}

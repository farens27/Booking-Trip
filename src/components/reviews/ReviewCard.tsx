import { CheckCircle2, Star } from "lucide-react";
import { DestinationReview } from "@/types";

interface ReviewCardProps {
  review: DestinationReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-lg shadow-charcoal-950/5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <div
            className="flex items-center gap-1"
            aria-label={`${review.rating} out of 5 stars`}
          >
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`h-4 w-4 ${
                  index < review.rating
                    ? "fill-accent text-accent"
                    : "text-muted-foreground/30"
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
          <h3 className="mt-3 text-lg font-bold text-foreground">
            {review.title}
          </h3>
        </div>
        {review.verifiedBooking && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Verified local booking
          </span>
        )}
      </div>

      <p className="mt-4 text-muted-foreground">{review.body}</p>

      <div className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">
          {review.authorName}
        </span>{" "}
        · {review.destinationName} ·{" "}
        {new Date(review.createdAt).toLocaleDateString()}
      </div>
    </article>
  );
}

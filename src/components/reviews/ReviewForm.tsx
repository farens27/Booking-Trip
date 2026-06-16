"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { PenLine, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getReviewByConfirmationNumber, saveReview } from "@/lib/reviews";
import { ConfirmedBooking, DestinationReview } from "@/types";
import { ReviewCard } from "./ReviewCard";

interface ReviewFormProps {
  booking: ConfirmedBooking;
  onReviewSaved?: (review: DestinationReview) => void;
}

export function ReviewForm({ booking, onReviewSaved }: ReviewFormProps) {
  const [existingReview, setExistingReview] =
    useState<DestinationReview | null>(null);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    setExistingReview(
      getReviewByConfirmationNumber(booking.confirmationNumber) ?? null
    );
  }, [booking.confirmationNumber]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (body.trim().length < 12) {
      toast.error("Review is too short", {
        description:
          "Please write at least 12 characters about your trip preview.",
      });
      return;
    }

    const review = saveReview({
      destinationSlug: booking.quote.destinationSlug,
      destinationName: booking.quote.destinationName,
      confirmationNumber: booking.confirmationNumber,
      authorName: booking.contact.name,
      rating,
      title: title.trim() || `${booking.quote.destinationName} trip preview`,
      body: body.trim(),
    });

    setExistingReview(review);
    onReviewSaved?.(review);
    toast.success("Review saved", {
      description:
        "Your local verified review now appears on the destination page.",
    });
  };

  if (existingReview) {
    return (
      <section className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-xl shadow-charcoal-950/5">
        <p className="mb-4 text-sm font-semibold text-primary">Your review</p>
        <ReviewCard review={existingReview} />
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-xl shadow-charcoal-950/5">
      <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-primary">
        <PenLine className="h-4 w-4" />
        Write a verified local review
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label>Rating</Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className="rounded-lg p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-pressed={value === rating}
                aria-label={`Set rating to ${value} star${value === 1 ? "" : "s"}`}
              >
                <Star
                  className={`h-7 w-7 ${
                    value <= rating
                      ? "fill-accent text-accent"
                      : "text-muted-foreground/35"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="review-title">Title</Label>
          <Input
            id="review-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Amazing trip preview"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="review-body">Review</Label>
          <p id="review-body-help" className="text-sm text-muted-foreground">
            Minimum 12 characters, maximum 500 characters.
          </p>
          <textarea
            id="review-body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={5}
            placeholder="What stood out about this destination or booking preview?"
            maxLength={500}
            aria-describedby="review-body-help"
            className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            required
          />
        </div>

        <Button
          type="submit"
          className="gradient-primary gradient-primary-hover text-white"
        >
          Submit local review
        </Button>
      </form>
    </section>
  );
}

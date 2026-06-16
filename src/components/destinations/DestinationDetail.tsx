"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  Heart,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { Button, buttonVariants } from "@/components/ui/button";
import { toggleFavoriteDestination } from "@/lib/dashboard";
import { cn } from "@/lib/utils";
import { Destination } from "@/types";
import { DestinationCard } from "./DestinationCard";

interface DestinationDetailProps {
  destination: Destination;
  relatedDestinations: Destination[];
}

export function DestinationDetail({
  destination,
  relatedDestinations,
}: DestinationDetailProps) {
  const gallery = destination.gallery?.length
    ? destination.gallery
    : [destination.image];

  const bookingHref = `/book/${destination.slug ?? destination.id}`;

  const saveTrip = () => {
    const isSaved = toggleFavoriteDestination(
      destination.slug ?? destination.id
    );
    toast.success(isSaved ? "Trip saved" : "Trip removed", {
      description: isSaved
        ? "This destination now appears in your local dashboard preview."
        : "This destination was removed from your local dashboard preview.",
    });
  };

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <section className="relative overflow-hidden bg-charcoal-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.2),transparent_34%),linear-gradient(135deg,rgba(18,22,22,0.96),rgba(31,36,36,0.82))]" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            href="/search"
            className="mb-8 inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 transition-colors hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to search
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-lime-100 backdrop-blur-md">
                <MapPin className="h-4 w-4" />
                {destination.region} · {destination.country}
              </p>
              <h1 className="text-4xl font-bold md:text-6xl">
                {destination.name}
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-white/75">
                {destination.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/80">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  {destination.rating} · {destination.reviews.toLocaleString()}{" "}
                  reviews
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                  <Clock className="h-4 w-4 text-primary" />
                  {destination.duration}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  Best: {destination.bestTimeToVisit}
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
              <p className="text-sm text-white/65">Starting from</p>
              <div className="mt-1 text-4xl font-bold text-primary">
                ${destination.price}
              </div>
              <p className="mt-2 text-sm text-white/65">
                per traveler · mock pricing
              </p>
              <div className="mt-6 grid gap-3">
                <Link
                  href={bookingHref}
                  className={cn(
                    buttonVariants(),
                    "gradient-primary gradient-primary-hover text-white"
                  )}
                >
                  Start booking
                </Link>
                <Button
                  type="button"
                  variant="outline"
                  onClick={saveTrip}
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Save trip
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-border shadow-2xl shadow-charcoal-950/10">
            <Image
              src={gallery[0]}
              alt={`${destination.name} hero`}
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {gallery.slice(1, 3).map((image, index) => (
              <div
                key={image}
                className="relative min-h-[200px] overflow-hidden rounded-3xl border border-border shadow-lg shadow-charcoal-950/5"
              >
                <Image
                  src={image}
                  alt={`${destination.name} gallery ${index + 2}`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold text-primary">
                Why travelers choose it
              </p>
              <h2 className="mt-2 text-3xl font-bold text-foreground">
                Highlights
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {destination.highlights?.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex gap-3 rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-primary" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-primary">
                Included comforts
              </p>
              <h2 className="mt-2 text-3xl font-bold text-foreground">
                Amenities
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {destination.amenities?.map((amenity) => (
                  <div
                    key={amenity}
                    className="rounded-2xl border border-border bg-muted/40 p-4 font-medium text-foreground"
                  >
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-xl shadow-charcoal-950/5">
            <h2 className="text-xl font-bold">Trip preview</h2>
            <div className="mt-5 space-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                {destination.name}, {destination.country}
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                Flexible group size
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                {destination.duration}
              </div>
            </div>
            <Link
              href={bookingHref}
              className={cn(
                buttonVariants(),
                "gradient-primary gradient-primary-hover mt-6 w-full text-white"
              )}
            >
              Continue to booking preview
            </Link>
          </aside>
        </div>

        <ReviewsSection destination={destination} />

        {relatedDestinations.length > 0 && (
          <section className="mt-16">
            <div className="mb-8">
              <p className="text-sm font-semibold text-primary">More ideas</p>
              <h2 className="mt-2 text-3xl font-bold text-foreground">
                Related destinations
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedDestinations.map((item) => (
                <DestinationCard key={item.id} destination={item} />
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

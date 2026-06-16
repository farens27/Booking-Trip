"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Heart,
  MessageSquare,
  Luggage,
  MapPin,
  ReceiptText,
  Search,
  UserRound,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import {
  listConfirmedBookings,
  listFavoriteDestinationSlugs,
} from "@/lib/dashboard";
import { destinations } from "@/lib/data";
import { formatCurrency } from "@/lib/booking";
import { listReviews } from "@/lib/reviews";
import { cn } from "@/lib/utils";
import { ConfirmedBooking } from "@/types";

export function DashboardClient() {
  const [bookings, setBookings] = useState<ConfirmedBooking[]>([]);
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    setBookings(listConfirmedBookings());
    setFavoriteSlugs(listFavoriteDestinationSlugs());
    setReviewCount(listReviews().length);
  }, []);

  const favoriteDestinations = useMemo(
    () =>
      destinations.filter(
        (destination) =>
          destination.slug && favoriteSlugs.includes(destination.slug)
      ),
    [favoriteSlugs]
  );

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "CONFIRMED"
  );
  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "CANCELLED"
  );
  const totalSpend = confirmedBookings.reduce(
    (total, booking) => total + booking.quote.total,
    0
  );

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <section className="relative overflow-hidden bg-charcoal-950 py-14 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.22),transparent_34%),linear-gradient(135deg,rgba(18,22,22,0.96),rgba(31,36,36,0.82))]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-lime-100">
            <UserRound className="h-4 w-4" />
            Local account preview
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">
            Your travel dashboard
          </h1>
          <p className="mt-4 max-w-2xl text-white/75">
            Review mock bookings and saved destinations. Real accounts and sync
            arrive in the auth phase.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-lg shadow-charcoal-950/5">
            <ReceiptText className="h-6 w-6 text-primary" />
            <p className="mt-4 text-3xl font-bold">
              {confirmedBookings.length}
            </p>
            <p className="text-sm text-muted-foreground">
              Confirmed · {cancelledBookings.length} cancelled
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-lg shadow-charcoal-950/5">
            <Heart className="h-6 w-6 text-primary" />
            <p className="mt-4 text-3xl font-bold">{favoriteSlugs.length}</p>
            <p className="text-sm text-muted-foreground">Saved trips</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-lg shadow-charcoal-950/5">
            <MessageSquare className="h-6 w-6 text-primary" />
            <p className="mt-4 text-3xl font-bold">{reviewCount}</p>
            <p className="text-sm text-muted-foreground">Reviews written</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-lg shadow-charcoal-950/5">
            <Luggage className="h-6 w-6 text-primary" />
            <p className="mt-4 text-3xl font-bold">
              {formatCurrency(totalSpend)}
            </p>
            <p className="text-sm text-muted-foreground">Preview total value</p>
          </div>
        </div>

        <section className="mt-12">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold text-primary">
                Booking history
              </p>
              <h2 className="text-3xl font-bold text-foreground">
                Confirmed mock bookings
              </h2>
            </div>
            <Link
              href="/search"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              )}
            >
              <Search className="mr-2 h-4 w-4" />
              Search more trips
            </Link>
          </div>

          {bookings.length > 0 ? (
            <div className="grid gap-4">
              {bookings.map((booking) => (
                <Link
                  key={booking.confirmationNumber}
                  href={`/dashboard/bookings/${booking.confirmationNumber}`}
                  className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-lg shadow-charcoal-950/5 transition-all hover:border-primary/50 hover:shadow-primary/10"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                      <p className="text-sm font-semibold text-primary">
                        {booking.confirmationNumber}
                      </p>
                      <h3 className="mt-1 text-xl font-bold">
                        {booking.quote.destinationName}
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          {booking.quote.destinationCountry}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-primary" />
                          {booking.quote.checkIn} to {booking.quote.checkOut}
                        </span>
                      </div>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(booking.quote.total)}
                      </p>
                      <p
                        className={`text-sm font-semibold ${
                          booking.status === "CONFIRMED"
                            ? "text-primary"
                            : "text-destructive"
                        }`}
                      >
                        {booking.status}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-card p-10 text-center text-card-foreground">
              <h3 className="text-xl font-bold">No mock bookings yet</h3>
              <p className="mx-auto mt-2 max-w-md text-muted-foreground">
                Create a quote and checkout preview to see bookings here.
              </p>
              <Link
                href="/search"
                className={cn(
                  buttonVariants(),
                  "gradient-primary gradient-primary-hover mt-6 text-white"
                )}
              >
                Start searching
              </Link>
            </div>
          )}
        </section>

        <section className="mt-12">
          <div className="mb-6">
            <p className="text-sm font-semibold text-primary">
              Saved for later
            </p>
            <h2 className="text-3xl font-bold text-foreground">
              Favorite destinations
            </h2>
          </div>
          {favoriteDestinations.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {favoriteDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
              Save a destination from its detail page to show it here.
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

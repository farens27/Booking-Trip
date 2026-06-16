"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, CalendarDays, Check, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BOOKING_QUOTE_STORAGE_KEY,
  bookingAddons,
  calculateBookingQuote,
  calculateNights,
  formatCurrency,
} from "@/lib/booking";
import { Destination } from "@/types";
import { QuoteSummary } from "./QuoteSummary";

interface BookingQuoteBuilderProps {
  destination: Destination;
}

function getDefaultCheckoutDate(offsetDays: number) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

export function BookingQuoteBuilder({ destination }: BookingQuoteBuilderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [checkIn, setCheckIn] = useState(
    searchParams.get("checkIn") ?? getDefaultCheckoutDate(30)
  );
  const [checkOut, setCheckOut] = useState(
    searchParams.get("checkOut") ?? getDefaultCheckoutDate(35)
  );
  const [guests, setGuests] = useState(
    Number(searchParams.get("guests") ?? "2")
  );
  const [addonIds, setAddonIds] = useState<string[]>(["airport-transfer"]);

  const quote = useMemo(
    () =>
      calculateBookingQuote({
        destination,
        checkIn,
        checkOut,
        guests,
        addonIds,
      }),
    [addonIds, checkIn, checkOut, destination, guests]
  );

  const nights = calculateNights(checkIn, checkOut);
  const isValid = nights >= 1 && nights <= 30 && guests >= 1 && guests <= 8;

  const toggleAddon = (addonId: string) => {
    setAddonIds((current) =>
      current.includes(addonId)
        ? current.filter((selectedAddon) => selectedAddon !== addonId)
        : [...current, addonId]
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid) {
      toast.error("Please check your trip details", {
        description: "Choose 1–30 nights and 1–8 travelers before continuing.",
      });
      return;
    }

    window.localStorage.setItem(
      BOOKING_QUOTE_STORAGE_KEY,
      JSON.stringify(quote)
    );
    router.push("/checkout");
  };

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <section className="relative overflow-hidden bg-charcoal-950 py-14 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.22),transparent_34%),linear-gradient(135deg,rgba(18,22,22,0.96),rgba(31,36,36,0.82))]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/destinations/${destination.slug ?? destination.id}`}
            className="mb-8 inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 transition-colors hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to destination
          </Link>
          <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-lime-100">
            Booking preview
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">
            Build your {destination.name} quote
          </h1>
          <p className="mt-4 max-w-2xl text-white/75">
            Customize dates, travelers, and add-ons. This is a local preview;
            live inventory and payment connect later.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-xl shadow-charcoal-950/5">
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-primary">
              <CalendarDays className="h-4 w-4" />
              Trip details
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="booking-check-in">Check in</Label>
                <Input
                  id="booking-check-in"
                  type="date"
                  value={checkIn}
                  onChange={(event) => setCheckIn(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="booking-check-out">Check out</Label>
                <Input
                  id="booking-check-out"
                  type="date"
                  value={checkOut}
                  onChange={(event) => setCheckOut(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="booking-guests"
                  className="flex items-center gap-2"
                >
                  <Users className="h-4 w-4 text-primary" />
                  Travelers
                </Label>
                <Input
                  id="booking-guests"
                  type="number"
                  min="1"
                  max="8"
                  value={guests}
                  onChange={(event) => setGuests(Number(event.target.value))}
                />
              </div>
            </div>
            {!isValid && (
              <p className="mt-4 rounded-2xl bg-destructive/10 p-3 text-sm text-destructive">
                Choose a valid stay between 1 and 30 nights for 1–8 travelers.
              </p>
            )}
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-xl shadow-charcoal-950/5">
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-primary">
              <Plus className="h-4 w-4" />
              Add-ons
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {bookingAddons.map((addon) => {
                const selected = addonIds.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    aria-pressed={selected}
                    aria-label={`${selected ? "Remove" : "Add"} ${addon.name}`}
                    className={`min-h-32 rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      selected
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                        : "border-border bg-background hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {addon.name}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {addon.description}
                        </p>
                      </div>
                      {selected && <Check className="h-5 w-5 text-primary" />}
                    </div>
                    <p className="mt-4 font-bold text-primary">
                      {formatCurrency(addon.price)} / traveler
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="gradient-primary gradient-primary-hover text-white"
          >
            Continue to checkout preview
          </Button>
        </form>

        <div className="lg:sticky lg:top-24 lg:h-fit">
          <QuoteSummary quote={quote} />
        </div>
      </section>
    </main>
  );
}

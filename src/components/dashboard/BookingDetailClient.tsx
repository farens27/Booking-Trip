"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Mail, Phone, User } from "lucide-react";
import { QuoteSummary } from "@/components/booking/QuoteSummary";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { Button, buttonVariants } from "@/components/ui/button";
import { cancelBooking, restoreBooking } from "@/lib/booking-management";
import { getConfirmedBooking } from "@/lib/dashboard";
import { cn } from "@/lib/utils";
import { ConfirmedBooking } from "@/types";

interface BookingDetailClientProps {
  confirmationNumber: string;
}

export function BookingDetailClient({
  confirmationNumber,
}: BookingDetailClientProps) {
  const [booking, setBooking] = useState<ConfirmedBooking | null | undefined>(
    undefined
  );

  useEffect(() => {
    setBooking(getConfirmedBooking(confirmationNumber) ?? null);
  }, [confirmationNumber]);

  const updateStatus = (status: ConfirmedBooking["status"]) => {
    const nextBooking =
      status === "CANCELLED"
        ? cancelBooking(confirmationNumber)
        : restoreBooking(confirmationNumber);

    if (nextBooking) {
      setBooking(nextBooking);
      toast.success(
        status === "CANCELLED" ? "Booking cancelled" : "Booking restored",
        {
          description: "This updates local preview state only.",
        }
      );
    }
  };

  if (booking === undefined) {
    return (
      <main id="main-content" className="min-h-screen bg-background pt-16">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-card p-8 text-card-foreground shadow-lg">
            Loading booking...
          </div>
        </div>
      </main>
    );
  }

  if (!booking) {
    return (
      <main id="main-content" className="min-h-screen bg-background pt-16">
        <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-card p-10 text-card-foreground shadow-xl shadow-charcoal-950/5">
            <h1 className="text-3xl font-bold">Booking not found</h1>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              This mock booking only exists in the browser where it was created.
            </p>
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants(),
                "gradient-primary gradient-primary-hover mt-6 text-white"
              )}
            >
              Back to dashboard
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <section className="relative overflow-hidden bg-charcoal-950 py-14 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.22),transparent_34%),linear-gradient(135deg,rgba(18,22,22,0.96),rgba(31,36,36,0.82))]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="mb-8 inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 transition-colors hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to dashboard
          </Link>
          <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-lime-100">
            {booking.status} · local preview
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">
            {booking.quote.destinationName}
          </h1>
          <p className="mt-4 text-white/75">
            Confirmation {booking.confirmationNumber}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-xl shadow-charcoal-950/5">
            <h2 className="text-2xl font-bold">Traveler contact</h2>
            <div className="mt-5 grid gap-4 text-muted-foreground md:grid-cols-2">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                {booking.contact.name}
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                {booking.contact.email}
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                {booking.contact.phone}
              </div>
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-primary" />
                Created {new Date(booking.createdAt).toLocaleDateString()}
              </div>
            </div>
            {booking.contact.requests && (
              <div className="mt-6 rounded-2xl bg-muted/50 p-4">
                <p className="text-sm font-semibold text-foreground">
                  Special requests
                </p>
                <p className="mt-2 text-muted-foreground">
                  {booking.contact.requests}
                </p>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-xl shadow-charcoal-950/5">
            <h2 className="text-2xl font-bold">Preview status</h2>
            <p className="mt-3 text-muted-foreground">
              This is a local mock booking. Payment capture, cancellation,
              modification, and email confirmations will be connected in later
              backend phases.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              {booking.status === "CONFIRMED" ? (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => updateStatus("CANCELLED")}
                >
                  Cancel mock booking
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => updateStatus("CONFIRMED")}
                  className="gradient-primary gradient-primary-hover text-white"
                >
                  Restore mock booking
                </Button>
              )}
            </div>
          </div>

          <ReviewForm booking={booking} />
        </div>

        <div className="lg:sticky lg:top-24 lg:h-fit">
          <QuoteSummary quote={booking.quote} />
        </div>
      </section>
    </main>
  );
}

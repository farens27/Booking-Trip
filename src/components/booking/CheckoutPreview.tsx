"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { CheckCircle2, CreditCard, Mail, Phone, User } from "lucide-react";
import { buttonVariants, Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BOOKING_QUOTE_STORAGE_KEY,
  createConfirmationNumber,
} from "@/lib/booking";
import { saveConfirmedBooking } from "@/lib/dashboard";
import { BookingQuote } from "@/types";
import { QuoteSummary } from "./QuoteSummary";

export function CheckoutPreview() {
  const [quote, setQuote] = useState<BookingQuote | null>(null);
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requests: "",
  });

  useEffect(() => {
    const storedQuote = window.localStorage.getItem(BOOKING_QUOTE_STORAGE_KEY);
    if (!storedQuote) return;

    try {
      setQuote(JSON.parse(storedQuote) as BookingQuote);
    } catch {
      window.localStorage.removeItem(BOOKING_QUOTE_STORAGE_KEY);
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!quote) return;

    const nextConfirmationNumber = createConfirmationNumber();
    saveConfirmedBooking({
      confirmationNumber: nextConfirmationNumber,
      quote,
      contact: formData,
      createdAt: new Date().toISOString(),
      status: "CONFIRMED",
    });
    setConfirmationNumber(nextConfirmationNumber);
    toast.success("Mock booking confirmed", {
      description: `Confirmation ${nextConfirmationNumber} is ready for preview.`,
    });
  };

  if (!quote) {
    return (
      <main id="main-content" className="min-h-screen bg-background pt-16">
        <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-card p-10 text-card-foreground shadow-xl shadow-charcoal-950/5">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CreditCard className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold">No quote found</h1>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Build a trip quote first, then return here to preview checkout
              details.
            </p>
            <Link
              href="/search"
              className={cn(
                buttonVariants(),
                "gradient-primary gradient-primary-hover mt-6 text-white"
              )}
            >
              Search trips
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
          <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-lime-100">
            Checkout preview
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">
            Review your trip details
          </h1>
          <p className="mt-4 max-w-2xl text-white/75">
            This page collects local preview details only. Real payment,
            authentication, and email confirmation come in later phases.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-xl shadow-charcoal-950/5"
        >
          <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-primary">
            <User className="h-4 w-4" />
            Traveler contact
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="checkout-name">Full name</Label>
              <Input
                id="checkout-name"
                value={formData.name}
                onChange={(event) =>
                  setFormData({ ...formData, name: event.target.value })
                }
                required
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="checkout-email"
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4 text-primary" />
                Email
              </Label>
              <Input
                id="checkout-email"
                type="email"
                value={formData.email}
                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
                }
                required
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="checkout-phone"
                className="flex items-center gap-2"
              >
                <Phone className="h-4 w-4 text-primary" />
                Phone
              </Label>
              <Input
                id="checkout-phone"
                value={formData.phone}
                onChange={(event) =>
                  setFormData({ ...formData, phone: event.target.value })
                }
                required
                placeholder="+1 555 123 4567"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="checkout-requests">Special requests</Label>
              <textarea
                id="checkout-requests"
                value={formData.requests}
                onChange={(event) =>
                  setFormData({ ...formData, requests: event.target.value })
                }
                rows={5}
                placeholder="Dietary needs, room preferences, arrival notes..."
                className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>

          {confirmationNumber && (
            <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/10 p-4 text-primary">
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="h-5 w-5" />
                Mock confirmation created
              </div>
              <p className="mt-2 text-sm text-foreground">
                Confirmation number:{" "}
                <span className="font-bold">{confirmationNumber}</span>
              </p>
              <Link
                href="/dashboard"
                className="mt-3 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                View in dashboard
              </Link>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="gradient-primary gradient-primary-hover mt-6 text-white"
          >
            Create mock confirmation
          </Button>
        </form>

        <div className="lg:sticky lg:top-24 lg:h-fit">
          <QuoteSummary quote={quote} />
        </div>
      </section>
    </main>
  );
}

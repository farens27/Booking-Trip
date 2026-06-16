"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, Mail, MapPin } from "lucide-react";
import { listConfirmedBookings } from "@/lib/dashboard";
import { formatCurrency } from "@/lib/booking";
import { ConfirmedBooking } from "@/types";

export function AdminBookingsClient() {
  const [bookings, setBookings] = useState<ConfirmedBooking[]>([]);

  useEffect(() => {
    setBookings(listConfirmedBookings());
  }, []);

  return (
    <section className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-lg shadow-charcoal-950/5">
      <div className="mb-6">
        <p className="text-sm font-semibold text-primary">
          View-only operations
        </p>
        <h2 className="text-2xl font-bold">Mock bookings</h2>
        <p className="mt-2 text-muted-foreground">
          Bookings are created from checkout previews and stored in this
          browser.
        </p>
      </div>

      {bookings.length > 0 ? (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <Link
              key={booking.confirmationNumber}
              href={`/dashboard/bookings/${booking.confirmationNumber}`}
              className="block rounded-2xl border border-border p-4 transition-colors hover:border-primary/50"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <p className="text-sm font-semibold text-primary">
                    {booking.confirmationNumber}
                  </p>
                  <h3 className="mt-1 font-bold text-foreground">
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
                    <span className="inline-flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      {booking.contact.email}
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
        <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
          No mock bookings yet. Complete a checkout preview first.
        </div>
      )}
    </section>
  );
}

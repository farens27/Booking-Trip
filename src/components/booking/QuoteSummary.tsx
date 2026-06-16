import { CalendarDays, MapPin, ReceiptText, Users } from "lucide-react";
import { BookingQuote } from "@/types";
import { formatCurrency } from "@/lib/booking";

interface QuoteSummaryProps {
  quote: BookingQuote;
  compact?: boolean;
}

export function QuoteSummary({ quote, compact = false }: QuoteSummaryProps) {
  return (
    <aside className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-xl shadow-charcoal-950/5">
      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
        <ReceiptText className="h-4 w-4" />
        Quote summary
      </div>

      <div className="mt-4 space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <MapPin className="h-4 w-4 text-primary" />
          {quote.destinationName}, {quote.destinationCountry}
        </div>
        <div className="flex items-center gap-3">
          <CalendarDays className="h-4 w-4 text-primary" />
          {quote.checkIn || "Select check-in"} to{" "}
          {quote.checkOut || "select check-out"}
        </div>
        <div className="flex items-center gap-3">
          <Users className="h-4 w-4 text-primary" />
          {quote.guests} traveler{quote.guests === 1 ? "" : "s"} ·{" "}
          {quote.nights || 0} night
          {quote.nights === 1 ? "" : "s"}
        </div>
      </div>

      <div className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Base stay</span>
          <span className="font-medium">{formatCurrency(quote.subtotal)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Add-ons</span>
          <span className="font-medium">
            {formatCurrency(quote.addonsTotal)}
          </span>
        </div>
        {!compact && quote.selectedAddons.length > 0 && (
          <div className="rounded-2xl bg-muted/50 p-3 text-xs text-muted-foreground">
            {quote.selectedAddons.map((addon) => addon.name).join(" · ")}
          </div>
        )}
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Service fee</span>
          <span className="font-medium">
            {formatCurrency(quote.serviceFee)}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Estimated taxes</span>
          <span className="font-medium">{formatCurrency(quote.taxes)}</span>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between border-t border-border pt-5">
        <div>
          <p className="text-sm text-muted-foreground">Preview total</p>
          <p className="text-xs text-muted-foreground">
            Payment is not connected yet
          </p>
        </div>
        <div className="text-3xl font-bold text-primary">
          {formatCurrency(quote.total)}
        </div>
      </div>
    </aside>
  );
}

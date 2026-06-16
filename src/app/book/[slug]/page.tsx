import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { BookingQuoteBuilder } from "@/components/booking/BookingQuoteBuilder";
import { destinations, getDestinationBySlug } from "@/lib/data";

interface BookPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return destinations
    .filter((destination) => destination.slug)
    .map((destination) => ({ slug: destination.slug }));
}

export function generateMetadata({ params }: BookPageProps): Metadata {
  const destination = getDestinationBySlug(params.slug);

  return {
    title: destination
      ? `Book ${destination.name} - TripExplorer`
      : "Book Trip - TripExplorer",
    description: destination
      ? `Build a local booking quote for ${destination.name}, ${destination.country}.`
      : "Build a local booking quote.",
  };
}

export default function BookPage({ params }: BookPageProps) {
  const destination = getDestinationBySlug(params.slug);

  if (!destination) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <main id="main-content" className="min-h-screen bg-background pt-16">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-card p-8 text-card-foreground shadow-lg">
              Loading booking preview...
            </div>
          </div>
        </main>
      }
    >
      <BookingQuoteBuilder destination={destination} />
    </Suspense>
  );
}

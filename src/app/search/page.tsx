import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPageClient } from "@/components/search/SearchPageClient";

export const metadata: Metadata = {
  title: "Search Trips - TripExplorer",
  description: "Search and compare curated travel destinations.",
};

export default function SearchPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-card p-8 text-card-foreground shadow-lg">
              Loading search experience...
            </div>
          </div>
        }
      >
        <SearchPageClient />
      </Suspense>
    </main>
  );
}

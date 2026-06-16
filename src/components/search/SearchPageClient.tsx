"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Calendar,
  Filter,
  MapPin,
  Search,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { listAdminDestinations } from "@/lib/admin";
import { destinations as staticDestinations } from "@/lib/data";
import { getSearchResults, SearchSort } from "@/lib/search";
import { Destination } from "@/types";

const sortLabels: Record<SearchSort, string> = {
  recommended: "Recommended",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "rating-desc": "Rating: High to Low",
};

function getParam(searchParams: URLSearchParams, key: string) {
  return searchParams.get(key) ?? "";
}

export function SearchPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );

  const [destination, setDestination] = useState(
    getParam(query, "destination")
  );
  const [checkIn, setCheckIn] = useState(getParam(query, "checkIn"));
  const [checkOut, setCheckOut] = useState(getParam(query, "checkOut"));
  const [guests, setGuests] = useState(query.get("guests") ?? "1");
  const [sort, setSort] = useState<SearchSort>(
    (query.get("sort") as SearchSort) || "recommended"
  );
  const [destinations, setDestinations] =
    useState<Destination[]>(staticDestinations);

  useEffect(() => {
    setDestinations(listAdminDestinations());
  }, []);

  const filteredDestinations = useMemo(() => {
    const selectedSort = ((query.get("sort") as SearchSort) ||
      "recommended") as SearchSort;

    return getSearchResults(
      destinations,
      getParam(query, "destination"),
      selectedSort
    );
  }, [destinations, query]);

  const activeDestination = getParam(query, "destination");
  const activeCheckIn = getParam(query, "checkIn");
  const activeCheckOut = getParam(query, "checkOut");
  const activeGuests = query.get("guests") ?? "1";
  const hasFilters = Boolean(
    activeDestination || activeCheckIn || activeCheckOut || activeGuests !== "1"
  );

  const updateRoute = (nextSort = sort) => {
    const params = new URLSearchParams();
    if (destination.trim()) params.set("destination", destination.trim());
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guests) params.set("guests", guests);
    if (nextSort !== "recommended") params.set("sort", nextSort);

    router.push(`/search${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateRoute();
  };

  const handleSortChange = (value: SearchSort) => {
    setSort(value);
    updateRoute(value);
  };

  const clearFilters = () => {
    setDestination("");
    setCheckIn("");
    setCheckOut("");
    setGuests("1");
    setSort("recommended");
    router.push("/search");
  };

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden bg-charcoal-950 py-16 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.22),transparent_34%),linear-gradient(135deg,rgba(18,22,22,0.96),rgba(31,36,36,0.82))]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-8 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 transition-colors hover:text-primary"
          >
            Back to home
          </Link>
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-lime-100 backdrop-blur-md">
              <Search className="h-4 w-4" />
              Search trips
            </p>
            <h1 className="text-4xl font-bold md:text-5xl">
              Find your next curated escape
            </h1>
            <p className="mt-4 text-lg text-white/75">
              Browse our current destination catalog with URL-synced filters.
              Availability and live pricing will connect in the backend phase.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="-mt-20 rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-2xl shadow-charcoal-950/10"
        >
          <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-primary">
            <SlidersHorizontal className="h-4 w-4" />
            Refine search
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2 lg:col-span-2">
              <Label
                htmlFor="search-destination"
                className="flex items-center gap-2"
              >
                <MapPin className="h-4 w-4 text-primary" />
                Destination
              </Label>
              <Input
                id="search-destination"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                placeholder="City or country"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="search-check-in"
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4 text-primary" />
                Check In
              </Label>
              <Input
                id="search-check-in"
                type="date"
                value={checkIn}
                onChange={(event) => setCheckIn(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="search-check-out"
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4 text-primary" />
                Check Out
              </Label>
              <Input
                id="search-check-out"
                type="date"
                value={checkOut}
                onChange={(event) => setCheckOut(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="search-guests"
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4 text-primary" />
                Guests
              </Label>
              <Input
                id="search-guests"
                type="number"
                min="1"
                max="20"
                value={guests}
                onChange={(event) => setGuests(event.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2 sm:min-w-64">
              <Label htmlFor="search-sort" className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary" />
                Sort by
              </Label>
              <select
                id="search-sort"
                value={sort}
                onChange={(event) =>
                  handleSortChange(event.target.value as SearchSort)
                }
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {Object.entries(sortLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {hasFilters && (
                <Button type="button" variant="outline" onClick={clearFilters}>
                  <X className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              )}
              <Button
                type="submit"
                className="gradient-primary gradient-primary-hover text-white"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </form>

        <div className="mt-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-primary">
              {filteredDestinations.length} results
            </p>
            <h2 className="mt-1 text-2xl font-bold text-foreground">
              {activeDestination
                ? `Trips matching “${activeDestination}”`
                : "All curated destinations"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {activeCheckIn || activeCheckOut
                ? `Travel dates: ${activeCheckIn || "Any"} to ${activeCheckOut || "Any"}. `
                : "Choose dates when you're ready to continue booking. "}
              Guests: {activeGuests}.
            </p>
          </div>
        </div>

        {filteredDestinations.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDestinations.map((destinationItem) => (
              <DestinationCard
                key={destinationItem.id}
                destination={destinationItem}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-border bg-card p-10 text-center text-card-foreground">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">No destinations found</h3>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              Try searching for Bali, Tokyo, Paris, Maldives, Dubai, or
              Santorini.
            </p>
            <Button
              type="button"
              onClick={clearFilters}
              className="gradient-primary gradient-primary-hover mt-6 text-white"
            >
              Clear search
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

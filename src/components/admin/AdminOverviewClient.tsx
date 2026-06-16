"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BriefcaseBusiness,
  Database,
  Mail,
  Map,
  MessageSquare,
  RotateCcw,
  TicketPercent,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  listAdminDeals,
  listAdminDestinations,
  resetAdminPreviewData,
} from "@/lib/admin";
import { listConfirmedBookings } from "@/lib/dashboard";
import { listNewsletterSubscribers } from "@/lib/newsletter";
import { listReviews } from "@/lib/reviews";
import { cn } from "@/lib/utils";

const cards = [
  { href: "/admin/destinations", label: "Manage destinations", icon: Map },
  { href: "/admin/deals", label: "Manage deals", icon: TicketPercent },
  { href: "/admin/bookings", label: "View bookings", icon: BriefcaseBusiness },
  { href: "/admin/newsletter", label: "Newsletter list", icon: Mail },
  { href: "/admin/data", label: "Data manager", icon: Database },
];

export function AdminOverviewClient() {
  const [stats, setStats] = useState({
    destinations: 0,
    deals: 0,
    bookings: 0,
    reviews: 0,
    subscribers: 0,
  });

  const refreshStats = () => {
    setStats({
      destinations: listAdminDestinations().length,
      deals: listAdminDeals().length,
      bookings: listConfirmedBookings().length,
      reviews: listReviews().length,
      subscribers: listNewsletterSubscribers().length,
    });
  };

  useEffect(() => {
    refreshStats();
  }, []);

  const resetPreview = () => {
    resetAdminPreviewData();
    refreshStats();
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-5">
        <StatCard icon={Map} label="Destinations" value={stats.destinations} />
        <StatCard icon={TicketPercent} label="Deals" value={stats.deals} />
        <StatCard
          icon={BriefcaseBusiness}
          label="Bookings"
          value={stats.bookings}
        />
        <StatCard icon={MessageSquare} label="Reviews" value={stats.reviews} />
        <StatCard icon={Mail} label="Subscribers" value={stats.subscribers} />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-lg shadow-charcoal-950/5 transition-all hover:border-primary/50 hover:shadow-primary/10"
          >
            <card.icon className="h-7 w-7 text-primary" />
            <h2 className="mt-5 text-xl font-bold">{card.label}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Open the local admin preview module.
            </p>
          </Link>
        ))}
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-lg shadow-charcoal-950/5">
        <h2 className="text-xl font-bold">Reset local admin data</h2>
        <p className="mt-2 text-muted-foreground">
          Clears only admin destination/deal overrides. Bookings, favorites, and
          reviews remain untouched.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={resetPreview}
          className="mt-5"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset admin preview
        </Button>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Map;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-lg shadow-charcoal-950/5">
      <Icon className="h-6 w-6 text-primary" />
      <p className="mt-4 text-3xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

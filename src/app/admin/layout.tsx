import Link from "next/link";
import { AuthGuardNotice } from "@/components/auth/AuthGuardNotice";
import { ReactNode } from "react";
import {
  AlertTriangle,
  BarChart3,
  BriefcaseBusiness,
  Database,
  Map,
  Mail,
  PlaneTakeoff,
  TicketPercent,
} from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "Overview", icon: BarChart3 },
  { href: "/admin/destinations", label: "Destinations", icon: Map },
  { href: "/admin/deals", label: "Deals", icon: TicketPercent },
  { href: "/admin/bookings", label: "Bookings", icon: BriefcaseBusiness },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { href: "/admin/data", label: "Data", icon: Database },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <div className="border-b border-border bg-charcoal-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-lime-100">
                <PlaneTakeoff className="h-4 w-4" />
                Admin preview
              </p>
              <h1 className="text-4xl font-bold">TripExplorer Admin</h1>
              <p className="mt-3 max-w-2xl text-white/70">
                Public local admin preview. Auth, roles, and database
                persistence come later.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-4 text-sm text-foreground">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-none text-accent" />
          <p>
            This admin area is a browser-local prototype. Do not enter real
            business data.
          </p>
        </div>

        <AuthGuardNotice requiredRole="ADMIN" label="Admin preview" />

        <nav
          className="mb-8 flex flex-wrap gap-3"
          aria-label="Admin navigation"
        >
          {adminLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-card-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        {children}
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { AuthGuardNotice } from "@/components/auth/AuthGuardNotice";
import { DashboardClient } from "@/components/dashboard/DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard Preview - TripExplorer",
  description: "View local mock bookings and saved destinations.",
};

export default function DashboardPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <AuthGuardNotice requiredRole="USER" label="Dashboard" />
      </div>
      <DashboardClient />
    </>
  );
}

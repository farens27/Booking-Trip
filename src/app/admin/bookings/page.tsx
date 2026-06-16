import type { Metadata } from "next";
import { AdminBookingsClient } from "@/components/admin/AdminBookingsClient";

export const metadata: Metadata = {
  title: "Admin Bookings - TripExplorer",
  description: "View local mock bookings.",
};

export default function AdminBookingsPage() {
  return <AdminBookingsClient />;
}

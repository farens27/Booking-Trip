import type { Metadata } from "next";
import { AdminDestinationsClient } from "@/components/admin/AdminDestinationsClient";

export const metadata: Metadata = {
  title: "Admin Destinations - TripExplorer",
  description: "Manage local destination preview data.",
};

export default function AdminDestinationsPage() {
  return <AdminDestinationsClient />;
}

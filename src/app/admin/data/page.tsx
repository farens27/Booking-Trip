import type { Metadata } from "next";
import { AdminDataClient } from "@/components/admin/AdminDataClient";

export const metadata: Metadata = {
  title: "Admin Data Manager - TripExplorer",
  description: "Export, import, and reset local TripExplorer preview data.",
};

export default function AdminDataPage() {
  return <AdminDataClient />;
}

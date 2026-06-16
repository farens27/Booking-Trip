import type { Metadata } from "next";
import { AdminOverviewClient } from "@/components/admin/AdminOverviewClient";

export const metadata: Metadata = {
  title: "Admin Preview - TripExplorer",
  description: "Local admin preview for TripExplorer content operations.",
};

export default function AdminPage() {
  return <AdminOverviewClient />;
}

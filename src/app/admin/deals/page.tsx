import type { Metadata } from "next";
import { AdminDealsClient } from "@/components/admin/AdminDealsClient";

export const metadata: Metadata = {
  title: "Admin Deals - TripExplorer",
  description: "Manage local deal preview data.",
};

export default function AdminDealsPage() {
  return <AdminDealsClient />;
}

import type { Metadata } from "next";
import { AdminNewsletterClient } from "@/components/admin/AdminNewsletterClient";

export const metadata: Metadata = {
  title: "Admin Newsletter - TripExplorer",
  description: "View local newsletter subscribers.",
};

export default function AdminNewsletterPage() {
  return <AdminNewsletterClient />;
}

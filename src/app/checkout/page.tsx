import type { Metadata } from "next";
import { CheckoutPreview } from "@/components/booking/CheckoutPreview";

export const metadata: Metadata = {
  title: "Checkout Preview - TripExplorer",
  description: "Preview traveler details and mock booking confirmation.",
};

export default function CheckoutPage() {
  return <CheckoutPreview />;
}

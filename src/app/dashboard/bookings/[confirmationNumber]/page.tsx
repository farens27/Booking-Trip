import type { Metadata } from "next";
import { BookingDetailClient } from "@/components/dashboard/BookingDetailClient";

interface BookingDetailPageProps {
  params: {
    confirmationNumber: string;
  };
}

export function generateMetadata({ params }: BookingDetailPageProps): Metadata {
  return {
    title: `${params.confirmationNumber} - TripExplorer`,
    description: "View a local mock booking confirmation.",
  };
}

export default function BookingDetailPage({ params }: BookingDetailPageProps) {
  return <BookingDetailClient confirmationNumber={params.confirmationNumber} />;
}

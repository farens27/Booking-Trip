import { BookingAddon, BookingQuote, Destination } from "@/types";

export const BOOKING_QUOTE_STORAGE_KEY = "tripexplorer.bookingQuote";

export const bookingAddons: BookingAddon[] = [
  {
    id: "insurance",
    name: "Travel insurance",
    description:
      "Coverage preview for medical, baggage, and trip interruptions.",
    price: 79,
  },
  {
    id: "airport-transfer",
    name: "Airport transfer",
    description: "Private round-trip airport pickup and drop-off.",
    price: 120,
  },
  {
    id: "guided-tour",
    name: "Guided day tour",
    description: "A curated local experience with a private guide.",
    price: 180,
  },
  {
    id: "room-upgrade",
    name: "Room upgrade",
    description: "Upgrade preview for better views or premium room category.",
    price: 260,
  },
];

export function calculateNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;

  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  const diff = end.getTime() - start.getTime();

  if (Number.isNaN(diff) || diff <= 0) return 0;

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getSelectedAddons(addonIds: string[]) {
  return bookingAddons.filter((addon) => addonIds.includes(addon.id));
}

export function calculateBookingQuote({
  destination,
  checkIn,
  checkOut,
  guests,
  addonIds,
}: {
  destination: Destination;
  checkIn: string;
  checkOut: string;
  guests: number;
  addonIds: string[];
}): BookingQuote {
  const nights = calculateNights(checkIn, checkOut);
  const safeGuests = Math.max(1, guests || 1);
  const selectedAddons = getSelectedAddons(addonIds);
  const subtotal = destination.price * Math.max(1, nights) * safeGuests;
  const addonsTotal = selectedAddons.reduce(
    (total, addon) => total + addon.price * safeGuests,
    0
  );
  const serviceFee = Math.round((subtotal + addonsTotal) * 0.05);
  const taxes = Math.round((subtotal + addonsTotal) * 0.1);

  return {
    destinationSlug: destination.slug ?? destination.id,
    destinationName: destination.name,
    destinationCountry: destination.country,
    checkIn,
    checkOut,
    guests: safeGuests,
    nights,
    basePrice: destination.price,
    selectedAddons,
    subtotal,
    addonsTotal,
    serviceFee,
    taxes,
    total: subtotal + addonsTotal + serviceFee + taxes,
  };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function createConfirmationNumber() {
  const date = new Date();
  const datePart = date.toISOString().slice(0, 10).replaceAll("-", "");
  const randomPart = Math.random().toString(36).slice(2, 7).toUpperCase();

  return `TRIP-${datePart}-${randomPart}`;
}

import { ConfirmedBooking } from "@/types";
import { readLocalJson, writeLocalJson } from "./local-storage";

export const CONFIRMED_BOOKINGS_STORAGE_KEY = "tripexplorer.confirmedBookings";
export const FAVORITE_DESTINATIONS_STORAGE_KEY =
  "tripexplorer.favoriteDestinations";

export function listConfirmedBookings() {
  return readLocalJson<ConfirmedBooking[]>(CONFIRMED_BOOKINGS_STORAGE_KEY, []);
}

export function saveConfirmedBooking(booking: ConfirmedBooking) {
  const existingBookings = listConfirmedBookings().filter(
    (item) => item.confirmationNumber !== booking.confirmationNumber
  );

  writeLocalJson(CONFIRMED_BOOKINGS_STORAGE_KEY, [
    booking,
    ...existingBookings,
  ]);
}

export function getConfirmedBooking(confirmationNumber: string) {
  return listConfirmedBookings().find(
    (booking) => booking.confirmationNumber === confirmationNumber
  );
}

export function listFavoriteDestinationSlugs() {
  return readLocalJson<string[]>(FAVORITE_DESTINATIONS_STORAGE_KEY, []);
}

export function isFavoriteDestination(slug: string) {
  return listFavoriteDestinationSlugs().includes(slug);
}

export function toggleFavoriteDestination(slug: string) {
  const currentFavorites = listFavoriteDestinationSlugs();
  const nextFavorites = currentFavorites.includes(slug)
    ? currentFavorites.filter((item) => item !== slug)
    : [slug, ...currentFavorites];

  writeLocalJson(FAVORITE_DESTINATIONS_STORAGE_KEY, nextFavorites);
  return nextFavorites.includes(slug);
}

import { ConfirmedBooking } from "@/types";
import {
  CONFIRMED_BOOKINGS_STORAGE_KEY,
  getConfirmedBooking,
  listConfirmedBookings,
  saveConfirmedBooking,
} from "./dashboard";
import { writeLocalJson } from "./local-storage";

export function listBookings() {
  return listConfirmedBookings();
}

export function getBooking(confirmationNumber: string) {
  return getConfirmedBooking(confirmationNumber);
}

export function saveBooking(booking: ConfirmedBooking) {
  saveConfirmedBooking(booking);
}

export function updateBookingStatus(
  confirmationNumber: string,
  status: ConfirmedBooking["status"]
) {
  const bookings = listBookings();
  const nextBookings = bookings.map((booking) =>
    booking.confirmationNumber === confirmationNumber
      ? { ...booking, status }
      : booking
  );

  writeLocalJson(CONFIRMED_BOOKINGS_STORAGE_KEY, nextBookings);
  return nextBookings.find(
    (booking) => booking.confirmationNumber === confirmationNumber
  );
}

export function cancelBooking(confirmationNumber: string) {
  return updateBookingStatus(confirmationNumber, "CANCELLED");
}

export function restoreBooking(confirmationNumber: string) {
  return updateBookingStatus(confirmationNumber, "CONFIRMED");
}

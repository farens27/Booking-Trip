import { beforeEach, describe, expect, it, vi } from "vitest";
import { BookingQuote, ConfirmedBooking } from "@/types";
import {
  cancelBooking,
  getBooking,
  listBookings,
  restoreBooking,
  saveBooking,
} from "./booking-management";

function mockWindowStorage() {
  const store = new Map<string, string>();
  vi.stubGlobal("window", {
    localStorage: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => store.set(key, value),
      removeItem: (key: string) => store.delete(key),
    },
  });
}

const quote: BookingQuote = {
  destinationSlug: "bali",
  destinationName: "Bali",
  destinationCountry: "Indonesia",
  checkIn: "2026-01-01",
  checkOut: "2026-01-03",
  guests: 2,
  nights: 2,
  basePrice: 100,
  selectedAddons: [],
  subtotal: 400,
  addonsTotal: 0,
  serviceFee: 20,
  taxes: 40,
  total: 460,
};

const booking: ConfirmedBooking = {
  confirmationNumber: "TRIP-TEST",
  quote,
  contact: {
    name: "Test User",
    email: "test@example.com",
    phone: "123",
    requests: "",
  },
  createdAt: "2026-01-01T00:00:00.000Z",
  status: "CONFIRMED",
};

describe("booking management service", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockWindowStorage();
  });

  it("saves and lists bookings", () => {
    saveBooking(booking);

    expect(listBookings()).toHaveLength(1);
    expect(getBooking("TRIP-TEST")?.status).toBe("CONFIRMED");
  });

  it("cancels and restores bookings", () => {
    saveBooking(booking);

    expect(cancelBooking("TRIP-TEST")?.status).toBe("CANCELLED");
    expect(getBooking("TRIP-TEST")?.status).toBe("CANCELLED");
    expect(restoreBooking("TRIP-TEST")?.status).toBe("CONFIRMED");
  });

  it("returns undefined when updating a missing booking", () => {
    expect(cancelBooking("MISSING")).toBeUndefined();
  });
});

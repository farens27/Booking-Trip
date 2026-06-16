import { describe, expect, it } from "vitest";
import {
  calculateBookingQuote,
  calculateNights,
  formatCurrency,
  getSelectedAddons,
} from "./booking";
import { Destination } from "@/types";

const destination: Destination = {
  id: "1",
  slug: "test",
  name: "Test Island",
  country: "Testland",
  image: "https://example.com/image.jpg",
  price: 100,
  rating: 4.8,
  reviews: 10,
};

describe("booking helpers", () => {
  it("calculates nights between valid dates", () => {
    expect(calculateNights("2026-01-01", "2026-01-05")).toBe(4);
  });

  it("returns zero for invalid or reversed dates", () => {
    expect(calculateNights("2026-01-05", "2026-01-01")).toBe(0);
    expect(calculateNights("", "2026-01-01")).toBe(0);
  });

  it("selects known add-ons only", () => {
    expect(getSelectedAddons(["insurance", "missing"])).toHaveLength(1);
  });

  it("calculates booking totals with guests and add-ons", () => {
    const quote = calculateBookingQuote({
      destination,
      checkIn: "2026-01-01",
      checkOut: "2026-01-03",
      guests: 2,
      addonIds: ["insurance"],
    });

    expect(quote.nights).toBe(2);
    expect(quote.subtotal).toBe(400);
    expect(quote.addonsTotal).toBe(158);
    expect(quote.serviceFee).toBe(28);
    expect(quote.taxes).toBe(56);
    expect(quote.total).toBe(642);
  });

  it("formats currency without cents", () => {
    expect(formatCurrency(1299)).toBe("$1,299");
  });
});

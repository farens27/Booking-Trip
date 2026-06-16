// Type definitions for Travel Landing Page

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  description?: string;
  slug?: string;
  region?: string;
  gallery?: string[];
  amenities?: string[];
  highlights?: string[];
  duration?: string;
  bestTimeToVisit?: string;
}

export interface Deal {
  id: string;
  destination: string;
  country: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  endDate: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  tripDestination: string;
}

export interface SearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface BookingAddon {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface BookingQuote {
  destinationSlug: string;
  destinationName: string;
  destinationCountry: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  basePrice: number;
  selectedAddons: BookingAddon[];
  subtotal: number;
  addonsTotal: number;
  serviceFee: number;
  taxes: number;
  total: number;
}

export interface BookingContactInfo {
  name: string;
  email: string;
  phone: string;
  requests: string;
}

export interface ConfirmedBooking {
  confirmationNumber: string;
  quote: BookingQuote;
  contact: BookingContactInfo;
  createdAt: string;
  status: "CONFIRMED" | "CANCELLED";
}

export interface DestinationReview {
  id: string;
  destinationSlug: string;
  destinationName: string;
  confirmationNumber: string;
  authorName: string;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
  verifiedBooking: boolean;
}

export interface ReviewInput {
  destinationSlug: string;
  destinationName: string;
  confirmationNumber: string;
  authorName: string;
  rating: number;
  title: string;
  body: string;
}

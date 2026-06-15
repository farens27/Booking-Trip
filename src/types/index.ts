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

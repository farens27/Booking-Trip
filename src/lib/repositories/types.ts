import {
  ConfirmedBooking,
  Deal,
  Destination,
  DestinationReview,
  ReviewInput,
} from "@/types";
import { addNewsletterSubscriber, NewsletterSubscriber } from "../newsletter";

export interface StorageAdapter {
  read<T>(key: string, fallback: T): T;
  write<T>(key: string, value: T): void;
  remove(key: string): void;
}

export interface BookingRepository {
  list(): ConfirmedBooking[];
  get(confirmationNumber: string): ConfirmedBooking | undefined;
  save(booking: ConfirmedBooking): void;
  updateStatus(
    confirmationNumber: string,
    status: ConfirmedBooking["status"]
  ): ConfirmedBooking | undefined;
  cancel(confirmationNumber: string): ConfirmedBooking | undefined;
  restore(confirmationNumber: string): ConfirmedBooking | undefined;
}

export interface ReviewRepository {
  list(): DestinationReview[];
  listByDestination(destinationSlug: string): DestinationReview[];
  getByConfirmationNumber(
    confirmationNumber: string
  ): DestinationReview | undefined;
  save(input: ReviewInput): DestinationReview;
}

export interface DestinationRepository {
  list(): Destination[];
  save(destination: Destination): Destination;
  delete(id: string): void;
}

export interface DealRepository {
  list(): Deal[];
  save(deal: Deal): Deal;
  delete(id: string): void;
}

export interface NewsletterRepository {
  list(): NewsletterSubscriber[];
  add(email: string): ReturnType<typeof addNewsletterSubscriber>;
  remove(id: string): void;
}

export interface AppRepositories {
  bookings: BookingRepository;
  reviews: ReviewRepository;
  destinations: DestinationRepository;
  deals: DealRepository;
  newsletter: NewsletterRepository;
}

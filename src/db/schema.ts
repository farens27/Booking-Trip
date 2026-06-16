import { relations, sql } from "drizzle-orm";
import {
  integer,
  real,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  image: text("image"),
  role: text("role", { enum: ["USER", "ADMIN"] })
    .notNull()
    .default("USER"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const destinations = sqliteTable("destinations", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  country: text("country").notNull(),
  region: text("region"),
  image: text("image").notNull(),
  gallery: text("gallery", { mode: "json" }).$type<string[]>(),
  price: integer("price").notNull(),
  rating: real("rating").notNull().default(0),
  reviews: integer("reviews").notNull().default(0),
  description: text("description"),
  amenities: text("amenities", { mode: "json" }).$type<string[]>(),
  highlights: text("highlights", { mode: "json" }).$type<string[]>(),
  duration: text("duration"),
  bestTimeToVisit: text("best_time_to_visit"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const deals = sqliteTable("deals", {
  id: text("id").primaryKey(),
  destinationId: text("destination_id").references(() => destinations.id),
  destination: text("destination").notNull(),
  country: text("country").notNull(),
  originalPrice: integer("original_price").notNull(),
  discountedPrice: integer("discounted_price").notNull(),
  discount: integer("discount").notNull(),
  endDate: text("end_date").notNull(),
  image: text("image").notNull(),
});

export const bookings = sqliteTable("bookings", {
  id: text("id").primaryKey(),
  confirmationNumber: text("confirmation_number").notNull().unique(),
  userId: text("user_id").references(() => users.id),
  destinationId: text("destination_id").references(() => destinations.id),
  destinationSlug: text("destination_slug").notNull(),
  destinationName: text("destination_name").notNull(),
  destinationCountry: text("destination_country").notNull(),
  checkIn: text("check_in").notNull(),
  checkOut: text("check_out").notNull(),
  guests: integer("guests").notNull(),
  nights: integer("nights").notNull(),
  basePrice: integer("base_price").notNull(),
  subtotal: integer("subtotal").notNull(),
  addonsTotal: integer("addons_total").notNull(),
  serviceFee: integer("service_fee").notNull(),
  taxes: integer("taxes").notNull(),
  total: integer("total").notNull(),
  contact: text("contact", { mode: "json" }).$type<{
    name: string;
    email: string;
    phone: string;
    requests: string;
  }>(),
  status: text("status", { enum: ["CONFIRMED", "CANCELLED"] })
    .notNull()
    .default("CONFIRMED"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const bookingAddons = sqliteTable("booking_addons", {
  id: text("id").primaryKey(),
  bookingId: text("booking_id")
    .notNull()
    .references(() => bookings.id),
  addonId: text("addon_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
});

export const reviews = sqliteTable(
  "reviews",
  {
    id: text("id").primaryKey(),
    destinationSlug: text("destination_slug").notNull(),
    destinationName: text("destination_name").notNull(),
    confirmationNumber: text("confirmation_number").notNull(),
    authorName: text("author_name").notNull(),
    rating: integer("rating").notNull(),
    title: text("title").notNull(),
    body: text("body").notNull(),
    verifiedBooking: integer("verified_booking", { mode: "boolean" })
      .notNull()
      .default(true),
    createdAt: text("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    confirmationIdx: uniqueIndex("reviews_confirmation_idx").on(
      table.confirmationNumber
    ),
  })
);

export const favorites = sqliteTable(
  "favorites",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    destinationSlug: text("destination_slug").notNull(),
    createdAt: text("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    favoriteIdx: uniqueIndex("favorites_user_destination_idx").on(
      table.userId,
      table.destinationSlug
    ),
  })
);

export const newsletterSubscribers = sqliteTable("newsletter_subscribers", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const destinationRelations = relations(destinations, ({ many }) => ({
  deals: many(deals),
  bookings: many(bookings),
}));

export const bookingRelations = relations(bookings, ({ many }) => ({
  addons: many(bookingAddons),
}));

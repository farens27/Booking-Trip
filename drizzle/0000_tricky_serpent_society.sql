CREATE TABLE `booking_addons` (
	`id` text PRIMARY KEY NOT NULL,
	`booking_id` text NOT NULL,
	`addon_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`price` integer NOT NULL,
	FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bookings` (
	`id` text PRIMARY KEY NOT NULL,
	`confirmation_number` text NOT NULL,
	`user_id` text,
	`destination_id` text,
	`destination_slug` text NOT NULL,
	`destination_name` text NOT NULL,
	`destination_country` text NOT NULL,
	`check_in` text NOT NULL,
	`check_out` text NOT NULL,
	`guests` integer NOT NULL,
	`nights` integer NOT NULL,
	`base_price` integer NOT NULL,
	`subtotal` integer NOT NULL,
	`addons_total` integer NOT NULL,
	`service_fee` integer NOT NULL,
	`taxes` integer NOT NULL,
	`total` integer NOT NULL,
	`contact` text,
	`status` text DEFAULT 'CONFIRMED' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bookings_confirmation_number_unique` ON `bookings` (`confirmation_number`);--> statement-breakpoint
CREATE TABLE `deals` (
	`id` text PRIMARY KEY NOT NULL,
	`destination_id` text,
	`destination` text NOT NULL,
	`country` text NOT NULL,
	`original_price` integer NOT NULL,
	`discounted_price` integer NOT NULL,
	`discount` integer NOT NULL,
	`end_date` text NOT NULL,
	`image` text NOT NULL,
	FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `destinations` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`country` text NOT NULL,
	`region` text,
	`image` text NOT NULL,
	`gallery` text,
	`price` integer NOT NULL,
	`rating` real DEFAULT 0 NOT NULL,
	`reviews` integer DEFAULT 0 NOT NULL,
	`description` text,
	`amenities` text,
	`highlights` text,
	`duration` text,
	`best_time_to_visit` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `destinations_slug_unique` ON `destinations` (`slug`);--> statement-breakpoint
CREATE TABLE `favorites` (
	`user_id` text NOT NULL,
	`destination_slug` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `favorites_user_destination_idx` ON `favorites` (`user_id`,`destination_slug`);--> statement-breakpoint
CREATE TABLE `newsletter_subscribers` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `newsletter_subscribers_email_unique` ON `newsletter_subscribers` (`email`);--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`destination_slug` text NOT NULL,
	`destination_name` text NOT NULL,
	`confirmation_number` text NOT NULL,
	`author_name` text NOT NULL,
	`rating` integer NOT NULL,
	`title` text NOT NULL,
	`body` text NOT NULL,
	`verified_booking` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `reviews_confirmation_idx` ON `reviews` (`confirmation_number`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`image` text,
	`role` text DEFAULT 'USER' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
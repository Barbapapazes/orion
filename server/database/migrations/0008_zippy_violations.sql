CREATE TABLE `templates` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`hash` text NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`status` text DEFAULT 'submitted' NOT NULL,
	`paid_status` text DEFAULT 'free' NOT NULL,
	`live_url` text,
	`access_url` text NOT NULL,
	`description` text NOT NULL,
	`user_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `templates_hash_unique` ON `templates` (`hash`);
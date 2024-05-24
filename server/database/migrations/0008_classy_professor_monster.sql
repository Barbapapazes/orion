ALTER TABLE modules ADD `slug` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `modules_slug_unique` ON `modules` (`slug`);
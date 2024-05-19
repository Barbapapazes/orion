ALTER TABLE `users` RENAME COLUMN `user` TO `login`;--> statement-breakpoint
ALTER TABLE users ADD `email` text NOT NULL;--> statement-breakpoint
ALTER TABLE users ADD `name` text;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
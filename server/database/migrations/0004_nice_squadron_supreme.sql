ALTER TABLE modules ADD `repo` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `modules_repo_unique` ON `modules` (`repo`);
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`customer_name` text NOT NULL,
	`phone` text NOT NULL,
	`city` text NOT NULL,
	`address` text NOT NULL,
	`note` text DEFAULT '' NOT NULL,
	`coupon_code` text DEFAULT '' NOT NULL,
	`items` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `wheel_spins` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`prize` text NOT NULL,
	`coupon_code` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `wheel_spins_user_id_unique` ON `wheel_spins` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `wheel_spins_coupon_code_unique` ON `wheel_spins` (`coupon_code`);
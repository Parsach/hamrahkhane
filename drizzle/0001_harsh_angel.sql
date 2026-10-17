CREATE TABLE `campaigns` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`discount_type` text DEFAULT 'percent' NOT NULL,
	`discount_value` integer DEFAULT 0 NOT NULL,
	`starts_at` text DEFAULT '' NOT NULL,
	`ends_at` text DEFAULT '' NOT NULL,
	`active` integer DEFAULT 1 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `coupons` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text NOT NULL,
	`title` text DEFAULT 'کد تخفیف همراه‌خانه' NOT NULL,
	`discount_type` text DEFAULT 'percent' NOT NULL,
	`discount_value` integer DEFAULT 0 NOT NULL,
	`usage_limit` integer DEFAULT 0 NOT NULL,
	`used_count` integer DEFAULT 0 NOT NULL,
	`starts_at` text DEFAULT '' NOT NULL,
	`ends_at` text DEFAULT '' NOT NULL,
	`active` integer DEFAULT 1 NOT NULL,
	`campaign_id` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `coupons_code_unique` ON `coupons` (`code`);--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`price` integer DEFAULT 0 NOT NULL,
	`old_price` integer,
	`rating` text DEFAULT '۴.۵' NOT NULL,
	`badge` text DEFAULT '' NOT NULL,
	`icon` text DEFAULT 'PackageCheck' NOT NULL,
	`tone` text DEFAULT 'blue' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`active` integer DEFAULT 1 NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `wheel_prizes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`label` text NOT NULL,
	`coupon_code` text DEFAULT '' NOT NULL,
	`weight` integer DEFAULT 1 NOT NULL,
	`active` integer DEFAULT 1 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT INTO `products` (`id`,`name`,`category`,`price`,`old_price`,`rating`,`badge`,`icon`,`tone`,`description`,`active`,`sort_order`) VALUES
('air-fryer','هواپز دوقلو نوا','آشپزخانه',4890000,5550000,'۴.۹','پرفروش','Flame','orange','دو سبد مستقل، پخت کم‌روغن',1,1),
('espresso','اسپرسوساز رومیزی رُست','نوشیدنی',6290000,6990000,'۴.۸','پیشنهاد امروز','Coffee','coffee','نوشیدنی حرفه‌ای در خانه',1,2),
('fridge','یخچال فریزر کم‌مصرف','سرمایش',38500000,NULL,'۴.۷','','Refrigerator','blue','فضای جادار با مصرف بهینه',1,3),
('washer','ماشین لباسشویی ۹ کیلویی','شست‌وشو',24900000,26800000,'۴.۸','','WashingMachine','indigo','شست‌وشوی آرام و عمیق',1,4),
('dishwasher','ماشین ظرفشویی ۱۴ نفره','شست‌وشو',21900000,NULL,'۴.۶','','PackageCheck','sky','تمیزی بی‌صدا برای هر شب',1,5),
('vacuum','جاروبرقی توربوپلاس','نظافت',8950000,9650000,'۴.۷','','Fan','mint','قدرت مکش بالا، صدای کم',1,6),
('mixer','همزن کاسه‌دار استیل','آشپزخانه',5790000,NULL,'۴.۸','','ChefHat','rose','برای خمیر و شیرینی خانگی',1,7),
('microwave','مایکروویو گریل‌دار','آشپزخانه',11900000,NULL,'۴.۵','','Sparkles','purple','گرم‌کردن سریع و یکنواخت',1,8),
('air-conditioner','کولر گازی ۱۸ هزار','تهویه',29800000,31900000,'۴.۶','','Fan','cyan','خنکای مطمئن برای تابستان',1,9),
('ice-maker','یخ‌ساز رومیزی کوچک','نوشیدنی',4680000,NULL,'۴.۴','','IceCreamBowl','teal','یخ تازه در چند دقیقه',1,10),
('sandwich-maker','ساندویچ‌ساز گریل','آشپزخانه',2390000,NULL,'۴.۵','','BadgePercent','yellow','صبحانه‌های ترد و سریع',1,11),
('heater','بخاری برقی سرامیکی','گرمایشی',3270000,NULL,'۴.۶','','Clock3','red','گرمای فوری با ایمنی بیشتر',1,12);
--> statement-breakpoint
INSERT INTO `wheel_prizes` (`label`,`coupon_code`,`weight`,`active`) VALUES
('کد تخفیف ۱۰٪','HAMRAH10',4,1),
('کد تخفیف ۱۵٪','HAMRAH15',3,1),
('ارسال رایگان','HAMRAH-FREE',2,1),
('شانس دوباره در هفته بعد','NEXT-WEEK',1,1);

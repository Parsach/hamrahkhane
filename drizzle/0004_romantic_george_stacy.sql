ALTER TABLE `products` ADD `gallery` text DEFAULT '[]' NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `slug` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `seo_title` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `seo_description` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `seo_keywords` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `image_alt` text DEFAULT '' NOT NULL;
--> statement-breakpoint
UPDATE `products` SET `slug`='bosch-tea-maker', `seo_title`='خرید چای ساز بوش حرفه‌ای | همراه خانه', `seo_description`='چای ساز برقی بوش با کتری شیشه‌ای ۱.۸ لیتری، قوری دمنوش و قابلیت گرم نگه داشتن؛ استعلام قیمت و مشاوره تلفنی از همراه خانه.', `seo_keywords`='چای ساز بوش, چای ساز برقی, خرید چای ساز', `image_alt`='چای ساز برقی بوش با کتری و قوری شیشه ای', `gallery`='["/products/bosch-tea-maker.jpg"]' WHERE `id`='bosch-tea-maker';
--> statement-breakpoint
UPDATE `products` SET `slug`='bellagio-hand-blender', `seo_title`='خرید گوشت کوب برقی بلاجیو مدل ۱۳۵ | همراه خانه', `seo_description`='گوشت کوب برقی بلاجیو مدل ۱۳۵ با توان ۱۰۰۰ وات و لیوان همراه؛ مناسب پوره، اسموتی و سس با مشاوره خرید تلفنی.', `seo_keywords`='گوشت کوب برقی بلاجیو, گوشت کوب ۱۰۰۰ وات, بلندر دستی', `image_alt`='گوشت کوب برقی بلاجیو مدل ۱۳۵', `gallery`='["/products/bellagio-hand-blender.jpg"]' WHERE `id`='bellagio-hand-blender';
--> statement-breakpoint
UPDATE `products` SET `slug`='bosch-hand-mixer-bs-368ts', `seo_title`='خرید همزن دستی بوش BS-368TS | همراه خانه', `seo_description`='همزن دستی بوش BS-368TS با توان ۶۰۰ وات، سری همزن و خمیرزن؛ انتخاب مناسب برای شیرینی پزی و خمیر خانگی.', `seo_keywords`='همزن دستی بوش, BS-368TS, همزن ۶۰۰ وات', `image_alt`='همزن دستی بوش BS-368TS با سری های همزن و خمیرزن', `gallery`='["/products/bosch-hand-mixer-bs-368ts.jpg"]' WHERE `id`='bosch-hand-mixer-bs-368ts';
--> statement-breakpoint
UPDATE `products` SET `slug`='silvercrest-sc-8008s', `seo_title`='خرید گوشت کوب چندکاره سیلورکرست SC-8008S | همراه خانه', `seo_description`='گوشت کوب چندکاره سیلورکرست SC-8008S با حالت توربو، خردکن، لیوان و سری همزن برای آماده سازی سریع مواد غذایی.', `seo_keywords`='گوشت کوب سیلورکرست, SC-8008S, گوشت کوب چندکاره', `image_alt`='گوشت کوب چندکاره سیلورکرست SC-8008S', `gallery`='["/products/silvercrest-sc-8008s.jpg"]' WHERE `id`='silvercrest-sc-8008s';
--> statement-breakpoint
UPDATE `products` SET `slug`='silvercrest-sc-8009s', `seo_title`='خرید گوشت کوب سیلورکرست SC-8009S | همراه خانه', `seo_description`='گوشت کوب برقی سیلورکرست SC-8009S با تنظیم سرعت و توربو، خردکن، لیوان و سری همزن برای آشپزی روزمره.', `seo_keywords`='گوشت کوب SC-8009S, سیلورکرست, گوشت کوب برقی', `image_alt`='گوشت کوب برقی سیلورکرست SC-8009S', `gallery`='["/products/silvercrest-sc-8009s.jpg"]' WHERE `id`='silvercrest-sc-8009s';
--> statement-breakpoint
UPDATE `products` SET `slug`='tefal-powermix', `seo_title`='خرید همزن دستی تفال Pro Powermix | همراه خانه', `seo_description`='همزن دستی تفال Pro Powermix با توان ۶۰۰ وات، ۷ سرعت و سری های همزن و خمیرزن برای کیک و خمیر خانگی.', `seo_keywords`='همزن تفال, Powermix, همزن ۶۰۰ وات', `image_alt`='همزن دستی تفال Pro Powermix با سری های همزن و خمیرزن', `gallery`='["/products/tefal-powermix.jpg"]' WHERE `id`='tefal-powermix';
--> statement-breakpoint
UPDATE `products` SET `slug`='scarlett-mm-133k', `seo_title`='خرید همزن کاسه دار اسکارلت MM-133K | همراه خانه', `seo_description`='همزن کاسه دار اسکارلت MM-133K با کاسه استیل، ۷ سرعت و سری همزن و خمیرزن برای پخت و پز روزمره.', `seo_keywords`='همزن اسکارلت, MM-133K, همزن کاسه دار', `image_alt`='همزن کاسه دار اسکارلت MM-133K با کاسه استیل', `gallery`='["/products/scarlett-mm-133k.jpg"]' WHERE `id`='scarlett-mm-133k';
--> statement-breakpoint
UPDATE `products` SET `slug`='silvercrest-coffee-grinder-sc-8300', `seo_title`='خرید آسیاب قهوه سیلورکرست SC-8300 | همراه خانه', `seo_description`='آسیاب قهوه سیلورکرست SC-8300 با توان ۲۵۰ وات، محفظه استیل و تیغه مقاوم برای قهوه و ادویه.', `seo_keywords`='آسیاب قهوه سیلورکرست, SC-8300, آسیاب قهوه ۲۵۰ وات', `image_alt`='آسیاب قهوه سیلورکرست SC-8300 با محفظه استیل', `gallery`='["/products/silvercrest-coffee-grinder-sc-8300.jpg"]' WHERE `id`='silvercrest-coffee-grinder-sc-8300';
--> statement-breakpoint
UPDATE `products` SET `slug`='silvercrest-coffee-grinder-sc-8300-bowl', `seo_title`='خرید آسیاب قهوه کاسه دار سیلورکرست SC-8300 | همراه خانه', `seo_description`='نسخه کاسه دار آسیاب سیلورکرست SC-8300 با محفظه جداشونده و تیغه فلزی برای آسیاب قهوه و مواد خشک.', `seo_keywords`='آسیاب کاسه دار, آسیاب سیلورکرست, SC-8300', `image_alt`='آسیاب قهوه کاسه دار سیلورکرست SC-8300', `gallery`='["/products/silvercrest-coffee-grinder-sc-8300-bowl.jpg"]' WHERE `id`='silvercrest-coffee-grinder-sc-8300-bowl';

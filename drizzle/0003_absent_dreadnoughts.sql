ALTER TABLE `products` ADD `image` text DEFAULT '' NOT NULL;
--> statement-breakpoint
UPDATE `products` SET `active` = 0;
--> statement-breakpoint
INSERT INTO `products` (`id`,`name`,`category`,`price`,`old_price`,`rating`,`badge`,`icon`,`tone`,`image`,`description`,`active`,`sort_order`) VALUES
('bosch-tea-maker','چای‌ساز بوش حرفه‌ای','نوشیدنی',0,NULL,'۴.۸','پرفروش','Coffee','coffee','/products/bosch-tea-maker.jpg','چای‌ساز برقی بوش با کتری شیشه‌ای ۱.۸ لیتری، قوری دمنوش و قابلیت گرم‌نگه‌داشتن.',1,1),
('bellagio-hand-blender','گوشت‌کوب برقی بلاجیو 2 در 1','آشپزخانه',0,NULL,'۴.۷','۱۰۰۰ وات','Fan','blue','/products/bellagio-hand-blender.jpg','گوشت‌کوب برقی بلاجیو مدل ۱۳۵ با توان ۱۰۰۰ وات، تیغه استیل و لیوان همراه برای تهیه انواع نوشیدنی و پوره.',1,2),
('bosch-hand-mixer-bs-368ts','همزن دستی بوش BS-368TS','آشپزخانه',0,NULL,'۴.۸','۶۰۰ وات','ChefHat','indigo','/products/bosch-hand-mixer-bs-368ts.jpg','همزن دستی بوش مدل BS-368TS با توان ۶۰۰ وات، سری‌های همزن و خمیرزن و طراحی خوش‌دست برای شیرینی‌پزی.',1,3),
('silvercrest-sc-8008s','گوشت‌کوب چندکاره سیلورکرست SC-8008S','آشپزخانه',0,NULL,'۴.۷','توربو','Sparkles','purple','/products/silvercrest-sc-8008s.jpg','ست گوشت‌کوب سیلورکرست مدل SC-8008S با حالت توربو، خردکن، لیوان و سری همزن برای آماده‌سازی سریع مواد غذایی.',1,4),
('silvercrest-sc-8009s','گوشت‌کوب سیلورکرست SC-8009S','آشپزخانه',0,NULL,'۴.۶','مدل جدید','Fan','mint','/products/silvercrest-sc-8009s.jpg','گوشت‌کوب برقی سیلورکرست مدل SC-8009S با تنظیم سرعت و توربو، همراه خردکن، لیوان و سری همزن.',1,5),
('tefal-powermix','همزن دستی تفال Pro Powermix','آشپزخانه',0,NULL,'۴.۸','۶۰۰ وات','ChefHat','orange','/products/tefal-powermix.jpg','همزن دستی تفال Pro Powermix با توان ۶۰۰ وات، ۷ سرعت و سری‌های همزن و خمیرزن؛ مناسب کیک و خمیر خانگی.',1,6),
('scarlett-mm-133k','همزن کاسه‌دار اسکارلت MM-133K','آشپزخانه',0,NULL,'۴.۶','۷ سرعت','ChefHat','rose','/products/scarlett-mm-133k.jpg','همزن کاسه‌دار اسکارلت مدل MM-133K با کاسه استیل، ۷ سرعت و سری‌های همزن و خمیرزن برای پخت‌وپز روزمره.',1,7),
('silvercrest-coffee-grinder-sc-8300','آسیاب قهوه سیلورکرست SC-8300','نوشیدنی',0,NULL,'۴.۷','۲۵۰ وات','Coffee','coffee','/products/silvercrest-coffee-grinder-sc-8300.jpg','آسیاب قهوه سیلورکرست مدل SC-8300 با موتور ۲۵۰ وات، محفظه استیل و تیغه مقاوم برای آسیاب قهوه و ادویه.',1,8),
('silvercrest-coffee-grinder-sc-8300-bowl','آسیاب قهوه سیلورکرست SC-8300 کاسه‌دار','نوشیدنی',0,NULL,'۴.۷','تیغه طلایی','Coffee','yellow','/products/silvercrest-coffee-grinder-sc-8300-bowl.jpg','نسخه کاسه‌دار آسیاب سیلورکرست SC-8300 با محفظه جداشونده، تیغه فلزی و عملکرد سریع برای قهوه و مواد خشک.',1,9);

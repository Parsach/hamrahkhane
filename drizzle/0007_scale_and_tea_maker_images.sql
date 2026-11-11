-- Refresh scale and tea maker imagery from the latest supplied photos.
UPDATE `products` SET
  `image`='/products/locatelli-digital-scale.png',
  `gallery`='["/products/locatelli-digital-scale.png","/products/locatelli-digital-scale-white.png"]',
  `image_alt`='ترازو دیجیتال لوکاتلی شیشه‌ای مشکی و سفید'
WHERE `id`='locatelli-digital-scale';

UPDATE `products` SET
  `image`='/products/philips-tea-maker.png',
  `gallery`='["/products/philips-tea-maker.png"]',
  `image_alt`='چای ساز روهمی فیلیپس هلند با بدنه شیشه‌ای و LED'
WHERE `id`='philips-tea-maker';

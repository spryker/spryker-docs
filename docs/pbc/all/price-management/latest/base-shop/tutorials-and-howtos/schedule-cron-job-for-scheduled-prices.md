---
title: Schedule cron job for scheduled prices
description: This document describes how to change the default behavior of the cron job shipped with the Scheduled Prices feature.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-schedule-cron-job-for-scheduled-prices-201907
originalArticleId: 612d102b-f61a-4c7b-adec-9a2697ed6349
redirect_from:
  - /docs/scos/dev/tutorials/201907.0/howtos/feature-howtos/how-to-schedule-cron-job-for-scheduled-prices.html
  - /docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/howto-schedule-cron-job-for-scheduled-prices.html
  - /docs/pbc/all/price-management/202311.0/base-shop/tutorials-and-howtos/howto-schedule-cron-job-for-scheduled-prices.html
  - /docs/pbc/all/price-management/202204.0/base-shop/tutorials-and-howtos/howto-schedule-cron-job-for-scheduled-prices.html
related:
  - title: Scheduled Prices feature walkthrough
    link: docs/pbc/all/price-management/latest/base-shop/scheduled-prices-feature-overview.html
---


By default, the cron job runs every day at 00:06:00-00:00. You can change the frequency, date and time of running the cron job by modifying the `'schedule'` key in `config/Zed/cronjobs/jobs.php`:

```php
...
/* PriceProductSchedule */
$jobs[] = [
    'name' => 'apply-price-product-schedule',
    'command' => '$PHP_BIN vendor/bin/console price-product-schedule:apply',
    'schedule' => '0 6 * * *',
    'enable' => true,
    'run_on_non_production' => true,
    'stores' => $allStores,
];
```

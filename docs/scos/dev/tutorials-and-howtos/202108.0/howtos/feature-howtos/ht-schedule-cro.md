---
title: HowTo - Schedule Cron Job for Scheduled Prices
originalLink: https://documentation.spryker.com/2021080/docs/ht-schedule-cron-job-for-scheduled-prices-201907
redirect_from:
  - /2021080/docs/ht-schedule-cron-job-for-scheduled-prices-201907
  - /2021080/docs/en/ht-schedule-cron-job-for-scheduled-prices-201907
---

This article describes how to change the default behavior of the cron job shipped with the Scheduled Prices feature.

By default, the cron job runs every day at 00:06:00-00:00. You can change the frequency, date and time of running the cron job by modifying the `'schedule'`  key in `config/Zed/cronjobs/jobs.php`:

```PHP
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

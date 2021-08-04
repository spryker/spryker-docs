---
title: HowTo - Import Scheduled Prices
originalLink: https://documentation.spryker.com/v3/docs/ht-import-scheduled-prices-201907
redirect_from:
  - /v3/docs/ht-import-scheduled-prices-201907
  - /v3/docs/en/ht-import-scheduled-prices-201907
---

## Introduction

This tutorial describes how to import schedule prices by importing them into a Spryker project with the Scheduled Prices feature.

## Data Import and File Format

In order to schedule a price, you need to upload a `product_price_schedule.csv` file to `/project/data/import/` with the following headers: `abstract_sku`, `concrete_sku`, `price_type`, `store`, `currency`, `value_net`, `value_gross`, `from_included`, `to_included`.

They are described in the table:

| Property | Transcription | Example values |
| --- | --- | --- |
| `abstract_sku` OR `concrete_sku` | SKU of the abstract and/or concrete product you wish to schedule a price for. | product-123-color-black |
| `price_type` | Defines the type of the price you wish to schedule: DEFAULT or ORIGINAL. | DEFAULT |
| `currency` | Defines the currency of the price to be scheduled. | EUR |
| `value_net` | Net price of the product. Since prices are imported, they are in integers (8543 = 85.43) | 8543 |
| `value_gross` | Gross price of the product.</br> Since prices are imported, they are in integers (9999 = 99.99) | 9999 |
| `from_included` | Starting date of the scheduled price, inclusively. | 2019-06-23T23:00:00+01:00 |
| `to_included` | Ending date of the scheduled price, inclusively. | 2019-12-31T12:21:32-04:00 |

You can include multiple entries into the file. 

| abstract_sku | concrete_sku | price_type | store | currency | value_net | value_gross | from_included | to_included |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 234 |   | DEFAULT | store-france | USD | 20012 | 30065 | 2019-03-01T04:24:16-03:00 | 2019-05-21T14:30:16-02:00 |
|   | 12 | DEFAULT | DE | EUR | 170 | 180 | 2019-03-01T04:24:16-03:00 | 2019-05-21T14:30:16-02:00 |
|  | 34 | ORIGINAL | store-demo | CHF | 1521 | 467 | 2019-03-01T04:24:16-03:00 | 2019-12-08T17:45:23-20:00 |
| 234 |  | DEFAULT | store-france | USD | 19000 | 21033 | 2019-05-21T14:31:16-02:00 | 2019-06-10T14:30:16-02:00 |

Once uploaded, run `console data:import:product-price-schedule` command to import the price schedules from the file.

The imported prices are applied by running a cron job. By default, it runs every day at 00:06:00-00:00. If you want to apply the imported prices right away, you can either run `price-product-schedule:apply` command to apply them manually or change the behavior of the cron job. For more information, see [HowTo - Schedule Cron Job for Scheduled Prices](/docs/scos/dev/tutorials/201907.0/howtos/feature-howtos/ht-schedule-cro).

<!-- Last review date: Jul 2, 2019 -by Jeremy Fourna, Andrii Tserkovnyi-->

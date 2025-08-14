---
title: "Import file details: merchant_open_hours_week_day_schedule.csv"
last_updated: Jun 07, 2021
description: This document describes the merchant_open_hours_week_day_schedule.csv file to configure merchant opening hours information in your Spryker shop.
template: import-file-template
redirect_from:
  - /docs/marketplace/dev/data-import/202311.0/file-details-merchant-open-hours-week-day-schedule.csv.html
  - /docs/pbc/all/merchant-management/202311.0/marketplace/import-and-export-data/file-details-merchant-open-hours-week-day-schedule.csv.html
  - /docs/pbc/all/merchant-management/latest/marketplace/import-and-export-data/import-file-details-merchant-open-hours-week-day-schedule.csv.html
related:
  - title: Merchant Opening Hours feature overview
    link: docs/pbc/all/merchant-management/page.version/marketplace/merchant-opening-hours-feature-overview.html
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `merchant_open_hours_week_day_schedule.csv` file to configure [default merchant opening hours](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/merchant-opening-hours-feature-overview.html) information in your Spryker shop.

## Import file dependencies

[merchant.csv](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/import-and-export-data/import-file-details-merchant.csv.html)


## Import file parameters


| PARAMETER      | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS           | DESCRIPTION            |
| -------------- | ----------- | ------ | -------------- | ---------------------------- | ----------------------------- |
| merchant_reference | &check;             | String   |                   | Unique                                  | Identifier of the merchant in the system. |
| week_day_key       | &check;             | Weekday  |                   | Weekday name is in format: WEEKDAY_NAME | Weekday name.                             |
| time_from          |               | Datetime |                   | Time is in format. hh:mm:ss              | Time from.                                |
| time_to            |               | Datetime |                   | Time is in format. hh:mm:ss              | Time to.                                  |



## Import template file and content example


| FILE   | DESCRIPTION    |
| ---------------------------- | ---------------------------- |
| [template_merchant_open_hours_week_day_schedule.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_open_hours_week_day_schedule.csv) | Import file template with headers only.         |
| [merchant_open_hours_week_day_schedule.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_open_hours_week_day_schedule.csv) | Example of the import file with Demo Shop data. |

## Import command

```bash
data:import merchant-opening-hours-weekday-schedule
```

---
title: "File details: merchant_open_hours_week_day_schedule.csv"
last_updated: Jun 07, 2021
description: This document describes the merchant_open_hours_week_day_schedule.csv file to configure merchant opening hours information in your Spryker shop.
template: import-file-template
---

This document describes the `merchant_open_hours_week_day_schedule.csv` file to configure [default merchant opening hours](/docs/marketplace/user/features/{{site.version}}/merchant-opening-hours-feature-overview.html) information in your Spryker shop.

To import the file, run:

```
data:import merchant-opening-hours-weekday-schedule
```

## Import file parameters

The file should have the following parameters:

| PARAMETER      | REQUIRED? | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS           | DESCRIPTION            |
| -------------- | ----------- | ------ | -------------- | ---------------------------- | ----------------------------- |
| merchant_reference | &check;             | String   |                   | Unique                                  | Identifier of the merchant in the system. |
| week_day_key       | &check;             | Weekday  |                   | Weekday name is in format: WEEKDAY_NAME | Weekday name.                             |
| time_from          |               | Datetime |                   | Time is in format. hh:mm:ss              | Time from.                                |
| time_to            |               | Datetime |                   | Time is in format. hh:mm:ss              | Time to.                                  |

## Import file dependencies

The file has the following dependencies:

- [merchant.csv](/docs/marketplace/dev/data-import/{{site.version}}/file-details-merchant.csv.html)

## Import template file and content example

Find the template and an example of the file below:

| FILE   | DESCRIPTION    |
| ---------------------------- | ---------------------------- |
| [template_merchant_open_hours_week_day_schedule.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_open_hours_week_day_schedule.csv) | Import file template with headers only.         |
| [merchant_open_hours_week_day_schedule.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_open_hours_week_day_schedule.csv) | Example of the import file with Demo Shop data. |

---
title: "File details: merchant_open_hours_date_schedule.csv"
last_updated: Jun 07, 2021
description: This document describes the merchant_open_hours_date_schedule.csv file to configure Merchant opening hours information in your Spryker shop.
template: import-file-template
related:
  - title: Merchant Opening Hours feature overview
    link: docs/pbc/all/merchant-management/page.version/merchant-opening-hours-feature-overview.html
---

This document describes the `merchant_open_hours_date_schedule.csv` file to configure [special merchant opening hours](/docs/pbc/all/merchant-management/{{site.version}}/merchant-opening-hours-feature-overview.html) in your Spryker shop.

## Import file dependencies

[merchant.csv](/docs/marketplace/dev/data-import/{{site.version}}/file-details-merchant.csv.html)

## Import file parameters


| PARAMETER      | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS  | DESCRIPTION                               |
| ------------- | ---------- | ------ | ----------- | ------------------- | ------------------------------------ |
| merchant_reference | &check;             | String   |                   | Unique                        | Identifier of the merchant in the system.     |
| date               | &check;             | Date     |                   | Date is in format: yyyy-mm-dd | Date of the described schedule.               |
| time_from          |               | Datetime |                   | Time is in format hh:mm:ss    | Time from.                                    |
| time_to            |               | Datetime |                   | Time is in format hh:mm:ss    | Time to.                                      |
| note               |               | String   |                   |                               | Additional notes or comments to the schedule. |


## Import template file and content example

| FILE     | DESCRIPTION    |
| -------------------------- | -------------------------- |
| [template_merchant_open_hours_date_schedule.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/template_merchant_open_hours_date_schedule.csv) | Import file template with headers only.         |
| [merchant_open_hours_date_schedule.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Marketplace+setup/merchant_open_hours_date_schedule.csv) | Example of the import file with Demo Shop data. |

## Import command

```bash
data:import merchant-opening-hours-date-schedule
```

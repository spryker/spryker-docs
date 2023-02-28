---
title: Merchant Opening Hours feature overview
last_updated: Jul 27, 2021
description: The Merchant Opening Hours feature lets you define opening hours for a merchant.
template: concept-topic-template
redirect_from:
- /docs/marketplace/user/features/202212.0/merchant-opening-hours-feature-overview.html
---

To provide maximum selling activity, merchants can provide their working schedule, by defining the opening hours on weekdays, holidays and exceptional cases.

A merchant has the following:

* Default opening hours—defined per weekday and time including:

    * Lunch break time
    * Open/Closed state

* Special opening hours are relevant for cases:

    * Merchant is opened on a usually closed day—for example, Sunday.
    * Merchant has different opening hours in comparison to a normal schedule—for example, December 31st has shorter opening hours.

* Public holidays—special days when the Merchant is not available due to the public holidays

To display merchant opening hours on the Storefront, you should import the open hours information. For information about how to do that, see [File details: merchant_open_hours_date_schedule.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-open-hours-date-schedule.csv.html) and [File details: merchant_open_hours_week_day_schedule.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-open-hours-week-day-schedule.csv.html).

## Related Developer articles

|INSTALLATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  |
|---------|---------|---------|
| [Merchant Opening Hours feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-opening-hours-feature-integration.html)    |[Retrieve profile information for a merchant](/docs/marketplace/dev/glue-api-guides/{{page.version}}/merchants/retrieving-merchants.html#retrieve-a-merchant)        | [File details: merchant_open_hours_week_day_schedule.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-open-hours-week-day-schedule.csv.html)        |
| [Glue API: Merchant Opening Hours integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/merchant-opening-hours-feature-integration.html)    |[Retrieve merchant opening hours](/docs/marketplace/dev/glue-api-guides/{{page.version}}/merchants/retrieving-merchant-opening-hours.html)         | [File details: merchant_open_hours_date_schedule.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-open-hours-date-schedule.csv.html)        |

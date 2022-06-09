---
title: Merchant Opening Hours feature walkthrough
description: The Merchant Opening Hours lets you define opening hours for a merchant.
template: feature-walkthrough-template
---

By using the 'Merchant Opening Hours' feature, merchants can save their opening hours in the system and make them accessible to customers. A merchant may have a weekday schedule, which is an opening schedule for every day of the week, as well as date-based exceptions, such as during the holiday season when opening hours may be different.

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Merchant Opening Hours feature overview](/docs/marketplace/user/features/{{page.version}}/merchant-opening-hours-feature-overview.html) for business users.

{% endinfo_block %}

## Module dependency graph

The following diagram illustrates the dependencies between the modules for the *Merchant Opening Hours* feature.

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/0b05a957-57a4-4422-9595-5bbe63a6a18b.png?utm_medium=live&utm_source=custom)

| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| MerchantOpeningHours | Provides merchants with the ability to schedule opening hours. |
| MerchantOpeningHoursDataImport | Data importer for the `MerchantOpeningHours`. |
| MerchantOpeningHoursStorage | Manages storage for merchant opening hours entities. |
| WeekdaySchedule | Configures weekdays and dates based on your schedule. |
| MerchantOpeningHoursWidget | Provides a widget to show merchant opening hours. |
| MerchantOpeningHoursRestApi | Provides REST API endpoints to manage merchant opening hours. |
| Merchant | Provides database structure and facade methods to save/update/remove merchants. |
| MerchantStorage | Manages storage for merchant entities. |

## Domain model

The following schema illustrates the Merchant Opening Hours domain model:

![Domain Model](https://confluence-connect.gliffy.net/embed/image/ad57523c-52cd-4733-bfb5-9c43666ae54c.png?utm_medium=live&utm_source=custom)


## Related Developer articles

|INTEGRATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  |
|---------|---------|---------|
| [Merchant Opening Hours feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-opening-hours-feature-integration.html)    |[Retrieve profile information for a merchant](/docs/marketplace/dev/glue-api-guides/{{page.version}}/merchants/retrieving-merchants.html#retrieve-a-merchant)        | [File details: merchant_open_hours_week_day_schedule.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-open-hours-week-day-schedule.csv.html)        |
| [Glue API: Merchant Opening Hours integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/merchant-opening-hours-feature-integration.html)    |[Retrieve merchant opening hours](/docs/marketplace/dev/glue-api-guides/{{page.version}}/merchants/retrieving-merchant-opening-hours.html)         | [File details: merchant_open_hours_date_schedule.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-open-hours-date-schedule.csv.html)        |

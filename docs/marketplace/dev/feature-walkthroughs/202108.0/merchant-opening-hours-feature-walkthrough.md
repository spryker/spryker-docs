---
title: Merchant Opening Hours feature walkthrough
last_updated: Apr 23, 2021
description: The Merchant Opening Hours allows you to define opening hours for a merchant.
template: concept-topic-template
---

The *Merchant Opening Hours* feature allows merchants to have their opening hours saved in the system and be retrievable for customers. A merchant can have a weekday schedule, which is a daily schedule for every day of the week, as well as date-based exceptions where they set up different opening hours for specific dates, for example, during the holiday season.

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Merchant Opening Hours feature overview](/docs/marketplace/user/features/{{page.version}}/merchant-opening-hours-feature-overview.html) for business users.

{% endinfo_block %}

## Module dependency graph

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/0b05a957-57a4-4422-9595-5bbe63a6a18b.png?utm_medium=live&utm_source=custom)

| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| MerchantOpeningHours | MerchantOpeningHours module provides ability to configure a scheduling of opening hours for Merchant. |
| MerchantOpeningHoursDataImport | Data importer for MerchantOpeningHours. |
| MerchantOpeningHoursStorage | Manages storage for merchant opening hours entities. |
| WeekdaySchedule | WeekdaySchedule module provides ability to configure a scheduling of weekdays and dates. |
| MerchantOpeningHoursWidget | This module provides a widget to show merchant opening hours. |
| MerchantOpeningHoursRestApi | Provides REST API endpoints to manage merchant opening hours. |

## Domain model

![Domain Model](https://confluence-connect.gliffy.net/embed/image/ad57523c-52cd-4733-bfb5-9c43666ae54c.png?utm_medium=live&utm_source=custom)


## Related Developer articles


|INTEGRATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  |
|---------|---------|---------|
| [Merchant Opening Hours feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-opening-hours-feature-integration.html)    |[Retrieve profile information for a merchant](/docs/marketplace/dev/glue-api-guides/{{page.version}}/merchants/retrieving-merchants.html#retrieve-a-merchant)        | [File details: merchant_open_hours_week_day_schedule.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-open-hours-week-day-schedule.csv.html)        |
| [Glue API: Merchant Opening Hours integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/merchant-opening-hours-feature-integration.html)    |[Retrieve merchant opening hours](/docs/marketplace/dev/glue-api-guides/{{page.version}}/merchants/retrieving-merchant-opening-hours.html)         | [File details: merchant_open_hours_date_schedule.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-open-hours-date-schedule.csv.html)        |

---
title: "Merchant Opening Hours feature: Domain model"
description: The Merchant Opening Hours lets you define opening hours for a merchant.
template: concept-topic-template
last_updated: Nov 17, 2023
redirect_from:
  - /docs/marketplace/dev/feature-walkthroughs/202311.0/merchant-opening-hours-feature-walkthrough.html
  - /docs/pbc/all/merchant-management/latest/marketplace/domain-model-and-relationships/merchant-opening-hours-feature-domain-model.html
---

By using the 'Merchant Opening Hours' feature, merchants can save their opening hours in the system and make them accessible to customers. A merchant may have a weekday schedule, which is an opening schedule for every day of the week, as well as date-based exceptions, such as during the holiday season when opening hours may be different.

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

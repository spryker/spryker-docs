---
title: Merchant Opening Hours feature overview
last_updated: Jul 27, 2021
description: The Merchant Opening Hours feature lets you define opening hours for a merchant.
template: concept-topic-template
---

To provide maximum selling activity, merchants can provide their working schedule, by defining the opening hours on weekdays, holidays and exceptional cases.

A merchant has:

* Default opening hours—defined per weekday and time including:
    * Lunch break time
    * Open/Closed state

* Special opening hours—are relevant for cases:

    * Merchant is opened on a usually closed day (for example, Sunday)
    * Merchant has different opening hours in comparison to a normal schedule (for example, December 31th has shorter opening hours)

* Public holidays—special days when the Merchant is not available due to the public holidays

To display merchant opening hours on the Storefront, you should import the open hours information. See [File details: merchant_open_hours_date_schedule.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-open-hours-date-schedule.csv.html) and [File details: merchant_open_hours_week_day_schedule.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-open-hours-week-day-schedule.csv.html) for information on how to do that.

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Merchant Opening Hours feature walkthrough](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/merchant-opening-hours-feature-walkthrough.html) for developers. 

{% endinfo_block %}
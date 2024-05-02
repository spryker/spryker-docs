---
title: Scheduled Prices feature overview
description: The document describes the Scheduled Prices feature, price types, time zones, and the way scheduled prices can be created.
last_updated: Aug 19, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/scheduled-prices-feature-overview
originalArticleId: 8a5fc988-3b43-4467-9cd6-97d54a039d1d
redirect_from:
  - /docs/scos/user/features/202108.0/scheduled-prices-feature-overview.html
  - /docs/scos/user/features/202311.0/scheduled-prices-feature-overview.html
  - /docs/pbc/all/price-management/202204.0/base-shop/scheduled-prices-feature-overview.html
---

The _Scheduled Prices_ feature lets shop administrators schedule price changes, which are to happen in the future for multiple products simultaneously.

Instead of changing prices manually, you can prepare a list of prices with time frames that are to be applied automatically. For example, if you want to increase the prices of the products that are in great demand on a certain date before Christmas eve and decrease them on a certain date afterward. The Scheduled Prices feature lets you specify prices and the dates beforehand.

An in-built cron job switches the prices on the specified dates for all the specified products automatically. Apart from major events, you can use this feature to update prices across the shop without having to do it manually for each product since the feature lets you do it from one place in bulk.

## Price types

The feature only works with the following price types:
* Default
* Original

A *default price* is the one that is shown as the real price of the product.

An *original price* is the one that, in the frontend, is shown as a strikethrough to identify that the price has been used before the default price was applied, as if there is a promotion.
![Default original price](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Scheduled+Prices/Scheduled+Prices+Feature+Overview/default-original-price.png)

## Time zones

You can define price schedules using any time zone. For example, the following value defines the price application time in Europe/Berlin time zone: 2019-06-23T23:00:00+02:00.

{% info_block infoBox %}

Even though you can use any time zone for defining a price schedule, in the database, the time is saved in the UTC time zone.

{% endinfo_block %}

## Defining product price schedules

You can define price schedules as follows:
Import a CSV file with a list of prices. This option is for bulk operations. You can import the file through [Back Office](/docs/pbc/all/price-management/{{site.version}}/base-shop/manage-in-the-back-office/create-scheduled-prices.html) or [manually](/docs/pbc/all/price-management/{{site.version}}/base-shop/import-and-export-data/import-file-details-product-price-schedule.csv.html).
Add a price schedule to a single abstract or concrete product. This option is suitable for working with a small number of products. For details, see [Edit abstract products and product bundles](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/edit-abstract-products-and-product-bundles.html).

## Cron job

Once [imported](/docs/pbc/all/price-management/{{site.version}}/base-shop/manage-in-the-back-office/create-scheduled-prices.html), prices do not get updated right away. To automate price application, a cron job shipped with the feature. The cron job checks if there are any imported scheduled prices that need to be applied or reverted. If there is a price schedule that passes its starting or ending date, the cron job applies the changes.

By default, the cron job runs every day at 00:06:00-00:00. In some cases, it might be necessary to change this behavior. For example, if you schedule a price to be updated at 00:01:00-00:00, the price is updated at 00:06:00-00:00 since that's when the cron job runs. 00:01:00-00:00. In this case, you can [schedule the cron job](/docs/pbc/all/price-management/{{page.version}}/base-shop/tutorials-and-howtos/schedule-cron-job-for-scheduled-prices.html) to be run at 00:01:00-00:00. When you add, edit, or delete a price schedule while editing a product, the cron job runs automatically for this single product.

{% info_block infoBox %}

The default number of prices, which the cron job can process at a time, is 1000. If you have more prices to be updated, the cron job only updates the first 1000 prices. You can change the number in `/Pyz/Zed/PriceProductSchedule/PriceProductScheduleConfig`.

{% endinfo_block %}

If you import prices that need to be applied right away, you can run `price-product-schedule:apply` console command. This command applies the imported prices in the current store. If needed, you can specify the store by adding a store relation parameter. For example, you would use the following command to apply imported prices in the US store: `APPLICATION_STORE=US console price-product-schedule:apply`.

{% info_block infoBox %}

Unlike imported price schedules, the price schedules added, deleted, or edited from the **Edit Product** page trigger the cron job to be run at once for the modified product.

{% endinfo_block %}

## Scheduled price application logic

You can schedule multiple prices on overlapping dates. For example, you define the following schedule:
* Scheduled price #1 takes effect between 01.01 and 31.07.
* Scheduled price #2 takes effect between 25.02 and 08.06.
* Scheduled price #3 takes effect between 01.03 and 01.04.

In this case:
* Scheduled price #1 is applied on 01.01 and remains active till scheduled price #2 gets applied on 25.02.
* Scheduled price #2 remains active until scheduled price #3 gets applied on 01.03.
* When the active period of scheduled price #3 ends on 01.04, the price reverts back to scheduled price #2.
* When the active period of scheduled price #2 ends on 08.06, the price reverts back to scheduled price #1.
![Price application diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Scheduled+Prices/Scheduled+Prices+Feature+Overview/price-application-diagram.png)

* When there are no scheduled prices left to apply, the ORIGINAL price specified outside of the scheduled price logic gets applied.
* When there are no scheduled prices left to apply, and the ORIGINAL price is not specified outside of the scheduled price logic, you can add the product to the cart, and its price won't be displayed.

## Current constraints

The feature has the following functional constraints which are going to be resolved in the future.

* The default number of prices that the cron job can process at a time is 1000.
* The feature does not work with merchant prices ([relations](/docs/pbc/all/merchant-management/{{site.version}}/base-shop/merchant-b2b-contracts-and-contract-requests-feature-overview.html)) and [volume prices](/docs/pbc/all/price-management/{{site.version}}/base-shop/prices-feature-overview/volume-prices-overview.html).

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Manage scheduled prices](/docs/pbc/all/price-management/{{site.version}}/base-shop/manage-in-the-back-office/create-scheduled-prices.html)  |

## Related Developer documents

|INSTALLATION GUIDES  | UPGRADE GUIDES | DATA IMPORT | TUTORIALS AND HOWTOS |
|---------|---------|---------|---------|
| [Integrate the Scheduled prices feature](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-scheduled-prices-feature.html) | [Upgrade the PriceProductSchedule module](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-priceproductschedule-module.html)  | [File details: product_price_schedule.csv](/docs/pbc/all/price-management/{{site.version}}/base-shop/import-and-export-data/import-file-details-product-price-schedule.csv.html) | [HowTo: Schedule cron job for Scheduled Prices](/docs/pbc/all/price-management/{{page.version}}/base-shop/tutorials-and-howtos/schedule-cron-job-for-scheduled-prices.html)  |
|   | [Upgrade the PriceProductScheduleGui module](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-priceproductschedulegui-module.html)  |   |   |

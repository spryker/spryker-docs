---
title: Scheduled prices feature overview
originalLink: https://documentation.spryker.com/v6/docs/scheduled-prices-feature-overview
redirect_from:
  - /v6/docs/scheduled-prices-feature-overview
  - /v6/docs/en/scheduled-prices-feature-overview
---

## Introduction

The Scheduled prices feature enables shop administrators to schedule price changes, which are to happen in the future for multiple products simultaneously.

## Price Types

Currently, the feature only works with the following price types:

* default
* original

A default price is the one that is shown as a real price of product.

An original price is the one that, in the front end, is shown as a strikethrough to identify that the price has been used before the default price was applied as if there is a promotion.
![Default original price](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Scheduled+Prices/Scheduled+Prices+Feature+Overview/default-original-price.png){height="" width=""}

## Time Zones

You can define price schedules using any time zone. For example, the following value defines the price application time in Europe/Berlin time zone: 2019-06-23T23:00:00+02:00.

{% info_block infoBox %}
Even though it is possible to use any time zone for defining a price schedule, in database, the time is saved in UTC time zone.
{% endinfo_block %}

## Defining Product Price Schedules
You can define price schedules as follows:
Import a csv file with a list of prices. This option is for bulk operations. You can import the file via [Back Office](https://documentation.spryker.com/docs/en/creating-scheduled-prices) or [manually](https://documentation.spryker.com/docs/ht-import-scheduled-prices-201907).
Add a price schedule to a single abstract or concrete product. This option is suitable for working with a small number of products. See [Editing an Abstract Product](https://documentation.spryker.com/docs/editing-an-abstract-product).

## Cron Job

Once [imported](https://documentation.spryker.com/docs/creating-scheduled-prices), prices do not get updated right away. In order to automate price application, there is a cron job shipped with the feature. The cron job checks if there are any imported scheduled prices that need to be applied or reverted. If there is a price schedule that passed its starting or ending date, the cron job applies the changes.

By default, the cron job runs every day at 00:06:00-00:00. In some cases, it might be necessary to change this behavior. For example, if you schedule a price to be updated at 00:01:00-00:00, the price will be updated at 00:06:00-00:00 since that's when the cron job runs. 00:01:00-00:00. In this case, you can [schedule the cron job](https://documentation.spryker.com/docs/ht-schedule-cron-job-for-scheduled-prices-201907) to be run at 00:01:00-00:00. When you add, edit or delete a price schedule while editing a product, the cron job runs automatically for this single product. 

{% info_block infoBox %}
The default number of prices which the cron job can process at a time is 1000. If you have more prices to be updated, the cron job will only update the first 1000 prices. You can change the number in `\Pyz\Zed\PriceProductSchedule\PriceProductScheduleConfig`.
{% endinfo_block %}

If you import prices that need to be applied right away, you can run `price-product-schedule:apply` console command. This command applies the imported prices in current store. If needed, you can specify the store by adding a store relation parameter. For example, you would use the following command to apply imported prices in US store: `APPLICATION_STORE=US console price-product-schedule:apply`.

{% info_block infoBox %}
Unlike imported price schedules, the price schedules added, deleted or edited from the Edit Product page, trigger the cron job to be run at once for the modified product.
{% endinfo_block %}

## Scheduled Price Application Logic

You can schedule multiple prices on overlapping dates. For example, you define that:

* Scheduled price #1 takes effect between <b>01.01</b> and <b>31.07</b>.
* Scheduled price #2 takes effect between <b>25.02</b> and <b>08.06</b>.
* Scheduled price #3 takes effect between <b>01.03</b> and <b>01.04</b>.

In this case:

* Scheduled price #1 is applied on <b>01.01</b> and remains active till scheduled price #2 gets applied on <b>25.02</b>.
* Scheduled price #2 remains active till the scheduled price #3 gets applied on <b>01.03</b>.
* When active period of scheduled price #3 ends on <b>01.04</b>, price reverts back to scheduled price #2.
* When active period of scheduled price #2 ends on <b>08.06</b>, price reverts back to the scheduled price #1.
![Price application diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Scheduled+Prices/Scheduled+Prices+Feature+Overview/price-application-diagram.png){height="" width=""}

* When there are no scheduled prices left to apply, the ORIGINAL price specified outside of scheduled price logic, gets applied.
* When there are no scheduled prices left to apply and there has been no ORIGINAL price specified outside of scheduled price logic, it will become impossible to add the product to cart and its price won't be displayed.

## Current Constraints

Currently, the feature has the following functional constraints which are going to be resolved in the future.

* The default number of prices which the cron job can process at a time is 1000.
* The feature does not work with merchant prices ([relations](https://documentation.spryker.com/docs/merchants-and-merchant-relations)) and [volume prices](https://documentation.spryker.com/docs/volume-prices).


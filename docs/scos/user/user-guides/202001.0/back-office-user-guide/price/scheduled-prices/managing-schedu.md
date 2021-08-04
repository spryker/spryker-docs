---
title: Managing Scheduled Prices
originalLink: https://documentation.spryker.com/v4/docs/managing-scheduled-prices
redirect_from:
  - /v4/docs/managing-scheduled-prices
  - /v4/docs/en/managing-scheduled-prices
---

This topic gives an insight into the actions you can perform with scheduled prices.
***
To start working with scheduled prices, go to **Prices > Scheduled Prices**.
***
You can:

* View, edit, download and delete scheduled price imports by clicking respective buttons in the *Actions* column in the **Scheduled prices imported** section.
* Edit and delete scheduled prices by clicking respective buttons in the Actions column in the **Scheduled prices imported** section.

## Viewing Scheduled Price Imports
To view an import:
In the **Scheduled Prices** page, click **View** in the *Actions* column.
In the **View** page, the following information is available:

* General information
* Scheduled prices inside this import

{% info_block infoBox %}
See [Scheduled Prices: Reference Information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/price/scheduled-prices/references/scheduled-price
{% endinfo_block %} to learn more about attributes on this page.)

## Editing Scheduled Price Imports
To edit an import:
1. In the **Scheduled Prices** page, click **Edit** next to the import that you want to update.
2. In the **Edit Import** page that opens, you can perform the following actions:
    * change the scheduled price import name;
    * edit a scheduled price;
    * delete a scheduled price.
{% info_block infoBox %}
See [Scheduled Prices: Reference Information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/price/scheduled-prices/references/scheduled-price
{% endinfo_block %} for more details.)
## Editing Scheduled Prices

To edit a scheduled price:

1. In the **Scheduled Prices** page, click **Edit** next to the import in which the scheduled price that you want to update is located.
2. In the **Edit Import** page, click **Edit** next to the scheduled price that you want to update.
3. In the **Edit Scheduled Price** page, you can perform the following actions:
    * change store relation;
    * change currency;
    * specify Net and Gross prices;
    * specify the validity period.

{% info_block infoBox %}
See [Scheduled Prices: Reference Information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/price/scheduled-prices/references/scheduled-price
{% endinfo_block %} for more details.)
{% info_block errorBox %}
Performing this action triggers the scheduled prices cron job to be run for the product for which this scheduled price has been added.
{% endinfo_block %}

**Tips & Tricks**
In the Edit Scheduled Price page, you can return to the **Edit Import** page. To do this, click **Back to the import**.

## Downloading Scheduled Price Imports
To download an import:

1. In the **Scheduled Prices** page, click **Download** next to the scheduled price import that you want to download.
2. Confirm the action in the pop-up window.

## Deleting Scheduled Price Imports
To delete an import:

1. In the **Scheduled Prices** page, click **Delete** next to the import that you want to delete.
2. In the **Delete Import page**, click **Yes**, delete those prices to confirm the action.

{% info_block errorBox %}
<ul><li>All the scheduled prices located in an import are deleted when the import is deleted.</li><li>Performing this action triggers the scheduled prices cron job to be run for the products which have had corresponding scheduled prices in this import.</li></ul>
{% endinfo_block %}

## Deleting Scheduled Prices

To delete a scheduled price:

1. In the **Scheduled Prices** page, click **Edit** next to the import in which the scheduled price that you want to delete is located.
2. In the **Edit Import** page, click **Delete** next to the scheduled price that you want to delete.
3. Click **Yes, delete this price** to confirm the action.

{% info_block errorBox %}
Performing this action triggers the scheduled prices cron job to be run for the product the scheduled price of which you delete.
{% endinfo_block %}


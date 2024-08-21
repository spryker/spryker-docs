---
title: Manage scheduled prices
last_updated: Sep 10, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-scheduled-prices
originalArticleId: 27e7b867-18f5-4872-9e28-a6da730af458
redirect_from:
  - /2021080/docs/managing-scheduled-prices
  - /2021080/docs/en/managing-scheduled-prices
  - /docs/managing-scheduled-prices
  - /docs/en/managing-scheduled-prices
  - /docs/scos/user/back-office-user-guides/202307.0/catalog/scheduled-prices/managing-scheduled-prices.html
related:
  - title: Scheduled Prices feature overview
    link: docs/pbc/all/price-management/page.version/base-shop/scheduled-prices-feature-overview.html
  - title: Creating scheduled prices
    link: docs/pbc/all/price-management/page.version/base-shop/manage-in-the-back-office/create-scheduled-prices.html
---


## Prerequisites

To start working with scheduled prices, go to **Catalog&nbsp;<span aria-label="and then">></span> Scheduled Prices**.

Each section contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.

## Editing scheduled price imports

To edit an import:

1. On the *Scheduled Prices* page, next to the import that you want to update, click **Edit**.
2. On the *Edit Import* page that opens, you can perform the following actions:
    * Change the scheduled price import name.
    * Edit a scheduled price.
    * Delete a scheduled price.

### Reference information: Viewing and editing scheduled price imports

This section describes the attributes you see, enter, or select while viewing and editing scheduled price imports.

{% info_block infoBox "Info" %}

Since the *View Import* and *Edit Import* pages have almost the same attributes, you can use the attributes in this section while both viewing and editing imports.

{% endinfo_block %}

#### General information section

| ATTRIBUTE | DESCRIPTION | VIEW PAGE | EDIT PAGE |
| --- | --- | --- | --- |
| Import n | Numeric identifier of the scheduled price import. | &check; | &check; |
| Name | Alphabetic identifier of the scheduled price import. | &check; | Editable |
| Imported by and on the | Back office user who imported the list and the time of the import. | &check; | &check; |
| Number of prices | Number of scheduled prices in the imported list. | &check; | &check; |
| Number of products | Number of products which have scheduled prices assigned to them in an imported list. | &check; | &check; |

#### Scheduled prices inside this import section

| ATTRIBUTE | DESCRIPTION | VIEW PAGE | EDIT PAGE |
| --- | --- | --- | --- |
| Abstract SKU | Identifier of the abstract product to which price schedule is assigned. | &check; | &check; |
| Concrete SKU | Identifier of the concrete product to which price schedule is assigned. | &check; | &check; |
| Price Type | Price type in which price schedule is defined: DEFAULT or ORIGINAL. | &check; | &check; |
| Currency | Currency in which price schedule is defined. | &check; | &check; |
| Store | Store relation of the product to which price schedule is assigned. | &check; | &check; |
| Net price | Net value of product defined by the price schedule. | &check; | &check; |
| Gross price | Gross value of product defined by the price schedule. | &check; | &check; |
| Start from (included) | Date on which the price specified by the price schedule gets applied. | &check; | &check; |
| Finish at (included) | Date on which the price specified by the price schedule gets reverted back. | &check; | &check; |
| Actions | Set of actions that you can do with a price schedule. |  | &check; |

## Editing scheduled prices

1. On the *Scheduled Prices* page, click **Edit** next to the import in which the scheduled price that you want to update is located.
2. On the *Edit Import* page, click **Edit** next to the scheduled price that you want to update.
3. On the *Edit Scheduled Price* page, you can perform the following actions:
    * Change store relation.
    * Change currency.
    * Specify Net and Gross prices.
    * Specify the validity period.

{% info_block errorBox %}

Performing this action triggers the scheduled prices cron job to be run for the product for which this scheduled price has been added.

{% endinfo_block %}

**Tips and tricks**
<br>In the Edit Scheduled Price page, you can return to the *Edit Import* page. To do this, click **Back to the import**.

### Reference information: Editing scheduled prices

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Abstract SKU | Identifier of the abstract product to which price schedule is assigned. |
| Concrete SKU | Identifier of the concrete product to which price schedule is assigned. |
| Store | Store relation of the product to which price schedule is assigned. |
| Currency | Currency in which price schedule is defined. |
| Net price | Net value of product defined by the price schedule. |
| Gross price | Gross value of product defined by the price schedule. |
| Price Type | Price type in which price schedule is defined: DEFAULT or ORIGINAL. |
| Start from (included) | Date on which the price specified by the price schedule gets applied. |
| Finish at (included) | Date on which the price specified by the price schedule gets reverted back. |

## Downloading scheduled price imports

1. On the *Scheduled Prices* page, next to the scheduled price import that you want to download, click **Download**
2. Confirm the action in the pop-up window.

## Deleting scheduled price imports

1. On the *Scheduled Prices* page,  next to the import that you want to delete, click **Delete**.
2. On the *Delete Import* page, click **Yes**, delete those prices to confirm the action.

{% info_block errorBox %}

- All the scheduled prices in an import are deleted when the import is deleted.
- Performing this action triggers the scheduled prices cron job to be run for the products which have had corresponding scheduled prices in this import.

{% endinfo_block %}

## Deleting scheduled prices

1. On the *Scheduled Prices* page, click **Edit** next to the import in which the scheduled price that you want to delete is located.
2. On the *Edit Import* page, click **Delete** next to the scheduled price that you want to delete.
3. Click **Yes, delete this price** to confirm the action.


{% info_block errorBox %}

Performing this action triggers the scheduled prices cron job to be run for the product the scheduled price of which you delete.

{% endinfo_block %}

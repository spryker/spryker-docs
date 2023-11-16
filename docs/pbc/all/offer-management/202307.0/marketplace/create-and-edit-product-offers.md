---
title: Create and edit product offers
description: Learn how to create and edit product offers in the Merchant Portal
template: back-office-user-guide-template
redirect_from:
  - /docs/pbc/all/offer-management/202307.0/marketplace/manage-product-offers.html
related:
  - title: Marketplace Product Offer feature overview
    link: docs/pbc/all/offer-management/page.version/marketplace/marketplace-product-offer-feature-overview.html
---

This document describes how to create and edit product offers in the Merchant Portal.

## Prerequisites

To start managing product offers, in the Merchant Portal, go to **Offers**.

Review the [reference information](#reference-information-create-and-edit-product-offers) before you start, or look up the necessary information as you go through the process.

## Create a product offer

1. On the **Offers** page, click **Add Offer**.
    This opens the **Create Offer** page.
2. In the **List of Products** pane, select the product to create an offer for.
  The **Create Offer** drawer opens.
3. Optional: To make the offer active after creating it, select **Offer is Active**.
4. Optional: Enter a **Merchant SKU**.
5. Select one or more **Stores**.
6. Enter a **Quantity**.
7. Optional: To always display the product offer as available on the Storefront, select **Always in Stock**.
8. To add prices, in the **Price** section, do the following:
  1. Click **Add**.
  2. Select a **STORE**.
  3. Select a **CURRENCY**.
  4. Optional: Enter any of the prices:
    * **NET DEFAULT**
    * **GROSS DEFAULT**
    * **NET ORIGINAL**
    * **GROSS ORIGINAL**
  5. Optional: Enter a **VOLUME QUANTITY**.
  6. Repeat steps 1-5 until you add all the needed prices.
9. Optional: Select **Validity Dates**.
10. Scroll up and click **Create**.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Merchant+Portal+user+guides/Offers/creating-product-offers.gif)


## Edit a product offer

1. On the **Offers** page, select the offer you want to edit.
2. In the drawer that opens, change the needed fields.
3. Click **Save**.
    This closes the drawer with a success message displayed.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Merchant+Portal+user+guides/Offers/edit-offers.gif)


## Reference information: Create and edit product offers

| ATTRIBUTE     | DESCRIPTION |
| ------------- |  ------------- |
| Offer status | Defines if the offer is displayed on the Storefront. By default, the offer is active. |
| Merchant SKU     | Unique identifier of product offer in the merchant's ERP.              |
| Offer Reference  | Unique identifier of the product offer in the Marketplace. |
| Stores           | Defines the stores where the product offer is available.      |
| Quantity            | Defines the stock of the product offer.                     |
| Price            | Prices of the product offer per store, currency, and volume quantity. Volume quantity defines the minimum product offer quantity to be added to cart for the price to apply. |
| Validity Dates   | Defines the period during which the product offer is visible on the Storefront. |

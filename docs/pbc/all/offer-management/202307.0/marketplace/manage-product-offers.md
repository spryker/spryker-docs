---
title: Manage product offers
description: This document describes the actions a Merchant can do in the Offers section in the Merchant Portal.
template: back-office-user-guide-template
last_updated: Jul 25, 2023
related:
  - title: Marketplace Product Offer feature overview
    link: docs/pbc/all/offer-management/page.version/marketplace/marketplace-product-offer-feature-overview.html
---

This document describes the actions a Merchant can do in the Offers section in the Merchant Portal.

## Prerequisites

To start managing product offers, navigate to the **Merchant Portal** > **Offers**.

Review the reference information in this article before you start, or look up the necessary information as you go through the process.

## Creating a product offer

To create a product offer, follow these steps:

1. Click **Add Offer**.
2. From the list of concrete products, select the product you want to create an offer for.
  The *Create Offer* drawer opens.
3. Optional: To make the offer active after creating it, select **Offer is Active**.
4. Optional: Enter a **Merchant SKU**.
5. Select one or more **Stores**.
6. Enter a **Quantity**.
7. Optional: To always display the product offer as available on the Storefront, select **Always in Stock**.
8. To add prices, in the *Price* section, do the following:
  1. select **Add**.
  2. Select a **STORE**.
  3. Select a **CURRENCY**.
  4. Optional: Enter any of the prices:
    * **NET DEFAULT**
    * **GROSS DEFAULT**
    * **NET ORIGINAL**
    * **GROSS ORIGINAL**
  5. Optional: Enter a **VOLUME QUANTITY**.
  6. Repeat steps 1-5 until you add all the desired prices.
9. Optional: Select **Validity Dates**.
10. Scroll up and select **Create**.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Merchant+Portal+user+guides/Offers/creating-product-offers.gif)



## Editing a product offer

To edit an existing product offer:

1. From the list of offers, select the offer you want to edit.
2. In the drawer, change the desired fields.
3. Select **Save**.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Merchant+Portal+user+guides/Offers/edit-offers.gif)



## Reference information: Creating and editing product offers

This section describes attributes you see when creating and editing a product offer.

On all the pages described below, you can rearrange, hide, and show columns by clicking the settings cogwheel next to the tables.

### Offers page

On the *Offers* page, you do the following:

* Filter product offers using the filtering menu at the top of the page.
* Sort product offers by clicking on the desired column name.
* Using the search field in the top right corner, search product offers by the criteria: offer reference, merchant reference, and product SKU.

### Create Offer page

On the *Create Offer* page, you see the list of products you can create an offer for. On this page, you can do the following:

* Filter products using the filtering menu at the top of the page.
* Sort products by clicking on the desired column name.
* Using the search field in the top right corner, search products by the criteria: product name and product SKU.


### Create and edit offer drawers

The following table describes the attributes on the *Create offer* and *Edit offer* drawers:

| ATTRIBUTE     | DESCRIPTION |
| ------------- |  ------------- |
| Offer status | Defines if the offer is displayed on the Storefront. By default, the offer is active. |
| Merchant SKU     | Unique identifier of product offer in the merchant's ERP.              |
| Offer Reference  | Unique identifier of the product offer in the Marketplace. |
| Stores           | Defines the stores where the product offer is available.      |
| Quantity            | Defines the stock of the product offer.                     |
| Price            | Prices of the product offer per store, currency, and volume quantity. Volume quantity defines the minimum product offer quantity to be added to cart for the price to apply. |
| Validity Dates   | Defines the period during which the product offer is visible on the Storefront. |

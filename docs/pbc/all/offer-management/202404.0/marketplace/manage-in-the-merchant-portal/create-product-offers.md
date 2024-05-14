---
title: Create product offers
description: learn how to create product offers in the Merchant Portal.
template: back-office-user-guide-template
last_updated: Jan 9, 2024
redirect_from:
  - /docs/pbc/all/offer-management/202311.0/marketplace/manage-product-offers.html
related:
  - title: Marketplace Product Offer feature overview
    link: docs/pbc/all/offer-management/page.version/marketplace/marketplace-product-offer-feature-overview.html
---

To create a product offer in the Merchant Portal, follow the steps:


1. Go to **Offers**.
2. On the **Offers** page, click **Add Offer**.
  This opens the **Create Offer** page.
3. Select the product you want to create an offer for.
  This opens the **Create Offer** drawer.
4. Optional: To make the offer active after creating it, select **Offer is Active**.
5. Optional: Enter a **Merchant SKU**.
6. Select one or more **Stores**.
7. Enter a **Quantity**.
8. Optional: To always display the product offer as available on the Storefront, select **Always in Stock**.
9. To add prices, in the **Price** section, do the following:
  1. Select **Add**.
  2. Select a **STORE**.
  3. Select a **CURRENCY**.
  4. Optional: Enter any of the prices:
    * **NET DEFAULT**
    * **GROSS DEFAULT**
    * **NET ORIGINAL**
    * **GROSS ORIGINAL**
  5. Optional: Enter a **VOLUME QUANTITY**.
  6. Repeat steps 1-5 until you add all the needed prices.
10. Optional: Select **Validity Dates**.
11. Scroll up and select **Create**.
    This opens the **Offers** page with a success message displayed. The created product offer is displayed in the list.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Merchant+Portal+user+guides/Offers/creating-product-offers.gif)

## Reference information: Create product offers

| ATTRIBUTE     | DESCRIPTION |
| ------------- |  ------------- |
| Offer status | Defines if the offer is displayed on the Storefront. By default, the offer is active. |
| Merchant SKU     | Unique identifier of product offer in the merchant's ERP.              |
| Offer Reference  | Unique identifier of the product offer in the Marketplace. |
| Stores           | Defines the stores where the product offer is available.      |
| Quantity            | Defines the stock of the product offer.                     |
| Price            | Prices of the product offer per store, currency, and volume quantity. Volume quantity defines the minimum product offer quantity to be added to cart for the price to apply. |
| Validity Dates   | Defines the period during which the product offer is visible on the Storefront. |

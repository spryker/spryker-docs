---
title: Marketplace Product Offer feature overview
description: This document contains concept information for the Product offers feature in the Spryker Commerce OS.
template: concept-topic-template
---

The *Product Offer* entity is created when multiple merchants need to sell the same product on the Marketplace.

Product offer is created per concrete product and contains product-specific information, information about the merchant selling this product, and the offer price. Any concrete product can have one or many offers from different merchants. Therefore, a unique *product offer reference* is defined per each product offer and is used to identify the offer in the system. Offer reference is mandatory and can only be defined once.

Merchants can [create product offers](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/offers/managing-product-offers.html#creating-a-product-offer) in the Merchant Portal or [import the product offers](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-product-offer.csv.html).

 Marketplace administrators can view and approve or deny merchants' product offers in the Back Office. See [Managing merchant product offers](/docs/marketplace/user/back-office-user-guides/{{page.version}}/marketplace/offers/managing-merchant-product-offers.html) for details.

 Every merchant can have multiple offers for the same concrete product. However, a product offer is related to a single merchant and cannot be shared between other merchants:

![Multiple product offers per product](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Products+and+offers/Product+offer+feature+overview/product-offers-per-product.png)

![Product offers on PDP](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Products+and+offers/Product+offer+feature+overview/product-offers-on-pdp.png)

{% info_block infoBox "Note" %}

You can retrieve product offer details via Glue API. See [Retrieving product offers](/docs/marketplace/dev/glue-api-guides/{{page.version}}/product-offers/retrieving-product-offers.html) and [Retrieving product offers for a concrete product](/docs/marketplace/dev/glue-api-guides/{{page.version}}/concrete-products/retrieving-product-offers-of-concrete-products.html) for details.

{% endinfo_block %}

## Product offer structure
To define visibility of a product offer on the Storefront, the following details are attached to the product offer entity:

| OFFER PARAMETER      | DESCRIPTION           |
| ------------------- | ----------------------------- |
| Concrete product SKU | Defines the concrete product the offer is created for.       |
| Merchant SKU         | Allows the merchant to identify the product offer in the ERP system. |
| Offer Reference      | Unique ID that helps to identify the product offer in the Marketplace. Offer reference is mandatory. |
| Store                | Defines the store where the product offer is available.      |
| Price                | Allows the merchant to set their price for the offer. {% info_block infoBox "Info" %} You can also set [volume prices](/docs/scos/user/features/{{page.version}}/prices-feature-overview/volume-prices-overview.html) for a product offer. For now, you can only [import volume prices for product offers](/docs/marketplace/dev/data-import/{{page.version}}/file-details-price-product-offer.csv.html). {% endinfo_block %}      |
| Stock                | Allows the merchant to define stock for the product offer. The stock can be reserved and available. |
| Status               | Approval status: <ul><li>Approval status (Waiting for approval, Approved, Denied).</li><li>Visibility: Visibility (Active, Inactive).</li></ul> |
| Validity Dates       | Specifies the period during which the product offer is visible on the Storefront. Concrete product validity dates have higher priority over the Offer validity dates. |


## Product offer status
Product offer status defines whether the offer is active and displayed on the Storefront. Based on this, the product offer may have offer approval status and visibility status.

### Offer approval status

* *Waiting for Approval*: Default status that is applied to the offer after it has been created.

* *Approved*:  The approved offer can be displayed on the Storefront. Only the Marketplace administrator can approve the offer. For details about how a Marketplace administrator can approve offers in the Back Office, see [Approving or denying offers](/docs/marketplace/user/back-office-user-guides/{{page.version}}/marketplace/offers/managing-merchant-product-offers.html#approving-or-denying-offers).

* *Denied*: If the offer is denied, it cannot be displayed on the Storefront. Only the Marketplace administrator can deny the offer. For details about how a Marketplace administrator can deny offers in the Back Office, see [Approving or denying offers](/docs/marketplace/user/back-office-user-guides/{{page.version}}/marketplace/offers/managing-merchant-product-offers.html#approving-or-denying-offers).

### Visibility

* *Active*: When an offer is active, it is displayed on the Storefront. Either merchant or Marketplace administrator can make the offer active.

* *Inactive*: When an offer is inactive, it is not displayed on the Storefront. Either merchant or Marketplace administrator can make the offer inactive.

![Offer approval flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Products+and+offers/Product+offer+feature+overview/offer-approval-flow.png)

## Product offer price

On the product detail page, a customer sees a list of product offers from one or several merchants. Each offer has its own price. This price is represented as the *product offer price* price dimension.
The product offer prices support:

* Mode (Net/Gross)
* Volume
* Store
* Currency

Product offer price follows the [concrete product price inheritance model](/docs/scos/user/features/{{page.version}}/prices-feature-overview/prices-feature-overview.html#price-inheritance). So if the Merchant doesn't set a price in the offer, it is taken from the concrete product. Otherwise, the product offer price has a higher priority and substitutes the concrete product price if it is indicated. If at least one price is defined for the offer (for example, original), it is valid for this offer even if the concrete product has a default price (sales price), but the offer does not. For details about price types, see [Price types](/docs/scos/user/features/{{page.version}}/prices-feature-overview/prices-feature-overview.html#price-inheritance).

Merchants can define product offer prices in the Merchant Portal when they [create product offers](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/offers/managing-product-offers.html#creating-a-product-offer) or [import product offer prices](/docs/marketplace/dev/data-import/{{page.version}}/file-details-price-product-offer.csv.html).

## Product offer stores

Merchant product offer is defined per store. Merchants set their own prices per store for the product offer.
However, defining the right store for the product offer affects its visibility. When setting the stores for the product offer, merchants need to pay attention to the stores where their abstract products are available.
The following table illustrates the logic according to which the product offer is displayed in the Storefront.

| Characteristics    | DE   | AT   | US   |
| ----------------------------------------- | ---- | ---- | ---- |
| Store where the abstract product is added | &check;    | &check;    | x    |
| Store where the product offer is added    | x    | &check;    | &check;    |
| Is product offer visible?                 | no   | yes  | no   |

Merchants can define product offer stores in the Merchant Portal when they create product offers,<!---LINK TO MERCHANT PORTAL FOR OFFERS--> or [import the product offer store](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-product-offer-store.csv.html).

## Product offers on the Storefront

Merchant product offer with all the related offer information is visible on the product detail page, and further on the shopping cart page and checkout pages when the following conditions are met:

1. The merchant who owns the offer is [*Active*](/docs/marketplace/user/back-office-user-guides/{{page.version}}/marketplace/merchants/managing-merchants.html#activating-and-deactivating-merchants).
2. The product offer status is:
   - Approved
   - Active
3. The product offer is defined for the current store.
4. The current store is defined for the provided offer.
5. The current day is within the range of the product offer validity dates.

The decision of whether the product offer can be purchased depends on the offer availability. But availability has no influence on offer visibility on the Storefront.

### Product offers on the product details page

All available product offers are listed in the *Sold by* area of the product details page. The offers are sorted by price from the lowest to the highest. An offer with the lowest price is selected by default if there are multiple offers for the product.

![Product offers on product details page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Products+and+offers/Product+offer+feature+overview/product-offers-on-pdp.gif)

### Product offers in the shopping cart

Offers from different merchants are added as separate cart items, each with its quantity. You can add a note to the offer on the cart page.
A customer can review the merchant information by clicking the link in the *Sold By* hint.

![Product offers in cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Products+and+offers/Product+offer+feature+overview/add-offers-to-cart.gif)

### Product offers during checkout

During the checkout, offers from the same merchant are grouped for delivery so that the customer can always know how many shipments to expect and the merchants can smoothly fulfill the orders.

![Product offers during checkout](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Products+and+offers/Product+offer+feature+overview/product-offers-during-checkout.gif)

### Product offers in the wishlist

Customers can add product offers to a wishlist for future purchase. Merchant information is kept for the offer when it is added to a wishlist. Further, customers can add the offer from the wishlist to cart.

![Product offers in wishlist](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Products+and+offers/Product+offer+feature+overview/add-product-offer-to-wl-and-from-wl-to-cart.gif)

## Current constraints

* B2B Merchant-specific prices do not work with product offer prices.
* All cart-related B2B features (for example, Quick Order, RFQ, Approval Process) will be supported later.
* Availability Notification is not supported.

## Related Business User articles

| MERCHANT PORTAL USER GUIDES  |BACK OFFICE USER GUIDES |
|---------|---------|
| [Managing product offers](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/offers/managing-product-offers.html)  |[Managing merchant product offers](/docs/marketplace/user/back-office-user-guides/{{page.version}}/marketplace/offers/managing-merchant-product-offers.html)|

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Marketplace Product Offer feature walkthrough](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}//marketplace-product-offer-feature-walkthrough/marketplace-product-offer-feature-walkthrough.html) and [Marketplace Product Offer Prices feature walkthrough](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-product-offer-prices-feature-walkthrough.html) for developers.

{% endinfo_block %}

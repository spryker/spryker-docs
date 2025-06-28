---
title: Marketplace Product Offer feature overview
description: This document contains concept information for the Product offers feature in the Spryker Commerce OS.
template: concept-topic-template
last_updated: Jan 12, 2024
related:
  - title: Managing product offers
    link: docs/pbc/all/offer-management/page.version/marketplace/manage-merchant-product-offers.html
  - title: Managing merchant product offers
    link: docs/pbc/all/offer-management/page.version/marketplace/manage-merchant-product-offers.html
---

The *Product Offer* entity is created when multiple merchants need to sell the same product on the Marketplace.

A product offer is created per concrete product and contains product-specific information, information about the merchant selling this product, and the offer price. Any concrete product can have one or many offers from different merchants. Therefore, a unique *product offer reference* is defined per each product offer and is used to identify the offer in the system. Offer reference is mandatory and can only be defined once.

Merchants can [create product offers](/docs/pbc/all/offer-management/latest/marketplace/manage-merchant-product-offers.html) in the Merchant Portal or [import the product offers](/docs/pbc/all/offer-management/{{site.version}}/marketplace/import-and-export-data/import-file-details-merchant-product-offer.csv.html).

Marketplace administrators can view and approve or deny merchants' product offers in the Back Office. For details, see [Managing merchant product offers](/docs/pbc/all/offer-management/latest/marketplace/manage-merchant-product-offers.html).

Every merchant can have multiple offers for the same concrete product. However, a product offer is related to a single merchant and cannot be shared between other merchants:

![Multiple product offers per product](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Products+and+offers/Product+offer+feature+overview/product-offers-per-product.png)

![Product offers on PDP](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Products+and+offers/Product+offer+feature+overview/product-offers-on-pdp.png)

{% info_block infoBox "Note" %}

You can retrieve product offer details via Glue API. For details, see [Retrieving product offers](/docs/pbc/all/offer-management/latest/marketplace/glue-api-retrieve-product-offers.html) and [Retrieving product offers for a concrete product](/docs/pbc/all/product-information-management/latest/marketplace/manage-using-glue-api/glue-api-retrieve-product-offers-of-concrete-products.html).

{% endinfo_block %}

## Product offer structure

To define the visibility of a product offer on the Storefront, the following details are attached to the product offer entity:

| OFFER PARAMETER      | DESCRIPTION           |
| ------------------- | ----------------------------- |
| Concrete product SKU | Defines the concrete product the offer is created for.       |
| Merchant SKU         | Lets the merchant identify the product offer in the ERP system. |
| Offer Reference      | Unique ID that helps to identify the product offer in the Marketplace. Offer reference is mandatory. |
| Store                | Defines the store where the product offer is available.      |
| Price                | Lets the merchant set their price for the offer. {% info_block infoBox "Info" %} You can also set [volume prices](/docs/pbc/all/price-management/latest/base-shop/prices-feature-overview/volume-prices-overview.html) for a product offer. For now, you can only [import volume prices for product offers](/docs/pbc/all/price-management/latest/marketplace/import-and-export-data/import-file-details-price-product-offer.csv.html). {% endinfo_block %}      |
| Stock                | Lets the merchant define stock for the product offer. The stock can be reserved and available. |
| Status               | Approval status: <ul><li>Approval status (Waiting for approval, Approved, Denied).</li><li>Visibility: Visibility (Active, Inactive).</li></ul> |
| Validity Dates       | Specifies the period during which the product offer is visible on the Storefront. Concrete product validity dates have higher priority over the Offer validity dates. |


## Product offer status

Product offer status defines whether the offer is active and displayed on the Storefront. Based on this, the product offer may have offer approval status and visibility status.

### Offer approval status

* *Waiting for Approval*: Default status that is applied to the offer after it has been created.

* *Approved*:  The approved offer can be displayed on the Storefront. Only the Marketplace administrator can approve the offer. For details about how a Marketplace administrator can approve offers in the Back Office, see [Approving or denying offers](/docs/pbc/all/offer-management/latest/marketplace/manage-merchant-product-offers.html#approving-or-denying-offers).

* *Denied*: If the offer is denied, it cannot be displayed on the Storefront. Only the Marketplace administrator can deny the offer. For details about how a Marketplace administrator can deny offers in the Back Office, see [Approving or denying offers](/docs/pbc/all/offer-management/latest/marketplace/manage-merchant-product-offers.html#approving-or-denying-offers).

### Visibility

* *Active*: When an offer is active, it's displayed on the Storefront. Either merchant or Marketplace administrator can make the offer active.

* *Inactive*: When an offer is inactive, it's not displayed on the Storefront. Either merchant or Marketplace administrator can make the offer inactive.

![Offer approval flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Products+and+offers/Product+offer+feature+overview/offer-approval-flow.png)

## Product offer price

On the product detail page, a customer sees a list of product offers from one or several merchants. Each offer has its own price. This price is represented as the *product offer price* price dimension.
The product offer prices support:

* Mode (Net/Gross)
* Volume
* Store
* Currency

Product offer price follows the [concrete product price inheritance model](/docs/pbc/all/price-management/latest/base-shop/prices-feature-overview/prices-feature-overview.html). So if the Merchant doesn't set a price in the offer, it's taken from the concrete product. Otherwise, the product offer price has a higher priority and substitutes the concrete product price if it's indicated. If at least one price is defined for the offer (for example, original), it's valid for this offer even if the concrete product has a default price (sales price), but the offer does not. For details about price types, see [Price types](/docs/pbc/all/price-management/latest/base-shop/prices-feature-overview/prices-feature-overview.html).

If a [merchant custom price](/docs/pbc/all/price-management/latest/base-shop/merchant-custom-prices-feature-overview.html) exists for a customer, they see only the prices that apply to them, based on their merchant relationship. If the merchant relationship doesn't have prices for some products, default prices are displayed for the customer.

Merchants can define product offer prices in the Merchant Portal when they [create product offers](/docs/pbc/all/offer-management/latest/marketplace/manage-in-the-merchant-portal/create-product-offers.html) or [import product offer prices](/docs/pbc/all/price-management/latest/marketplace/import-and-export-data/import-file-details-price-product-offer.csv.html).

## Product offer stores

A merchant product offer is defined per store. Merchants set their own prices per store for the product offer.
However, defining the right store for the product offer affects its visibility. When setting the stores for the product offer, merchants need to pay attention to the stores where their abstract products are available.
The following table illustrates the logic according to which the product offer is displayed in the Storefront.

| Characteristics    | DE   | AT   | US   |
| ----------------------------------------- | ---- | ---- | ---- |
| Store where the abstract product is added | &check;    | &check;    | x    |
| Store where the product offer is added    | x    | &check;    | &check;    |
| Is product offer visible?                 | no   | yes  | no   |

Merchants can define product offer stores in the Merchant Portal when they [create product offers](/docs/pbc/all/offer-management/latest/marketplace/manage-merchant-product-offers.html), or [import the product offer store](/docs/pbc/all/offer-management/latest/marketplace/import-and-export-data/import-file-details-merchant-product-offer-store.csv.html).

## Product offers on the Storefront

Merchant product offer with all the related offer information is visible on the product detail page, and further on the shopping cart page and checkout pages when the following conditions are met:

1. The merchant who owns the offer is *Active*.
2. The product offer status is:
   - Approved
   - Active
3. The product offer is defined for the current store.
4. The current store is defined for the provided offer.
5. The current day is within the range of the product offer validity dates.

The decision of whether the product offer can be purchased depends on the offer availability. But availability has no influence on offer visibility on the Storefront.

### Product offers on the product details page

All available product offers are listed in the *Sold by* area of the product details page. The offers are sorted by price from the lowest to the highest. An offer with the lowest price is selected by default if there are multiple offers for the product.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/offer-management/marketplace/marketplace-product-offer-feature-overview.md/product-offers-on-pdp.mp4" type="video/mp4">
  </video>
</figure>


### Product offers on the cart page

Offers from different merchants are added as separate cart items, each with its quantity. You can add a note to the offer on the cart page.
A customer can review the merchant information by clicking the link in the *Sold By* hint.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/offer-management/marketplace/marketplace-product-offer-feature-overview.md/add-offers-to-cart.mp4" type="video/mp4">
  </video>
</figure>

On the **Cart** page, a customer can also add product offers from the **Quick Add to Cart** section. In the search field of the section, they enter a product offer name or SKU and select one of the available options. If there are several merchants selling the selected product offer, a drop-down with such merchants appears. Then, the customer selects a preferable merchant, enters the quantity, and adds the item to cart. Note that the drop-down with merchants is not visible until the product or offer is selected.

{% info_block warningBox "" %}

Note that the drop-down with merchants is not visible until the product offer is selected.

{% endinfo_block %}

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/offer-management/marketplace/marketplace-product-offer-feature-overview.md/quick-add-to-cart-from-cart-page.mp4" type="video/mp4">
  </video>
</figure>

### Product offers during checkout

During the checkout, offers from the same merchant are grouped for delivery so that the customer can always know how many shipments to expect and the merchants can smoothly fulfill the orders.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/offer-management/marketplace/marketplace-product-offer-feature-overview.md/product-offers-during-checkout.mp4" type="video/mp4">
  </video>
</figure>

### Product offers on the wishlist page

Customers can add product offers to a wishlist for future purchase. Merchant information is kept for the offer when it's added to a wishlist. Further, customers can add the offer from the wishlist to cart.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/offer-management/marketplace/marketplace-product-offer-feature-overview.md/add-product-offer-to-wl-and-from-wl-to-cart.mp4" type="video/mp4">
  </video>
</figure>

### Product offers on the Quick Order page

On the **Quick Order** page, customers can add product offers to cart by entering their names or SKUs. Also, in the **Merchants** drop-down, they can specify merchants who they want to buy from. If customers select specific merchants in the **Merchants** drop-down, only the product offers of those merchants are available for selection when they enter **SKU or Name** of the product. Buyers who select the **All Merchants** option can add offers from all merchants. If customers change the merchant of the already selected item, some values of its fields may change. For example, the prices of different merchants may vary, so when you change a merchant, the **Price** value may change as well. For information about the Quick Order feature, see [Quick Add to Cart feature overview](/docs/pbc/all/cart-and-checkout/latest/base-shop/feature-overviews/quick-add-to-cart-feature-overview.html).

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/offer-management/marketplace/marketplace-product-offer-feature-overview.md/quick-order-from-quick-order-page.mp4" type="video/mp4">
  </video>
</figure>


### Product offers on the shopping list page

On the **Shopping list** page, a customer can add marketplace product offers to the existing or new shopping list by entering a product's name or SKU in the **Quick Add** section and selecting the desired option. If there are several merchants selling the selected item, a drop-down with available merchants appears. Then, the customer selects a preferable merchant, enters the quantity, and adds the product or offer to the shopping list.

{% info_block warningBox "" %}

Note that the drop-down with merchants is not visible until the product offer is selected.

{% endinfo_block %}

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/offer-management/marketplace/marketplace-product-offer-feature-overview.md/quick-add-to-cart-from-shopping-list-page.mp4" type="video/mp4">
  </video>
</figure>

## Current constraints

* B2B Merchant-specific prices do not work with product offer prices.
* All cart-related B2B features (for example, Quick Order, RFQ, Approval Process) will be supported later.
* Availability Notification is not supported.

## Related Business User documents

| MERCHANT PORTAL USER GUIDES  |BACK OFFICE USER GUIDES |
|---------|---------|
| [Managing product offers](/docs/pbc/all/offer-management/latest/marketplace/manage-merchant-product-offers.html)  |[Managing merchant product offers](/docs/pbc/all/offer-management/latest/marketplace/manage-merchant-product-offers.html)|

## Related Developer documents

|INSTALLATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  | HOW-TO GUIDES |REFERENCES          |
|---------|---------|---------|---------|---------|
|[Install the Marketplace Product Offer feature](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-feature.html)     | [Retrieving product offers](/docs/pbc/all/offer-management/latest/marketplace/glue-api-retrieve-product-offers.html)        | [File details: combined_merchant_product_offer.csv](/docs/pbc/all/offer-management/latest/marketplace/import-and-export-data/import-file-details-combined-merchant-product-offer.csv.html)        |[Rendering merchant product offers on the Storefront](/docs/pbc/all/offer-management/latest/marketplace/render-merchant-product-offers-on-the-storefront.html)         | [Product offer in the Back Office](/docs/pbc/all/offer-management/latest/marketplace/marketplace-product-offer-feature-domain-model-and-relationships/product-offer-in-the-back-office.html)          |
|[Install the Marketplace Product Offer + Cart feature](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-cart-feature.html)     | [Retrieving product offers for a concrete product](/docs/pbc/all/product-information-management/latest/marketplace/manage-using-glue-api/glue-api-retrieve-product-offers-of-concrete-products.html)        |[File details: merchant_product_offer.csv](/docs/pbc/all/offer-management/{{site.version}}/marketplace/import-and-export-data/import-file-details-merchant-product-offer.csv.html)         |         | [Product offer storage](/docs/pbc/all/offer-management/latest/marketplace/marketplace-product-offer-feature-domain-model-and-relationships/product-offer-storage.html)          |
|[Install the Marketplace Product Offer + Checkout feature](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-checkout-feature.html)     |         | [File details: product_offer_stock.csv](/docs/pbc/all/warehouse-management-system/latest/marketplace/import-and-export-data/import-file-details-product-offer-stock.csv.html)        |         |[Product Offer store relation](/docs/pbc/all/offer-management/latest/marketplace/marketplace-product-offer-feature-domain-model-and-relationships/product-offer-store-relation.html)           |
|[Install the Marketplace Product Offer Prices feature](/docs/pbc/all/price-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-prices-feature.html) | | [File details: product_offer_validity.csv](/docs/pbc/all/offer-management/latest/marketplace/import-and-export-data/import-file-details-product-offer-validity.csv.html) | | |
|[Install the Marketplace Product Offer + Quick Add to Cart feature](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-quick-add-to-cart-feature.html) | | [File details: merchant_product_offer_store.csv](/docs/pbc/all/offer-management/latest/marketplace/import-and-export-data/import-file-details-merchant-product-offer-store.csv.html) | |[Product Offer validity dates](/docs/pbc/all/offer-management/latest/marketplace/marketplace-product-offer-feature-domain-model-and-relationships/product-offer-validity-dates.html) |
|[Install the Marketplace Merchant Portal Product Offer Management feature](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-product-offer-management-feature.html)      |         |  |         |           |
|[Glue API: Marketplace Product Offer integration](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-glue-api.html)     |         |         |         |           |
|[Glue API: Marketplace Product Offer + Wishlist integration](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-wishlist-glue-api.html)     |         |         |         |           |
|[Glue API: Marketplace Product Offer + Cart integration](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-cart-glue-api.html)     |         |         |         |           |

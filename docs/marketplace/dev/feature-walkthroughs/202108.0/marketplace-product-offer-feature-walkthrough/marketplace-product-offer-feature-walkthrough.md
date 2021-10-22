---
title: Marketplace Product Offer feature walkthrough
last_updated: Apr 23, 2021
description: Product Offer is created when merchants wants to sell products already available on Marketplace.
template: concept-topic-template
---

The *Marketplace Product Offer* entity is created when multiple merchants sell the same product on the Marketplace. The product offer is a variation of a concrete product with its own specific price (and volume price) and stock. It can be “owned” by any entity, however, in a B2C or B2B Marketplace, it is owned by a [merchant](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-merchant-feature-walkthrough.html).

The Marketplace product offer has its own validity dates and its own availability calculation based on its reservations.

The offer product re-use and extend concrete product features. All product-related data is stored and processed as concrete products.
All offer-related data is stored in a separate entity and linked to a concrete product.

The Marketplace Product Offer feature contains both merchant product offer and product offer concepts. Merchant product offer extends product offer by adding a pointer to a merchant.

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Marketplace Product Offer feature overview](/docs/marketplace/user/features/{{page.version}}/marketplace-product-offer-feature-overview.html) for business users.

{% endinfo_block %}


## Main Marketplace Product Offer feature modules

The table below lists the main modules of the Marketplace Product Offer feature.

| NAME | DESCRIPTION | MANAGED ENTITIES  |
| -------------------- | ---------- | ----------------- |
| [MerchantProductOffer](https://github.com/spryker/merchant-product-offer) | <ul><li>Provides collection of product offers by request.</li><li>Extends `ProductOffer` with merchant information.</li><li> Used by `MerchantSwitcher` for enabling the merchant functionality.</li></ul>  | SpyProductOffer |
| [ProductOffer](https://github.com/spryker/product-offer) | Provides the main create-read-update product offer functionality.  | SpyProductOffer |
| [ProductOfferValidity](https://github.com/spryker/product-offer-validity) | Defines validity period for an offer | SpyProductOfferValidity |
| [Shop.MerchantProductOfferWidget](https://github.com/spryker-shop/merchant-product-offer-widget) | Provides merchant product offer information for `spryker-shop`. | - |

## Entity diagram

The following schema illustrates the relations in the Marketplace Product Offer entity:

![Entity diagram](https://confluence-connect.gliffy.net/embed/image/6a64677b-090a-4dbf-86a5-8e9d8afa1a68.png?utm_medium=live&utm_source=custom)

## Related Developer articles

|INTEGRATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  | HOW-TO GUIDES |REFERENCES          |
|---------|---------|---------|---------|---------|
|[Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-feature-integration.html)     | [Retrieving product offers](/docs/marketplace/dev/glue-api-guides/{{page.version}}/product-offers/retrieving-product-offers.html)        | [File details: combined_merchant_product_offer.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-combined-merchant-product-offer.csv.html)        |[Rendering merchant product offers on the Storefront](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-product-offer-feature-walkthrough/rendering-merchant-product-offers-on-the-storefront.html)         | [Product offer in the Back Office](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-product-offer-feature-walkthrough/product-offer-in-the-back-office.html)          |
|[Marketplace Product Offer + Cart feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-cart-feature-integration.html)     | [Retrieving product offers for a concrete product](/docs/marketplace/dev/glue-api-guides/{{page.version}}/concrete-products/retrieving-product-offers-of-concrete-products.html)        |[File details: merchant_product_offer.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-product-offer.csv.html)         |         | [Product offer storage](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-product-offer-feature-walkthrough/product-offer-storage.html)          |
|[Marketplace Product Offer + Checkout feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-checkout-feature-integration.html)     |         | [File details: product_offer_stock.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-product-offer-stock.csv.html)        |         |[Product Offer store relation](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-product-offer-feature-walkthrough/product-offer-store-relation.html)           |
|[Merchant Portal - Marketplace Product Offer Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-portal-marketplace-product-offer-management-feature-integration.html)      |         | [File details: product_offer_validity.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-product-offer-validity.csv.html)        |         |[Product Offer validity dates](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-product-offer-feature-walkthrough/product-offer-validity-dates.html)           |
|[Glue API: Marketplace Product Offer integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-feature-integration.html)     |         | [File details: merchant_product_offer_store.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-product-offer-store.csv.html)        |         |           |
|[Glue API: Marketplace Product Offer + Wishlist integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-wishlist-feature-integration.html)     |         |         |         |           |
|[Glue API: Marketplace Product Offer + Cart integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-cart-feature-integration.html)     |         |         |         |           |

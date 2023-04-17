---
title: Marketplace Product Offer feature walkthrough
last_updated: Apr 23, 2021
description: Product Offer is created when a merchant wants to sell products already available on the Marketplace.
template: feature-walkthrough-template
redirect_from: /docs/marketplace/dev/feature-walkthroughs/202204.0/marketplace-product-offer-feature-walkthrough/rendering-merchant-product-offers-on-the-storefront.html
---

The *Marketplace Product Offer* entity is created when multiple merchants sell the same product on the Marketplace. The product offer is a variation of a concrete product with its own specific price (and volume price) and stock. It can be “owned” by any entity, however, in a B2C or B2B Marketplace, it is owned by a [merchant](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-merchant-feature-walkthrough.html).

The Marketplace product offer has its own validity dates and its own availability calculation based on its reservations.

The product offer re-uses and extends concrete product features. All product-related data is stored and processed as concrete products.
All offer-related data is stored in a separate entity and linked to a concrete product.

The Marketplace Product Offer feature contains both merchant product offer and product offer concepts. Merchant product offer extends product offer by adding a pointer to a merchant.

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Marketplace Product Offer feature overview](/docs/marketplace/user/features/{{page.version}}/marketplace-product-offer-feature-overview.html) for business users.

{% endinfo_block %}

## Module dependency graph

The following diagram illustrates the dependencies between the modules for the Marketplace Product Offer feature.

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/2594d553-5312-4c2b-b184-7ad466b945e3.png?utm_medium=live&utm_source=confluence)

<div class="width-100">

The following table lists the main modules of the Marketplace Product Offer feature.

| NAME  | DESCRIPTION    |
|-------------|--------------|
| [MerchantProductOffer](https://github.com/spryker/merchant-product-offer)    | Provides a collection of product offers by request. Extends `ProductOffer` with the merchant information. Used by `MerchantSwitcher` for enabling the merchant functionality. |
| [MerchantProductOfferDataImport](https://github.com/spryker/merchant-product-offer-data-import)    | Module for importing Merchant offers from the CSV file. |
| [MerchantProductOfferGui](https://github.com/spryker/merchant-product-offer-gui)    | Provides Zed UI interface for merchant product offer management. |
| [MerchantProductOfferSearch](https://github.com/spryker/merchant-product-offer-search)    | Manages Elasticsearch documents for merchant product offer entities. |
| [MerchantProductOfferStorage](https://github.com/spryker/merchant-product-offer-storage)   | Manages storage for merchant product offers. |
| [MerchantProductOfferStorageExtension](https://github.com/spryker/merchant-product-offer-storage-extension)    | Provides an interfaces of plugins to extend `MerchantProductOfferStorage` module from the other modules. |
| [MerchantProductOffersRestApi](https://github.com/spryker/merchant-product-offers-rest-api)    | Provides Glue API endpoints to manage merchant product offers. |
| [Product](https://github.com/spryker/product)    | Provides base infrastructure and CRUD operations to handle abstract product and concrete products.       |
| [ProductOffer](https://github.com/spryker/product-offer)   | Provides the main create-read-update product offer functionality.    |
| [ProductOfferExtension](https://github.com/spryker/product-offer-extension)  | Provides extension interfaces for `ProductOffer` module.  |
| [ProductOfferGui](https://github.com/spryker/product-offer-gui)       | `ProductOfferGui` is the Zed Administrative Interface component for managing product offers.    |
| [ProductOfferGuiExtension](https://github.com/spryker/product-offer-gui-extension)   | Provides plugin interfaces for `ProductOfferGui` module functionality extending.     |
| [ProductOfferStorage](https://github.com/spryker/product-offer-storage)    | Manages storage for product offers.    |
| [ProductOfferStorageExtension](https://github.com/spryker/product-offer-storage-extension)    | Provides interfaces for extension of `ProductOfferStorage` module with plugins.   |
| [ProductOffersRestApi](https://github.com/spryker/product-offers-rest-api)     | Provides availability to add product offer resource relation.    |
| [ProductOfferValidity](https://github.com/spryker/product-offer-validity)    | Defines validity period for an offer.    |
| [ProductOfferValidityDataImport](https://github.com/spryker/product-offer-validity-data-import)    | Data importer for `ProductOfferValidity`.    |
| [ProductOfferValidityGui](https://github.com/spryker/product-offer-validity-gui)      | `ProductOfferValidityGui` is the Zed Administrative Interface component for managing product offer validity.        |
| [MerchantProductOfferWidget](https://github.com/spryker-shop/merchant-product-offer-widget)    | Provides merchant product offer information for the `spryker-shop`.   |
| [MerchantProductOfferWidgetExtension](https://github.com/spryker-shop/merchant-product-offer-widget-extension) | This module provides plugin interfaces to extend the `MerchantProductOfferWidget` module from the other modules.     |
| [ProductOfferWidget](https://github.com/spryker-shop/product-offer-widget)     | Provides widgets for displaying Product Offers.  |

</div>

## Domain model

The following schema illustrates the domain model of the Marketplace Product Offer feature:

![Domain model](https://confluence-connect.gliffy.net/embed/image/681c5f0c-4a17-4255-9033-7777a6127ce0.png?utm_medium=live&utm_source=custom)

## Related Developer documents

|INSTALLATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  | HOW-TO GUIDES |REFERENCES          |
|---------|---------|---------|---------|---------|
|[Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-feature-integration.html)     | [Retrieving product offers](/docs/marketplace/dev/glue-api-guides/{{page.version}}/product-offers/retrieving-product-offers.html)        | [File details: combined_merchant_product_offer.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-combined-merchant-product-offer.csv.html)        |[Rendering merchant product offers on the Storefront](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-product-offer-feature-walkthrough/rendering-product-offers-on-the-storefront.html)         | [Product offer in the Back Office](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-product-offer-feature-walkthrough/product-offer-in-the-back-office.html)          |
|[Marketplace Product Offer + Cart feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-cart-feature-integration.html)     | [Retrieving product offers for a concrete product](/docs/marketplace/dev/glue-api-guides/{{page.version}}/concrete-products/retrieving-product-offers-of-concrete-products.html)        |[File details: merchant_product_offer.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-product-offer.csv.html)         |         | [Product offer storage](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-product-offer-feature-walkthrough/product-offer-storage.html)          |
|[Marketplace Product Offer + Checkout feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-checkout-feature-integration.html)     |         | [File details: product_offer_stock.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-product-offer-stock.csv.html)        |         |[Product Offer store relation](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-product-offer-feature-walkthrough/product-offer-store-relation.html)           |
|[Marketplace Product Offer Prices feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-prices-feature-integration.html) | | [File details: product_offer_validity.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-product-offer-validity.csv.html) | | |
|[Marketplace Product Offer + Quick Add to Cart feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-quick-add-to-cart-feature-integration.html) | | [File details: merchant_product_offer_store.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-product-offer-store.csv.html) | |[Product Offer validity dates](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-product-offer-feature-walkthrough/product-offer-validity-dates.html) |
|[Marketplace Merchant Portal Product Offer Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-portal-product-offer-management-feature-integration.html)      |         |  |         |           |
|[Glue API: Marketplace Product Offer integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-feature-integration.html)     |         |         |         |           |
|[Glue API: Marketplace Product Offer + Wishlist integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-wishlist-feature-integration.html)     |         |         |         |           |
|[Glue API: Marketplace Product Offer + Cart integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-cart-feature-integration.html)     |         |         |         |           |

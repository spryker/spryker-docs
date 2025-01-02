---
title: "Marketplace Product Offer feature: Domain model and relationships"
template: concept-topic-template
last_updated: Nov 21, 2023
---

The *Marketplace Product Offer* entity is created when multiple merchants sell the same product on the Marketplace. The product offer is a variation of a concrete product with its own specific price (and volume price) and stock. It can be “owned” by any entity, however, in a B2C or B2B Marketplace, it is owned by a [merchant](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-merchant-feature-walkthrough.html).

The Marketplace product offer has its own validity dates and its own availability calculation based on its reservations.

The product offer re-uses and extends concrete product features. All product-related data is stored and processed as concrete products.
All offer-related data is stored in a separate entity and linked to a concrete product.

The Marketplace Product Offer feature contains both merchant product offer and product offer concepts. Merchant product offer extends product offer by adding a pointer to a merchant.

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

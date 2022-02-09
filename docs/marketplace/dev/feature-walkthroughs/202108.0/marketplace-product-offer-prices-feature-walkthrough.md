---
title: Marketplace Product Offer Prices feature walkthrough
description: The Marketplace Product Offer Prices feature allows Marketplace merchants to set prices for product offers.
template: feature-walkthrough-template
---

With the *Marketplace Product Offer Prices* feature, the Marketplace merchants can define custom prices for [product offers](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-product-offer-feature-walkthrough/marketplace-product-offer-feature-walkthrough.html).

Merchants can define the prices for each product offer. If no price for the product offer is specified, a default price from the concrete product is used.

Price types (for example,gross price, net price) are assigned to each price, and for each price type, there can be from *one* to *n* product prices. Price type entities are used to differentiate between use cases: for example, we have DEFAULT and ORIGINAL prices which are used for sale pricing. You can add your own price types and use them in your app.

A new price type can be added by importing price data. The price type in the CSV file will be added or updated.

To learn more details about prices import file, see: [File details: product_price.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/pricing/file-details-product-price.csv.html)

Depending on the price mode selected by a customer in Storefront, the price can have gross or net value. You can run your shop in both modes as well as select net mode for business customers, for example.

A price is also associated with a currency and a store.

To support product offer prices, a *PriceProductOffer* database table has been added to connect *PriceProductStore* and *ProductOffer* tables. In order to store the information about product offer prices that will be synchronized to Storage, the *ProductConcreteProductOfferPriceStorage* database table has been added. On the Storefront, this data is used to display correct prices for product offers.

In addition, product offers support volume prices. Merchants can now enter volume prices for product offers, and customers will see the corresponding price on their Storefront based on the quantity they have chosen. The volume prices for product offers work the same as the volume prices for products.

To learn more about prices and volume prices, see: [Prices](/docs/scos/user/features/{{page.version}}/prices-feature-overview/prices-feature-overview.html), [Volume Prices](/docs/scos/user/features/{{page.version}}/prices-feature-overview/volume-prices-overview.html)

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Product offer price](/docs/marketplace/user/features/{{page.version}}/marketplace-product-offer-feature-overview.html#product-offer-price) overview for business users.

{% endinfo_block %}

## Module dependency graph

The following diagram illustrates the dependencies between the modules for the *Marketplace Product Offer Prices* feature.

![Entity diagram](https://confluence-connect.gliffy.net/embed/image/f128877d-eb61-4d87-b1af-5f166eb45c45.png?utm_medium=live&utm_source=confluence)

| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| PriceProductOffer | Provides product offer price-related functionality, price persistence, current price resolvers per currency/price mode.   |
| PriceProductOfferDataImport | Imports data for product offer prices.    |
| PriceProductOfferGui | Backoffice UI Interface for managing prices for product offers.    |
| PriceProductOfferStorage | Provides functionality to store data about product offer prices in the storage.   |
| PriceProductOfferVolume | Provides functionality to handle volume prices for product offers.    |
| PriceProductOfferVolumeGui | Backoffice UI Interface for managing volume prices for product offers.    |
| PriceProductOfferExtension | Provides plugin interfaces for extending `PriceProductOffer` module functionality.   |
| PriceProductOfferStorageExtension | Provides plugin interfaces used by Price Product Offer Storage bundle.    |
| PriceProductOfferVolumesRestApi | Provides plugin(s) to add product-offer-volume-prices to the product-offer-prices.   |
| ProductOfferPricesRestApi | Provides Rest API endpoints to manage product offer prices.   |
| ProductOfferPricesRestApiExtension | Provides plugin interfaces for extending the `ProductOfferPricesRestApi` module.    |
| Price | Handles product pricing and provides plugins for products to populate prices.  |
| PriceProduct | Provides product price-related functionality, price persistence, current price resolvers per currency/price mode.    |
| PriceProductStorage | Provides functionality to store data about product prices in the storage.    |
| PriceProductVolume | Provides functionality to handle volume prices for products.  |
| ProductOffer | Provides the core functionality for product offer features.   |

## Domain model

The following schema illustrates the Marketplace Product Offer Prices domain model:

![Entity diagram](https://confluence-connect.gliffy.net/embed/image/0ad490bb-f21f-4e4a-b6eb-e0102a8c7b42.png?utm_medium=live&utm_source=confluence)

## Related Developer articles

|INTEGRATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  |
|---------|---------|---------|
| [Marketplace Product Offer Prices feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-prices-feature-integration.html)          | [Retrieving product offer prices](/docs/marketplace/dev/glue-api-guides/{{page.version}}/product-offers/retrieving-product-offer-prices.html)          | [File details: price-product-offer.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-price-product-offer.csv.html)           |
|[Glue API: Marketplace Product Offer Prices integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-prices-feature-integration.html)           |           |           |

---
title: Marketplace Product Offer Prices feature walkthrough
last_updated: Apr 23, 2021
description: The Marketplace Product Offer Prices feature allows Marketplace merchants to set prices for product offers.
template: concept-topic-template
---

With the *Marketplace Product Offer Prices* feature, the Marketplace merchants can define custom prices for [product offers](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-product-offer-feature-walkthrough/marketplace-product-offer-feature-walkthrough.html).

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Product offer price](/docs/marketplace/user/features/{{page.version}}/marketplace-product-offer-feature-overview.html#product-offer-price) overview for business users.

{% endinfo_block %}

## Marketplace Product Offer Prices - Overview
Product offer prices can be defined for each product offer by merchants. 
If price has not defined for product offer, will be used price from concrete product which is tied to the product offer by default.
Each price should have type. 
The price type it is an entity to define what type of prices will be used for selling. 
There are 2 price types defined in the Spryker system, it's ORIGINAL and DEFAULT. 
You can add own price types and use it in your app.
The price can have gross or net value which can be used based on a price mode selected by customer in Storefront. 
You can have shop running in both modes and select net mode for business customer, for example. 
Price also has currency and store assigned to it.
To support product offer prices has been added *PriceProductOffer* table to connect *PriceProductStore* and *ProductOffer* tables.
To store data about product offer prices has been added *ProductConcreteProductOfferPriceStorage*.
The data updated, when creating/updating/deleting/activating/deactivating concrete products and when create price product offers. 
Also for product offers has been added support volume prices. 
So merchants can add volume prices for product offers and based on chosen quantity of product offers customer will see the price on the Storefront.
Volume prices for product offers work the same as for products.

To learn more about prices and volume prices, see: [Prices](https://documentation.spryker.com/docs/prices-overview), [Volume Prices](https://documentation.spryker.com/docs/volume-prices-overview)

## Marketplace Product Offer Prices - Module dependency graph
![Entity diagram](https://confluence-connect.gliffy.net/embed/image/f128877d-eb61-4d87-b1af-5f166eb45c45.png?utm_medium=live&utm_source=confluence)

**Price** - Handles product pricing and provides plugins for products to populate prices.

**PriceProduct** - Provides product price related functionality, price persistence, current price resolvers per currency/price mode.

**PriceProductDataImport** - Importing demo data for product prices.

**PriceProductOffer** - Provides product offer price related functionality, price persistence, current price resolvers per currency/price mode.

**PriceProductOfferDataImport** - Importing demo data for product offer prices.

**PriceProductOfferGui** - Zed UI Interface for managing prices for product offers.

**PriceProductOfferStorage** - Provides functionality to store data about product offer prices in the storage.

**PriceProductOfferVolume** - Provides functionality to handle volume prices for product offers.

**PriceProductOfferVolumeGui** - Zed UI Interface for managing volume prices for product offers.

**PriceProductStorage** - Provides functionality to store data about product prices in the storage.

**PriceProductVolume** - Provides functionality to handle volume prices for products.

**PriceProductVolumeWidget** - Provides widget to show information about volume price for product.

**PriceWidget** - Provides functionality for price mode switcher.

## Marketplace Product Offer Prices - Domain model
![Entity diagram](https://confluence-connect.gliffy.net/embed/image/0ad490bb-f21f-4e4a-b6eb-e0102a8c7b42.png?utm_medium=live&utm_source=confluence)

## Related Developer articles

|INTEGRATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  |
|---------|---------|---------|
| [Marketplace Product Offer Prices feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-prices-feature-integration.html)          | [Retrieving product offer prices](/docs/marketplace/dev/glue-api-guides/{{page.version}}/product-offers/retrieving-product-offer-prices.html)          | [File details: price-product-offer.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-price-product-offer.csv.html)           |
|[Glue API: Marketplace Product Offer Prices integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-prices-feature-integration.html)           |           |           |

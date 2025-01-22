---
title: "Marketplace Product Offer Prices feature: Domain model and relationships"
description: Learn about the dependencies between modules for the Marketplace product offer prices feature within your Spryker Marketplace project.
template: concept-topic-template
last_updated: Nov 21, 2023
---

This document provides technical details about the Marketplace Product Offer Prices feature.

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

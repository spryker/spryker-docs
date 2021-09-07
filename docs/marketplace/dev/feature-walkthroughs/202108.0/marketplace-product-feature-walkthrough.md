---
title: Marketplace Product feature walkthrough
last_updated: Jul 29, 2021
description: A Marketplace Product feature adds merchant information to the product that a merchant sells.
template: concept-topic-template
---

A Marketplace Product feature adds merchant information to the product that a merchant sells.

To learn more about the feature and to find out how end users use it, see [Marketplace Product feature overview](/docs/marketplace/user/features/{{page.version}}/marketplace-product-feature-overview.html) feature overview for business users.

![Entity diagram](https://confluence-connect.gliffy.net/embed/image/15402fef-7a49-4ff6-bdc7-9e82f2f92011.png?utm_medium=live&utm_source=confluence)

**Modules**

**MerchantProduct** - created `MerchantProductEvents` with publish.

**MerchantProductDataImport** - adjusted `MerchantProductAbstractWriterStep` so that it triggers merchant product publish event.

**MerchantProductOfferSearch** - adjusted `MerchantProductPageDataLoaderPlugin` to merge merchant names that we set to  PayloadTransfer with those that it already contains, updated plugins to make it compatible with `MerchantProductSearch` module.

**MerchantProductSearch** - created new plugins and subscribes on `MerchantEvents` - publish and entity update.

## Entity diagram

The following schema illustrates relations in the Marketplace Wishlist entity:

![Entity diagram](https://confluence-connect.gliffy.net/embed/image/80809f75-1f94-4f19-9cfd-e39235026e89.png?utm_medium=live&utm_source=confluence)

## Related Developer articles

| INTEGRATION GUIDES| GLUE API GUIDES  | DATA IMPORT   |
| -------------- | ----------------- | ------------------ |
| [Marketplace Product feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-feature-integration.html) | [Retrieve abstract products](/docs/marketplace/dev/glue-api-guides/{{page.version}}/abstract-products/retrieving-abstract-products.html) | [File details: merchant_product.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-product-csv.html) |
| [Glue API: Marketplace Product feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-feature-integration.html) | [Retrieve concrete products](/docs/marketplace/dev/glue-api-guides/{{page.version}}/concrete-products/retrieving-concrete-products.html) |                                                              |
| [Marketplace Product + Cart feature integration](https://spryker-docs.herokuapp.com/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-cart-feature-integration.html) | [Retrieve abstract product lists](/docs/marketplace/dev/glue-api-guides/{{page.version}}/content-items/retrieving-abstract-products-in-abstract-product-lists.html) |                                                              |
| [Marketplace Product + Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-marketplace-product-offer-feature-integration.html) |                                                              |                                                              |
| [Marketplace Product + Inventory Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-inventory-management-feature-integration.html) |                                                              |                                                              |
| [Merchant Portal - Marketplace Product feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-portal-marketplace-product-feature-integration.html) |                                                              |                                                              |
| [Merchant Portal - Marketplace Product + Tax feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-portal-marketplace-product-tax-feature-integration.html) |                                                              |                                                              |

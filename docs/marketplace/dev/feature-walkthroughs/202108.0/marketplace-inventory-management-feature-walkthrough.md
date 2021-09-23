---
title: Marketplace Inventory Management feature walkthrough
description: Merchants are product and service sellers in the Marketplace.
template: feature-walkthrough-template
---

<!--- Feature summary. Short and precise explanation of what the feature brings in terms of functionality.
-->
The *Marketplace Inventory Management* feature implies management of the Marketplace warehouse and stock.

You can manage the relations between merchant and warehouse by importing the warehouse and merchant data. See [File details: merchant_stock.csv](/docs/marketplace/dev/data-import/{{ page.version }}/file-details-merchant-stock.csv.html) for details.

You can manage the stock of product offers for a merchant by importing the product offer and stock data separately. See [File details: product_offer_stock.csv](/docs/marketplace/dev/data-import/{{ page.version }}/file-details-product-offer-stock.csv.html). Or you can define stock when importing the product offer data. See [File details: combined_merchant_product_offer.csv](/docs/marketplace/dev/data-import/{{ page.version }}/file-details-combined-merchant-product-offer.csv.html).
To import stock of merchant products, see [File details: product_stock.csv](https://documentation.spryker.com/docs/file-details-product-stockcsv).

<!--- Feel free to drop the following part if the User doc is not yet published-->

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Marketplace Inventory Management feature overview ](/docs/marketplace/user/features/{{ page.version }}/marketplace-inventory-management-feature-overview.html) for business users.
{% endinfo_block %}

## Module dependency graph

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/72767452-8b31-46fd-9c23-8d5416fd02e6.png?utm_medium=live&utm_source=confluence)
<!--
Diagram content:
    -The module dependency graph SHOULD contain all the modules that are specified in the feature  (don't confuse with the module in the epic)
    - The module dependency graph MAY contain other module that might be useful or required to show
Diagram styles:
    - The diagram SHOULD be drown with the same style as the example in this doc
    - Use the same distance between boxes, the same colors, the same size of the boxes
Table content:
    - The table that goes after diagram SHOULD contain all the modules that are present on the diagram
    - The table should provide the role each module plays in this feature
-->
| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| ProductOfferStockDataImport | Introduced module, created steps to validate product offer reference existence and warehouse name existence.   |
| ProductOfferStock | Introduced module to provide correct offer availability. Added event listener and subscribed to update, create, delete events for `spy_product_offer_stock`, republish  to republish `product_concrete_product_offers_storage` and add/remove `product_offer` in Redis based on product availability.    |
| ProductOfferAvailability | Introduced `ProductOfferAvailabilityStrategyPlugin` that is able to overwrite product concrete availability with selected product offer availability.    |
| Availability | Introduced `ProductAvailabilityCriteria` transfer and `AvailabilityFacade::isProductSellableForStore()`.    |
| AvailabilityExtension | Introduced `AvailabilityProviderStrategyPluginInterface` with `isApplicable()` and `findProductConcreteAvailabilityForStore()` methods.    |
| ProductOfferAvailabilityStorage | Introduced new storage structure `{availability: 2}`.    |
| MerchantProductOfferStorage | Introduced dependency to `ProductOfferStock` module. Used `ProductOfferStock` query to join when publishing to check if quantity > 0.    |
| MerchantProductOfferStorageClient | Introduced `MerchantProductOfferStorageClient::findProductOfferStorageByReference()`.    |
| MerchantProductOfferWidget | Added `MerchantProductOfferPreAddToCartPlugin` that implements `PreAddToCartPluginInterface` to add product offer reference and merchant reference to `ItemTransfer`.    |

## Domain model
<!--
- Domain model SHOULD contain all the entities that were adjusted or introduced by the feature.
- All the new connections SHOULD also be shown and highlighted properly 
- Make sure to follow the same style as in the example
-->
![Domain Model](https://confluence-connect.gliffy.net/embed/image/7be7c0cf-b4d5-41c5-bfc3-e30b76efce31.png?utm_medium=live&utm_source=confluence)

## Related Developer articles
<!-- Usually filled by a technical writer. You can omit this part -->

|INTEGRATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  | REFERENCES  |
|---------|---------|---------|--------|
| [Marketplace Inventory Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-inventory-management-feature-integration.html) | [File details: merchant_stock.csv](/docs/marketplace/dev/data-import/{{ page.version }}/file-details-merchant-stock.csv.html) |
| [Glue API: Marketplace Inventory Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/glue/marketplace-inventory-management-feature-integration.html)  | [File details: product_offer_stock.csv](/docs/marketplace/dev/data-import/{{ page.version }}/file-details-product-offer-stock.csv.html) |
| [Marketplace Inventory Management + Order Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-inventory-management-order-management-feature-integration.html) | [File details: combined_merchant_product_offer.csv](/docs/marketplace/dev/data-import/{{ page.version }}/file-details-combined-merchant-product-offer.csv.html) |
| [Marketplace Product + Inventory Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-product-inventory-management-feature-integration.html) ||
| [Marketplace Inventory Management + Packaging Units feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-inventory-management-packaging-units-feature-integration.html) ||

---
title: Merchant Products
description: This document contains concept information for the Merchant Products feature in the Spryker Commerce OS.
template: concept-topic-template
---

Merchant Products are the products that a Merchant owns. Besides creating the offers for the products that the Marketplace Administrator suggests, a Merchant can create their own unique products. These products possess the same characteristics the usual abstract and concrete products have, but in addition, every such product has Merchant-related information such as merchant reference. Merchants manage stock, set prices 

## Unique and shared merchant products

Merchant products can be unique or shared between several merchants. In case the product is shared, it has the owner merchant and other merchants are able to create offers for this product in the Merchant Portal.

Currently, you can define whether the product is shared or not via [data importer](https://spryker-docs.herokuapp.com/docs/marketplace/dev/data-import/202106.0/file-details-merchant-product-csv.html). 

## Merchant product prices


## Merchant products in the Storefront

Merchant products are displayed in the Storefront when the following conditions are met:

1. The merchant who owns the product is [*Active*](https://spryker-docs.herokuapp.com/docs/marketplace/user/back-office-user-guides/202106.0/marketplace/merchants/managing-merchants.html#activating-and-deactivating-merchants).
2. The product visibility state is `Online`.
3. The product is defined for the current store.
4. The product has stock.

### Merchant product on the product details page

Merchant product appears first in the *Sold by* list together with the product offers from other merchants. For a Buyer, it doesn't matter what they are buying a product offer or a merchant product, however in the system, different entities are defined.

Product price on top of the product details page is taken from the merchant product or the product offer. It depends on the option selected in the *Sold by* box.

![Merchant product on PDP](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+product/merchant-product-on-pdp.png)


### Merchant products during the Checkout

Merchant products, as well as product offers, are grouped by the merchant and split into the merchant's shipments.

### Searching and filtering merchant products
When the merchant name is entered in the catalog search, not only the offers but also the products belonging to this merchant are displayed.

## Merchant products in the Back Office

A Marketplace Administrator can filter the products belonging to merchants in the Back Office.

![merchants-switcher-on-products](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Marketplace/products/products-reference-information/merchants-switcher-on-products.gif)

## Merchant products in the Merchant Portal
Merchants create and manage their products <!---LINK--> in the Merchant Portal.

## Merchant products and API

Spryker Marketplace provides API to:

- [Retrieve abstract products](/docs/marketplace/dev/glue-api-guides/{{ page.version }}/abstract-products/retrieving-abstract-products.html)
- [Retrieve concrete products](/docs/marketplace/dev/glue-api-guides/{{ page.version }}/concrete-products/retrieving-concrete-products.html)
- [Retrieve abstract product lists](/docs/marketplace/dev/glue-api-guides/{{ page.version }}/abstract-products/retrieving-abstract-product-lists.html)
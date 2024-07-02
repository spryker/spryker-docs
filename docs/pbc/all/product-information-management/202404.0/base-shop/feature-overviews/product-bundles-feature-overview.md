---
title: Product Bundles feature overview
description: With the Product Bundles feature you can freely tie individual items together and sell them as a package.
last_updated: Jul 26, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/product-bundles-feature-overview
originalArticleId: b0ed4278-e037-4644-a602-ae16f40a4d9c
redirect_from:
  - /docs/scos/dev/feature-walkthroughs/202200.0/product-bundles-feature-walkthrough.html
  - /docs/scos/dev/feature-walkthroughs/202311.0/product-bundles-feature-walkthrough.html
  - /docs/pbc/all/product-information-management/202311.0/feature-overviews/product-bundles-feature-overview.html
  - /docs/scos/user/features/202005.0/product-bundles-feature-overview.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/feature-overviews/product-bundles-feature-overview.html
---

With the _Product Bundles_ feature you can tie individual items together and sell them as a package. As opposed to a set, in which products are loosely grouped, the items in a bundle are always sold together. You can choose to create a special bundle price to make the purchase more attractive. Since each bundle's product is still handled like an individual item in the Order Management Process, bundle availability is always calculated and displayed based on the item with the smallest available stock to avoid overselling.

A bundle represents two or more products, sold as a set; it is a distinct product that incorporates other concrete products.

Example:
![Product bundle](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Bundles/product_bundles.png)

{% info_block infoBox %}

Bundles are handled in different ways:<br>For example, a marketing bundle of two items that gives a 20% discount is purchased as a single item and then split for processing into its two constituent items. Another scenario is when products are put together from separate purchase items—for example when tires and rims are sold as separate items and then delivered assembled as wheels.

{% endinfo_block %}


* A bundle can contain multiple quantities of the same item.
* The availability of a bundle product is equal to the item with the lowest availability.

## Product-Bundle module

Product bundles are two or more existing products combined into a new type of product for the sole purpose to be displayed as one product in the shop frontend and to be sold together. Typically the products are concrete products, because both need to be potential order items. The new (bundled) product does not physically exist in the bundled state. The Product-Bundle can be bought by customers, but in the order management system the items are handled separately, this way the shop owner can manage the products separately.

### Characteristics of product bundles

* The quantity of each concrete product may be more than 1.
* A product bundle has a localized name and description.
* A product bundle has a sku.
* A product bundle has a price and tax set.
* A product bundle has a virtual stock that is dependent on the stock of the bundled products.
* The stock level has a upper boundary (see Stock calculation).
* A product bundle can have attributes with localized values.
* A product bundle can have localized SEO information.
* A product bundle can have multiple localized image sets.

## Product bundle entity relationship diagram

![Product bundle entity diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product+Bundles/product_bundles_entity_diagram.png)

## Availability calculation

Bundle availability is calculated from bundled product availability. When bundled product availability is changed, for example, a state machine moves through reserved flags, then all bundles are updated accordingly.

Bundle is updated when:

* Stock of bundled product is changed.
* Availability of bundled product is changed.
* When creating bundle.
* Adding new bundled products to bundle.
* When state machine sets flag reserved to bundled product.


## Stock calculation

Bundle have "dynamic stock", the stock is defined by bundled products. It cannot be imported as regular products. That means a bundle will get maximum possible stock quantity based on bundled product quantity. Stock is calculated for each warehouse separately.

For example, bundled item 1 quantity x **2**

For given item stock is:

* In Warehouse **1: Item 1 stock x 10**
* In Warehouse 2: **Item 1 stock x 5**

Then product bundle stock is:

* Warehouse 1: **Bundle stock x 5**
* Warehouse 2: **Bundle stock x 2**

## Product bundle structure in cart

Because of changed structure, cart uses special Yves class to handle bundle operations `ProductBundleAwareCartOperationHandler`.

When bundle item added to cart there is the additional `ExpandBundleItemsPlugin` cart expander plugin which extracts bundled items from given bundle SKU.

For example:

1. Item with SKU “123” is added to cart, expander will look if this item is bundle. If it’s bundle then it will read all bundled items from persistence.
2. Item with SKU “123” is then added to `QuoteTransfer:bundleItems`.
3. This item is given special `ItemTransfer:bundleItemIdentifier` unique ID which have each bundle in cart.
4. At the same time bundled items are created and stored into `CartChangeTransfer:items` with referenced bundled identifier `ItemTransfer:relatedBundleItemIdentifier` this is the same ID where bundle got assigned. This helps to track back belonging bundle items in quote object.

If bundled items have quantity&nbsp;<span aria-label="and then">></span> 1 then it will be split as separate items in cart.

BundleProduct have price this price, it is distributed to whole bundled items. Overwriting original product price. If bundle have price 100, and there is 3 bundled products, each will get price 33,34,33 distributed, 34 is to cover rounding error.

## Persisting when placing an order, end of checkout

Bundle product information is stored to `spy_sales_order_item_bundle`. When an order is placed in order detail page you will see all bundled items stored as separate row. This allows process state machine separately for each item—for example, ship, refund, return.

If bundled item moves to reserved state machine state then corresponding bundle availability will be updated also.

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Create product bundles](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html)  |

## Related Developer documents

|INSTALLATION GUIDES | GLUE API GUIDES  |
|---------|---------|
|[Product Bundles feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-bundles-feature.html) | [Retrieving bundled products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-bundled-products.html) |

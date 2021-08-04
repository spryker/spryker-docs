---
title: Catalog Setup
originalLink: https://documentation.spryker.com/2021080/docs/catalog-setup
redirect_from:
  - /2021080/docs/catalog-setup
  - /2021080/docs/en/catalog-setup
---

**Catalog Setup** contains data required to sell products and build their main structure. 

{% info_block warningBox "Important" %}

We recommend setting up the Catalog after having done the [Commerce Setup](https://documentation.spryker.com/docs/commerce-setup) (which provides the overall structure of the store).

{% endinfo_block %}

This section will help you import the necessary product-related data to be able to sell products/services in your online store. We have structured it into four main categories focusing on the following topics:

*     [Categories](https://documentation.spryker.com/docs/categories)
*     [Products](https://documentation.spryker.com/docs/products-category)
*     [Pricing](https://documentation.spryker.com/docs/pricing)
*     [Stocks](https://documentation.spryker.com/docs/stocks)

Within the [Categories](https://documentation.spryker.com/docs/categories) section, you will find all information about the data imports required to set up categories that can be used in your online store as well as whether they are active, searchable in the menu, etc.

The  [Products](https://documentation.spryker.com/docs/products-category) section will help you import all data defining the products' properties such as the abstract products, the concrete products, product images, and any type of related attributes which describe the products' properties (e.g., their specifications, colors, sizes, etc.).

In the [Pricing](https://documentation.spryker.com/docs/pricing) section, you will be able to import the data necessary to set up prices for all the products you would like to sell in your online store, including advanced pricing such as scheduled prices (e.g., for special sales campaigns like Black Friday).

In the  [Stocks](https://documentation.spryker.com/docs/stocks) section, we describe the data import containing the number of product units stored in your warehouses as well as any type of products and services which are never out of stock (e.g., software downloads).


{% info_block warningBox "Import order" %}

By default, most of the product data is stored in a separate subfolder in `data/import/icecat_biz_data`. The order in which the files are imported is **very strict**:
1. Any product-related entities such as categories, attributes, and tax sets must be imported before the actual products.
2. [product_abstract.csv](https://documentation.spryker.com/docs/file-details-product-abstractcsv) and for multistore setups [product_abstract_store.csv](https://documentation.spryker.com/docs/file-details-product-abstract-storecsv).
3. [product_concrete.csv](https://documentation.spryker.com/docs/file-details-product-concretecsv).
4. Other product data such as images, product sets, etc. in any order.

{% endinfo_block %}






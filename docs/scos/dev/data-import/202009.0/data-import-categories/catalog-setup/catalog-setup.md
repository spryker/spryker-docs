---
title: Catalog Setup
last_updated: Aug 27, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v6/docs/catalog-setup
originalArticleId: a1aab860-e1ed-42b4-9228-4db913be101f
redirect_from:
  - /v6/docs/catalog-setup
  - /v6/docs/en/catalog-setup
---

**Catalog Setup** contains data required to sell products and build their main structure. 

{% info_block warningBox "Important" %}

We recommend setting up the Catalog after having done the [Commerce Setup](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/commerce-setup.html) (which provides the overall structure of the store).

{% endinfo_block %}

This section will help you import the necessary product-related data to be able to sell products/services in your online store. We have structured it into four main categories focusing on the following topics:

*     [Categories](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/categories/categories.html)
*     [Products](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/products.html)
*     [Pricing](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/pricing/pricing.html)
*     [Stocks](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/stocks/stocks.html)

Within the [Categories](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/categories/categories.html) section, you will find all information about the data imports required to set up categories that can be used in your online store as well as whether they are active, searchable in the menu, etc.

The  [Products](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/products.html) section will help you import all data defining the products' properties such as the abstract products, the concrete products, product images, and any type of related attributes which describe the products' properties (e.g., their specifications, colors, sizes, etc.).

In the [Pricing](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/pricing/pricing.html) section, you will be able to import the data necessary to set up prices for all the products you would like to sell in your online store, including advanced pricing such as scheduled prices (e.g., for special sales campaigns like Black Friday).

In the  [Stocks](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/stocks/stocks.html) section, we describe the data import containing the number of product units stored in your warehouses as well as any type of products and services which are never out of stock (e.g., software downloads).


{% info_block warningBox "Import order" %}

By default, most of the product data is stored in a separate subfolder in `data/import/icecat_biz_data`. The order in which the files are imported is **very strict**:
1. Any product-related entities such as categories, attributes, and tax sets must be imported before the actual products.
2. [product_abstract.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html) and for multistore setups [product_abstract_store.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract-store.csv.html).
3. [product_concrete.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-concrete.csv.html).
4. Other product data such as images, product sets, etc. in any order.

{% endinfo_block %}






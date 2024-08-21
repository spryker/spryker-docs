---
title: Product Information Management data import
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/catalog-setup
originalArticleId: 16830216-0c33-4009-86e0-f9995eef7eed
redirect_from:
  - /docs/scos/dev/data-import/202307.0/data-import-categories/catalog-setup/catalog-setup.html
  - /docs/pbc/all/product-information-management/202307.0/base-shop/import-and-export-data/import-product-catalog-data.html
---

To learn how data import works and about different ways of importing data, see [Data import](/docs/dg/dev/data-import/{{page.version}}/data-import.html). This section describes the data import files that are used to import data related to the Product Information Management PBC:


* [Categories](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/categories-data-import/categories-data-import.html)
* [Products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/products-data-import.html)
* [Pricing](/docs/pbc/all/price-management/{{site.version}}/base-shop/import-and-export-data/import-and-export-price-management-data.html)
* [Stocks](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-stock.csv.html)

Within the [Categories](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/categories-data-import/categories-data-import.html) section, you will find all information about the data imports required to set up categories that can be used in your online store as well as whether they are active, searchable in the menu, etc.

The  [Products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/products-data-import.html) section will help you import all data defining the products' properties such as the abstract products, the concrete products, product images, and any type of related attributes which describe the products' properties (e.g., their specifications, colors, sizes, etc.).

In the [Pricing](/docs/pbc/all/price-management/{{site.version}}/base-shop/import-and-export-data/import-and-export-price-management-data.html) section, you will be able to import the data necessary to set up prices for all the products you would like to sell in your online store, including advanced pricing such as scheduled prices (e.g., for special sales campaigns like Black Friday).

In the  [Stocks](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-stock.csv.html) section, we describe the data import containing the number of product units stored in your warehouses as well as any type of products and services which are never out of stock (e.g., software downloads).


{% info_block warningBox "Import order" %}

By default, most of the product data is stored in a separate subfolder in `data/import/icecat_biz_data`. The order in which the files are imported is **very strict**:

1. Any product-related entities such as categories, attributes, and tax sets must be imported before the actual products.
2. [product_abstract.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html) and for multi-store setups [product_abstract_store.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract-store.csv.html).
3. [product_concrete.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-concrete.csv.html).
4. Other product data such as images, product sets, etc. in any order.

{% endinfo_block %}

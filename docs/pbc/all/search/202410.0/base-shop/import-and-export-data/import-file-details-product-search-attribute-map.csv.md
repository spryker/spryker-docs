---
title: "Import file details: product_search_attribute_map.csv"
description: Learn how to confgiure product searh attribute map in your Spryker shop using the product search attribute map csv file.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-search-attribute-mapcsv
originalArticleId: 4f555e2a-157b-414e-89e5-07499e88c090
redirect_from:
  - /docs/scos/dev/data-import/202311.0/data-import-categories/merchandising-setup/product-merchandising/file-details-product-search-attribute-map.csv.html
  - /docs/pbc/all/search/202311.0/import-and-export-data/file-details-product-search-attribute-map.csv.html
  - /docs/pbc/all/search/202311.0/base-shop/import-data/file-details-product-search-attribute-map.csv.html
  - /docs/pbc/all/search/202311.0/base-shop/import-and-export-data/file-details-product-search-attribute-map.csv.html
  - /docs/pbc/all/search/202311.0/base-shop/import-and-export-data/file-details-product-search-attribute-map.csv.html
  - /docs/scos/dev/data-import/202204.0/data-import-categories/merchandising-setup/product-merchandising/file-details-product-search-attribute-map.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/latest/execution-order-of-data-importers.html
---

This document describes the `product_search_attribute_map.csv` file to configure Product Search Attribute Map information in your Spryker Demo Shop.

## Import file dependencies

[product_attribute_key.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-attribute-key.csv.html).

## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| attribute_key | &check; | String |  | Identifier of an attribute. |
| target_field |  | String | Any constant from the class `src/Generated/Shared/Search/PageIndexMap.php` | Elasticsearch property. |


## Additional information

This file maps the product attributes that are imported in the `product_attribute_key.csv` file with Elasticsearch-specific properties.

## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [product_search_attribute_map.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/Template+product_search_attribute_map.csv) | Exemplary import file with headers only. |
| [product_search_attribute_map.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/product_search_attribute_map.csv) | Exemplary import file with headers only. |


## Import command

```bash
data:import:product-search-attribute-map
```

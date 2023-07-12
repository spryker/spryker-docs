---
title: "File details: product_search_attribute_map.csv"
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-search-attribute-mapcsv
originalArticleId: 4f555e2a-157b-414e-89e5-07499e88c090
redirect_from:
  - /2021080/docs/file-details-product-search-attribute-mapcsv
  - /2021080/docs/en/file-details-product-search-attribute-mapcsv
  - /docs/file-details-product-search-attribute-mapcsv
  - /docs/en/file-details-product-search-attribute-mapcsv
  - /docs/scos/dev/data-import/202212.0/data-import-categories/merchandising-setup/product-merchandising/file-details-product-search-attribute-map.csv.html
  - /docs/pbc/all/search/202212.0/import-data/file-details-product-search-attribute-map.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
---

This document describes the `product_search_attribute_map.csv` file to configure Product Search Attribute Map information in your Spryker Demo Shop.

## Import file dependencies

[product_attribute_key.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-attribute-key.csv.html).

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

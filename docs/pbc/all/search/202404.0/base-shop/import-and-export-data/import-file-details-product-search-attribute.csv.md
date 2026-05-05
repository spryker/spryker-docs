---
title: "Import file details: product_search_attribute.csv"
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-search-attributecsv
originalArticleId: 65570cb4-dec5-4f90-85f2-3d22493d874c
redirect_from:
  - /docs/scos/dev/data-import/202311.0/data-import-categories/merchandising-setup/product-merchandising/file-details-product-search-attribute.csv.html
  - /docs/pbc/all/search/202311.0/import-and-export-data/file-details-product-search-attribute.csv.html
  - /docs/pbc/all/search/202311.0/base-shop/import-data/file-details-product-search-attribute.csv.html
  - /docs/pbc/all/search/202311.0/base-shop/import-and-export-data/file-details-product-search-attribute.csv.html
  - /docs/pbc/all/search/202311.0/base-shop/import-and-export-data/file-details-product-search-attribute.csv.html
  - /docs/scos/dev/data-import/202204.0/data-import-categories/merchandising-setup/product-merchandising/file-details-product-search-attribute.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `product_search_attribute.csv` file to configure Product Search Attribute information in your Spryker Demo Shop.

## Import file dependencies

[product_attribute_key.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-attribute-key.csv.html)

## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| key | &check; | String |N/A* | Key identifier string of the product search attribute. |
| filter_type |  | String |N/A | Type of search filter, Elasticsearch-specific. |
| position |  | Number |N/A | Position of the product search attribute, Elasticsearch specific. |
| key.{ANY_LOCALE_NAME}*<br>Example value: *key.en_US*  | &check; | String |N/A | Key identifier string of the product search attribute, translated in the specified locale US for our example). |

*ANY_LOCALE_NAME: Locale date is dynamic in data importers. It means that ANY_LOCALE_NAME postfix can be changed, removed, and any number of columns with different locales can be added to the CSV files.

## Additional information

The attribute key is previously loaded from `productattributekey.csv`, which can be translated in key.* fields.

## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [product_search_attribute.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/Template+product_search_attribute.csv) | Exemplary import file with headers only. |
| [product_search_attribute.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/product_search_attribute.csv) | Exemplary import file with headers only. |

## Import command

```bash
data:import:product-search-attribute
```

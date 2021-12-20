---
title: File details- product_discontinued.csv
last_updated: Aug 27, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v6/docs/file-details-product-discontinuedcsv
originalArticleId: 4581b584-6b0b-4af8-9ce5-15e8aad50df8
redirect_from:
  - /v6/docs/file-details-product-discontinuedcsv
  - /v6/docs/en/file-details-product-discontinuedcsv
---

This article contains content of the **product_discontinued.csv** file to configure [Discontinued Product](/docs/scos/user/features/{{page.version}}/product-feature-overview/discontinued-products-overview.html) information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **sku_concrete** | Yes | String |N/A* | SKU of the concrete discontinued product. |
| **note.{ANY_LOCALE_NAME}**<br>Example value: *note.en_US* | No | String |N/A | Note translated into the specified locale (US for our example).  |

*N/A: Not applicable.
**ANY_LOCALE_NAME: Locale date is dynamic in data importers. It means that ANY_LOCALE_NAME postifx can be changed, removed, and any number of columns with different locales can be added to the .csv files.

## Dependencies

This file has the following dependency:
* [product_concrete.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-concrete.csv.html)

## Template File & Content Example
A template and an example of the *product_discontinued.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [product_discontinued.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/Template+product_discontinued.csv) | Product Discontinued .csv template file (empty content, contains headers only). |
| [product_discontinued.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/product_discontinued.csv) | Product Discontinued .csv file containing a Demo Shop data sample. |

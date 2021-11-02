---
title: File details- product_option.csv
last_updated: Aug 27, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v6/docs/file-details-product-optioncsv
originalArticleId: c76bd6fe-f031-4b02-ae83-d478cc009c7c
redirect_from:
  - /v6/docs/file-details-product-optioncsv
  - /v6/docs/en/file-details-product-optioncsv
---

This article contains content of the **product_option.csv** file to configure [Product Option](/docs/scos/user/features/{{page.version}}/product-options-feature-overview.html) information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **abstract_product_skus** | No | String |N/A* | List of Abstract Product SKUs separated by comma. |
| **option_group_id** | Yes | String |If doesn't exist then it will be automatically created.  | Identifier of the Product Option Group. |
| **tax_set_name** | No | String |N/A | Name of the tax set. |
| **group_name_translation_key** | No | String |N/A |  Translation key of the name of the group in different locales.|
| **group_name.{ANY_LOCALE_NAME}***<br>Example value: *group_name.en_US* | No | String |N/A* | Name of the group in the specified locale (US for our example). |
| **option_name_translation_key** | No | String |N/A | Translation key of the name of the option in different locales. |
| **option_name.{ANY_LOCALE_NAME}**<br>Example value: *option_name.en_US* ** | No | String |N/A | Name of the option in the specified locale (US for our example).  |
| **sku** | No (unique) | String |N/A | SKU identifier of the Product Option. |
*N/A: Not applicable.
**ANY_LOCALE_NAME: Locale date is dynamic in data importers. It means that ANY_LOCALE_NAME postifx can be changed, removed, and any number of columns with different locales can be added to the .csv files.

## Dependencies

This file has the following dependencies:
*     [product_abstract.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html)

## Template File & Content Example
A template and an example of the *product_option.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [product_option.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Special+Product+Types/Product+Options/Template+product_option.csv) | Payment Method Store .csv template file (empty content, contains headers only). |
| [product_option.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Special+Product+Types/Product+Options/product_option.csv) | Payment Method Store .csv file containing a Demo Shop data sample. |

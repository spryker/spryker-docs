---
title: File details- product_set.csv
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-setcsv
originalArticleId: 41c315c8-8d81-4a70-9318-45fea1ebf2c1
redirect_from:
  - /2021080/docs/file-details-product-setcsv
  - /2021080/docs/en/file-details-product-setcsv
  - /docs/file-details-product-setcsv
  - /docs/en/file-details-product-setcsv
---

This article contains content of the **product_set.csv** file to configure [Product Set](/docs/scos/user/features/{{page.version}}/product-sets-feature-overview.html) information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **product_set_key** | Yes (*unique*) | String |N/A* | Key identifier of the product set. |
| **weight** | No | Number |N/A | Weight of the product set. |
| **is_active** | No | Boolean |True = 1<br>False = 0 | Indicates if the product set is active or not. |
| **abstract_skus** | Yes | String |N/A | String containing SKUs of the abstract products, separate by comas, which are part of the product set. |
| **name.{ANY_LOCALE_NAME}** **<br>Example value: *name.en_US* | No | String |N/A |Name of the product set, translated in the specified locale (US for our example).  |
| **url.{ANY_LOCALE_NAME}**<br>Example value: *url.en_US* | No | String |N/A | URL of the product set, used in the specified locale (US for our example). |
| **description.{ANY_LOCALE_NAME}**<br>Example value: *description.en_US* | No | String |N/A | Description of the product set, translated in the specified locale (US for our example). |
| **meta_title.{ANY_LOCALE_NAME}**<br>Example value: *meta_title.en_US* | No | String |N/A |Meta data title of the product set, translated in the specified locale (US for our example).  |
| **meta_keywords.{ANY_LOCALE_NAME}**<br>Example value: *meta_keywords.en_US*  | No | String |N/A | Meta data keywords of the product set, translated in the specified locale (US for our example).|
| **image_set.1** | No | String |N/A | Image of the product set. |
| **image_small.1.1** | No | String |N/A | Small image of the first product of the product set. |
| **image_large.1.1** | No | String |N/A | Large image of the first product of the product set. |
| **image_small.1.2** | No | String |N/A |	Small image of the second product of the product set.  |
| **image_large.1.2** | No | String |N/A | Large image of the second product of the product set. |
*N/A: Not applicable.
**ANY_LOCALE_NAME: Locale date is dynamic in data importers. It means that ANY_LOCALE_NAME postifx can be changed, removed, and any number of columns with different locales can be added to the .csv files.

## Dependencies

This file has the following dependency:
*    [product_abstract.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html)

## Template File & Content Example
A template and an example of the *product_set.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [product_set.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/Template+product_set.csv) | Product Set .csv template file (empty content, contains headers only). |
| [product_set.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/product_set.csv) | Product Set .csv file containing a Demo Shop data sample. |

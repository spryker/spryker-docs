---
title: File details- content_product_abstract_list.csv
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-content-product-abstract-listcsv
originalArticleId: b165b205-174d-4f91-8b37-d15ce455285c
redirect_from:
  - /2021080/docs/file-details-content-product-abstract-listcsv
  - /2021080/docs/en/file-details-content-product-abstract-listcsv
  - /docs/file-details-content-product-abstract-listcsv
  - /docs/en/file-details-content-product-abstract-listcsv
---

This article contains content of the **content_product_abstract_list.csv** file to configure [Content Product Abstract List](/docs/scos/user/features/{{page.version}}/content-items-feature-overview.html#content-item) information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **key** | Yes (*unique*) | String |N/A* | 	
Unique identifier of the content. |
| **name** | Yes | String |Human-readable name. | Name of the content. |
| **description** | No | String |N/A | Description of the content. |
| **skus.default** | Yes | String |N/A | Default list of product abstract SKUs. |
| **skus.{ANY_LOCALE_NAME}** **<br>Example value: *skus.en_US* | No | String | N/A |List of product abstract SKUs, translated into the specified locale (US for our example). | 
*N/A: Not applicable.
** ANY_LOCALE_NAME: Locale date is dynamic in data importers. It means that ANY_LOCALE_NAME postifx can be changed, removed, and any number of columns with different locales can be added to the .csv files.

## Dependencies

This file has the following dependency:
*    [product_abstract.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html) 

## Template File & Content Example
A template and an example of the *content_product_abstract_list.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [content_product_abstract_list.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/Template+content_product_abstract_list.csv) | Content Product Abstract List .csv template file (empty content, contains headers only). |
| [content_product_abstract_list.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/content_product_abstract_list.csv) | Content Product Abstract List .csv file containing a Demo Shop data sample. |

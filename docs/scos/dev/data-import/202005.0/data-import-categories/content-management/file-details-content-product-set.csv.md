---
title: File details- content_product_set.csv
last_updated: Sep 14, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v5/docs/file-details-content-product-setcsv
originalArticleId: 04807df6-88e4-433e-bd4c-a85720bfd9fd
redirect_from:
  - /v5/docs/file-details-content-product-setcsv
  - /v5/docs/en/file-details-content-product-setcsv
---

This article contains content of the **content_product_set.csv** file to configure [Content Product Set](/docs/scos/user/features/{{page.version}}/content-items-feature-overview.html#content-item) information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **key** | Yes (*unique*) | String |N/A* | Unique identifier of the content. |
| **name** | Yes | String |	Human-readable name. | Name of the content. |
| **description** | Yes | String |N/A | Description of the content. |
| **product_set_key.default** | Yes | String |N/A | Default key identifier of the product set. |
| **product_set_key.{ANY_LOCALE_NAME}** **<br>Example value: *product_set_key.en_US* | No | String |N/A | Key identifier of the product set, translated |

*N/A: Not applicable.

## Dependencies

This file has the following dependencies:
*    [product_set.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/file-details-product-set.csv.html)

## Template File & Content Example
A template and an example of the *content_product_set.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [content_product_set.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/Template+content_product_set.csv) | Content Product Set .csv template file (empty content, contains headers only). |
| [content_product_set.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/content_product_set.csv) | Content Product Set .csv file containing a Demo Shop data sample. |

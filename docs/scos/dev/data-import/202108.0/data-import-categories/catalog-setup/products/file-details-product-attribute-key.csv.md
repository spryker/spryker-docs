---
title: File details- product_attribute_key.csv
last_updated: Jul 7, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-attribute-keycsv
originalArticleId: 141aa68e-c752-4021-b6cb-df6fa4803d72
redirect_from:
  - /2021080/docs/file-details-product-attribute-keycsv
  - /2021080/docs/en/file-details-product-attribute-keycsv
  - /docs/file-details-product-attribute-keycsv
  - /docs/en/file-details-product-attribute-keycsv
---

This article contains content of the `product_attribute_key.csv` file to configure [Product Attribute](/docs/scos/user/features/{{page.version}}/product-feature-overview/product-attributes-overview.html) information on your Spryker Demo Shop.

## Headers & Mandatory Fields
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **attribute_key** | Yes (*unique*) | String |N/A* | Product attribute key name. |
| **is_super** | No | Boolean |If empty it will be imported as *False* (0).<br>False = 0 = It is not a super attribute.<br>True = 1 = It is a super attribute. | Indicates whether it is a super attribute or not.  |
*N/A: Not applicable.

## Dependencies
This file has no dependencies.

## Template File & Content Example
A template and an example of the *product_attribute_key.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [product_attribute_key.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/Template+product_attribute_key.csv) | Product Attribute Key .csv template file (empty content, contains headers only). |
| [product_attribute_key.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/product_attribute_key.csv) | Product Attribute Key .csv file containing a Demo Shop data sample. |

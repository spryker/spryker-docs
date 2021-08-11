---
title: File details- product_review.csv
originalLink: https://documentation.spryker.com/v5/docs/file-details-product-reviewcsv
redirect_from:
  - /v5/docs/file-details-product-reviewcsv
  - /v5/docs/en/file-details-product-reviewcsv
---

This article contains content of the **product_review.csv** file to configure [Product Review](https://documentation.spryker.com/docs/en/product-reviews) information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **customer_reference** | Yes | String |N/A* | Reference identifier of the customer. |
| **abstract_product_sku** | Yes | String |N/A | SKU of the abstract product. |
| **locale_name** | No | String |N/A | Identification of the locale of the review. |
| **nickname** | No | String |N/A | Nickname of the review owner. |
| **summary** | No | String |N/A | 	Summary of the review. |
| **description** | No | String |N/A | Description of the review. |
| **rating** | Yes | Number |N/A | Review rating. |
| **status** | Yes | String |Possible values: *pending*, *approved*,  *rejected*. | Review status. |
*N/A: Not applicable.

## Dependencies

This file has the following dependency:
*    [product_abstract.csv](https://documentation.spryker.com/docs/en/file-details-product-abstractcsv)

## Template File & Content Example
A template and an example of the *product_review.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [product_review.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/Template+product_review.csv) | Product Review .csv template file (empty content, contains headers only). |
| [product_review.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/product_review.csv) | Product Review .csv file containing a Demo Shop data sample. |

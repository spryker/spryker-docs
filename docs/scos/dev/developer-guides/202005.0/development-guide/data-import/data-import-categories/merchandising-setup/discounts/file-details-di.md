---
title: File details- discount.csv
originalLink: https://documentation.spryker.com/v5/docs/file-details-discountcsv
redirect_from:
  - /v5/docs/file-details-discountcsv
  - /v5/docs/en/file-details-discountcsv
---

This article contains content of the **discount.csv** file to configure [Discount](https://documentation.spryker.com/docs/en/discount) information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **discount_key** | Yes (*unique*) | String |N/A* | Key identifier of the discount. |
| **display_name** | Yes (*unique*) | String |N/A | Unique display name of the discount. |
| **description** | Yes | String |N/A |Description of the discount. |
| **amount** | No | Number |N/A | Discount amount. |
| **calculator_plugin** | No | String |N/A | Name of the plugin used to calculate the product discount. |
| **is_exclusive** | No | Boolean |True = 1<br>False = 0 | Indicates if the discount is exclusive or not. |
| **is_active** | Boolean | String |True = 1<br>False = 0| Indicates if the discount is active or not. |
| **valid_from** | No | Date |N/A | Indicates the date from which the discount is valid. |
| **valid_to** | No | String |N/A | Indicates the date to which the discount is valid. |
| **decision_rule_query_string** | No | String |N/A | Query with the decision rule to assign the discount.  |
| **collector_query_string** | No | String |N/A | Query with the rule to collect the discount. |
| **discount_type** | No | String |*discount_type* can be either:<ul><li>cart_rule</li><li>voucher</li></ul> | Type of discount. |
| **promotion_sku** | No | String |N/A | SKU of the promotion. |
| **promotion_quantity** | No | Number |N/A | Quantity of product items that have this discount. |

*N/A: Not applicable.

## Dependencies
This file has no dependencies.

## Recommendations & other information
If `discount_type` is set to *voucher*  then a voucher pool will be created from this data.

## Template File & Content Example
A template and an example of the *discount.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [discount.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Discounts/Template+discount.csv) | Discount .csv template file (empty content, contains headers only). |
| [discount.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Discounts/discount.csv) | Discount .csv file containing a Demo Shop data sample. |

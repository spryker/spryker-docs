---
title: File details- gift_card_abstract_configuration.csv
originalLink: https://documentation.spryker.com/v6/docs/file-details-gift-card-abstract-configurationcsv
redirect_from:
  - /v6/docs/file-details-gift-card-abstract-configurationcsv
  - /v6/docs/en/file-details-gift-card-abstract-configurationcsv
---

This article contains content of the **gift_card_abstract_configuration.csv** file to configure [Gift Card](https://documentation.spryker.com/docs/gift-card) Abstract Configuration information on your Spryker Demo Shop. A **Gift Card Product** is a regular product in the shop which represents a Gift Card that Customer can buy. The **Gift Card Abstract Product** represents a type of Gift Cards with a code pattern (e.g. "XMAS-", “Happy-B”, etc.).

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **abstract_sku** | Yes | String |N/A* | SKU identifier of the Gift Card Abstract Product. |
| **pattern** | No | String |N/A | Pattern that is used to create the unique code of the produced Gift Card after the purchase. |
*N/A: Not applicable.

## Dependencies

This file has the following dependencies:
*     [product_abstract.csv](https://documentation.spryker.com/docs/file-details-product-abstractcsv)

## Template File & Content Example
A template and an example of the *gift_card_abstract_configuration.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [gift_card_abstract_configuration.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Special+Product+Types/Gift+Cards/Template+gift_card_abstract_configuration.csv) | Gift Card Abstract Configuration .csv template file (empty content, contains headers only). |
| [gift_card_abstract_configuration.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Special+Product+Types/Gift+Cards/gift_card_abstract_configuration.csv) |Gift Card Abstract Configuration .csv file containing a Demo Shop data sample. |


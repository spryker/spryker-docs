---
title: File details- gift_card_concrete_configuration.csv
last_updated: Jun 15, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/v6/docs/file-details-gift-card-concrete-configurationcsv
originalArticleId: 7c1fa4e8-2b26-4807-bd76-fd0f0d8914a8
redirect_from:
  - /v6/docs/file-details-gift-card-concrete-configurationcsv
  - /v6/docs/en/file-details-gift-card-concrete-configurationcsv
---

This article contains content of the **gift_card_concrete_configuration.csv** file to configure [Gift Card](/docs/scos/user/features/{{page.version}}/gift-cards-feature-overview.html) Concrete Configuration information on your Spryker Demo Shop. A **Gift Card Product** is a regular product in the shop which represents a Gift Card that Customer can buy. In this file, you can configure the amount of money that will be loaded in the Gift Card.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **sku** | Yes | String |N/A* | SKU identifier of the Concrete Gift Card Product. |
| **value** | Yes | Integer |N/A |The amount of money that will be loaded in the Gift Card.  |
*N/A: Not applicable.

## Dependencies

This file has the following dependencies:
*     [product_concrete.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-concrete.csv.html)

## Template File & Content Example
A template and an example of the *gift_card_concrete_configuration.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [gift_card_concrete_configuration.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Special+Product+Types/Gift+Cards/Template+gift_card_concrete_configuration.csv) | Gift Card Concrete Configuration .csv template file (empty content, contains headers only). |
| [gift_card_concrete_configuration.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Special+Product+Types/Gift+Cards/gift_card_concrete_configuration.csv) | Gift Card Concrete Configuration .csv file containing a Demo Shop data sample. |

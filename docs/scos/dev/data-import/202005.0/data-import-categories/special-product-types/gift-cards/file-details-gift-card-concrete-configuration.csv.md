---
title: File details- gift_card_concrete_configuration.csv
last_updated: Sep 14, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v5/docs/file-details-gift-card-concrete-configurationcsv
originalArticleId: 03acbbf6-ee0f-4c2a-b665-6fd733f059bd
redirect_from:
  - /v5/docs/file-details-gift-card-concrete-configurationcsv
  - /v5/docs/en/file-details-gift-card-concrete-configurationcsv
---

This article contains content of the **gift_card_concrete_configuration.csv** file to configure [Gift Card](/docs/scos/user/features/{{page.version}}/gift-cards-feature-overview.html) Concrete Configuration information on your Spryker Demo Shop. A **Gift Card Product** is a regular product in the shop which represents a Gift Card that Customer can buy. In this file,  you can configure the ammount of money that will be loaded in the Gift Card.

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
| [gift_card_concrete_configuration.csv template]() | Gift Card Concrete Configuration .csv template file (empty content, contains headers only). |
| [gift_card_concrete_configuration.csv]() | Gift Card Concrete Configuration .csv file containing a Demo Shop data sample. |

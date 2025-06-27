---
title: "Import file details: gift_card_abstract_configuration.csv"
description: Learn how to configure the Spryker Gift Card Abstract feature by importing data through the gift card abstract configuration csv file.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-gift-card-abstract-configurationcsv
originalArticleId: c11ce919-bf0c-4dc1-bcd5-65f0c477a8de
redirect_from:
  - /docs/scos/dev/data-import/201811.0/data-import-categories/special-product-types/gift-cards/file-details-gift-card-abstract-configuration.csv.html
  - /docs/scos/dev/data-import/201903.0/data-import-categories/special-product-types/gift-cards/file-details-gift-card-abstract-configuration.csv.html
  - /docs/scos/dev/data-import/201907.0/data-import-categories/special-product-types/gift-cards/file-details-gift-card-abstract-configuration.csv.html
  - /docs/scos/dev/data-import/202311.0/data-import-categories/special-product-types/gift-cards/file-details-gift-card-abstract-configuration.csv.html
  - /docs/pbc/all/gift-cards/202311.0/import-and-export-data/file-details-gift-card-abstract-configuration.csv.html
  - /docs/pbc/all/gift-cards/202204.0/import-and-export-data/import-file-details-gift-card-abstract-configuration.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `gift_card_abstract_configuration.csv` file to configure [Gift Card](/docs/pbc/all/gift-cards/latest/gift-cards.html) Abstract Configuration information in your Spryker Demo Shop. A **Gift Card Product** is a regular product in the shop which represents a Gift Card that Customer can buy. The **Gift Card Abstract Product** represents a type of Gift Cards with a code pattern–for example "XMAS-" or "Happy-B".

## Import file dependencies

[product_abstract.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html).

## Import file parameters

| PARAMETER | REQUIRED | TYPE | DEFAULT VALUE | DESCRIPTION |
| --- | --- | --- | --- | --- |
| abstract_sku | &check; | String |  | SKU identifier of the Gift Card Abstract Product. |
| pattern |  | String |  | Pattern that is used to create the unique code of the produced Gift Card after the purchase. |

## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [gift_card_abstract_configuration.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Special+Product+Types/Gift+Cards/Template+gift_card_abstract_configuration.csv) | Exemplary import file with headers only.  |
| [gift_card_abstract_configuration.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Special+Product+Types/Gift+Cards/gift_card_abstract_configuration.csv) | Exemplary import file with Demo Shop data. |

## Import file command

```bash
data:import:gift-card-abstract-configuration
```

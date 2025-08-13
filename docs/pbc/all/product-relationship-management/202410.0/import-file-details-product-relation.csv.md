---
title: "Import file details: product_relation.csv"
description: Learn how to configure product relation information using the product relation CSV file in your Spryker project.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-relationcsv
originalArticleId: ce1a13ce-5d62-4e75-9af5-912210f3a8f0
redirect_from:
  - /docs/pbc/all/product-relationship-management/202311.0/file-details-product-relation.csv.html
  - /docs/scos/dev/data-import/202204.0/data-import-categories/merchandising-setup/product-merchandising/file-details-product-relation.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/latest/execution-order-of-data-importers.html
---

This document describes the `product_relation.csv` file to configure [Product Relation](/docs/pbc/all/product-relationship-management/{{page.version}}/product-relationship-management.html) information in your Spryker Demo Shop.

To import the file, run:

```bash
data:import:product-relation
```

## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| product | &check; | String |  | SKU of the abstract product. |
| relation_type |  | String |  | Type of relation. |
| rule |  | String |  | Query which defines the relation between the product and the other products. |
| product_relation_key | &check; | String |  | Key that is used to assign store relations. |
| is_active |  | Integer |  | Defines if the product relation is active. |
| is_rebuild_scheduled |  | Integer |  | Defines if the list of related products should be regularly updated by running a cronjob. |

## Import file dependencies

This file has the following dependency: [product_abstract.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html).

## Import template file and content example

Find the template and an example of the file below:

| FILE | DESCRIPTION |
| --- | --- |
| [product_relation.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/Template+product_relation.csv) | Exemplary import file with headers only. |
| [product_relation.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/product_relation.csv) | Exemplary import file with headers only. |

---
title: File details- product_relation.csv
last_updated: Aug 27, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v6/docs/file-details-product-relationcsv
originalArticleId: 1e721d8c-1b3d-4043-8469-2d0300b803e5
redirect_from:
  - /v6/docs/file-details-product-relationcsv
  - /v6/docs/en/file-details-product-relationcsv
---

This article contains content of the **product_relation.csv** file to configure [Product Relation](/docs/scos/user/features/{{page.version}}/product-relations-feature-overview.html) information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **product** | Yes | String |N/A* | SKU of the abstract product. |
| **relation_type** | No | String |N/A | Type of relation. |
| **rule** | No | String |N/A | Query which defines the relation between the product and the other products. |
| **product_relation_key** | Yes | String |N/A | Key that is used to assign store relations. |
| **is_active** | No | Integer |N/A | Defines if the product relation is active. |
| **is_rebuild_scheduled** | No | Integer |N/A | Defines if the list of related products should be regularly updated by running a cronjob. |
*N/A: Not applicable.

## Dependencies

This file has the following dependency:
*    [product_abstract.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html)

## Template File & Content Example
A template and an example of the *product_relation.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [product_relation.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/Template+product_relation.csv) | Product Relation .csv template file (empty content, contains headers only). |
| [product_relation.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/product_relation.csv) | Product Relation .csv file containing a Demo Shop data sample. |

---
title: "Import file details: cms_block_category.csv"
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-cms-block-categorycsv
originalArticleId: 2aad4789-139d-437f-b295-3bb3c75b9d40
redirect_from:
  - /2021080/docs/file-details-cms-block-categorycsv
  - /2021080/docs/en/file-details-cms-block-categorycsv
  - /docs/file-details-cms-block-categorycsv
  - /docs/en/file-details-cms-block-categorycsv
  - /docs/scos/dev/data-import/202204.0/data-import-categories/content-management/file-details-cms-block-category.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
---

This document describes the `cms_block_category.csv` file to configure CMS Block Category information in your Spryker Demo Shop.

## Import file dependencies

This file has the following dependency: [cms_block_category_position.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-block-category-postion.csv.html).

## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| block_key | &check; | String |  |  Identifier key of the Block.|
| category_key | &check; | String |  | Identifier key of the category. |
| category_template_name | &check; | String |  | Name of the category template. |
| cms_block_category_position_name |  | String |  | Name of the CMS block category position. |

## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [cms_block_category.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/cms_block_category_template.csv) | Exemplary import file with headers only. |
| [cms_block_category.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/cms_block_category.csv) | Exemplary import file with Demo Shop data. |


## Import file command

```bash
data:import:cms-block-category
```

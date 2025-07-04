---
title: "Import file details: cms_block_store.csv"
description: Understand the Spryker cms block store csv file to configure CMS Block Store information for your Spryker Shop.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-cms-block-storecsv
originalArticleId: eb3af5d2-ec2b-4452-8a11-d392431ab8d2
redirect_from:
  - /docs/scos/dev/data-import/201811.0/data-import-categories/content-management/file-details-cms-block-store.csv.html
  - /docs/scos/dev/data-import/202311.0/data-import-categories/content-management/file-details-cms-block-store.csv.html
  - /docs/pbc/all/content-management-system/202311.0/import-and-export-data/file-details-cms-block-store.csv.html
  - /docs/pbc/all/content-management-system/202311.0/base-shop/import-and-export-data/file-details-cms-block-store.csv.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/import-and-export-data/import-file-details-cms-block-store.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `cms_block_store.csv` file to configure CMS Block Store information on your Spryker Demo Shop.


## Import file dependencies


- [cms_block.csv](/docs/pbc/all/content-management-system/latest/base-shop/import-and-export-data/import-file-details-cms-block.csv.html)
- *stores.php* configuration file of the demo shop PHP project


## Import file parameters



| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| block_key | &check; | String |  | Key identifier of the block.  |
| store_name | &check; | String |  | Name of the store. |




## Import template file and content example



| FILE | DESCRIPTION |
| --- | --- |
| [cms_block_store.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/Template+cms_block_store.csv) | Exemplary import file with headers only. |
| [cms_block_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/cms_block_store.csv) | Exemplary import file with Demo Shop data. |


## Import file command

```bash
data:import:cms-block-store
```

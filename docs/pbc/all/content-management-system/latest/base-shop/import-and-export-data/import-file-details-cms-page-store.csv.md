---
title: "Import file details: cms_page_store.csv"
description: Learn about the Spryker cms page store csv file to configure CMS Page Store information for your Spryker Shop.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-cms-page-storecsv
originalArticleId: e8f80649-24da-450a-a696-c3b9f02a52eb
redirect_from:
  - /docs/scos/dev/data-import/202311.0/data-import-categories/content-management/file-details-cms-page-store.csv.html
  - /docs/pbc/all/content-management-system/202311.0/import-and-export-data/file-details-cms-page-store.csv.html
  - /docs/pbc/all/content-management-system/202311.0/base-shop/import-and-export-data/file-details-cms-page-store.csv.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/import-and-export-data/import-file-details-cms-page-store.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/latest/execution-order-of-data-importers.html
---

This document describes the `cms_page_store.csv` file to configure CMS Page Store information in your Spryker Demo Shop.

## Import file dependencies


- [cms_page.csv](/docs/pbc/all/content-management-system/latest/base-shop/import-and-export-data/import-file-details-cms-page.csv.html)
- *stores.php* configuration file of the demo shop PHP project


## Import file parameters


| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| page_key | &check; | String | Must be unique. | Unique identifier of the page. |
| store_name | &check; | String |  | Store name identifier. |



## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [cms_page_store.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/Template+cms_page_store.csv) | Exemplary import file with headers only. |
| [cms_page_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/cms_page_store.csv) | Exemplary import file with Demo Shop data. |

## Import file command

```bash
data:import cms-page-store
```

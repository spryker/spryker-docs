---
title: "Import file details: cms_slot_block.csv"
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-cms-slot-blockcsv
originalArticleId: 848a3e6c-edad-4c9b-b7af-0b0c847b258f
redirect_from:
  - /docs/scos/dev/data-import/201811.0/data-import-categories/content-management/file-details-cms-slot-block.csv.html
  - /docs/scos/dev/data-import/202307.0/data-import-categories/content-management/file-details-cms-slot-block.csv.html  
  - /docs/pbc/all/content-management-system/202307.0/import-and-export-data/file-details-cms-slot-block.csv.html  
  - /docs/pbc/all/content-management-system/202307.0/base-shop/import-and-export-data/file-details-cms-slot-block.csv.html  
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `cms_slot_block.csv` file to configure [CMS Slot Block](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/cms-feature-overview/templates-and-slots-overview.html) information in your Spryker Demo Shop.

## Import file dependencies



* [cms_slot.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-slot.csv.html)
* [cms_block.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-block.csv.html)




## Import file parameters



| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| template_path | &check; | String | Must be a valid path to a twig template. | Path to the Twig file template. |
| slot_key | &check; | String |  | Slot key identifier. |
| block_key | &check; | String |  |Block key identifier.  |
| position | &check; | Integer |  | Position of the block in the slot. |
| conditions.productCategory.all |  | String |  | Conditions for all product categories. |
| conditions.productCategory.skus |  | String |  | Conditions for product category and product SKUs. |
| conditions.productCategory.category_key |  | String |N/A | Conditions for product category and category key identifiers. |
| conditions.category.all |  | String |  | Conditions for all categories. |
| conditions.category.category_key |  | String |  |Conditions for categories and product category key identifiers.  |
| conditions.cms_page.all |  | String |  | Conditions for all CMS pages. |
| conditions.cms_page.page_key |  | String |  | Conditions for Page key identifiers and CMS pages. |




## Import template file and content example



| FILE | DESCRIPTION |
| --- | --- |
| [cms_slot_block.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/Template+cms_slot_block.csv) | Exemplary import file with headers only. |
| [cms_slot_block.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/cms_slot_block.csv) | Exemplary import file with Demo Shop data. |


## Import file command

```bash
data:import:cms-slot-block
```

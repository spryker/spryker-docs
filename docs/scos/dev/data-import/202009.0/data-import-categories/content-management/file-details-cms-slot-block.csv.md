---
title: File details- cms_slot_block.csv
last_updated: Aug 27, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v6/docs/file-details-cms-slot-blockcsv
originalArticleId: 9d0f55e3-9a4e-4394-817e-1f36ba74ff67
redirect_from:
  - /v6/docs/file-details-cms-slot-blockcsv
  - /v6/docs/en/file-details-cms-slot-blockcsv
---

This article contains content of the **cms_slot_block.csv** file to configure [CMS Slot Block](/docs/scos/user/features/{{page.version}}/cms-feature-overview/templates-and-slots-overview.html) information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **template_path** | Yes | String |Must be a valid path to a twig template. | Path to the Twig file template. |
| **slot_key** | Yes | String |N/A* | Slot key identifier. |
| **block_key** | Yes | String |N/A |Block key identifier.  |
| **position** | Yes | Integer |N/A | Position of the block in the slot. |
| **conditions.productCategory.all** | No | String |N/A | Conditions for all product categories. |
| **conditions.productCategory.skus** | No | String |N/A | Conditions for product category and product SKUs. |
| **conditions.productCategory.category_key** | No | String |N/A | Conditions for product category and category key identifiers. |
| **conditions.category.all** | No | String |N/A | Conditions for all categories. |
| **conditions.category.category_key** | No | String |N/A |Conditions for categories and product category key identifiers.  |
| **conditions.cms_page.all** | No | String |N/A | Conditions for all CMS pages. |
| **conditions.cms_page.page_key** | No | String |N/A | Conditions for Page key identifiers and CMS pages. |
*N/A: Not applicable.

## Dependencies

This file has the following dependencies:
*   [cms_slot.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-slot.csv.html)
*   [cms_block.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-block.csv.html)

## Template File & Content Example
A template and an example of the *cms_slot_block.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [cms_slot_block.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/Template+cms_slot_block.csv) | CMS Slot Block .csv template file (empty content, contains headers only). |
| [cms_slot_block.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/cms_slot_block.csv) | CMS Slot Block .csv file containing a Demo Shop data sample. |

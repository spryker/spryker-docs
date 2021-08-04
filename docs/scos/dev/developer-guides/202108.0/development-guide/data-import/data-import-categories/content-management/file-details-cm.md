---
title: File details- cms_block_category.csv
originalLink: https://documentation.spryker.com/2021080/docs/file-details-cms-block-categorycsv
redirect_from:
  - /2021080/docs/file-details-cms-block-categorycsv
  - /2021080/docs/en/file-details-cms-block-categorycsv
---

This article contains content of the **cms_block_category.csv** file to configure CMS Block Category information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **block_key** | Yes | String |N/A* |  Identifier key of the Block.|
| **category_key** | Yes | String |N/A | Identifier key of the category. |
| **category_template_name** | Yes | String |N/A | Name of the category template. |
| **cms_block_category_position_name** | No | String |N/A | Name of the CMS block category position. |
*N/A: Not applicable.

## Dependencies

This file has the following dependency:
*     [cms_block_category_position.csv](https://documentation.spryker.com/docs/file-details-cms-block-category-postioncsv) 

## Template File & Content Example
A template and an example of the *cms_block_category.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [cms_block_category.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/cms_block_category_template.csv) | CMS Block Category .csv template file (empty content, contains headers only). |
| [cms_block_category.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/cms_block_category.csv) | PCMS Block Category .csv file containing a Demo Shop data sample. |

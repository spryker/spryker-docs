---
title: File details- cms_block_store.csv
originalLink: https://documentation.spryker.com/v6/docs/file-details-cms-block-storecsv
redirect_from:
  - /v6/docs/file-details-cms-block-storecsv
  - /v6/docs/en/file-details-cms-block-storecsv
---

This article contains content of the **cms_block_store.csv** file to configure CMS Block Store information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **block_key** | Yes | String |N/A* | Key identifier of the block.  |
| **store_name** | Yes | String |N/A | Name of the store. |
*N/A: Not applicable.

## Dependencies

This file has the following dependencies:
*    [cms_block.csv](https://documentation.spryker.com/docs/file-details-cms-blockcsv)
*     *stores.php* configuration file of the demo shop PHP project

## Template File & Content Example
A template and an example of the *cms_block_store.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [cms_block_store.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/Template+cms_block_store.csv) | CMS Block Store .csv template file (empty content, contains headers only). |
| [cms_block_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/cms_block_store.csv) | CMS Block Store .csv file containing a Demo Shop data sample. |

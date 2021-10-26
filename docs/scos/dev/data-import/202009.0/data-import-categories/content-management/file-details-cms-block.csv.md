---
title: File details- cms_block.csv
last_updated: Aug 27, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v6/docs/file-details-cms-blockcsv
originalArticleId: 6669a263-b312-4281-8e88-347178aa971a
redirect_from:
  - /v6/docs/file-details-cms-blockcsv
  - /v6/docs/en/file-details-cms-blockcsv
---

This article contains content of the **cms_block.csv** file to configure [CMS Block](/docs/scos/user/features/{{page.version}}/cms-feature-overview/cms-blocks-overview.html) information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **block_key** | Yes | String |N/A* |Block key identifier  |
| **block_name** | Yes (*unique*) | String |Human-readable name. | Name of the block. |
| **template_name** | No | String |N/A | Alphabetical identifier of the slot. It will be shown in the Back Office. |
| **template_path** | No | String |Must be a valid path to a twig template. | Path to the Twig file template. |
| **active** | No | Boolean |<ul><li>Inactive = 0</li><li>Active = 1</li><li>If empty during the import, the block will be imported as inactive.</li></ul> | Indicates if the block is active or inactive. |
| **placeholder.title.{ANY_LOCALE_NAME}** ** <br>Example value: *placeholder.title.en_US* | No | String | N/A | Placeholder for block title, translated into the specified locale (US for our example). | 
| **placeholder.description.{ANY_LOCALE_NAME}**<br>Example value: *placeholder.description.en_US* | No | String | N/A | Placeholder for block description, translated into the specified locale (US for our example). |
| **placeholder.link.{ANY_LOCALE_NAME}**<br>Example value: *placeholder.link.en_US* | No | String | N/A | Placeholder for block link, translated into the specified locale (US for our example). |
| **placeholder.content.{ANY_LOCALE_NAME}**<br>Example value: *placeholder.content.en_US* | No | String | N/A | Placeholder for block content, translated into the specified locale (US for our example). |
*N/A: Not applicable.
** ANY_LOCALE_NAME: Locale date is dynamic in data importers. It means that ANY_LOCALE_NAME postifx can be changed, removed, and any number of columns with different locales can be added to the .csv files.

## Dependencies

This file has no dependencies.

## Template File & Content Example
A template and an example of the *cms_block.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [cms_block.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/Template+cms_block.csv) | CMS Block .csv template file (empty content, contains headers only). |
| [cms_block.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/cms_block.csv) | CMS Block .csv file containing a Demo Shop data sample. |

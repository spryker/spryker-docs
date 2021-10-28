---
title: File details- cms_template.csv
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-cms-templatecsv
originalArticleId: 6221a424-5513-496b-bbc6-56a59471a264
redirect_from:
  - /2021080/docs/file-details-cms-templatecsv
  - /2021080/docs/en/file-details-cms-templatecsv
  - /docs/file-details-cms-templatecsv
  - /docs/en/file-details-cms-templatecsv
---

This article contains content of the **cms_template.csv** file to configure [CMS Template](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/cms/howto-create-cms-templates.html#cms-page-template) information on your Spryker Demo Shop.

## Headers & Mandatory Fields
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **template_name** | Yes (*unique*) | String |N/A* | Name of the template. |
| **template_path** | Yes (*unique*) | String |Must be a valid path to a twig file template. | Path to the Twig file template. |
*N/A: Not applicable.

## Dependencies

This file has tno dependencies.

## Template File & Content Example
A template and an example of the *cms_template.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [cms_template.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/Template+cms_template.csv) | CMS Template .csv template file (empty content, contains headers only). |
| [cms_template.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/cms_template.csv) | CMS Template .csv file containing a Demo Shop data sample. |

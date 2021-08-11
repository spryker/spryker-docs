---
title: File details- cms_template.csv
originalLink: https://documentation.spryker.com/v6/docs/file-details-cms-templatecsv
redirect_from:
  - /v6/docs/file-details-cms-templatecsv
  - /v6/docs/en/file-details-cms-templatecsv
---

This article contains content of the **cms_template.csv** file to configure [CMS Template](https://documentation.spryker.com/docs/ht-create-cms-templates#cms-page-template) information on your Spryker Demo Shop.

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

---
title: File details- cms_slot_template.csv
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-cms-slot-templatecsv
originalArticleId: ce6ee377-92eb-4297-9a05-a188447f5865
redirect_from:
  - /2021080/docs/file-details-cms-slot-templatecsv
  - /2021080/docs/en/file-details-cms-slot-templatecsv
  - /docs/file-details-cms-slot-templatecsv
  - /docs/en/file-details-cms-slot-templatecsv
---

This article contains content of the **cms_slot_template.csv** file to configure  [CMS Slot Template](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/cms/howto-create-cms-templates.html#template-with-slots) information on your Spryker Demo Shop.

## Headers & Mandatory Fields
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **template_path** | Yes  | String |Must be a valid path to a twig template. | Path to the Twig file template. |
| **name** |  Yes  | String |Human-readable. | Alphabetical identifier of the slot. It will be shown in the Back Office. |
| **description** |  No  | String |N/A* | Description of the slot. It will be shown in the Back Office. |
*N/A: Not applicable.

## Dependencies

This file has no dependencies.

## Template File & Content Example
A template and an example of the *cms_slot_template.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [cms_slot_template.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/Template+cms_slot_template.csv) |  CMS Slot Template .csv template file (empty content, contains headers only). |
| [cms_slot_template.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/cms_slot_template.csv) |  CMS Slot Template .csv file containing a Demo Shop data sample. |

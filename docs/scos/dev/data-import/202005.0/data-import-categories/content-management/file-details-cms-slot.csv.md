---
title: File details- cms_slot.csv
last_updated: Sep 14, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v5/docs/file-details-cms-slotcsv
originalArticleId: 2e523a11-600f-4b5e-8117-b1d04b54e626
redirect_from:
  - /v5/docs/file-details-cms-slotcsv
  - /v5/docs/en/file-details-cms-slotcsv
---

This article contains content of the **cms_slot.csv** file to configure [CMS Slot](/docs/scos/user/features/{{page.version}}/cms-feature-overview/templates-and-slots-overview.html) information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **template_path** | Yes | String |Must be a valid path to a twig template. | Path to the Twig file template. |
| **slot_key** | Yes (*unique*) | String |N/A | Identifier of the slot that is used by slot widget when rendering the content of this slot |
| **content_provider** | Yes | String |Must be a valid type of content provider. | Defines the source of content of this slot. |
| **name** | Yes | String |N/A | Alphabetical identifier of the slot. It will be shown in the Back Office. |
| **description** | Yes | String |N/A | Description of the slot. It will be shown in the Back Office. |
| **is_active** | No | Boolean |<ul><li>Inactive = 0</li><li>Active = 1</li><li>If empty during the import, the slots will be imported as inactive.</li> | Indicates if the slot is active or inactive.<br>If the slot is inactive, it is not rendered in the Storefront by the slot widget. |

*N/A: Not applicable.

## Dependencies

This file has no dependencies.

## Template File & Content Example
A template and an example of the *cms_slot.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [cms_slot.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/Template+cms_slot.csv) | CMS Slot .csv template file (empty content, contains headers only). |
| [cms_slot.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/cms_slot.csv) | CMS Slot file containing a Demo Shop data sample. |

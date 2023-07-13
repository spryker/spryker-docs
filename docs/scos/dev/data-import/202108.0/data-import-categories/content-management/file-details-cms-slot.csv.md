---
title: File details - cms_slot.csv
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-cms-slotcsv
originalArticleId: 724be566-e4d4-4037-b242-a933fb78a42e
redirect_from:
  - /2021080/docs/file-details-cms-slotcsv
  - /2021080/docs/en/file-details-cms-slotcsv
  - /docs/file-details-cms-slotcsv
  - /docs/en/file-details-cms-slotcsv
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
---

This document describes the `cms_slot.csv` file to configure [CMS Slot](/docs/scos/user/features/{{page.version}}/cms-feature-overview/templates-and-slots-overview.html) information in your Spryker Demo Shop.

To import the file, run:

```bash
data:import:cms-slot
```

## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| template_path | &check; | String |Must be a valid path to a twig template. | Path to the Twig file template. |
| slot_key | &check; | String | Must be unique. | Identifier of the slot that is used by slot widget when rendering the content of this slot |
| content_provider | &check; | String |Must be a valid type of content provider. | Defines the source of content of this slot. |
| name | &check; | String |  | Alphabetical identifier of the slot. It will be shown in the Back Office. |
| description | &check; | String |  | Description of the slot. It will be shown in the Back Office. |
| is_active |  | Boolean |<ul><li>Inactive = 0</li><li>Active = 1</li><li>If empty during the import, the slots will be imported as inactive.</li></ul> | Indicates if the slot is active or inactive.<br>If the slot is inactive, it is not rendered in the Storefront by the slot widget. |

## Import file dependencies

This file has no dependencies.

## Import template file and content example

Find the template and an example of the file below:

| FILE | DESCRIPTION |
| --- | --- |
| [cms_slot.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/Template+cms_slot.csv) | Exemplary import file with headers only. |
| [cms_slot.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/cms_slot.csv) | Exemplary import file with Demo Shop data. |

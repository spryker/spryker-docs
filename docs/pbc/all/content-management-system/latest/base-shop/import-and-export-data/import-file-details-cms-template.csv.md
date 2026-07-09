---
title: "Import file details: cms_template.csv"
description: Learn about the Spryker cms template csv file to configure cms template information in your Spryker shop.
last_updated: Jun 16, 2021
template: data-import-template
redirect_from:
  - /docs/scos/dev/data-import/201811.0/data-import-categories/content-management/file-details-cms-template.csv.html
  - /docs/scos/dev/data-import/202311.0/data-import-categories/content-management/file-details-cms-template.csv.html
  - /docs/pbc/all/content-management-system/202311.0/import-and-export-data/file-details-cms-template.csv.html
  - /docs/pbc/all/content-management-system/202311.0/base-shop/import-and-export-data/file-details-cms-template.csv.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/import-and-export-data/import-file-details-cms-template.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/latest/execution-order-of-data-importers.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


This document describes the `cms_template.csv` file to configure [CMS Template](/docs/pbc/all/content-management-system/latest/base-shop/tutorials-and-howtos/create-cms-templates.html#cms-page-template) information in your Spryker Demo Shop.



## Import file parameters



| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| template_name | &check; | String | Must be unique. | Name of the template. |
| template_path | &check; | String | Must be unique. Must be a valid path to a twig file template. | Path to the Twig file template. |


## Import template file and content example



| FILE | DESCRIPTION |
| --- | --- |
| [cms_template.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/Template+cms_template.csv) | Exemplary import file with headers only. |
| [cms_template.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/cms_template.csv) | Exemplary import file with Demo Shop data. |


## Import file command

```bash
data:import:cms-template
```

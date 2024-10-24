---
title: "Import file details: content_navigation.csv"
description: Description of the import file of the navigation content item.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-content-navigationcsv
originalArticleId: b553e414-141d-488c-8d1c-0a7980ff1211
redirect_from:
  - /docs/scos/dev/data-import/201811.0/data-import-categories/content-management/file-details-content-navigation.csv.html
  - /docs/scos/dev/data-import/201907.0/data-import-categories/content-management/file-details-content-navigation.csv.html
  - /docs/scos/dev/data-import/202311.0/data-import-categories/content-management/file-details-content-navigation.csv.html
  - /docs/pbc/all/content-management-system/202311.0/import-and-export-data/file-details-content-navigation.csv.html
  - /docs/pbc/all/content-management-system/202311.0/base-shop/import-and-export-data/file-details-content-navigation.csv.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/import-and-export-data/import-file-details-content-navigation.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `content_navigation.csv` file to configure [Content Navigation](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/navigation-feature-overview.html#navigation-as-content-item) information in your Spryker Demo Shop.


## Import file dependencies

 [navigation.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-navigation.csv.html).


## Import file parameters



| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| key | &check; | string | Must be unique. | Identifier of the content item. |
| name | &check; | string | Human-readable name. | Name of the content. |
| description |   | string |  | Description of the content. |
| navigation_key.default | &check; | string | Key of an existing navigation element. | Default unique identifier of a [navigation element](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-navigation.csv.html).  |
| navigation_key.en_US |  | string | Key of an existing navigation element. | Unique identifier of a [navigation element](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-navigation.csv.html) for the `en_US` [locale](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/datapayload-conversion/multi-language-setup.html). |
| title.de_DE |  | string | Key of an existing navigation element. | Unique identifier of a [navigation element](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-navigation.csv.html) for the `de_DE` [locale](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/datapayload-conversion/multi-language-setup.html). |



## Import template file and content example



| FILE | DESCRIPTION |
| --- | --- |
| [content_navigation.csv Template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/Template+content_navigation.csv) | Exemplary import file with headers only. |
| [content_navigation.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/content_navigation.csv) | Exemplary import file with Demo Shop data. |


## Import file command

```bash
data:import:content-navigation
```

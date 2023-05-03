---
title: File details - content_navigation.csv
description: Description of the import file of the navigation content item.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-content-navigationcsv
originalArticleId: b553e414-141d-488c-8d1c-0a7980ff1211
redirect_from:
  - /2021080/docs/file-details-content-navigationcsv
  - /2021080/docs/en/file-details-content-navigationcsv
  - /docs/file-details-content-navigationcsv
  - /docs/en/file-details-content-navigationcsv
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
---

This document describes the `content_navigation.csv` file to configure [Content Navigation](/docs/scos/user/features/{{page.version}}/content-items-feature-overview.html#content-item) information in your Spryker Demo Shop.

To import the file, run:

```bash
data:import:content-navigation
```

## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| key | &check; | string | Must be unique. | Identifier of the content item. |
| name | &check; | string | Human-readable name. | Name of the content. |
| description |   | string |  | Description of the content. |
| navigation_key.default | &check; | string | Key of an existing navigation element. | Default unique identifier of a [navigation element](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/navigation-setup/file-details-navigation.csv.html).  |
| navigation_key.en_US |  | string | Key of an existing navigation element. | Unique identifier of a [navigation element](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/navigation-setup/file-details-navigation.csv.html) for the `en_US` [locale](/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/multi-language-setup.html). |
| title.de_DE |  | string | Key of an existing navigation element. | Unique identifier of a [navigation element](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/navigation-setup/file-details-navigation.csv.html) for the `de_DE` [locale](/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/multi-language-setup.html). |

## Import file dependencies

This file has the following dependencies: [navigation.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/navigation-setup/file-details-navigation.csv.html).

## Import template file and content example

Find the template and an example of the file below:

| FILE | DESCRIPTION |
| --- | --- |
| [content_navigation.csv Template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/Template+content_navigation.csv) | Exemplary import file with headers only. |
| [content_navigation.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/content_navigation.csv) | Exemplary import file with Demo Shop data. |


 



	
 
 




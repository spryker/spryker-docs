---
title: File details- navigation.csv
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-navigationcsv
originalArticleId: eb25c5b9-7718-4328-b5a5-d93a6a0fb9b7
redirect_from:
  - /2021080/docs/file-details-navigationcsv
  - /2021080/docs/en/file-details-navigationcsv
  - /docs/file-details-navigationcsv
  - /docs/en/file-details-navigationcsv
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
---

This document describes the `navigation.csv` file to configure [Navigation](/docs/scos/user/features/{{page.version}}/navigation-feature-overview.html) information in your Spryker Demo Shop.

To import the file, run:

```bash
data:import:navigation
```

## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| key | &check; | String |  | Navigation entity key. |
| name | &check; | String |  | Navigation entity name. |
| is_active | &check; | Boolean |  | Defines if the navigation element is active. |

## Import file dependencies

This file has no dependencies.

## Import template file and content example

Find the template and an example of the file below:

| FILE | DESCRIPTION |
| --- | --- |
| [navigation.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Navigation+Setup/Template+navigation.csv) | Exemplary import file with headers only. |
| [navigation.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Navigation+Setup/navigation.csv) | Exemplary import file with Demo Shop data. |


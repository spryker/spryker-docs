---
title: File details - mime_type.csv
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-mime-typecsv
originalArticleId: cec9c3b6-fb1c-4d60-829c-cf37d9d54404
redirect_from:
  - /2021080/docs/file-details-mime-typecsv
  - /2021080/docs/en/file-details-mime-typecsv
  - /docs/file-details-mime-typecsv
  - /docs/en/file-details-mime-typecsv
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
---

This document describes the `mime_type.csv` file to configure Mime Type information in your Spryker Demo Shop.

{% info_block warningBox "Info" %}

This file does not exist by default on the project level.  It can be created in  the `data/import` folder in order to override the CSV file from the *file-manager-data-import* module: `vendor/spryker/file-manager-data-import/data/import/mime_type.csv`.

{% endinfo_block %}

To import the file, run:

```bash
data:import:mime-type
```

## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| name | &check; | String | Must be a valid MIME type. | Name of the MIME type. |
| is_allowed | &check; | Boolean |<ul><li>True = 1</li><li>False = 0</li></ul> | Indicates if the MIME type is allowed or not. |

## Import file dependencies

This file has no dependencies.

## Import template file and content example

Find the template and an example of the file below:

| FILE | DESCRIPTION |
| --- | --- |
| [mime_type.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Miscellaneous/Template+mime_type.csv) | Exemplary import file with headers only. |
| [mime_type.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Miscellaneous/mime_type.csv) | Exemplary import file with Demo Shop data. |

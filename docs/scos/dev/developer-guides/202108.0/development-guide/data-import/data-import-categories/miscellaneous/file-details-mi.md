---
title: File details- mime_type.csv
originalLink: https://documentation.spryker.com/2021080/docs/file-details-mime-typecsv
redirect_from:
  - /2021080/docs/file-details-mime-typecsv
  - /2021080/docs/en/file-details-mime-typecsv
---

This article contains content of the **mime_type.csv** file to configure Mime Type information on your Spryker Demo Shop.

{% info_block warningBox "Info" %}

This file does not exist by default on the project level.  It can be created in  the `data/import `folder in order to override the CSV file from the *file-manager-data-import* module: `vendor/spryker/file-manager-data-import/data/import/mime_type.csv`

{% endinfo_block %}

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **name** | Yes | String |Must be a valid MIME type. | Name of the MIME type. |
| **is_allowed** | Yes | Boolean |<ul><li>True = 1</li><li>False = 0</li> | Indicates if the MIME type is allowed or not. |
*N/A: Not applicable.

## Dependencies

This file hasno dependencies.

## Template File & Content Example
A template and an example of the *mime_type.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [mime_type.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Miscellaneous/Template+mime_type.csv) | Mime Type .csv template file (empty content, contains headers only). |
| [mime_type.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Miscellaneous/mime_type.csv) | Mime Type .csv file containing a Demo Shop data sample. |

---
title: File details- content_navigation.csv
description: Description of the import file of the navigation content item.
last_updated: Aug 27, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v6/docs/file-details-content-navigationcsv
originalArticleId: b9e1496a-6764-4abb-bdde-3de1d05df3c1
redirect_from:
  - /v6/docs/file-details-content-navigationcsv
  - /v6/docs/en/file-details-content-navigationcsv
---

This article contains content of the content_navigation.csv file to configure [Content Navigation](/docs/scos/user/features/{{page.version}}/content-items-feature-overview.html#content-item) information on your Spryker Demo Shop.

## Headers & Mandatory Fields
These are the header fields to be included in the .csv file:


|  | Field Name | Required | Type | Other Requirements | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | key | v (unique)| *string* | N/A | Unique identifier of the content item. |
| 2 | name | v | *string* | Human-readable name. | Name of the content. |
| 3 | description |   | *string* | N/A  | Description of the content. |
| 4 | navigation_key.default | v | *string* | Key of an existing navigation element. | Default unique identifier of a [navigation element](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/navigation-setup/file-details-navigation.csv.html).  |
| 5 | navigation_key.en_US |  | *string* | Key of an existing navigation element. | Unique identifier of a [navigation element](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/navigation-setup/file-details-navigation.csv.html) for the `en_US` [locale](/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/multi-language-setup.html). |
| 6 | title.de_DE |  | *string* | Key of an existing navigation element. | Unique identifier of a [navigation element](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/navigation-setup/file-details-navigation.csv.html) for the `de_DE` [locale](/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/multi-language-setup.html). |


N/A: Not applicable.

## Dependencies
This file has the following dependencies:

* [navigation.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/navigation-setup/file-details-navigation.csv.html) 

## Template File & Content Example
A template and an example **content_navigation.csv** file can be downloaded here:


| File(s) | Description |
| --- | --- |
| [content_navigation.csv Template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/Template+content_navigation.csv) | Content Navigation CSV template file (empty content, contains headers only). |
| [content_navigation.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/content_navigation.csv) | Content Navigation CSV file containing a Demo Shop data sample. |


 



	
 
 




---
title: File details- content_navigation.csv
description: Description of the import file of the navigation content item.
originalLink: https://documentation.spryker.com/v5/docs/file-details-content-navigationcsv
redirect_from:
  - /v5/docs/file-details-content-navigationcsv
  - /v5/docs/en/file-details-content-navigationcsv
---

This article contains content of the content_navigation.csv file to configure [Content Navigation](https://documentation.spryker.com/docs/en/content-items-feature-overview#content-item) information on your Spryker Demo Shop.

## Headers & Mandatory Fields
These are the header fields to be included in the .csv file:


|  | Field Name | Required | Type | Other Requirements | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | key | v (unique)| *string* | N/A | Unique identifier of the content item. |
| 2 | name | v | *string* | Human-readable name. | Name of the content. |
| 3 | description |   | *string* | N/A  | Description of the content. |
| 4 | navigation_key.default | v | *string* | Key of an existing navigation element. | Default unique identifier of a [navigation element](https://documentation.spryker.com/docs/en/file-details-navigationcsv).  |
| 5 | navigation_key.en_US |  | *string* | Key of an existing navigation element. | Unique identifier of a [navigation element](https://documentation.spryker.com/docs/en/file-details-navigationcsv) for the `en_US` [locale](https://documentation.spryker.com/docs/en/multi-language-setup). |
| 6 | title.de_DE |  | *string* | Key of an existing navigation element. | Unique identifier of a [navigation element](https://documentation.spryker.com/docs/en/file-details-navigationcsv) for the `de_DE` [locale](https://documentation.spryker.com/docs/en/multi-language-setup). |


N/A: Not applicable.

## Dependencies
This file has the following dependencies:

* [navigation.csv](https://documentation.spryker.com/docs/en/file-details-navigationcsv) 

## Template File & Content Example
A template and an example **content_navigation.csv** file can be downloaded here:


| File(s) | Description |
| --- | --- |
| [content_navigation.csv Template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/Template+content_navigation.csv) | Content Navigation CSV template file (empty content, contains headers only). |
| [content_navigation.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/content_navigation.csv) | Content Navigation CSV file containing a Demo Shop data sample. |


 



	
 
 




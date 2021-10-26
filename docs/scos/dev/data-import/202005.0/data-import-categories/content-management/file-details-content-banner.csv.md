---
title: File details- content_banner.csv
last_updated: Sep 14, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v5/docs/file-details-content-bannercsv
originalArticleId: fd73da08-dba6-4b81-a7cc-4aaa0f8eb6a3
redirect_from:
  - /v5/docs/file-details-content-bannercsv
  - /v5/docs/en/file-details-content-bannercsv
---

This article contains content of the **content_banner.csv** file to configure [Content Banner](/docs/scos/user/features/{{page.version}}/content-items-feature-overview.html#content-item) information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **key** | Yes (*unique*) | String |N/A* | Unique identifier of the content. |
| **name** | Yes | String |Human-readable name. | Name of the content. |
| **description** | Yes | String |N/A | Description of the content. |
| **title.default** | Yes | String |N/A |Default title of the content.  |
| **title.{ANY_LOCALE_NAME}** **<br>Example value: *title.en_US* | No | String | N/A | Title of the content, translated into the specified locale (US for our example). 
| **subtitle.default** | Yes | String |N/A | 	
Default subtitle of the content. |
| **subtitle.{ANY_LOCALE_NAME}**<br>Example value: *subtitle.en_US* | No | String | N/A | Subttitle of the content, translated into the specified locale (US for our example). 
| **image_url.default** | Yes | String |N/A | Default image URL of the content. |
| **image_url.{ANY_LOCALE_NAME}**<br>Example value: *image_url.en_US* | No | String | N/A | Image URL of the content, translated into the specified locale (US for our example). 
| **click_url.default** | Yes | String |N/A | Default click URL of the content. |
| **click_url.{ANY_LOCALE_NAME}**<br>Example value: *click_url.en_US* | No | String | N/A | Click URL of the content, translated into the specified locale (US for our example). 
| **alt_text.default** | Yes | String |N/A | Default alt text of the content. |
| **alt_text.{ANY_LOCALE_NAME}**<br>Example value: *alt_text.en_US* | No | String | N/A | Alt text of the content, translated into the specified locale (US for our example). 
*N/A: Not applicable.

## Dependencies

This file has the following dependencies:
*    [glossary.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-glossary.csv.html) 

## Template File & Content Example
A template and an example of the *content_banner.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [content_banner.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/Template+content_banner.csv) | Content Banner .csv template file (empty content, contains headers only). |
| [content_banner.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/content_banner.csv) | Content Banner .csv file containing a Demo Shop data sample. |


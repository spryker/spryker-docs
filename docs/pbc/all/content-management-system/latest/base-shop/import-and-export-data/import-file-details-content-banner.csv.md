---
title: "Import file details: content_banner.csv"
description: Learn about the Spryker CMS content banner csv file to configure CMS content banner information in your Spryker shop.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-content-bannercsv
originalArticleId: 4420043c-15fe-4485-8a7d-00d326d27d0f
redirect_from:
  - /docs/scos/dev/data-import/201811.0/data-import-categories/content-management/file-details-content-banner.csv.html
  - /docs/scos/dev/data-import/201907.0/data-import-categories/content-management/file-details-content-banner.csv.html
  - /docs/scos/dev/data-import/202311.0/data-import-categories/content-management/file-details-content-banner.csv.html
  - /docs/pbc/all/content-management-system/202311.0/import-and-export-data/file-details-content-banner.csv.html
  - /docs/pbc/all/content-management-system/202311.0/base-shop/import-and-export-data/file-details-content-banner.csv.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/import-and-export-data/import-file-details-content-banner.csv.html
  
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `content_banner.csv` file to configure [Content Banner](/docs/pbc/all/content-management-system/latest/base-shop/content-items-feature-overview.html) information in your Spryker Demo Shop.


## Import file dependencies

This file has the following dependency: [glossary.csv](/docs/pbc/all/miscellaneous/latest/import-and-export-data/import-file-details-glossary.csv.html).


## Import file parameters



| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| key | &check; | String | Must be unique. | Unique identifier of the content. |
| name | &check; | String |Human-readable name. | Name of the content. |
| description | &check; | String |  | Description of the content. |
| title.default | &check; | String |  |Default title of the content.  |
| title.{ANY_LOCALE_NAME}*<br>Example value: *title.en_US* |  | String |  | Title of the content, translated into the specified locale (US for our example). |
| subtitle.default | &check; | String |  | 	Default subtitle of the content. |
| subtitle.{ANY_LOCALE_NAME}*<br>Example value: *subtitle.en_US* |  | String |  | Subttitle of the content, translated into the specified locale (US for our example).|
| image_url.default | &check; | String |  | Default image URL of the content. |
| image_url.{ANY_LOCALE_NAME}*<br>Example value: *image_url.en_US* |  | String |  | Image URL of the content, translated into the specified locale (US for our example).|
| click_url.default | &check; | String |  | Default click URL of the content. |
| click_url.{ANY_LOCALE_NAME}*<br>Example value: *click_url.en_US* |  | String |  | Click URL of the content, translated into the specified locale (US for our example).|
| alt_text.default | &check; | String |  | Default alt text of the content. |
| alt_text.{ANY_LOCALE_NAME}*<br>Example value: *alt_text.en_US* |  | String |  | Alt text of the content, translated into the specified locale (US for our example).|

*ANY_LOCALE_NAME: Locale date is dynamic in data importers. It means that ANY_LOCALE_NAME postfix can be changed, removed, and any number of columns with different locales can be added to the CSV files.



## Import template file and content example



| FILE | DESCRIPTION |
| --- | --- |
| [content_banner.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/Template+content_banner.csv) | Exemplary import file with headers only. |
| [content_banner.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/content_banner.csv) | Exemplary import file with Demo Shop data. |


## Import file command

```bash
data:import:content-banner
```

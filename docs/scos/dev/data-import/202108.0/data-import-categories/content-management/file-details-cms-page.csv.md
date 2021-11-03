---
title: "File details: cms_page.csv"
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-cms-pagecsv
originalArticleId: 65418d11-4c73-4b42-94fb-8397c29eed33
redirect_from:
  - /2021080/docs/file-details-cms-pagecsv
  - /2021080/docs/en/file-details-cms-pagecsv
  - /docs/file-details-cms-pagecsv
  - /docs/en/file-details-cms-pagecsv
---

This article contains content of the **cms_page.csv** file to configure [CMS Page](/docs/scos/user/features/{{page.version}}/cms-feature-overview/cms-pages-overview.html) information on your Spryker Demo Shop.

## Headers & Mandatory Fields
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **template_name** | Yes | String |N/A* | Name of the page template. |
| **is_searchable** | No | Boolean |Searchable = True = 1<br>Not searchable = False = 0 | Indicates if the page is searchable or not. |
| **is_active** | No | Boolean |Active = True = 1<br>Inactive = False = 0 | Indicates if the page is active or not. |
| **publish** | No | Boolean |Published = True = 1<br>Inactive = False = 0 | Indicates if the page is published or not. |
| **page_key** | Yes (*unique*) | String |N/A | Identifier of the page. |
| **url.{ANY_LOCALE_NAME}** **<br>Example value: *url.en_US* | No | String |N/A |  Page URL, translated into the specified locale (US for our example). |
| **name.{ANY_LOCALE_NAME}**<br>Example value: *name.en_US* | No | String |N/A |  Page name, translated into the specified locale (US for our example). |
| **meta_title.{ANY_LOCALE_NAME}**<br>Example value: *meta_title.en_US* | No | String |N/A |  Page meta data title, translated into the specified locale (US for our example). |
| **meta_keywords.{ANY_LOCALE_NAME}**<br>Example value: *meta_keywords.en_US* | No | String |N/A | Page meta data keywords, translated into the specified locale (US for our example). |
| **meta_description.{ANY_LOCALE_NAME}**<br>Example value: *meta_description.en_US* | No | String |N/A | Page meta data description, translated into the specified locale (US for our example). |
| **placeholder.title.{ANY_LOCALE_NAME}**<br>Example value: *placeholder.title.en_US* | No | String |N/A | Page placeholder to the title, translated into the specified locale (US for our example). |
| **placeholder.content.{ANY_LOCALE_NAME}**<br>Example value: *placeholder.content.en_US* | No | String |N/A | Page placeholder to the content, translated into the specified locale (US for our example). |
*N/A: Not applicable.
** ANY_LOCALE_NAME: Locale date is dynamic in data importers. It means that ANY_LOCALE_NAME postifx can be changed, removed, and any number of columns with different locales can be added to the .csv files.

## Dependencies

This file has the following dependency:
*     [cms_template.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-template.csv.html)

## Template File & Content Example
A template and an example of the *cms_page.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [cms_page.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/Template+cms_page.csv) | CMS Page .csv template file (empty content, contains headers only). |
| [cms_page.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Content+Management/cms_page.csv) | CMS Page .csv file containing a Demo Shop data sample. |

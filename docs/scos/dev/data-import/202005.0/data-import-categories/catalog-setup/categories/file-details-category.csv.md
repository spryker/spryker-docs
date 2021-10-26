---
title: File details- category.csv
last_updated: Sep 14, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v5/docs/file-details-categorycsv
originalArticleId: 7f99a945-d7e0-4264-87b0-f109110b6416
redirect_from:
  - /v5/docs/file-details-categorycsv
  - /v5/docs/en/file-details-categorycsv
---

This article contains content of the **category.csv** file to configure [Category](/docs/scos/user/features/{{page.version}}/category-management-feature-overview.html) information on your Spryker Demo Shop.

## Headers & Mandatory Fields 

{% info_block infoBox "Info" %}

*ANY_LOCALE_NAME: Locale data is dynamic in data importers. It means that ANY_LOCALE_NAME postifx can be changed, removed, and any number of columns with different locales can be added to the .csv files. For the fields below, it could be replaced by 2 sets of fields: one for *de_DE* and another for *en_US* 
**N/A: Not applicable.

{% endinfo_block %}

These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **category_key** | Yes (*unique*) | String |This value can set as `parent_category_key` for the lines below, allowing multi-level relations | Category key identifier. |
| **parent_category_key** | Yes | String | Must have an existing value if the category is not the "root" category.| Parent category key identifier. |
| **name.{ANY_LOCALE_NAME}***<br>Example value: *name.de_DE* | Yes (*unique*) | String | Name of categories in available locations. The set of these fields depends on available locations in some projects. | Category name in the specified location (DE for our exmaple). |
| **meta_title.{ANY_LOCALE_NAME}**<br>Example value: *meta_title.de_DE*  | No | String | N/A | Title in the specified location (DE for our example). |
| **meta_description.{ANY_LOCALE_NAME}**<br>Example value: *meta_description.de_DE* | No | String | N/A | Description in the specified location (DE for our example). |
| **meta_keywords.{ANY_LOCALE_NAME}**<br>Example value: *meta_keywords.de_DE* | No | String | N/A | Keywords in the specified location (DE for our example). |
| **is_active** | No | Boolean | True (1), if it is active. False (0), if it is not active.| Indicates if the category is active or not. |
| **is_in_menu** | No | Boolean |True (1), if it is in the menu. False (0), if it is not in the menu. | Indicates if the category is in the menu or not. |
| **is_clickable** | No | Boolean |True (1), if it is clickable. False (0), if it is not clickable. | Indicates if the category is clickable or not. |
| **is_searchable** | No | Boolean | True (1), if it is searchable. False (0), if it is not searchable.| Indicates if it is a searchable category in the menu or not. |
| **is_root** | No | Boolean |True (1), if it is root. False (0), if it is not root. | Indicates if it is a root category or not. |
| **is_main** | No | Boolean | True (1), if it is main. False (0), if it is not main.|Indicates if it is a main category or not.  |
| **node_order** | No | Integer | N/A| Order of the category node. |
| **template_name** | No | String |N/A | Template name of the category. |
| **category_image_name.{ANY_LOCALE_NAME}** | No | String |N/A | Name of the image for the category in the locale. |


## Dependencies

This file has the following dependency:
*    [category_template.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/categories/file-details-category-template.csv.html)

## Template File & Content Example
A template and an example of the *category.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [category.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Categories/category_template.csv) | Category .csv template file (empty content, contains headers only). |
| [category.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Categories/category.csv) | Category .csv file containing a Demo Shop data sample. |


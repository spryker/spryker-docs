---
title: "Import file details: category.csv"
description: Learn how to configure categories using the Category csv file in your Spryker Cloud Commerce OS Project.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-categorycsv
originalArticleId: 2113cd52-83fb-4c24-9534-6208c370b55a
redirect_from:
  - /docs/scos/dev/data-import/201811.0/data-import-categories/catalog-setup/categories/file-details-category.csv.html
  - /docs/scos/dev/data-import/201903.0/data-import-categories/catalog-setup/categories/file-details-category.csv.html
  - /docs/scos/dev/data-import/201907.0/data-import-categories/catalog-setup/categories/file-details-category.csv.html
  - /docs/scos/dev/data-import/202311.0/data-import-categories/catalog-setup/categories/file-details-category.csv.html
  - /docs/pbc/all/product-information-management/202311.0/base-shop/import-and-export-data/categories-data-import/file-details-category.csv.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/import-and-export-data/categories-data-import/import-file-details-category.csv.html
  - /docs/scos/dev/data-import/202009.0/data-import-categories/catalog-setup/categories/file-details-category.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `category.csv` file to configure [categories](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/category-management-feature-overview.html) in your Spryker shop.

## Import file dependencies

[category_template.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/categories-data-import/import-file-details-category-template.csv.html).

## Import file parameters

| PARAMETER                                                                     | REQUIRED | TYPE    | REQUIREMENTS OR COMMENTS                                                                                                    | DESCRIPTION                                                   |
| ----------------------------------------------------------------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| category_key                                                                  | &check;  | String  | Unique. This value can set as `parent_category_key` for the lines below, allowing multi-level relations                     | Category key identifier.                                      |
| parent_category_key                                                           | &check;  | String  | Must have an existing value if the category is not the "root" category.                                                     | Parent category key identifier.                               |
| name.{ANY_LOCALE_NAME}*<br>Example value: *name.de_DE*                        | &check;  | String  | Unique. Name of categories in available locations. The set of these fields depends on available locations in some projects. | Category name in the specified location (DE for our example). |
| meta_title.{ANY_LOCALE_NAME}<br>Example value: *meta_title.de_DE*             |          | String  |                                                                                                                             | Title in the specified location (DE for our example).         |
| meta_description.{ANY_LOCALE_NAME}<br>Example value: *meta_description.de_DE* |          | String  |                                                                                                                             | Description in the specified location (DE for our example).   |
| meta_keywords.{ANY_LOCALE_NAME}<br>Example value: *meta_keywords.de_DE*       |          | String  |                                                                                                                             | Keywords in the specified location (DE for our example).      |
| is_active                                                                     |          | Boolean | True (1), if it is active. False (0), if it is not active.                                                                  | Indicates if the category is active or not.                   |
| is_in_menu                                                                    |          | Boolean | True (1), if it is in the menu. False (0), if it is not in the menu.                                                        | Indicates if the category is in the menu or not.              |
| is_clickable                                                                  |          | Boolean | True (1), if it is clickable. False (0), if it is not clickable.                                                            | Indicates if the category is clickable or not.                |
| is_searchable                                                                 |          | Boolean | True (1), if it is searchable. False (0), if it is not searchable.                                                          | Indicates if it is a searchable category in the menu or not.  |
| is_root                                                                       |          | Boolean | True (1), if it is root. False (0), if it is not root.                                                                      | Indicates if it is a root category or not.                    |
| is_main                                                                       |          | Boolean | True (1), if it is main. False (0), if it is not main.                                                                      | Indicates if it is a main category or not.                    |
| node_order                                                                    |          | Integer |                                                                                                                             | Order of the category node.                                   |
| template_name                                                                 |          | String  |                                                                                                                             | Template name of the category.                                |
| category_image_name.{ANY_LOCALE_NAME}                                         |          | String  |                                                                                                                             | Name of the image for the category in the locale.             |

{% info_block infoBox "Info" %}

*ANY_LOCALE_NAME: Locale data is dynamic in data importers. It means that ANY_LOCALE_NAME postfix can be changed, removed, and any number of columns with different locales can be added to the CSV files. For the fields below, it could be replaced by 2 sets of fields: one for *de_DE* and another for *en_US*

{% endinfo_block %}



## Import template file and content example

| FILE                                                                                                                                                                                                                    | DESCRIPTION                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| [category.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Categories/category_template.csv) | Exemplary import file with headers only.   |
| [category.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Categories/category.csv)                   | Exemplary import file with Demo Shop data. |


## Import command

```bash
data:import:category
```

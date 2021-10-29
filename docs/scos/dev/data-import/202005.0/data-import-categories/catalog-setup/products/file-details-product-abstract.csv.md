---
title: File details- product_abstract.csv
last_updated: Sep 14, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v5/docs/file-details-product-abstractcsv
originalArticleId: 3c2ff3b4-c66d-4fad-abb1-4adec332d7e1
redirect_from:
  - /v5/docs/file-details-product-abstractcsv
  - /v5/docs/en/file-details-product-abstractcsv
---

This article contains content of the **product_abstract.csv** file to configure [Abstract Product](/docs/scos/user/features/{{page.version}}/product-feature-overview/product-feature-overview.html) information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **category_key** | Yes | String |N/A* | Identifier of category key name. |
| **category_product_order** | No | Integer |N/A | Order of the product presentation inside a category. |
| **abstract_sku** | Yes (*unique*) | String |N/A | SKU identifier of the abstract product. |
| **name.{ANY_LOCALE_NAME}***<br>Example value: *name.en_US* | Yes | String |N/A | Name of the product in the specified location (US for our example). |
| **url.{ANY_LOCALE_NAME}**<br>Example value: *value_1.en_US* | Yes | String |N/A | URL page of the product image in the specified location (US for our example). |
| **is_featured** | No | String |If it is empty, will be “False”. <br>False = 0<br>True = 1 | Indicates if it is a featured product. |
| **attribute_key_{NUMBER}***<br>Example value: *attribute_key_1*<br> | Yes (if this attribute is defined) | String |N/A | Product attribute key for the attribute. |
| **value_{NUMBER}**<br>Example value: *value_1*<br>|Yes (if this attribute is defined) | String |N/A | Product value for the attribute. |
| **attribute_key_{NUMBER}.{ANY_LOCALE_NAME}**<br>Example value: *attribute_key_1.en_US*<br> | No | String |N/A | Product attribute key, for the first attribute, translated in the specified locale (US for our example). |
| **value_{NUMBER}.{ANY_LOCALE_NAME}**<br>Example value: *value_1.en_US*<br>|No | String |N/A | Product value for the attribute, translated in the specified locale (US for our example). |
| **color_code** | No | String |N/A | Product colour code. |
| **description.{ANY_LOCALE_NAME}**<br>Example value: *description.en_US*  | No | String |N/A | Product description, translated in the specified locale (US for our example). |
| **icecat_pdp_url** | No | String |N/A | Icecat product catalogue URL service. |
| **tax_set_name** | No | String |N/A | Name of the tax set. |
| **meta_title.{ANY_LOCALE_NAME}**<br>Example value: *meta_title.en_US* | No | String |N/A | Meta title of the product in the specified locale (US for our example). |
| **meta_keywords.{ANY_LOCALE_NAME}**<br>Example value: *meta_keywords.en_US* | No | String |N/A | Meta keywords of the product in the specified locale (US for our example). |
| **meta_description.{ANY_LOCALE_NAME}**<br>Example value: *meta_description.en_US* | No | String |N/A | Meta description of the product in the specified locale (US for our example). |
| **icecat_license** | No | String |N/A | Icecat product catalogue licence code. |
| **new_from** | No | Date |N/A | To be considered a new product from this presented date. |
| **new_to** | No | String |N/A | To be considered a new product until this presented date. |
*N/A: Not applicable.
** ANY_LOCALE_NAME: Locale date is dynamic in data importers. It means that ANY_LOCALE_NAME postifx can be changed, removed, and any number of columns with different locales can be added to the .csv files.
** NUMBER: Any number of  the attribute-value column pair can be added

## Dependencies

This file has the following dependencies:

* [ category.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/categories/file-details-category.csv.html)
* [glossary.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-glossary.csv.html)
* [tax.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-tax.csv.html)

## Recommendations & Other Information
For each attribute, where N is a number starting in 1, it is mandatory to have both fields:

* `attribute_key_N`
* `value_N`

The amount of attributes is not limited. 

## Template File & Content Example
A template and an example of the *product_abstract.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [product_abstract.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/Template+product_abstract.csv) | Product Abstract .csv template file (empty content, contains headers only). |
| [product_abstract.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/product_abstract.csv) | Product Abstract .csv file containing a Demo Shop data sample. |

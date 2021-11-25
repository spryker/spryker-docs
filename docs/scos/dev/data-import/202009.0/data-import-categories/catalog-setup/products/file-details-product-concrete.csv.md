---
title: File details- product_concrete.csv
last_updated: Aug 27, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v6/docs/file-details-product-concretecsv
originalArticleId: 26867bb7-b4f9-4b66-9c65-7624d9004110
redirect_from:
  - /v6/docs/file-details-product-concretecsv
  - /v6/docs/en/file-details-product-concretecsv
---

This article contains content of the **product_concrete.csv** file to configure [Concrete Product](/docs/scos/user/features/{{page.version}}/product-feature-overview/product-feature-overview.html) information on your Spryker Demo Shop.

## Headers and Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **abstract_sku** | Yes | String |N/A | Name of the product, in locale US. |
| **old_sku** | No | String |N/A | Old SKU identifier. |
| **concrete_sku** | Yes (*unique*) | String |N/A | SKU identifier of the concrete product. |
| **name.{ANY_LOCALE_NAME}***<br>Example value: *name.en_US* | Yes | String |N/A | Name of the product in the specified location (US for our example). |
| **attribute_key_{NUMBER}***<br>Example value: *attribute_key_1*<br> | Yes (if this attribute is defined) | String |N/A | Product attribute key for the attribute. |
| **value_{NUMBER}**<br>Example value: *value_1*<br>|Yes (if this attribute is defined) | String |N/A | Product value for the attribute. |
| **attribute_key_{NUMBER}.{ANY_LOCALE_NAME}**<br>Example value: *attribute_key_1.en_US*<br> | No | String |N/A | Product attribute key, for the first attribute, translated in the specified locale (US for our example). |
| **value_{NUMBER}.{ANY_LOCALE_NAME}**<br>Example value: *value_1.en_US*<br>|No | String |N/A | Product value for the attribute, translated in the specified locale (US for our example). |
| **icecat_pdp_url** | No | String |N/A | Icecat product catalogue URL service. |
| **description.{ANY_LOCALE_NAME}**<br>Example value: *description.en_US*  | No | String |N/A | Product description, translated in the specified locale (US for our example). |
| **is_searchable.{ANY_LOCALE_NAME}**<br>Example value: *is_searchable.en_US*| No | Integer |N/A | Indicates if the product is searchable in the specified locale (US for our example). |
| **icecat_license** | No | String |N/A | Icecat product catalogue licence code. |
| **bundled** | No | String |N/A | Products SKUs separated by comas, that are part of the bundle. |
| **is_quantity_splittable** | No | Boolean |If it is empty, will be *False*.<br>False = 0<br>True = 1 | To be considered a new product until this presented date. |
*N/A: Not applicable.
** ANY_LOCALE_NAME: Locale date is dynamic in data importers. It means that ANY_LOCALE_NAME postifx can be changed, removed, and any number of columns with different locales can be added to the .csv files.
** NUMBER: Any number of  the attribute-value column pair can be added

## Dependencies

This file has the following dependencies:

*[ product_abstract.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html)

## Recommendations & Other Information
Every concrete product is linked to an abstract one via the `abstract_sku` field.

## Template File & Content Example
A template and an example of the *product_concrete.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [product_concrete.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/Template+product_concrete.csv) | Product Abstract .csv template file (empty content, contains headers only). |
| [product_concrete.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/product_concrete.csv) | Product Abstract .csv file containing a Demo Shop data sample. |

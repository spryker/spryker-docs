---
title: File details- product_management_attribute.csv
last_updated: Sep 14, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v5/docs/file-details-product-management-attributecsv
originalArticleId: 80fbd522-ca60-4be6-84a7-ba20e7a1479a
redirect_from:
  - /v5/docs/file-details-product-management-attributecsv
  - /v5/docs/en/file-details-product-management-attributecsv
---

This article contains content of the **product_management_attribute.csv** file to configure [Product Attribute](/docs/scos/user/features/{{page.version}}/product-feature-overview/product-attributes-overview.html) information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **key** | Yes | String |N/A* | Key identifier of the product attribute. |
| **input_type** | Yes | String |Value from a pre-defined list. | Input type of the product attribute, for example, text, number, select, etc. |
| **allow_input** | No | String |*yes/no* field. Will be set to *no* if an empty value is provided. |Indicates if custom values can be entered in this product attribute.  |
| **is_multiple** | No | String |*yes/no* field. Will be set to *no* if an empty value is provided. |Indicates if the attribute can have multiple values.  |
| **values** | No | String |N/A | Selectable values. Field *values* is a string defining possible attribute values, separated by commas. For example, "16 GB, 32 GB, 64 GB, 128 GB" means that attribute can accept values "16 GB", "32 GB", "64 GB", "128 GB". |
| **key_translation.en_US** | No | String |N/A | Translation attribute key to the locale US language. |
| **key_translation.de_DE** | No | String |N/A | Translation attribute key to the locale DE language. |
| **value_translations.en_US** | No | String |N/A | Translation attribute value to the locale US language. |
| **value_translations.de_DE** | No | String |N/A | Translation attribute value to the locale DE language. |

*N/A: Not applicable.

## Dependencies

This file has the following dependencies:

* [ product_attribute_key.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-attribute-key.csv.html)
* [glossary.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-glossary.csv.html)

## Template File & Content Example
A template and an example of the *product_management_attribute.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [product_management_attribute.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/Template+product_management_attribute.csv) | Product Management Attribute .csv template file (empty content, contains headers only). |
| [product_management_attribute.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/product_management_attribute.csv) | Product Management Attribute .csv file containing a Demo Shop data sample. |

---
title: File details- product_label.csv
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-labelcsv
originalArticleId: f75edaed-eaa8-428d-9edc-84f03910a815
redirect_from:
  - /2021080/docs/file-details-product-labelcsv
  - /2021080/docs/en/file-details-product-labelcsv
  - /docs/file-details-product-labelcsv
  - /docs/en/file-details-product-labelcsv
---

This article contains content of the **product_label.csv** file to configure [Product Label](/docs/scos/user/features/{{page.version}}/product-labels-feature-overview.html) information on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **name** | Yes | String |N/A* | Name of the label. |
| **is_active** | No | Boolean |N/A | Indicates if the label is active. |
| **is_dynamic** | No | Boolean |N/A | Indicates if the label is dynamic. |
| **is_exclusive** | No | Boolean |N/A | Indicates if the label is exclusive. |
| **front_end_reference** | No | String |N/A | Front end reference of the label. |
| **valid_from** | No | Date |N/A |	Label valid from this date. |
| **valid_to** | No | Date |N/A | Label valid to this date. |
| **name.{ANY_LOCALE_NAME}** **<br>Example value: *name.en_US* | No | String |N/A | Name of the label, in the available locale (US for our example). |
| **product_abstract_skus** | No | String |N/A* | List of comma-separated product abstract SKUs.  |
*N/A: Not applicable.
**ANY_LOCALE_NAME: Locale date is dynamic in data importers. It means that ANY_LOCALE_NAME postifx can be changed, removed, and any number of columns with different locales can be added to the .csv files.

## Dependencies

This file has the following dependency:
*    [product_abstract.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html)

## Template File & Content Example
A template and an example of the *product_label.csv*  file can be downloaded here:

| File | Description |
| --- | --- |
| [product_label.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/Template+product_label.csv) | Product Label .csv template file (empty content, contains headers only). |
| [product_label.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/product_label.csv) | Product Label .csv file containing a Demo Shop data sample. |

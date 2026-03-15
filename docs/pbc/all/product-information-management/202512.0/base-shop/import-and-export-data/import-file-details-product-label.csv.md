---
title: "Import file details: product_label.csv"
description: Learn how you can import data for product labels using the product label csv file within your Spryker Cloud Commerce OS project.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-product-labelcsv
originalArticleId: f75edaed-eaa8-428d-9edc-84f03910a815
redirect_from:
  - /docs/scos/dev/data-import/202311.0/data-import-categories/merchandising-setup/product-merchandising/file-details-product-label.csv.html
  - /docs/pbc/all/product-information-management/202311.0/base-shop/import-and-export-data/file-details-product-label.csv.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/import-and-export-data/import-file-details-product-label.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/latest/execution-order-of-data-importers.html
---

This document describes the `product_label.csv` file to configure [Product Label](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-labels-feature-overview.html) information in your Spryker Demo Shop.

## Import file dependencies

[product_abstract.csv](/docs/pbc/all/product-information-management/latest/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html).

## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| name | &check; | String |  | Name of the label. |
| is_active |  | Boolean |  | Indicates if the label is active. |
| is_dynamic |  | Boolean |  | Indicates if the label is dynamic. |
| is_exclusive |  | Boolean |  | Indicates if the label is exclusive. |
| front_end_reference |  | String |  | Front end reference of the label. |
| valid_from |  | Date |  |	Label valid from this date. |
| valid_to |  | Date |  | Label valid to this date. |
| name.{ANY_LOCALE_NAME}*<br>Example value: *name.en_US* |  | String |  | Name of the label, in the available locale (US for our example). |
| product_abstract_skus |  | String |  | List of comma-separated product abstract SKUs.  |

*ANY_LOCALE_NAME: Locale date is dynamic in data importers. It means that ANY_LOCALE_NAME postfix can be changed, removed, and any number of columns with different locales can be added to the CSV files.

## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [product_label.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/Template+product_label.csv) | Exemplary import file with headers only. |
| [product_label.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Merchandising+Setup/Product+Merchandising/product_label.csv) | Exemplary import file with headers only. |

## Import command

```bash
data:import:product-label
```

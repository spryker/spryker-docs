---
title: "Import file details: shipment_price.csv"
description: Learn how to import shipment price data using the shipment-price.csv file in Spryker, optimizing carrier management and ensuring accurate shipping cost integration.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-shipment-pricecsv
originalArticleId: 5a755c1f-20a7-42d0-a1ac-30f4b8586351
redirect_from:
  - /docs/scos/dev/data-import/202311.0/data-import-categories/commerce-setup/file-details-shipment-price.csv.html  
  - /docs/pbc/all/carrier-management/202311.0/import-and-export-data/file-details-shipment-price.csv.html
  - /docs/pbc/all/carrier-management/202311.0/base-shop/import-and-export-data/file-details-shipment-price.csv.html
  - /docs/pbc/all/carrier-management/202204.0/base-shop/import-and-export-data/import-file-details-shipment-price.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/latest/execution-order-of-data-importers.html
---

This document describes the `shipment_price.csv` file to configure the [Shipment Price](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/shipment-feature-overview.html) information in your Spryker Demo Shop.

To import the file, run:

```bash
data:import:shipment-price
```

## Import file parameters



| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| shipment_method_key | &check; | String  | Value previously imported already by its data importer using the [shipment.csv](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/import-and-export-data/import-file-details-shipment.csv.html) file.| Identifier of the shipment method. |
| store | &check; | String | Value previously defined in the *stores.php* project configuration. | Name of the store. |
| currency | &check; | String | Value previously imported already by its data importer using the [currency.csv](/docs/pbc/all/price-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-currency.csv.html) file. | Currency ISO code. |
| value_net | No |Integer | Empty price values will be imported as zeros. | Net value of the shipment cost. |
| value_gross | No | String | Empty price values will be imported as zeros. | Gross value of the shipment cost.  |

## Import file dependencies



- [shipment.csv](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/import-and-export-data/import-file-details-shipment.csv.html)
- [currency.csv](/docs/pbc/all/price-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-currency.csv.html)
- *stores.ph*p configuration file of the demo shop PHP project

## Additional information

The field *value* must be an *integer* as it's the internal format to store money (currency) in the Spryker Demo Shop. Float values get converted into integer through multiplying by 100. For example, if the shipment cost is 5.50 EUR, the value in the CSV file should be 550.

Fields `shipment_method_key`, `store` and `currency` are mandatory, and must be valid (imported already from existing database values, or created manually using the precedent CSV files: `shipment_method.csv` and `currency.csv` and `stores.php` configuration project file). Empty value fields are imported as zeros.

## Import template file and content example



| FILE | DESCRIPTION |
| --- | --- |
| [shipment_price.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+shipment_price.csv) | Exemplary import file with headers only. |
| [shipment_price.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/shipment_price.csv) | Exemplary import file with Demo Shop data. |

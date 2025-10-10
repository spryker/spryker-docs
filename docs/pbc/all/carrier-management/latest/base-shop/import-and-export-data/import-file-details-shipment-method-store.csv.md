---
title: "Import file details: shipment_method_store.csv"
description: Learn how to import shipment method store data using the shipment-method-store.csv file in Spryker, streamlining your carrier management processes
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-shipment-method-storecsv
originalArticleId: 0cfd5942-817e-4ad6-bb79-4d854ca9979b
redirect_from:
  - /docs/scos/dev/data-import/202204.0/data-import-categories/commerce-setup/file-details-shipment-method-store.csv.html
  - /docs/scos/dev/data-import/202311.0/data-import-categories/commerce-setup/file-details-shipment-method-store.csv.html
  - /docs/pbc/all/carrier-management/202311.0/import-and-export-data/file-details-shipment-method-store.csv.html
  - /docs/pbc/all/carrier-management/202311.0/base-shop/import-and-export-data/file-details-shipment-method-store.csv.html
  - /docs/pbc/all/carrier-management/202204.0/base-shop/import-and-export-data/import-file-details-shipment-method-store.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/latest/execution-order-of-data-importers.html
---

This document describes the `shipment_method_store.csv` file to configure [Shipment Method](/docs/pbc/all/carrier-management/latest/base-shop/shipment-feature-overview.html) and Store relation to be added to your Spryker Demo Shop.

The `shipment_method_store.csv` file contains the links between each shipment method used by each existing store.

To import the file, run:

```bash
data:import:shipment-method-store
```

## Import file parameters



| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| shipment_method_key | &check; | String | Can be imported from the content that was loaded using the [shipment.csv](/docs/pbc/all/carrier-management/latest/base-shop/import-and-export-data/import-file-details-shipment.csv.html) file.| Identifier of the shipment method. |
| store | &check; | String | Must be one of the existing store names. The store names are initially already defined in the *stores.php* configuration file. | Name of the store. |

## Import file dependencies



- [shipment.csv](/docs/pbc/all/carrier-management/latest/base-shop/import-and-export-data/import-file-details-shipment.csv.html)
- *stores.php* The configuration file of the Spryker Demo Shop PHP project

## Import template file and content example



| FILE | DESCRIPTION |
| --- | --- |
| [shipment_method_store.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+shipment_method_store.csv) | Exemplary import file with headers only. |
| [shipment_method_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/shipment_method_store.csv) | Exemplary import file with Demo Shop data. |

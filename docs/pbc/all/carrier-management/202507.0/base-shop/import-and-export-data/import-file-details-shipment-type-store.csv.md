---
title: "Import file details: shipment_type_store.csv"
description: This document describes the shipment_type_store.csv file to configure the shipment information in your Spryker Demo Shop.
template: data-import-template
redirect_from:
last_updated: May 23, 2023
redirect_From:
  - /docs/pbc/all/carrier-management/202311.0/base-shop/import-and-export-data/file-details-shipment-type-store.csv.html
---

This document describes the `shipment_type_store.csv` file to configure the [shipment method](/docs/pbc/all/carrier-management/base-shop/shipment-feature-overview.html) and store information in your Spryker Demo Shop.

## Import file dependencies

[`shipment_type.csv`](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-shipment-type.csv.html)

## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|---|---|---|---|---|
| shipment_type_key | &check; | string | | Key of the existing shipping type. |
| store_name | &check; | string | | Name of the existing store.  |

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`shipment_type_store.csv` template](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/carrier-management/base-shop/import-and-export-data/file-details-shipment-type-store.csv.md/template_shipment_type_store.csv) | Import file template with headers only. |
| [`shipment_type_store.csv`](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/carrier-management/base-shop/import-and-export-data/file-details-shipment-type-store.csv.md/shipment_type_store.csv) | Exemplary import file with the Demo Shop data. |

## Import file command

```bash
data:import:shipment-type-store
```

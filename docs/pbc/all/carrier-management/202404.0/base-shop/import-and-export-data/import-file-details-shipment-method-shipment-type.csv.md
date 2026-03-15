---
title: "Import file details: shipment_method_shipment_type.csv"
description: This document describes the shipment_method_shipment_type.csv file to configure the shipment information in your Spryker Demo Shop.
template: data-import-template
last_updated: May 23, 2023
redirect_from:
  - /docs/pbc/all/carrier-management/202311.0/base-shop/import-and-export-data/file-details-shipment-method-shipment-type.csv.html
  - /docs/pbc/all/carrier-management/202311.0/unified-commerce/import-and-export-data/import-file-details-shipment-type.csv.html
---

This document describes the `shipment_method_shipment_type.csv` file to configure the [shipment method](/docs/pbc/all/carrier-management/base-shop/shipment-feature-overview.html) and store information in your Spryker Demo Shop.

## Import file dependencies

* [`shipment.csv`](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-shipment.csv.html)
* [`shipment-type.csv`](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-shipment-type.csv.html)

## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|---|---|---|---|---|
| shipment_method_key | &check; | string | | Key of the existing shipping method. |
| shipment_type_key | &check; | string | | Key of the existing shipping type. |

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`shipment_method_shipment_type.csv` template](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/carrier-management/base-shop/import-and-export-data/file-details-shipment-method-shipment-type.csv.md/template_shipment_method_shipment_type.csv) | Import file template with headers only. |
| [`shipment_method_shipment_type.csv`](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/carrier-management/base-shop/import-and-export-data/file-details-shipment-method-shipment-type.csv.md/shipment_method_shipment_type.csv) | Exemplary import file with the Demo Shop data. |

## Import file command

```bash
data:import:shipment-method-shipment-type
```

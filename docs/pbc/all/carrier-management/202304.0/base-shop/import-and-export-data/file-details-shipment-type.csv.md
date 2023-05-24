---
title: File details - shipment_type.csv
description: This document describes the shipment_type.csv file to configure the Shipment information in your Spryker Demo Shop.
template: data-import-template
last_updated: May 23, 2023
---

This document describes the `shipment_type.csv` file to configure the [shipment](/docs/pbc/all/carrier-management/base-shop/shipment-feature-overview.html) type information in your Spryker Demo Shop.

## Import file dependencies

[TODO: verify dependencies and add missing ones; if no dependencies, remove the section]

[`shipment_type_store.csv`](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/import-and-export-data/file-details-shipment-type-store.csv.html)
## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|---|---|---|---|---|
| key | &check; | string | | Key for the shipment type. |
| name | &check; | string | | Name for the shipment type. |
| is_active | &check; | string | | Status of the shipment type. |


## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`shipment_type.csv` template](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/carrier-management/base-shop/import-and-export-data/file-details-shipment-type.csv.md/shipment_type.csv) | Import file template with headers only. |
| [`shipment.csv`](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/carrier-management/base-shop/import-and-export-data/file-details-shipment-type.csv.md/template_shipment_type.csv) | Exemplary import file with the Demo Shop data. |

## Import file command

```bash
data:import:shipment-type
```
---
title: "Import file details: shipment_type_service_type.csv"
description: This document describes the hipment_type_service_type.csv file to configure the shipment information in your Spryker Demo Shop.
template: data-import-template
last_updated: Nov 23, 2023
---

This document describes the `shipment_type_service_type.csv` file to assign [shipment types](/docs/pbc/all/carrier-management/202311.0/base-shop/shipment-feature-overview.html#shipment-type) to [service types](/docs/pbc/all/service-point-management/202311.0/unified-commerce/service-points-feature-overview.html#service-type).

## Import file dependencies

* [`service_type.csv`](/docs/pbc/all/service-point-management/202311.0/unified-commerce/import-and-export-data/import-file-details-service-type.csv.html)
* [`shipment-type.csv`](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-shipment-type.csv.html)

## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|---|---|---|---|---|
| shipment_type_key | ✓ | string    |        | Unique key of the shipment type. |
| service_type_key  | ✓ | string    |        | Unique key of the service type.  |

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`shipment_method_shipment_type.csv` template](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/carrier-management/base-shop/import-and-export-data/file-details-shipment-method-shipment-type.csv.md/template_shipment_method_shipment_type.csv) | Import file template with headers only. |
| [`shipment_method_shipment_type.csv`](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/carrier-management/base-shop/import-and-export-data/file-details-shipment-method-shipment-type.csv.md/shipment_method_shipment_type.csv) | Exemplary import file with the Demo Shop data. |

## Import file command

```bash
console data:import:shipment-type-service-type
```

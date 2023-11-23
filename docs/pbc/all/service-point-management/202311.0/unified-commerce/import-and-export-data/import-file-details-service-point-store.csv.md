---
title: "Import file details: service_point_store.csv"
last_updated: Nov 23, 2023
template: data-import-template
---

This document describes the `service_point_store.csv` file to configure store relations for [service points](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/service-points-feature-overview.html).

## Import file dependencies

[service_point.csv](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/import-and-export-data/import-file-details-service-point.csv.html)



## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| service_point_key | ✓ | String    |           | Unique key of the service point.        |
| store_name        | ✓ | String    |            | Store relation for the service point. |


## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [template_product_abstract.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/202109.0/Template_product_abstract.csv) | Import file template with headers only. |
| [product_abstract.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/202109.0/product_abstract.csv) | Exemplary import file with the Demo Shop data. |

## Import command

```bash
console data:import service-point-store
```

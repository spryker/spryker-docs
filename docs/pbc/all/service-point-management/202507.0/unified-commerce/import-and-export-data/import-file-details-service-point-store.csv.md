---
title: "Import file details: service_point_store.csv"
description: Learn how to configure service point information via importing data through the service point store CSV file in your Spryker unified commerce project.
last_updated: Nov 23, 2023
template: data-import-template
redirect_from:
---

This document describes the `service_point_store.csv` file to configure store relations for [service points](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/service-points-feature-overview.html).

## Import file dependencies

[service_point.csv](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/import-and-export-data/import-file-details-service-point.csv.html)



## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| service_point_key | ✓ | String    |           | Identifier of a service point to assign to a store. |
| store_name        | ✓ | String    |            | Store relation for the service point. |


## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [template_service_point_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/service-point-management/unified-commerce/import-and-export-data/service_point_store.csv.md/template_service_point_store.csv) | Import file template with headers only. |
| [service_point_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/service-point-management/unified-commerce/import-and-export-data/service_point_store.csv.md/service_point_store.csv) | Exemplary import file with the Demo Shop data. |

## Import command

```bash
data:import service-point-store
```

---
title: "Import file details: service.csv"
description: Learn how to configure service information via importing data through the service CSV file in your Spryker unified commerce project.
last_updated: Nov 23, 2023
template: data-import-template
---

This document describes the `service.csv` file to configure [services](/docs/pbc/all/service-point-management/latest/unified-commerce/service-points-feature-overview.html).

## Import file dependencies

- [service_point.csv](/docs/pbc/all/service-point-management/latest/unified-commerce/import-and-export-data/import-file-details-service-point.csv.html)
- [service_type.csv](/docs/pbc/all/service-point-management/latest/unified-commerce/import-and-export-data/import-file-details-service-type.csv.html)

## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|-------------------|-----------|-----------|-------------------|-------------|
| key               | ✓ | String    |               | Unique key for the service.        |
| service_point_key | ✓ | String    |                | Identifier of a service point to assign the service to.  |
| service_type_key  | ✓ | String    |             | Identifier of a service type. Defines the type of the service you are importing.   |
| is_active         | ✓ | Boolean      |                  | Defines if the service is to be active. |



## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [template_service.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/service-point-management/unified-commerce/import-and-export-data/service.csv.md/template-service.csv) | Import file template with headers only. |
| [service.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/service-point-management/unified-commerce/import-and-export-data/service.csv.md/service.csv) | Exemplary import file with the Demo Shop data. |

## Import command

```bash
data:import:service
```

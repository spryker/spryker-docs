---
title: "Import file details: service_type.csv"
description: Learn how to configure service type information via importing data through the service type CSV file in your Spryker unified commerce project.
last_updated: Nov 23, 2023
template: data-import-template
redirect_from:
---

This document describes the `service_type.csv` file to configure [service types](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/service-points-feature-overview.html).

## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| name   | ✓ | String    |   | Unique key for the service type.   |
| key    | ✓ | String    |   | Unique name for the service type.  |


## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [template_service_type.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/service-point-management/unified-commerce/import-and-export-data/service_type.csv.md/template_service_type.csv) | Import file template with headers only. |
| [service_type.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/service-point-management/unified-commerce/import-and-export-data/service_type.csv.md/service_type.csv) | Exemplary import file with the Demo Shop data. |

## Import command

```bash
data:import:service-type
```

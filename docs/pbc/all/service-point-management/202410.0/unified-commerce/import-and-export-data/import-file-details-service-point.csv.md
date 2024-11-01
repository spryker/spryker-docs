---
title: "Import file details: service_point.csv"
last_updated: Nov 23, 2023
template: data-import-template
---

This document describes the `service_point.csv` file to configure [service points](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/service-points-feature-overview.html).


## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| key       | ✓ | String    |                 | Unique key for the service point.        |
| name      | ✓ | String    |                 | Name of the service point.              |
| is_active | ✓ | Boolean      |                | Defines if the service point is active. |


## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [template_service_point.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/service-point-management/unified-commerce/import-and-export-data/service_point.csv.md/template_service_point.csv) | Import file template with headers only. |
| [service_point.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/service-point-management/unified-commerce/import-and-export-data/service_point.csv.md/service_point.csv) | Exemplary import file with the Demo Shop data. |

## Import command

```bash
data:import service-point
```

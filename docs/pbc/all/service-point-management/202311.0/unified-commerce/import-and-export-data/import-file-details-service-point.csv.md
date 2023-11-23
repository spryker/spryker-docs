---
title: "Import file details: service_point.csv"
last_updated: Nov 23, 2023
template: data-import-template
---

This document describes the `service_point.csv` file to configure [service points](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/service-points-feature-overview.html).


## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| key       | ✓ | String    |                 | Unique key of the service point.        |
| name      | ✓ | String    |                 | Name of the service point.              |
| is_active | ✓ | Boolean      |                | Defines if the service point is active. |


## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [template_product_abstract.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/202109.0/Template_product_abstract.csv) | Import file template with headers only. |
| [product_abstract.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/202109.0/product_abstract.csv) | Exemplary import file with the Demo Shop data. |

## Import command

```bash
console data:import service-point
```

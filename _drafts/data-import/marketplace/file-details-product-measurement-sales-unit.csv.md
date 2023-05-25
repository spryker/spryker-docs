---
title: "File details: product_measurement_sales_unit.csv
.csv"
template: data-import-template
last_updated: 
---

This document describes the `product_measurement_sales_unit.csv` file to configure information about [measurement units](/docs/pbc/all/product-information-management/{{page.verison}}/feature-overviews/measurement-units-feature-overview.html) in your Spryker shop.


## Import file dependencies

[TODO: add dependencies]
<!--If the file has no dependencies, remove the section. If there are two and more import files, use bullet points.-->

## Import file parameters

| PARAMETER | REQUIRED |  TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| PARAMETER | REQUIRED | DATA TYPE | DATA EXAMPLE | DESCRIPTION |
| --- | --- | --- | --- | --- |
| code | &check; | string | Existing measurement unit code that will be the base of measurement unit calculations for this product abstract. |
| abstract_sku | &check; | virtual-unique, string | Existing product abstract SKU. One product abstract can have only one base unit; multiple occurrences override older ones.|

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`template_product_measurement_sales_unit.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link-->| Import file template with headers only. |
| [`product_measurement_sales_unit.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link--> | Exemplary import file with the Demo Shop data. |

## Import file command

```bash
data:import:product-packaging-unit
```
---
title: "File details: product_measurement_unit.csv"
description: Use the product_measurement_unit.csv file to configure information about measurement units in your Spryker shop.
template: data-import-template
last_updated: Jun 1, 2023
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
---

This document describes the `product_measurement_unit.csv` file to configure information about [measurement units](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/measurement-units-feature-overview.html) in your Spryker shop.

## Import file parameters

| PARAMETER | REQUIRED |  TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| name | &check; | string | Glossary key used for displaying. Each name needs glossary key definition for all configured locales. |
| code | &check; | unique, string | Unique identifier used by the Spryker OS to identify measurement units. |
| default_precision | &check; | integer, power of ten | Property that affects how detailed to render a float measurement unit. Affects visual only, not used in calculations.|

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [template_product_measurement_unit.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/import-and-export-data/file-details-product-measurement-unit.csv.md/template_product_measurement_unit.csv)| Import file template with headers only. |
| [product_measurement_unit.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/import-and-export-data/file-details-product-measurement-unit.csv.md/product_measurement_unit.csv) | Exemplary import file with the Demo Shop data. |


## Import file command

```bash
data:import:product-measurement-unit
```
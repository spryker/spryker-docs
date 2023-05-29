---
title: "File details: product_measurement_unit.csv"
template: data-import-template
last_updated: 
---

This document describes the `product_measurement_unit.csv` file to configure information about [measurement units](/docs/pbc/all/product-information-management/{{page.verison}}/feature-overviews/measurement-units-feature-overview.html) in your Spryker shop.


## Import file dependencies

[TODO: add dependencies]
<!--If the file has no dependencies, remove the section. If there are two and more import files, use bullet points.-->

## Import file parameters

| PARAMETER | REQUIRED |  TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| name | &check; | string | Gdlossary key used for displaying. Each name needs glossary key definition for all configured locales. |
| code | &check; | unique, string | Unique identifier used by the Spryker OS to identify measurement units. |
| default_precision | &check; | integer, power of ten | Property that affects how detailed to render a float measurement unit. Affects visual only, not used in calculations.|

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`template_product_measurement_unit.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link-->| Import file template with headers only. |
| [`product_measurement_unit.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link--> | Exemplary import file with the Demo Shop data. |


## Import file command

```bash
data:import:product-measurement-unit
```
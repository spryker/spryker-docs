---
title: "File details: product_packaging_unit.csv"
template: data-import-template
last_updated: 
---

This document describes the `product_packaging_unit.csv` file to configure information about [product packaging units](docs/pbc/all/product-information-management/{{page.version}}/feature-overviews/packaging-units-feature-overview.html) in your Spryker shop.


## Import file dependencies

[TODO: add dependencies]
<!--If the file has no dependencies, remove the section. If there are two and more import files, use bullet points.-->

## Import file parameters

| PARAMETER | REQUIRED | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| concrete_sku | &check; | string |Concrete product SKU of packaging unit. |
| lead_product_sku | &check; | string | Lead product concrete SKU. |
| packaging_unit_type_name | &check; | string | Type a name of the current concrete product. |
| default_amount | optional | positive integer | <ul><li>Defines how many lead products should be sold together with each quantity of the current product concrete.</li><li>Effective only if the current concrete product `has_lead_product = 1`.</li></ul> |
| is_amount_variable | &check; | bool integer | <ul><li>Allows customers to override `default_amount` and decide how many lead products will be ordered for each quantity of this product concrete.</li></ul> |
| amount_min | optional | positive integer | <ul><li>Requires a customer to buy at least this amount of lead products.</li><li>Effective only if `is_amount_variable = 1`.</li><li>Default value is 1 when not provided.</li></ul> |
| amount_max | optional | positive integer | <ul><li>Restricts a customer from buying more than this value.</li><li>Effective only if `is_amount_variable = 1`.</li><li>Default value remains empty (unlimited) when not provided.</li></ul> |
| amount_interval | optional | positive integer | <ul><li>Restricts customers to buy the amount that fits into the interval beginning with `amount_min`.</li><li>Effective only if `is_amount_variable = 1`.</li><li>Default value is `amount_min` when not provided.</li></ul> <br>Min = 3; Max = 10; Interval = 2<br>Choosable: 3, 5, 7, 9|

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`template_product_packaging_unit.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link-->| Import file template with headers only. |
| [`product_packaging_unit.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link--> | Exemplary import file with the Demo Shop data. |


## Import file command

```bash
data:import:product-packaging-unit
```
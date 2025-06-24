---
title: "Import file details: product_packaging_unit_type.csv"
description: Learn how you can import data for product packaging units using the product packaging unit type csv file within your Spryker Cloud Commerce OS project.
template: data-import-template
last_updated: Aug 10, 2024
redirect_from:
  - /docs/pbc/all/product-information-management/202204.0/base-shop/tutorials-and-howtos/howto-import-packaging-units.html
  - /docs/pbc/all/product-information-management/202404.0/base-shop/tutorials-and-howtos/howto-import-packaging-units.html
  - /docs/pbc/all/product-information-management/202311.0/base-shop/tutorials-and-howtos/howto-import-packaging-units.html
  - /docs/pbc/all/product-information-management/202307.0/base-shop/tutorials-and-howtos/howto-import-packaging-units.html

---

This document describes the `product_packaging_unit_type.csv` file to configure information about [product packaging units](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/packaging-units-feature-overview.html).


## Import file parameters

| PARAMETER | REQUIRED | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| name   | ✓ | string  | Glossary key that will be used to display a packaging unit type. Each name needs a glossary key definition for all configured locales. |

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [template_product_packaging_unit_type.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/import-and-export-data/import-file-details-product-packaging-unit-type.csv.md/template_product_packaging_unit_type.csv) | Import file template with headers only. |
| [product_packaging_unit_type.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/import-and-export-data/import-file-details-product-packaging-unit-type.csv.md/product_packaging_unit_type.csv) | Exemplary import file with the Demo Shop data. |


## Import file command

```bash
console data:import product-packaging-unit-type
```

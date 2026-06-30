---
title: "File details: configurable_bundle_template_image.csv"
description: Use the configurable_bundle_template_image.csv file to configure information about configurable bundle templates' slots in your Spryker shop.
template: data-import-template
redirect_from:
last_updated: Jun 1, 2023
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `configurable_bundle_template_image.csv` file to configure information about [configurable bundle](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/configurable-bundle-feature-overview.html) templates' slots in your Spryker shop.

## Import file dependencies

* [File details: configurable_bundle_template.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/file-details-configurable-bundle-template.csv.html)
* [File details: product_image.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-image.csv.html)

## Import file parameters

| PARAMETER                                | REQUIRED | TYPE | DESCRIPTION                                          |
| ---------------------------------------- | -------- | ---- | ---------------------------------------------------- |
| configurable_bundle_template_key | &check; | string | Internal data import identifier for the configurable bundle template. |
| product_image_set_key            | &check; | string | Internal data import identifier for the product image set. |

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [template_configurable_bundle_template_image.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/import-and-export-data/file-details-configurable-bundle-template-image.csv.md/template_configurable_bundle_template_image.csv)| Import file template with headers only. |
| [configurable_bundle_template_image.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/import-and-export-data/file-details-configurable-bundle-template-image.csv.md/configurable_bundle_template_image.csv) | Exemplary import file with the Demo Shop data. |


## Import file command

```bash
data:import:configurable-bundle-template-image
```

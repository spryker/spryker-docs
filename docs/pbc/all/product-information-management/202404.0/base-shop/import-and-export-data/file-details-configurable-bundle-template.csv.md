---
title: "File details: configurable_bundle_template.csv"
description: Use the configurable_bundle_template.csv file to configure information about configurable bundle templates in your Spryker shop.
template: data-import-template
last_updated: Jun 1, 2023
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
---

This document describes the `configurable_bundle_template.csv` file to configure information about [configurable bundle](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/configurable-bundle-feature-overview.html) templates in your Spryker shop.

## Import file parameters

| PARAMETER                                | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION                                          |
| ---------------------------------------- | -------- | ---- | ------------- | ----------------------- | ---------------------------------------------------- |
| configurable_bundle_template_key         |  &check; | string |               |                         | Internal data import identifier of the configurable bundle template. |
| configurable_bundle_template_uuid        |          | string |               |                         | Unique identifier of the configurable bundle.  |
| configurable_bundle_template_name        |  &check; | string |               |                         | Glossary key of the configurable bundle name. |
| configurable_bundle_template_is_active   |  &check; | boolean | `1` | `1`: configurable bunlde is active</li><li>`0`: configurable bunlde is inactive</li></ul> | Flag for the configurable bundle name.  |

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [template_configurable_bundle_template.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/import-and-export-data/file-details-configurable-bundle-template.csv.md/template_configurable_bundle_template.csv)| Import file template with headers only. |
| [configurable_bundle_template.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/import-and-export-data/file-details-configurable-bundle-template.csv.md/configurable_bundle_template.csv) | Exemplary import file with the Demo Shop data. |


## Import file command

```bash
data:import:configurable-bundle-template
```
---
title: "File details: configurable_bundle_template_image.csv"
template: data-import-template
last_updated: 
---

This document describes the `configurable_bundle_template_image.csv` file to configure information about [configurable bundle](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/configurable-bundle-feature-overview.html) templates' slots in your Spryker shop.

## Import file dependencies

[File details: configurable_bundle_template.csv](<!--TODO: add links when move to proper folder)-->

## Import file parameters

| PARAMETER                                | REQUIRED | TYPE | DEFAULT VALUE | DESCRIPTION                                          |
| ---------------------------------------- | -------- | ---- | ------------- | ---------------------------------------------------- |
| configurable_bundle_template_key | &check; | string |  | Internal data import identifier for the configurable bundle template. |
| product_image_set_key            | &check; | string |  | Internal data import identifier for the product image set. |

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`template_configurable_bundle_template_image.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link-->| Import file template with headers only. |
| [`configurable_bundle_template_image.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link--> | Exemplary import file with the Demo Shop data. |


## Import file command

```bash
data:import:configurable-bundle-template-image
```
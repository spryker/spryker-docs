---
title: "File details: configurable_bundle_template_slot.csv"
description: Use the configurable_bundle_template_slot.csv file to configure information about configurable bundle templates' slots in your Spryker shop.
template: data-import-template
last_updated: Jun 1, 2023
---

This document describes the `configurable_bundle_template_slot.csv` file to configure information about [configurable bundle](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/configurable-bundle-feature-overview.html) templates' slots in your Spryker shop.

## Import file dependencies

[File details: configurable_bundle_template.csv](<!--TODO: add links when move to proper folder)-->

## Import file parameters

| PARAMETER                                | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION                                          |
| ---------------------------------------- | -------- | ---- | ------------- | ----------------------- | ---------------------------------------------------- |
| configurable_bundle_template_slot_key    | &check; | string |  | Internal data import identifier of the configurable bundle template slot. |
| configurable_bundle_template_slot_name   | &check; | string |  |Name (glossary key) of the configurable bundle template slot.  |
| configurable_bundle_template_slot_uuid   |         | string |  |Unique identifier of the configurable bundle template slot.  |
| configurable_bundle_template_key         | &check; | string |  | Internal data import identifier of the configurable bundle template. |
| product_list_key                         | &check; | string |  | ID of the product list for allowed products of the slot. |

## Import file template and content example

| FILE | DESCRIPTION |
|---|---|
| [`template_configurable_bundle_template_slot.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link-->| Import file template with headers only. |
| [`configurable_bundle_template_slot.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link--> | Exemplary import file with the Demo Shop data. |


## Import file command

```bash
data:import:configurable-bundle-template-slot
```
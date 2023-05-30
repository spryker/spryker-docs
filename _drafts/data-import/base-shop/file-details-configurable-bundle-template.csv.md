---
title: "File details: configurable_bundle_template.csv"
template: data-import-template
last_updated: 
---

This document describes the `configurable_bundle_template.csv` file to configure information about [configurable bundle](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/configurable-bundle-feature-overview.html) templates in your Spryker shop.

## Import file dependencies

[TODO: add dependencies]
<!--If the file has no dependencies, remove the section. If there are two and more import files, use bullet points.-->

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
| [`template_configurable_bundle_template.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link-->| Import file template with headers only. |
| [`configurable_bundle_template.csv`](link to the exemplary file)<!--after doc moved to proper place, upload CSV to S3 and add a link--> | Exemplary import file with the Demo Shop data. |


## Import file command

```bash
data:import:configurable-bundle-template
```
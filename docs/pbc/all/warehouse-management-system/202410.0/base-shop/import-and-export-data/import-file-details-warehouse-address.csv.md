---
title: "Import file details: warehouse_address.csv"
description: learn how to configure warehouse address data in your Spryker based project using the warehouse address csv file.
last_updated: Oct 4, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-warehouse-addresscsv
originalArticleId: 330a69e6-3c7b-4aef-8b61-b70309dcc856
redirect_from:
  - /docs/scos/dev/data-import/202311.0/data-import-categories/commerce-setup/file-details-warehouse-address.csv.html
  - /docs/pbc/all/warehouse-management-system/202311.0/base-shop/import-data/file-details-warehouse-address.csv.html
  - /docs/pbc/all/warehouse-management-system/202311.0/base-shop/import-and-export-data/file-details-warehouse-address.csv.html
  - /docs/pbc/all/warehouse-management-system/202204.0/base-shop/import-and-export-data/import-file-details-warehouse-address.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `warehouse_address.csv` file to configure [warehouse address information](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/inventory-management-feature-overview.html#defining-a-warehouse-address) in your Spryker shop.

## Import file dependencies

[File details: warehouse.csv](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-warehouse-store.csv.html).

## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| warehouse_name | &check; | String |  | Warehouse name from the [warehouse.csv](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-warehouse.csv.html) file. |
| address1 | &check; | String |  | Warehouse address—first line. |
| address2 |  | String |  | Warehouse address—second line. |
| address3 |  | String |  | Warehouse address—third line. |
| zip_code | &check; | String |  | Zip code. |
| city | &check; | String |  | City. |
| region_name |  |String |  | Region name from the `spy_regionDB` table. |
| country_iso2_code | &check; | String |  | ISO 2 country code. |
| phone |  | String |   |Phone number. |
| comment |  | String |   | Comment. |


## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
|[ template_warehouse_address.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template_warehouse_address.csv) | Import file template with headers only. |
| [warehouse_address.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/warehouse_address.csv) | Exemplary import file with Demo Shop data. |



## Import file command

```bash
data:import stock-address
```

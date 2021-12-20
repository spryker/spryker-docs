---
title: File details- warehouse_address.csv
description: Import the warehouse address data into your project
last_updated: Oct 4, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-warehouse-addresscsv
originalArticleId: 330a69e6-3c7b-4aef-8b61-b70309dcc856
redirect_from:
  - /2021080/docs/file-details-warehouse-addresscsv
  - /2021080/docs/en/file-details-warehouse-addresscsv
  - /docs/file-details-warehouse-addresscsv
  - /docs/en/file-details-warehouse-addresscsv
---

This document describes the `warehourse_address.csv` file to configure [warehouse address information](/docs/scos/user/features/{{page.version}}/inventory-management-feature-overview.html#defining-a-warehouse-address) in your Spryker shop.

To import the file, run

```bash
data:import stock-address
```

## Import file parameters
The file should have the following parameters:


| PARAMETER | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- | --- |
| warehouse_name | &check; | String |  |  | Warehouse name from the [warehouse.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-warehouse.csv.html) file |
| address1 | &check; | String |  |  | Warehouse address—first line |
| address2 |  | String |  |  | Warehouse address—second line |
| address3 |  | String |  |  | Warehouse address—third line |
| zip_code | &check; | String |  |  | Zipcode |
| city | &check; | String |  |  | City |
| region_name |  |String |  |  | Region name from the `spy_regionDB` table |
| country_iso2_code | &check; | String |  |  | ISO 2 country code |
| phone |  | String |  |  |Phone number |
| comment |  | String |  |  | Comment |

## Import file dependencies
The file has the following dependency:
[File details: warehouse.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-warehouse-store.csv.html)

## Import template file and content example
Find the template and an example of the file below:


| FILE | DESCRIPTION |
| --- | --- |
|[ template_warehouse_address.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template_warehouse_address.csv) | Import file template with headers only. |
| [warehouse_address.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/warehouse_address.csv) | Exemplary import file with Demo Shop data. |

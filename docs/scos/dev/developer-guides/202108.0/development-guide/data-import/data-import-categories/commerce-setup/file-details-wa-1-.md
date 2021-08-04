---
title: File details- warehouse_address.csv
originalLink: https://documentation.spryker.com/2021080/docs/file-details-warehouse-addresscsv
redirect_from:
  - /2021080/docs/file-details-warehouse-addresscsv
  - /2021080/docs/en/file-details-warehouse-addresscsv
---

This document describes the `warehourse_address.csv` file to configure [warehouse address information](https://documentation.spryker.com/upcoming-release/docs/inventory-management-feature-overview#defining-a-warehouse-address) in your Spryker shop. 

To import the file, run

```Bash
data:import stock-address
```

## Import file parameters
The file should have the following parameters:


| PARAMETER | REQUIRED | TYPE | DEFAULT VALUE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- | --- |
| warehouse_name | &check; | String |  |  | Warehouse name from the [warehouse.csv](https://documentation.spryker.com/docs/file-details-warehousecsv) file |
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
[File details: warehouse.csv](https://documentation.spryker.com/docs/file-details-warehouse-storecsv)

## Import template file and content example
Find the template and an example of the file below:


| FILE | DESCRIPTION |
| --- | --- |
|[ template_warehouse_address.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+warehouse_address.csv) | Import file template with headers only. |
| [warehouse_address.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/warehouse_address.csv) | Exemplary import file with Demo Shop data. |

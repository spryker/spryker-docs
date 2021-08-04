---
title: File details- warehouse_store.csv
originalLink: https://documentation.spryker.com/v5/docs/file-details-warehouse-storecsv
redirect_from:
  - /v5/docs/file-details-warehouse-storecsv
  - /v5/docs/en/file-details-warehouse-storecsv
---

This article contains content of the **warehouse_store** file to configure Warehouse / Store relation on your Spryker Demo Shop.

## Headers & Mandatory Fields 
These are the header fields to be included in the .csv file:

| Field Name | Mandatory | Type | Other Requirements/Comments | Description |
| --- | --- | --- | --- | --- |
| **warehouse_name** | Yes | String | Must be a valid warehouse name imported from [warehouse.csv](https://documentation.spryker.com/docs/en/file-details-warehousecsv). | Name of the warehouse. |
| **store_name** | Yes | String | Must be a valid store name imported from the existing *stores.php* configuration file of demo shop PHP project. | Name of the store. |

## Dependencies
This file has the following dependencies: 

*     [warehouse.csv](https://documentation.spryker.com/docs/en/file-details-warehousecsv)
*     *stores.php* configuration file of demo shop PHP project (where stores are defined initially)

## Recommendations & other information
Check the [HowTo - Import Warehouse Data](https://documentation.spryker.com/docs/en/ht-import-warehouse-data)  
The console command `data:import:stock-store` uses `…/vendor/spryker/stock-data-import/data/import/warehouse_store.csv`. 

The* warehouse_store.csv* file can also be created under the `…/data/import` folder. 

## Template File & Content Example
A template and an example of the *warehouse_store.csv* file can be downloaded here:

| File | Description |
| --- | --- |
| [warehouse_store.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+warehouse_store.csv) | Warehouse Store .csv template file (empty content, contains headers only). |
| [warehouse_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/warehouse_store.csv) | Warehouse Store .csv file containing a Demo Shop data sample. |

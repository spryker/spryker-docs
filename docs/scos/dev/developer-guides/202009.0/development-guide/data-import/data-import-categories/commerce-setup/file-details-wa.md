---
title: File details- warehouse_store.csv
originalLink: https://documentation.spryker.com/v6/docs/file-details-warehouse-storecsv
redirect_from:
  - /v6/docs/file-details-warehouse-storecsv
  - /v6/docs/en/file-details-warehouse-storecsv
---

This article contains content of the `warehouse_store.csv` file to configure the relation between [Warehouse](https://documentation.spryker.com/docs/multiple-warehouse-stock) and Store in your Spryker Demo Shop.

## Import file parameters
The file should have the following parameters:


| Parameter | Required | Type | Default value | Requirements or comments | Description |
| --- | --- | --- | --- | --- | --- |
| warehouse_name | ✓ | String | | Must be a valid warehouse name imported from [warehouse.csv](https://documentation.spryker.com/docs/file-details-warehousecsv). | Name of the warehouse. |
| store_name | ✓ | String | | Must be a valid store name imported from the existing `stores.php` configuration file of demo shop PHP project. | Name of the store. |

## Dependencies
This file has the following dependencies: 

*     [warehouse.csv](https://documentation.spryker.com/docs/file-details-warehousecsv)
*     `stores.php` configuration file of demo shop PHP project, where stores are defined initially

## Additional details
Check the [HowTo - Import Warehouse Data](https://documentation.spryker.com/docs/ht-import-warehouse-data).  
The console command `data:import:stock-store` uses `…/vendor/spryker/stock-data-import/data/import/warehouse_store.csv`. 

You can also create `warehouse_store.csv` in `…/data/import`. 

## Import template file and content example
Find the template and an example of the file below:


| File | Description |
| --- | --- |
| [warehouse_store.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+warehouse_store.csv) | Import file template with headers only. |
| [warehouse_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/warehouse_store.csv) | Exemplary import file with Demo Shop data. |

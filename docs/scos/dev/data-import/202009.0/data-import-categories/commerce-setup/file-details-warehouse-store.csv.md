---
title: File details- warehouse_store.csv
last_updated: Feb 11, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/v6/docs/file-details-warehouse-storecsv
originalArticleId: 03597188-e35b-4950-b280-a1af39e1b3ea
redirect_from:
  - /v6/docs/file-details-warehouse-storecsv
  - /v6/docs/en/file-details-warehouse-storecsv
---

This article contains content of the `warehouse_store.csv` file to configure the relation between [Warehouse](/docs/scos/user/features/{{page.version}}/inventory-management-feature-overview.html) and Store in your Spryker Demo Shop.

## Import file parameters
The file should have the following parameters:


| Parameter | Required | Type | Default value | Requirements or comments | Description |
| --- | --- | --- | --- | --- | --- |
| warehouse_name | ✓ | String | | Must be a valid warehouse name imported from [warehouse.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-warehouse.csv.html). | Name of the warehouse. |
| store_name | ✓ | String | | Must be a valid store name imported from the existing `stores.php` configuration file of demo shop PHP project. | Name of the store. |

## Dependencies
This file has the following dependencies: 

* [warehouse.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-warehouse.csv.html)
* `stores.php` configuration file of demo shop PHP project, where stores are defined initially

## Additional details
Check the [HowTo - Import Warehouse Data](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/data-imports/howto-import-warehouse-data.html).  
The console command `data:import:stock-store` uses `…/vendor/spryker/stock-data-import/data/import/warehouse_store.csv`. 

You can also create `warehouse_store.csv` in `…/data/import`. 

## Import template file and content example
Find the template and an example of the file below:


| File | Description |
| --- | --- |
| [warehouse_store.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+warehouse_store.csv) | Import file template with headers only. |
| [warehouse_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/warehouse_store.csv) | Exemplary import file with Demo Shop data. |

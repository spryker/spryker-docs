---
title: File details - warehouse_store.csv
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-warehouse-storecsv
originalArticleId: f6e5e526-d776-465d-a2d0-518d11ca5b5b
redirect_from:
  - /2021080/docs/file-details-warehouse-storecsv
  - /2021080/docs/en/file-details-warehouse-storecsv
  - /docs/file-details-warehouse-storecsv
  - /docs/en/file-details-warehouse-storecsv
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
---

This document describes the `warehouse_store.csv` file to configure the relation between [Warehouse](/docs/scos/user/features/{{page.version}}/inventory-management-feature-overview.html) and Store in your Spryker Demo Shop.

To import the file, run

```bash
data:import:stock-store
```


## Import file parameters

The file should have the following parameters:

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| warehouse_name | ✓ | String | Must be a valid warehouse name imported from [warehouse.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-warehouse.csv.html). | Name of the warehouse. |
| store_name | ✓ | String | Must be a valid store name imported from the existing `stores.php` configuration file of demo shop PHP project. | Name of the store. |

## Import file dependencies

This file has the following dependencies: 

* [warehouse.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-warehouse.csv.html)
* `stores.php` configuration file of demo shop PHP project, where stores are defined initially

## Additional information

Check the [HowTo: Import Warehouse Data](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/data-imports/howto-import-warehouse-data.html).  
The console command `data:import:stock-store` uses `…/vendor/spryker/stock-data-import/data/import/warehouse_store.csv`.

You can also create `warehouse_store.csv` in `…/data/import`.

## Import template file and content example

Find the template and an example of the file below:

| FILE | DESCRIPTION |
| --- | --- |
| [warehouse_store.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+warehouse_store.csv) | Import file template with headers only. |
| [warehouse_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/warehouse_store.csv) | Exemplary import file with Demo Shop data. |

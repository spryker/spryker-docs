---
title: "Import file details: warehouse_store.csv"
description: learn how to configure warehouse store data in your Spryker based project using the warehouse store csv file.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-warehouse-storecsv
originalArticleId: f6e5e526-d776-465d-a2d0-518d11ca5b5b
redirect_from:
  - /docs/scos/dev/data-import/202311.0/data-import-categories/commerce-setup/file-details-warehouse-store.csv.html
  - /docs/pbc/all/warehouse-management-system/202311.0/base-shop/import-data/file-details-warehouse-store.csv.html
  - /docs/pbc/all/warehouse-management-system/202311.0/base-shop/import-and-export-data/file-details-warehouse-store.csv.html
  - /docs/pbc/all/warehouse-management-system/202204.0/base-shop/import-and-export-data/import-file-details-warehouse-store.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `warehouse_store.csv` file to configure the relation between [Warehouse](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/inventory-management-feature-overview.html) and Store in your Spryker Demo Shop.


## Import file dependencies

- [warehouse.csv](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-warehouse.csv.html)
- `stores.php` configuration file of demo shop PHP project, where stores are defined initially

## Import file parameters


| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| warehouse_name | ✓ | String | Must be a valid warehouse name imported from [warehouse.csv](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-warehouse.csv.html). | Name of the warehouse. |
| store_name | ✓ | String | Must be a valid store name imported from the existing `stores.php` configuration file of demo shop PHP project. | Name of the store. |


## Import template file and content example


| FILE | DESCRIPTION |
| --- | --- |
| [warehouse_store.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+warehouse_store.csv) | Import file template with headers only. |
| [warehouse_store.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/warehouse_store.csv) | Exemplary import file with Demo Shop data. |

## Import file command

```bash
data:import:stock-store
```

## Additional information

- The console command `data:import:stock-store` uses `…/vendor/spryker/stock-data-import/data/import/warehouse_store.csv`.

- You can also create `warehouse_store.csv` in `…/data/import`.

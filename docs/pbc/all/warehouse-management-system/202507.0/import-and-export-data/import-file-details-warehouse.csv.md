---
title: "Import file details: warehouse.csv"
description: learn how to configure warehouse data in your Spryker based project using the warehouse csv file.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-warehousecsv
originalArticleId: 143a064c-e725-4451-b6a5-2324feaf163f
redirect_from:
  - /docs/scos/dev/data-import/202311.0/data-import-categories/commerce-setup/file-details-warehouse.csv.html
  - /docs/pbc/all/warehouse-management-system/202311.0/base-shop/import-data/file-details-warehouse.csv.html
  - /docs/pbc/all/warehouse-management-system/202311.0/base-shop/import-and-export-data/file-details-warehouse.csv.html
  - /docs/pbc/all/warehouse-management-system/202204.0/base-shop/import-and-export-data/import-file-details-warehouse.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/latest/execution-order-of-data-importers.html
---

This document describes the `warehouse.csv` file to configure the [Warehouse](/docs/pbc/all/warehouse-management-system/latest/base-shop/inventory-management-feature-overview.html) information in your Spryker Demo Shop.


## Import file parameters

<div>

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| name | ✓ | String |  | Name of the warehouse. |
| is_active |  | Boolean | <ul><li>True = 1</li><li>False = 0</li><li>If empty, it will be assumed 0 (false)</li></ul>| Status of the warehouse, specified in a boolean value: 1 (true) or 0 (false), where 1 indicates that the warehouse is available and 0 indicates that the warehouse is unavailable. By default, the warehouse is not active.|

</div>

## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [warehouse.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+warehouse.csv) | Import file template with headers only. |
| [warehouse.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/warehouse.csv) | Exemplary import file with Demo Shop data. |


## Import file command

```bash
data:import:stock
```

## Additional information


- The `warehouse.csv` file replaces the `stock.csv` previously used.


- By default, `warehouse.csv` exists only in folder `…/vendor/spryker/stock-data-import/data/import/warehouse.csv`, but can be also be copied into `…/data/import` folder.

## Next steps

- ["Import file details: warehouse_address.csv"](/docs/pbc/all/warehouse-management-system/latest/base-shop/import-and-export-data/import-file-details-warehouse-address.csv.html)
- ["Import file details: warehouse_store.csv"](/docs/pbc/all/warehouse-management-system/latest/base-shop/import-and-export-data/import-file-details-warehouse-store.csv.html)
- ["Import file details: product_stock.csv"](/docs/pbc/all/warehouse-management-system/latest/base-shop/import-and-export-data/import-file-details-product-stock.csv.html)

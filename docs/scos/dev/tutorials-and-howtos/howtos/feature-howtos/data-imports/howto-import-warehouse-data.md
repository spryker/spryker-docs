---
title: "HowTo: Import warehouse data"
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-import-warehouse-data
originalArticleId: 3adb5dc2-398b-4d48-adad-5ee97de1df9d
redirect_from:
  - /2021080/docs/ht-import-warehouse-data
  - /2021080/docs/en/ht-import-warehouse-data
  - /docs/ht-import-warehouse-data
  - /docs/en/ht-import-warehouse-data
  - /v6/docs/ht-import-warehouse-data
  - /v6/docs/en/ht-import-warehouse-data
  - /v5/docs/ht-import-warehouse-data
  - /v5/docs/en/ht-import-warehouse-data
  - /v4/docs/ht-import-warehouse-data
  - /v4/docs/en/ht-import-warehouse-data
  - /docs/scos/dev/tutorials/202005.0/howtos/feature-howtos/data-imports/howto-import-warehouse-data.html
related:
  - title: Creating warehouses
    link: docs/scos/user/back-office-user-guides/page.version/administration/warehouses/creating-warehouses.html
  - title: Managing warehouses
    link: docs/scos/user/back-office-user-guides/page.version/administration/warehouses/managing-warehouses.html
---

This document shows how to import warehouse data using a CSV file, including the following:

* Import warehouses.
* Assign a warehouse to stores.
* Import warehouses with the stores assigned in bulk.

## Import warehouses

1. Prepare the `warehouse.csv` file where you can indicate the warehouse name and its availability. The file can contain the following fields:

| PROPERTY | TRANSCRIPTION | EXAMPLE |
| --- | --- | --- |
| `name` | Warehouse name you want to create. | `Warehouse1` |
| `is_active` | Status of the warehouse specified in a boolean value: 1 (true) or 0 (false), where `1` indicates that the warehouse is available and `0` indicates that the warehouse is unavailable. | `1` or `0` |

{% info_block warningBox "Note" %}

If you don't set the status value, the warehouse will be unavailable by default.

{% endinfo_block %}

2. Populate the necessary data and save changes.
3. Upload the `warehouse.csv` file to `StockDataImport/data/import`.
4. Import the data:

  ```bash
  console data:import stock
  ```

The imported data must be imported to the `spy_stock` database table and appear in the Back Office, on the **Warehouses** page. For more information about how to manage the warehouses, see [Managing warehouses](/docs/scos/user/back-office-user-guides/{{site.version}}/administration/warehouses/managing-warehouses.html).

## Import a warehouse with the stores assigned

1. Prepare the `warehouse_store.csv` file containing the following fields:

| PROPERTY | TRANSCRIPTION | EXAMPLE |
| --- | --- | --- |
| `warehouse_name` | Warehouse name you want to create. | `Warehouse1` |
| `store_name` | Store, which you want to assign to the warehouse. | `DE` |

2. Populate the necessary data and save changes.
3. Upload the `warehouse_store.csv` file to `StockDataImport/data/import`.
4. Import the data:
    ```bash
    console data:import stock-store
    ```

The imported data must be added to the `spy_stock_store` database table and appear in the Back Office, on the list of warehouses. For more information about how to manage the warehouses, see [Managing warehouses](/docs/scos/user/back-office-user-guides/{{site.version}}/administration/warehouses/managing-warehouses.html).

## Import warehouses with store relation in bulk

1. Perform steps 2-4 from the preceding sections: [Importing warehouses](#import-warehouses) and [Importing a warehouse with the stores assigned](#import-a-warehouse-with-the-stores-assigned).
2. Run the following console command:
    ```bash
    console data:import
    ```

The imported data appears in the Back Office, on the **Warehouses** page. For more information about managing the warehouses, see [Managing warehouses](/docs/scos/user/back-office-user-guides/{{site.version}}/administration/warehouses/managing-warehouses.html).

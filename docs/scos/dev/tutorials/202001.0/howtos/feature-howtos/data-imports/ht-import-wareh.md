---
title: HowTo - Import Warehouse Data
originalLink: https://documentation.spryker.com/v4/docs/ht-import-warehouse-data
redirect_from:
  - /v4/docs/ht-import-warehouse-data
  - /v4/docs/en/ht-import-warehouse-data
---

This HowTo provides the steps on how to import warehouse data using a .CSV file, including:

* import warehouses
* assign a warehouse to stores
* import warehouses with the stores assigned in bulk

## Importing Warehouses
To import warehouse data:

1. Prepare the **warehouse.csv** file where you can indicate whether the warehouse name and its availability. The file can contain the following fields:

| Property | Transcription | Example |
| --- | --- | --- |
| `name` | Warehouse name you want to create. | `Warehouse1` |
| `is_active` | Status of the warehouse specified in a boolean value: 1 (true) or 0 (false), where **1** indicates that the warehouse is available and **0** indicates that the warehouse is unavailable. | **1** or **0** |

{% info_block warningBox "Note" %}
Keep in mind that if you don't set the status value, the warehouse will be unavailable by default.
{% endinfo_block %}

2. Populate the necessary data and save changes.
3. Upload the **warehouse.csv** file to `StockDataImport/data/import`.
4. To import the data, run the following console command:

```bash
console data:import stock
```

The imported data should be imported to the `spy_stock` database table and appear on the **Warehouses** page in the Back Office. For more details on how to manage the warehouses, see [Managing Warehouses](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/administration/warehouses/managing-wareho). 

## Importing a Warehouse with the Stores Assigned
To import warehouses with the stores assigned:

1. Prepare the **warehouse_store.csv** file containing the following fields:

| Property | Transcription | Example |
| --- | --- | --- |
| `warehouse_name` | Warehouse name you want to create. | `Warehouse1` |
| `store_name` | Store, which you want to assign to the warehouse. | `DE` |

2. Populate the necessary data and save changes.
3. Upload the **warehouse_store.csv** file to `StockDataImport/data/import`.
4. To import the data, run the following console command:

```bash
console data:import stock-store
```

The imported data should be added to the `spy_stock_store` database table and appear on the list of warehouses in the Back Office. For more details on how to manage the warehouses, see [Managing Warehouses](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/administration/warehouses/managing-wareho). 

## Importing Warehouses with Store Relation in Bulk
You can also import warehouses with the stores assigned in bulk. To do this, perform the steps 2-4 from the previous sections - *Importing Warehouses* and *Importing a Warehouse with the Stores Assigned*. Then, run the following console command:

```bash
console data:import
```

The imported data should appear on the **Warehouses** page in the Back Office. For more details on how to manage the warehouses, see [Managing Warehouses](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/administration/warehouses/managing-wareho). 

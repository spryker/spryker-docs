---
title: HowTo - Import Delivery Methods Linked to Store
originalLink: https://documentation.spryker.com/v6/docs/ht-import-delivery-methods-linked-to-store
redirect_from:
  - /v6/docs/ht-import-delivery-methods-linked-to-store
  - /v6/docs/en/ht-import-delivery-methods-linked-to-store
---

In addition to creating and managing delivery methods in the Back Office <!-- link -->, you can also import them with the stores assigned from a .CSV file. 

By default, the data is stored to the `/ShipmentDataImport/data/import/delivery_method_store.csv` file that should contain the following columns:

```yaml
shipment_method_key,store_name
```

where

* **shipment_method**: Name of the delivery method you want to create
* **store_name**: Store in which the delivery method will be available

To import delivery methods linked to the store(s) from the `/ShipmentDataImport/data/import/delivery_method_store.csv` file, run the following console command:

```bash
console data:import:shipment-method-store
```

If successful, the imported data will be added to the **spy_shipment_method_store** database table and appear on the list of delivery methods in the Back Office. For more information on how to view and update the delivery methods, see Managing Delivery Methods <!-- link -->.

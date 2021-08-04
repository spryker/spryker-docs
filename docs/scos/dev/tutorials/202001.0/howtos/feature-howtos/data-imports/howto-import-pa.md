---
title: HowTo - Import Packaging Units
originalLink: https://documentation.spryker.com/v4/docs/howto-import-packaging-units
redirect_from:
  - /v4/docs/howto-import-packaging-units
  - /v4/docs/en/howto-import-packaging-units
---

This HowTo provides the steps on how to extend the list of the packaging unit types available by default (box, bag, palette etc.) by importing packaging unit information and types using a .CSV file. 

{% info_block warningBox "Note" %}
Keep in mind that packaging unit type import should happen first, otherwise, you won't be able to import packaging units if the types are not present yet.
{% endinfo_block %}

## Importing Packaging Unit Types
The .CSV file for import must have a name field populated.

To import packaging units types, in the `ProductPackagingUnitDataImport/data/import/product_packaging_unit.csv` file, run the following command:

```bash
console data:import product-packaging-unit-type
```

If you want to import packaging unit types from your file, indicate a path to it:

```bash
console data:import product-packaging-unit-type -f path_to_file.csv
```

The imported packaging unit types will appear in the *spy_product_packaging_unit_type* database table.

## Importing Packaging Units Information
You can import the following product packaging unit information using a .CSV file:

* Define a packaging unit for a specific product concrete by populating the `concrete_sku` and `packaging_unit_type_name` fields.
Both fields are required.

* Define a lead product in the `lead_product_sku` field.
* Define the default amount (`default_amount`) included in the packaged product
* Set amount restrictions in the `is_amount_variable` field: **1** if the amount can be changed and **0** if it cannot be changed.
* Define the minimum and maximum amount of items in the `amount_min` and `amount_max` fields respectively.
* Set an interval of the amount that a customer can buy in the `amount_interval` field.

To import packaging units information from the `ProductPackagingUnitDataImport/data/import/product_packaging_unit.csv` file, run the following command:

```bash
console data:import product-packaging-unit
```

If you want to import packaging unit data from your file, indicate a path to it:

```bash
console data:import product-packaging-unit -f path_to_file.csv
```

The import will populate only `spy_product_packaging_unit` table with the respective data.

After the import, the packaging unit information is saved to the storage: in the **Back Office**, under the **Maintenace > Storage** menu, there are Redis keys: `product_packaging_unit:{redis_key_suffix_column}`.

<!-- {% info_block infoBox "Info" %}
In the current implementation each packaging unit and lead product has to define sales units. It's enough to define the default "item" as a base unit for the abstract and to define also "item" as one and only sales unit for both the leading product and all related packaging units.
{% endinfo_block %} -->

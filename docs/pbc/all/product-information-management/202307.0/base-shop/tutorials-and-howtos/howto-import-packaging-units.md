---
title: "HowTo: Import packaging units"
description: Use this guide to learn how to import packaging unit information and its types using a CSV file.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-import-packaging-units
originalArticleId: 8e89de6b-7170-414c-b0ad-3e44a9c8a169
redirect_from:
  - /2021080/docs/howto-import-packaging-units
  - /2021080/docs/en/howto-import-packaging-units
  - /docs/howto-import-packaging-units
  - /docs/en/howto-import-packaging-units
  - /v6/docs/howto-import-packaging-units
  - /v6/docs/en/howto-import-packaging-units
  - /v5/docs/howto-import-packaging-units
  - /v5/docs/en/howto-import-packaging-units
  - /v4/docs/howto-import-packaging-units
  - /v4/docs/en/howto-import-packaging-units
related:
  - title: Packaging Units feature overview
    link: docs/pbc/all/product-information-management/page.version/base-shop/feature-overviews/packaging-units-feature-overview.html
---

This document shows how to extend the list of the packaging unit types available by default (box, bag, palette) by importing packaging unit information and types using a CSV file.

{% info_block warningBox "Note" %}

The packaging unit type import must happen first; otherwise, you can't import packaging units if the types are not present yet.

{% endinfo_block %}

## Import packaging unit types

The CSV file for import must have a name field populated.

To import packaging units types, in the `ProductPackagingUnitDataImport/data/import/product_packaging_unit.csv` file, run the following command:

```bash
console data:import product-packaging-unit-type
```

To import packaging unit types from your file, indicate a path to it:

```bash
console data:import product-packaging-unit-type -f path_to_file.csv
```

The imported packaging unit types appear in the `spy_product_packaging_unit_type` database table.

## Import packaging units information

You can import the following product packaging unit information using a CSV file:

* Define a packaging unit for a specific product concrete by populating the `concrete_sku` and `packaging_unit_type_name` fields. Both fields are required.
* In the `lead_product_sku` field, define a lead product.
* Define the default amount (`default_amount`) included in the packaged product.
* In the `is_amount_variable` field, set amount restrictions: `1` if the amount can be changed and `0` if it cannot be changed.
* In the `amount_min` and `amount_max` fields, define the minimum and maximum number of items, respectively.
* In the `amount_interval` field, set the the interval for the quantity that a customer can buy.

Import packaging units information from the `ProductPackagingUnitDataImport/data/import/product_packaging_unit.csv` file:

```bash
console data:import product-packaging-unit
```

To import packaging unit data from your file, indicate a path to it:

```bash
console data:import product-packaging-unit -f path_to_file.csv
```

The import populates only the `spy_product_packaging_unit` table with the respective data.

After the import, the packaging unit information is saved to the storage in the Back Office, in **Maintenance&nbsp;<span aria-label="and then">></span> Storage**, there are Redis keys: `product_packaging_unit:{redis_key_suffix_column}`.

<!-- {% info_block infoBox "Info" %}
In the current implementation each packaging unit and lead product has to define sales units. It's enough to define the default "item" as a base unit for the abstract and to define also "item" as one and only sales unit for both the leading product and all related packaging units.
{% endinfo_block %} -->

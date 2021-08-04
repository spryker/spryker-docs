---
title: HowTo - Import Minimum Order Value Data
originalLink: https://documentation.spryker.com/v3/docs/ht-import-minimum-order-value-data-201903
redirect_from:
  - /v3/docs/ht-import-minimum-order-value-data-201903
  - /v3/docs/en/ht-import-minimum-order-value-data-201903
---

Besides setting [global and merchant relation thresholds](/docs/scos/dev/user-guides/201903.0/back-office-user-guide/thresholds/threshold)  for minimum order values manually in the Back Office, they can also be imported in bulk from a .csv file.

You can import minimum order value data from a .csv file having the following fields:

* **store**: Indicate the store you want to import the data for.
* **currency**: Indicate the currency for the minimum order value threshold data.
* **strategy**: Specify the threshold strategy and eventually its type (for soft threshold) as follows: hard-threshold, soft-threshold, soft-threshold-flexible-fee or soft-threshold-fixed-fee.
* **fee** (only for hard-threshold or soft-threshold with fees).
* **message_en**: Message in English that will be displayed if the threshold requirements are not met.
* **message_de**: Message in German that will be displayed if the threshold requirements are not met.

To import minimum order value information from the `MinimumOrderValueDataImport/data/import/minimum_order_value.csv` file, run the following command:

```bash
console data:import minimum-order-value
```

Or, if you want to import threshold data from your file, indicate a path to it:

```bash
console data:import minimum-order-value [-f [path_to_csv_file]
```

## Importing Minimum Order Value Data for Merchant Relations
You can import minimum order value data for individual merchant relations from a .csv file having the following fields:

* **merchant relation**: Indicate the key to and existing merchant relation.
* **store**: Indicate the store you want to import the data for.
* **currency**: Indicate the currency for the minimum order value threshold data.
* **strategy**: Specify the threshold strategy and eventually its type (for soft threshold) as follows: hard-threshold, soft-threshold, soft-threshold-flexible-fee or soft-threshold-fixed-fee.
* **fee** (only for hard-threshold or soft-threshold with fees).
* **message_en**: Message in English that will be displayed if the threshold requirements are not met.
* **message_de**: Message in German that will be displayed if the threshold requirements are not met.

To import minimum order value information from the `MinimumOrderValueDataImport/data/import/minimum_order_value.csv` file, run the following command:

```bash
console data:import merchant-relationship-minimum-order-value
```

Or, if you want to import threshold data for merchant relations from your file, indicate a path to it:

```bash
console data:import merchant-relationship-minimum-order-value [-f [path_to_csv_file]
```

<!-- Last review date: Feb 6, 2019 -->

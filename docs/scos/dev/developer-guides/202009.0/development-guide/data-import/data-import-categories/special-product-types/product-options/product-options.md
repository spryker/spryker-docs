---
title: Product Options
originalLink: https://documentation.spryker.com/v6/docs/product-options-import
redirect_from:
  - /v6/docs/product-options-import
  - /v6/docs/en/product-options-import
---

The **Product Opitons** category contains all data you need to manage product options in your online store. We have structured this section according to the following .csv files that you will have to use to import the data:

* [product_option.csv](https://documentation.spryker.com/docs/file-details-product-optioncsv): allows you to define product options, like insurance, warranty or gift wrapping, and its abstract products.
* [product_option_price.csv](https://documentation.spryker.com/docs/file-details-product-option-pricecsv): allows you to define the net and gross prices for each product option.  

The table below provides details on Product Opitons data importers, their purpose, .csv files, dependencies, and other details. Each data importer contains links to .csv files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

| Data Importer | Purpose | Console Command| File(s) | Dependencies |
| --- | --- | --- | --- |--- |
| **Product Option**   | Imports information about product options, like insurance, warranty or gift wrapping, and the list of Abstract Product SKUs to which the Product Option is available. |`data:import:product-option` | [product_option.csv](https://documentation.spryker.com/docs/file-details-product-optioncsv) |None |
| **Product Option Price**  | Imports information to set the prices net and gross for each of Product Option, per store and per currency.  |`data:import:product-option-price` |[product_option_price.csv](https://documentation.spryker.com/docs/file-details-product-option-pricecsv)| [product_option.csv](https://documentation.spryker.com/docs/file-details-product-optioncsv) |


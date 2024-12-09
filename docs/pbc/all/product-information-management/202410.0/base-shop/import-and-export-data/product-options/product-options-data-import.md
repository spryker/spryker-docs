---
title: Product options data import
description: Learn how to import data and the different ways to import data for product options within your Spryker Cloud Commerce OS Project.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/product-options-import
originalArticleId: 07d8b5ee-b4c6-4538-a21c-5a7a8b16837c
redirect_from: 
- /docs/pbc/all/product-information-management/202204.0/base-shop/import-and-export-data/product-options/product-options-data-import.html
---

To learn how data import works and about different ways of importing data, see [Data import](/docs/dg/dev/data-import/{{page.version}}/data-import.html). This section describes the data import files that are used to import data related to product options:

* [product_option.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/product-options/import-file-details-product-option.csv.html): allows you to define product options, like insurance, warranty or gift wrapping, and its abstract products.
* [product_option_price.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/product-options/import-file-details-product-option-price.csv.html): allows you to define the net and gross prices for each product option.  

The table below provides details on Product Options data importers, their purpose, CSV files, dependencies, and other details. Each data importer contains links to CSV files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

| DATA IMPORTER | PURPOSE | CONSOLE COMMAND | FILES | DEPENDENCIES |
| --- | --- | --- | --- |--- |
| Product Option | Imports information about product options, like insurance, warranty or gift wrapping, and the list of Abstract Product SKUs to which the Product Option is available. |`data:import:product-option` | [product_option.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/product-options/import-file-details-product-option.csv.html) |None |
| Product Option Price | Imports information to set the prices net and gross for each of Product Option, per store and per currency.  |`data:import:product-option-price` |[product_option_price.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/product-options/import-file-details-product-option-price.csv.html)| [product_option.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/product-options/import-file-details-product-option.csv.html) |

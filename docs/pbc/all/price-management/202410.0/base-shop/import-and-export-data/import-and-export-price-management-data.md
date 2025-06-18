---
title: Import and export Price Management data
description: Learn how data import works and different ways of importing price management data in to your Spryker project.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/pricing
originalArticleId: c6b46b26-89ca-4a40-b927-e36fc14266e9
redirect_from:
  - /docs/scos/dev/data-import/202311.0/data-import-categories/catalog-setup/pricing/pricing.html
  - /docs/pbc/all/price-management/202311.0/base-shop/import-and-export-data/import-of-prices.html
  - /docs/pbc/all/price-management/202204.0/base-shop/import-and-export-data/import-and-export-price-management-data.html
---

To learn how data import works and about different ways of importing data, see [Data import](/docs/dg/dev/data-import/{{page.version}}/data-import.html). This section describes the data import files that are used to import data related to the Price Management PBC:

- [product_price.csv](/docs/pbc/all/price-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-price.csv.html): allows you to define the price-related information for each product. This data defines the price type, whether is gross or net, its value, the store and currency to which the price applies, and other price data (for example, volumes price).

- [product_price_schedule.csv](/docs/pbc/all/price-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-price-schedule.csv.html): use this file to schedule a specific price for a product. For that you have to define the price type, whether it's gross or net, its value, the store and currency to which the price applies, the activation date of that price, and its validity.

- [currency.csv](/docs/pbc/all/price-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-currency.csv.html)


The table below provides details on Pricing data importers, their purpose, CSV files, dependencies, and other details. Each data importer contains links to CSV files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

| DATA IMPORTER | PURPOSE | CONSOLE COMMAND | FILES | DEPENDENCIES |
| --- | --- | --- | --- |--- |
| Product Price   | Imports information relative to product prices. |`data:import:product-price` | [product_price.csv](/docs/pbc/all/price-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-price.csv.html)|<ul><li>[product_abstract.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html)</li><li>[product_concrete.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-concrete.csv.html)</li><li>*stores.php* configuration file of demo shop PHP project</li></ul>  |
| Product Price Schedule  | Imports information about product scheduled prices.  |`data:import:product-price-schedule` |[product_price_schedule.csv](/docs/pbc/all/price-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-price-schedule.csv.html) | <ul><li>[product_abstract.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html)</li><li>[product_concrete.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-concrete.csv.html)</li><li>stores.php configuration file of demo shop PHP project</li></ul> |

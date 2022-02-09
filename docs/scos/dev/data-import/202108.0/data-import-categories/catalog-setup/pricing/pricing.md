---
title: Pricing
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/pricing
originalArticleId: c6b46b26-89ca-4a40-b927-e36fc14266e9
redirect_from:
  - /2021080/docs/pricing
  - /2021080/docs/en/pricing
  - /docs/pricing
  - /docs/en/pricing
---

The **Pricing** category contains all prices-related data you need to manage and use prices in your online store. We have structured this section according to the following .csv files that you will have to use to import the data:

* [product_price.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/pricing/file-details-product-price.csv.html): allows you to define the price-related information for each product. This data defines the price type, whether is gross or net, its value, the store and currency to which the price applies, and other price data (for example, volumes price).
* [product_price_schedule.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/pricing/file-details-product-price-schedule.csv.html): use this file to schedule a specific price for a product. For that you have to define the price type, whether it is gross or net, its value, the store and currency to which the price applies, the activation date of that price, and its validity.

The table below provides details on Pricing data importers, their purpose, .csv files, dependencies, and other details. Each data importer contains links to .csv files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

| Data Importer | Purpose | Console Command| File(s) | Dependencies |
| --- | --- | --- | --- |--- |
| **Product Price**   | Imports information relative to product prices. |`data:import:product-price` | [product_price.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/pricing/file-details-product-price.csv.html)|<ul><li>[product_abstract.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html)</li><li>[product_concrete.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-concrete.csv.html)</li><li>**stores.php** configuration file of demo shop PHP project</li></ul>  |
| **Product Price Schedule**   | Imports information about product scheduled prices.  |`data:import:product-price-schedule` |[product_price_schedule.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/pricing/file-details-product-price-schedule.csv.html) | <ul><li>[product_abstract.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html)</li><li>[product_concrete.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-concrete.csv.html)</li><li>**stores.php** configuration file of demo shop PHP project</li></ul> |





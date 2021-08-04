---
title: Pricing
originalLink: https://documentation.spryker.com/v5/docs/pricing
redirect_from:
  - /v5/docs/pricing
  - /v5/docs/en/pricing
---

The **Pricing** category contains all prices-related data you need to manage and use prices in your online store. We have structured this section according to the following .csv files that you will have to use to import the data:

* [product_price.csv](https://documentation.spryker.com/docs/en/file-details-product-pricecsv): allows you to define the price-related information for each product. This data defines the price type, whether is gross or net, its value, the store and currency to which the price applies, and other price data (i.e. volumes price).
* [product_price_schedule.csv](https://documentation.spryker.com/docs/en/file-details-product-price-schedulecsv): use this file to schedule a specific price for a product. For that you have to define the price type, whether it is gross or net, its value, the store and currency to which the price applies, the activation date of that price, and its validity.

The table below provides details on Pricing data importers, their purpose, .csv files, dependencies, and other details. Each data importer contains links to .csv files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

| Data Importer | Purpose | Console Command| File(s) | Dependencies |
| --- | --- | --- | --- |--- |
| **Product Price**   | Imports information relative to product prices. |`data:import:product-price` | [product_price.csv](https://documentation.spryker.com/docs/en/file-details-product-pricecsv)|<ul><li>[product_abstract.csv](https://documentation.spryker.com/docs/en/file-details-product-abstractcsv)</li><li>[product_concrete.csv](https://documentation.spryker.com/docs/en/file-details-product-concretecsv)</li><li>**stores.php** configuration file of demo shop PHP project</li></ul>  |
| **Product Price Schedule**   | Imports information about product scheduled prices.  |`data:import:product-price-schedule` |[product_price_schedule.csv](https://documentation.spryker.com/docs/en/file-details-product-price-schedulecsv) | <ul><li>[product_abstract.csv](https://documentation.spryker.com/docs/en/file-details-product-abstractcsv)</li><li>[product_concrete.csv](https://documentation.spryker.com/docs/en/file-details-product-concretecsv)</li><li>**stores.php** configuration file of demo shop PHP project</li> |





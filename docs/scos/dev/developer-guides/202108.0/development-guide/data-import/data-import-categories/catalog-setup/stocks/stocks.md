---
title: Stocks
originalLink: https://documentation.spryker.com/2021080/docs/stocks
redirect_from:
  - /2021080/docs/stocks
  - /2021080/docs/en/stocks
---

The **Stocks** category contains all data you need to manage stocks in your online store. 
By importing the [product_stock.csv](https://documentation.spryker.com/docs/file-details-product-stockcsv) file you can define the number of product units stored in each of the warehouses.

The table below provides details on the Stocks data importer, its purpose, .csv file, dependencies, and other details. The data importer contains links to .csv files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

| Data Importer | Purpose | Console Command| File(s) | Dependencies |
| --- | --- | --- | --- |--- |
| **Product Stock**   | Imports information about stock, the number of product units stored in each of the warehouses. |`data:import:product-stock` |[product_stock.csv](https://documentation.spryker.com/docs/file-details-product-stockcsv) |<ul><li>[product_concrete.csv](https://documentation.spryker.com/docs/file-details-product-concretecsv)</li><li>[warehouse.csv](https://documentation.spryker.com/docs/file-details-warehousecsv)</li></ul> |

---
title: Commerce Setup
originalLink: https://documentation.spryker.com/v5/docs/commerce-setup
redirect_from:
  - /v5/docs/commerce-setup
  - /v5/docs/en/commerce-setup
---

The **Commerce Setup** category contains data required to set up the multistore environment, warehouses, tax levels, shipping and payment methods, etc. so you could start selling products/services online. 
The table below provides details on Commerce Setup data importers, their purpose, .csv files, dependencies, and other details. Each data importer contains links to .csv files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.


| Data Importer | Purpose | Console Command| File(s) | Dependencies |
| --- | --- | --- | --- |--- |
| **Store**   | Imports basic information about the stores. |`data:import:store` | There is no CSV file to import the store setup information.</br>Store names and other setup information is set in the **stores.php** configuration file in the demo shop PHP project.  | **stores.php** configuration file of Demo Shop|
| **Currency**  | Imports information about currencies used in the store(s). The **currency.csv** file provides an easy way to load information about currencies used in Spryker Demo Shop. It allows to load information like: ISO code, currency symbol, and the name of the currency.|`data:import:currency` | [currency.csv](https://documentation.spryker.com/docs/en/file-details-currencycsv) | None|
| **Customer**  | Imports information about customers.|`data:import:customer` | [customer.csv](https://documentation.spryker.com/docs/en/file-details-customercsv) | None|
| **Glossary**  | Imports information relative to the several locales.|`data:import:glossary` | [glossary.csv](https://documentation.spryker.com/docs/en/file-details-glossarycsv) | None|
| **Tax**  |Imports information about taxes.|`data:import:tax` | [tax.csv](https://documentation.spryker.com/docs/en/file-details-taxcsv) | None|
| **Shipment**  |Imports information about shipment methods.|`data:import:shipment` | [shipment.csv](https://documentation.spryker.com/docs/en/file-details-shipmentcsv) | None|
| **Shipment Price**  |Imports information about the price of each shipment method, applied in each store.|`data:import:shipment-price` | [shipment_price.csv](https://documentation.spryker.com/docs/en/file-details-shipment-pricecsv) | <ul><li>[shipment.cs](https://documentation.spryker.com/docs/en/file-details-shipmentcsv)v</li><li>[currency.csv](https://documentation.spryker.com/docs/en/file-details-currencycsv)</li><li>**stores.php** configuration file of demo shop PHP project</li></ul>|
| **Shipment Method Store**  | Links a *shipment method* to a specific *store*.|`shipment_method_store.csv` | [shipment_method_store.csv](https://documentation.spryker.com/docs/en/file-details-shipment-method-storecsv) | <ul><li>[shipment.csv](https://documentation.spryker.com/docs/en/file-details-shipmentcsv)</li><li>**stores.php** configuration file of demo shop PHP project</li></ul>|
| **Sales Order Threshold**  | Imports information about sales order thresholds. The CSV file content defines certain thresholds for specific stores and currencies.|`data:import sales-order-threshold` | [sales_order_threshold.csv](https://documentation.spryker.com/docs/en/file-details-sales-order-thresholdcsv) | <ul><li>[currency.csv](https://documentation.spryker.com/docs/en/file-details-currencycsv)</li><li>[glossary.csv](https://documentation.spryker.com/docs/en/file-details-glossarycsv)</li><li>**stores.php** configuration file of demo shop PHP project</li></ul>|
| **Warehouse**  | Imports information about warehouses (i.e. name of the warehouse, and if it is available or not).|`data:import:stock` | [warehouse.csv](https://documentation.spryker.com/docs/en/file-details-warehousecsv) | None|
| **Warehouse Store**  | Imports information about the Warehouse / Store relation configuration indicating which warehouse serves which store(s).|` data:import:stock-store`| [warehouse_store.csv](https://documentation.spryker.com/docs/en/file-details-warehouse-storecsv) | <ul><li>[warehouse.csv](https://documentation.spryker.com/docs/en/file-details-warehousecsv)</li><li>**stores.php** configuration file of demo shop PHP project</li></ul>|
| **Payment Method**  | Imports information about *payment methods* as well as *payment providers*.|`data:import:payment-method` | [payment_method.csv](https://documentation.spryker.com/docs/en/file-details-payment-methodcsv) | None|
| **Payment Method Store**  |Imports information about payment methods per store. The CSV file links the *payment method* with each *store*.|`data:import:payment-method-store`| [payment_method_store.csv](https://documentation.spryker.com/docs/en/file-details-payment-method-storecsv) | <ul><li>[payment_method.csv](https://documentation.spryker.com/docs/en/file-details-payment-methodcsv)</li><li>**stores.php** configuration file of demo shop PHP project</li></ul>|

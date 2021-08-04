---
title: Demo Shop Data Import Categories
originalLink: https://documentation.spryker.com/v5/docs/data-import-categories
redirect_from:
  - /v5/docs/data-import-categories
  - /v5/docs/en/data-import-categories
---

To import data for a specific functional entity (category), you need to run data importers containing data that build up the category. Below you will find information on the import categories and their data importers.

## Commerce Setup
The Commerce Setup category contains data required to set up the multistore environment, warehouses, tax levels, shipping payment methods, etc. 
The table below provides details on its data importers, their purpose, .csv files and dependencies.

| Data Importer | Purpose | File(s) | Dependencies |
| --- | --- | --- | --- |
| **Store**   | Imports basic information about the stores. The `data:import:store` console command imports the stores' configuration into the Demo Shop. | There is no CSV file to import the store setup information.</br>Store names and other setup information is set in the **stores.php** configuration file in the demo shop PHP project.  | **stores.php** configuration file of Demo Shop |
| **Currency**  | Imports information about currencies used in the store(s). The **currency.csv** file provides an easy way to load information about currencies used in Spryker Demo Shop. It allows to load information like: ISO code, currency symbol, and the name of the currency.<br>The `data:import:currency` console command imports the **currency.csv** information content into the Demo Shop. | currency.csv | None |
| **Customer**  | Imports information about customers.<br>The `data:import:customer` console command imports **customer.csv** information content into the Demo Shop. | customer.csv | None |
| **Glossary**  | Imports information relative to the several locales.<br>The `data:import:glossary` imports glossary information into the Demo Shop | glossary.csv | None |
| cell | cell | cell | cell |
| cell | cell | cell | cell |
| cell | cell | cell | cell |
| cell | cell | cell | cell |
| cell | cell | cell | cell |
| cell | cell | cell | cell |
| cell | cell | cell | cell |

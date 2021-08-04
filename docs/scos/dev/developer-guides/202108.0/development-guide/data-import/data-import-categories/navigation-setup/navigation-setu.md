---
title: Navigation Setup
originalLink: https://documentation.spryker.com/2021080/docs/navigation-setup
redirect_from:
  - /2021080/docs/navigation-setup
  - /2021080/docs/en/navigation-setup
---

The **Navigation Setup** category contains data required to build navigation for the online store.

The table below provides details on Navigation Setup data importers, their purpose, .csv files, dependencies, and other details. Each data importer contains links to .csv files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.


| Data Importer | Purpose | Console Command| File(s) | Dependencies |
| --- | --- | --- | --- |--- |
| **Navigation**   |Imports information about the navigation entities.  |`data:import:navigation` | [navigation.csv](https://documentation.spryker.com/docs/file-details-navigationcsv) |None |
| **Navigation Node**   | Imports information about the navigation nodes. |`data:import:navigation-node` |[ navigation_node.csv](https://documentation.spryker.com/docs/file-details-navigation-nodecsv) | <ul><li>[navigation.csv](https://documentation.spryker.com/docs/file-details-navigationcsv)</li><li>[glossary.csv](https://documentation.spryker.com/docs/file-details-glossarycsv)</li></ul>|

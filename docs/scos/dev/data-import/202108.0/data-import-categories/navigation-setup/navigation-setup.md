---
title: Navigation Setup
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/navigation-setup
originalArticleId: e4091930-69d8-42df-8843-9690fc3aa66c
redirect_from:
  - /2021080/docs/navigation-setup
  - /2021080/docs/en/navigation-setup
  - /docs/navigation-setup
  - /docs/en/navigation-setup
---

The **Navigation Setup** category contains data required to build navigation for the online store.

The table below provides details on Navigation Setup data importers, their purpose, .csv files, dependencies, and other details. Each data importer contains links to .csv files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.


| Data Importer | Purpose | Console Command| File(s) | Dependencies |
| --- | --- | --- | --- |--- |
| **Navigation**   |Imports information about the navigation entities.  |`data:import:navigation` | [navigation.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/navigation-setup/file-details-navigation.csv.html) |None |
| **Navigation Node**   | Imports information about the navigation nodes. |`data:import:navigation-node` |[ navigation_node.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/navigation-setup/file-details-navigation-node.csv.html) | <ul><li>[navigation.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/navigation-setup/file-details-navigation.csv.html)</li><li>[glossary.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-glossary.csv.html)</li></ul>|

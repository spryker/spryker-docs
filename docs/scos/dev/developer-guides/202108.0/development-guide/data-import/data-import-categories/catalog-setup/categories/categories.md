---
title: Categories
originalLink: https://documentation.spryker.com/2021080/docs/categories
redirect_from:
  - /2021080/docs/categories
  - /2021080/docs/en/categories
---

**Categories** contains data required to set up categories in your online store. We have structured this section according to the two .csv files that you will have to use to import the data:

* [category.csv](https://documentation.spryker.com/docs/file-details-categorycsv): allows you to import all relevant information about the categories such as categories names, key, descriptions and additional settings like activating them or allowing customers to search for them.
* [category_template.csv:](/docs/scos/dev/developer-guides/202005.0/development-guide/data-import/data-import-categories/catalog-setup/categories/file-details-ca) allows you to import any category templates.

The table below provides details on Categories data importers, their purpose, .csv files, dependencies, and other details. Each data importer contains links to .csv files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

| Data Importer | Purpose | Console Command| File(s) | Dependencies |
| --- | --- | --- | --- |--- |
| **Category**   | Imports information about product categories definition. |`data:import:category` | [category.csv](https://documentation.spryker.com/docs/file-details-categorycsv)| [category_template.csv](https://documentation.spryker.com/docs/file-details-category-templatecsv)|
| **Category Template**   | Imports information relative to product category templates. |`data:import:category-template` |[category_template.csv](https://documentation.spryker.com/docs/file-details-category-templatecsv) |None|

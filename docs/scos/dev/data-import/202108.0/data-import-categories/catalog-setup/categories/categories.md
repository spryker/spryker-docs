---
title: Categories
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/categories
originalArticleId: b75dadf8-b3bb-4411-a24c-2dfbb178f439
redirect_from:
  - /2021080/docs/categories
  - /2021080/docs/en/categories
  - /docs/categories
  - /docs/en/categories
---

**Categories** contains data required to set up categories in your online store. We have structured this section according to the two .csv files that you will have to use to import the data:

* [category.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/categories/file-details-category.csv.html): allows you to import all relevant information about the categories such as categories names, key, descriptions and additional settings like activating them or allowing customers to search for them.
* [category_template.csv:](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/categories/file-details-category-template.csv.html) allows you to import any category templates.

The table below provides details on Categories data importers, their purpose, .csv files, dependencies, and other details. Each data importer contains links to .csv files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

| Data Importer | Purpose | Console Command| File(s) | Dependencies |
| --- | --- | --- | --- |--- |
| **Category**   | Imports information about product categories definition. |`data:import:category` | [category.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/categories/file-details-category.csv.html)| [category_template.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/categories/file-details-category-template.csv.html)|
| **Category Template**   | Imports information relative to product category templates. |`data:import:category-template` |[category_template.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/categories/file-details-category-template.csv.html) |None|

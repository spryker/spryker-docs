---
title: Categories
last_updated: Aug 27, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v6/docs/categories
originalArticleId: 0ab1b1ed-e3ef-4144-9557-5483d545e2e0
redirect_from:
  - /v6/docs/categories
  - /v6/docs/en/categories
  - /v5/docs/categories
  - /v5/docs/en/categories
---

**Categories** contains data required to set up categories in your online store. We have structured this section according to the two .csv files that you will have to use to import the data:

* [category.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/categories/file-details-category.csv.html): allows you to import all relevant information about the categories such as categories names, key, descriptions and additional settings like activating them or allowing customers to search for them.
* [category_template.csv:](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/categories/file-details-category-template.csv.html) allows you to import any category templates.

The table below provides details on Categories data importers, their purpose, .csv files, dependencies, and other details. Each data importer contains links to .csv files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

| Data Importer | Purpose | Console Command| File(s) | Dependencies |
| --- | --- | --- | --- |--- |
| **Category**   | Imports information about product categories definition. |`data:import:category` | [category.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/categories/file-details-category.csv.html)| [category_template.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/categories/file-details-category-template.csv.html)|
| **Category Template**   | Imports information relative to product category templates. |`data:import:category-template` |[category_template.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/categories/file-details-category-template.csv.html) |None|

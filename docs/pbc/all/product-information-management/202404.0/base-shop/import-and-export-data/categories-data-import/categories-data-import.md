---
title: Categories data import
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/categories
originalArticleId: b75dadf8-b3bb-4411-a24c-2dfbb178f439
redirect_from:
  - /docs/scos/dev/data-import/202311.0/data-import-categories/catalog-setup/categories/categories.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/import-and-export-data/categories-data-import/categories-data-import.html

---

To learn how data import works and about different ways of importing data, see [Data import](/docs/dg/dev/data-import/{{page.version}}/data-import.html). This section describes the data import files that are used to import data related to categories:

* [category.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/categories-data-import/import-file-details-category.csv.html): allows you to import all relevant information about the categories such as categories names, key, descriptions and additional settings like activating them or allowing customers to search for them.
* [category_template.csv:](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/categories-data-import/import-file-details-category-template.csv.html) allows you to import any category templates.

The table below provides details on Categories data importers, their purpose, CSV files, dependencies, and other details. Each data importer contains links to CSV files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

| DATA IMPORTER | PURPOSE | CONSOLE COMMAND | FILE(S) | DEPENDENCIES |
| --- | --- | --- | --- |--- |
| Category   | Imports information about product categories definition. |`data:import:category` | [category.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/categories-data-import/import-file-details-category.csv.html)| [category_template.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/categories-data-import/import-file-details-category-template.csv.html)|
| Category Template   | Imports information relative to product category templates. |`data:import:category-template` |[category_template.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/categories-data-import/import-file-details-category-template.csv.html) |None|
| Category Store | Imports configuration of assignments of categories. | `data:import:category-store` | [category_store.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/categories-data-import/import-file-details-category-store.csv.html) | stores.php |

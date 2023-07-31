---
title: About Data Import Categories
last_updated: Aug 10, 2022
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/about-data-import-categories
originalArticleId: 1ba07d74-e2a7-461c-8eb7-cb1d8b32e9c0
redirect_from:
  - /2021080/docs/about-data-import-categories
  - /2021080/docs/en/about-data-import-categories
  - /docs/about-data-import-categories
  - /docs/en/about-data-import-categories
---

Each functional entity (category) has its own set of data importers. To import data for these categories, you have to run their data importers containing the CSV files with data.
This section provides details about data importers' Demo Shop group categories and their correspondent CSV files. Here you can find information about all the CSV file fields and dependencies, as well as examples and templates of the CSV files.
For details about building your import files, choose the Demo Shop category you want to import data for and follow the information contained therein:

* [Commerce Setup](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/commerce-setup.html): to set up the multi-store environment, glossary, warehouses, tax levels, shipping, and payment methods.
* [Catalog Setup](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/catalog-setup.html): to import all the product-related data necessary for selling products/services in your online store.
* [Special Product Types](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/special-product-types/special-product-types-import-category.html): to import all the necessary data related to the special product types information in the online store. For example, this category includes data about gift cards and product options.
* [Navigation Setup](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/navigation-setup/navigation-setup.html): to import all the necessary data related to the navigation in the online store.
* [Content Management](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/content-management.html): to import all the necessary data related to content elements in the online store.  For example, this category includes data about CMS pages, blocks, and templates.

{% info_block warningBox "Warning" %}

As the data importers’ execution has certain dependencies, you must follow the correct [execution order of data importers](/docs/scos/dev/data-import/{{page.version}}/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html).

{% endinfo_block %}
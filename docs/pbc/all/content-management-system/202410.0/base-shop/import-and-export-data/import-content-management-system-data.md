---
title: Import Content Management System data
description: Learn about the data import files that are used to import data related to the Content Management System in Spryker Cloud Commerce OS.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/content-management
originalArticleId: 07c058ac-4c85-4746-83f2-ae4115aca6f6
redirect_from:
  - /2021080/docs/content-management
  - /2021080/docs/en/content-management
  - /docs/content-management
  - /docs/en/content-management
  - /docs/scos/dev/data-import/202311.0/data-import-categories/navigation-setup/navigation-setup.html
  - /docs/scos/dev/data-import/202108.0/data-import-categories/content-management/content-management.html
  - /docs/scos/dev/data-import/202311.0/data-import-categories/content-management/content-management.html
  - /docs/pbc/all/content-management-system/202311.0/import-and-export-data/import-content-management-system-data.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/import-and-export-data/import-content-management-system-data.html

---

To learn how data import works and about different ways of importing data, see [Data import](/docs/dg/dev/data-import/{{page.version}}/data-import.html). This section describes the data import files that are used to import data related to the Content Management System PBC.

The CMS data import category contains data required to create and manage content elements like CMS pages or blocks.

The table below provides details on Content Management data importers, their purpose, CSV files, dependencies, and other details. Each data importer contains links to CSV files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

| DATA IMPORTER | PURPOSE | CONSOLE COMMAND | FILES | DEPENDENCIES |
| --- | --- | --- | --- |--- |
| CMS Template   | Imports information about CMS templates. |`data:import:cms-template` |[cms_template.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-template.csv.html)|None |
| CMS Slot Template  | Imports information about the CMS slot templates. |`data:import:cms-slot-template` | [cms_slot_template.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-slot-template.csv.html)| None|
| CMS Slot  | Imports information about CMS slots. |`data:import:cms-slot` |[cms_slot.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-slot.csv.html) |None |
| CMS Block  | Imports information about CMS blocks. |`data:import:cms-block` | [cms_block.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-block.csv.html)|None |
| CMS Block Category  |Imports information about CMS block categories. |`data:import:cms-block-category` | [cms_block_category.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-block-category.csv.html)|[cms_block_category_position.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-block-category-postion.csv.html) |
| CMS Block Category Position  |Imports information about CMS block category positions. |`data:import:cms-block-category-position` |[cms_block_category_position.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-block-category-postion.csv.html)|None |
| CMS Slot Block  | Imports information used to set the relations between CMS slots and CMS blocks.|`data:import:cms-slot-block` | [cms_block_store.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-block-store.csv.html)| <ul><li>[cms_slot.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-slot.csv.html)</li><li>[cms_block.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-block.csv.html)</li></ul> |
| CMS Block Store  | Imports information used to link the CMS blocks to specific stores. |`data:import:cms-block-store` | [cms_block_store.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-block-store.csv.html)| <ul><li>[cms_block.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-block.csv.html)</li><li>**stores.php** configuration file of demo shop PHP project</li></ul> |
| CMS Page | Imports information about CMS pages. |`data:import:cms-page` |[cms_page.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-page.csv.html) |[cms_template.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-template.csv.html) |
| CMS Page Store  | Imports information about CMS pages to specific stores. |`data:import:cms-page-store` |[cms_page_store.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-page-store.csv.html) | <ul><li>[cms_page.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-page.csv.html)</li><li>**stores.php** configuration file of demo shop PHP project</li></ul>|
| Content Banner | Imports information used in banners' content. |`data:import:content-banner` |[content_banner.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-content-banner.csv.html) |[glossary.csv](/docs/pbc/all/miscellaneous/{{page.version}}/import-and-export-data/import-file-details-glossary.csv.html) |
| Content Product Abstract List  |Imports information used to import the content related to abstract products.  |`data:import:content-product-abstract-list` |[content_product_abstract_list.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-content-product-abstract-list.csv.html) |[product_abstract.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html)|
| Content Product Set  |Imports information used to load content linked to product sets.  |`data:import:content-product-set` | [content_product_set.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-content-product-set.csv.html)| [product_set.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-set.csv.html)|
| Content Navigation | Imports information used to configure content navigation.|`data:import:content-navigation` | [content_navigation.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-content-navigation.csv.html) | [navigation.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-navigation.csv.html) |
| Navigation | Imports information about the navigation entities. |`data:import:navigation` | [navigation.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-navigation.csv.html) |None |
| Navigation Node | Imports information about the navigation nodes. |`data:import:navigation-node` |[navigation_node.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-navigation-node.csv.html) | <ul><li>[navigation.csv](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-navigation.csv.html)</li><li>[glossary.csv](/docs/pbc/all/miscellaneous/{{page.version}}/import-and-export-data/import-file-details-glossary.csv.html)</li></ul>|


{% info_block warningBox "Import order" %}

Apart from navigation and navigation nodes, the order in which the files are imported is *very strict*. The data importers should be executed in the following order:

1. [CMS Template](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-template.csv.html)
2. [CMS Block](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-block.csv.html)
3. [CMS Block Store](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-block-store.csv.html)
4. [CMS Block Category Position](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-block-category-postion.csv.html)
5. [CMS Block Category](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-block-category.csv.html)
6. [Content Banner](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-content-banner.csv.html)
7. [Content Product Abstract List](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-content-product-abstract-list.csv.html)
8. [Content Product Set](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-content-product-set.csv.html)
9. [CMS Page](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-page.csv.html)
10. [CMS Page Store](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-page-store.csv.html)
11. [CMS Slot Template](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-slot-template.csv.html)
12. [CMS Slot](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-slot.csv.html)
13. [CMS Slot Block](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/import-and-export-data/import-file-details-cms-block-store.csv.html)


{% endinfo_block %}

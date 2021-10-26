---
title: Content Management
last_updated: Sep 14, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v5/docs/content-management
originalArticleId: 30c7f204-d9b9-4b4e-8ace-10f90d5b80b3
redirect_from:
  - /v5/docs/content-management
  - /v5/docs/en/content-management
---

The **Content Management** category contains data required to create and manage content elements, such es CMS pages, blocks, etc. for your online store.

The table below provides details on Content Management data importers, their purpose, .csv files, dependencies, and other details. Each data importer contains links to .csv files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

| Data Importer | Purpose | Console Command| File(s) | Dependencies |
| --- | --- | --- | --- |--- |
| **CMS Template**   | Imports information about CMS templates. |`data:import:cms-template` |[ cms_template.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-template.csv.html)|None |
| **CMS Slot Template**   | Imports information about the CMS slot templates. |`data:import cms-slot-template ` | [cms_slot_template.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-slot-template.csv.html)| None|
| **CMS Slot**   | Imports information about CMS slots. |`data:import cms-slot` |[cms_slot.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-slot.csv.html) |None |
| **CMS Block**   | Imports information about CMS blocks. |`data:import:cms-block` | [cms_block.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-block.csv.html)|None |
| **CMS Block Category**   |Imports information about CMS block categories. |`data:import:cms-block-category` | [cms_block_category.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-block-category.csv.html)|[cms_block_category_position.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-block-category-postion.csv.html) |
| **CMS Block Category Position**   |Imports information about CMS block category positions. |`data:import:cms-block-category-position` |[cms_block_category_position.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-block-category-postion.csv.html)|None |
| **CMS Slot Block**   | Imports information used to set the relations between CMS slots and CMS blocks.|`data:import cms-slot-block` | [cms_block_store.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-block-store.csv.html)| <ul><li>[cms_slot.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-slot.csv.html)</li><li>[cms_block.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-block.csv.html)</li></ul> |
| **CMS Block Store**   | Imports information used to link the CMS blocks to specific stores. |`data:import:cms-block-store` | [cms_block_store.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-block-store.csv.html)| <ul><li>[cms_block.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-block.csv.html)</li><li>**stores.php** configuration file of demo shop PHP project</li></ul> |
| **CMS Page**   | Imports information about CMS pages. |`data:import cms-page` |[cms_page.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-page.csv.html) |[cms_template.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-template.csv.html) |
| **CMS Page Store**   | Imports information about CMS pages to specific stores. |`data:import cms-page-store` |[cms_page_store.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-page-store.csv.html) | <ul><li>[cms_page.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-page.csv.html)</li><li>**stores.php** configuration file of demo shop PHP project</li></ul>|
| **Content Banner**   | Imports information used in banners' content. |`data:import content-banner` |[content_banner.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-content-banner.csv.html) |[glossary.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-glossary.csv.html) |
| **Content Product Abstract List**   |Imports information used to import the content related to abstract products.  |`data:import content-product-abstract-list` |[content_product_abstract_list.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-content-product-abstract-list.csv.html) |[product_abstract.csv ](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/products/file-details-product-abstract.csv.html)|
| **Content Product Set**   |Imports information used to load content linked to product sets.  |`data:import content-product-set ` | [content_product_set.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-content-product-set.csv.html)| [product_set.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/merchandising-setup/product-merchandising/file-details-product-set.csv.html)|



{% info_block warningBox "Import order" %}

The order in which the files are imported is **very strict**. For this reason, the data importers should be executed in the following order:

1. [CMS Template](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-template.csv.html)
2. [CMS Block](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-block.csv.html)
3. [CMS Block Store](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-block-store.csv.html)
4. [CMS Block Category Position](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-block-category-postion.csv.html)
5. [CMS Block Category](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-block-category.csv.html)
6. [Content Banner](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-content-banner.csv.html)
7. [Content Product Abstract List](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-content-product-abstract-list.csv.html)
8. [Content Product Set](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-content-product-set.csv.html)
9. [CMS Page](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-page.csv.html)
10. [CMS Page Store](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-page-store.csv.html)
1. [CMS Slot Template](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-slot-template.csv.html)
2. [CMS Slot](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-slot.csv.html)
3. [CMS Slot Block](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/content-management/file-details-cms-block-store.csv.html)


{% endinfo_block %}

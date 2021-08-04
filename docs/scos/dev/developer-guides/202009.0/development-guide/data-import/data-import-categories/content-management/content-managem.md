---
title: Content Management
originalLink: https://documentation.spryker.com/v6/docs/content-management
redirect_from:
  - /v6/docs/content-management
  - /v6/docs/en/content-management
---

The **Content Management** category contains data required to create and manage content elements, such es CMS pages, blocks, etc. for your online store.

The table below provides details on Content Management data importers, their purpose, .csv files, dependencies, and other details. Each data importer contains links to .csv files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

| Data Importer | Purpose | Console Command| File(s) | Dependencies |
| --- | --- | --- | --- |--- |
| **CMS Template**   | Imports information about CMS templates. |`data:import:cms-template` |[ cms_template.csv](https://documentation.spryker.com/docs/file-details-cms-templatecsv)|None |
| **CMS Slot Template**   | Imports information about the CMS slot templates. |`data:import cms-slot-template ` | [cms_slot_template.csv](https://documentation.spryker.com/docs/file-details-cms-slot-templatecsv)| None|
| **CMS Slot**   | Imports information about CMS slots. |`data:import cms-slot` |[cms_slot.csv](https://documentation.spryker.com/docs/file-details-cms-slotcsv) |None |
| **CMS Block**   | Imports information about CMS blocks. |`data:import:cms-block` | [cms_block.csv](https://documentation.spryker.com/docs/file-details-cms-blockcsv)|None |
| **CMS Block Category**   |Imports information about CMS block categories. |`data:import:cms-block-category` | [cms_block_category.csv](https://documentation.spryker.com/docs/file-details-cms-block-categorycsv)|[cms_block_category_position.csv](https://documentation.spryker.com/docs/file-details-cms-block-category-postioncsv) |
| **CMS Block Category Position**   |Imports information about CMS block category positions. |`data:import:cms-block-category-position` |[cms_block_category_position.csv](https://documentation.spryker.com/docs/file-details-cms-block-category-postioncsv)|None |
| **CMS Slot Block**   | Imports information used to set the relations between CMS slots and CMS blocks.|`data:import cms-slot-block` | [cms_block_store.csv](https://documentation.spryker.com/docs/file-details-cms-block-storecsv)| <ul><li>[cms_slot.csv](https://documentation.spryker.com/docs/file-details-cms-slotcsv)</li><li>[cms_block.csv](https://documentation.spryker.com/docs/file-details-cms-blockcsv)</li></ul> |
| **CMS Block Store**   | Imports information used to link the CMS blocks to specific stores. |`data:import:cms-block-store` | [cms_block_store.csv](https://documentation.spryker.com/docs/file-details-cms-block-storecsv)| <ul><li>[cms_block.csv](https://documentation.spryker.com/docs/file-details-cms-blockcsv)</li><li>**stores.php** configuration file of demo shop PHP project</li></ul> |
| **CMS Page**   | Imports information about CMS pages. |`data:import cms-page` |[cms_page.csv](https://documentation.spryker.com/docs/file-details-cms-pagecsv) |[cms_template.csv](https://documentation.spryker.com/docs/file-details-cms-templatecsv) |
| **CMS Page Store**   | Imports information about CMS pages to specific stores. |`data:import cms-page-store` |[cms_page_store.csv](https://documentation.spryker.com/docs/file-details-cms-page-storecsv) | <ul><li>[cms_page.csv](https://documentation.spryker.com/docs/file-details-cms-pagecsv)</li><li>**stores.php** configuration file of demo shop PHP project</li></ul>|
| **Content Banner**   | Imports information used in banners' content. |`data:import content-banner` |[content_banner.csv](https://documentation.spryker.com/docs/file-details-content-bannercsv) |[glossary.csv](https://documentation.spryker.com/docs/file-details-glossarycsv) |
| **Content Product Abstract List**   |Imports information used to import the content related to abstract products.  |`data:import content-product-abstract-list` |[content_product_abstract_list.csv](https://documentation.spryker.com/docs/file-details-content-product-abstract-listcsv) |[product_abstract.csv ](https://documentation.spryker.com/docs/file-details-product-abstractcsv)|
| **Content Product Set**   |Imports information used to load content linked to product sets.  |`data:import content-product-set ` | [content_product_set.csv](https://documentation.spryker.com/docs/file-details-content-product-setcsv)| [product_set.csv](https://documentation.spryker.com/docs/file-details-product-setcsv)|



{% info_block warningBox "Import order" %}

The order in which the files are imported is **very strict**. For this reason, the data importers should be executed in the following order:

1. [CMS Template](https://documentation.spryker.com/docs/file-details-cms-templatecsv)
2. [CMS Block](https://documentation.spryker.com/docs/file-details-cms-blockcsv)
3. [CMS Block Store](https://documentation.spryker.com/docs/file-details-cms-block-storecsv)
4. [CMS Block Category Position](https://documentation.spryker.com/docs/file-details-cms-block-category-postioncsv)
5. [CMS Block Category](https://documentation.spryker.com/docs/file-details-cms-block-categorycsv)
6. [Content Banner](https://documentation.spryker.com/docs/file-details-content-bannercsv)
7. [Content Product Abstract List](https://documentation.spryker.com/docs/file-details-content-product-abstract-listcsv)
8. [Content Product Set](https://documentation.spryker.com/docs/file-details-content-product-setcsv)
9. [CMS Page](https://documentation.spryker.com/docs/file-details-cms-pagecsv)
10. [CMS Page Store](https://documentation.spryker.com/docs/file-details-cms-page-storecsv)
1. [CMS Slot Template](/docs/scos/dev/developer-guides/202005.0/development-guide/data-import/data-import-categories/content-management/file-details-cm)
2. [CMS Slot](https://documentation.spryker.com/docs/file-details-cms-slotcsv)
3. [CMS Slot Block](https://documentation.spryker.com/docs/file-details-cms-block-storecsv)


{% endinfo_block %}

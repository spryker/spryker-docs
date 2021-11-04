---
title: Importing Demo Shop data
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/importing-demo-shop-data
originalArticleId: a1968540-004c-4768-ba59-aee8ff73e8a7
redirect_from:
  - /2021080/docs/importing-demo-shop-data
  - /2021080/docs/en/importing-demo-shop-data
  - /docs/importing-demo-shop-data
  - /docs/en/importing-demo-shop-data
  - /docs/about-demo-shop-data-import
  - /docs/en/about-demo-shop-data-import
---

To import data into a Spryker Demo Shop, you need to:
1. [Enable the exising data importers](/docs/scos/dev/data-import/{{page.version}}/data-importers-overview-and-implementation.html) or [create your own](/docs/scos/dev/data-import/{{page.version}}/creating-a-data-importer.html).
2. [Populate .csv files with import data](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/about-data-import-categories.html).
3. [Define the correct order of import](/docs/scos/dev/data-import/{{page.version}}/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html).
4. Run either [individual data importers, or in bulk](/docs/scos/dev/data-import/{{page.version}}/importing-data-with-a-configuration-file.html#console-commands-to-run-import). 

This section will help you with this process. Here you will find explanation on the purpose and format of each import file and what combination of import files to use to accomplish common tasks like setting up store configuration or populating the catalog. 
To help you create your import files, we have provided details, examples and templates of the import .csv files structured by categories in the [Data Import Categories](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/about-data-import-categories.html) section.



---
title: Importing Demo Shop data
last_updated: Aug 27, 2020
template: data-import-template
originalLink: https://documentation.spryker.com/v6/docs/importing-demo-shop-data
originalArticleId: 96fe1966-a6ac-4397-a596-57d0bd87de53
redirect_from:
  - /v6/docs/importing-demo-shop-data
  - /v6/docs/en/importing-demo-shop-data
---

To import data into a Spryker Demo Shop, you need to:
1. [Enable the exising data importers](/docs/scos/dev/data-import/{{page.version}}/data-importers-overview-and-implementation.html) or [create your own](/docs/scos/dev/data-import/{{page.version}}/creating-a-data-importer.html).
2. [Populate .csv files with import data](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/about-data-import-categories.html).
3. [Define the correct order of import](/docs/scos/dev/data-import/{{page.version}}/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html).
4. Run either [individual data importers, or in bulk](/docs/scos/dev/data-import/{{page.version}}/importing-data-with-a-configuration-file.html#console-commands-to-run-import). 

This section will help you with this process. Here you will find explanation on the purpose and format of each import file and what combination of import files to use to accomplish common tasks like setting up store configuration or populating the catalog. 
To help you create your import files, we have provided details, examples and templates of the import .csv files structured by categories in the [Data Import Categories](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/about-data-import-categories.html) section.



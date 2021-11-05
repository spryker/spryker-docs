---
title: Data import
description: Easily import your business logic and data, such as Product Information, Customer Base, Categories and many more into the Spryker Commerce OS.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/importer
originalArticleId: 7f50e4ff-4b3f-4ed8-ba02-788107e21036
redirect_from:
  - /2021080/docs/importer
  - /2021080/docs/en/importer
  - /docs/importer
  - /docs/en/importer
  - /v6/docs/importer
  - /v6/docs/en/importer
  - /v5/docs/importer
  - /v5/docs/en/importer
  - /v4/docs/importer
  - /v4/docs/en/importer
  - /v3/docs/importer
  - /v3/docs/en/importer
  - /v2/docs/importer
  - /v2/docs/en/importer
  - /v1/docs/importer
  - /v1/docs/en/importer
  - /docs/scos/dev/sdk/201811.0/data-import.html
  - /docs/scos/dev/sdk/201903.0/data-import.html
  - /docs/scos/dev/sdk/201907.0/data-import.html
  - /docs/scos/dev/sdk/202001.0/data-import.html
  - /docs/scos/dev/sdk/202005.0/data-import.html
  - /docs/scos/dev/sdk/202009.0/data-import.html
  - /docs/scos/dev/sdk/202108.0/data-import.html
related:
  - title: About Demo Shop Data Import
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/importing-demo-shop-data.html
  - title: Execution Order of Data Importers in Demo Shop
    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html
  - title: About Data Import Categories
    link: docs/scos/dev/data-import/page.version/data-import-categories/about-data-import-categories.html
  - title: Importing Data with the Queue Data Importer
    link: docs/scos/dev/data-import/page.version/importing-data-with-the-queue-data-importer.html
---

Easily import your business logic and data, such as Product Information, Customer Base, Categories, and many more into the Spryker Commerce OS.

The* Data Import* feature allows you to configure what you need to import. You don't need to import all data that is available in Spryker OS out of the box. Instead, you can define what data you want to import for your project using a YAML configuration file. See [Importing data with a configuration file](/docs/scos/dev/data-import/{{site.version}}/importing-data-with-a-configuration-file.html) for details on how you can do that.
{% info_block infoBox "Data import help" %}

To help you build your import files, define the correct order of the data importers to run, there is the [Data import documentation](/docs/scos/dev/data-import/{{site.version}}/data-import-categories/about-data-import-categories.html) for your reference. Consult it whenever you need to import data into your project.

{% endinfo_block %}

The main benefits of the Data Import feature are:

* Allows for flexibility to set up initial data and update new information using configuration (YAML) file as a parameter of the `data:import console` command.
* Presupposes batch data files import, allowing to change sequence order, without changing the project’s source code.
* Reduces new projects time-to-market due to a high agility to run frequent data updates.
* Increases business people autonomy (online store manager, purchasing agent, warehouse manager, analyst, etc.), as the data changes are handled flexibly.

**What's next?**

* For an overview and implementation details of the Spryker data importers, see [Data importers overview and implementation](/docs/scos/dev/data-import/{{site.version}}/data-importers-overview-and-implementation.html).
* To create your own data importer, see [Creating a data importer](/docs/scos/dev/data-import/{{site.version}}/creating-a-data-importer.html).
* To import the Demo Shop data, see [Importing Demo Shop data](/docs/scos/dev/data-import/{{site.version}}/demo-shop-data-import/importing-demo-shop-data.html) and[ About data import categories](/docs/scos/dev/data-import/{{site.version}}/data-import-categories/about-data-import-categories.html).
* To import data with a YAML configuration file, see [Importing data with a configuration file](/docs/scos/dev/data-import/{{site.version}}/importing-data-with-a-configuration-file.html).

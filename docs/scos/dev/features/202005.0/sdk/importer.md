---
title: Data Import
originalLink: https://documentation.spryker.com/v5/docs/importer
redirect_from:
  - /v5/docs/importer
  - /v5/docs/en/importer
---

Easily import your business logic and data, such as Product Information, Customer Base, Categories, and many more into the Spryker Commerce OS.

The Spryker Data Import feature allows you to configure what you need to import. You don't need to import all data that is available in Spryker OS out of the box. Instead, you can define what data you want to import for your project using a YAML configuration file. See [Importing Data with a Configuration File](https://documentation.spryker.com/docs/en/importing-data-with-configuration-file) for details on how you can do that.
{% info_block infoBox "Data Import Help" %}

To help you build your import files, define the correct order of the data importers to run, we have prepared the [Data Import documentation](https://documentation.spryker.com/docs/en/about-data-import-categories) for your reference. Please consult it whenever you need to import data into your project.

{% endinfo_block %}

The Data Import feature has quite a few benefits, as it:

* Allows for flexibility to set up initial data and update new information using configuration (YAML) file as a parameter of the `data:import console` command.
* Presupposes batch data files import, allowing to change sequence order, without changing the project’s source code.
* Reduces new projects time-to-market due to a high agility to run frequent data updates.
* Increases business people autonomy (online store manager, purchasing agent, warehouse manager, analyst, etc.), as the data changes are handled flexibly.

**What's next?**

* For an overview and implementation details of the Spryker data importers, see [Data Importers Overview and Implementation](https://documentation.spryker.com/docs/en/data-importers-review-implementation).
* To create your own data importer, see [Creating a Data Importer](https://documentation.spryker.com/docs/en/ht-data-import).
* To import the Demo Shop data, see [About Demo Shop Data Import](https://documentation.spryker.com/docs/en/about-demo-shop-data-import) and[ About Data Import Categories](https://documentation.spryker.com/docs/en/about-data-import-categories).
* To import data with a YAML configuration file, see [Importing Data with a Configuration File](https://documentation.spryker.com/docs/en/importing-data-with-configuration-file).



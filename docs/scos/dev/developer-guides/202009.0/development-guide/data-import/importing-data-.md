---
title: Importing Data with a Configuration File
originalLink: https://documentation.spryker.com/v6/docs/importing-data-with-configuration-file
redirect_from:
  - /v6/docs/importing-data-with-configuration-file
  - /v6/docs/en/importing-data-with-configuration-file
---

To quickly populate your shop system with data such as product information, customers, categories, etc., you can import it from the .csv files. To import your data, you can use [console commands](https://documentation.spryker.com/docs/importing-data#console-commands-to-run-import) to either run an individual data importer or import multiple data in bulk.
{% info_block infoBox "Info" %}

Before you can use console commands to run import, you need to identify and, if needed, [enable an existing data importer](https://documentation.spryker.com/docs/data-importers-review-implementation) you want to use or [create a new one](https://documentation.spryker.com/docs/ht-data-import).

{% endinfo_block %}

To **import individual data**, you need to run `console data:import:{data_entity}` where `{data_entity}` is a specific data importer in the default .yml configuration file (explained in this section below). See [Console Commands to run Import](https://documentation.spryker.com/docs/importing-data#console-commands-to-run-import) and description of `console data:import:{data_entity}` for details on the command.

There are two ways of how you can **run import in bulk**:

* Import all data specified in the default .yml import configuration file.
* Import data specified in a custom .yml import configuration file.

As you can see, for both of the import types you need a **data import .yml configuration file**.  The .yml import configuration file defines the data importers that will be executed (`data_entity: {data_type_value_1}`), as well as indicates the path to a .csv file with the import data (`source: {source_value_1}`). 

{% info_block infoBox "Info" %}

If the source is not specified, then the .csv file defined in the module’s configuration file will be used. For example, for the [StockDataImport](https://github.com/spryker/stock-data-import/tree/aff1b706e7a0fb0db441b13d5c6a471e4d75cb49/src/Spryker/Zed/StockDataImport) module the .csv import file is defined in [StockDataImportConfig.php](https://github.com/spryker/stock-data-import/blob/aff1b706e7a0fb0db441b13d5c6a471e4d75cb49/src/Spryker/Zed/StockDataImport/StockDataImportConfig.php).

{% endinfo_block %}

Example of a .yml file:

```
actions:
  - data_entity: customer
    source: data/import/customer.csv
  - data_entity: product-abstract
    source: data/import/icecat_biz_data/product_abstract.csv
  - data_entity: product-concrete
    source: data/import/icecat_biz_data/product_concrete.csv
  - data_entity: product-relation
    source: data/import/product_relation.csv
```
{% info_block infoBox "Info" %}

Importers listed in the .yml file are run in the same order as in the .yml file. So for the example above, the order of import would be:

1. customer
2. product-abstract
3. product-concrete
4. product-relation

{% endinfo_block %}

## Default .yml Import Configuration File
The Spryker Commerce OS has the default .yml configuration files that include all importers you typically need for your shop. They reside in `data/import/common` and group importers of specific functional entities. For example, [catalog_setup_import_config.yml](https://github.com/spryker-shop/suite/blob/master/data/import/common/catalog_setup_import_config_US.yml) contains a group of importers with product-related data you need to create a product catalog and start selling products.

For your shop, you can create your own default .yml import configuration file and specify a path to it in `DataImportConfig::getDefaultYamlConfigPath()`. This .yml file will be used as the default one every time you run console data:import. See [Console Commands to run Import](https://documentation.spryker.com/docs/importing-data#console-commands-to-run-import) and description of `console data:import` for details on the command.

## Custom .yml Import Configuration File

Of course, you don’t always need to use the default .yml file and import everything it contains. When you want to import some specific importers without importing everything from the default .yml file, you can create a .yml file, which will include just the importers you need. You don’t need to put the .csv files for import to a specific place. Instead, you just specify a correct path to them in the `source`. Also, you can perform import in batch, which means you can run the same data importer with different data. For example, your custom .yml file may look like this:

```
actions:
  - data_entity: tax
    source: ./my_tax.csv
  - data_entity: tax
    source: ./my_tax2.csv
  - data_entity: product-abstract
    source: ./myprojects/customerA/product.csv
  - data_entity: shipment
    source: ./data/shipment.csv
```
The order of import for the above example will be:

1. tax (*my_tax.csv*)
2. tax (*my_tax2.csv*)
3. product-abstract (*product.csv*)
4. shipment (*shipment.csv*)

Whenever you need to import some data, all you need to change is your .yml file by defining the new data importer. You don’t need to change anything in the code.

{% info_block infoBox "Info" %}

Keep in mind that some importers depend on the data from the other ones. For example, you can not import Product Concretes, unless there are no data on Product Abstracts in the database. Therefore, make sure to check individual database relations or dependencies in[ About Demo Shop Data Import ](https://documentation.spryker.com/docs/about-data-import-categories) before running specific importers.

{% endinfo_block %}

You can also create subgroups for your data importers. For example, you can have a file `product_catalog.yml` where you would group all data importers related to the product catalog creation.

To use the custom .yml file, a separate command is `run: console data:import --config=xxx/ccc/file-name.yml`. See [Console Commands to run Import](https://documentation.spryker.com/docs/importing-data#console-commands-to-run-import) and description of `console data:import --config=xxx/ccc/file-name.yml` for details on the command.

## Console Commands to run Import

To run the import, you can use the following commands:

| Command name | Command description | What happens when running the command |
| --- | --- | --- |
| `console data:import` | The command triggers import of all import data specified in the default .yml import configuration files. The .yml import configuration files represent a set of data importers and contain a list of .csv files to import. Each .yml file groups .csv files of a specific functional entity. </br>For example, [data/import/common](https://github.com/spryker-shop/suite/tree/master/data/import/common) contains default .yml] files for import. The .yml files in their turn contain a list of .csv import files. For example, there are the .yml files like:</br><ul><li>…</li><li>[catalog_setup_import_config_US.yml](https://github.com/spryker-shop/suite/blob/master/data/import/common/catalog_setup_import_config_US.yml) containing files<ul><li>category_template.csv</li><li>category.csv</li><li>product_attribute_key.csv</li><li>… </li></ul></li><li>…</li><li>[content_management_import_config_US.yml](https://github.com/spryker-shop/suite/blob/master/data/import/common/content_management_import_config_US.yml) containing files<ul><li>cms_template.csv</li><li>cms_block.csv</li><li>cms_block_store.csv</li><li> …</li></ul></li><li>…</li></ul>The default .yml files define the order in which all the .csv files are imported as well as specify their location.<section contenteditable="false" class="errorBox"><div class="content"> For information on location of the default .yml and .csv files on the project level, see [Location of the .yml and .csv files](https://documentation.spryker.com/docs/importing-data#location-of-the--yml-and--csv-files). </div></section>| **All** .csv files are imported in the order they are represented in the default .yml files, from top to bottom.  |
| `console data:import:{data_entity}` where `{data_entity}` is a specific `data_entity` in the default .yml file. | The command triggers import of data from all.csv files that refer to the specified `data_entity` of a default .yml file. | Imports **all .csv files** in the default .yml file defined as source for the specific `data_entity`. For example, you can have a .yml file like this:![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Importing+Data/yml+sample.png) After running console `data:import:tax`, data from `tax1.csv` and `tax2.csv` will be imported. |
| `console data:import:<data_entity> --config=xxx/ccc/file-name.yml`, where `data_entity` is a specific `data_entity` in the custom .yml file and `xxx/ccc/file-name.yml` is the location of the custom .yml file. | The command triggers import of data from all.csv files that refer to the specified `data_entity` of a custom .yml file. | Imports **all .csv files** in the custom .yml file defined in `source` for the specific `data_entity`. |
| `console data:import --config=xxx/ccc/file-name.yml`, where `xxx/ccc/file-name.yml` is the location of the custom .yml file. | The command tells the system to run the specific custom .yml file instead of the default ones. | The .yml file specified in this command is used as the import configuration file. The default .yml files are ignored.</br>**All** .csv files contained in the custom .yml file are imported. The import is done in the order as in the .yml file, from top to bottom. |
| `console data:import --config=xxx/ccc/file-name.yml -t`, where `xxx/ccc/file-name.yml`  is the location of the [.yml file with the combined product data](https://documentation.spryker.com/docs/importing-product-data-with-a-single-file#-yml-configuration-file-for-product-data-import). |The command triggers bulk import of [all product-related data](https://documentation.spryker.com/docs/importing-product-data-with-a-single-file) that refer to all `data_entity` items in the .yml file with the combined product data.| Imports all data from the [combined product data import .csv file](https://documentation.spryker.com/docs/importing-product-data-with-a-single-file#single--csv-file-for-combined-product-data-import). Location of the .csv file is specified in `source` of each `data_entity`. |
| `console data:import {data_entity} --config=xxx/ccc/file-name.yml -t`, where `{data_entity}` is the `data_entity` in the [.yml file with the combined product data](https://documentation.spryker.com/docs/importing-product-data-with-a-single-file#-yml-configuration-file-for-product-data-import), and `xxx/ccc/file-name.yml` is the location of the .yml file. |The command triggers import of the specific `data_entity` from the .yml file with the [combined product data](https://documentation.spryker.com/docs/importing-product-data-with-a-single-file).|Imports the specific data from the [combined product data import .csv file](https://documentation.spryker.com/docs/importing-product-data-with-a-single-file#single--csv-file-for-combined-product-data-import). Location of the .csv file is specified in `source` of the `data_entity`.|

## Location of the .yml and .csv Files
When running the `console data:import` command, you tell the system to import .csv files from all the default .yml import configuration files. The table below shows where those files reside in the Spryker Commerce OS by default, and where you can define their location on the project level.

|  | Location of the default YAML import configuration files | Location of .csv files listed in the default YAML configuration files |
| --- | --- | --- |
| Spryker Commerce OS | …data/import/common/</br>Example: [Master Suite repository](https://github.com/spryker-shop/suite/tree/master/data/import/common) | …data/import/common/common/</br>Example: [Master Suite repository](https://github.com/spryker-shop/suite/tree/master/data/import/common/common) |
| Project Level | In `src/Pyz/Zed/DataImport/DataImportConfig.php`, method `getDefaultYamlConfigPath()` defines the default location of the default YAML files | For the custom project-level importers, there are no default .csv files, so the path to the .csv files is defined only in the YAML import files. This means, if the source is not specified, the file will not be imported. |

---
title: Import products
description: {Meta description}
template: howto-guide-template
---

This document describes Spryker product data import operations, architecture and concepts,
it is especially helpful for developers, architects, and integrators dealing with the Spryker Commerce OS to understand the product data import process.

{% info_block warningBox "Prerequisites" %}

Before you can import all main product data, make sure that product [importer is enabled](/docs/scos/dev/data-import/{{page.version}}/data-importers-overview-and-implementation.html#implementation-overview) in your project.

Structure of the product data import files can be checked at [Products data import](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/products-data-import.html)

{% endinfo_block %}

## Out-of-the-box product data import

* [Regular Data Import](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/import-products.html#regular-data-import)
* [Queue Data Import](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/import-products.html#queue-data-import)
 
### Regular Data Import

The following diagram demonstrates the regular data import flow.

<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;Electron\&quot; modified=\&quot;2023-02-15T05:47:34.036Z\&quot; agent=\&quot;5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) draw.io/20.8.16 Chrome/106.0.5249.199 Electron/21.4.0 Safari/537.36\&quot; etag=\&quot;LT9JFjYXWKyvMpLcHiaB\&quot; version=\&quot;20.8.16\&quot; type=\&quot;device\&quot;&gt;&lt;diagram name=\&quot;Page-1\&quot; id=\&quot;yy4N7UsV9sdgqqAc-PFv\&quot;&gt;3Vhdb5swFP01eWwEJpDwuCTdOq2TqmZVu71MDhjwajAyTpP0188GEzAfaTplSdv0ob4H2+Bz7rk2DKxZvPnCYBp9pz4iA2D4m4E1HwBgghEQ/ySyLZCJ4RRAyLCvOlXAAj8jBRoKXWEfZVpHTinhONVBjyYJ8riGQcboWu8WUKLfNYUhagELD5I2eo99HqlVgHGFXyEcRuWdTcctrsSw7KxWkkXQp+saZF0OrBmjlBeteDNDRJJX8lKM+9xzdfdgDCX8kAFXj/cL8+pHsLwD7q+76W87db9dWOrZ+LZcMPLF+lVIGY9oSBNILit0yugq8ZGc1RBR1eea0lSApgD/IM63Sky44lRAEY+Juoo2mD/U2j/lVENbRfONmjkPtmWQcLZ9qAe1UTKshuVROa5Yn1xUL20KyuiKeWgPV2X6QRYivqcf2IkrXIFojMTziHEMEcjxk/4cUKVnuOtXKSgaSsRXCDoq5n2CZKXuNIccCuQrR3Gn2NdwKTyrCQQJDhPR9gRHiAngCTGOhSk+qQsx9v0iF1CGn+Eyn0/SnVKc8HxN9nRgz3cCyAnQZtDhWDW48kldmv6cbfOrZjeGxmisaoyqOReqBh2sgJr8Ri6m1oUGQSaUb0q0e4Z/V83sU21RJGVTN1FLUtn0Ra+MUyalWEeYo0UK8xxei2qsaxpgQmaUUJbPYPkQTQJP4Bln9BHVrjjeBC2Dfcq1zNMrhmkZmhLAVvG6VksVFNXKaIkd3R6Td1fvLmRC6zXPmlgvVL08ukEMC9akgY9dCsGBpXB8zlII+kx1i6AvWGlmgq7z6+wU2PJP4jThNbz4ddos/x3HZsAd6TZz2jYzQYfPnP/ls/L4diajDQ2gec3JNdjjNhE07fIGThz2gTZzz2kzu2Wz9naVJ395fga6aOVeFm9C+QoxDAhdexFkfOhTbxUL0kCPHbMiD4whsI/jo9Hk5e3KNE7pI+cDkTtukjs5M7njFrkLjsR7JTCmktL2DvFuqHYaVDvjM1NttvP2rR+8zlf23QPLvtmTBaep+27f8eqeYf6hjlcOOKBynfZ41fHCOG2Xq3fyljhubrujNr8nfUs0rRa9tyhcESiy2ii/p8SpqEgtzgULvLEvaNQlNEENnhV0+EeXLg11dx1jD7FtTRTT7TgLWR2qWK9XRYTVd9Dim0r1Ndm6/As=&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>

Import data from CSV files is the Default way of importing products into your shop, we have 2 options:

* Regular Data Import
* Single File Import

#### Regular Import
Regular import has import file per specific entity, to import products data you need to:

* Populate [CSV files for product data import](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/import-products.html#csv-files-for-regular-product-data-import)
* Prepare a [YML file](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/import-products.html#yml-configuration-file-for-product-data-import) with `data_entity` items for import.
* Run a [console commands for product data import](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/import-products.html#console-commands-for-regular-data-import)

##### CSV files for regular product data import

The **Products** category contains all products-related data you need to manage and sell products in your online store.

* [product_attribute_key.csv](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/file-details-product-attribute-key.csv.html): allows you to define whether specific attributes should be considered super attributes.
* [product_management_attribute.csv](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/file-details-product-management-attribute.csv.html): allows you to define additional product attributes, including type of attribute (text or number), as well as set custom and multiple values.
* [product_abstract.csv](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/file-details-product-abstract.csv.html): includes the information needed for setting up abstract products and encompasses a wide range of information such as names, categories, attributes, descriptions, keywords, tax rates, etc.
* [product_abstract_store.csv](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/file-details-product-abstract-store.csv.html): in the case of multi-store setups, allows you to define in which stores you wish to sell those abstract products.
* [product_concrete.csv](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/file-details-product-concrete.csv.html): allows you to import concrete product information, including their descriptions, attributes' values, searchability, relations to abstract products, and more information.
* [product_image.csv](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/file-details-product-image.csv.html): allows you to import the images of the concrete products, local ones, as well as the ones via URLs.

The table below provides details on Products data importers, their purpose, CSV files, dependencies, and other details. Each data importer contains links to CSV files used to import the corresponding data, including specifications of mandatory and unique fields, dependencies, detailed explanations, recommendations, templates, and content examples.

| DATA IMPORTER | PURPOSE | CONSOLE COMMAND | FILES | DEPENDENCIES |
| --- | --- | --- | --- |--- |
| Product Attribute Key   | Imports information relative to product attribute super attribute identification. |`data:import:product-attribute-key` |[product_attribute_key.csv](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/file-details-product-attribute-key.csv.html) |None |
| Product Management Attribute  | Imports information to configure settings of additional product attributes. |`data:import:product-management-attribute` |[product_management_attribute.csv](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/file-details-product-management-attribute.csv.html) |[product_attribute_key.csv](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/file-details-product-attribute-key.csv.html) |
| Product Abstract  |Imports information about the abstract products.  |`data:import:product-abstract` |[product_abstract.csv](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/file-details-product-abstract.csv.html) | [category.csv](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/categories-data-import/file-details-category.csv.html)|
| Product Abstract Store | Imports information that links the abstract products with the available stores of the shop.  |`data:import:product-abstract-store` |[product_abstract_store.csv](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/file-details-product-abstract-store.csv.html) |<ul><li>[product_abstract.csv](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/file-details-product-abstract.csv.html)</li><li>*stores.php* configuration file of demo shop PHP project</li></ul> |
| Product Concrete   |Imports information about the concrete products.<br>Every concrete product is linked to an abstract product.  |`data:import:product-concrete` |[product_concrete.csv](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/file-details-product-concrete.csv.html) |[product_abstract.csv](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/file-details-product-abstract.csv.html) |
| Product Image  |Imports information about product images.  |`data:import:product-image` |[product_image.csv](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/file-details-product-image.csv.html) | <ul><li>[product_abstract.csv](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/file-details-product-abstract.csv.html)</li><li>[product_concrete.csv](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/products-data-import/file-details-product-concrete.csv.html)</li></ul>(Each image needs to be assigned to an SKU from either one of these files).|

##### YML configuration file for product data import
<a href="#yml-configuration-file-for-product-data-import"></a>

The YML configuration file for product data import allows sequentially running importers for product data. This file can be used to import all product-related data sets, or just some of them. See [Console Commands for Product Data Import](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/import-products.html#console-commands-for-regular-data-import) for details.

The `data_entity` names in the YML file match the data importer name:

```yml
...
actions:
  - data_entity: category-template
    source: data/import/common/common/category_template.csv
  - data_entity: category
    source: data/import/common/common/category.csv
  - data_entity: product-attribute-key
    source: data/import/common/common/product_attribute_key.csv
  - data_entity: product-management-attribute
    source: data/import/common/common/product_management_attribute.csv
  - data_entity: product-abstract
    source: data/import/common/common/product_abstract.csv
  - data_entity: product-concrete
    source: data/import/common/common/product_concrete.csv
  - data_entity: product-image
    source: data/import/common/common/product_image.csv
  - data_entity: product-price
    source: data/import/common/DE/product_price.csv
  - data_entity: product-price
    source: data/import/common/AT/product_price.csv
  - data_entity: product-price-schedule
    source: data/import/common/DE/product_price_schedule.csv
  - data_entity: product-price-schedule
    source: data/import/common/AT/product_price_schedule.csv
  - data_entity: product-abstract-store
    source: data/import/common/DE/product_abstract_store.csv
  - data_entity: product-abstract-store
    source: data/import/common/AT/product_abstract_store.csv
  - data_entity: product-stock
    source: data/import/common/common/product_stock.csv
  - data_entity: product-approval-status
    source: data/import/common/common/product_abstract_approval_status.csv
  - data_entity: product-configuration
    source: data/import/common/common/product_configuration.csv
  - data_entity: category-store
    source: data/import/common/DE/category_store.csv
  - data_entity: category-store
    source: data/import/common/AT/category_store.csv
...
```

By default, the configuration YML file resides in `data/import/common`.  You can use [product import config full_EU.yml](https://github.com/spryker-shop/suite/blob/master/data/import/local/full_EU.yml) file in Spryker Master Suite as a reference.

##### Console commands for regular data import

To import all product-related data from the YML configuration command, run the command console data:import --config=xxx/ccc/file-name.yml -t, where xxx/ccc/file-name.yml is the location of the YML file with the product data.

To import data for a specific entity only, specify the data_entity name after data:import in the command above. For example, if you want to import data for product-abstract data entity only, your command should like this: console data:import product-abstract --config=xxx/ccc/file-name.yml -t.

#### Single File Import

Besides importing product-related data with multiple .csv files, you can use a single product data import file. Configuration and usage of [Single File Import described here](/docs/pbc/all/product-information-management/{{page.version}}/import-and-export-data/import-product-data-with-a-single-file.html#single-csv-file-for-combined-product-data-import).

### Queue Data Import

Queue data import allows you to import data via message queues, which allows fast transmitting large amount of data, 
consume messages in parallel by multiple consumers using round-robin, process messages in bulks and unlocks horizontal scaling. Mainly it used to
import large amount of data in parallel. 

Queue data import is designed to be done in two separate steps:

* Data is relocated from the original data source into the queues.
  * Each resource, like abstract product data, is imported into a dedicated queue without pre-processing.
* Data in a queue is consumed and imported into a persistent storage (database).

<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;Electron\&quot; modified=\&quot;2023-02-15T07:36:26.997Z\&quot; agent=\&quot;5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) draw.io/20.8.16 Chrome/106.0.5249.199 Electron/21.4.0 Safari/537.36\&quot; etag=\&quot;kl0Sshvx9NBV4XP3HPzM\&quot; version=\&quot;20.8.16\&quot; type=\&quot;device\&quot;&gt;&lt;diagram name=\&quot;Page-1\&quot; id=\&quot;A5YDloiiKbCL8XnCIZzp\&quot;&gt;7Vpbc5s4FP41fqwHSYDxY2PS3U4v010/bPvUkUGAWkCMEDH2r19hhLnI9jipE+rU9kzMObogfZ++c4TCBC2S8i+Os+gT80k8gYZfTpA7gRAAYMqfyrOpPQ4AtSPk1FeVWseSbolyGspbUJ/kvYqCsVjQrO/0WJoST/R8mHO27lcLWNy/a4ZDojmWHo5173/UF5GaBZy1/r8JDaPmzsCe1yUJbiqrmeQR9tm640L3E7TgjIn6KikXJK7Aa3Cp2707UrofGCepOKeBmxXwLfpebomfbT/8jN1F/vmNpcYmNs2EiS/nr0zGRcRCluL4vvXecVakPql6NaTV1vnIWCadQDp/ECE2ikxcCCZdkUhiVSoHzDdfVfud8a0yplZjumW30N0oqx5rNcCjEChXzgrukRPzbpYS5iERJ+rBPVFyhROWEDke2Y6TGAv60B8HVkst3Ndr2ZAXipBHkGPfyDlJDhqTnNmNnJPkmGOS49T9PuC4UHf6RPJcxur8IGsf8UqmrR7SOKZhKq89CRDh0vFAuKAyL7xVBQn1/ZpUktMtXu36q7DOGE3FbkLW3cRy9+hXHZCyN2+VtFTjNlV0eTm++HRwVe9v5IKYzxQGKu+i2jobftX5l2oynSosCHJJ+5Cf/RieThnQKPunIPJyyBfOszrPB7SspNQlTYdeo5Emu4R/F7BUKJkB2PpdmoRy+DFdyb94W3BSzTQkKeFYTuHdUjAuK37fjW2aP4Sn6NXkdZQx0DCv2IKOstftnsNWO6mos92w4DMJaB8OXja8lVR87Vx3gpu02thWGU1oe2pI3FlfCKcSsGplXDpOwjPjJBg1UMJjqjNcLLD8+ZdgX8IzXAx9qtcRFWSZ4R0ga/kg0Kc1oHG8YDHju7YosKqv0mDHX3+kPxec/SSdEnv3uYzU4NzsS82o1spQbHtB9tRmPBcL6Ka2X1MbOldtRzLny6gN3dTmgLG1Zt609mtaM8/UWueUYwStmX+81pCNxs9s45xhPEVt0hiK5nd43D53HwmtMdXWDLMjN434evE3p6iwT1ke4ayql5RhdZA8DWK29iLMxdRnXpFI3OAROeb1KjCm0LqMjqzBwxhw5gd05ByQkYmeC15953C98IIBvHN7dHj1ZLEUJMula1WBqmeJqwHbGBwsGObYYMNxTk4PpoTZdeYE6zpygvWKgtbwgG6mH9C9bMiyXxG4YAjubGRwZ39MPnDGzgbO75MN4HVmA+c6soH+P7nrVdEgGyALjr2rAvNXBC8Ywjv6A1hD+OvPCMiejQ62vnF073SAFYY+FjgXjJNHH9f5mDiBd/BYznPIKrgMwLYz3N1ADV77ALz2s53J6aFicDT6PslkUtUQlxiIwTruAZeylAxQVq7z36Y4xGA/3V+AEjSgBFj6bh6YBzhBj+dEmu07fvXLEu2bkuj+fw==&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>

Regular data import is a synchronous process. It allows data import facilities to process one data item at a time and thus cannot be scaled automatically, you have to split your data file into several files.
Queue data import is the alternative to the regular Spryker’s data import functionality. Its main benefit comes from the asynchronous nature of the queues (message processing) themselves. However, you should consider potential data consistency issues.

How to integrate and configure Queue Data Import:
* [Queue Data Import feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/queue-data-import-feature-integration.html)
* [Tutorial: Replacing a default data importer with the queue data importer](/docs/scos/dev/tutorials-and-howtos/advanced-tutorials/tutorial-replacing-a-default-data-importer-with-the-queue-data-importer.html)
* [Importing data with the queue data importer](/docs/scos/dev/data-import/{{page.version}}/importing-data-with-the-queue-data-importer.html#why-do-you-need-it)

<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>
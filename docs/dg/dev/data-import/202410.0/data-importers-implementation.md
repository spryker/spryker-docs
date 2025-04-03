---
title: Data importers implementation
description: This article includes the list of data importers provided in Spryker Commerce OS.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/data-importers-review-implementation
originalArticleId: de408e22-7a9b-40ee-a4db-449a86b48f83
redirect_from:
  - /docs/scos/dev/data-import/202404.0/data-importers-overview-and-implementation.html
  - /docs/scos/dev/back-end-development/data-manipulation/data-ingestion/data-importers/data-importers-overview-and-implementation.html
  - /docs/scos/dev/data-import/202204.0/data-importers-overview-and-implementation.html
---

Currently, there are the following importers in Spryker Commerce OS:

* Product Alternative Importer **(Beta)** - **B2B/B2C**
* Product Discontinued Importer **(Beta)** - **B2B/B2C**
* Product Packaging Unit Importer **(Beta)** - **B2B/B2C**
* Combined Product - **B2B/B2C**
* Company Importer **(Beta)** - **B2B/B2C**
* Company Business Unit Importer **(Beta)** - **B2B/B2C**
* Company Unit Address Importer **(Beta)** - **B2B/B2C**
* Company Unit Address Label Importer **(Beta)** - **B2B/B2C**
* Company User on Behalf Importer **(Beta)** - **B2B/B2C**
* Multi-Cart Importer **(Beta)** - **B2B/B2C**
* Shared Cart Importer **(Beta)** - **B2B/B2C**
* Shopping List Importer **(Beta)** - **B2B/B2C**
* Shopping List Company Business Unit Importer **(Beta)** - **B2B/B2C**
* Shopping List Company User Importer **(Beta)** - **B2B/B2C**
* Shopping List Item Importer **(Beta)** -**B2B/B2C**
* Product Abstract Importer - **B2B/B2C**
* Product Abstract Store Importer - **B2B/B2C**
* Product Concrete Importer - **B2B/B2C**
* Product Price Importer - **B2B/B2C**
* Product Image Importer - **B2B/B2C**
* Product Stock Importer - **B2B/B2C**
* Product Review Importer - **B2B/B2C**
* Product Relation Importer - **B2B/B2C**
* Product Attribute Key Importer - **B2B/B2C**
* Product Group Importer - **B2B/B2C**
* Product Label Importer - **B2B/B2C**
* Product Management Attribute Importer - **B2B/B2C**
* Product Option Importer - **B2B/B2C**
* Product Option Price Importer - **B2B/B2C**
* Product Relation Importer - **B2B/B2C**
* Product Search Attribute Importer - **B2B/B2C**
* Product Search Attribute Map Importer - **B2B/B2C**
* Product Set Importer - **B2B/B2C**
* Category Template Importer - **B2B/B2C**
* CMS Block Importer - **B2B/B2C**
* CMS Block Category Importer - **B2B/B2C**
* CMS Block Category Position Importer - **B2B/B2C**
* CMS Block Store Importer - **B2B/B2C**
* CMS Page Importer - **B2B/B2C**
* CMS Slot Templates Importer - **B2B/B2C**
* CMS Slots Importer - **B2B/B2C**
* CMS Slot-Block Relationship Importer - **B2B/B2C**
* CMS Template Importer - **B2B/B2C**
* Abstract Product List Content Item Importer - **B2B/B2C**
* Product Set Content Item Importer - **B2B/B2C**
* Banner Content Item Importer - **B2B/B2C**
* Company Unit Address Label Relation Importer - **B2B/B2C**
* Currency Importer - **B2B/B2C**
* Customer Importer - **B2B/B2C**
* Discount Importer - **B2B/B2C**
* Discount Amount Importer - **B2B/B2C**
* Discount Store Importer - **B2B/B2C**
* Discount Voucher Importer - **B2B/B2C**
* Glossary Importer - **B2B/B2C**
* Navigation Importer - **B2B/B2C**
* Navigation Node Importer - **B2B/B2C**
* Order Source Importer - **B2B/B2C**
* Shipment Importer - **B2B/B2C**
* Shipment Price Importer - **B2B/B2C**
* Stock Importer - **B2B/B2C**
* Tax Importer - **B2B/B2C**
* Payment Method Importer - **B2B/B2C**
* Shipment Store Importer - **B2B/B2C**

Each of the importers can be executed one by one with the separate command (for example, `./vendor/bin/console data:import:product-abstract`).

However, if you want to execute specific import types **in bulk**, you can create a `config.yml` configuration file with the following structure:

```yml
action:
  - data_entity: company
  ...
  - data_entity: product-abstract
    source: data/import/icecat_biz_data/product_abstract.csv
  ...
  ```

  where:

* `data_entity` represents the name of your data importer.
* `source` describes the path to your CSV file with data to import. If the source is not specified, then CSV file defined in the module's `Config` will be used.

Then you can run the `./vendor/bin/console data:import --config=path/to/config.yml` command to import all the data from the `config.yml` file. See [Importing Data](/docs/dg/dev/data-import/{{page.version}}/importing-data-with-a-configuration-file.html) for more details about this and other import commands you can use.

On the project level, you can set a default configuration file path in `DataImportConfig::getDefaultYamlConfigPath()` so this file will be used when `--config` option is not specified, for example, when you run the `./vendor/bin/console data:import` command.

Be advised that some of the importers are related to the data that is imported by another one. For example, *Product Concrete Importer* will not work if there are no abstract products in a database because a particular product cannot exist without an abstract. The same goes for all data with relations. Therefore, make sure to check the database relations or dependencies in [Execution Order of Data Importers in Demo Shop](/docs/dg/dev/data-import/{{page.version}}/execution-order-of-data-importers.html) before running the importers.

## Implementation

Currently, we have two approaches to data importers. Most of the importers are project-based, but there are a few module-based importers. The main difference is the way the importer should be enabled.

**Modular Data Importers (coming from vendor):**

* Product Alternative Importer **(Beta)**
* Product Discontinued Importer **(Beta)**
* Product Packaging Unit Importer **(Beta)**
* Company Importer **(Beta)**
* Company Business Unit Importer **(Beta)**
* Company Unit Address Importer **(Beta)**
* Company Unit Address Label Importer **(Beta)**
* Company User on Behalf Importer **(Beta)**
* Multi-Cart Importer **(Beta)**
* Shared Cart Importer **(Beta)**
* Shopping List Importer **(Beta)**
* Shopping List Company Business Unit Importer **(Beta)**
* Shopping List Company User Importer **(Beta)**
* Shopping List Item Importer **(Beta)**
* CMS Slot Templates Importer
* CMS Slots Importer
* CMS Slot-Block Relationship Importer
* Stock Importer **(Beta)**
* Payment Method Importer **(Beta)**
* Shipment Importer **(Beta)**
* Shipment Price Importer **(Beta)**
* Shipment Store Importer **(Beta)**

To use a module-based importer, add it to the plugin stack. See the example below.

```php
<?php

	namespace Pyz\Zed\DataImport;

	...

	class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
	{
			/**
			* @return array
			*/
			protected function getDataImporterPlugins(): array
			{
					 return [
						   ...
						   new CompanyDataImportPlugin(),
						   ...
					 ];
			}
}
 ```

All those plugins should implement `Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface`.

By default, CSV files with data are stored under the module directory in a data folder. It's possible to place them on the project level by extending the `config.yml` file with the required source for the data importer. See the example below:

```yml
action:
  - data_entity: company
    source: data/import/company.csv
  ...
```

These actions should be enough to prepare a module-based importer to use.

**Project-level importers:**

* Abstract Product List Content Item Importer
* Banner Content Item Importer
* Category Template Importer
* CMS Block Importer
* CMS Block Category Importer
* CMS Block Category Position Importer
* CMS Block Store Importer
* CMS Page Importer
* CMS Template Importer
* Combined Product
* Company Unit Address Label Relation Importer
* Currency Importer
* Customer Importer
* Discount Importer
* Discount Amount Importer
* Discount Store Importer
* Discount Voucher Importer
* Glossary Importer
* Navigation Importer
* Navigation Node Importer
* Order Source Importer
* Product Abstract Importer
* Product Abstract Store Importer
* Product Concrete Importer
* Product Price Importer
* Product Image Importer
* Product Stock Importer
* Product Review Importer
* Product Relation Importer
* Product Attribute Key Importer
* Product Group Importer
* Product Label Importer
* Product Management Attribute Importer
* Product Option Importer
* Product Option Price Importer
* Product Relation Importer
* Product Search Attribute Importer
* Product Search Attribute Map Importer
* Product Set Importer
* Product Set Content Item Importer
* Tax Importer

Project-level importers work a little bit different. You can still use a module-based approach if you add a new data importer to the project level. Note that it's possible to append it directly to the `DataImport` module on the project level.

To append a data importer to the DataImport module, do the following:

1. Add a new method to the `Pyz\Zed\DataImport\Business\DataImportBusinessFactory` class that should return the following `\Spryker\Zed\DataImport\Business\Model\DataImporterInterface`. Here you need to set data import configuration and required steps that will prepare data. To do this, use the example:

```php
<?php

namespace Pyz\Zed\DataImport\Business;
...

class DataImportBusinessFactory extends SprykerDataImportBusinessFactory
{

		/**
		* @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface
		*/
		protected function createOrderSourceImporter()
		{
				//Add importer config
				$dataImporter = $this->getCsvDataImporterFromConfig($this->getConfig()->getOrderSourceDataImporterConfiguration());

				$dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
				//Add step
				$dataSetStepBroker->addStep(new OrderSourceWriterStep());

				$dataImporter->addDataSetStepBroker($dataSetStepBroker);

				return $dataImporter;
		}
}
```

2. Call this method using the `DataImportBusinessFactory::getDataImporterByType()` method:

```php
<?php

namespace Pyz\Zed\DataImport\Business;
...

class DataImportBusinessFactory extends SprykerDataImportBusinessFactory
{

    public function getDataImporterByType(DataImportConfigurationActionTransfer $dataImportConfigurationActionTransfer): ?DataImporterInterface
    {
        switch ($dataImportConfigurationActionTransfer->getDataEntity()) {
            ...
            case DataImportConfig::IMPORT_TYPE_ORDER_SOURCE:
                return $this->createOrderSourceImporter($dataImportConfigurationActionTransfer);
    }
}
```

That's it. Your data importer is now appended to the DataImport module.

Also, there are **bulk importers** that can be used if you have a huge amount of data to import, and existing importers may be slow.

Bulk importers were implemented only on the project level and they are currently compatible only with a PostgreSQL database.

The bulk importers are as follows:

* Product Abstract Importer
* Product Abstract Store Importer
* Product Concrete Importer
* Product Price Importer
* Product Image Importer
* Product Stock Importer

You can enable a bulk importer in `Pyz\Zed\DataImport\Business\DataImportBusinessFactory`:

```php
<?php

namespace Pyz\Zed\DataImport\Business;
...

class DataImportBusinessFactory extends SprykerDataImportBusinessFactory
{
...

		/**
		* This is an example of how bulk importer plugins should be enabled. Same goes for similar importers.
		* @return \Spryker\Zed\DataImportExtension\Dependency\Plugin\DataSetWriterPluginInterface[]
		*/
		protected function createProductAbstractWriterPlugins()
		{
				return [
					    //use \Pyz\Zed\DataImport\Communication\Plugin\ProductAbstract\ProductAbstractBulkPdoWriterPlugin for bulk import
					    new ProductAbstractPropelWriterPlugin(),
				];
		}

		...
}
```

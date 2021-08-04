---
title: Data Importers Overview and Implementation
originalLink: https://documentation.spryker.com/v1/docs/data-importers-review-implementation
redirect_from:
  - /v1/docs/data-importers-review-implementation
  - /v1/docs/en/data-importers-review-implementation
---

Currently, there are the following importers in Spryker Commerce OS:

* Product Alternative Importer **(Beta)** - **B2B/B2C**
* Product Discounted Importer **(Beta)** - **B2B/B2C**
* Product Packaging Unit Importer **(Beta)** - **B2B/B2C**
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
* Shopping List Item Importer **(Beta)** - - **B2B/B2C**
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

Each of the importers can be executed one by one with the separate command (for example, `./vendor/bin/console data:import:product-abstract`). 

However, if you want to execute only **specific** import types, run the `./vendor/bin/console data:import` command, which can be configured in the `DataImportConfig::getFullImportTypes`.

Be advised that some of the importers are related to the data that is imported by another one. For example, *Product Concrete Importer* will not work if there are no abstract products in a database because a particular product cannot exist without abstract. The same goes to all data with relations.

## Implementation overview
Currently, we have two approaches for data importers. Most of them are project-based, but there are a few module-based importers. The main difference is the way the importer should be enabled.

**Modular Data Importers (coming from vendor):**

* Product Alternative Importer **(Beta)**
* Product Discounted Importer **(Beta)**
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

By default, CSV files with data are stored under the module directory in a data folder. It's possible to place them on the project level by extending the `Config` class for the import module on the project level. See the example below:

```php
<?php
		
namespace Pyz\Zed\CompanyDataImport;
...
		
class CompanyDataImportConfig extends SprykerCompanyDataImportConfig
{
		/**
		* You can re-implement the whole method if you need some custom location
		*/
		public function getCompanyDataImporterConfiguration(): DataImporterConfigurationTransfer
		{
				$moduleDataImportDirectory = $this->getModuleRoot() . 'data' . DIRECTORY_SEPARATOR . 'import' . DIRECTORY_SEPARATOR;
		
				return $this->buildImporterConfiguration($moduleDataImportDirectory . 'company.csv', static::IMPORT_TYPE_COMPANY);
		}
		
		/**
		* Or you can re-implement this method in order to change base folder
		*/
		protected function getModuleRoot(): string
		{
				$moduleRoot = realpath(
					    __DIR__
					    . DIRECTORY_SEPARATOR . '..'
					    . DIRECTORY_SEPARATOR . '..'
					    . DIRECTORY_SEPARATOR . '..'
					    . DIRECTORY_SEPARATOR . '..'
				);
		
				return $moduleRoot . DIRECTORY_SEPARATOR;
			}
}		
```
These actions should be enough to prepare a module-based importer to use.

**Project-level importers:**

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
* Category Template Importer
* CMS Block Importer
* CMS Block Category Importer
* CMS Block Category Position Importer
* CMS Block Store Importer
* CMS Page Importer
* CMS Template Importer
* Abstract Product List Content Item Importer
* Product Set Content Item Importer
* Banner Content Item Importer
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
* Shipment Importer
* Shipment Price Importer
* Stock Importer
* Tax Importer

Project-level importers work a little bit different. You can still use a module-based approach if you add a new data importer to the project level. Note that it is possible to append it directly to the `DataImport` module on the project level.

Add a new method to the `Pyz\Zed\DataImport\Business\DataImportBusinessFactory` class that should return the following `\Spryker\Zed\DataImport\Business\Model\DataImporterInterface`. Here you need to set data import configuration and required steps that will prepare data. To do this, use the example:

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

Then, you should call this method using the `DataImportBusinessFactory::getImporter()` method.

```php
<?php
		
namespace Pyz\Zed\DataImport\Business;
...
		
class DataImportBusinessFactory extends SprykerDataImportBusinessFactory
{
		
public function getImporter()
{
		$dataImporterCollection = $this->createDataImporterCollection();
		$dataImporterCollection
					...
					//Add importer
					->addDataImporter($this->createOrderSourceImporter());
		
				//Add module based importers
				$dataImporterCollection->addDataImporterPlugins($this->getDataImporterPlugins());
		
				return $dataImporterCollection;
		}
}
```

Also, there are bulk importers that can be used if you have a huge amount of data to import, and existing importers may be slow.

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

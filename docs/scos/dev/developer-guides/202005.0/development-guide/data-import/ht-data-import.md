---
title: Creating a Data Importer
originalLink: https://documentation.spryker.com/v5/docs/ht-data-import
redirect_from:
  - /v5/docs/ht-data-import
  - /v5/docs/en/ht-data-import
---

The following article describes how to build your data importer for a specific type. All steps in this article are built on the real-life example for importing product images.

{% info_block infoBox "File Import Formats" %}

Currently, we only support CSV as a format for file imports out of the box. However, you can create your own file reader if you want to use a different format.

{% endinfo_block %}

## Prerequisites
<a name="prerequisites"></a>Before you start creating a data importer, you need to know what data it should include. We recommend you start by checking out the respective database tables you want to fill with data. The image below shows the table relation for product images.
![Database schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+Add+New+DataImport+Type/product_image_import_database_schema.png){height="" width=""}

From this schema, you can easily identify the data columns you need for your import file. So the relevant fields to fill are:

* name (spy_product_image_set)
* external_url_large (spy_product_image)
* external_url_small (spy_product_image)
* fk_locale (spy_product_image_set)
* fk_product (spy_product_image_set)
* fk_product_abstract (spy_product_image_set)

{% info_block infoBox "Info" %}

All `fk_*` fields are foreign keys to other database tables. We can not know the id's of the related entities so we need to fill in those fields with a unique identifier.

{% endinfo_block %}

For the database field `fk_locale` we will use the name of the locale for which we need the id (e.g. de_DE). This value will then be used later to fetch the id for the given locale name. 
We will use the same technique for the `fk_product` and `fk_product_abstract` fields.

{% info_block infoBox "Info" %}

To identify the data for your import file, you can also check out the .csv files of individual data importers listed in [About Data Import Categories](https://documentation.spryker.com/docs/en/about-data-import-categories). 

{% endinfo_block %}

Now that you know what data your import file should include, you can proceed with the first step of creating a data importer: creating an import file.

## Create an Import File
Since only .csv format is supported for import out of the box, we will start with creating a .csv file in any preferred editor.

Your .csv file for the product images import will contain the following header columns:

* image_set_name
* external_url_large
* external_url_small
* locale
* concrete_sku
* abstract_sku

Now, you can start to fill in some data into the new file. We recommend adding only a couple of entries to check after the first import run if all needed data is imported.

Once you populate all columns, your CSV file should be similar to this one:
![CSV file](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+Add+New+DataImport+Type/product_image_import_csv_file_example.png){height="" width=""}

Save the new file under `data/import/*`.

That’s it - your import file is ready. Now you have to configure the data importer.

## Configure the Data Importer
Every import type needs its own `DataImporterConfiguration`. To add it, open the `DataImportConfig` class and add a constant for the import type.

{% info_block infoBox %}
The constant is used to identify an import type. More information about it will follow later in this article. In our case we will use const `IMPORT_TYPE_PRODUCT_IMAGE = 'product-image';`.
{% endinfo_block %}

You also need to define the new data importer in the [configuration .yml file](https://documentation.spryker.com/docs/en/importing-data). Add the following lines to the `/data/import/config/full_import_config.yml` configuration file:
    
```
actions:
  ...
  - data_entity: product-image
    source: data/import/icecat_biz_data/product_image.csv
```
where:
* `data_entity` represents the name of your data importer;
* `source` indicates the path to your `.csv` file with data to import.

## Create a Writer Step

{% info_block infoBox "Steps" %}
(Each importer needs at least one step to write the data from the file to a database. You can add as many steps as you need to your `DataSetStepBroker`.
{% endinfo_block %}

First, we will create a new class called `ProductImageWriterStep` in `"*/Zed/DataImport/Business/Model/ProductImage/"` with this content:

**ProductImageWriterStep**
    
```php
<?php

namespace Pyz\Zed\DataImport\Business\Model\ProductImage;

use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class ProductImageWriterStep implements DataImportStepInterface
{

	const BULK_SIZE = 100;

	/**
	 * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
	 *
	 * @return void
	 */
	public function execute(DataSetInterface $dataSet)
	{
		echo var_dump($dataSet) . PHP_EOL . 'Line: ' . __LINE__ . PHP_EOL . 'File: ' . __FILE__ . die();
	}

}
```
Now that the writer has been created, you can wire up your data importer.

## Wire up the DataImporter
We now have everything at hand to wire up the new `DataImport` and run it. To do so:

1. Add the following method in `DataImportBusinessFactory`:

```php
/**
 * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerAwareInterface
 */
public function createProductImageImporter(DataImportConfigurationActionTransfer $dataImportConfigurationActionTransfer)
{
    $dataImporter = $this->getCsvDataImporterWriterAwareFromConfig(
        $this->getConfig()->buildImporterConfigurationByDataImportConfigAction($dataImportConfigurationActionTransfer)
    );
    
	$dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker(ProductImageWriterStep::BULK_SIZE);
	$dataSetStepBroker
		->addStep(new ProductImageWriterStep());

	$dataImporter->addDataSetStepBroker($dataSetStepBroker);

	return $dataImporter;
}
```
2. Add the new DataImporter in `DataImportBusinessFactory::getDataImporterByType()`:

```php
public function getDataImporterByType(DataImportConfigurationActionTransfer $dataImportConfigurationActionTransfer): ?DataImporterInterface
{
    switch ($dataImportConfigurationActionTransfer->getDataEntity()) {
        ...
        case DataImportConfig::IMPORT_TYPE_PRODUCT_IMAGE:
          return $this->createProductImageImporter($dataImportConfigurationActionTransfer);
    }
}
```

In the `DataImportBusinessFactory::getImporter()` we now add the new `DataImporter` with `$dataImporterCollection->addDataImporter($this->createProductImageImporter())`.

3. Register a new console command in `ConsoleDependencyProvider` to allow execution of the import command from the console. Since the `DataImport` module brings a generic console command which can be used several times to add a console command for each data import type, you only need to register it once as follows:

```php
/**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Symfony\Component\Console\Command\Command[]
 */
public function getConsoleCommands(Container $container)
{
	$commands = [
		new DataImportConsole(),
		...
		new DataImportConsole(DataImportConsole::DEFAULT_NAME . ':' . DataImportConfig::IMPORT_TYPE_PRODUCT_IMAGE),
		...
	];
}
```

Now you have a new console command `data:import:product-image` available. When you run `vendor/bin/console` you will see a new entry: `data:import:product-image This command executes your "product-image" importer.`

## Execute the Data Importer
As mentioned in the previous step, the DataImport module brings a generic command which can be used several times. You need to at least register it once without a constructor argument.

{% info_block infoBox "Info" %}

This command will execute all the `DataImporter` registered in your `full_import_config.yml` one by one.

{% endinfo_block %}

As you already made it in the example above, you can add the command with a new name over and over again. This brings in the ability to execute only a specific data importer.

When you now execute `vendor/bin/console data:import:product-image` you will see the debug output from the `ProductImageWriterStep`.

There are a lot of options that you can set for an import. If you need to debug one specific line of an import file, you can use offset and limit like this `vendor/bin/console data:import:product-image -o 43 -l 1`.

{% info_block infoBox "Info" %}

This will then only execute the data set at potion 43 of your import file.

{% endinfo_block %}


The `DataImporter` catches exceptions by default and continues to import data. In development mode, you can use the throw-exception option to throw the occurred exception instead of catching it.

{% info_block infoBox "Info" %}

There are a couple more options, you can see them when you execute `vendor/bin/console data:import:product-image -h`, the console command will then print the help page for the given command.

{% endinfo_block %}

## Finalize the Data Importer
We have made sure that the data importer can be executed, but we only print a debug message right now. We need to do some additional things to really save some data. Follow the steps below to finalize your data importer.

### 1. Convert Logical Identifier to Foreign Keys
As mentioned in the [Prerequisites](#prerequisites), we can not use foreign keys in our import file - we need a logical identifier that can now be used to get the foreign key of a related entity.

There are several ways of how we can get the logical identifier. For example, we could add a new Step e.g. `LocaleNameToIdLocaleStep`. However, in our case, it’s better to use a Repository, which provides us with a getter to retrieve the `id_locale` by its name. We will take this approach and do the following:

 1. Add `LocaleRepository` to get the foreign key of a locale by its name:

```php
<?php

namespace Pyz\Zed\DataImport\Business\Model\Locale\Repository;

use Orm\Zed\Locale\Persistence\Map\SpyLocaleTableMap;
use Orm\Zed\Locale\Persistence\SpyLocaleQuery;

class LocaleRepository
{

	/**
	 * @var array
	 */
	protected static $localeMap;

	/**
	 * @param string $locale
	 *
	 * @return int
	 */
	public function getIdLocaleByLocale($locale)
	{
		if (!static::$localeMap) {
			$this->loadLocaleMap();
		}

		return static::$localeMap[$locale];
	}

	/**
	 * @return void
	 */
	private function loadLocaleMap()
	{
		$localeCollection = SpyLocaleQuery::create()
			->select([SpyLocaleTableMap::COL_ID_LOCALE, SpyLocaleTableMap::COL_LOCALE_NAME])
			->find();

		foreach ($localeCollection as $locale) {
			static::$localeMap[$locale[SpyLocaleTableMap::COL_LOCALE_NAME]] = $locale[SpyLocaleTableMap::COL_ID_LOCALE];
		}
	}

}
```

This `Repository` is very simple but does what we need right now.

2. Add the following code, as we need to change our `ProductImageWriterStep` to use it:

```php
/**
 * @var \Pyz\Zed\DataImport\Business\Model\Locale\Repository\LocaleRepositoryInterface
 */
protected $localeRepository;

/**
 * @param \Pyz\Zed\DataImport\Business\Model\Locale\Repository\LocaleRepositoryInterface $localeRepository
 */
public function __construct(LocaleRepositoryInterface $localeRepository)
{
	$this->localeRepository = $localeRepository;
}
```

Now, we need to inject this new Repository into our `ProductImageWriterStep` inside of the business factory. 
{% info_block infoBox "Info" %}

When this is done we can use it like this: `$idLocale = $this->localeRepository->getIdLocaleByLocale($dataSet[static::KEY_LOCALE]);`

{% endinfo_block %}

We need to add a similar `Repository` to retrieve the **ID** of an abstract or concrete product by its SKU. This is then also added to our `ProductImageWriterStep` as already done with `LocaleRepository`.

### 2. Find or Create Entities
We will now create the `spy_product_image_set`, `spy_product_image`, `spy_product_image_set_to_product_image` and entities.

With the first run of an importer, all entities are new and we need to do an insert. When the importer is executed more than once, it updates the existing entities. To execute this approach, we use Propel's `findOrCreate()` method. Do the following:

1. Find or create `spy_product_image_set`. Add the following code to the `ProductImageWriterStep`:

```php
/**
 * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
 *
 * @return \Orm\Zed\ProductImage\Persistence\SpyProductImageSet
 */
protected function findOrCreateImageSet(DataSetInterface $dataSet)
{
	$idLocale = $this->getIdLocaleByLocale($dataSet);

	$query = SpyProductImageSetQuery::create()
		->filterByName($dataSet[static::KEY_IMAGE_SET_NAME])
		->filterByFkLocale($idLocale);

	if (!empty($dataSet[static::KEY_ABSTRACT_SKU])) {
		$idProductAbstract = $this->productRepository->;getIdProductAbstractByAbstractSku($dataSet[static::KEY_ABSTRACT_SKU]);
		$query->filterByFkProductAbstract($idProductAbstract);
	}

	if (!empty($dataSet[static::KEY_CONCRETE_SKU])) {
		$idProduct = $this->productRepository->getIdProductByConcreteSku($dataSet[static::KEY_CONCRETE_SKU]);
		$query->filterByFkProduct($idProduct);
	}

	$productImageSetEntity = $query->findOneOrCreate();
	if ($productImageSetEntity->isNew() || $productImageSetEntity->isModified()) {
		$productImageSetEntity->save();
	}

	return $productImageSetEntity;
}

/**
 * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
 *
 * @return int
 */
protected function getIdLocaleByLocale(DataSetInterface $dataSet)
{
	$idLocale = null;

	if (!empty($dataSet[static::KEY_LOCALE])) {
		$idLocale = $this->localeRepository->getIdLocaleByLocale($dataSet[static::KEY_LOCALE]);
	}

	return $idLocale;
}
```

We want to allow `fk_locale` to be null. Either `fk_product` or `fk_product_abstract` must be set. For performance reasons, we save the entity only when it's new or modified.

2. Find or create the `spy_product_image` by adding the following code to the `ProductImageWriterStep`:

```php
/**
 * We expect that the large URL is the unique identifier for an image.
 *
 * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
 *
 * @return \Orm\Zed\ProductImage\Persistence\SpyProductImage
 */
protected function findOrCreateImage(DataSetInterface $dataSet)
{
	$productImageEntity = SpyProductImageQuery::create()
		->filterByExternalUrlLarge($dataSet[static::KEY_EXTERNAL_URL_LARGE])
		->findOneOrCreate();

	$productImageEntity
		->setExternalUrlSmall($dataSet[static::KEY_EXTERNAL_URL_SMALL]);

	if ($productImageEntity->isNew() || $productImageEntity->isModified()) {
		$productImageEntity->save();
	}

	return $productImageEntity;
}
```

3. Add the relation `spy_product_image_set_to_product_image` by adding the following code to `ProductImageWriterStep`:

```php
/**
 * @param \Orm\Zed\ProductImage\Persistence\SpyProductImageSet $imageSetEntity
 * @param \Orm\Zed\ProductImage\Persistence\SpyProductImage $productImageEntity
 *
 * @return void
 */
protected function updateOrCreateImageToImageSetRelation(SpyProductImageSet $imageSetEntity, SpyProductImage $productImageEntity)
{
	$productImageSetToProductImageEntity = SpyProductImageSetToProductImageQuery::create()
		->filterByFkProductImageSet($imageSetEntity->getIdProductImageSet())
		->filterByFkProductImage($productImageEntity->getIdProductImage())
		->findOneOrCreate();

	$productImageSetToProductImageEntity
		->setSortOrder(0);

	if ($productImageSetToProductImageEntity->isNew() || $productImageSetToProductImageEntity->isModified()) {
		$productImageSetToProductImageEntity->save();
	}
}
```

### 3. Fill the Execute Method:

```php
/**
 * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
 *
 * @return void
 */
public function execute(DataSetInterface $dataSet)
{
	$imageSetEntity = $this->findOrCreateImageSet($dataSet);
	$productImageEntity = $this->findOrCreateImage($dataSet);

	$this->updateOrCreateImageToImageSetRelation($imageSetEntity, $productImageEntity);
}
```

## 7. Run the Importer
That’s it! Now when you run the console command `vendor/bin/console data:import:product-image`, you will see an output similar to this one:

![Importer command](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+Add+New+DataImport+Type/product_image_import_console_output.png){height="" width=""}

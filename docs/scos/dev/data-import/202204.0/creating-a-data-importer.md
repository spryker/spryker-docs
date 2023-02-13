---
title: Creating a data importer
description: The following document describes how to build your own DataImport for a specific type. All steps in this document are built on real life example for importing product images.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-data-import
originalArticleId: e149b582-49ef-4816-beb7-c29fa41581cf
redirect_from:
  - /2021080/docs/ht-data-import
  - /2021080/docs/en/ht-data-import
  - /docs/ht-data-import
  - /docs/en/ht-data-import
---

This document describes how to build your data importer for a specific type. All steps in this document are built on a real-life example of importing product images.

{% info_block infoBox "File Import Formats" %}

We only support CSV as a format for file imports out of the box. However, you can create your own file reader if you want to use a different format.

{% endinfo_block %}

## Prerequisites

<a name="prerequisites"></a>Before you start creating a data importer, you need to know what data it needs to include. We recommend you start by checking out the respective database tables you want to fill with data. The following image shows the table relation for product images.
![Database schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+Add+New+DataImport+Type/product_image_import_database_schema.png) 

From this schema, you can easily identify the data columns you need for your import file. The following are the relevant fields to fill:

* name (spy_product_image_set)
* external_url_large (spy_product_image)
* external_url_small (spy_product_image)
* fk_locale (spy_product_image_set)
* fk_product (spy_product_image_set)
* fk_product_abstract (spy_product_image_set)

{% info_block infoBox "Info" %}

All `fk_*` fields are foreign keys to other database tables. You can't know the IDs of the related entities, so you need to fill in those fields with a unique identifier.

{% endinfo_block %}

For the database field `fk_locale`, the name of the locale is used for which you need the ID—for example, `de_DE`. This value is then used to fetch the ID for the given locale name.
The same technique is used for the `fk_product` and `fk_product_abstract` fields.

{% info_block infoBox "Info" %}

To identify the data for your import file, you can also check out the CSV files of individual data importers listed in [About Data Import Categories](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/about-data-import-categories.html).

{% endinfo_block %}

Now that you know what data your import file needs to include, you can start creating an import file.

## Create an import file

Since only CSV format is supported for import out of the box, start with creating a CSV file in any preferred editor.

Your CSV file for the product images import contains the following header columns:

* image_set_name
* external_url_large
* external_url_small
* locale
* concrete_sku
* abstract_sku

Now, you can start to fill in some data in the new file. We recommend adding only a couple of entries to check after the first import run if all needed data is imported.

Once you populate all columns, your CSV file is similar to this one:
![CSV file](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+Add+New+DataImport+Type/product_image_import_csv_file_example.png) 

Save the new file under `data/import/*`.

That's it. Your import file is ready. Now you have to configure the data importer.

## Configure the data importer

Every import type needs its own `DataImporterConfiguration`. To add it, open the `DataImportConfig` class and add a constant for the import type.

{% info_block infoBox %}

The constant is used to identify an import type. More information about it follows later in this document. In this case, you need to use the `IMPORT_TYPE_PRODUCT_IMAGE = 'product-image';` const.

{% endinfo_block %}

In the [configuration YML file](/docs/scos/dev/data-import/{{page.version}}/importing-data-with-a-configuration-file.html), you also need to define the new data importer. Add the following lines to the `/data/import/config/full_import_config.yml` configuration file:

```yml
actions:
  ...
  - data_entity: product-image
    source: data/import/icecat_biz_data/product_image.csv
```

where:

* `data_entity` represents the name of your data importer;
* `source` indicates the path to your `.csv` file with data to import.

## Create a writer step

{% info_block infoBox "Steps" %}

Each importer needs at least one step to write the data from the file to a database. You can add as many steps as you need to your `DataSetStepBroker`.

{% endinfo_block %}

First, create a new class called `ProductImageWriterStep` in `"*/Zed/DataImport/Business/Model/ProductImage/"` with the following content:

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

To wire up the new `DataImport` and run it, follow these steps:

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

3. In `DataImportBusinessFactory::getImporter()`, add the new `DataImporter` with `$dataImporterCollection->addDataImporter($this->createProductImageImporter())`.

4.. In `ConsoleDependencyProvider`, register a new console command to allow execution of the import command from the console. Since the `DataImport` module brings a generic console command which can be used several times to add a console command for each data import type, you only need to register it once as follows:

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

Now you have a new console command `data:import:product-image` available. When running `vendor/bin/console`, you can see a new entry: `data:import:product-image This command executes your "product-image" importer.`

## Execute the data importer

As mentioned in the previous step, the `DataImport` module brings a generic command that can be used several times. You need to at least register it once without a constructor argument.

{% info_block infoBox "Info" %}

This command executes all the `DataImporter` registered in your `full_import_config.yml` one by one.

{% endinfo_block %}

As you already made in the preceding example, you can add the command with a new name over and over again. This brings in the ability to execute only a specific data importer.

After executing `vendor/bin/console data:import:product-image`, you can see the debug output from the `ProductImageWriterStep`.

There are a lot of options that you can set for an import. If you need to debug one specific line of an import file, you can use offset and limit like this `vendor/bin/console data:import:product-image -o 43 -l 1`.

{% info_block infoBox "Info" %}

This only executes the data set at potion 43 of your import file.

{% endinfo_block %}

The `DataImporter` catches exceptions by default and continues to import data. In development mode, you can use the throw-exception option to throw the occurred exception instead of catching it.

{% info_block infoBox "Info" %}

There are a couple more options, you can see them when you execute `vendor/bin/console data:import:product-image -h`, the console command prints the help page for the given command.

{% endinfo_block %}

## Finalize the data importer

You have made sure that the data importer can be executed, but you can only print a debug message. You need to do some additional things to save some data. To finalize your data importer, follow these steps. 

### 1. Convert a logical identifier to foreign keys

As mentioned in the [Prerequisites](#prerequisites), you can not use foreign keys in your import file—you need a logical identifier that can now be used to get the foreign key of a related entity.

There are several ways how you can get the logical identifier. For example, you can add a new step—for example, `LocaleNameToIdLocaleStep`. However, in this case, it's better to use a repository that provides us with a getter to retrieve the `id_locale` by its name. Take this approach and do the following:

1. Add `LocaleRepository` to get the foreign key of a locale by its name:

```php
<?php

namespace Pyz\Zed\DataImport\Business\Model\Locale\Repository;

use Orm\Zed\Locale\Persistence\Map\SpyLocaleTableMap;
use Orm\Zed\Locale\Persistence\SpyLocaleQuery;

class LocaleRepository implements LocaleRepositoryInterface
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

This `Repository` is very simple but does what you need.

2. Add the following code, because you need to change your `ProductImageWriterStep` to use it:

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

3. Inject this new Repository into your `ProductImageWriterStep` inside the business factory.

{% info_block infoBox "Info" %}

When injected, you can use it as follows: `$idLocale = $this->localeRepository->getIdLocaleByLocale($dataSet[static::KEY_LOCALE]);`

{% endinfo_block %}

To retrieve the *ID* of an abstract or concrete product by its SKU, you need to add a similar `Repository`. This is then also added to your `ProductImageWriterStep` as already done with `LocaleRepository`.

### 2. Find or create entities

Create `spy_product_image_set`, `spy_product_image`, `spy_product_image_set_to_product_image`, and entities.

With the first run of an importer, all entities are new, and you need to do an insert. When the importer is executed more than once, it updates the existing entities. To execute this approach, use Propel's `findOrCreate()` method. Do the following:

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
		$idProductAbstract = $this->productRepository->getIdProductAbstractByAbstractSku($dataSet[static::KEY_ABSTRACT_SKU]);
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

Allow `fk_locale` to be null. Either `fk_product` or `fk_product_abstract` must be set. For performance reasons, save the entity only when it's new or modified.

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

### 3. Fill in the Execute method:

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

## 7. Run the importer

That's it! To see an output similar to the following one, run `vendor/bin/console data:import:product-image`:

![Importer command](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+Add+New+DataImport+Type/product_image_import_console_output.png) 

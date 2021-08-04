---
title: Akeneo - Installation and Configuration
originalLink: https://documentation.spryker.com/v6/docs/akeneo-installation-configuration
redirect_from:
  - /v6/docs/akeneo-installation-configuration
  - /v6/docs/en/akeneo-installation-configuration
---

## Installation

To install AkeneoPim, add `AkeneoPimMiddlewareConnector` by running the console command. Set `akeneo/api-php-client` version that you need.
```bash
composer require akeneo/api-php-client:^4.0.0 spryker-eco/akeneo-pim:^1.0.0 spryker-eco/akeneo-pim-middleware-connector:^1.0.0
```

## Global Configuration

Add `SprykerMiddleware` to your project's core namespaces:
```php
$config[KernelConstants::CORE_NAMESPACES] = [
    'SprykerShop',
    'SprykerMiddleware',
    'SprykerEco',
    'Spryker',
];
```
To set up the Akeneo initial configuration, use the credentials you received from your PIM:
```php
$config[AkeneoPimConstants::HOST] = '';
$config[AkeneoPimConstants::USERNAME] = '';
$config[AkeneoPimConstants::PASSWORD] = '';
$config[AkeneoPimConstants::CLIENT_ID] = '';
$config[AkeneoPimConstants::CLIENT_SECRET] = '';
```

Next, specify your paths to the additional map files:
```php
$config[AkeneoPimMiddlewareConnectorConstants::LOCALE_MAP_FILE_PATH] = APPLICATION_ROOT_DIR . '/data/import/maps/locale_map.json';
$config[AkeneoPimMiddlewareConnectorConstants::ATTRIBUTE_MAP_FILE_PATH] = APPLICATION_ROOT_DIR . '/data/import/maps/attribute_map.json';
$config[AkeneoPimMiddlewareConnectorConstants::SUPER_ATTRIBUTE_MAP_FILE_PATH] = APPLICATION_ROOT_DIR . '/data/import/maps/super_attribute_map.json';
```

This being done, specify the ID of the category template that should be assigned to the  imported categories:
```php
$config[AkeneoPimMiddlewareConnectorConstants::FK_CATEGORY_TEMPLATE] = 1;
```

Next, specify the name of a tax set for the imported products:
```php
$config[AkeneoPimMiddlewareConnectorConstants::TAX_SET] = 1;
```

Finally, specify the locales that should be imported to shops and stores in which imported products are to be available, and specify how prices should be mapped according to locales:
```php
$config[AkeneoPimMiddlewareConnectorConstants::LOCALES_FOR_IMPORT] = [
    'de_DE',
    'de_AT',
];
$config[AkeneoPimMiddlewareConnectorConstants::ACTIVE_STORES_FOR_PRODUCTS] = [
    'DE',
    'AT'
];
$config[AkeneoPimMiddlewareConnectorConstants::LOCALES_TO_PRICE_MAP] = [
    'de_DE' => [
        'currency' => 'EUR',
        'type' => 'DEFAULT',
        'store' => 'DE',
    ],
    'en_US' => [
        'currency' => 'USD',
        'type' => 'DEFAULT',
        'store' => 'US',
    ],
];
```

## Dependency Configuration

Add Middleware Process console command to `src/Pyz/Zed/Console/ConsoleDependencyProvider.php` in your project:
```php
...
use SprykerMiddleware\Zed\Process\Communication\Console\ProcessConsole;
...

protected function getConsoleCommands(Container $container)
{
    $commands = [
        ...
        new ProcessConsole(),
    ];
    ...
 
    return $commands;
}
```

Create `ProcessDependencyProvider` on a project level for specifying `ConfigurationPlugins`. Add `src/Pyz/Zed/Process/ProcessDependencyProvider.php` file:
```php
<?php

namespace Pyz\Zed\Process;

use SprykerEco\Zed\AkeneoPimMiddlewareConnector\Communication\Plugin\Configuration\AkeneoPimConfigurationProfilePlugin;
use SprykerEco\Zed\AkeneoPimMiddlewareConnector\Communication\Plugin\Configuration\DefaultAkeneoPimConfigurationProfilePlugin;
use SprykerMiddleware\Zed\Process\Communication\Plugin\Configuration\DefaultConfigurationProfilePlugin;
use SprykerMiddleware\Zed\Process\ProcessDependencyProvider as SprykerProcessDependencyProvider;

class ProcessDependencyProvider extends SprykerProcessDependencyProvider
{
    /**
     * @return \SprykerMiddleware\Zed\Process\Dependency\Plugin\Configuration\ConfigurationProfilePluginInterface[]
     */
    protected function getConfigurationProfilePluginsStack(): array
    {
        $profileStack = parent::getConfigurationProfilePluginsStack();
        $profileStack[] = new DefaultConfigurationProfilePlugin();
        $profileStack[] = new AkeneoPimConfigurationProfilePlugin();
        $profileStack[] = new DefaultAkeneoPimConfigurationProfilePlugin();

        return $profileStack;
    }
}
```

## Import Configuration

Firstly, extend the `AkeneoPimMiddlewareConnector` module on a project level. Create `src/Pyz/Zed/AkeneoPimMiddlewareConnector` folder.

Inside the module, implement plugins for writing data (categories, attributes, abstract and concrete products) into the shop. Add the following plugins to `src/Pyz/Zed/AkeneoPimMiddlewareConnector/Communication/Plugin`:

* `AttributeDataImporterPlugin`
* `CategoryDataImporterPlugin`
* `ProductAbstractDataImporterPlugin`
* `ProductDataImporterPlugin`

Find an examplary plugin implementation below.

ProductAbstractDataImporterPlugin.php

 ```php
 <?php

namespace Pyz\Zed\AkeneoPimMiddlewareConnector\Communication\Plugin;

use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use SprykerEco\Zed\AkeneoPimMiddlewareConnector\Dependency\Plugin\DataImporterPluginInterface;

class ProductAbstractDataImporterPlugin extends AbstractPlugin implements DataImporterPluginInterface
{
    /**
     * @api
     *
     * @param array $data
     *
     * @return void
     */
    public function import(array $data): void
    {
        $this->getFacade()->importProductsAbstract($data);
    }
}
```

Implement your own `DataImporter` for importing products to the shop database. It can be a business module inside the `AkeneoPimMiddlewareConnector` module. Example:

AkeneoDataImporter.php

 ```php
 <?php

namespace Pyz\Zed\AkeneoPimMiddlewareConnector\Business\AkeneoDataImporter;

use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerInterface;
use Spryker\Zed\DataImport\Business\Model\Publisher\DataImporterPublisherInterface;
use Spryker\Zed\DataImportExtension\Dependency\Plugin\DataSetWriterPluginInterface;
use Spryker\Zed\EventBehavior\EventBehaviorConfig;

class AkeneoDataImporter implements AkeneoDataImporterInterface
{
    /**
     * @var \Spryker\Zed\DataImport\Business\Model\Publisher\DataImporterPublisherInterface
     */
    protected $dataImporterPublisher;

    /**
     * @var \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerInterface
     */
    protected $dataSetStepBroker;

    /**
     * @var \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface
     */
    protected $dataSet;

    /**
     * @var \Spryker\Zed\DataImportExtension\Dependency\Plugin\DataSetWriterPluginInterface[]
     */
    protected $writerPlugins;

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\Publisher\DataImporterPublisherInterface $dataImporterPublisher
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerInterface $dataSetStepBroker
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param \Spryker\Zed\DataImportExtension\Dependency\Plugin\DataSetWriterPluginInterface|array $writerPlugins
     */
    public function __construct(
        DataImporterPublisherInterface $dataImporterPublisher,
        DataSetStepBrokerInterface $dataSetStepBroker,
        DataSetInterface $dataSet,
        array $writerPlugins = []
    ) {
        $this->dataImporterPublisher = $dataImporterPublisher;
        $this->dataSetStepBroker = $dataSetStepBroker;
        $this->dataSet = $dataSet;
        $this->writerPlugins = $writerPlugins;
    }

    /**
     * @param array $data
     *
     * @return void
     */
    public function import(array $data): void
    {
        EventBehaviorConfig::disableEvent();
        foreach ($data as $item) {
            $this->dataSet->exchangeArray($item);
            $this->dataSetStepBroker->execute($this->dataSet);
            /** @var DataSetWriterPluginInterface $writerPlugin */
            foreach ($this->writerPlugins as $writerPlugin) {
                $writerPlugin->write($this->dataSet);
            }
        }
        foreach ($this->writerPlugins as $writerPlugin) {
            $writerPlugin->write($this->dataSet);
        }
        EventBehaviorConfig::enableEvent();
        $this->dataImporterPublisher->triggerEvents();
    }
}
```

Implement facade methods for the `AkeneoPimMiddlewareConnector` module. Example:

```php
class AkeneoPimMiddlewareConnectorFacade extends SprykerAkeneoPimMiddlewareConnectorFacade implements AkeneoPimMiddlewareConnectorFacadeInterface
...
    /**
     * @param array $data
     */
    public function importProductsAbstract(array $data): void
    {
        $this->getFactory()
            ->createProductAbstractImporter()
            ->import($data);
    }
...
...
```

## Dataset Step Broker and Writer

Business Factory method is used for Importer creation. Determine the data writing approach and how you want to broke the payload. The `AkeneoImporter` you implemented usually expects the implementation of `\Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerInterface`.

For better understanding, see the example of the `AkeneoDataImporter` creation for importing abstract products in `AkeneoPimMiddlewareConnectorBusinessFactory.`

AkeneoPimMiddlewareConnectorBusinessFactory

 ```php
...
class AkeneoPimMiddlewareConnectorBusinessFactory extends SprykerAkeneoPimMiddlewareConnectorBusinessFactory
...

    /**
     * @return \Pyz\Zed\AkeneoPimMiddlewareConnector\Business\AkeneoDataImporter\AkeneoDataImporterInterface
     */
    public function createProductAbstractImporter()
    {
        return new AkeneoDataImporter(
            $this->createDataImporterPublisher(),
            $this->createProductAbstractImportDataSetStepBroker(),
            $this->createDataSet(),
            $this->getProvidedDependency(AkeneoPimMiddlewareConnectorDependencyProvider::PRODUCT_ABSTRACT_PROPEL_WRITER_PLUGINS)
        );
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface
     */
    public function createDataSet()
    {
        return new DataSet();
    }

    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerInterface
     *
     * @throws \Spryker\Zed\Kernel\Exception\Container\ContainerKeyNotFoundException
     */
    public function createProductAbstractImportDataSetStepBroker()
    {
        $dataSetStepBroker = new DataSetStepBroker();
        $dataSetStepBroker->addStep(new ProductAbstractStep());

        return $dataSetStepBroker;
    }
...
```

As you can see, in `DataSetStepBroker,` you can add your own steps for preparing data for writers. You can find ready made steps in the `DataImport` module or implement your own steps. Example:

ProductAbstractStep

 ```php
 <?php

namespace Pyz\Zed\AkeneoPimMiddlewareConnector\Business\DataImportStep;

use Generated\Shared\Transfer\SpyProductAbstractEntityTransfer;
use Pyz\Zed\DataImport\Business\Model\ProductAbstract\ProductAbstractHydratorStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;

class ProductAbstractStep extends ProductAbstractHydratorStep
{
    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    protected function importProductAbstract(DataSetInterface $dataSet): void
    {
        $productAbstractEntityTransfer = new SpyProductAbstractEntityTransfer();
        $productAbstractEntityTransfer->setSku($dataSet[static::KEY_ABSTRACT_SKU]);

        $productAbstractEntityTransfer
            ->setColorCode($dataSet[static::KEY_COLOR_CODE])
            ->setFkTaxSet($dataSet[static::KEY_TAX_ID)
            ->setAttributes(json_encode($dataSet[static::KEY_ATTRIBUTES]))
            ->setNewFrom($dataSet[static::KEY_NEW_FROM])
            ->setNewTo($dataSet[static::KEY_NEW_TO]);

        $dataSet[static::DATA_PRODUCT_ABSTRACT_TRANSFER] = $productAbstractEntityTransfer;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    protected function importProductCategories(DataSetInterface $dataSet): void
    {
        $dataSet[static::DATA_PRODUCT_CATEGORY_TRANSFER] = [];
    }
}
```

You can change default data mappers and translators for overriding keys or values. By default, Akeneo has a list of predefined mappers, translators and validators for each  import type, but it can be adjusted to meet your requirements. Check the [middleware documentation](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/data-ingestion/spryker-middlew) for more details.

You also need to take care of that data that is to be written to the database. Two approaches can be used for that.

For attributes and categories, Spryker has implemented writer steps, so no plugins are required for that. Example:

AkeneoPimMiddlewareConnectorBusinessFactory

 ```php
/**
 * @return \Pyz\Zed\AkeneoPimMiddlewareConnector\Business\AkeneoDataImporter\AkeneoDataImporterInterface
 */
public function createCategoryImporter(): AkeneoDataImporterInterface
{
    return new AkeneoDataImporter(
        $this->createDataImporterPublisher(),
        $this->createCategoryImportDataSetStepBroker(),
        $this->createDataSet()
    );
}

/**
 * @return \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetStepBrokerInterface
 */
public function createCategoryImportDataSetStepBroker()
{
    $dataSetStepBroker = new DataSetStepBroker();
    $dataSetStepBroker->addStep($this->createCategoryWriteStep());

    return $dataSetStepBroker;
}

/**
 * @return \Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface
 */
public function createCategoryWriteStep()
{
    return new CategoryWriterStep($this->createCategoryReader());
}

/**
 * @return \Spryker\Zed\CategoryDataImport\Business\Model\Reader\CategoryReader
 */
public function createCategoryReader(): CategoryReader
{
    return new CategoryReader();
}
```

The example demonstrates how you can skip adding plugins for writing data to the database.

Product import is a more complex operation, so Spryker provides bulk insertion plugins for that. They are faster than the writer steps.

You can use the existing plugins or create your own. The right way to add external plugins is to use dependency providers. We have two types of writer plugins: Propel plugins and PDO plugins. Check the examples for both of them below.

AkeneoPimMiddlewareConnectorBusinessFactory

 ```php
/**
 * @return \Pyz\Zed\AkeneoPimMiddlewareConnector\Business\AkeneoDataImporter\AkeneoDataImporterInterface
 */
public function createProductAbstractImporter()
{
    return new AkeneoDataImporter(
        $this->createDataImporterPublisher(),
        $this->createProductAbstractImportDataSetStepBroker(),
        $this->createDataSet(),
        $this->getProvidedDependency(AkeneoPimMiddlewareConnectorDependencyProvider::PRODUCT_ABSTRACT_PROPEL_WRITER_PLUGINS)
    );
}
```

AkeneoPimMiddlewareConnectorDependencyProvider

 ```php
 ...
class AkeneoPimMiddlewareConnectorDependencyProvider extends SprykerAkeneoPimMiddlewareConnectorDependencyProvider
{
    public const PRODUCT_ABSTRACT_PROPEL_WRITER_PLUGINS = 'PRODUCT_ABSTRACT_PROPEL_WRITER_PLUGINS';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function addProductAbstractPropelWriterPlugins(Container $container): Container
    {
        $container[static::PRODUCT_ABSTRACT_PROPEL_WRITER_PLUGINS] = function () {
            return [
                new ProductAbstractPropelWriterPlugin(),
            ];
        };

        return $container;
    }

...
}
```

When we use only `ProductAbstractPropelWriterPlugin`, `ProductStores`, `ProductPrices`, etc are not imported. If you want to import something other than products, you need to add more writer plugins.

For example, if you want to import a product store, provide one more plugin in dependency provider.

AkeneoPimMiddlewareConnectorDependencyProvider

 ```php
 /**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Spryker\Zed\Kernel\Container
 */
protected function addProductAbstractPropelWriterPlugins(Container $container): Container
{
    $container[static::PRODUCT_ABSTRACT_PROPEL_WRITER_PLUGINS] = function () {
        return [
            new ProductAbstractPropelWriterPlugin(),
            new ProductAbstractStorePropelWriterPlugin(),
        ];
    };

    return $container;
}
```

In case you add more writer plugins, you might have to add more steps to dataset step broker.


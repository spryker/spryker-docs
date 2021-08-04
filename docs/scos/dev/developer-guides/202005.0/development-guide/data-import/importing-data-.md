---
title: Importing Data with the Queue Data Importer
originalLink: https://documentation.spryker.com/v5/docs/importing-data-with-queue-data-importer
redirect_from:
  - /v5/docs/importing-data-with-queue-data-importer
  - /v5/docs/en/importing-data-with-queue-data-importer
---

Queue data import adds the ability to import data with the help of message queues. It is meant to increase data import performance by using performance-related abilities/properties of message queues, like:

* Parallel message consumption by multiple consumers using round-robin
* Fast transmitting of large amounts of data
* Bulk message processing

Besides, Queue Data Import also provides the ability to use different import groups.

## Why You Need It
The main goal of using Queue Data Import is the ability to import data in parallel. Once the data is stored in a queue, it can be consumed by several consumers at a time, thus roughly dividing total import execution time by the number of consumers.

## How Does It Work?
Regular data import is done as a single-step process: the data is read from some data source and then stored in persistent storage (usually a database).

Queue data import is intended to be done in two separate steps.

1. **Step 1** is about importing the data from the original data source into the queue.
a. Each resource (e.g., abstract product data) is meant to be imported to its dedicated queue.
b. In general, during this step, data should not be preprocessed in any way and should go to a queue as is.
2. During **Step 2**, data previously stored in a queue is consumed from the queue and imported into persistent storage.

## How to Export Data from CSV to Queue (Step 1)
The **DataImport** module was extended with the new classes that are responsible for providing the preconfigured queue writer instances to the data import facilities. It is completely configured on the project level.

To be able to import data into a message queue, an instance of `Spryker\Zed\DataImport\Business\DataWriter\QueueWriter\QueueWriter` should be used as a data writer during import. Two pieces of configuration have to be provided to a queue writer's `::write()` method:

1. Queue name - a name of the resource-based queue which will store the imported data between the steps (i.e. `import.product_abstract`)
2. Chunk size - the size of the chunks in which the data will be written to a queue

First, a dedicated configuration method has to be defined in `Pyz\Zed\DataImport\DataImportConfig`:

Pyz\Zed\DataImport\DataImportConfig

```php
<?php
.....
use Spryker\Zed\DataImport\DataImportConfig as SprykerDataImportConfig;
.....
 
class DataImportConfig extends SprykerDataImportConfig
{
    public const PRODUCT_ABSTRACT_QUEUE = 'import.product_abstract';
    public const PRODUCT_ABSTRACT_QUEUE_ERROR = 'import.product_abstract.error';
 
    .....
 
    public function getProductAbstractQueueWriterConfiguration(): DataImporterQueueWriterConfigurationTransfer
    {
        return (new QueueWriterConfigurationTransfer())
            ->setQueueName(static::PRODUCT_ABSTRACT_QUEUE)
            ->setChunkSize($this->getQueueWriterChunkSize());
    }
    .....
}
```

Here, you need to specify the names for the queues:

1. the main queue, which will hold the data
1. the error queue (the name of the main queue suffixed with .error)

You need to specify the name for the method, which will create an instance of `DataImportQueueWriterConfigurationTransfer` and initialize it with the main queue name and the size of a chunk the data will be written in.

Next, a plugin class, which will configure and hook up queue writer with data importer, needs to be created. This plugin must extend `Spryker\Zed\DataImport\Communication\Plugin\AbstractQueueWriterPlugin` and has to provide implementations for its two abstract methods:

Pyz\Zed\DataImport\Communication\Plugin\ProductAbstract\ProductAbstractQueueWriterPlugin

```php
<?php

use Spryker\Zed\DataImport\Communication\Plugin\AbstractQueueWriterPlugin;
.....
 
/**
 * @method \Pyz\Zed\DataImport\DataImportConfig getConfig()
 */
class ProductAbstractQueueWriterPlugin extends AbstractQueueWriterPlugin
{
    protected function getQueueName(): string
    {
        return $this->getConfig()->getProductAbstractQueueWriterConfiguration()->getQueueName();
    }
 
    protected function getChunkSize(): int
    {
        return $this->getConfig()->getProductAbstractQueueWriterConfiguration()->getChunkSize();
    }
}
```

The plugin should call the newly created method from the config class, thus providing the configuration values to the queue writer instance.

{% info_block warningBox "Note" %}

Additional plugins must be created for other resources, should they need to be imported with the help of message queues.

{% endinfo_block %}

After that, the names of the new queues need to be added to the `RabbitMq` module configuration class. Go to `Pyz\Client\RabbitMq\RabbitMqConfig` and register the new queues for the resource.

Pyz\Client\RabbitMq\RabbitMqConfig

```php
<?php

use Spryker\Zed\DataImport\DataImportConfig;
  
.....
  
/**
 * @return \ArrayObject
 */
protected function getQueueOptions()
{
    .....
    //Queue data import
    $queueOptionCollection->append($this->createQueueOption(DataImportConfig::PRODUCT_ABSTRACT_QUEUE, DataImportConfig::PRODUCT_ABSTRACT_QUEUE_ERROR));
    ......
  
    return $queueOptionCollection;
}
```

The last step is to enable Queue data import. Go to `Pyz\Zed\DataImport\Business\DataImportBusinessFactory`.

First of all, remove all the old code related to importing the selected resource data.

Then, add a method for creating `DataSetWriterCollection` based on that plugin and another one for creating data importer, which will work on top of this collection. Add a call to this method to `DataImportBusinessFactory::getImporter()`.

Pyz\Zed\DataImport\Business\DataImportBusinessFactory

```php
<?php

use Pyz\Zed\DataImport\DataImportConfig;
use Pyz\Zed\DataImport\Communication\Plugin\ProductAbstract\ProductAbstractQueueWriterPlugin;
  
class DataImportBusinessFactory extends SprykerDataImportBusinessFactory
{
    .....
    public function getImporter()
    {
        $dataImporterCollection = $this->createDataImporterCollection();
        .....
        $dataImporterCollection->addDataImporter($this->getProductAbstractQueueWriter());
        .....
        return $dataImporterCollection;
    }
  
    public function getProductAbstractQueueWriter()
    {
        $dataImporter = $this->getCsvDataImporterWriterAwareFromConfig($this->getConfig()->getProductAbstractDataImporterConfiguration());
        $dataImporter->setImportGroup(DataImportConfig::IMPORT_GROUP_QUEUE_WRITERS);
        $dataImporter->setDataSetWriter($this->createProductAbstractQueueDataImportWriters());
  
        return $dataImporter;
    }
  
    protected function createProductAbstractQueueDataImportWriters(): DataSetWriterInterface
    {
        return new DataSetWriterCollection($this->createProductAbstractQueueWriterPlugins());
    }
  
    protected function createProductAbstractQueueWriterPlugins(): array
    {
        return [
            new ProductAbstractQueueWriterPlugin(),
        ];
    }
    .....
}
```

Pay attention to the `::setImportGroup()` method call on the data importer instance. By calling this method, an import group can be set for each separate data import. Import groups allow you to run importers separately on a per-group basis by supplying the group name as an option for the data import console command. Three groups are supported out of the box: **FULL, QUEUE_READERS, QUEUE_WRITERS**. With no call to `::setImportGroup`, data importer is placed into the **FULL** group by default.
{% info_block warningBox "Note" %}

It is not recommended to use the **QUEUE_READERS** group. This executes all the configured queue importers during one import run. Because in a lot of scenarios the order, in which the data is imported, matters and because of the possibility of the race condition, this can lead to various malfunctions/inconsistencies in the imported data. We recommend structuring the import process in a way that would allow importing data with the help of the message queues apart from other imported resources.

{% endinfo_block %}

Now, whenever you run `vendor/bin/console data:import` with the `--group` option set to QUEUE_WRITERS, product abstract data will be stored in the dedicated queue.

```bash
vendor/bin/console data:import --group=QUEUE_WRITERS
```
{% info_block errorBox "Important!" %}

Import groups should not be used together with import types. For example, this command is illegal and will lead to an exception:
```bash
vendor/bin/console data:import:product-abstract --group=QUEUE_WRITERS
```

{% endinfo_block %}

{% info_block warningBox "Note" %}

We also highly recommend preparing the properly structured data for the import in queues from the very beginning instead of actually importing it from CSV, XML, etc. as the first step. In this case, a queue can be treated as an original source of data for import which would make the overall process more convenient. 

{% endinfo_block %}

## How to Export Data from Queue to Database (Step 2)
Add a new constant and a public method to `Pyz\Zed\DataImport\DataImportConfig`. The method should call `Spryker\Zed\DataImport::buildQueueDataImporterConfiguration()`, passing three arguments:

* The name of the queue to consume messages from (should match the name of the queue used in **Step 1**)
* Import type
* Queue consumer options

Pyz\Zed\DataImport\DataImportConfig

```php
<?php

use Generated\Shared\Transfer\QueueDataImporterConfigurationTransfer;
use Generated\Shared\Transfer\RabbitMqConsumerOptionTransfer;
use Spryker\Zed\DataImport\DataImportConfig as SprykerDataImportConfig;
.....
 
class DataImportConfig extends SprykerDataImportConfig
{
    public const IMPORT_TYPE_PRODUCT_ABSTRACT_QUEUE = 'product-abstract-queue';
    .....
  
    public function getProductAbstractQueueImporterConfiguration(): QueueDataImporterConfigurationTransfer
    {
        return $this->buildQueueDataImporterConfiguration(
            'import.product_abstract',
            static::IMPORT_TYPE_PRODUCT_ABSTRACT_QUEUE,
            $this->getQueueConsumerOptions()
        );
    }
 
    protected function getQueueConsumerOptions(): array
    {
        return [
            'rabbitmq' => (new RabbitMqConsumerOptionTransfer())->setConsumerExclusive(false)->setNoWait(false),
        ];
    }
    .....
}
```

Notice that a new import type has been introduced. It needs to be registered in `Pyz\Zed\Console\ConsoleDependencyProvider::getConsoleCommands()`.

Pyz\Zed\Console\ConsoleDependencyProvider

```php
<?php

namespace Pyz\Zed\Console;
 
use Pyz\Zed\DataImport\DataImportConfig;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
.....
 
class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    protected function getConsoleCommands(Container $container)
    {
        $commands = [
            .....
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . ':' . DataImportConfig::IMPORT_TYPE_PRODUCT_ABSTRACT_QUEUE),
            .....
        ];
        .....
    }
    .....
}
```

{% info_block errorBox "Important!" %}

You should use different import type names for **Step 1** and **Step 2**

{% endinfo_block %}

Go to `Pyz\Zed\DataImport\Business\DataImportBusinessFactory` and add a new method for creating the queue data importer that will use the queue reader and import data to the database. Add a call to this method to `DataImportBusinessFactory::getImporter()` after the one that creates the queue writer.

Pyz\Zed\DataImport\Business\DataImportBusinessFactory

```php
<?php

use Spryker\Zed\DataImport\Business\DataImporter\Queue\QueueDataImporterInterface;
.....
 
class DataImportBusinessFactory extends SprykerDataImportBusinessFactory
{
    .....
    public function getImporter()
    {
        .....
        $dataImporterCollection->addDataImporter($this->getProductAbstractQueueWriter());
        .....
        $dataImporterCollection->addDataImporter($this->createProductAbstractQueueImporter());
        .....
    }
  
    protected function createProductAbstractQueueImporter(): QueueDataImporterInterface
    {
        $dataImporter = $this->createQueueDataImporter($this->getConfig()->getProductAbstractQueueImporterConfiguration());
  
        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker(ProductAbstractHydratorStep::BULK_SIZE);
        $dataSetStepBroker
            ->addStep($this->createAddLocalesStep())
            ->addStep($this->createAddCategoryKeysStep())
            ->addStep($this->createTaxSetNameToIdTaxSetStep(ProductAbstractHydratorStep::KEY_TAX_SET_NAME))
            ->addStep($this->createAttributesExtractorStep())
            ->addStep($this->createProductLocalizedAttributesExtractorStep([
                ProductAbstractHydratorStep::KEY_NAME,
                ProductAbstractHydratorStep::KEY_URL,
                ProductAbstractHydratorStep::KEY_DESCRIPTION,
                ProductAbstractHydratorStep::KEY_META_TITLE,
                ProductAbstractHydratorStep::KEY_META_DESCRIPTION,
                ProductAbstractHydratorStep::KEY_META_KEYWORDS,
            ]))
            ->addStep(new ProductAbstractHydratorStep());
        $dataImporter->addDataSetStepBroker($dataSetStepBroker);
        $dataImporter->setDataSetWriter($this->createProductAbstractDataImportWriters());
  
        return $dataImporter;
    }
    .....
}
```

Pay attention to `Spryker\Zed\DataImport\Business\DataImportBusinessFactory::createQueueDataImporter()`. Instead of creating the regular data importer instance, this method will create an instance of the `Spryker\Zed\DataImport\Business\DataImporter\Queue\QueueDataImporter` class, which is responsible for handling the queue-related tasks such as message acknowledgment after successful data import. During data import, an instance of this class is preconfigured to run as part of the **QUEUE_READERS** group.

Finally, make changes to all bulk data set writers, which store data internally and then flush it to the database in bulk once a configured threshold is reached. First, you should use `Spryker\Zed\DataImport\Business\DataImporter\Queue\DataSetWriterPersistenceStateAwareTrait` inside these writers. Then you should:

1. switch the persistence state to false at the very beginning of the ::write() method by calling `Spryker\Zed\DataImport\Business\DataImporter\Queue\DataSetWriterPersistenceStateAwareTrait::setDataSetWriterPersistenceState(false)`
2. switch the persistence state to true once the buffered data has been saved to the database by calling `Spryker\Zed\DataImport\Business\DataImporter\Queue\DataSetWriterPersistenceStateAwareTrait::setDataSetWriterPersistenceState(true)`

This is needed for proper acknowledgment of the corresponding messages in the import queue.

Pyz\Zed\DataImport\Business\Model\ProductAbstract\Writer\ProductAbstractBulkPdoDataSetWriter

```php
<?php

use Spryker\Zed\DataImport\Business\DataImporter\Queue\DataSetWriterPersistenceStateAwareTrait;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetWriterInterface;
.....
 
class ProductAbstractBulkPdoDataSetWriter implements DataSetWriterInterface
{
    use DataSetWriterPersistenceStateAwareTrait;
 
    /**
     * Static buffer.
     */
    protected static $productAbstractCollection = [];
 
    .....
 
    public function write(DataSetInterface $dataSet): void
    {
        $this->setDataSetWriterPersistenceState(false);
         
        // storing data sets in the internal buffer
    }
 
    .....
 
    /**
     * Called once the data in the internal buffer is ready to be saved.
     */
    protected function flush(): void
    {
        // writing data from the buffer to database
         
        $this->setDataSetWriterPersistenceState(true);
    }
}
```

To perform data importing from the queue into the persistent storage, run `vendor/bin/console data:import` with the `--group` option set to `QUEUE_READERS`.
```bash
vendor/bin/console data:import --group=QUEUE_READERS
```

{% info_block infoBox "Info" %}

It is possible to perform both steps (as well as all the other enabled imports) by executing the console command only once. Simply don't use the --group option, or set it to FULL. In this case, the data will be imported into a queue and then immediately consumed from the queue and saved to the persistent storage. All the other importers will be executed as usual. Just make sure that the Step 1 importer is configured to run before the Step 2 importer.

{% endinfo_block %}

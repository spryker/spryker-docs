---
title: Tutorial - Replacing a default data importer with the queue data importer
originalLink: https://documentation.spryker.com/v6/docs/tutorial-replacing-a-default-data-importer-with-the-queue-data-importer
redirect_from:
  - /v6/docs/tutorial-replacing-a-default-data-importer-with-the-queue-data-importer
  - /v6/docs/en/tutorial-replacing-a-default-data-importer-with-the-queue-data-importer
---

This tutorial is a quick step-by-step guide on how to replace a default data importer with a [queue data importer](https://documentation.spryker.com/docs/importing-data-with-queue-data-importer). 
Specifically, the `ProductAbstract` data importer is replaced here.

## Prerequisites
You should have data in the `PRODUCT_ABSTRACT_QUEUE`. See [Importing data with the queue data importer](https://documentation.spryker.com/docs/importing-data-with-queue-data-importer#exporing-data-from-csv-to-queue) for details on how to import data into the queue.

## Step 1. Configuration
Configure `DataImportConfig` and add a constant to it. You can add a new constant and a public method to  `Pyz\Zed\DataImport\DataImportConfig`. 

The method should call `Spryker\Zed\DataImport::buildQueueDataImporterConfiguration()`, passing three arguments:

* Import type

* Queue consumer options

**Pyz\Zed\DataImport\DataImportConfig.php**

```php
<?php

use Generated\Shared\Transfer\QueueDataImporterConfigurationTransfer;
use Generated\Shared\Transfer\RabbitMqConsumerOptionTransfer;
use Spryker\Zed\DataImport\DataImportConfig as SprykerDataImportConfig;
.....
 
class DataImportConfig extends SprykerDataImportConfig
{
    public const IMPORT_TYPE_PRODUCT_ABSTRACT_QUEUE = 'product-abstract-queue'; // We assumed you already provided the data in this queue
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

## Step 2. Registering a console command
Register a new import console command in `Pyz\Zed\Console\ConsoleDependencyProvider::getConsoleCommands()`:

**Pyz\Zed\Console\ConsoleDependencyProvider.php**

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

## Step 3. Adjusting the business factory
Go to `Pyz\Zed\DataImport\Business\DataImportBusinessFactory` and add a new method for creating the queue data importer that uses the queue reader and imports data to the database. 
Also, add a call to this method to `DataImportBusinessFactory::getDataImporterByType()`. 

<details><summary>Pyz\Zed\DataImport\Business\DataImportBusinessFactory.php</summary>

```php
<?php

use Spryker\Zed\DataImport\Business\DataImporter\Queue\QueueDataImporterInterface;
.....
 
class DataImportBusinessFactory extends SprykerDataImportBusinessFactory
{
    .....
    public function getDataImporterByType()
    {
        .....
            case DataImportConfig::IMPORT_TYPE_PRODUCT_ABSTRACT_QUEUE:
                return $this->createProductAbstractQueueImporter($dataImportConfigurationActionTransfer);

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
</details>

## Step 4. Adjusting writers
Make changes to all bulk data set writers, which store data internally. Then, flush it to the database in bulk once a configured threshold is reached. 
First, use `Spryker\Zed\DataImport\Business\DataImporter\Queue\DataSetWriterPersistenceStateAwareTrait` inside these writers. Then, do the following:
1. Switch the persistence state to `false` at the very beginning of the `::write()` method by calling `Spryker\Zed\DataImport\Business\DataImporter\Queue\DataSetWriterPersistenceStateAwareTrait::setDataSetWriterPersistenceState(false)`.

2. Once the buffered data has been saved to the database, switch the persistence state to `true`  by calling `Spryker\Zed\DataImport\Business\DataImporter\Queue\DataSetWriterPersistenceStateAwareTrait::setDataSetWriterPersistenceState(true)`.

You need this for proper acknowledgment of the corresponding messages in the import queue.

<details><summary>Pyz\Zed\DataImport\Business\Model\ProductAbstract\Writer\ProductAbstractBulkPdoDataSetWriter.php</summary>

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

</details>


## Step 5. Execution
To perform data importing from the queue into the persistent storage, run `vendor/bin/console data:import` with the `--group` option set to `QUEUE_READERS`.

You can also run `data:import` for the specific queue importer like `endor/bin/console data:import:product-abstract-queue`.


---
title: Replacing a default data importer with a queue data importer
description: This tutorial is a quick step-by-step guide on how to replace a default data importer with a queue data importer.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/tutorial-replacing-a-default-data-importer-with-the-queue-data-importer
originalArticleId: fab80f36-95c1-480d-a5c2-1ad5488587e8
redirect_from:
  - /docs/scos/dev/data-import/202404.0/tutorial-replace-a-default-data-importer-with-the-queue-data-importer.html
  - /docs/scos/dev/tutorials-and-howtos/advanced-tutorials/tutorial-replacing-a-default-data-importer-with-the-queue-data-importer.html
related:
  - title: Importing data with the queue data importer
    link: docs/dg/dev/data-import/page.version/importing-data-with-the-queue-data-importer.html
---

This tutorial is a quick step-by-step guide on how to replace a default data importer with a [queue data importer](/docs/dg/dev/data-import/{{site.version}}/importing-data-with-the-queue-data-importer.html).
Specifically, the `ProductAbstract` data importer is replaced here.

## Prerequisites

You should have data in the `PRODUCT_ABSTRACT_QUEUE`. For details about how to import data into the queue, see [Importing data with the queue data importer](/docs/dg/dev/data-import/{{site.version}}/importing-data-with-the-queue-data-importer.html#importing-data-from-csv-to-queue)

## 1. Configuration

Configure `DataImportConfig` and add a constant to it. You can add a new constant and a public method to  `Pyz\Zed\DataImport\DataImportConfig`.

The method must call `Spryker\Zed\DataImport::buildQueueDataImporterConfiguration()`, passing three arguments:

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

## 2. Register a console command

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

## 3. Adjust the business factory

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

## 4. Adjust writers

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


## 5. Execution

To perform data importing from the queue into the persistent storage, run `vendor/bin/console data:import` with the `--group` option set to `QUEUE_READERS`.

You can also run `data:import` for the specific queue importer like `vendor/bin/console data:import:product-abstract-queue`.

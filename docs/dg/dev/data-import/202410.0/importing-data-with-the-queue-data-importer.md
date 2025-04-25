---
title: Importing data with the queue data importer
description: This article describes the process of importing data with the Queue Data Importer.
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/importing-data-with-queue-data-importer
originalArticleId: c20bef51-1460-4459-b45e-c13b92798a19
redirect_from:
  - /docs/scos/dev/data-import/202404.0/importing-data-with-the-queue-data-importer.html
  - /docs/scos/dev/data-import/202204.0/importing-data-with-the-queue-data-importer.html
related:
  - title: Queue Data Import feature integration
    link: docs/pbc/all/miscellaneous/page.version/install-and-upgrade/install-features/install-the-queue-data-import-feature.html
---

Queue data import allows you to import data via message queues. It increases data import performance by using performance-related abilities and properties of message queues, like:

* Parallel message consumption by multiple consumers using round-robin.
* Fast transmitting of large amounts of data.
* Bulk message processing.

Also, queue data import allows you to use different import groups.

## Queue data importer for parallel data import

Mainly, it's used to import data in parallel. Once data is stored in a queue, it can be consumed by several consumers at a time, thus roughly dividing total import execution time by the number of consumers.

## How queue-based data import works

Regular data import is done as a single-step process: data is read from a data source and then stored in a persistent storage (usually a database).

Queue data import is designed to be done in two separate steps.

1. Data is relocated from the original data source into the queues. Each resource, like abstract product data, is imported into a dedicated queue without pre-processing.
2. Data in a queue is consumed and imported into a persistent storage. If you already have data in the queues, skip this part and check [Tutorial: Replacing a default data importer with the queue data importer](/docs/dg/dev/data-import/{{page.version}}/replacing-a-default-data-importer-with-a-queue-data-importer.html).

## Importing data from CSV to queue

If the provided data is in the .CSV format, you can import it to the queues.
The [DataImport](https://github.com/spryker/data-import) module has classes responsible for providing the preconfigured queue writer instances to the data import facilities. It is configured on the project level.

To import data into a message queue, use an instance of `Spryker\Zed\DataImport\Business\DataWriter\QueueWriter\QueueWriter` as a data writer during import.

Do the following:
1. Provide two pieces of configuration to a queue writer's `::write()` method:
* Queue name—the name of the resource-based queue, which stores the imported data between the steps (for example, `import.product_abstract`).
* Chunk size—the size of the chunks in which data is written to a queue.
2. Define a dedicated configuration method in `Pyz\Zed\DataImport\DataImportConfig`:

**Pyz\Zed\DataImport\DataImportConfig**

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

Here, you specify the names for the queues:

* The main queue, which holds the data.
* The error queue (the name of the main queue suffixed with .error).

3. Specify the name for the method, which creates an instance of `DataImportQueueWriterConfigurationTransfer` and initializes it with the main queue name and the size of a chunk data is written in.

4. Create a plugin class, which configures and hooks up queue writer with the data importer. This plugin must extend `Spryker\Zed\DataImport\Communication\Plugin\AbstractQueueWriterPlugin` and has to provide implementations for its two abstract methods:

**Pyz\Zed\DataImport\Communication\Plugin\ProductAbstract\ProductAbstractQueueWriterPlugin**

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

Create additional plugins for other resources, should they need to be imported with the help of message queues.

{% endinfo_block %}

5. Add the names of the new queues to the `RabbitMq` module configuration class. In `Pyz\Client\RabbitMq\RabbitMqConfig`, register the new queues for the resource.

**Pyz\Client\RabbitMq\RabbitMqConfig**

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

6. Enable queue data import: In `Pyz\Zed\DataImport\Business\DataImportBusinessFactory`, remove all the old code related to importing the selected resource data.

7. Add a method for creating `DataSetWriterCollection` based on that plugin and another one for creating the data importer, which works on top of this collection. Add a call to this method to `DataImportBusinessFactory::getImporter()`.

<details><summary>Pyz\Zed\DataImport\Business\DataImportBusinessFactory</summary>

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
</details>

Pay attention to the `::setImportGroup()` method call on the data importer instance. By calling this method, an import group can be set for each separate data import. Import groups allow you to run importers separately on a per-group basis by supplying the group name as an option for the data import console command. Three groups are supported out of the box: *FULL*, *QUEUE_READERS*, *QUEUE_WRITERS*. With no call to `::setImportGroup`, the data importer is placed into the FULL group by default.
{% info_block warningBox "Note" %}

We not recommend using the QUEUE_READERS group. This executes all the configured queue importers during one import run. Because in a lot of scenarios the order, in which the data is imported, matters and because of the possibility of the race condition, this can lead to various malfunctions or inconsistencies in the imported data. We recommend structuring the import process in a way that would allow importing data via the message queues apart from other imported resources.

{% endinfo_block %}

Now, product abstract data is stored in the dedicated queue whenever you run

```bash
vendor/bin/console data:import --group=QUEUE_WRITERS
```

{% info_block errorBox "Important" %}

Use import groups together with import types. For example, this command is illegal and leads to an exception:

```bash
vendor/bin/console data:import:product-abstract --group=QUEUE_WRITERS
```

{% endinfo_block %}

{% info_block warningBox "Note" %}

We also recommend preparing the properly structured data for the import in queues from the very beginning instead of actually importing it from CSV, XML, etc., as the first step. In this case, a queue can be treated as an original source of data for import which would make the overall process more convenient.

{% endinfo_block %}

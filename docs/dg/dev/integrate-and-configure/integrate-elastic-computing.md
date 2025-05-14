---
title: Integrate elastic computing
description: Learn how to integrate elastic computing including New Relic and other features for your Spryker based project.
last_updated: Jan 23, 2023
template: concept-topic-template
redirect_from:
- /docs/scos/dev/technical-enhancement-integration-guides/integrate-elastic-computing.html
---

Spryker is shipped with several elastic computing features that let you to utilize computational resources more efficiently.

## Integrate New Relic monitoring

To integrate New Relic monitoring for the infastructure of queue workers in publish and sync (P&S), follow the steps:

1. Update module `spryker/monitoring` to version 2.5.0 or higher.
2. In `Pyz\Zed\Monitoring\MonitoringConfig`, add `queue:task:start` command to the argument grouped transactions:

```php
namespace Pyz\Zed\Monitoring;

use Spryker\Zed\Monitoring\MonitoringConfig as BaseMonitoringConfig;

class MonitoringConfig extends BaseMonitoringConfig
{
    /**
     * @return array<string>
     */
    public function getGroupedByArgumentTransactions(): array
    {
        return ['queue:task:start'];
    }
}
```

3. In `Pyz\Zed\Monitoring\Business\MonitoringBusinessFactory`, enable `FirstArgumentMonitoringConsoleTransactionNamingStrategy` to be used for transaction naming.

```php
    /**
     * @return array<\Spryker\Zed\Monitoring\Business\MonitoringTransactionNamingStrategy\MonitoringTransactionNamingStrategyInterface>
     */
    public function getMonitoringTransactionNamingStrategies(): array
    {
        return [
            $this->createFirstArgumentMonitoringConsoleTransactionNamingStrategy(),
        ];
    }

    /**
     * @return \Spryker\Zed\Monitoring\Business\MonitoringTransactionNamingStrategy\MonitoringTransactionNamingStrategyInterface
     */
    public function createFirstArgumentMonitoringConsoleTransactionNamingStrategy(): MonitoringTransactionNamingStrategyInterface
    {
        return new FirstArgumentMonitoringConsoleTransactionNamingStrategy($this->getConfig()->getGroupedByArgumentTransactions());
    }
```

Now New Relic groups transactions for the same command by the first argument. When there are multiple `queue:task:start` commands with different queue names as arguments, New Relic will group them by the queue names.

## Integrate RAM-aware batch processing

Batch processing significantly speeds up processing operations. Moving more data into RAM at once decreases the number of I/O, which decreases operations' processing time. Dynamic batch size calcualtion based on available RAM decreases it even more.

To intagrate elastic batch for the glossary data import as an example, follow the steps:

1. In `Pyz\Zed\DataImport\DataImportConfig`, add the following configuration:

- `BulkWriteGradualityFactor`: estimates an upper limit of memory that can be safely utilized by operations. A bigger value enables a more precise approximation but requires more iterations. A smaller value gives a less precise approximation but requires less iterations.

- `BulkWriteMemoryThresholdPercent`: defines a margin of PHP memory limit configured in PHP.


```php
/**
 * @SuppressWarnings(PHPMD.ExcessiveClassComplexity)
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
 */
class DataImportConfig extends SprykerDataImportConfig
{
    ...

    /**
     * @return int
     */
    public function getBulkWriteGradualityFactor(): int
    {
        return 5;
    }

    /**
     * @return int
     */
    public function getBulkWriteMemoryThesoldPercent(): int
    {
        return 95;
    }
}
```

2. In `src/Pyz/Zed/DataImport/Business/DataImportBusinessFactory.php`, adjust the creation of the data importer. The updated data importer uses `DataSetStepBrokerElasticBatchTransactionAware` and its writer steps receive  `MemoryAllocatedElasticBatch`.

```php
/**
 * @method \Pyz\Zed\DataImport\DataImportConfig getConfig()
 * @SuppressWarnings(PHPMD.CyclomaticComplexity)
 * @SuppressWarnings(PHPMD.ExcessiveClassComplexity)
 * @SuppressWarnings(PHPMD.ExcessiveClassLength)
 */
class DataImportBusinessFactory extends SprykerDataImportBusinessFactory
{
  ...
  protected function createGlossaryImporter(
        DataImportConfigurationActionTransfer $dataImportConfigurationActionTransfer
        ): DataImporterInterface
    {
      $dataImporter = $this->getCsvDataImporterFromConfig(
            $this->getConfig()->buildImporterConfigurationByDataImportConfigAction($dataImportConfigurationActionTransfer),
        );
      $dataSetStepBroker = $this->createElasticBatchTransactionAwareDataSetStepBroker(GlossaryWriterStep::BULK_SIZE);
      $dataSetStepBroker
        ->addStep($this->createLocaleNameToIdStep(GlossaryWriterStep::KEY_LOCALE))
        ->addStep(new GlossaryWriterStep($this->createMemoryAllocatedElasticBatch()));

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }
  ...
}
```

3. In `Pyz\Zed\DataImport\Business\Model\Glossary\GlossaryWriterStep`, update the writer steps by adjusting the execute method to flush `MemoryAllocatedElasticBatch` when it's full.


```php
<?php
/**
 * This file is part of the Spryker Suite.
 * For full license information,  view the LICENSE file that was distributed with this source code.
 */
namespace Pyz\Zed\DataImport\Business\Model\Glossary;
use Orm\Zed\Glossary\Persistence\SpyGlossaryKeyQuery;
use Orm\Zed\Glossary\Persistence\SpyGlossaryTranslationQuery;
use Spryker\Shared\GlossaryStorage\GlossaryStorageConfig;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\DataImport\Business\Model\ElasticBatch\ElasticBatchInterface;

class GlossaryWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    /**
     * @var int
     */
    public const BULK_SIZE = 100;
    /**
     * @var string
     */
    public const KEY_KEY = 'key';
    /**
     * @var string
     */
    public const KEY_TRANSLATION = 'translation';
    /**
     * @var string
     */
    public const KEY_ID_LOCALE = 'idLocale';
    /**
     * @var string
     */
    public const KEY_LOCALE = 'locale';

    /**
     * @var ElasticBatchInterface
     */
    protected $memoryAllocatedElasticBatch;

    protected $dataSetBatch = [];

    public function __construct(ElasticBatchInterface $memoryAllocatedElasticBatch)
    {
        $this->memoryAllocatedElasticBatch = $memoryAllocatedElasticBatch;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $this->dataSetBatch[] = $dataSet;
        if ($this->memoryAllocatedElasticBatch->isFull()) {

            $this->flush();
        }
    }

    /**
     * @return void
     * @throws \Propel\Runtime\Exception\PropelException
     * @throws \Spryker\Zed\Propel\Business\Exception\AmbiguousComparisonExceptione
     */
    protected function flush(): void
    {
        foreach ($this->dataSetBatch as $dataSet) {
            $this->processDataSet($dataSet);
        }
        $this->dataSetBatch = [];
        $this->memoryAllocatedElasticBatch->reset();
    }

    /**
     * @param DataSetInterface $dataSet
     * @return void
     * @throws \Propel\Runtime\Exception\PropelException
     * @throws \Spryker\Zed\Propel\Business\Exception\AmbiguousComparisonException
     */
    protected function processDataSet(DataSetInterface $dataSet): void
    {
        $glossaryKeyEntity = SpyGlossaryKeyQuery::create()
            ->filterByKey($dataSet[static::KEY_KEY])
            ->findOneOrCreate();
        $glossaryKeyEntity->save();
        $glossaryTranslationEntity = SpyGlossaryTranslationQuery::create()
            ->filterByGlossaryKey($glossaryKeyEntity)
            ->filterByFkLocale($dataSet[static::KEY_ID_LOCALE])
            ->findOneOrCreate();
        $glossaryTranslationEntity
            ->setValue($dataSet[static::KEY_TRANSLATION])
            ->save();
        $this->addPublishEvents(GlossaryStorageConfig::GLOSSARY_KEY_PUBLISH_WRITE, $glossaryTranslationEntity->getFkGlossaryKey());
    }
}

```


<!--


## Integrate scalable application infrastructure for publish and sync workers

1. Update module `spryker/queue` to version 1.10.0 or higher.
2. Set `THREAD_POOL_SIZE` to the number of your CPU cores plus one.
```php
  <?php

namespace Pyz\Zed\Queue;

use Generated\Shared\Transfer\RabbitMqConsumerOptionTransfer;
use Spryker\Shared\Config\Config;
use Spryker\Shared\Event\EventConstants;
use Spryker\Shared\Log\LogConstants;
use Spryker\Shared\Queue\QueueConstants;
use Spryker\Zed\Queue\QueueConfig as SprykerQueueConfig;

class QueueConfig extends SprykerQueueConfig
{
  public const CPU_CORE_NUMBER = 32; // your system's CPU core count

    /**
     * @return array<string, mixed>
     */
    protected function getThreadPoolSize(): int
    {
        return static::CPU_CORE_NUMBER + 1;
    }

}
```

As a result, the worker spawns a group of processes per each non-empty queue based on the number of messages and available RAM.

-->

## Integrate Storage caching for primary-replica database setups

1. Update module `spryker/propel-orm` to version 1.15.1 or higher.
2. Update module `spryker/propel-replication-cache` to version 1.0.0 or higher.
3. In `config/Shared/config_default.php`, add the following configuration.

```php
<?php
use Spryker\Shared\PropelReplicationCache\PropelReplicationCacheConstants;

// Sets if DB replication is enabled
$config[PropelReplicationCacheConstants::IS_REPLICATION_ENABLED] = (bool)$config[PropelConstants::ZED_DB_REPLICAS];

// Cache key lifetime in seconds
$config[PropelReplicationCacheConstants::CACHE_TTL] = 2;
```

4. To enable "cache key" management in the background using propel entities, in `src/Pyz/Zed/PropelOrm/PropelOrmDependencyProvider.php`, wire the `FindExtensionPlugin` and `PostSaveExtensionPlugin` plugins:

```php
<?php

namespace Pyz\Zed\PropelOrm;

use Spryker\Zed\PropelOrm\PropelOrmDependencyProvider as SprykerPropelOrmDependencyProvider;
use Spryker\Zed\PropelReplicationCache\Communication\Plugin\PropelOrm\FindExtensionPlugin;
use Spryker\Zed\PropelReplicationCache\Communication\Plugin\PropelOrm\PostSaveExtensionPlugin;

class PropelOrmDependencyProvider extends SprykerPropelOrmDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\PropelOrmExtension\Dependency\Plugin\FindExtensionPluginInterface>
     */
    protected function getFindExtensionPlugins(): array
    {
        return [
            new FindExtensionPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\PropelOrmExtension\Dependency\Plugin\PostSaveExtensionPluginInterface>
    */
    protected function getPostSaveExtensionPlugins(): array
    {
        return [
          new PostSaveExtensionPlugin(),
        ];
    }
}
```

5. To apply the changes, rebuild Propel models:

```bash
docker/sdk console propel:model:build
```

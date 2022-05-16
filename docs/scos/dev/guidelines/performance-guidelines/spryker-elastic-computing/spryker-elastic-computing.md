---
title: Spryker Elastic Computing
description: This guideline explains how to use Elastic Computing functionality.
last_updated: May 16, 2022
template: concept-topic-template
---

Spryker provides several elastic computing features OOTB that allows to utilise computational resources in a more efficient way. 

# Monitoring
For enabling New Relic monitoring for P&S and queue workers infrastructure, please follow the next steps:

1. Update `spryker/monitoring` module at least to v2.5.0.
2. Add `queue:task:start` command to the argument grouped transactions in `Pyz\Zed\Monitoring\MonitoringConfig` configuration class
```php
namespace Pyz\Zed\Monitoring;

use Spryker\Zed\Monitoring\MonitoringConfig as BaseMonitoringConfig;

class MonitoringConfig extends BaseMonitoringConfig
{
    /**
     * @api
     *
     * @return array<string>
     */
    public function getGroupedByArgumentTransactions(): array
    {
        return ['queue:task:start'];
    }
}
```
3. Add to the `Pyz\Zed\Monitoring\Business\MonitoringBusinessFactory` following lines of code:
```php
public function getMonitoringTransactionNamingStrategies(): array
    {
        return [
            return new FirstArgumentMonitoringConsoleTransactionNamingStrategy($this->getConfig()->getGroupedByArgumentTransactions());
        ];
    }
```
This will aggregates all different queue worker transactions under corresponding `queue:task:start [queue_name]` transaction name in New Relic.

As a result, the transactions will appear in New Relic dashboard as on the following illustration:

# RAM-aware batch processing integration
Batch processing allows significantly speed up processing operations. Moving more data into RAM at once allows decrease the number of I/O thus winning some operations wall time. To win even more time one can calculate batch size dynamically, based on available RAM. 

This can be achieved with elastic batch concept introduced in `spryker/data-import` module. The following instruction will explain the integration details of elastic batch using the glossary data import as an example.

> :info: Similar integration must be applied for all project data importers.

1. Configure in `Pyz\Zed\DataImport\DataImportConfig` following configuration parameters by adding next code block:
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

`BulkWriteGradualityFactor` is an integer allowing to estimate an upper limit of memory that can be safely utilised by operation. A higher number will allow to approximate the limit with more precision but in more iteration. Lower number will estimate in less iteration but less precise as well.

`BulkWriteMemoryThresholdPercent` defines defines a margin of php memory limit configured in PHP.

2. As the next step adjust creation of data importer in `src/Pyz/Zed/DataImport/Business/DataImportBusinessFactory.php` so it’s new version will
- make use of `DataSetStepBrokerElasticBatchTransactionAware` data set step broker and
- the writer steps receive the `MemoryAllocatedElasticBatch`
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

3. Finally, update the writer steps (`Pyz\Zed\DataImport\Business\Model\Glossary\GlossaryWriterStep`) as it is show in the code below by adjusting the execute method to flush `MemoryAllocatedElasticBatch` when it is full.
```php
<?php
/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
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

# Scalable application infrastructure for P&S workers
1. Update `spryker/queue` module at least to v1.10.0.
2. Configure `THREAD_POOL_SIZE` parameter equals to the number of your CPU cores plus one.
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

As the result, worker will spawn a group of processes per each non empty queue with consideration of number of messages and available RAM. 

# Primary-Replica DB reading & writing integration
For enabling an enhanced usage of primary-replice DB setup, you need to apply the following steps.

1. Update `spryker/propel-orm` module to at least v1.15.1
2. Update/install spryker/propel-replication-cache module to at least v1.0.0
3. Adjust the `config/Shared/config_default.php` with the following two settings
```php
<?php
use Spryker\Shared\PropelReplicationCache\PropelReplicationCacheConstants;

// Sets if DB replication is enabled
$config[PropelReplicationCacheConstants::IS_REPLICATION_ENABLED] = (bool)$config[PropelConstants::ZED_DB_REPLICAS];

// Cache key lifetime in seconds
$config[PropelReplicationCacheConstants::CACHE_TTL] = 2;
```

4. Wire the `FindExtensionPlugin` and `PostSaveExtensionPlugin` plugins in `src/Pyz/Zed/PropelOrm/PropelOrmDependencyProvider.php` to enable “Cache key” management in the background using propel entities.
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

5. Rebuild Propel models. This is required for all changes above to take an effect.
```
docker/sdk console propel:model:build
```
---
title: Configure event queues
description: Configure event queues in Spryker to manage asynchronous tasks effectively. Optimize backend performance by organizing event-driven workflows with ease.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/event-configure-q
originalArticleId: c4cf6639-48cd-4fb3-a595-09764433f7af
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/event/configure-event-queues.html
  - /docs/scos/dev/back-end-development/data-manipulation/event/configuring-an-events-queue.html
related:
  - title: Event
    link: docs/scos/dev/back-end-development/data-manipulation/event/event.html
  - title: Add events
    link: docs/scos/dev/back-end-development/data-manipulation/event/add-events.html
  - title: Listening to events
    link: docs/scos/dev/back-end-development/data-manipulation/event/listening-to-events.html
---

This document describes how event queues are configured.

To configure the event queue, follow these steps:

1. Install `spryker/queue` version at least 1.*. and `spryker/rabbit-mq`
2. Create the configuration for RabbitMQ in `\Pyz\Client\RabbitMq\RabbitMqDependencyProvider` as follows:

```php
<?php
namespace Pyz\Client\RabbitMq;

use ArrayObject;
use Generated\Shared\Transfer\RabbitMqOptionTransfer;
use Spryker\Client\RabbitMq\Model\Connection\Connection;
use Spryker\Client\RabbitMq\RabbitMqDependencyProvider as RabbitMqRabbitMqDependencyProvider;
use Spryker\Shared\Event\EventConstants;

class RabbitMqDependencyProvider extends RabbitMqRabbitMqDependencyProvider
{

    /**
     * @return \ArrayObject
     */
    protected function getQueueOptions()
    {
        $queueOptionCollection = new ArrayObject();
        $queueOptionCollection->append($this->createEventExchangeQueueOption());
        $queueOptionCollection->append($this->createEventErrorExchangeQueueOption());

        return $queueOptionCollection;
    }

    /**
     * @return \Generated\Shared\Transfer\RabbitMqOptionTransfer
     */
    protected function createEventExchangeQueueOption()
    {
        $rabbitMqOptionTransfer = new RabbitMqOptionTransfer();
        $rabbitMqOptionTransfer->setQueueName(EventConstants::EVENT_QUEUE);
        $rabbitMqOptionTransfer->setAutoDelete(false);
        $rabbitMqOptionTransfer->setDurable(true);
        $rabbitMqOptionTransfer->setPassive(false);
        $rabbitMqOptionTransfer->setType('direct');
        $rabbitMqOptionTransfer->setDeclarationType(Connection::RABBIT_MQ_EXCHANGE);
        $rabbitMqOptionTransfer->setBindingQueue($this->createEventQueueBinding());

        return $rabbitMqOptionTransfer;
    }

    /**
     * @return \Generated\Shared\Transfer\RabbitMqOptionTransfer
     */
    protected function createEventErrorExchangeQueueOption()
    {
        $rabbitMqOptionTransfer = new RabbitMqOptionTransfer();
        $rabbitMqOptionTransfer->setQueueName(EventConstants::EVENT_QUEUE);
        $rabbitMqOptionTransfer->setAutoDelete(false);
        $rabbitMqOptionTransfer->setDurable(true);
        $rabbitMqOptionTransfer->setPassive(false);
        $rabbitMqOptionTransfer->setType('direct');
        $rabbitMqOptionTransfer->setDeclarationType(Connection::RABBIT_MQ_EXCHANGE);
        $rabbitMqOptionTransfer->setBindingQueue($this->createEventErrorQueueBinding());

        return $rabbitMqOptionTransfer;
    }

    /**
     * @return \Generated\Shared\Transfer\RabbitMqOptionTransfer
     */
    protected function createEventErrorQueueBinding()
    {
        $rabbitMqOptionTransfer = new RabbitMqOptionTransfer();
        $rabbitMqOptionTransfer->setQueueName(EventConstants::EVENT_QUEUE . '.error');
        $rabbitMqOptionTransfer->setAutoDelete(false);
        $rabbitMqOptionTransfer->setDurable(true);
        $rabbitMqOptionTransfer->setExclusive(false);
        $rabbitMqOptionTransfer->setPassive(false);
        $rabbitMqOptionTransfer->setRoutingKey('error');

        return $rabbitMqOptionTransfer;
    }

    /**
     * @return \Generated\Shared\Transfer\RabbitMqOptionTransfer
     */
    protected function createEventQueueBinding()
    {
        $rabbitMqOptionTransfer = new RabbitMqOptionTransfer();
        $rabbitMqOptionTransfer->setQueueName(EventConstants::EVENT_QUEUE);
        $rabbitMqOptionTransfer->setAutoDelete(false);
        $rabbitMqOptionTransfer->setDurable(true);
        $rabbitMqOptionTransfer->setExclusive(false);
        $rabbitMqOptionTransfer->setPassive(false);

        return $rabbitMqOptionTransfer;
    }

}
```

3. In `\Pyz\Client\Queue\QueueDependencyProvider`, add the RabbitMQ adapter:

```php
<?php
namespace Pyz\Client\Queue;

use Spryker\Client\Kernel\Container;
use Spryker\Client\Queue\QueueDependencyProvider as BaseQueueDependencyProvider;

class QueueDependencyProvider extends BaseQueueDependencyProvider
{

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Queue\Model\Adapter\AdapterInterface[]
     */
    protected function createQueueAdapters(Container $container)
    {
        return [
            $container->getLocator()->rabbitMq()->client()->createQueueAdapter(),
        ];
    }

}
```

4. In `\Pyz\Zed\Queue\QueueConfig`, add receiver options for the event queue:

```php
<?php
namespace Pyz\Zed\Queue;

use Generated\Shared\Transfer\RabbitMqConsumerOptionTransfer;
use Spryker\Shared\Event\EventConstants;
use Spryker\Zed\Queue\QueueConfig as SprykerQueueConfig;

class QueueConfig extends SprykerQueueConfig
{

    /**
     * @return array
     */
    protected function getQueueReceiverOptions()
    {
        return [
            EventConstants::EVENT_QUEUE => [
                'rabbitmq' => $this->getRabbitMqQueueConsumerOptions(),
            ],
        ];
    }

    /**
     * @return \Generated\Shared\Transfer\RabbitMqConsumerOptionTransfer
     */
    protected function getRabbitMqQueueConsumerOptions()
    {
        $queueOptionTransfer = new RabbitMqConsumerOptionTransfer();
        $queueOptionTransfer->setQueueName(EventConstants::EVENT_QUEUE);
        $queueOptionTransfer->setConsumerTag('');
        $queueOptionTransfer->setNoLocal(false);
        $queueOptionTransfer->setNoAck(false);
        $queueOptionTransfer->setConsumerExclusive(false);
        $queueOptionTransfer->setNoWait(false);

        return $queueOptionTransfer;
    }

}
```

5. In `\Pyz\Zed\Queue\QueueDependencyProvider`, add a plugin (consumer) to process messages or events.

```php
<?php
namespace Pyz\Zed\Queue;

use Spryker\Shared\Event\EventConstants;
use Spryker\Zed\Event\Communication\Plugin\Queue\EventQueueMessageProcessorPlugin;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\RabbitMq\Communication\Plugin\Queue\RabbitMqQueueMetricsReaderPlugin;

class QueueDependencyProvider extends SprykerDependencyProvider
{

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface[]
     */
    protected function getProcessorMessagePlugins(Container $container)
    {
        return [
            EventConstants::EVENT_QUEUE => new EventQueueMessageProcessorPlugin(),
        ];
    }
    
    /**
     * @return array<\Spryker\Zed\RabbitMq\Communication\Plugin\Queue\RabbitMqQueueMetricsReaderPlugin>
     */
    protected function getQueueMetricsExpanderPlugins(): array
    {
        return [
            new RabbitMqQueueMetricsReaderPlugin(), // Provides RabbitMQ-specific metrics for the resource-aware queue worker. Applicable only for RabbitMqAdapter.
        ];
    }
}
```

6. In your application's configuration file `./config/Shared/config_default.php` or environment specific, make sure you have this configuration:

```php
<?php

$config[QueueConstants::QUEUE_SERVER_ID] = (gethostname()) ?: php_uname('n'); //test changes
$config[QueueConstants::QUEUE_WORKER_INTERVAL_MILLISECONDS] = 1000; // default 1000
$config[QueueConstants::QUEUE_WORKER_MAX_THRESHOLD_SECONDS] = 60; // 1min

$config[QueueConstants::QUEUE_ADAPTER_CONFIGURATION] = [
    EventConstants::EVENT_QUEUE => [
        QueueConfig::CONFIG_QUEUE_ADAPTER => \Spryker\Client\RabbitMq\Model\RabbitMqAdapter::class,
        QueueConfig::CONFIG_MAX_WORKER_NUMBER => 1, //Increase number of workers if higher concurrency needed.
    ],
];

// Enables processing of queues with resource aware queue worker.
$config[QueueConstants::RESOURCE_AWARE_QUEUE_WORKER_ENABLED] = (bool)getenv('RESOURCE_AWARE_QUEUE_WORKER_ENABLED') ?? false;
$config[QueueConstants::QUEUE_WORKER_FREE_MEMORY_BUFFER] = (int)getenv('QUEUE_WORKER_FREE_MEMORY_BUFFER') ?: 750;
$config[QueueConstants::QUEUE_WORKER_MEMORY_READ_PROCESS_TIMEOUT] = (int)getenv('QUEUE_WORKER_MEMORY_READ_PROCESS_TIMEOUT') ?: 5;
$config[QueueConstants::QUEUE_WORKER_MAX_PROCESSES] = 10; // concurrent, for all queues/stores, default 5
$config[QueueConstants::QUEUE_WORKER_PROCESSES_COMPLETE_TIMEOUT] = 600; // 10 min, default 5 min
```

## Metrics and resource-aware worker configuration

This section explains the purpose and recommended tuning for the RabbitMq metrics plugin and the resource-aware queue worker configuration options referenced above.

### RabbitMqQueueMetricsReaderPlugin

- Purpose: Supplies RabbitMQ-specific runtime metrics (for example queue depth: ready/unacknowledged counts, consumer counts, throughput indicators) to the resource-aware queue worker.
- Applicability: Only relevant when using the `RabbitMqAdapter`. Register the plugin via `getQueueMetricsExpanderPlugins()` in your `QueueDependencyProvider` to enable metric collection.
- Effect: Enables metric-driven decisions by the resource-aware worker (scale up when queues grow, avoid starting new workers when memory/broker constraints are detected).
- Recommendation: Enable this plugin if you run RabbitMQ and want automatic adaptation of worker processes to real load for current settings.

### Configuration keys

- `QueueConstants::QUEUE_WORKER_INTERVAL_MILLISECONDS`
  - Type / unit: integer (milliseconds)
  - Example/default: 1000 (example in file), default 1000
  - Purpose: Polling interval for the scheduler loop that evaluates metrics and makes scaling/dispatch decisions.
  - Recommendation: Use 1000ms for most systems; lower (100–500ms) for latency-sensitive environments with available CPU; increase to reduce scheduler overhead.

- `QueueConstants::QUEUE_WORKER_MAX_THRESHOLD_SECONDS`
  - Type / unit: integer (seconds)
  - Example/default: 60
  - Purpose: Time window used when evaluating worker saturation and queue backlog thresholds (decides when tasks are considered long-running or when queues are accumulating work).
  - Recommendation: 60s is a sensible default. Increase for long-running jobs, decrease for short, quick tasks.

- `QueueConstants::RESOURCE_AWARE_QUEUE_WORKER_ENABLED`
  - Type / unit: boolean
  - Example/default: `(bool)getenv('RESOURCE_AWARE_QUEUE_WORKER_ENABLED') ?? false`
  - Purpose: Toggle resource-aware behavior. When enabled, workers use external metrics and thresholds to decide how many processes to run and when to throttle.
  - Recommendation: Enable when RabbitMQ + metrics plugin are available and you want dynamic scaling; disable for simple/static setups.

- `QueueConstants::QUEUE_WORKER_FREE_MEMORY_BUFFER`
  - Type / unit: integer (megabytes)
  - Example/default: `(int)getenv('QUEUE_WORKER_FREE_MEMORY_BUFFER') ?: 750`
  - Purpose: Memory safety buffer in MB. Prevents launching new workers if available free memory falls below this value.
  - Recommendation: Tune based on host RAM and per-worker memory usage. For small hosts (4GB) use 512–1024MB; for larger hosts adjust proportionally.

- `QueueConstants::QUEUE_WORKER_MEMORY_READ_PROCESS_TIMEOUT`
  - Type / unit: integer (seconds)
  - Example/default: `(int)getenv('QUEUE_WORKER_MEMORY_READ_PROCESS_TIMEOUT') ?: 5`
  - Purpose: Interval/timeout used when sampling worker process memory usage for resource-aware decisions.
  - Recommendation: 5s is a good balance between responsiveness and sampling overhead; increase if sampling is costly.

- `QueueConstants::QUEUE_WORKER_MAX_PROCESSES`
  - Type / unit: integer (process count)
  - Example/default: 10 (example in file), default 5
  - Purpose: Upper limit of concurrent worker processes spawned across all queues/stores.
  - Recommendation: Start conservatively (for example number of CPU cores) and increase according to CPU, memory and workload characteristics.

- `QueueConstants::QUEUE_WORKER_PROCESSES_COMPLETE_TIMEOUT`
  - Type / unit: integer (seconds)
  - Example/default: 600 (10 minutes)
  - Purpose: Grace period to wait for worker processes to finish current tasks before termination/recycling.
  - Recommendation: Set to accommodate the longest expected job runtime plus margin; shorter timeouts make recycling more aggressive.

### Quick tuning tips

1. When enabling `RESOURCE_AWARE_QUEUE_WORKER_ENABLED`, also register `RabbitMqQueueMetricsReaderPlugin` so the worker receives broker metrics.
2. Tune `QUEUE_WORKER_MAX_PROCESSES` against CPU cores and available memory to avoid resource exhaustion.
3. Use environment variables for per-environment tuning (staging vs production).
4. Lower `QUEUE_WORKER_INTERVAL_MILLISECONDS` for faster reaction at the cost of higher CPU; increase `QUEUE_WORKER_FREE_MEMORY_BUFFER` to protect systems with limited RAM.

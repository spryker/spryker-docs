---
title: Configuring an Events Queue
originalLink: https://documentation.spryker.com/v1/docs/event-configure-q
redirect_from:
  - /v1/docs/event-configure-q
  - /v1/docs/en/event-configure-q
---

This article descirbes how event queues are configured.

To configure the events queue:

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

5. In `\Pyz\Zed\Queue\QueueDependencyProvider`, add a plugin(consumer) to process messages/events.
```php
<?php
namespace Pyz\Zed\Queue;

use Spryker\Shared\Event\EventConstants;
use Spryker\Zed\Event\Communication\Plugin\Queue\EventQueueMessageProcessorPlugin;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;

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

}
```
6. In your application’s configuration file `./config/Shared/config_default.php` or environment specific make sure you have this configuration:
```php
<?php
$config[QueueConstants::QUEUE_SERVER_ID] = (gethostname()) ?: php_uname('n');
$config[QueueConstants::QUEUE_WORKER_INTERVAL_MILLISECONDS] = 5000;
$config[QueueConstants::QUEUE_WORKER_MAX_THRESHOLD_SECONDS] = 59;

$config[QueueConstants::QUEUE_ADAPTER_CONFIGURATION] = [
    EventConstants::EVENT_QUEUE => [
        QueueConfig::CONFIG_QUEUE_ADAPTER => \Spryker\Client\RabbitMq\Model\RabbitMqAdapter::class,
        QueueConfig::CONFIG_MAX_WORKER_NUMBER => 1, //Increase number of workers if higher concurrency needed.
    ],
];
```

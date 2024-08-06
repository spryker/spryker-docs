---
title: Loggly
description: Overview of the Loggly integration.
template: concept-topic-template
last_updated: Sep 12, 2023
redirect_from:
    - /docs/scos/dev/technology-partner-guides/202200.0/operational-tools-monitoring-legal-etc/loggly/loggly.html
---

The Loggly module provides a plugin to read log messages from a queue and send the messages via https to [Loggly](https://www.loggly.com/).

To integrate this plugin you need to have the `QueueHandler` enabled in your Logger configuration. <!-- as described [here](/docs/dg/dev/backend-development/data-manipulation/data-ingestion/spryker-link-middleware.html).-->

In addition you need to properly configure the queue setup for Loggly to work.

## RabbitMqDependencyProvider

```php
<?php

namespace Pyz\Client\RabbitMq;

use ArrayObject;
use Generated\Shared\Transfer\RabbitMqOptionTransfer;
use Spryker\Client\RabbitMq\RabbitMqDependencyProvider as RabbitMqRabbitMqDependencyProvider;
use Spryker\Shared\Config\Config;
use SprykerEco\Shared\Loggly\LogglyConstants;

class RabbitMqDependencyProvider extends RabbitMqRabbitMqDependencyProvider
{

 /**
 * @return \ArrayObject
 */
 protected function getQueueOptions()
 {
 $queueOptionCollection = new ArrayObject();
 $queueOptionCollection->append($this->getLoggerQueueOption());

 return $queueOptionCollection;
 }

 /**
 * @return \Generated\Shared\Transfer\RabbitMqOptionTransfer
 */
 protected function getLoggerQueueOption()
 {
 $queueOption = new RabbitMqOptionTransfer();
 $queueOption->setQueueName(Config::get(LogglyConstants::QUEUE_NAME));
 $queueOption->setDurable(true);
 $queueOption->setType('direct');
 $queueOption->setDeclarationType(Connection::RABBIT_MQ_EXCHANGE);
 $queueOption->setBindingQueue($this->getLoggerQueueBinding());

 return $queueOption;
 }

 /**
 * @return \Generated\Shared\Transfer\RabbitMqOptionTransfer
 */
 protected function getLoggerQueueBinding()
 {
 $queueOption = new RabbitMqOptionTransfer();
 $queueOption->setQueueName(Config::get(LogglyConstants::QUEUE_NAME));
 $queueOption->setDurable(true);

 return $queueOption;
 }

}
```

## QueueConfig

```php
<?php

namespace Pyz\Zed\Queue;

use Generated\Shared\Transfer\RabbitMqConsumerOptionTransfer;
use Spryker\Shared\Config\Config;
use Spryker\Shared\Event\EventConstants;
use Spryker\Zed\Queue\QueueConfig as SprykerQueueConfig;
use SprykerEco\Shared\Loggly\LogglyConstants;

class QueueConfig extends SprykerQueueConfig
{

 /**
 * @return array
 */
 protected function getQueueReceiverOptions()
 {
 return [
 Config::get(LogglyConstants::QUEUE_NAME) => [
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
 $queueOptionTransfer->setConsumerExclusive(false);
 $queueOptionTransfer->setNoWait(false);

 return $queueOptionTransfer;
 }

}
```

## QueueDependencyProvider

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Shared\Config\Config;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use SprykerEco\Shared\Loggly\LogglyConstants;
use SprykerEco\Zed\Loggly\Communication\Plugin\LogglyLoggerQueueMessageProcessorPlugin;

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
 Config::get(LogglyConstants::QUEUE_NAME) => new LogglyLoggerQueueMessageProcessorPlugin(),
 ];
 }

}
```

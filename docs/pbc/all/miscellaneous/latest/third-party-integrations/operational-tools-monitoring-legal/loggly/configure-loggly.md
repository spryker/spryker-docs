---
title: Configuring Loggly
last_updated: Jun 16, 2021
template: howto-guide-template
redirect_from:
    - /docs/scos/dev/technology-partner-guides/202200.0/operational-tools-monitoring-legal-etc/loggly/configuring-loggly.html
    - /docs/scos/dev/technology-partner-guides/202204.0/operational-tools-monitoring-legal-etc/loggly/configuring-loggly.html
    - /docs/pbc/all/miscellaneous/latest/third-party-integrations/operational-tools-monitoring-legal/loggly/configure-loggly.html
---


To configure Loggly, do the following.

## 1. Adjusting the config_default.php file

First of all, add necessary data to the *config_default.php* file:

```php
<?php
use SprykerEco\Shared\Loggly\LogglyConstants;
// ...

$config[LogglyConstants::TOKEN] = 'Token for your Loggly account';
$config[LogglyConstants::QUEUE_NAME] = 'Name of a log queue';

// Chunk size for messages to be processed from queue (default: 50)
$config[LogglyConstants::QUEUE_CHUNK_SIZE] = $chunkSize;

```

## 2. Setting up a log queue

Next, you have to set up a log queue. On project level, add the name of a log queue to an array returned by `\Pyz\Client\RabbitMq\RabbitMqConfig::getQueueConfiguration()` method:

**Pyz\Client\RabbitMqRabbitMqConfig**

```php
<?php

namespace Pyz\Client\RabbitMq;

use SprykerEco\Shared\Loggly\LogglyConstants
class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return array
     */
    protected function getQueueConfiguration(): array
    {
        return [
            // ...
            $this->get(LogglyConstants::QUEUE_NAME),
        ];
    }
```

## 3. Configuring a queue consumer

Configure a queue consumer in `Pyz\Zed\Queue\QueueConfig`:

**Pyz\Zed\Queue\QueueConfig**

```php
<?php

namespace Pyz\Zed\Queue;

use Generated\Shared\Transfer\RabbitMqConsumerOptionTransfer;
use Spryker\Shared\Config\Config;
use Spryker\Zed\Queue\QueueConfig as SprykerQueueConfig;
use SprykerEco\Shared\Loggly\LogglyConstants;

class QueueConfig extends SprykerQueueConfig
{
    public const RABBITMQ = 'rabbitmq';

    /**
     * @return array
     */
    protected function getQueueReceiverOptions(): array
    {
        return [
            // ...
            Config::get(LogglyConstants::QUEUE_NAME) => [
                static::RABBITMQ => $this->getRabbitMqQueueConsumerOptions(),
            ],
        ];
    }

    /**
     * @return \Generated\Shared\Transfer\RabbitMqConsumerOptionTransfer
     */
    protected function getRabbitMqQueueConsumerOptions(): RabbitMqConsumerOptionTransfer
    {
        $queueOptionTransfer = new RabbitMqConsumerOptionTransfer();
        $queueOptionTransfer->setConsumerExclusive(false);
        $queueOptionTransfer->setNoWait(false);

        return $queueOptionTransfer;
    }

    // ...
}
```

## 4. Registering the Loggly plugin

Finally, register `\SprykerEco\Zed\Loggly\Communication\Plugin\LogglyLoggerQueueMessageProcessorPlugin` in  `\Pyz\Zed\Queue\QueueDependencyProvider::getProcessorMessagePlugins`:

**Pyz\Zed\Queue\QueueDependencyProvider**

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
            // ...
            Config::get(LogglyConstants::QUEUE_NAME) => new LogglyLoggerQueueMessageProcessorPlugin(),
        ];
    }

    // ...
}
```

For further information on this partner and integration into Spryker,  [contact us](https://support.spryker.com).

---
title: Loggly
description: Read log messages from a queue and send the messages via https by integrating Loggly into the Spryker Commerce OS.
last_updated: Jan 26, 2022
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/loggly-queue
originalArticleId: 391c5723-caab-4f15-afec-1d7f24083af0
redirect_from:
  - /v6/docs/loggly-queue
  - /v6/docs/en/loggly-queue
related:
  - title: Technology Partner Integration
    link: docs/scos/user/technology-partners/page.version/technology-partner-integration.html
---

The [Loggly](https://github.com/spryker-eco/loggly) module provides a plugin to read log messages from a queue and send the messages via https to [Loggly](https://www.loggly.com/).

To start using Loggly, you need to do some configuration, as described below.

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

## Related Developer articles

* [Configuring Loggly](/docs/scos/dev/technology-partner-guides/{{page.version}}/operational-tools-monitoring-legal-etc/configuring-loggly.html)



---

## Copyright and Disclaimer

See [Disclaimer](https://github.com/spryker/spryker-documentation).

---
For further information on this partner and integration into Spryker, please contact us.

<div class="hubspot-form js-hubspot-form" data-portal-id="2770802" data-form-id="163e11fb-e833-4638-86ae-a2ca4b929a41" id="hubspot-1"></div>

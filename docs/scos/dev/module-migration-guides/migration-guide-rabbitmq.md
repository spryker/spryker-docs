---
title: Migration guide - RabbitMQ
description: Use the guide to learn how to update the RabbirMQ module to a newer version.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-rabbitmq
originalArticleId: 64e0e319-4ae8-4886-a66e-6c7a0b2041ce
redirect_from:
  - /2021080/docs/mg-rabbitmq
  - /2021080/docs/en/mg-rabbitmq
  - /docs/mg-rabbitmq
  - /docs/en/mg-rabbitmq
  - /v1/docs/mg-rabbitmq
  - /v1/docs/en/mg-rabbitmq
  - /v2/docs/mg-rabbitmq
  - /v2/docs/en/mg-rabbitmq
  - /v3/docs/mg-rabbitmq
  - /v3/docs/en/mg-rabbitmq
  - /v4/docs/mg-rabbitmq
  - /v4/docs/en/mg-rabbitmq
  - /v5/docs/mg-rabbitmq
  - /v5/docs/en/mg-rabbitmq
  - /v6/docs/mg-rabbitmq
  - /v6/docs/en/mg-rabbitmq
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-rabbitmq.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-rabbitmq.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-rabbitmq.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-rabbitmq.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-rabbitmq.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-rabbitmq.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-rabbitmq.html
---

## Upgrading from version 0.* to version 1.*

### Version 1 of the RabbitMq module

#### Configuration

The configuration codes have moved from `RabbitMqDependencyProvider` to `RabbitMqConfiguration`.

**RabbitMqOption TransferObject**
* `RabbitMqOption` transfer has changed:
`bindingQueue` property has changed to `bindingQueueCollection`
* `RabbitMqOption` transfer has changed:
`routingKey` property with string type has changed to routingKeys with array type.

<details open>
<summary markdown='span'>Sample configuration code in RabbitMqConfiguration</summary>

```php
namespace Pyz\Client\RabbitMq;

use ArrayObject;
use Generated\Shared\Transfer\RabbitMqOptionTransfer;
use Spryker\Client\RabbitMq\Model\Connection\Connection;
use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\Event\EventConstants;

class RabbitMqConfig extends SprykerRabbitMqConfig
{

    /**
     * @return \ArrayObject
     */
    protected function getQueueOptions()
    {
        $queueOptionCollection = new ArrayObject();
        $queueOptionCollection->append($this->createQueueOption(EventConstants::EVENT_QUEUE, EventConstants::EVENT_QUEUE_ERROR));

        return $queueOptionCollection;
    }

    /**
    * @param string $queueName
    * @param string $errorQueueName
    * @param string $routingKey
    *
    * @return \Generated\Shared\Transfer\RabbitMqOptionTransfer
    */
    protected function createQueueOption($queueName, $errorQueueName, $routingKey = 'error')
    {
        $queueOption = new RabbitMqOptionTransfer();
        $queueOption
            ->setQueueName($queueName)
            ->setDurable(true)
            ->setType('direct')
            ->setDeclarationType(Connection::RABBIT_MQ_EXCHANGE)
            ->addBindingQueueItem($this->createQueueBinding($queueName))
            ->addBindingQueueItem($this->createErrorQueueBinding($errorQueueName, $routingKey));

        return $queueOption;
    }

    /**
    * @param string $queueName
    *
    * @return \Generated\Shared\Transfer\RabbitMqOptionTransfer
    */
    protected function createQueueBinding($queueName)
    {
        $queueOption = new RabbitMqOptionTransfer();
        $queueOption
            ->setQueueName($queueName)
            ->setDurable(true)
            ->addRoutingKey('');

        return $queueOption;
    }

    /**
    * @param string $errorQueueName
    * @param string $routingKey
    *
    * @return \Generated\Shared\Transfer\RabbitMqOptionTransfer
    */
    protected function createErrorQueueBinding($errorQueueName, $routingKey)
    {
        $queueOption = new RabbitMqOptionTransfer();
        $queueOption
            ->setQueueName($errorQueueName)
            ->setDurable(true)
            ->addRoutingKey($routingKey);

        return $queueOption;
    }

}
```
</details>

***
## Upgrading from version 1.* to version 2.*

### Version 2 of the RabbitMq module

#### Configuration

The configuration parameters have been changed, Now the rabbitMQ configurations are stored in a numeric array under the `RabbitMqEnv::RABBITMQ_CONNECTIONS`  key. The structure of a rabbit MQ definition is `default_config.php`

```php
$config[RabbitMqEnv::RABBITMQ_CONNECTIONS] = [
RabbitMqEnv::RABBITMQ_CONNECTION_NAME => 'DE-connection',
RabbitMqEnv::RABBITMQ_HOST => 'localhost',
RabbitMqEnv::RABBITMQ_PORT => '5672',
RabbitMqEnv::RABBITMQ_PASSWORD => 'guest',
RabbitMqEnv::RABBITMQ_USERNAME => 'guest',
RabbitMqEnv::RABBITMQ_VIRTUAL_HOST => '/',
RabbitMqEnv::RABBITMQ_STORE_NAMES => ['DE', 'US', 'AT'],
RabbitMqEnv::RABBITMQ_DEFAULT_CONNECTION => true,
]
```

The API RabbitMQ configurations are unchanged!
`RabbitMqConstants::RABBITMQ_VIRTUAL_HOST` is replaced by `RabbitMqEnv::RABBITMQ_API_VIRTUAL_HOST`.

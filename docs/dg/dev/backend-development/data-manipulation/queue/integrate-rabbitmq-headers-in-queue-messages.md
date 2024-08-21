---
title: Integrate RabbitMQ headers in queue messages
description: This document shows the RabbitMQ message usage with demo headers.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/rabbitmq-headers-in-queue-messages
originalArticleId: d07ebbe0-edea-4194-8875-d20c4cf39cc8
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/queue/integrate-rabbitmq-headers-in-queue-messages.html
  - /docs/scos/dev/back-end-development/data-manipulation/queue/integrating-rabbitmq-headers-in-queue-messages.html
related:
  - title: Queue
    link: docs/scos/dev/back-end-development/data-manipulation/queue/queue.html
  - title: Queue pool
    link: docs/scos/dev/back-end-development/data-manipulation/queue/queue-pool.html
  - title: Migration Guide - RabbitMQ
    link: docs/scos/dev/module-migration-guides/migration-guide-rabbitmq.html
---

The main goal of RabbitMQ headers in the Advanced Message Queuing Protocol (AMQP) message is to store additional information about the message. The following example shows the RabbitMQ message usage with demo headers.

```php
<?php

$headers = [
    'header1' => 'header1',
    'header2' => 'header2',
    ....,
];

$messageTransfer = (new QueueSendMessageTransfer())
            ->setHeaders($headers)
            ...;

// OR

$messageTransfer = (new QueueSendMessageTransfer())
            ->addHeader('header1', 'header1')
            ->addHeader('header2', 'header2')
            ...;
```

## Integrate RabbitMQ headers

1. Register a new RabbitMQ queue:

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\RabbitMq;

...

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return \ArrayObject
     */
    protected function getQueueOptions()
    {
        $queueOptionCollection = new ArrayObject();
        .....
        $queueOptionCollection->append($this->createQueueOption({MODULENAME}Constants::DEMO_QUEUE_NAME, {MODULENAME}Constants::'DEMO_ERROR_QUEUE_NAME'));


        return $queueOptionCollection;
    }

   ....
}
```

2. Create a queue writer:

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Mail\Business\Model;

...

class DemoQueueWriter implements DemoQueueWriterInterface
{

   /**
     * @var \Spryker\Client\Queue\QueueClientInterface $queueClient
     */
    private $queueClient;

    /**
     * The constructor of MailQueueHelper
     *
     * @param \Spryker\Client\Queue\QueueClientInterface $queueClient
     */
    public function __construct(QueueClientInterface $queueClient)
    {
        $this->queueClient = $queueClient;
    }

    /**
     * @param \Generated\Shared\Transfer\DataTransfer $dataTransfer
     *
     * @return void
     */
    protected function sendMessageToQueue(DataTransfer $dataTransfer): void
    {
        $queueSendMessageTransfer = (new QueueSendMessageTransfer())
            ->addHeader('header1', 'header1')
            ->addHeader('header2', 'header2')
            ->setBody(json_encode($dataTransfer->toArray()));

        $this->queueClient->sendMessage(
            {MODULENAME}Constants::DEMO_QUEUE_NAME,
            $queueSendMessageTransfer
        );
    }

   ....
}
```

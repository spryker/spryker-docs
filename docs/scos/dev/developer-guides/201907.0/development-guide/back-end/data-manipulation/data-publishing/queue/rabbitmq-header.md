---
title: Integrating RabbitMQ Headers in Queue Messages
originalLink: https://documentation.spryker.com/v3/docs/rabbitmq-headers-in-queue-messages-201903
redirect_from:
  - /v3/docs/rabbitmq-headers-in-queue-messages-201903
  - /v3/docs/en/rabbitmq-headers-in-queue-messages-201903
---

## General Information
The main goal of RabbitMQ headers in the AMQP (Advanced Message Queuing Protocol) message is to store additional information about the message. Below, you can check an example of the RabbitMQ message usage with demo headers.

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

## Integration Example
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

<!--
**See also:**

* Queue
* Migration Guide - RabbitMQ
--> 

<!-- _Last review date: Mar 05, 2019_ by Oleksandr Myrnyi, Andrii Tserkovnyi -->

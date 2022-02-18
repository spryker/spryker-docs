---
title: Tutorial - Set Up a Hello World Queue - Legacy Demoshop
description: The tutorial describes how to create a simple queue and send or receive messages to or from the queue with some content.
last_updated: Sep 27, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/v4/docs/setup-hello-world-queue
originalArticleId: d6331bbd-89a2-4e5c-9c24-4d0770d4d8ce
redirect_from:
  - /v4/docs/setup-hello-world-queue
  - /v4/docs/en/setup-hello-world-queue
  - /v3/docs/setup-hello-world-queue
  - /v3/docs/en/setup-hello-world-queue
  - /v2/docs/setup-hello-world-queue
  - /v2/docs/en/setup-hello-world-queue
  - /v1/docs/setup-hello-world-queue
  - /v1/docs/en/setup-hello-world-queue
related:
  - title: Migration Guide - RabbitMQ
    link: docs/scos/dev/module-migration-guides/migration-guide-rabbitmq.html
---

This tutorial demonstrates a simple `Hello, World` queue use case. You will create a `hello` queue and send/receive your messages to/from this queue with `Hello, World` content.

For this purpose, you will use the default queue engine RabbitMQ.

## Preparation

Before you begin, check to see that the management UI and the RabbitMQ adapter are installed and working:

### RabbitMQ Management UI

The management UI is used for managing queues in the RabbitMQ UI therefore, we need to add Admin permissions:

To add admin permissions, take the following steps:

1. Go to the RabbitMQ management UI: `https://zed.mysprykershop.com:15672/` and log in.
2. Go to the **Admin** tab, and from the **user** table, under **All users**, select **admin**.
3. From **Virtual Host** select **/DE_development_zed** (for other stores, it might be different).
4. Click **Set permission**. The new permission appears in the table.

![Add Admin Permissions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Set+up+Hello+World+Queue/rabbitmq_admin.png)

![Permissions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Set+up+Hello+World+Queue/rabbitmq_permission.png)

{% info_block infoBox "Note" %}

If you are working with different virtual hosts, you need to add them as well.

{% endinfo_block %}

### RabbitMQ adapter

The `Queue` module needs at least one queue adapter.

To check if the RabbitMQ adapter is already registered in the Queue module, in the Demoshop, open `\Pyz\Client\Queue\QueueDependencyProvider` and `check/add` the RabbitMQ adapter inside `createQueueAdapters()`:

**Example:**

```php
    protected function createQueueAdapters(Container $container)
    {
        return [
            $container->getLocator()->rabbitMq()->client()->createQueueAdapter(),
        ];
    }
```

## Creating a simple queue

Before sending messages to the `hello` queue, first, configure the Queue Adapter and then add queue configuration to RabbitMQ.

{% info_block infoBox "Note" %}

You can skip this part if you want to use the default queue adapter: `$config[QueueConstants::QUEUE_ADAPTER_CONFIGURATION_DEFAULT]`.

{% endinfo_block %}

### Defining the Queue Adapter

As mentioned, you can have different queue adapters for different queues. In this example, you configure your hello queue to work with the RabbitMQ adapter.

To configure a queue work with a queue adapter, add the following lines to `config_default.php`:

```php
    [
        QueueConfig::CONFIG_QUEUE_ADAPTER => \Spryker\Client\RabbitMq\Model\RabbitMqAdapter::class,
    ],
];
```

### Adding queue configuration to RabbitMQ

The next step is to extend `\Pyz\Client\RabbitMq\RabbitMqConfig`:
1. In your project, create a new method to handle the hello queue configuration.
2. Add the new method to `getQueueConfiguration()`.

**Code sample**

```php
    protected function getQueueConfiguration(): array
    {
        return array_merge(
            [
                EventConstants::EVENT_QUEUE => [
                    EventConfig::EVENT_ROUTING_KEY_RETRY => EventConstants::EVENT_QUEUE_RETRY,
                    EventConfig::EVENT_ROUTING_KEY_ERROR => EventConstants::EVENT_QUEUE_ERROR,
                ],
                $this->get(LogConstants::LOG_QUEUE_NAME),
            ],
            $this->getPublishQueueConfiguration(),
            $this->getSynchronizationQueueConfiguration(),
            $this->getHelloWorldQueueConfiguration(),
        );
    }

    protected function getHelloWorldQueueConfiguration(): array
    {
        return [
            'hello',
        ];
    }
```

 {% info_block infoBox "Note" %}

 Whe do you need Exchanges? In RabbitMQ, messages are sent to Exchanges, which have different types of routing. Exchanges route messages to an appropriate queue or multiple queues (zero or more).

 {% endinfo_block %}

 The following image shows how the RabbitMQ exchange and queue work together.

![RabbitMQ exchange](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Set+up+Hello+World+Queue/rabbitmq_exchange.png)

 You can find more information about Exchange and Routing at:&nbsp;https://www.rabbitmq.com/tutorials/tutorial-four-php.html.

{% info_block infoBox "Note" %}

Your queue configuration is ready. Once you send your first message, the queue is created.

{% endinfo_block %}

## Sending messages

You are almost done with all queue preparation and configuration. It’s time to see some actions. Here you want to send one message to our queue and check if this message is there.

{% info_block infoBox "Using clients" %}

It is assumed that you already know how to use a client in the Controller classes, but you can also check other tutorials or the Demoshop codebase.

{% endinfo_block %}

To send a message to a queue, do the following:

1. Place a trigger to the queue API by creating a simple `controller/action` in the Demoshop.
   This code creates a `QueueSendMessageTransfer` and sets `Hello, World` into the body of the message.

2. To set the trigger, call `QueueClient::sendMessage()`.

**Code sample**

```php
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array
     */
		public function sendAction(Request $request): array
    {
        $queueSendTransfer = (new QueueSendMessageTransfer())->setBody('Hello, World!');

        $queueClient = $this->getFactory()->getQueueClient();
        $queueClient->sendMessage('hello', $queueSendTransfer);

        return [
            'success' => true
        ];
    }
```

Next, we call the action.

To call an action, take the following steps:

1. Open a browser and call the following URL `https://mysprykershop.com/queue/send`.
2. Check the RabbitMQ management UI `http://zed.de.project.local:15672/#/queues` to see if the hello queue is created and there is a message in there.

![RabbitMQ creation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Set+up+Hello+World+Queue/rabbitmq_creation.png)

**Result**: The hello queue is created and one message with `Hello, World!` inside is sent.

## Receiving messages

To receive messages, create another action for receiving messages from the `hello` queue.

To create another action for receiving a message from the `hello` queue:

**Code sample**

```php
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array
     */
		public function receiveAction(Request $request): array
    {

        $queueClient = $this->getFactory()->getQueueClient();

        $queueReceiveMessageTransfer = $queueClient->receiveMessage('hello', $this->createReceiverOption());

        return [
            'message' => $queueReceiveMessageTransfer->getQueueMessage()->getBody(),
            'success' => true
        ];
    }

    /**
     * @return array
     */
    protected function createReceiverOption()
    {
        $rabbitmqReceiveOptionTransfer = new RabbitMqConsumerOptionTransfer();
        /* this prevents the queue to delete the message until we send the `acknowledging` */
      	$rabbitmqReceiveOptionTransfer->setNoAck(false);

        return [
            'rabbitmq' => $rabbitmqReceiveOptionTransfer
        ];
    }
```

Result: you should see this:

![Receiving messages](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Set+up+Hello+World+Queue/rabbitmq_receive.png)

Open a browser and call the following URL `https://mysprykershop.com/queue/receive`.

## Advanced topics
This instruction demonstrates how to work with a simple queue and perform simple send and receive actions on it. However, these actions can be automated to help developers focus on business logic. To automate the queue, you can use Spryker’s Task and Worker to provide flexibility and freedom when managing queues. This chapter includes three parts. Parts one and two demonstrate Task and Plugin which bind together and the third part describes background processes and task management.

### Running a queue task
The `Queue` module provides specific commands for listening to queues, fetching messages, and triggering registered processors. Running this command lets you see what messages the queue is going to consume and pass to the plugins. The command syntax is as follows:

```bash
/vendor/bin/console queue:task:start
```

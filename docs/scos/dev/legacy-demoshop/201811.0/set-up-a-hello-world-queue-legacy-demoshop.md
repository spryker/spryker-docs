---
title: Tutorial - Set Up a Hello World Queue - Legacy Demoshop
description: The tutorial describes how to create a simple queue and send or receive messages to or from the queue with some content.
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
    link: docs/scos/dev/module-migration-guides/page.version/migration-guide-rabbitmq.html
---

This Tutorial demonstrates a simple `Hello, World` queue use case. We will create a `hello` queue and send/receive our messages to/from this queue with `Hello, World` content. 

For this purpose, we will be using our default queue engine RabbitMQ.

## Preparation

Before you begin, check to see that the management UI and the RabbitMQ adapter are installed and working:

### RabbitMQ Management UI

The management UI is used for managing queues in the RabbitMQ UI therefore, we need to add Admin permissions:

**To add Admin permissions:**

1. Go to the RabbitMQ management UI: `https://zed.mysprykershop.com:15672/` and log in.
2. Go to the `Admin` tab and select `admin` from user table under`All users`.
3. From `Virtual Host` select `/DE_development_zed` (for other stores it might be different).
4. Click `Set permission`.
5. You will now see the new permission in the table.
![Add Admin Permissions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Set+up+Hello+World+Queue/rabbitmq_admin.png){height="" width=""}

![Permissions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Set+up+Hello+World+Queue/rabbitmq_permission.png){height="" width=""}


{% info_block infoBox "Note" %} If you are working with different virtual hosts, you need to add them as well.{% endinfo_block %}

### RabbitMQ Adapter

The `Queue` module needs at least one queue adapter.

**To check if the RabbitMQ adapter is already registered in the Queue module:**
In the Demoshop, open `QueueDependencyProvider.php` and `check/add` the RabbitMQ adapter inside `createQueueAdapters()`:
**Example:**

```php
getLocator()-&gt;rabbitMq()-&gt;client()-&gt;createQueueAdapter(),
        ];
    }
}
?&gt;
```

## Creating a Simple Queue
Before sending our messages to the `hello` queue, we need to first configure the Queue Adapter and then add queue configuration to RabbitMQ.

{% info_block infoBox "Note" %}You can skip this part if you want to use the default queue adapter: `$config[QueueConstants::QUEUE_ADAPTER_CONFIGURATION_DEFAULT]`{% endinfo_block %}

### Defining the Queue Adapter
As mentioned, we can have different queue adapters for different queues. In this example, we will configure our hello queue to work with the RabbitMQ adapter.

To configure a queue work with a queue adapter, add the following lines to `config_default.php`:

```php
 [
        QueueConfig::CONFIG_QUEUE_ADAPTER =&gt; \Spryker\Client\RabbitMq\Model\RabbitMqAdapter::class,
    ],
];

...
?&gt;
Adding Queue Configuration to RabbitMQ
```

The next step is to extend `RabbitMqConfig.php` in our project and then pass our configuration to `getQueueOptions()`:

**Code sample**
    
```php
append($this-&gt;createQueueOption('hello', 'hello.error'));

        return $queueOptionCollection;
    }
?&gt;
```
 
 {% info_block infoBox "Note" %} Exchanges and why do I need them? In RabbitMQ messages are sent to Exchanges, which have different types of routing. Exchanges route messages to appropriate queue or multiple queues (zero or more). {% endinfo_block %}
 
 The following image shows how the RabbitMQ exchange and queue work together. 
![RabbitMQ exchange](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Set+up+Hello+World+Queue/rabbitmq_exchange.png)
 
 You can find more information about Exchange and Routing at:&nbsp;https://www.rabbitmq.com/tutorials/tutorial-four-php.html
 
{% info_block infoBox "Note" %} ur queue configuration is ready, once we send our first message the queue will be created. {% endinfo_block %}

## Sending Messages
We are almost done with all queue preparation and configuration, it’s time to see some actions. Here we want to send one message to our queue and check if this message is there.

@(Warning)(Using clients)(We assume that you already know how to use a client in the Controller classes, but you can also check our other tutorials or the Demoshop codebase.)

**To send a message to a queue:**

Place a trigger to the queue API by creating a simple `controller/action` in the Demoshop.

This code creates a `QueueSendMessageTransfer` and sets `Hello, World` into the body of message. 

The final step is to call `QueueClient::sendMessage()` and the trigger will be set.

**Code sample**
    
```php
setBody('Hello, World!');

        $queueClient = $this-&gt;getFactory()-&gt;getQueueClient();
        $queueClient-&gt;sendMessage('hello', $queueSendTransfer);

        return [
            'success' =&gt; true
        ];
    }
}

?&gt;
```

Next, we call the action.

**To call an action:**

1. Open a browser and call the following url `https://mysprykershop.com/queue/send`.
2. Check the RabbitMQ management UI `http://zed.de.project.local:15672/#/queues` to see if the hello queue is created and there is a message in there.

![RabbitMQ creation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Set+up+Hello+World+Queue/rabbitmq_creation.png){height="" width=""}

**Result**: You successfully created the hello queue and sent one message with `Hello, World!` inside.

## Receiving Messages
To receive messages, you need to create another action for receiving messages from the `hello` queue.

To create another action for receiving a message from the `hello` queue:

**Code sample**
    
```php
getFactory()-&gt;getQueueClient();

        $queueReceiveMessageTransfer = $queueClient-&gt;receiveMessage('hello', $this-&gt;createReceiverOption());

        return [
            'message' =&gt; $queueReceiveMessageTransfer-&gt;getQueueMessage()-&gt;getBody(),
            'success' =&gt; true
        ];
    }

    /**
     * @return array
     */
    protected function createReceiverOption()
    {
        $rabbitmqReceiveOptionTransfer = new RabbitMqConsumerOptionTransfer();
        $rabbitmqReceiveOptionTransfer-&gt;setNoAck(false); /* it prevents the queue to delete the message until we send the `acknowledging` */

        return [
            'rabbitmq' =&gt; $rabbitmqReceiveOptionTransfer
        ];
    }
    
?&gt;
```

Result: you should be able to see this: 

![Receiving messages](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Set+up+Hello+World+Queue/rabbitmq_receive.png){height="" width=""}

Now, open a browser and call the following url `https://mysprykershop.com/queue/receive`.

## Advanced Topics
Until now we demonstrated working with a simple queue and performing simple send receive actions on it. However, these actions can be automated to help developers focus on business logic. To automate the queue you can use Spryker’s Task and Worker to provide flexibility and freedom when managing queues. This chapter includes three parts. Parts one and two demonstrate Task and Plugin which bind together and in third part we will describe background processes and task management.

### Running a Queue Task
The `Queue` module provides specific commands for listening to queues, fetching messages and triggering registered processors. Running this command allows you to see what messages the queue is going to consume and pass to the plugins. The command syntax is as follows:

```bash
/vendor/bin/console queue:task:start 
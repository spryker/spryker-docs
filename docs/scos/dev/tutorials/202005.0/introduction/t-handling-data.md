---
title: Tutorial - Handling Data - Publish and Synchronization - Spryker Commerce OS
originalLink: https://documentation.spryker.com/v5/docs/t-handling-data-publish-and-sync-scos
redirect_from:
  - /v5/docs/t-handling-data-publish-and-sync-scos
  - /v5/docs/en/t-handling-data-publish-and-sync-scos
---

## Challenge Description
Publish and Synchronization (P&amp;S) allows exporting data from Spryker backend (Zed) to external endpoints (by default, _Redis_ and _Elasticsearch_). The endpoints are usually consumed by frontend applications (including _Yves_).

In this step-by-step tutorial, you will understand how P&amp;S works and learn how to export data on the example of a simple **Hello Spryker** P&amp;S module. It will synchronize data stored in a Zed database table to Redis. In other words, once a record is created, updated or deleted in the table, the module will automatically make changes in Redis.

In this Hello Spryker example, the intend is to create a simple database table. When a user inserts a record into this table, we will send a well-formatted data for that record into the Redis as well.

## 1. Creating Module
First, let us create a Module that will be responsible for exporting data to _Redis_. The module name will be `HelloSprykerStorage`. Create a folder with the same name in **Zed**. It will host our module.

{% info_block infoBox "Naming" %}
The following naming conventions are applied: all P&amp;S modules should use the `Storage` suffix, if they are related to _Redis_, or the Search suffix, if they are related to _Elasticsearch_.
{% endinfo_block %}

{% info_block warningBox "Spryk:" %}
Using Spryk to Create Module
{% endinfo_block %}

Also, create a simple table inside the module. The contents of the table will be synchronized to Redis. The name will be `SpyHelloSprykerMessage`.

Place the following content in `HelloSpryker\Persistence\Propel\Schema\spy_hello_spryker.schema.xml`:

spy_hello_spryker.schema.xml
   
```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\Cms\Persistence" package="src.Orm.Zed.Cms.Persistence">
<table name="spy_hello_spryker_message" idMethod="native" allowPkInsert="true">
    <column name="id_hello_spryker_message" type="INTEGER" autoIncrement="true" primaryKey="true"/>
    <column name="name" required="true" type="VARCHAR" />
    <column name="message" required="false" type="LONGVARCHAR" />
    <id-method-parameter value="spy_hello_spryker_message_pk_seq"/>
</table>
</database>
```

After creating the schema file, run `console propel:install` to actually create the table.

## 2. Data Structure
Usually, data is stored in Yves differently than in Zed, as the data model used in _Redis_ and _Elasticsearch_ is more optimized for use by the frontend. So, we need to transform it before sending. In P&amp;S, data is always designed with the help of **Transfer Objects** as a dual contract between Zed and Yves.

Let us start with a simple transfer object. 

{% info_block warningBox "Spryk:" %}
Using Spryk to Create Module
{% endinfo_block %}

Create `hello_spryker.transfer.xml` in `Shared\HelloSpryker\Transfer`. It will be easier to display data on the frontend, if we store information in Redis as name-message pairs. For this reason, we will create a `Transfer Object` that holds a name and a message.

hello_spryker.transfer.xml

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">
​
	<transfer name="HelloSprykerStorage">
    <property name="name" type="string"/>
    <property name="message" type="string"/>
</transfer>
</transfers>
 ```

## 3. Events
Now, you need to enable events for the table we want to watch the changes, and then react to them. For this purpose, we need to activate Event Propel Behavior for the `SpyHelloSprykerMessage` table. Open `spy_hello_spryker.schema.xml` we created in step 1 and make the following changes:

spy_hello_spryker.schema.xml
 
```xml
<table name="spy_hello_spryker_message" idMethod="native" allowPkInsert="true">
    ...
    ...
    <behavior name="event">
        <parameter name="spy_hello_spryker_message_all" column="*"/>
    </behavior>
</table>
```

{% info_block infoBox %}
In our example, we will track changes in **all** columns. For this reason, we use the asterisk for the column attribute. If you want to track changes only in certain columns, insert their name in the attribute value instead of the asterisk.
{% endinfo_block %}

{% info_block warningBox "Adding Event:" %}
If you are creating this module in core, you need to add the event behavior on a project level. This will help projects to decide the event registering.
{% endinfo_block %}

When done, save the file and run `console propel:install` to update the database schema.

The `SpyHelloSprykerMessage` entity model now has **3** events for creating, updating and deleting a record. Let us map them to some constants for use in our code later. For this purpose, we will create a new interface, `HelloSprykerEvents`, in the **Dependency** folder:

HelloSprykerEvents.php
    
```php
<?php
namespace Spryker\Zed\HelloSpryker\Dependency;

interface HelloSprykerEvents
{
    const ENTITY_SPY_HELLO_SPRYKER_MESSAGE_CREATE = "Entity.spy_hello_spryker_message.create";

    const ENTITY_SPY_HELLO_SPRYKER_MESSAGE_UPDATE = "Entity.spy_hello_spryker_message.update";

    const ENTITY_SPY_HELLO_WORLD_MESSAGE_DELETE = "Entity.spy_hello_spryker_message.delete";
}
```

Now, we have enabled events for the `SpyHelloSprykerMessage` entity.

## 4. Listeners
Events only are not enough for Publish &amp; Synchronize to work. We also need listeners to catch the events and run the appropriate code. 

{% info_block warningBox "Spryk:" %}
Using Spryk to Create Listeners
{% endinfo_block %}

You need to create `HelloSprykerMessageStorageListener.php` in the `Communication\Plugin\Event\Listener` folder:

HelloSprykerMessageStorageListener.php

```php
<?php

namespace Pyz\Zed\HelloSpryker\Communication\Plugin\Event\Listener;

use Pyz\Zed\Event\Dependency\Plugin\EventBulkHandlerInterface;
use Pyz\Zed\Kernel\Communication\AbstractPlugin;

class HelloSprykerMessageStorageListener extends AbstractPlugin implements EventBulkHandlerInterface
{
    public function handleBulk(array $eventTransfers, $eventName)
    {
        echo "HelloSpryker!";
    }
}
```

We also need to register this Listener to the events we created. Create `HelloSprykerEventSubscriber.php` in  `Communication\Plugin\Event\Subscriber` and add the listener to each of the events:

HelloSprykerEventSubscriber.php

```php
<?php
namespace Pyz\Zed\HelloSpryker\Communication\Plugin\Event\Subscriber;

use Pyz\Zed\HelloSpryker\Communication\Plugin\Event\Listener\HelloSprykerMessageStorageListener;
use Pyz\Zed\HelloSpryker\Dependency\HelloWorldEvents;
use Pyz\Zed\Event\Dependency\EventCollectionInterface;
use Pyz\Zed\Event\Dependency\Plugin\EventSubscriberInterface;
use Pyz\Zed\Kernel\Communication\AbstractPlugin;

class HelloSprykerEventSubscriber extends AbstractPlugin implements EventSubscriberInterface
{
    public function getSubscribedEvents(EventCollectionInterface $eventCollection)
    {
        $eventCollection->addListenerQueued(HelloSprykerEvents::ENTITY_SPY_HELLO_SPRYKER_MESSAGE_CREATE, new HelloSprykerMessageStorageListener());
        $eventCollection->addListenerQueued(HelloSprykerEvents::ENTITY_SPY_HELLO_SPRYKER_MESSAGE_UPDATE, new HelloSprykerMessageStorageListener());
        $eventCollection->addListenerQueued(HelloSprykerEvents::ENTITY_SPY_HELLO_SPRYKER_MESSAGE_DELETE, new HelloSprykerMessageStorageListener());

        return $eventCollection;
    }
}
```

We also need to add the subscriber to `EventDependencyProvider.php`:

EventDependencyProvider.php

```php
<?php
namespace Pyz\Zed\Event;

use Spryker\Zed\HelloSpryker\Communication\Plugin\Event\Subscriber\HelloSprykerEventSubscriber;
use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
	...
    public function getEventSubscriberCollection()
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();
        $eventSubscriberCollection->add(new HelloSprykerEventSubscriber());

        return $eventSubscriberCollection;
    }
	...
}
```

That's it. Now, we can test the events and the listeners. To do so:

1. Stop all Cron jobs or disable Jenkins using the following command: `console scheduler:suspend http://zed.de.suite-nonsplit.local:10007/`.
2. Create `IndexController.php` as follows and run it:

IndexController.php

```php
<?php
namespace Pyz\Zed\HelloSpryker\Communication\Controller;

use Orm\Zed\HelloWorld\Persistence\SpyHelloSprykerMessage;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;

class IndexController extends AbstractController
{
    public function indexAction()
    {
        $helloSprykerMessage = new SpyHelloSprykerMessage();
        $helloSprykerMessage->setName("John");
        $helloSprykerMessage->setMessage("Hello Spryker!");
        $helloSprykerMessage->save();

        return $this->jsonResponse([
            "status" => "success"
        ]);
    }
}
```

By running this code you should be able to see one event in Queue `http://zed.de.suite-nonsplit.local:15672/#/queues`.

![One event in queue](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/oneEventInTheQueue.png){height="" width=""}

If you open the message in the Event Queue, you should see something like this:

EventMessage

```php
{
  "listenerClassName":"Spryker\\Zed\\HelloSpryker\\Communication\\Plugin\\Event\\Listener\\HelloSprykerMessageStorageListener",
  "transferClassName":"Generated\\Shared\\Transfer\\EventEntityTransfer",
  "transferData":{
    "event":"Entity.spy_hello_spryker_message.create",
    "name":"spy_hello_spryker_message",
    "id":1,
    "foreign_keys":[
    ],
    "modified_columns":[
      "spy_hello_spryker_message.name",
      "spy_hello_spryker_message.message"
    ]
  },
  "eventName":"Entity.spy_hello_spryker_message.create"
}
```

The data inside the message has all information required for the listener to process it:

* **Event name**: `Entity.spy_hello_spryker_message.create`
* **Listener**: `classHelloSprykerMessageStorageListener`
* **Table name**: `spy_hello_spryker_message`
* **Modified columns**:  `[spy_hello_spryker_message.name`, `spy_hello_spryker_message.message`]
* **ID**: the primary key of the record
* **ForeignKey**: if there are foreign keys

Now, it's time to run the listener and catch the event. To execute listeners, you need to run a queue command: `console queue:task:start event`:

Running the Queue

```bash
{vagrant@spryker-vagrant ➜  current git:(master) ✗  console queue:task:start event
Store: DE | Environment: development
Hello World!
```

We can see a message from our listener in the console, and the Event Queue should be empty:

![Running the queue](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/event-queue-no-events.png){height="" width=""}

{% info_block warningBox %}
You can use the `-k` option when running the command to keep messages in the queue for debugging purposes: `queue:task:start event -k`.
{% endinfo_block %}

The next step is to publish the data to _Redis_.

## 5. Storage Table
To publish data, we need an intermediate table where data will be stored before sending it to Redis. This table is a special table and it is designed for this specific reason, so you need to create the table and then check it together afterward:

spy_hello_spryker.schema.xml

```xml
<table name="spy_hello_spryker_message_storage" idMethod="native" allowPkInsert="true">
    <column name="id_hello_spryker_message_storage" type="BIGINT" autoIncrement="true" primaryKey="true"/>
    <column name="fk_hello_spryker_message" type="INTEGER" required="true"/>
    <index name="spy_hello_spryker_message_storage-fk_hello_spryker_message">
       <index-column name="fk_hello_spryker_message"/>
    </index>
    <behavior name="synchronization">
        <parameter name="resource" value="message"/>
        <parameter name="key_suffix_column" value="fk_hello_spryker_message"/>
        <parameter name="queue_group" value="sync.storage.hello"/>
    </behavior>
    <behavior name="timestampable"/>
        <id-method-parameter value="spy_hello_spryker_message_storage_pk_seq"/>
   </behavior>
</table>
```

Save the file and run `console propel:install` to create the table. The schema file defines the table as follows:

* **ID** - the primary key of the table (in our case, `id_hello_spryker_message_storage`);

* **ForeignKey** - a foreign key to the main resource that we want to export (`fk_hello_spryker_message` for `spy_hello_spryker_message`);

* **SynchronizationBehaviour** will modify the table as follows:
    *     Add the `Data` column to the table. It will store the data formatted in such a way that it can be sent directly to Redis. Data type: `TEXT`;
    *     Add the `Key` column to the table. It will store the Redis Key. Data type: `VARCHAR`;
    *     Define **Resource** name for key generation;
    *     Define **Key Suffix Column** value for key generation;
    *     Define a `queue_group` where to send a copy of the data column;
* Timestamp Behavior will be added for keeping timestamps and using incremental synchronization strategy.

**Key Generation Strategy**

Redis Keys will be generated automatically based on the column and Synchronization behavior parameters. The generation algorithm is as follows:

![Generation algorithm](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/generation-algorithm.png){height="" width=""}

## 6. Models and Facade
Now, you are ready to complete the publishing part of the tutorial. First, you need to follow the standard conventions and let listeners delegate the execution process through the Facade to the Models behind. For this reason, we will create facade and model classes to handle the logic for the publish part.
Our facade methods are:

* `publish($messageIds)`
* `unpublish($messageIds)`

{% info_block warningBox "Spryk:" %}
Using Spryk to create Facade and Models
{% endinfo_block %}

Create the `MessageStorageWriter` Model and implement the following two methods. Then, bind facade methods to them.

MessageStorageWriter.php

```php
<?php
namespace Pyz\Zed\HelloWorld\Business\Message;

use Generated\Shared\Transfer\HelloSprykerStorageTransfer;
use Orm\Zed\HelloSpryker\Persistence\SpyHelloSprykerMessageQuery;
use Orm\Zed\HelloSpryker\Persistence\SpyHelloSprykerMessageStorage;
use Orm\Zed\HelloSpryker\Persistence\SpyHelloSprykerMessageStorageQuery;

class MessageStorageWriter
{
    public function publish(array $messageIds)
    {
        $messages = SpyHelloSprykerMessageQuery::create()
            ->filterByIdHelloSprykerMessage_In($messageIds)
            ->find();

        foreach ($messages as $message) {
            $messageStorageTransfer = new HelloSprykerStorageTransfer();
            $messageStorageTransfer->fromArray($message->toArray(), true);
            $this->store($message->getIdHelloSprykerMessage(), $messageStorageTransfer);
        }
    }

    public function unpublish(array $messageIds)
    {
        $messages = SpyHelloSprykerMessageStorageQuery::create()
            ->filterByFkHelloSprykerMessage_In($messageIds)
            ->find();

        foreach ($messages as $message) {
            $message->delete();
        }
    }


    protected function store($idMessage, HelloSprykerStorageTransfer $messageStorageTransfer)
    {
        $storageEntity = new SpyHelloSprykerMessageStorage();
        $storageEntity->setFkHelloSprykerMessage($idMessage);
        $storageEntity->setData($messageStorageTransfer->modifiedToArray());
        $storageEntity->save();
    }
}
```

Then, create two facade methods in `HelloSprykerFacade.php` to expose the model:

HelloSprykerFacade.php

```php
<?php
namespace Pyz\Zed\HelloSpryker\Business;

use Pyz\Zed\Kernel\Business\AbstractFacade;

class HelloWorldFacade extends AbstractFacade implements HelloSprykerFacadeInterface
{

    public function publish(array $messageIds)
    {
        $this->getFactory()
            >createMessageStorageWriter()->publish($messageIds);
    }

    public function unpublish(array $messageIds)
    {
        $this->getFactory()
            ->createMessageStorageWriter()->unpublish($messageIds);
    }
}
```

Now, you need to refactor the listener class in `HelloSprykerFacade.php` and call the facade methods:

HelloSprykerMessageStorageListener.php

```php
<?php

namespace Pyz\Zed\HelloSpryker\Communication\Plugin\Event\Listener;

use Pyz\Zed\Event\Dependency\Plugin\EventBulkHandlerInterface;
use Pyz\Zed\EventBehavior\Business\EventBehaviorFacade;
use Pyz\Zed\Kernel\Communication\AbstractPlugin;

class HelloWorldMessageStorageListener extends AbstractPlugin implements EventBulkHandlerInterface
{
    public function handleBulk(array $eventTransfers, $eventName)
    {
        $messageIds = $this->getFactory()->getEvenBehaviourFacade()->getEventTransferIds($eventTransfers);

        if ($eventName === HelloSprykerEvents::ENTITY_SPY_HELLO_SPRYKER_MESSAGE_CREATE) {
            $this->getFacade()->publish($messageIds);
        } else if ($eventName === HelloSprykerEvents::ENTITY_SPY_HELLO_SPRYKER_MESSAGE_DELETE) {
            $this->getFacade()->unpublish($messageIds);
        }
    }
}
```

Everything is ready and in place. Now, you only need to create a queue to synchronize data to Redis.

## 7. Queue
The last step you need to perform is create a sync queue called `sync.storage.hello` as follows:
1. Add queue configuration to RabbitMq client:

RabbitMqConfig.php

```php
<?php
namespace Pyz\Client\RabbitMq;
..

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return \ArrayObject
     */
    protected function getQueueOptions()
    {
        $queueOptionCollection = new ArrayObject();
		$queueOptionCollection->append($this->createQueueOption("sync.storage.hello", "sync.storage.hello.error"));

        return $queueOptionCollection;
    }
	...
}
```

2.Add `MessageProcessor` to `QueueDependencyProvider` for our queue:

QueueDependencyProvider.php

```php
<?php
namespace Pyz\Zed\Queue;
...
class QueueDependencyProvider extends SprykerDependencyProvider
{
    protected function getProcessorMessagePlugins(Container $container)
    {
        return [
            ...
            "sync.storage.hello" => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

When done, run the `IndexController` class we created in step 4 again to update the table and cause a new event to appear in the Event Queue. Then, run the queue:

**Running the Queue**

```bash
{vagrant@spryker-vagrant ➜  current git:(master) ✗  console queue:task:start event
Store: DE | Environment: development
```

After that, you need check if we managed to store a record in the storage table.

 Open the `spy_hello_spryker_message_storage` table and check the table. You should see one record per message:

| id_hello_spryker_message_storage | fk_hello_spryker_message |data | key | created_at | updated_at |
| --- | --- | --- | --- | --- | --- |
| 1 | 2| {"name":"John","message":"Hello Spryker!"}  | message:2 | 2018-06-04 14:59:33.063645 | 2018-06-04 14:59:33.063645 |

Now, the publish part is done. You need to also check whether the data has been exported to a secondary queue for the Synchronize part. The `sync.storage.hello` queue should now have at least one message.

The very last step is to send the data to Redis. This can be done by running the following command:  `console queue:task:start sync.storage.hello`. When it completes, the sync queue should be empty.

{% info_block warningBox "Queue Worker:" %}
To run all queues at once, you can run the following command: `console queue:worker:start -vvv`. If you want the queue worker to exit after processing the queue instead of exiting after the configured execution time has passed, use the `--stop-when-empty` argument.
{% endinfo_block %}

## 8. Redis
Check Redis and see whether the data has really been exported and has a good structure.

![Redis storage](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/storage-redis.png){height="" width=""}

## 9. Client
Finally, you can read the data from Redis. For this purpose, we will create a Client layer and create the `MessageStorageReader` class in the `Client\Storage` folder:

MessageStorageReader.php

```php
<?php

namespace Spryker\Client\HelloSpryker\Storage;

use Generated\Shared\Transfer\SynchronizationDataTransfer;
use Spryker\Client\Storage\StorageClient;
use Spryker\Client\Storage\StorageClientInterface;
use Spryker\Service\Synchronization\SynchronizationService;
use Spryker\Service\Synchronization\SynchronizationServiceInterface;

class MessageStorageReader
{
	...
    public function getMessageById($idMessage)
    {
        $synchronizationDataTransfer = new SynchronizationDataTransfer();
        $synchronizationDataTransfer
            ->setReference($idMessage);

        $key = $this->synchronizationService
            ->getStorageKeyBuilder("message")
            ->generateKey($synchronizationDataTransfer);

        $data = $this->storageClient->get($key);
        
        $messageStorageTransfer = new HelloSprykerStorageTransfer();
        $messageStorageTransfer->fromArray($data, true);
        
        return $messageStorageTransfer;
    }
}
```

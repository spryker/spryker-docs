---
title: Tutorial - Handling Data - Publish and Synchronization - Legacy Demoshop
originalLink: https://documentation.spryker.com/v3/docs/handling-data-publish-and-synchronization
redirect_from:
  - /v3/docs/handling-data-publish-and-synchronization
  - /v3/docs/en/handling-data-publish-and-synchronization
---

## Challenge Description
Publish and Synchronization (P&S) allows exporting data from Spryker backend (Zed) to external endpoints (by default, _Redis_ and _Elasticsearch_). The endpoints are usually consumed by frontend applications (including Yves).

In this step-by-step tutorial, you will understand how P&amp;S works and learn how to export data on the example of a simple **Hello World** P&S module. It will synchronize data stored in a Zed database table to Redis. In other words, once a record is created, updated or deleted in the table, the module will automatically make changes in Redis.

## 1. Creating Module
First, let us create a Module that will be responsible for exporting data to Redis. The module name will be `HelloWorldStorage`. Create a folder with the same name in **Zed**. It will host our module.

{% info_block infoBox "Naming" %}
The following naming conventions are applied: all P&amp;S modules should use the Storage suffix, if they are related to _Redis_, or the `Search` suffix, if they are related to _Elasticsearch_.
{% endinfo_block %}

Also, let us create a simple table inside the module. The contents of the table will be synchronized to Redis. The name will be `SpyHelloWorldMessage`.

Place the following content in `HelloWorld\Persistence\Propel\Schema\spy_hello_world.schema.xml`:

```xml
<table name="spy_hello_world_message" idMethod="native" allowPkInsert="true">
    <column name="id_hello_world_message" type="INTEGER" autoIncrement="true" primaryKey="true"/>
    <column name="name" required="true" type="VARCHAR" />
   <column name="message" required="false" type="LONGVARCHAR" />
    <id-method-parameter value="spy_hello_world_message_pk_seq"/>
</table>
```

After creating the schema file, run `console propel:install` to actually create a table.

## 2. Data Structure
Usually, data is stored in _Yves_ differently than in _Zed_, as the data model used in _Redis_ and _Elasticsearch_ is more optimized for use by the frontend. So, we need to transform it before sending. In P&amp;S, data is always designed with the help of **Transfer Objects** as a dual contract between Zed and Yves.

Let us start with a simple transfer object. Create `hello_wrold.transfer.xml` in `Shared\HelloWorld\Transfer`. It will be easier to display data on the frontend, if we store information in Redis as name-message pairs. For this reason, we will create a Transfer Object that holds a name and a message.

```xml
<transfer name="HelloWorldStorage">
    <property name="name" type="string"/>
    <property name="message" type="string"/>
</transfer>
```

Save the file and run `console transfer:generate` to create the object.

## 3. Events
Now, we need to enable events for the table we want to synchronize, and then react to them. For this purpose, we need to activate Event Propel Behavior for the `SpyHelloWorldMessage` table. Let us open `spy_hello_world.schema.xml` we created on step 1 and make the 
following changes:

```xml
<table name="spy_hello_world_message" idMethod="native" allowPkInsert="true">
    ...
    ...
    <behavior name="event">
        <parameter name="spy_hello_world_message_all" column="*"/>
    </behavior>
</table>
```

{% info_block infoBox %}
In our example, we will track changes in **all** columns. For this reason, we use the **asterisk** for the column attribute. If you want to track changes only in certain columns, insert their name in the attribute value instead of the asterisk.
{% endinfo_block %}

When done, save the file and run `console propel:install` to update the database schema.

The `SpyHelloWorldMessage` entity model now has 3 events for creating, updating and deleting a record. Let us map them to some constants for use in our code later. For this purpose, we will create a new interface, `HelloWorldEvents`, in the Dependency folder:

```php
<?php
namespace Spryker\Zed\HelloWorld\Dependency;

interface HelloWorldEvents
{
    const ENTITY_SPY_HELLO_WORLD_MESSAGE_CREATE = "Entity.spy_hello_world_message.create";
    const ENTITY_SPY_HELLO_WORLD_MESSAGE_UPDATE = "Entity.spy_hello_world_message.update";
    const ENTITY_SPY_HELLO_WORLD_MESSAGE_DELETE = "Entity.spy_hello_world_message.delete";
}
```

Now, we have enabled events for the `SpyHelloWorldMessage` entity.

## 4. Listeners
Events only are not enough for Publish &amp; Synchronize to work. We also need listeners to catch the events and run the appropriate code. Let us create `HelloWorldMessageStorageListener.php` in the `Communication\Plugin\Event\Listener` folder:

```php
<?php

namespace Spryker\Zed\HelloWorld\Communication\Plugin\Event\Listener;

use Spryker\Zed\Event\Dependency\Plugin\EventBulkHandlerInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

class HelloWorldMessageStorageListener extends AbstractPlugin implements EventBulkHandlerInterface
{
    public function handleBulk(array $eventTransfers, $eventName)
    {
        echo "Hello World!";
    }
}
```

We also need to subscribe the listener to the events we created. Create `HelloWorldEventSubscriber.php` in  `Communication\Plugin\Event\Subscriber` and add the listener to each of the events:

```php
<?php
namespace Spryker\Zed\HelloWorld\Communication\Plugin\Event\Subscriber;

use Spryker\Zed\HelloWorld\Communication\Plugin\Event\Listener\HelloWorldMessageStorageListener;
use Spryker\Zed\HelloWorld\Dependency\HelloWorldEvents;
use Spryker\Zed\Event\Dependency\EventCollectionInterface;
use Spryker\Zed\Event\Dependency\Plugin\EventSubscriberInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

class HelloWorldEventSubscriber extends AbstractPlugin implements EventSubscriberInterface
{
    public function getSubscribedEvents(EventCollectionInterface $eventCollection)
    {
        $eventCollection->addListenerQueued(HelloWorldEvents::ENTITY_SPY_HELLO_WORLD_MESSAGE_CREATE, new HelloWorldMessageStorageListener());
        $eventCollection->addListenerQueued(HelloWorldEvents::ENTITY_SPY_HELLO_WORLD_MESSAGE_UPDATE, new HelloWorldMessageStorageListener());
        $eventCollection->addListenerQueued(HelloWorldEvents::ENTITY_SPY_HELLO_WORLD_MESSAGE_DELETE, new HelloWorldMessageStorageListener());

        return $eventCollection;
    }
}
```

We also need to add a subscriber to `EventDependencyProvider.php`:

```php
<?php
namespace Pyz\Zed\Event;

use Spryker\Zed\HelloWorld\Communication\Plugin\Event\Subscriber\HelloWorldEventSubscriber;
use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
	...
    public function getEventSubscriberCollection()
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();
        $eventSubscriberCollection->add(new HelloWorldEventSubscriber());

        return $eventSubscriberCollection;
    }
	...
}
```

That's it. Now, we can test the events and the listeners. To do so:

1. Stop all Cron jobs or disable Jenkins using the following command: `console setup:jenkins:disable`.
2. Create `IndexController.php` as follows and run it:

```php
<?php
namespace Spryker\Zed\HelloWorld\Communication\Controller;

use Orm\Zed\HelloWorld\Persistence\SpyHelloWorldMessage;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;

class IndexController extends AbstractController
{
    public function indexAction()
    {
        $helloWorldMessage = new SpyHelloWorldMessage();
        $helloWorldMessage->setName("John");
        $helloWorldMessage->setMessage("Hello World!");
        $helloWorldMessage->save();

        return $this->jsonResponse([
            "status" => "success"
        ]);
    }
}
```

After running the code, open the web interface of Spryker queue adapter, RabbitMQ ([http://zed.de.suite.local:15672/#/queues](http://zed.de.suite.local:15672/#/queues)). You should be able to see one event in the Event Queue.

[Sync queue event](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Tutorial+-+Handling+Data+-+Publish+and+Synchronization+-+Legacy+Demoshop/sync-queue-event.png){height="" width=""}

If you open the message in the Event Queue, you should see something like this:

<details open>
<summary>EventMessage</summary>
    
```php
{
  "listenerClassName":"Spryker\\Zed\\HelloWorld\\Communication\\Plugin\\Event\\Listener\\HelloWorldMessageStorageListener",
  "transferClassName":"Generated\\Shared\\Transfer\\EventEntityTransfer",
  "transferData":{
    "event":"Entity.spy_hello_world_message.create",
    "name":"spy_hello_world_message",
    "id":1,
    "foreign_keys":[
    ],
    "modified_columns":[
      "spy_hello_world_message.name",
      "spy_hello_world_message.message"
    ]
  },
  "eventName":"Entity.spy_hello_world_message.create"
}
```
    
</br>
</details>

The data inside the message has all information required for the listener to process it. Now, it's time to run the listener and catch the event. To execute listeners, we need to run a queue command: `console queue:task:start event`.

```bash
{vagrant@spryker-vagrant ➜  current git:(master) ✗  console queue:task:start event
Store: DE | Environment: development
Hello World!
```

We can see a message from our listener in the console, and the _Event Queue_ should be empty.

![EventQueue](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Tutorial+-+Handling+Data+-+Publish+and+Synchronization+-+Legacy+Demoshop/event-queue-no-events.png){height="" width=""}

{% info_block warningBox %}
You can use the **-k** option when running the command to keep messages in the queue for debugging purposes: `queue:task:start event -k`.
{% endinfo_block %}

The next step is to publish the data in Redis.

## 5. Storage Table
To publish data, we need an intermediate table where data will be stored before sending it to Redis. This table has data already structured in a format suitable for Redis, however it is stored in Zed. Let us create a schema file for the table (`spy_hello_world.schema.xml`):

```xml
<table name="spy_hello_world_message_storage" idMethod="native" allowPkInsert="true">
    <column name="id_hello_world_message_storage" type="BIGINT" autoIncrement="true" primaryKey="true"/>
    <column name="fk_hello_world_message" type="INTEGER" required="true"/>
    <index name="spy_hello_world_message_storage-fk_hello_world_message">
        <index-column name="fk_hello_world_message"/>;
    </index>
    <behavior name="synchronization">
        <parameter name="resource" value="message"/>
        <parameter name="key_suffix_column" value="fk_hello_world_message"/>
        <parameter name="queue_group" value="sync.storage.hello"/>
    </behavior>
    <behavior name="timestampable"/>
       <id-method-parameter value="spy_hello_world_message_storage_pk_seq"/>
    </behavior>
</table>
```

 Save the file and run `console propel:install` to create the table. Let us look at the schema file in more detail. It defines the table as follows:

* **ID** - the primary key of the table (in our case, `id_hello_world_message_storage`);
* **ForeignKey** - a foreign key to the main resource that we want to export (`fk_hello_world_message` for `spy_hello_world_message`);
* **SynchronizationBehaviour** will modify the table as follows:
    * Add `Data` column to the table. It will store the data formatted in such a way that it can be sent directly to Redis. Data type: `TEXT`;
    * Add `Key` column to the table. It will store the Redis Key. Data type: `VARCHAR`;
    * Define **Resource** name for key generation;
    * Define **Key Suffix Column** value for key generation;
    * Define a `queue_group` where to send a copy of the data column;
* **Timestamp** Behavior will be added for keeping timestamps and using incremental synchronization strategy.

<details open>
<summary>Key Generation Strategy</summary>
    
|  Resource| Store | Locale | Key Suffix Column | Redis Key |
| --- | --- | --- | --- | --- |
|message  | x | x | - | message |
| message | v | v | - | message.de.de_de |
|  message| x | x |  fk_hello_world_message| message.1, message.2, ... |
| message |v  |  x|  fk_hello_world_message| message.de.1, message.de.2, ... |
| message | v |  v| fk_hello_world_message | message.de.de_de.1, message.de.de_de.2, .. |
|  message| x | v | fk_hello_world_message | message.de_de.1, message.de_de.2, message.de_de.1 |
    
To create complex keys to use more than one column, do the following:

1. Create a custom column.
2. Create a custom key there (for example, price_key).
3. Pass the `custom_key` column as the suffix.

</br>
</details>

## 6. Models and Facade
Now, we are ready to complete the publishing part of our tutorial. First, we need follow the standard conventions and let listeners delegate the execution process through the Facade to the Models behind. For this reason, we will create facade and model classes to handle the logic for the publish part.

Our facade methods are:

* `publish($messageIds)`
* `unpublish($messageIds)`

Create the `MessageStorageWriter` Model and implement the following two methods. Then, bind facade methods to them.

```php
<?php
namespace Spryker\Zed\HelloWorld\Business\Message;

use Generated\Shared\Transfer\HelloWorldStorageTransfer;
use Orm\Zed\HelloWorld\Persistence\SpyHelloWorldMessageQuery;
use Orm\Zed\HelloWorld\Persistence\SpyHelloWorldMessageStorage;
use Orm\Zed\HelloWorld\Persistence\SpyHelloWorldMessageStorageQuery;

class MessageStorageWriter
{
    public function publish(array $messageIds)
    {
        $messages = SpyHelloWorldMessageQuery::create()
            ->filterByIdHelloWorldMessage_In($messageIds)
            ->find();

        foreach ($messages as $message) {
            $messageStorageTransfer = new HelloWorldStorageTransfer();
            $messageStorageTransfer->fromArray($message->toArray(), true);
            $this->store($message->getIdHelloWorldMessage(), $messageStorageTransfer);
        }
    }

    public function unpublish(array $messageIds)
    {
        $messages = SpyHelloWorldMessageStorageQuery::create()
            ->filterByFkHelloWorldMessage_In($messageIds)
            ->find();

        foreach ($messages as $message) {
            $message->delete();
        }
    }


    protected function store($idMessage, HelloWorldStorageTransfer $messageStorageTransfer)
    {
        $storageEntity = new SpyHelloWorldMessageStorage();
        $storageEntity->setFkHelloWorldMessage($idMessage);
        $storageEntity->setData($messageStorageTransfer->modifiedToArray());
        $storageEntity->save();
    }
}
```

Then, create two facade methods in `HelloWorldFacade.php` to expose the model:

```php
<?php
namespace Spryker\Zed\HelloWorld\Business;

use Spryker\Zed\Kernel\Business\AbstractFacade;

class HelloWorldFacade extends AbstractFacade implements HelloWorldFacadeInterface
{

    public function publish(array $messageIds)
    {
        $this->getFactory()
            ->createMessageStorageWriter()->publish($messageIds);
    }

    public function unpublish(array $messageIds)
    {
        $this->getFactory()
            ->createMessageStorageWriter()->unpublish($messageIds);
    }
}
```

Now, we need to refactor the listener class in `HelloWorldFacade.php` and call the facade methods:

```php
<?php

namespace Spryker\Zed\HelloWorld\Communication\Plugin\Event\Listener;

use Spryker\Zed\Event\Dependency\Plugin\EventBulkHandlerInterface;
use Spryker\Zed\EventBehavior\Business\EventBehaviorFacade;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

class HelloWorldMessageStorageListener extends AbstractPlugin implements EventBulkHandlerInterface
{
    public function handleBulk(array $eventTransfers, $eventName)
    {
        $messageIds = $this->getFactory()->getEvenBehaviourFacade()->getEventTransferIds($eventTransfers);

        if ($eventName === HelloWorldEvents::ENTITY_SPY_HELLO_WORLD_MESSAGE_CREATE) {
            $this->getFacade()->publish($messageIds);
        } else if ($eventName === HelloWorldEvents::ENTITY_SPY_HELLO_WORLD_MESSAGE_DELETE) {
            $this->getFacade()->unpublish($messageIds);
        }
    }
}
```

Everything is ready and in place. Now, we only need to create a queue to synchronize data to Redis.

## 7. Queue
The last step we need to perform is to create a sync queue called `sync.storage.hello` as follows:
1. Add queue configuration to RabbitMq client (`RabbitMqConfig.php`):

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

When done, run the `IndexController` class we created in step 4 again to update the table and cause a new event to appear in the _Event Queue_. Then, run the queue:

```bash
{vagrant@spryker-vagrant ➜  current git:(master) ✗  console queue:task:start event
Store: DE | Environment: development
```

After that, let us check if we managed to store a record in the storage table. Open the `spy_hello_world_message_storage` table and check the table. You should see one record per message:

| id_hello_world_message_storage | fk_hello_world_message | data | key |created_at  | updated_at |
| --- | --- | --- | --- | --- | --- |
| 1 | 2 | {"name":"John","message":"Hello World!"}  |message:2 | 2018-06-04 14:59:33.063645 | 2018-06-04 14:59:33.063645 |

Now, the publish part is done. Let us also check whether the data has been exported to a secondary queue for the Synchronize part. The `sync.storage.hello` queue should now have at least one message.

![sync storage ](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Tutorial+-+Handling+Data+-+Publish+and+Synchronization+-+Legacy+Demoshop/sync-queue-event.png){height="" width=""}

The very last step is to send the data to Redis. This can be done by running the following command:  `console queue:task:start sync.storage.hello`. When it completes, the sync queue should be empty.

{% info_block warningBox %}
To run all queues at once, you can run the following command: `console queue:worker:start -vvv`.
{% endinfo_block %}

## 8. Redis
Let us check Redis and see whether the data has really been exported and has a good structure.

![Redis storage](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Tutorial+-+Handling+Data+-+Publish+and+Synchronization+-+Legacy+Demoshop/storage-redis.png){height="" width=""}

{% info_block warningBox %}
To explore Redis storage, connect Redis Desktop Manager to [http://zed.de.suite.local:10009](http://zed.de.suite.local:10009/
{% endinfo_block %}.)

## 9. Client
Finally, we can read the data from Redis. For this purpose, we will create a Client layer and create the `MessageStorageReader` class in the `Client\Storage` folder:

```php
<?php

namespace Spryker\Client\HelloWorld\Storage;

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
        
        $messageStorageTransfer = new HelloWorldStorageTransfer();
        $messageStorageTransfer->fromArray($data, true);
        
        return $messageStorageTransfer;
    }
}
```

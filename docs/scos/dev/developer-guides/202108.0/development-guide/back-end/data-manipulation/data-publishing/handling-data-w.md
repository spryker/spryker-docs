---
title: Handling data with Publish and Synchronization
originalLink: https://documentation.spryker.com/2021080/docs/handling-data-with-publish-and-synchronization
redirect_from:
  - /2021080/docs/handling-data-with-publish-and-synchronization
  - /2021080/docs/en/handling-data-with-publish-and-synchronization
---

Publish and Synchronization (P&S) allows exporting data from Spryker back end (Zed) to external endpoints. The default external endpoints are Redis and Elasticsearch. The endpoints are usually used by the front end (Yves) or API (Glue). 
In this step-by-step tutorial, you will learn how P&S works and how to export data using a Hello World P&S module example. The module synchronizes(syncs) the data stored in a Zed database table to Redis. When a record is changed, created or deleted in the table, the module automatically makes changes in Redis.

## 1. Module and Table


Follow the steps below to create the following:

*   Data source module
    
*   Zed database table
    
*   Data publishing module
    

1.  Create the HelloWorld module by creating the `HelloWorld` folder in Zed. The module is the source of data for publishing:
    
2.  Create `spy_hello_world_message` table in database:
    
    1.  Inside the `HelloWorld` module, define the table schema by creating `\Pyz\Zed\HelloWorld\Persistence\Propel\Schema\spy_hello_world.schema.xml`:
        
    ```xml
    <?xml version="1.0"?>
    <database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\HelloWorld\Persistence" package="src.Orm.Zed.HelloWorld.Persistence">
      <table name="spy_hello_world_message" idMethod="native" allowPkInsert="true">
          <column name="id_hello_world_message" type="INTEGER" autoIncrement="true" primaryKey="true"/>
          <column name="name" required="true" type="VARCHAR" />
          <column name="message" required="false" type="LONGVARCHAR" />
          <id-method-parameter value="spy_hello_world_message_pk_seq"/>
      </table>
    </database>
    ```

    2. Based on the schema, create the table in database:

    ```bash
    console propel:install
    ```



    3. Create the HelloWorldStorage module by creating the `HelloWorldStorage` folder in Zed. The module is responsible for exporting data to Redis.

    {% info_block infoBox %}

    The following P&S naming conventions are applied:

    *   All the modules related to Redis should have the `Storage` suffix.

    *   All the modules related to Elasticsearch should have the `Search` suffix.
    
{% endinfo_block %}

    

## 2. Data Structure


Usually, the data for Yves is stored differently from the data for Zed. It’s because the data model used in Redis and Elasticsearch is more optimized to be used by a front end. With P&S, data is always carried in the form of [**Transfer Objects**](https://documentation.spryker.com/docs/ht-use-transfer-objects-201903) between Zed and Yves.

Follow the steps below to create a transfer object.

1.  Create `\Pyz\Shared\HelloWorldStorage\Transfer\hello_world_storage.transfer.xml`:
    
```xml
<transfer name="HelloWorldStorage">
    <property name="name" type="string"/>
    <property name="message" type="string"/>
</transfer>
```

2. Run the following command to create the transfer object in `src/Generated/Shared/Transfer/HelloWorldStorageTransfer`:

```bash
console transfer:generate
```

## 3. Events


For the changes in the table to be published automatically, an event for each particular change should be enabled. In our example, we export the events from `SpyHelloWorldMessage`.

Follow the steps to enable the events:

1. Activate Event Propel Behavior in `spy_hello_world.schema.xml` you’ve created in step [1. Module and Table](#1--module-and-table).

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

To track changes in all the table columns, we use the asterisk (`*`) for the `column` attribute. If you want to track changes in particular columns, specify their names instead.

{% endinfo_block %}


2. Update the database schema:

```bash
console propel:install
```


Now the `SpyHelloWorldMessage` entity model has three events for creating, updating, and deleting a record.

3. To map them to the constants which you can use in code later, create the `\Pyz\Shared\HelloWorldStorage\HelloWorldStorageConfig` configuration file:

```php
<?php

namespace Pyz\Shared\HelloWorldStorage;

use Spryker\Shared\Kernel\AbstractBundleConfig;

class HelloWorldStorageConfig extends AbstractBundleConfig
{   
    /**
     * This event will be used for spy_hello_world_message entity creation.
     */
    public const ENTITY_SPY_HELLO_WORLD_MESSAGE_CREATE = 'Entity.spy_hello_world_message.create';
    
    /**
     * This event will be used for spy_hello_world_message entity changes.
     */
    public const ENTITY_SPY_HELLO_WORLD_MESSAGE_UPDATE = 'Entity.spy_hello_world_message.update';
    
    /**
     * This event will be used for spy_hello_world_message entity deletion.
     */
    public const ENTITY_SPY_HELLO_WORLD_MESSAGE_DELETE = 'Entity.spy_hello_world_message.delete';
}
```

Now, we have enabled events for the `SpyHelloWorldMessage` entity.

## 4. Publishers


For P&S to work, the publishers need to catch the events and run the appropriate code.

1.  Create a writer plugin that handles the creation and changes of the `spy_hello_world_message` entity.  
    
<details open>
    <summary>\Pyz\Zed\HelloWorldStorage\Communication\Plugin\Publisher\HelloWorldWritePublisherPlugin</summary>
    
```php
<?php

namespace Pyz\Zed\HelloWorldStorage\Communication\Plugin\Publisher;

use Pyz\Shared\HelloWorldStorage\HelloWorldStorageConfig;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface;

/**
 * @method \Pyz\Zed\HelloWorldStorage\Communication\HelloWorldStorageCommunicationFactory getFactory()
 * @method \Pyz\Zed\HelloWorldStorage\Business\HelloWorldStorageFacadeInterface getFacade()
 * @method \Pyz\Zed\HelloWorldStorage\HelloWorldStorageConfig getConfig()
 */
class HelloWorldWritePublisherPlugin extends AbstractPlugin implements PublisherPluginInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     * @param string $eventName
     *
     * @return void
     */
    public function handleBulk(array $eventTransfers, $eventName)
    {
        echo "Hello World Writer!";
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return string[]
     */
    public function getSubscribedEvents(): array
    {
        return [
            HelloWorldStorageConfig::ENTITY_SPY_HELLO_WORLD_MESSAGE_CREATE,
            HelloWorldStorageConfig::ENTITY_SPY_HELLO_WORLD_MESSAGE_UPDATE,
        ];
    }
}
```

</details>

2. Create a plugin that handles the deletion of the `spy_hello_world_message` entity.

<details open>
    <summary>\Pyz\Zed\HelloWorldStorage\Communication\Plugin\Publisher\HelloWorldDeletePublisherPlugin</summary>
    
```php
<?php

namespace Pyz\Zed\HelloWorldStorage\Communication\Plugin\Publisher;

use Pyz\Shared\HelloWorldStorage\HelloWorldStorageConfig;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface;

/**
 * @method \Pyz\Zed\HelloWorldStorage\Communication\HelloWorldStorageCommunicationFactory getFactory()
 * @method \Pyz\Zed\HelloWorldStorage\Business\HelloWorldStorageFacadeInterface getFacade()
 * @method \Pyz\Zed\HelloWorldStorage\HelloWorldStorageConfig getConfig()
 */
class HelloWorldDeletePublisherPlugin extends AbstractPlugin implements PublisherPluginInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     * @param string $eventName
     *
     * @return void
     */
    public function handleBulk(array $eventTransfers, $eventName)
    {
        echo "Hello World Deleter!";
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return string[]
     */
    public function getSubscribedEvents(): array
    {
        return [
            HelloWorldStorageConfig::ENTITY_SPY_HELLO_WORLD_MESSAGE_DELETE,
        ];
    }
}
```

</details>

3. Create a publish queue in which, during the publishing process, an event or events will be posted.

```php
<?php

namespace Pyz\Shared\HelloWorldStorage;

use Spryker\Shared\Kernel\AbstractBundleConfig;

class HelloWorldStorageConfig extends AbstractBundleConfig
{
    /**
     * Defines queue name as used for processing hello world messages.
     */
    public const PUBLISH_HELLO_WORLD = 'publish.hello_world';
    
    ...
}
```

4. Adjust the RabbitMQ configuration with the newly introduced queue.

```php
<?php

namespace Pyz\Client\RabbitMq;

...

/**
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 */
class RabbitMqConfig extends SprykerRabbitMqConfig
{
...

   /**
     * @return array
     */
    protected function getPublishQueueConfiguration(): array
    {
        return [
            ...,
            HelloWorldStorageConfig::PUBLISH_HELLO_WORLD,
        ];
    }
...
}
```

5. Register the `HelloWorldStorage` publisher plugins in the `Pyz\Zed\Publisher\PublisherDependencyProvider::getPublisherPlugins():array` and define the publish queue.

```php
<?php

namespace Pyz\Zed\Publisher;

...
use Pyz\Shared\HelloWorldStorage\HelloWorldStorageConfig;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
...

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            ......,
            $this->getHelloWorldStoragePlugins()
        );
    }

    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getHelloWorldStoragePlugins(): array
    {
        return [
            HelloWorldStorageConfig::PUBLISH_HELLO_WORLD => [
                new HelloWorldWritePublisherPlugin(),
                new HelloWorldDeletePublisherPlugin(),
            ],
        ];
    }
}
```

## 5. Usage


Now you can manually trigger events. Follow the steps below trigger events manually:

1.  Stop all Cron jobs or disable background queue processing in Jenkins using the following command:
    
```bash
vendor/bin/console schedule:suspend
```

2. Create a controller class as follows and run it.

```php
<?php

namespace Pyz\Zed\HelloWorld\Communication\Controller;

use Orm\Zed\HelloWorld\Persistence\SpyHelloWorldMessage;
use Spryker\Zed\Kernel\Communication\Controller\AbstractController;

class IndexController extends AbstractController
{
    public function indexAction()
    {
        $helloWorldMessage = new SpyHelloWorldMessage();
        $helloWorldMessage->setName('John');
        $helloWorldMessage->setMessage('Hello World!');
        $helloWorldMessage->save();

        return $this->jsonResponse([
            'status' => 'success'
        ]);
    }
}
```

{% info_block warningBox "Verification" %}


Ensure that the event has been created:

1.  Open the RabbitMQ management GUI at `http(s)://{host_name}:15672/#/queues`
    
2.  You should see an event in the `publish.hello_world` queue:
    

![rabbitmq-event](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Publishing/Handling+data+with+Publish+and+Synchronization/rabbitmq-event.png){height="" width=""}


{% endinfo_block %}


{% info_block warningBox "Verification" %}


Ensure that the triggered event has the correct structure:

1.  Open the message in the `publish.hello_world` queue. You should see a similar message:
    
```xml
{
  "listenerClassName":"Pyz\\Zed\\HelloWorldStorage\\Communication\\Plugin\\Publisher\\HelloWorldWritePublisherPlugin",
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

2. Verify the data required for the publisher to process it:

    *   Event name: `Entity.spy_hello_spryker_message.create`

    *   Listener: `HelloWorldWritePublisherPlugin`

    *   Table name: `spy_hello_spryker_message`

    *   Modified columns: `spy_hello_spryker_message.name`, `spy_hello_spryker_message.message`

    *   ID: the primary key of the record

    *   ForeignKey: the key to backtrack the updated Propel entities
    

{% endinfo_block %}


3. Register an event queue message processor for the `publish.hello_world` queue.

```php
<?php

namespace Pyz\Zed\Queue;

...
use Pyz\Shared\HelloWorldStorage\HelloWorldStorageConfig;
...

class QueueDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface[]
     */
    protected function getProcessorMessagePlugins(Container $container): array
    {
        return [
            HelloWorldStorageConfig::PUBLISH_HELLO_WORLD => new EventQueueMessageProcessorPlugin(),
        ];
    }
}
```

4. To execute publishers and catch the event, run the queue command:

```bash
console queue:task:start publish.hello_world
```

 The command is executed by the worker which is defined as a job in Jenkins:

```text
{vagrant@spryker-vagrant ➜  current git:(master) ✗  console queue:task:start publish.hello_world
Store: DE | Environment: development
Hello World!
```

{% info_block warningBox "Verification" %}

Ensure that the event has been processed correctly:

*   You can see a message from the publisher in the event.
    
*   The `publish.hello_world` queue is empty:
    
![empty-rabbitmq-queue](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Publishing/Handling+data+with+Publish+and+Synchronization/empty-rabbitmq-queue.png){height="" width=""}



{% endinfo_block %}

{% info_block infoBox "your title goes here" %}

Use the `-k` option to keep messages in the queue for debugging purposes: `queue:task:start publish.hello_world -k`.

{% endinfo_block %}

## 6. Storage Table


To publish data in Redis, an intermediate database table in Zed is required. The table stores data until it is sent to Redis. The data in the table is already structured for export to Redis.

Follow the steps to create the table:

1.  Create the table schema file:
    
```xml
<table name="spy_hello_world_message_storage" idMethod="native" allowPkInsert="true">
    <column name="id_hello_world_message_storage" type="BIGINT" autoIncrement="true" primaryKey="true"/>
    <column name="fk_hello_world_message" type="INTEGER" required="true"/>
    <index name="spy_hello_world_message_storage-fk_hello_world_message">
        <index-column name="fk_hello_world_message"/>
    </index>
    <behavior name="synchronization">
        <parameter name="resource" value="message"/>
        <parameter name="key_suffix_column" value="fk_hello_world_message"/>
        <parameter name="queue_group" value="sync.storage.hello"/>
    </behavior>
    <behavior name="timestampable"/>
        <id-method-parameter value="spy_hello_world_message_storage_pk_seq"/>
</table>
```


2. Based on the schema, create the table in database:

```bash
console propel:install
```

The schema file defines the table as follows:

*   ID - the primary key of the table (`id_hello_world_message_storage` in our example).
    
*   ForeignKey - foreign key to the main resource that you want to export (`fk_hello_world_message` for `spy_hello_world_message`).
    
*   `SynchronizationBehaviour` modifies the table as follows:
    
    *   Adds the `Data` column that stores data in the format that can be sent directly to Redis. The database field type is `TEXT`_._
        
    *   Adds the `Key` column that stores the Redis Key. The data type is `VARCHAR`.
        
    *   Defines `Resource` name for key generation.
        
    *   Defines `Store` value for store specific data.
        
    *   Defines `Locale` value for localizable data.
        
    *   Defines `Key Suffix Column` value for key generation.
        
    *   Defines `queue_group` to send a copy of the `data` column.
        
*   Timestamp Behavior is added to keep timestamps and use incremental sync strategy.
    
{% info_block infoBox "Incremental sync" %}

An *incremental sync* is a sync that only processes the data records that have changed (created or modified) since the last time the integration ran as opposed to processing the entire data set every time.

{% endinfo_block %}

**Key Generation Strategy**
| Resource | Store | Locale | Key Suffix Column | Redis key |
| --- | --- | --- | --- | --- |
| message | x | x | -  | `message` |
| message | v | v | - | `message.de.de_de` |
| message | x | x | `fk_hello_spryker_message` | `message.1`, `message.2`, … |
| message | v | x | `fk_hello_spryker_message` | `message.de.1`, `message.de.2`, … |
| message | v | v | `fk_hello_spryker_message` | `message.de.de_de.1`, `message.de.de_de.2`, … |
| message | x | v | `fk_hello_spryker_message` | `message.de_de.1`, `message.de_de.2`, … |

To create complex keys to use more than one column, do the following:

1. Create a custom column.
2. Create a custom key there (for example, `price_key`).
3. Pass the `custom_key` column as the suffix.

## 7. Models and Facade


At this point, you can complete the publish part. Follow the standard conventions and let publishers delegate the execution process through the Facade to the Models behind.

To do this, create facade and model classes to handle the logic of the publish part as follows.

Find the facade methods below:

*   `writeCollectionByHelloWorldEvents(array $eventTransfers)`
    
*   `deleteCollectionByHelloWorldEvents(array $eventTransfers)`
    

1. Create the `HelloWorldStorageWriter` model and implement the following method:

```php
<?php

namespace Pyz\Zed\HelloWorldStorage\Business\Writer;

..

class HelloWorldStorageWriter implements HelloWorldStorageWriterInterface
{
   /**
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     *
     * @return void
     */
    public function writeCollectionByHelloWorldEvents(array $eventTransfers): void
    {
        $messages = SpyHelloWorldMessageQuery::create()
            ->filterByIdHelloWorldMessage_In($eventTransfers)
            ->find();

        foreach ($messages as $message) {
            $messageStorageTransfer = new HelloWorldStorageTransfer();
            $messageStorageTransfer->fromArray($message->toArray(), true);
            $this->store($message->getIdHelloWorldMessage(), $messageStorageTransfer);
        }
    }
    
    /**
    * @return void 
    */
    protected function store($idMessage, HelloWorldStorageTransfer $messageStorageTransfer): void
    {
        $storageEntity = new SpyHelloWorldMessageStorage();
        $storageEntity->setFkHelloWorldMessage($idMessage);
        $storageEntity->setData($messageStorageTransfer->modifiedToArray());
        $storageEntity->save();
    }
}
```

2. Create the `HelloWorldStorageDeleter` model and implement the following method:

```php
<?php

namespace Pyz\Zed\HelloWorldStorage\Business\Deleter;

..

class HelloWorldStorageDeleter implements HelloWorldStorageWriterInterface
{
    /**
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     *
     * @return void
     */
    public function deleteCollectionByHelloWorldEvents(array $eventTransfers): void
    {
        $messages = SpyHelloWorldMessageQuery::create()
            ->filterByIdHelloWorldMessage_In($eventTransfers)
            ->find();

        foreach ($messages as $message) {
            $messageStorageTransfer = new HelloWorldStorageTransfer();
            $messageStorageTransfer->fromArray($message->toArray(), true);
            $this->store($message->getIdHelloWorldMessage(), $messageStorageTransfer);
        }
    }
    
    /**
     * @return void
     */
    protected function store($idMessage, HelloWorldStorageTransfer $messageStorageTransfer): void
    {
        $messages = SpyHelloWorldMessageStorageQuery::create()
            ->filterByFkHelloWorldMessage_In($messageIds)
            ->find();
 
        foreach ($messages as $message) {
            $message->delete();
        }
    }
}
```


2. Create the two facade methods to expose the model:

```php
<?php

namespace Pyz\Zed\HelloWorldStorage\Business;
 
use Spryker\Zed\Kernel\Business\AbstractFacade;
 
class HelloWorldStorageFacade extends AbstractFacade implements HelloWorldStorageFacadeInterface
{
    /**
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     *
     * @return void
     */
    public function writeCollectionByHelloWorldEvents(array $eventTransfers)
    {
        $this->getFactory()
            ->createHelloWorldMessageStorageWriter()
            ->writeCollectionByHelloWorldEvents($eventTransfers);
    }
 
   /**
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     *
     * @return void
     */
    public function deleteCollectionByHelloWorldEvents(array $eventTransfers)
    {
        $this->getFactory()
            ->createHelloWorldMessageStorageDeleter()
            ->deleteCollectionByHelloWorldEvents($eventTransfers);
    }
}
```

3. Refactor the publisher classes and call the facade methods:

```php
<?php

namespace Pyz\Zed\HelloWorldStorage\Communication\Plugin\Publisher;

use Pyz\Shared\HelloWorldStorage\HelloWorldStorageConfig;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface;

/**
 * @method \Pyz\Zed\HelloWorldStorage\Communication\HelloWorldStorageCommunicationFactory getFactory()
 * @method \Pyz\Zed\HelloWorldStorage\Business\HelloWorldStorageFacadeInterface getFacade()
 * @method \Pyz\Zed\HelloWorldStorage\HelloWorldStorageConfig getConfig()
 */
class HelloWorldWritePublisherPlugin extends AbstractPlugin implements PublisherPluginInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     * @param string $eventName
     *
     * @return void
     */
    public function handleBulk(array $eventTransfers, $eventName)
    {
        $this->getFacade()->writeCollectionByHelloWorldEvents($eventTransfers);
    }
 
 ....
    
}    
```

```php
<?php

namespace Pyz\Zed\HelloWorldStorage\Communication\Plugin\Publisher;

use Pyz\Shared\HelloWorldStorage\HelloWorldStorageConfig;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface;

/**
 * @method \Pyz\Zed\HelloWorldStorage\Communication\HelloWorldStorageCommunicationFactory getFactory()
 * @method \Pyz\Zed\HelloWorldStorage\Business\HelloWorldStorageFacadeInterface getFacade()
 * @method \Pyz\Zed\HelloWorldStorage\HelloWorldStorageConfig getConfig()
 */
class HelloWorldDeletePublisherPlugin extends AbstractPlugin implements PublisherPluginInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\EventEntityTransfer[] $eventTransfers
     * @param string $eventName
     *
     * @return void
     */
    public function handleBulk(array $eventTransfers, $eventName)
    {
        $this->getFacade()->deleteCollectionByHelloWorldEvents($eventTransfers);
    }
 
 ....
    
}      
```

## 8. Queue


This section describes how to create the queue to sync data to Redis.

To create the `sync.storage.hello` queue, do the following :

1. Adjust `\Pyz\Shared\HelloWorldStorage\HelloWorldStorageConfig`:

```php
namespace Pyz\Shared\HelloWorldStorage;

use Spryker\Shared\Kernel\AbstractBundleConfig;

class HelloWorldStorageConfig extends AbstractBundleConfig
{
    ...

    /**
     * Defines queue name as used for processing translation messages.
     */
    public const SYNC_STORAGE_HELLO = 'sync.storage.hello';
    
    ....
}   
```

2. Adjust the RabbitMQ configuration with the newly introduced queue:

```php
<?php

namespace Pyz\Client\RabbitMq;

...

/**
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 */
class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     *  QueueNameFoo, // Queue => QueueNameFoo, (Queue and error queue will be created: QueueNameFoo and QueueNameFoo.error)
     *  QueueNameBar => [
     *       RoutingKeyFoo => QueueNameBaz, // (Additional queues can be defined by several routing keys)
     *   ],
     *
     * @see https://www.rabbitmq.com/tutorials/amqp-concepts.html
     *
     * @return array
     */
    protected function getQueueConfiguration(): array
    {
        return [
            ...,
            HelloWorldStorageConfig::SYNC_STORAGE_HELLO,
        ];
    }
```

3. Add `MessageProcessor` for the queue to `\Pyz\Zed\QueueQueueDependencyProvider::getProcessorMessagePlugins()`:

```php
<?php

namespace Pyz\Zed\Queue;

...

class QueueDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @return array
     */
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            ...
            HelloWorldStorageConfig::SYNC_STORAGE_HELLO => new SynchronizationStorageQueueMessageProcessorPlugin(),
            ...
        ];
    }
}
```

4. Run the `IndexController` class that you’ve created in step [4. Publishers](#4publishers) to update the table.

{% info_block warningBox "Verification" %}

Ensure that a new event is created in the `publish.hello_world` queue.

{% endinfo_block %}


5. Run the queue to start processing the messages from the *Publisher* queue that have been published:

```text
{vagrant@spryker-vagrant ➜  current git:(master) ✗  console queue:task:start publish.hello_world
Store: DE | Environment: development
```

{% info_block warningBox "Verification" %}


Ensure that the records have been added to the table:  
1. Open `spy_hello_world_message_storage`.

2. You should see a record similar to the following pear per each message:

| id_hello_world_message_storage | fk_hello_world_message | data | key | created_at | updated_at |
| --- | --- | --- | --- | --- | --- |
| 1 | 2 | {"name":"John","message":"Hello World!"}  | message:2 | 2018-06-04 14:59:33.063645 | 2018-06-04 14:59:33.063645 |


{% endinfo_block %}

The Publish process is complete.

{% info_block warningBox "Verification" %}

Ensure that the data has been exported to a secondary queue for the Synchronize process. The `sync.storage.hello` queue should have at least one message:

![separate-sync-queue](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Publishing/Handling+data+with+Publish+and+Synchronization/separate-sync-queue.jpeg){height="" width=""}



{% endinfo_block %}


6. Sync data with Redis:

```bash
console queue:task:start sync.storage.hello
```

{% info_block warningBox "Verification" %}

Ensure that the sync queue is empty.

{% endinfo_block %}
{% info_block infoBox "your title goes here" %}

To run all queues at once, run the following command: `console queue:worker:start -vvv`

{% endinfo_block %}


## 9. Redis

This section describes how to check the data export in Redis.

Follow the steps to check the data in Redis:

1.  Connect to Redis Desktop Manager at `http(s)://{host}:10009`.
    

2. Сheck if the data is structured correctly:

![data-structure](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Publishing/Handling+data+with+Publish+and+Synchronization/data-structure.jpeg){height="" width=""}

## 10. Client


This section describes how to read the data from Redis.

To read the data from Redis, create the following:

*   Client layer
    
*   `Client\Storage\MessageStorageReader` class:
    
```php
<?php

namespace Pyz\Client\HelloWorld\Storage;

use Generated\Shared\Transfer\SynchronizationDataTransfer;
use Spryker\Client\Storage\StorageClient;
use Spryker\Client\Storage\StorageClientInterface;
use Spryker\Service\Synchronization\SynchronizationService;
use Spryker\Service\Synchronization\SynchronizationServiceInterface;

class MessageStorageReader implements MessageStorageReaderInterface
{
	...
	
    public function getMessageById($idMessage)
    {
        $synchronizationDataTransfer = new SynchronizationDataTransfer();
        $synchronizationDataTransfer
            ->setReference($idMessage);

        $key = $this->synchronizationService
            ->getStorageKeyBuilder('message')
            ->generateKey($synchronizationDataTransfer);

        $data = $this->storageClient->get($key);
        
        $messageStorageTransfer = new HelloWorldStorageTransfer();
        $messageStorageTransfer->fromArray($data, true);
        
        return $messageStorageTransfer;
    }
    
    ...
}
```


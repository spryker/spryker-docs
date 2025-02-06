---
title: Integrate multi-queue publish structure
description: Learn how to integrate the Multi-queue publish structure to improve debugging and slow events in your Spryker based projects.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/multiple-publish-queue-structure
originalArticleId: 52874a77-9a3a-425d-8bc5-2abac8bc9beb
redirect_from:
  - /docs/scos/dev/technical-enhancement-integration-guides/integrating-multi-queue-publish-structure.html
  - /docs/scos/dev/technical-enhancements/multiple-publish-queue-structure.html
---

To improve debugging of failures and slow events in Spryker, we introduced a new publish queue structure. In the new structure, the single event queue is replaced by multiple publish queues. You can can find a detailed comparison of the structures in the table below.

| PROPERTY | SINGLE PUBLISH QUEUE STRUCTURE | MULTIPLE PUBLISH QUEUE STRUCTURE |
| --- | --- | --- |
| Event processing | Infrastructure and application events are processed in the same event queue. | Infrastructure events are spread across multiple publish events. Application events are processed in the event queue. |
| Monitoring of event consumption speed | Because of mixed listeners, event consumption speed is unpredictable and not linear. | You can monitor the speed of event consumption in each queue separately. |
| Per event configuration of chunk size |  | &check; |
| Per event separation of workers |  | &check; |


**Diagram of the single publish queue structure**

![single-publish-queue-structure](https://confluence-connect.gliffy.net/embed/image/cc624c10-1d44-4922-8637-55a913ca8b19.png?utm_medium=live&utm_source=custom)

**Diagram of the multiple publish queue structure**

![multiple-publish-queue-structure](https://confluence-connect.gliffy.net/embed/image/69563548-7606-424a-944c-f78b2d67382e.png?utm_medium=live&utm_source=custom)

## Set up multiple publish queue structure

To enhance your project with the new structure, follow the steps below.

### 1) Install the required modules using Composer

```bash
composer require spryker/publisher:"1.1.0"
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| Publisher | spryker/publisher |

{% endinfo_block %}

### 2) Set up Behavior  

Set up behavior as follows:

1. Set up the `publish` queue as the default one:

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Shared\Publisher\PublisherConfig as SharedPublisherConfig;
use Spryker\Zed\Publisher\PublisherConfig as SprykerPublisherConfig;

class PublisherConfig extends SprykerPublisherConfig
{
    /**
     * @return string|null
     */
    public function getPublishQueueName(): ?string
    {
        return SharedPublisherConfig::PUBLISH_QUEUE; // 'publish'
    }
}
```

2. Set `\Pyz\Client\RabbitMqRabbitMqConfig::getPublishQueueConfiguration()` to use the `publish` queue.

<details><summary>Pyz\Client\RabbitMq</summary>

```php
<?php

namespace Pyz\Client\RabbitMq;

...

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
        return array_merge(
            [
                EventConstants::EVENT_QUEUE => [
                    EventConfig::EVENT_ROUTING_KEY_RETRY => EventConstants::EVENT_QUEUE_RETRY,
                    EventConfig::EVENT_ROUTING_KEY_ERROR => EventConstants::EVENT_QUEUE_ERROR,
                ],
                $this->get(LogConstants::LOG_QUEUE_NAME),
            ],
            $this->getPublishQueueConfiguration(),
            ....
        );
    }

    /**
     * @return array
     */
    protected function getPublishQueueConfiguration(): array
    {
        return [
            PublisherConfig::PUBLISH_QUEUE => [
                PublisherConfig::PUBLISH_ROUTING_KEY_RETRY => PublisherConfig::PUBLISH_RETRY_QUEUE,
                PublisherConfig::PUBLISH_ROUTING_KEY_ERROR => PublisherConfig::PUBLISH_ERROR_QUEUE,
            ],
            ...
        ];
    }
...
}
```
</details>

3. Set `Pyz\Zed\Queue\QueueDependencyProvider::getProcessorMessagePlugins()` to use the `publish` queue.

```php
<?php

namespace Pyz\Zed\Queue;

...

use Spryker\Shared\Publisher\PublisherConfig;

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
            ...
            PublisherConfig::PUBLISH_QUEUE => new EventQueueMessageProcessorPlugin(),
            PublisherConfig::PUBLISH_RETRY_QUEUE => new EventRetryQueueMessageProcessorPlugin(),
            ...
       ];
    }
}
```

### Introduce a new publish queue

{% info_block infoBox %}

We introduce the GlossaryStorage publish queue as an example. Adjust the publish queue name according to your requirements.

{% endinfo_block %}

To introduce the GlossaryStorage publish queue:

1.  Update the `GlossaryStorage` module:

```bash
composer update spryker/glossary-storage:"1.8.0" --update-with-dependencies
```

2. In `\Pyz\Client\RabbitMqRabbitMqConfig::getPublishQueueConfiguration()`, register the `publish.translation` queue for glossary events.

```php
<?php

namespace Pyz\Client\RabbitMq;

...

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
            GlossaryStorageConfig::PUBLISH_TRANSLATION, // 'publish.translation'
        ];
    }

    ...
}
```

3. Adjust `Pyz\Zed\Queue\QueueDependencyProvider::getProcessorMessagePlugins()` by adding the `publish.translation` glossary publish queue with a specific message processor plugin.

```php
<?php

namespace Pyz\Zed\Queue;

...
use Spryker\Shared\GlossaryStorage\GlossaryStorageConfig;
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
            ...
            GlossaryStorageConfig::PUBLISH_TRANSLATION => new EventQueueMessageProcessorPlugin(),
            ...      
       ];
    }
}
```

4. Set `\Pyz\Zed\Publisher\PublisherDependencyProvider::getPublisherPlugins()` to use the `publish.translation` queue.

<details><summary>Pyz\Zed\Publisher</summary>

```php
<?php

namespace Pyz\Zed\Publisher;

...
use Spryker\Shared\GlossaryStorage\GlossaryStorageConfig;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryKey\GlossaryDeletePublisherPlugin as GlossaryKeyDeletePublisherPlugin;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryKey\GlossaryWritePublisherPlugin as GlossaryKeyWriterPublisherPlugin;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryTranslation\GlossaryWritePublisherPlugin as GlossaryTranslationWritePublisherPlugin;
...

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            $this->getGlossaryStoragePlugins(),
        );
    }

    /**
     * @return array
     */
    protected function getGlossaryStoragePlugins(): array
    {
        return [
            GlossaryStorageConfig::PUBLISH_TRANSLATION => [ // 'publish.translation'
                new GlossaryKeyDeletePublisherPlugin(),
                new GlossaryKeyWriterPublisherPlugin(),
                new GlossaryTranslationWritePublisherPlugin(),
            ],
        ];
    }
    ...
}
```
</details>

### Publish events using the default publish queue

To publish events using the default `publish` queue, register the publisher plugins which process glossary events:

```php
<?php

namespace Pyz\Zed\Publisher;

...
use Spryker\Shared\GlossaryStorage\GlossaryStorageConfig;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryKey\GlossaryDeletePublisherPlugin as GlossaryKeyDeletePublisherPlugin;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryKey\GlossaryWritePublisherPlugin as GlossaryKeyWriterPublisherPlugin;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryTranslation\GlossaryWritePublisherPlugin as GlossaryTranslationWritePublisherPlugin;
...

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array
     */
    protected function getGlossaryStoragePlugins(): array
    {
        return [
            new GlossaryKeyDeletePublisherPlugin(),
            new GlossaryKeyWriterPublisherPlugin(),
            new GlossaryTranslationWritePublisherPlugin(),
        ];
    }
    ...
}
```

### Set up a publish queue for a publisher plugin

You can set up an individual publish queue for a publisher plugin or a set of publisher plugins as follows:

<details><summary>Pyz\Zed\Publisher</summary>

```php
<?php

namespace Pyz\Zed\Publisher;

...
use Spryker\Shared\GlossaryStorage\GlossaryStorageConfig;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryKey\GlossaryDeletePublisherPlugin as GlossaryKeyDeletePublisherPlugin;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryKey\GlossaryWritePublisherPlugin as GlossaryKeyWriterPublisherPlugin;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryTranslation\GlossaryWritePublisherPlugin as GlossaryTranslationWritePublisherPlugin;
...

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array
     */
    protected function getGlossaryStoragePlugins(): array
    {
        return [
            'publish.translation_key' => [
                 new GlossaryKeyDeletePublisherPlugin(),
                 new GlossaryKeyWriterPublisherPlugin(),
             ],
             'publish.translation' => [
                 new GlossaryTranslationWritePublisherPlugin(),
             ],

        ];
    }
    ...
}
```
</details>

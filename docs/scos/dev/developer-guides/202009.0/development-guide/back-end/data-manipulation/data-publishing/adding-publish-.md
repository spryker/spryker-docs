---
title: Adding publish events
originalLink: https://documentation.spryker.com/v6/docs/adding-publish-events
redirect_from:
  - /v6/docs/adding-publish-events
  - /v6/docs/en/adding-publish-events
---

[Publish and Synchronize](https://documentation.spryker.com/docs/publish-and-synchronization) are event-driven. Data is published only after a registered event is triggered. Follow the steps below to register the events for them:
1. Prepare data structure and activate `Propel Event Behavior` for the `spy_glossary` database table:

```xml
<table name="spy_glossary" idMethod="native" allowPkInsert="true">
    ...
    ...
    <behavior name="event">
        <parameter name="spy_glossary_all" column="*"/>
    </behavior>
</table>
```

2. Register publish queue and the events to be tracked in `\Spryker\Shared\GlossaryStorage\GlossaryStorageConfig`: 

```php
<?php

...

namespace Spryker\Shared\GlossaryStorage;

use Spryker\Shared\Kernel\AbstractBundleConfig;

class GlossaryStorageConfig extends AbstractBundleConfig
{
    ...

   /**
     * Defines queue name as used for processing translation messages.
     */
    public const PUBLISH_TRANSLATION = 'publish.translation';

    /**
     * This events that will be used for key writing.
     */
    public const GLOSSARY_KEY_PUBLISH_WRITE = 'Glossary.key.publish';

    /**
     * This events that will be used for key deleting.
     */
    public const GLOSSARY_KEY_PUBLISH_DELETE = 'Glossary.key.unpublish';

    /**
     * This events will be used for spy_glossary_key entity creation.
     */
    public const ENTITY_SPY_GLOSSARY_KEY_CREATE = 'Entity.spy_glossary_key.create';

    /**
     * This events will be used for spy_glossary_key entity changes.
     */
    public const ENTITY_SPY_GLOSSARY_KEY_UPDATE = 'Entity.spy_glossary_key.update';

    /**
     * This events will be used for spy_glossary_key entity deletion.
     */
    public const ENTITY_SPY_GLOSSARY_KEY_DELETE = 'Entity.spy_glossary_key.delete';

    ...
}
```


3. Adjust the RabbitMQ configuration with the newly introduced publish queue:


```php
<?php

namespace Pyz\Client\RabbitMq;

...

use Spryker\Shared\GlossaryStorage\GlossaryStorageConfig;

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
            GlossaryStorageConfig::PUBLISH_TRANSLATION,
        ];
    }
...
}    
```

4. Implement and register the Publisher plugin for the glossary storage module in `\Pyz\Zed\Publisher\PublisherDependencyProvider` with defined `publish.translation` queue.

```php
<?php

namespace Pyz\Zed\Publisher;

...
use Spryker\Shared\GlossaryStorage\GlossaryStorageConfig;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryKey\GlossaryDeletePublisherPlugin as GlossaryKeyDeletePublisherPlugin;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryKey\GlossaryWritePublisherPlugin as GlossaryKeyWriterPublisherPlugin;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryTranslation\GlossaryWritePublisherPlugin as GlossaryTranslationWritePublisherPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
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

...

    /**
     * @return array
     */
    protected function getGlossaryStoragePlugins(): array
    {
        return [
            GlossaryStorageConfig::PUBLISH_TRANSLATION => [
                new GlossaryKeyDeletePublisherPlugin(),
                new GlossaryKeyWriterPublisherPlugin(),
                new GlossaryTranslationWritePublisherPlugin(),
            ],
        ];
    }
    ...
}
```

Now, you can track the changes in the `Glossary` entity. When it is created, updated, or deleted, an event is created and posted to the specified RabbitMQ publish queue (`publish.translation`).











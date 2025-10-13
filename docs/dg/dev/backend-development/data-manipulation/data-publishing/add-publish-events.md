---
title: Add publish events
description: Add custom publish events in Spryker to automate data updates efficiently. Learn best practices for backend data manipulation in Spryker.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/adding-publish-events
originalArticleId: 6254b4c6-f147-4463-bc61-e9b3f7bf7e28
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/data-publishing/add-publish-events.html
  - /docs/scos/dev/back-end-development/data-manipulation/data-publishing/adding-publish-events.html
related:
  - title: Publish and Synchronization
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.html
  - title: Implement Publish and Synchronization
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/implement-publish-and-synchronization.html
  - title: Handle data with Publish and Synchronization
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/handle-data-with-publish-and-synchronization.html
  - title: Implement event trigger publisher plugins
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/implement-event-trigger-publisher-plugins.html
  - title: Implement synchronization plugins
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/implement-synchronization-plugins.html
  - title: Debug listeners
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/debug-listeners.html
  - title: Publish and synchronize and multi-store shop systems
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronize-and-multi-store-shop-systems.html
  - title: Publish and Synchronize repeated export
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronize-repeated-export.html
  - title: Synchronization behavior - enabling multiple mappings
    link: docs/dg/dev/backend-development/data-manipulation/data-publishing/configurartion/mapping-configuration.html
---

[Publish and Synchronize](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.html) are event-driven. Data is published only after a registered event is triggered. Follow these steps to register the events for them:

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

4. Implement and register the `Publisher` plugin for the glossary storage module in `\Pyz\Zed\Publisher\PublisherDependencyProvider` with the defined `publish.translation` queue.

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

5. If you need original values or an additional data set in `EventEntityTransfer`, provide the configuration in the Entity class. `getOriginalValueColumnNames` is called only on a save event.

```php
<?php

...

namespace Orm\Zed\Glossary\Persistence;

use Orm\Zed\Glossary\Persistence\Map\SpyGlossaryTableMap;
use Spryker\Zed\Glossary\Persistence\Propel\AbstractSpyGlossary as BaseSpyGlossary;

class SpyGlossary extends BaseSpyGlossary
{
    protected function getAdditionalValueColumnNames(): array
    {
        return [
            SpyGlossaryTableMap::COL_IS_ACTIVE,
            ...
        ];
    }

    protected function getOriginalValueColumnNames(): array
    {
        return [
            SpyGlossaryTableMap::COL_SOME_COLUMN,
            ...
        ];
    }
}
```

Now, you can track the changes in the `Glossary` entity. When it's created, updated, or deleted, an event is created and posted to the specified RabbitMQ publish queue (`publish.translation`).

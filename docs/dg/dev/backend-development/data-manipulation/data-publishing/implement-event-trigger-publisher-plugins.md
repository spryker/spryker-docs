---
title: Implement event trigger publisher plugins
description: Implement event-trigger publisher plugins in Spryker to automate data publishing. Enhance backend functionality with this comprehensive guide on event handling.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-implement-event-trigger-publisher-plugins
originalArticleId: 217a59d0-03ed-4b5b-9be2-01ed9878c9eb
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/data-publishing/implement-event-trigger-publisher-plugins.html
  - /docs/scos/dev/back-end-development/data-manipulation/data-publishing/implementing-event-trigger-publisher-plugins.html
related:
  - title: Publish and Synchronization
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/publish-and-synchronization.html
  - title: Implement Publish and Synchronization
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/implement-publish-and-synchronization.html
  - title: Handle data with Publish and Synchronization
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/handle-data-with-publish-and-synchronization.html
  - title: Adding publish events
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/add-publish-events.html
  - title: Implement synchronization plugins
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/implement-synchronization-plugins.html
  - title: Debug listeners
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/debug-listeners.html
  - title: Publish and synchronize and multi-store shop systems
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/publish-and-synchronize-and-multi-store-shop-systems.html
  - title: Publish and Synchronize repeated export
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/publish-and-synchronize-repeated-export.html
  - title: Synchronization behavior - enabling multiple mappings
    link: docs/scos/dev/back-end-development/data-manipulation/data-publishing/synchronization-behavior-enabling-multiple-mappings.html
---

To [publish or republish](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronize-repeated-export.html#published-data-re-generation) the model data manually for all or a particular resource, you need to implement an event trigger publisher plugin.

Follow these steps to implement and register a new event trigger publisher plugin.

<details><summary>Pyz\Zed\HelloWorldStorage\Communication\Plugin\Publisher</summary>

```php
<?php

namespace Pyz\Zed\HelloWorldStorage\Communication\Plugin\Publisher;

use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface;

/**
 * @method \Pyz\Zed\HelloWorldStorage\Business\HelloWorldStorageFacadeInterface getFacade()
 * @method \Pyz\Zed\HelloWorldStorage\Communication\HelloWorldStorageCommunicationFactory getFactory()
 * @method \Pyz\Zed\HelloWorldStorage\HelloWorldStorageConfig getConfig()
 */
class HelloWorldPublisherTriggerPlugin extends AbstractPlugin implements PublisherTriggerPluginInterface
{
    /**
     * @return string
     */
    public function getResourceName(): string
    {
        return HelloWorldStorageConfig::HELLO_WORLD_RESOURCE_NAME;
    }

    /**
     * @param int $offset
     * @param int $limit
     *
     * @return \Generated\Shared\Transfer\GlossaryKeyTransfer[]
     */
    public function getData(int $offset, int $limit): array
    {
        return $this->getFacade()->findHelloWorldEntities($offset, $limit);
    }

    /**
     * @return string
     */
    public function getEventName(): string
    {
        return HelloWorldStorageConfig::HELLO_WORLD_PUBLISH_WRITE;
    }

    /**
     * @return string|null
     */
    public function getIdColumnName(): ?string
    {
        return PyzHelloWorldTableMap::COL_ID_HELLO_WORLD;
    }
}
```

</details>

Find method descriptions below:
* `HelloWorldPublisherTriggerPlugin::getResourceName()`—defines the resource name for key generation.
* `HelloWorldPublisherTriggerPlugin::getData()`—retrieves a collection of data transfer objects for publishing according to a provided offset and limit.
* `HelloWorldPublisherTriggerPlugin::getEventName()`—defines an event name for publishing.

* `HelloWorldPublisherTriggerPlugin::getIdColumnName()`—defines an ID column name for publishing.

{% info_block infoBox %}

Make sure to fulfill the requirements:

1. The resource name must be the same as in the Propel schema definition.

2. The plugin must implement `\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface`.

{% endinfo_block %}

Register the event trigger publisher plugin in `\Pyz\Zed\Publisher\PublisherDependencyProvider`:

```php
<?php

namespace Pyz\Zed\Publisher;

...
use Pyz\Zed\HelloWorldStorage\Communication\Plugin\Publisher\HelloWorldPublisherTriggerPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    ...

    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface[]
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            ......,
            new HelloWorldPublisherTriggerPlugin(),
            ......,
        ];
    }

    ...
}
```

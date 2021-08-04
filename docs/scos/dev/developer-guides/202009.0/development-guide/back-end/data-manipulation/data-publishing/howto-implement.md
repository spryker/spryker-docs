---
title: Implementing event trigger publisher plugins
originalLink: https://documentation.spryker.com/v6/docs/howto-implement-event-trigger-publisher-plugins
redirect_from:
  - /v6/docs/howto-implement-event-trigger-publisher-plugins
  - /v6/docs/en/howto-implement-event-trigger-publisher-plugins
---

Sometimes it’s necessary to [publish or re-publish](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/1215792106/WIP+Publish+and+Synchronize+Repeated+Export#Published-Data-Re-generation) the model data manually for all or a particular resource. To do that, you need to implement an event trigger publisher plugin.

Follow the steps below to implement and register a new event trigger publisher plugin.

<details open>
    <summary>Pyz\Zed\HelloWorldStorage\Communication\Plugin\Publisher</summary>
    
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

*   `HelloWorldPublisherTriggerPlugin::getResourceName()` - defines the resource name for key generation.

*   `HelloWorldPublisherTriggerPlugin::getData()` - retrieves a collection of data transfer objects for publishing according to a provided offset and limit.

*   `HelloWorldPublisherTriggerPlugin::getEventName()` - defines an event name for publishing.

*   `HelloWorldPublisherTriggerPlugin::getIdColumnName()` - defines an ID column name for publishing.

{% info_block infoBox %}

Make sure to fulfil the requirements:

1.  The resource name should be the same as in the Propel schema definition.

2.  The plugin should implement `\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface`.

{% endinfo_block %}

2. Register the event trigger publisher plugin in `\Pyz\Zed\Publisher\PublisherDependencyProvider`:

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

---
title: Event subscribers' registration
description: Extension scenario for the registration of event subscribers
last_updated: Mar 13, 2023
template: concept-topic-template
related:
  - title: Keeping a project upgradable
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/keeping-a-project-upgradable.html
  - title: Event subscribers registration
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/plugins-registration.html
  - title: Modules configuration
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/modules-configuration.html
redirect_from:
  - /docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/event-subscribers-registration.html
  - /docs/scos/dev/guidelines/keeping-a-project-upgradable/extension-scenarios/event-subscribers-registration.html

---

[Manifests](/docs/dg/dev/guidelines/keeping-a-project-upgradable/keeping-a-project-upgradable.html#follow-the-upgradability-best-practices) support registering event subscribers only in the dependency provider, a type of code class.

The following is an example of how to register event subscribers in collection with parent method call in a dependency provider:

```php
use Spryker\Zed\AvailabilityStorage\Communication\Plugin\Event\Subscriber\AvailabilityStorageEventSubscriber;
use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\UrlStorage\Communication\Plugin\Event\Subscriber\UrlStorageEventSubscriber;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
    ...
    protected function getEventSubscriberCollection()
    {
        $collection = parent::getEventSubscriberCollection();

        $collection->add(new AvailabilityStorageEventSubscriber());
        $collection->add(new UrlStorageEventSubscriber());

        return $collection;
    }
}
```
Manifests fully support the registration of event subscribers in the collection. Restrictions to the order of the plugins in collection are *not supported*. New plugin is added to the end of the collection.

The following is an example of how to register event subscribers in collection with a chain of method calls in a dependency provider:

```php
use Spryker\Zed\AvailabilityStorage\Communication\Plugin\Event\Subscriber\AvailabilityStorageEventSubscriber;
use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\UrlStorage\Communication\Plugin\Event\Subscriber\UrlStorageEventSubscriber;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
    ...
    protected function getEventSubscriberCollection()
    {
        $collection = parent::getEventSubscriberCollection();

        $collection->add(new AvailabilityStorageEventSubscriber())
            ->add(new UrlStorageEventSubscriber());

        return $collection;
    }
}
```

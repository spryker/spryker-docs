---
title: Event subscribers registration
description: Event subscribers registration extension scenario
last_updated: Mar 13, 2023
template: concept-topic-template
related:
- title: Plugins registration
  link: docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/event-subscribers-registration.html
- title: Event subscribers registration
  link: docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/event-subscribers-registration.html
- title: Modules configuration
  link: docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/modules-configuration.html
---

## Introduction

Manifests support event subscribers registration in the dependency provider.

Manifests fully support event subscribers registration in collection. Restrictions to the order of the plugins in collection are NOT SUPPORTED. New plugin will be added to the end of the collection.

Code example 1.1: Event subscribers registration in collection with parent method call
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

Code example 1.2: Event subscriber registration in collection with chain
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


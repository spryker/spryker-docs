---
title: Listen to events
descritpion: Learn how to listen to and handle backend events in Spryker, improving your eCommerce platform’s data manipulation and event management.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/event-listen
originalArticleId: 484a93ea-5e3c-4079-b682-6d2c7196b4b7
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/event/listen-to-events.html
  - /docs/scos/dev/back-end-development/data-manipulation/event/listening-to-events.html
related:
  - title: Event
    link: docs/scos/dev/back-end-development/data-manipulation/event/event.html
  - title: Add events
    link: docs/scos/dev/back-end-development/data-manipulation/event/add-events.html
  - title: Configure event queues
    link: docs/scos/dev/back-end-development/data-manipulation/event/configure-event-queues.html
---

There are two ways to listen to events: using direct listeners or subscribers. The difference between these two is that a subscriber allows the module providing the subscriber to wire up the handlers in the module that owns it without touching the `EventDependencyProvider` exception's initial subscriber initialization. It is best to use a subscriber from the beginning, as this simplifies future listener registration. When you need to listen to specific listener, use `\Pyz\Zed\Event\EventDependencyProvider::getEventListenerCollection`.

## Listen to events with direct listeners

To listen to events in the system, you need to add listener plugins. A listener is a class that extends plugins and implements `EventListenerInterface`. This plugin must be placed in the module you want to listen to: `Communication\Plugin\Product\ProductRelationAbstractProductChangeListener`.

For example, each listener plugin must implement `\Spryker\Service\Event\Dependency\Plugin\EventListenerInterface`.

```php
<?php
namespace Spryker\Zed\ProductRelation\Communication\Plugin\Product;

use Spryker\Zed\Event\Dependency\Plugin\EventListenerInterface;
use Spryker\Shared\Kernel\Transfer\TransferInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Spryker\Zed\ProductRelation\Business\ProductRelationFacade getFacade()
 * @method \Spryker\Zed\ProductRelation\Communication\ProductRelationCommunicationFactory getFactory()
 */
class ProductRelationAbstractProductChangeListener extends AbstractPlugin implements EventListenerInterface
{

    /**
     * @param \Spryker\Shared\Kernel\Transfer\TransferInterface|\Generated\Shared\Transfer\ProductAbstractTransfer $eventTransfer
     *
     * @return void
     */
    public function handle(TransferInterface $eventTransfer)
    {
        $this->getFacade()->applyRulesToProductAbstract($eventTransfer);
    }

}
```

Add this listener to `\Pyz\Zed\Event\EventDependencyProvider::getEventListenerCollection`

Example:
```php
$eventCollection->addListener(ProductEvents::PRODUCT_ABSTRACT_BEFORE_CREATE, new ProductRelationAbstractProductChangeListener())`
```

## Listen to events with a subscriber

Event subscribers are another way to listen to events in the system. The advantage of using event subscribers is that all the listeners reside in the module you want to react to the event. Register a subscriber once in `EventDependencyProvider` and later a listener can be added without touching other modules.

To implement a subscriber, follow these steps:

1. Create an event subscriber class. Example:

```php
<?php
namespace Spryker\Zed\ProductRelation\Communication\Plugin;

use Spryker\Zed\Event\Dependency\EventCollectionInterface;
use Spryker\Zed\Event\Dependency\Plugin\EventSubscriberInterface;
use Spryker\Zed\Product\Dependency\ProductEvents;
 Spryker\Zed\ProductRelation\Communication\Plugin\Product\ProductRelationAbstractProductChangeListener;

use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * Sample implementation for subscriber
 */
class ProductRelationEventSubscriber extends AbstractPlugin implements EventSubscriberInterface
{

    /**
     * @param \Spryker\Zed\Event\Dependency\EventCollectionInterface $eventCollection
     *
     * @return \Spryker\Zed\Event\Dependency\EventCollectionInterface
     */
    public function getSubscribedEvents(EventCollectionInterface $eventCollection)
    {
        return $eventCollection
            ->addListener(ProductEvents::PRODUCT_ABSTRACT_BEFORE_CREATE, new ProductRelationAbstractProductChangeListener());

    }

}
```

2. Include this subscriber class to `\Pyz\Zed\Event\EventDependencyProvider::getEventSubscriberCollection`.

```php
<?php

/**
 * @return \Spryker\Zed\Event\Dependency\EventSubscriberCollectionInterface
 */
public function getEventSubscriberCollection()
{
    $eventSubscriberCollection = new EventSubscriberCollection();
    $eventSubscriberCollection->add(new ProductRelationEventSubscriber());

    return $eventSubscriberCollection
}
```

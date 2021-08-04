---
title: Listening to Events
originalLink: https://documentation.spryker.com/v2/docs/event-listen
redirect_from:
  - /v2/docs/event-listen
  - /v2/docs/en/event-listen
---

There are two ways to listen to events: using direct listeners or subscribers. The difference between these two is that a subscriber allows the module providing the subscriber to wire up the handlers in the module that owns it without touching the `EventDependencyProvider` exception’s initial subscriber initialization. It is best to use a subscriber from the beginning, as this simplifies future listener registration. When you need to listen to specific listener, use `\Pyz\Zed\Event\EventDependencyProvider::getEventListenerCollection`.

## Listening to Events with Direct Listeners

To listen to events in the system, you need to add listener plugins. Listener is a class which extends plugins and implements `EventListenerInterface`. This plugin must be placed in the module we want to listen to: `Communication\Plugin\Product\ProductRelationAbstractProductChangeListener`.

For example: Each listener plugin must implement `\Spryker\Service\Event\Dependency\Plugin\EventListenerInterface`.
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

For example:
`$eventCollection->addListener(ProductEvents::PRODUCT_ABSTRACT_BEFORE_CREATE, new ProductRelationAbstractProductChangeListener())`

## Listening to Events with a Subscriber
Event subscribers are another way to listen for events in the system. The advantage of using event sunscrivers is that all the listeners reside in the module we want to react to the event. Register a subscriber once in `EventDependencyProvider` and later a Listener can be added without touching other modules.
To implement a subscriber:

1. Create event Subscriber class, for example:
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

---
title: Add events
description: Add custom events in Spryker to enhance backend functionality. Follow this guide to integrate and manage events efficiently in your development workflow.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/event-adding
originalArticleId: 9136cc31-4264-4a7e-b7d8-2f1c966afa51
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/event/add-events.html
  - /docs/scos/dev/back-end-development/data-manipulation/event/adding-events.html
related:
  - title: Event
    link: docs/scos/dev/back-end-development/data-manipulation/event/event.html
  - title: Configure event queues
    link: docs/scos/dev/back-end-development/data-manipulation/event/configure-event-queues.html
  - title: Listening to events
    link: docs/scos/dev/back-end-development/data-manipulation/event/listening-to-events.html
---

When adding an event, make sure you first decide what kind of events you want to trigger in your code. You define events in a class by declaring their literal string values, such as `ModuleName.subject.action`. An event's value uniquely identifies an event. All listeners attached to an event are executed when a module triggers an event.

For example, to perform an action before persisting a product abstract entity, do the following:

1. Create a class to hold all the module events: `Spryker\Shared\Product\ProductConfig.php`
2. Add the following constant `ProductConfig::PRODUCT_ABSTRACT_BEFORE_CREATE` with the value `Product.product_abstract.before.create`. The first part in this example value is the module name, then the subject, and lastly the action. You can define any unique name, just keep it literal for the sake of code clarity.
3. Trigger the event before the entity is persisted using the event facade `\Spryker\Zed\Event\EventFacadeInterface::trigger` method which accepts two arguments: `eventName`, which is the name of the event we created before `ProductConfig::PRODUCT_ABSTRACT_BEFORE_CREATE` and `TransferInterface`, which is the transfer object you want to pass to the event listener.

{% info_block infoBox %}

When multiple modules use the same events, we recommend redefining the constants in the secondary modules and binding them to the primary module's constants with the `@uses` PHP tag.

```php

class ProductStorageConfig extends AbstractBundleConfig
{
    /**
     * @uses ProductConfig::PRODUCT_ABSTRACT_BEFORE_CREATE // primary constant
     *
     * @var string
     */
    public const PRODUCT_ABSTRACT_BEFORE_CREATE = 'Product.product_abstract.before.create'; // secondary constant
}
```

{% endinfo_block %}

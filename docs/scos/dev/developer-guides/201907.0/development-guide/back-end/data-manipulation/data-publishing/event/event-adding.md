---
title: Adding Events
originalLink: https://documentation.spryker.com/v3/docs/event-adding
redirect_from:
  - /v3/docs/event-adding
  - /v3/docs/en/event-adding
---

When adding an event, make sure you first decide what kind of events you want to trigger in your code. Events are stored in a class for later use, by adding its literal string value (ModuleName.subject.action). This value uniquely identifies an event in the event module, and all listeners attached to it will be triggered when a corresponding module invokes an event.

For example, when you want to perform an action on a product before creating it, first create a class to hold all the module events for example: `Spryker\Zed\Product\Dependency\ProductEvents`, then add the following constant `ProductEvents::PRODUCT_ABSTRACT_BEFORE_CREATE` with a value of `Product.product_abstract.before.create`(the convention is first part module name, then subject and lastly the action you are free to define the naming just keep it literal for code clarity). Next, trigger the event using the event facade `\Spryker\Zed\Event\EventFacadeInterface::trigger` method which accepts two arguments, `eventName` is the name of event we created before `ProductEvents::PRODUCT_ABSTRACT_BEFORE_CREATE` and `TransferInterfaceis` the transfer object you want to pass to the event listener. Invoke this method in the place where the extension point is needed. In this case before entity is persisted.

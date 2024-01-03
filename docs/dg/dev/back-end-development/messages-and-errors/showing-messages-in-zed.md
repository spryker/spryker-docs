  - /docs/scos/dev/back-end-development/messages-and-errors/showing-messages-in-zed.html
---
title: Showing messages in Zed
description: This document describes how to show a message in the Zed GUI.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/flash-messenger
originalArticleId: b70d9c91-abd3-41bb-b2b8-533009604e02
redirect_from:
  - /2021080/docs/flash-messenger
  - /2021080/docs/en/flash-messenger
  - /docs/flash-messenger
  - /docs/en/flash-messenger
  - /v6/docs/flash-messenger
  - /v6/docs/en/flash-messenger
  - /v5/docs/flash-messenger
  - /v5/docs/en/flash-messenger
  - /v4/docs/flash-messenger
  - /v4/docs/en/flash-messenger
  - /v3/docs/flash-messenger
  - /v3/docs/en/flash-messenger
  - /v2/docs/flash-messenger
  - /v2/docs/en/flash-messenger
  - /v1/docs/flash-messenger
  - /v1/docs/en/flash-messenger
related:
  - title: Handling errors with ErrorHandler
    link: docs/scos/dev/back-end-development/messages-and-errors/handling-errors-with-errorhandler.html
  - title: Handling Internal Server messages
    link: docs/scos/dev/back-end-development/messages-and-errors/handling-internal-server-messages.html
---

This document describes how to show a message in the Zed GUI.

In the controller, you can use these shortcut methods to show a user message in the GUI. The messages are translated later when they are rendered.

```php
<?php
class IndexController extends AbstractController
{
    public function indexAction()
    {
        $this->addSuccessMessage($message);
 
        $this->addInfoMessage($message);
 
        $this->addErrorMessage($message);
    }
}
```

## Show message from Zed's Business layer
To show a message from a model, follow these steps:
1. Declare this dependency in the module's dependency provider:

```php
class MyBundleDependencyProvider extends AbstractBundleDependencyProvider
{
    /**
     * @var string
     */
    public const FACADE_MESSENGER = 'messages';
    
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        $container->set(static::FACADE_MESSENGER, function (Container $container) {
            return $container->getLocator()->messenger()->facade();
        });

        return $container;
    }
}
```

2. You can access it from the business factory and inject it into your model:

```php
<?php
class MyBundleBusinessFactory extends AbstractBusinessFactory
{
    public function createAnyModel()
    {
        return new AnyModel(
            $this->getFlashMessengerFacade()
        );
    }
 
    protected function getFlashMessengerFacade()
    {
        return $this->getProvidedDependency(MyBundleDependencyProvider::FACADE_MESSENGER);
    }
}
```

3. Use it in your model:

```php
<?php
class AnyModel
{
    protected $flashMessengerFacade;
 
 
    public function __construct(FlashMessengerFacade $flashMessengerFacade)
    {
        $this->flashMessengerFacade = $flashMessengerFacade;
    }
 
    public function doSomething()
    {
        $this->flashMessengerFacade->addInfoMessage('Hello world!');
    }
}
```

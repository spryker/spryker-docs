---
title: Show messages in the Back Office
description: Learn how to implement tailored notifications for improved user experience and efficient system communication in the Back Office.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/flash-messenger
originalArticleId: b70d9c91-abd3-41bb-b2b8-533009604e02
redirect_from:
  - /docs/scos/dev/back-end-development/messages-and-errors/showing-messages-in-zed.html
related:
  - title: Handling errors with ErrorHandler
    link: docs/dg/dev/backend-development/messages-and-errors/handling-errors-with-errorhandler.html
  - title: Handling Internal Server messages
    link: docs/dg/dev/backend-development/messages-and-errors/handling-internal-server-messages.html
---

This document describes how to show a message in the Back Office.

In the controller, you can use these shortcut methods to show a user message in the Back Office. The messages are translated later when they are rendered.

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

## Show message from the Business layer

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

2. Access it from the business factory and inject it into your model:

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

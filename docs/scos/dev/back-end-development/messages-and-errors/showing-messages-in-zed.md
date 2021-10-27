---
title: Showing Messages in Zed
description: This article describes how to show a message in the Zed GUI.
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
---

This article describes how to show a message in the Zed GUI.

In the controller you can use these shortcut methods to show a user message in the GUI. The messages will be translated later when they are rendered.


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

## Show Message from Zed’s Business Layer
To show a message from a model, declare this dependency in the module’s dependency provider:

Now, you can access it from the business factory and inject it to your model:

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
        return $this->getProvidedDependency(GlossaryDependencyProvider::FACADE_FLASH_MESSENGER);
    }
}
```

And finally, use it in your model:

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

---
title: Using a Facade
description: This article describes the cases when the facade is used.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/using-facade
originalArticleId: 1a113ccd-7bdf-467b-84e0-d47b9a03d0cd
redirect_from:
  - /2021080/docs/using-facade
  - /2021080/docs/en/using-facade
  - /docs/using-facade
  - /docs/en/using-facade
  - /v6/docs/using-facade
  - /v6/docs/en/using-facade
  - /v5/docs/using-facade
  - /v5/docs/en/using-facade
  - /v4/docs/using-facade
  - /v4/docs/en/using-facade
  - /v3/docs/using-facade
  - /v3/docs/en/using-facade
  - /v2/docs/using-facade
  - /v2/docs/en/using-facade
  - /v1/docs/zed-facade-how-to-use
  - /v1/docs/en/zed-facade-how-to-use
---

## Using the Facade from a Controller or a Plugin

In Zed’s communication layer the facade of the same module is available with the `getFacade()` method from all controllers and plugins.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Zed/Business+Layer/How+to+Use+a+Facade/how-to-use-a-facade-from-the-same-bundle.png) 

A typical usage from a controller looks like this. The controller retrieves data from a submitted form and calls a method of a facade to save it.

```php
<?php
namespace Pyz\Zed\Glossary\Communication\Controller;

class FormController extends AbstractController
{
    public function translationAction()
    {
        // ...
        if ($form->isValid()) {
            $translation = new TranslationTransfer();
            $translation->fromArray($form->getRequestData());
            $this->getFacade()->saveTranslation($translation);
        }
        // ...
    } 
```

## Using a Facade from Another Module

To connect modules you can provide the facade to another module. To do so, you need to use the dependency provider mechanism.

---
title: Facade use cases
description: This document describes facade use cases.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/using-facade
originalArticleId: 1a113ccd-7bdf-467b-84e0-d47b9a03d0cd
redirect_from:
  - /docs/scos/dev/back-end-development/zed/business-layer/facade/facade-use-cases.html
  - /docs/scos/dev/back-end-development/zed/business-layer/facade/using-a-facade.html
related:
  - title: Facade
    link: docs/dg/dev/backend-development/zed/business-layer/facade/facade.html
  - title: A facade implementation
    link: docs/scos/dev/back-end-development/zed/business-layer/facade/a-facade-implementation.html
  - title: Design by Contract (DBC) - Facade
    link: docs/scos/dev/back-end-development/zed/business-layer/facade/design-by-contract-dbc-facade.html
---

This document describes the use cases of a facade.

## The facade usage from a controller or plugin

In Zed's `Communication` layer, the facade of the same module is available with the `getFacade()` method from all controllers and plugins.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Zed/Business+Layer/How+to+Use+a+Facade/how-to-use-a-facade-from-the-same-bundle.png)

Typical usage from a controller is as follows. The controller retrieves data from a submitted form and calls a method of a facade to save it:

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

## The facade usage from another module

To connect modules you can provide the facade to another module. To do so, you need to use the dependency provider mechanism.

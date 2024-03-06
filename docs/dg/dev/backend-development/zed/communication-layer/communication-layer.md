---
title: About Communication layer
description: Zed's communication layer is the entry point to the system. Here are executed all of the external requests from users, the Yves-application and all command-line calls. The purpose of this layer is to retrieve the data, delegate to the business layer and to handover it to the presentation layer.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/zed-controllers-actions
originalArticleId: 32268e14-8a03-4576-a7fc-5290bb073767
redirect_from:
  - /docs/scos/dev/back-end-development/zed/communication-layer/communication-layer.html
related:
  - title: Addi indexes to foreign key columns - index generator
    link: docs/scos/dev/back-end-development/zed/communication-layer/adding-indexes-to-foreign-key-columns-index-generator.html
  - title: About the Business layer
    link: docs/scos/dev/back-end-development/zed/business-layer/business-layer.html
  - title: About the Persistence layer
    link: docs/scos/dev/back-end-development/zed/persistence-layer/persistence-layer.html
---

Zed's `Communication` layer is the entry point to the system. Here are executed all of the external requests from users, the Yves application, and all command-line calls. The purpose of this layer is to retrieve the data, delegate it to the `Business` layer, and hand it over to the `Presentation` layer.

The methods inside a controller are called actions. Usually, an action reads the incoming request data, maybe validates it with a form, delegates it to a facade from the `Business` layer, and writes the response.

The following controller provides two actions: `indexAction()` and `testAction()`.

```php
<?php

namespace Namespace\Zed\Bundle\Communication\Controller;

use Spryker\Zed\Kernel\Communication\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class IndexController extends AbstractController
{
    public function indexAction()
    {
        return $this->viewResponse([]);
    }

    public function testAction(Request $request)
    {
       return $this->viewResponse([]);
    }
}
```

## Input parameters

You can define an input parameter `$request` that is automatically injected. This is a `Symfony\Component\HttpFoundation\Request`, so you can find methods to fetch the `GET` and `POST` parameters and the session.

```php
<?php
public function testAction(Request $request)
{
    $request->getSession(); // retrieve current session
    $request->query->get('a'); // retrieve get-parameter index?a=
    // ...
}
```

## Response methods

There are several ways to send responses in different use cases. These methods are called at the end of the action and their return value is returned by the action—for example, `return $this->redirectResponse('/my-module')`.

| RESPONSE METHOD | PURPOSE |
| --- | --- |
|  `viewResponse(array $data = [])` | Loads the related twig template and provides the data for the template. |
| `jsonResponse($data = null, $status = 200, $headers = [])` | Sends a json response which is needed for AJAX calls. |
| `redirectResponse($url, $status = 302, $headers = [])` | Performs a redirect to the given relative path or absolute url. |
| `streamedResponse($callback = null, $status = 200, $headers = [])` | Sends binary data. This is used to draw the state machines. |

**Example**

```php
<?php

public function testAction(Request $request)
{
    // ...
    return $this->viewResponse(['customer' => ['name' => 'John doe']]);
}
```

Now, the data can be accessed in the twig template like this: `{% raw %}{{{% endraw %}customer.name{% raw %}}}{% endraw %} `.

***

## Controllers and paths in Zed

Every `module-controller-action` triple is related to the URL of the application. Usually, a URL has three segments, which are related to the module, controller, and action.

Examples of paths:

| MODULE | CONTROLLER | ACTION | URL(S) |
| --- | --- | --- | --- |
| MyModule | IndexController | indexAction() | my-module/ |
| MyModule | IndexController | testAction() | my-module/index/test |
| MyModule | AnyOtherController | indexAction() | my-module/any-other |
| MyModule | AnyOtherController | testAction() | my-module/any-other/test |
| Cart | GatewayController | addItemAction() | cart/gateway/add-item |

As you can see there are some path-resolver rules:

* The term `index` is automatically used when the path is not fully specified.
* The camel case class and method names are presented with a dash (`-`) separator.
* Suffixes like `Controller` and `Action` are removed.

## Mapping twig templates

Each action returning `$this->viewResponse()` must have a dedicated Twig template:

* Controller and action:
`MyNamespace/Zed/MyModule/Communication/Controller/TestController::doSomethingAction()`
* Expected path of template:
`MyNamespace/Zed/MyModule/Presentation/Test/do-something.twig`

## Related Spryks

You might use the following definitions to generate related code:

* `vendor/bin/console spryk:run AddZedCommunicationController`: Add Zed communication controller.
* `vendor/bin/console spryk:run AddZedCommunicationControllerAction`: Add Zed communication controller method.

For details, see the [Spryks](/docs/dg/dev/sdks/sdk/spryks/spryks.html).

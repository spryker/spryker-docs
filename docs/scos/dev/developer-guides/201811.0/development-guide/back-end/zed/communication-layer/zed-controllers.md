---
title: Controllers and Actions
originalLink: https://documentation.spryker.com/v1/docs/zed-controllers-actions
redirect_from:
  - /v1/docs/zed-controllers-actions
  - /v1/docs/en/zed-controllers-actions
---

Zed's communication layer is the entry point to the system. Here are executed all of the external requests from users, the Yves-application and all command-line calls. The purpose of this layer is to retrieve the data, delegate to the business layer and to hand over it to the presentation layer.

The methods inside of a controller are called actions. Usually an action reads the incoming request-data, maybe validates it with a form, delegates it to a facade from the business layer, and writes the response.

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

## Input Parameters

You can define an input parameter `$request` that is automatically injected. This is a [Symfony\Component\HttpFoundation\Request](http://api.symfony.com/2.3/Symfony/Component/HttpFoundation/Request.html), so you can find methods to fetch the get and post parameters and the session.

```php
<?php
public function testAction(Request $request)
{
    $request->getSession(); // retrieve current session
    $request->query->get('a'); // retrieve get-parameter index?a=
    // ...
}
```

## Response Methods

There are several ways to send responses in different use cases. These methods are called at the end of the action and their return value is returned by the action: for example, `return $this->redirectResponse('/my-module')`.

| Response Method | Purpose |
| --- | --- |
|  `viewResponse(array $data = [])` | Loads the related twig template and provides the data for the template. |
| `jsonResponse($data = null, $status = 200, $headers = [])` | Sends a json response which is needed for ajax calls. |
| `redirectResponse($url, $status = 302, $headers = [])` | Performs a redirect to the given relative path or absolute url. |
| `streamedResponse($callback = null, $status = 200, $headers = [])` | Sends binary data. This is used to draw the state machines. |

**Example**:
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

## Controllers and Paths in Zed

Every `module-controller-action` triple is related to a URL of the application. Usually a URL has three segments which are related to module, controller and action.

Examples of paths:

| Module | Controller | Action | Url(s) |
| --- | --- | --- | --- |
| `MyModule` | `IndexController` | `indexAction()` | `my-module/` |
| `MyModule` | `IndexController` | `testAction()` | `my-module/index/test` |
| `MyModule` | `AnyOtherController` | `indexAction()` | `my-module/any-other` |
| `MyModule` | `AnyOtherController` | `testAction()` | `my-module/any-other/test` |
| `Cart` | `GatewayController` | `addItemAction()` | `cart/gateway/add-item` |

As you can see there are some path-resolver rules:

* The term `index` is automatically used, when the path is not fully specified.
* CamelCase class and method names are presented with a dash-separator.
* Suffixes like `Controller` and `Action` are removed.

***

## Mapping Twig Templates

Each action returning `$this->viewResponse()` must have a dedicated Twig template:

* Controller and action:
`MyNamespace/Zed/MyModule/Communication/Controller/TestController::doSomethingAction()`
* Expected path of template:
`MyNamespace/Zed/MyModule/Presentation/Test/do-something.twig`

## Related Spryks

You might use the following definitions to generate related code:

* `vendor/bin/console spryk:run AddZedCommunicationController` - Add Zed Communication Controller
* `vendor/bin/console spryk:run AddZedCommunicationControllerAction` - Add Zed Communication Controller Method

See the [Spryk](https://documentation.spryker.com/v1/docs/spryk-201903) documentation for details.

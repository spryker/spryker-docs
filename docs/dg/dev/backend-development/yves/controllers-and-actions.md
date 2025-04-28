---
title: Controllers and actions
description: Controllers are placed inside the Controllers folder in Yves; they provide an entry point to the system for requests submitted by the frontend users.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/yves-controllers-actions
originalArticleId: 807eb310-336a-46d8-8cfc-bcafe4d3a324
redirect_from:
  - /docs/scos/dev/back-end-development/yves/controllers-and-actions.html
related:
  - title: Yves overview
    link: docs/dg/dev/backend-development/yves/yves.html
  - title: Add translations for Yves
    link: docs/dg/dev/backend-development/yves/adding-translations-for-yves.html
  - title: CLI entry point for Yves
    link: docs/dg/dev/backend-development/yves/cli-entry-point-for-yves.html
  - title: Implement URL routing in Yves
    link: docs/dg/dev/backend-development/yves/implement-url-routing-in-yves.html
  - title: Modular Frontend
    link: docs/dg/dev/backend-development/yves/modular-frontend.html
  - title: Yves bootstrapping
    link: docs/dg/dev/backend-development/yves/yves-bootstrapping.html
  - title: Yves routes
    link: docs/dg/dev/backend-development/yves/yves-routes.html
---

_Controllers_ are placed inside the `Controllers` folder in Yves; they provide an entry point to the system for requests submitted by the D users.

Methods inside a controller are called _actions_. Usually, an action reads the incoming request data, maybe validates it with a form, delegates it to a client, and writes the response.

The following controller provides two actions: `indexAction()` and `testAction()`.

```php
<?php
namespace Namespace\Yves\Bundle\Controller;

use Spryker\Yves\Kernel\Controller\AbstractController;


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

You can define an input parameter `$request` that is automatically injected. This is a [Symfony\Component\HttpFoundation\Request](https://symfony.com/doc/2.3/components/http_foundation/introduction.html#request), so you can find methods to fetch the get and post parameters and the session.

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

There are several ways to send responses in different use cases. These methods are called at the end of the action, and their return value is returned by the action—for example, return `$this->redirectResponse('/my-module')`.

| RESPONSE METHOD | PURPOSE  |
| ----------------- | -------------------- |
| viewResponse(array $data = [])                               | Loads the related twig template and provides the data for the template. |
| jsonResponse($data = null, $status = 200, $headers = [])     | Sends a json response which is needed for AJAX calls.        |
| redirectResponse($url, $status = 302, $headers = [])         | Performs a redirect to the given relative path or absolute url. |
| streamedResponse($callback = null, $status = 200, $headers = []) | Ends binary data. This is used to draw the state machines.    |

**Example of usage in an action:**

```php
<?php
public function testAction(Request $request)
{
    // ...
    return $this->viewResponse(['customer' => ['name' => 'John doe']]);
}
```

Now the data can be accessed in the twig template like this: `{% raw %}{{{% endraw %}customer.name{% raw %}}}{% endraw %}`.

## Controllers and paths in Yves

URL routing in Yves is not the same as URL routing in Zed. You can route a custom URL to a module-controller-action triple.

To learn more about URL routing in Yves, see [Implement URL routing in Yves](/docs/dg/dev/backend-development/yves/implement-url-routing-in-yves.html).

## Twig template in Yves

Each action which returns `$this->viewResponse()` must have a dedicated Twig template:

* Controller and action:

```twig
MyNamespace/Yves/MyBundle/Controller/TestController::doSomethingAction()
```

* The expected path of a template:

```twig
MyNamespace/Yves/MyBundle/Theme/{ThemeName}/Test/do-something.twig
```

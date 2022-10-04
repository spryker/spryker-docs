---
title: How to use Glue API authorization scopes
description: This guide describes how to add scopes to the resource and custom route for the Storefront API and Backend API applications
last_updated: September 30, 2022
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/authorization-scopes.html
---

This guide describes how to add scopes to the resource and custom route for the Storefront API and Backend API applications.

Let's say you have a module named `FooApi` with `GET` and `POST` methods, where you want to add scopes. To add scopes, follow these steps:

1. Set up a resource for the Storefront API application and a route for the Backend API application.

2. To implement `ScopeDefinitionPluginInterface` and set up the scopes, adjust `FooResource`:

**Pyz\Glue\FooApi\Plugin\FooResource.php**

```php
<?php

namespace Pyz\Glue\FooApi\Plugin;

use Spryker\Glue\GlueApplication\Plugin\GlueApplication\AbstractResourcePlugin;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface;
use Spryker\Glue\OauthExtension\Dependency\Plugin\ScopeDefinitionPluginInterface;

class FooResource extends AbstractResourcePlugin implements ResourceInterface, ScopeDefinitionPluginInterface
{
    public function getScopes(): array
    {
        return [
            'get' => 'storefront:foo:read',
            'post' => 'storefront:foo:write',
        ];
    }
}
```

3. To implement `ScopeRouteProviderPluginInterface` and set up the scopes, adjust `FooBarRouteProviderPlugin`:

**Pyz\Glue\FooApi\Plugin\FooBarRouteProviderPlugin.php**
   
```php
<?php

namespace Pyz\Glue\FooApi\Plugin;

use Pyz\Glue\FooApi\Controller\FooBarController;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RouteProviderPluginInterface;
use Spryker\Glue\Kernel\Backend\AbstractPlugin;
use Spryker\Glue\OauthExtension\Dependency\Plugin\ScopeRouteProviderPluginInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

class FooBarRouteProviderPlugin extends AbstractPlugin implements RouteProviderPluginInterface, ScopeRouteProviderPluginInterface
{
    public function addRoutes(RouteCollection $routeCollection): RouteCollection
    {
        $getRoute = (new Route('/foo/bar'))
            ->setDefaults([
                '_controller' => [FooBarController::class, 'getCollectionAction'],
                '_resourceName' => 'fooBar',
                '_method'=> 'get'
            ])
            ->setMethods(Request::METHOD_GET);

        $getRoute->addDefaults(['scope' => 'backend:foobar:read']);

        $routeCollection->add('fooBarGetCollection', $getRoute);
        
        return $routeCollection;
    }
}
```

4. Regenerate the scopes cache file:

```
console oauth:scope-collection-file:generate
```

{% info_block warningBox "Verification" %}

Ensure that when accessing `https://glue-storefront.mysprykershop.com/foo` or `https://glue-backend.mysprykershop.com/foo/bar` without an access token, you receive the 403 response with the message `Unauthorized request`.

{% endinfo_block %}

5. Ensure that you can authenticate as a customer:
   1. Send the request:

    ```
    POST /token/ HTTP/1.1
    Host: glue-storefront.mysprykershop.com
    Content-Type: application/x-www-form-urlencoded
    Accept: application/json
    Content-Length: 131

    grantType=password&username={customer_username}&password={customer_password}&scope=storefront%3foo%3read%20storefront%3foobar%3read
    ```

   2. Check that the output contains the 201 response with a valid token.
   3. Enter a valid access token to access `https://glue-storefront.mysprykershop.com/foo`.

6. Ensure that you can authenticate as a user:
   1. Send the request:

    ```
    POST /token/ HTTP/1.1
    Host: glue-backend.mysprykershop.com
    Content-Type: application/x-www-form-urlencoded
    Accept: application/json
    Content-Length: 117

    grantType=password&username={user_username}&password={user_password}&scope=backend%3foo%3read%20backend%3foobar%3read
    ```

   2. Check that the output contains the 201 response with a valid token.
   3. Enter a valid access token to access `https://glue-backend.mysprykershop.com/foo/bar`.

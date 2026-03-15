---
title: Use Glue API authorization scopes
description: This guide describes how to add scopes to the resource and custom route for the storefront API and backend API applications
last_updated: September 30, 2022
template: howto-guide-template
redirect_from:
- /docs/scos/dev/glue-api-guides/202212.0/decoupled-glue-infrastructure/how-to-guides/how-to-use-glue-api-authorization-scopes.html
- /docs/scos/dev/glue-api-guides/202204.0/use-glue-api-authorization-scopes.html
- /docs/scos/dev/glue-api-guides/202404.0/use-glue-api-authorization-scopes.html

---

This guide describes how to add scopes to the resource and custom route for the storefront API and backend API applications.

Let's say you have a module named `ModuleRestApi` with `GET` and `POST` methods, where you want to add scopes. To add scopes, follow these steps:

1. Set up a resource for the storefront API application and a route for the backend API application.

2. To implement `ScopeDefinitionPluginInterface` and set up the scopes, adjust `ModuleResource`:

**Pyz\Glue\ModuleRestApi\Plugin\ModuleResource.php**

```php
<?php

namespace Pyz\Glue\ModuleRestApi\Plugin;

use Spryker\Glue\GlueApplication\Plugin\GlueApplication\AbstractResourcePlugin;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface;
use Spryker\Glue\OauthExtension\Dependency\Plugin\ScopeDefinitionPluginInterface;

class ModuleResource extends AbstractResourcePlugin implements ResourceInterface, ScopeDefinitionPluginInterface
{
    public function getScopes(): array
    {
        return [
            'get' => 'storefront:module:read',
            'post' => 'storefront:module:write',
        ];
    }
}
```

3. To implement `ScopeRouteProviderPluginInterface` and set up the scopes, adjust `ModuleBarRouteProviderPlugin`:

**Pyz\Glue\ModuleRestApi\Plugin\ModuleBarRouteProviderPlugin.php**

```php
<?php

namespace Pyz\Glue\ModuleRestApi\Plugin;

use Pyz\Glue\ModuleRestApi\Controller\ModuleBarController;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RouteProviderPluginInterface;
use Spryker\Glue\Kernel\Backend\AbstractPlugin;
use Spryker\Glue\OauthExtension\Dependency\Plugin\ScopeRouteProviderPluginInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

class ModuleBarRouteProviderPlugin extends AbstractPlugin implements RouteProviderPluginInterface, ScopeRouteProviderPluginInterface
{
    public function addRoutes(RouteCollection $routeCollection): RouteCollection
    {
        $getRoute = (new Route('/module/bar'))
            ->setDefaults([
                '_controller' => [ModuleBarController::class, 'getCollectionAction'],
                '_resourceName' => 'moduleBar',
                '_method'=> 'get'
            ])
            ->setMethods(Request::METHOD_GET);

        $getRoute->addDefaults(['scope' => 'backend:modulebar:read']);

        $routeCollection->add('moduleBarGetCollection', $getRoute);

        return $routeCollection;
    }
}
```

4. Regenerate the scopes cache file:

```bash
vendor/bin/console oauth:scope-collection-file:generate
```

{% info_block warningBox "Verification" %}

* Ensure that when accessing `https://glue-storefront.mysprykershop.com/module` or `https://glue-backend.mysprykershop.com/module/bar` without an access token, you receive the `403` response with the message `Unauthorized request`.

* Ensure that you can authenticate as a customer:
   1. Send the request:

    ```yaml
    POST /token/ HTTP/1.1
    Host: glue-storefront.mysprykershop.com
    Content-Type: application/x-www-form-urlencoded
    Accept: application/json
    Content-Length: 131

    grant_type=password&username={customer_username}&password={customer_password}&scope=storefront%3module%3read%20storefront%3modulebar%3read
    ```

   2. Check that the output contains the 201 response with a valid token.
   3. Enter a valid access token to access `https://glue-storefront.mysprykershop.com/module`.

* Ensure that you can authenticate as a user:
   1. Send the request:

    ```yaml
    POST /token/ HTTP/1.1
    Host: glue-backend.mysprykershop.com
    Content-Type: application/x-www-form-urlencoded
    Accept: application/json
    Content-Length: 117

    grant_type=password&username={user_username}&password={user_password}&scope=backend%3module%3read%20backend%3modulebar%3read
    ```

   2. Check that the output contains the 201 response with a valid token.
   3. Enter a valid access token to access `https://glue-backend.mysprykershop.com/module/bar`.

{% endinfo_block %}

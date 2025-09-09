This guide describes how to add scopes to the resource and custom route for the Backend API application.

Let's say you have a module named `ModuleBackendApi` with `GET` and `POST` methods, where you want to add scopes. To add scopes, follow these steps:

1. Set up a route for the Backend API application.

2. To implement `ScopeDefinitionPluginInterface` and set up the scopes, adjust `ModuleResource`:

**Pyz\Glue\ModuleBackendApi\Plugin\ModuleResource.php**

```php
<?php

namespace Pyz\Glue\ModuleBackendApi\Plugin;

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

**Pyz\Glue\ModuleBackendApi\Plugin\ModuleBarRouteProviderPlugin.php**

```php
<?php

namespace Pyz\Glue\ModuleBackendApi\Plugin;

use Pyz\Glue\ModuleBackendApi\Controller\ModuleBarController;
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

* Ensure that when accessing `https://glue-backend.mysprykershop.com/module/bar` without an access token, you receive the `403` response with the message `Unauthorized request`.

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
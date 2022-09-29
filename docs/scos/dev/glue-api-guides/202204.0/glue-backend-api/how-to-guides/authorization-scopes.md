This guide describes how to add scopes to the resource and custom route for the Storefront API and Backend API applications.

* * *

Let’s say we have a module named `FooApi` with GET and POST methods where we want to add scopes.

1.  Set up a resource for the Storefront API application and set up a route for the Backend API application.
    
2.  Adjust `FooResource` in order to implement `ScopeDefinitionPluginInterface` and set up the scopes.

`Pyz\Glue\FooApi\Plugin\FooResource.php`
```
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

3. Adjust `FooBarRouteProviderPlugin` in order to implement `ScopeRouteProviderPluginInterface` and set up the scopes.
   `Pyz\Glue\FooApi\Plugin\FooBarRouteProviderPlugin.php`
   
```<?php

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
4. Run the console command to re-generate the scopes cache file:

```
console oauth:scope-collection-file:generate
```


1.  Make sure that accessing `http://glue-storefront.mysprykershop.com/foo` or `http://glue-backend.mysprykershop.com/foo/bar` without access token you receive the the 403 response with message `Unauthorized request.`.
    

Ensure that you are able to authenticate as a customer:

1.  Send the request:
    
    ```
    POST /token/ HTTP/1.1
    Host: glue-storefront.mysprykershop.com
    Content-Type: application/x-www-form-urlencoded
    Accept: application/json
    Content-Length: 131
    
    grantType=password&username={customer_username}&password={customer_password}&scope=storefront%3foo%3read%20storefront%3foobar%3read
    ```
    
2.  Check that the output contains the 201 response with a valid token.
    
3.  Entered valid access token and you should be able to access `http://glue-storefront.mysprykershop.com/foo`.
    

Ensure that you are able to authenticate as a user:

1.  Send the request:
    
    ```
    POST /token/ HTTP/1.1
    Host: glue-backend.mysprykershop.com
    Content-Type: application/x-www-form-urlencoded
    Accept: application/json
    Content-Length: 117
    
    grantType=password&username={user_username}&password={user_password}&scope=backend%3foo%3read%20backend%3foobar%3read
    ```
    
2.  Check that the output contains the 201 response with a valid token.
    
3.  Entered valid access token and you should be able to access `http://glue-backend.mysprykershop.com/foo/bar`.

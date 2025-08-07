This guide describes how to create an API endpoint using a custom route.

Glue lets you create plain routes directly to a controller. This might be useful in a variety of cases—for example, building a non-resource-based API or endpoints that do not need or cannot be adapted to use resources.

Custom routes are based on a Symfony routing component; for more information on it, check out Symfony's [documentation](https://symfony.com/doc/current/routing.html).

Let's say you have a Storefront module named `ModuleRestApi`, where you want to have a new backend API endpoint `/module/bar` with `GET` and `POST` methods. To create the new backend API endpoint, follow these steps:

1. Create a `ModuleBarController` with the action:

**\Pyz\Glue\ModuleRestApi\Controller\ModuleBarController**

```php
<?php

namespace Pyz\Glue\ModuleRestApi\Controller;

use Generated\Shared\Transfer\GlueRequestTransfer;
use Generated\Shared\Transfer\GlueResponseTransfer;
use Spryker\Glue\Kernel\Backend\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class ModuleBarController extends AbstractController
{
    /**
     * @param \Generated\Shared\Transfer\GlueRequestTransfer $glueRequestTransfer
     *
     * @return \Generated\Shared\Transfer\GlueResponseTransfer
     */
    public function getCollectionAction(GlueRequestTransfer $glueRequestTransfer): GlueResponseTransfer
    {
        // return $this->getFactory()->createModuleBarReader()->readModuleBar();
        return (new GlueResponseTransfer())
            ->setHttpStatus(Response::HTTP_OK);
    }
}

```

Even though an empty response is returned, the module's `Factory` is available and can be used to access Processor models or external dependencies the same way it's done everywhere in Spryker.

{% info_block infoBox %}

Pay attention to `AbstractController` you use, Storefront and Backend variation exists in the `Glue` layer.

{% endinfo_block %}

2. Create `ModuleBarRouteProviderPlugin`

**\Pyz\Glue\ModuleRestApi\Plugin\ModuleBarRouteProviderPlugin**

```php
<?php

namespace Pyz\Glue\ModuleRestApi\Plugin;

use Pyz\Glue\ModuleRestApi\Controller\ModuleBarController;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RouteProviderPluginInterface;
use Spryker\Glue\Kernel\Backend\AbstractPlugin;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

class ModuleBarRouteProviderPlugin extends AbstractPlugin implements RouteProviderPluginInterface
{
    public function addRoutes(RouteCollection $routeCollection): RouteCollection
    {
        $getRoute = (new Route('/module/bar'))
            ->setDefaults([
                '_controller' => [ModuleBarController::class, 'getCollectionAction'],
                '_resourceName' => 'moduleBar',
            ])
            ->setMethods(Request::METHOD_GET);

        $routeCollection->add('moduleBarGetCollection', $getRoute);

        return $routeCollection;
    }
}
```

{% info_block infoBox %}

Ensure you use `AbstractPlugin` specific to the storefront or backend needs.

{% endinfo_block %}

3. Inject `ModuleBarRouteProviderPlugin` into `GlueBackendApiApplicationDependencyProvider`:

**\Pyz\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider**

```php
...
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProviderPlugins(): array
    {
        return [
            ...
            new ModuleBarRouteProviderPlugin(),
        ];
    }
...
```

4. Regenerate the Symfony router cache:

```bash
vendor/bin/glue api:router:cache:warm-up
```

At this point, you can test the GET endpoint at `GET https://glue-backend.mysprykershop.com/module/bar`.

The following is an example of a successfully tested cURL command:

```bash
curl --location --request GET 'https://glue-backend.mysprykershop.com/module/bar' \
--header 'Accept: application/json'
```

{% info_block infoBox %}

In Development mode, you do not need to refresh a cache.

{% endinfo_block %}

5. Add a `POST` method to the same route:

   1. Add a method to a controller: `\Pyz\Glue\ModuleRestApi\Controller\ModuleBarController`

   ```php
   ...
       /**
        * @param \Generated\Shared\Transfer\GlueRequestTransfer $glueRequestTransfer
        *
        * @return \Generated\Shared\Transfer\GlueResponseTransfer
        */
       public function postAction(GlueRequestTransfer $glueRequestTransfer): GlueResponseTransfer
       {
           return new GlueResponseTransfer();
       }

   ```

   2. Add a new route to the same route provider plugin: `\Pyz\Glue\ModuleRestApi\Plugin\ModuleBarRouteProviderPlugin`

   ```php
   ...
           $postRoute = (new Route('/module/bar'))
               ->setDefaults([
                   '_controller' => [ModuleBarController::class, 'postAction'],
               ])
               ->setMethods(Request::METHOD_POST);
           $routeCollection->add('moduleBarPost', $postRoute);
   ...
   ```

   3. Reset the router cache again and test your `POST` request:

   ```yaml
   curl --location --request POST 'https://glue-backend.mysprykershop.com/module/bar' \
   --header 'Accept: application/json' \
   --header 'Content-Type: application/json' \
   --data-raw '{
       "id": "module",
       "name": "bar"
   }'
   ```

6. Debug existing routes.

There is a special command to debug all existing routes.

`glue route:debug <applicationType> <options>`

The example below shows how to debug Backend routes.

```shell
$ docker/sdk/cli
╭─/data | Store: DE | Env: docker.dev | Debug: (.) | Testing: (.)
╰─$ glue route:debug Backend -c
Code bucket: DE | Store: DE | Environment: docker.dev
 ------------------- -------- -------- ------ -------- ------------------------------------------------------------------------------- --------------
  Name                Method   Scheme   Host   Path     Controller                                                                      Is Protected  
 ------------------- -------- -------- ------ -------- ------------------------------------------------------------------------------- --------------
  tokenResourcePost   POST     ANY      ANY    /token   Spryker\Glue\OauthBackendApi\Controller\TokenResourceController::postAction()   No            
 ------------------- -------- -------- ------ -------- ------------------------------------------------------------------------------- --------------
```
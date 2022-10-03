---
title: How to create a route
description: 
last_updated: September 30, 2022
template: howto-guide-template
---

New Glue lets you create plain routes directly to a controller. This might be useful in a variety of cases. For example, building a non-resource-based API or endpoints that do not need or cannot be adapted to use resources.

Custom routes are based on Symfony routing.

This guide will show the process of creation of the API endpoint using a custom route.

Let's say we have a Storefront module named `FooApi` where we want to have a new backend API endpoint `/foo/bar` with GET and POST methods.

1\. Create a `FooBarController` with the action:
`\Pyz\Glue\FooApi\Controller\FooBarController`

```
<?php

namespace Pyz\Glue\FooApi\Controller;

use Generated\Shared\Transfer\GlueRequestTransfer;
use Generated\Shared\Transfer\GlueResponseTransfer;
use Spryker\Glue\Kernel\Backend\Controller\AbstractController;

class FooBarController extends AbstractController
{
    /**
     * @param \Generated\Shared\Transfer\GlueRequestTransfer $glueRequestTransfer
     *
     * @return \Generated\Shared\Transfer\GlueResponseTransfer
     */
    public function getCollectionAction(GlueRequestTransfer $glueRequestTransfer): GlueResponseTransfer
    {
        // return $this->getFactory()->createFooBarReader()->readFooBar();
        return new GlueResponseTransfer();
    }
}

```
I will just return an empty response for now, but module's Factory is available and can be used to access Processor models or external dependencies the same way it is done everywhere in Spryker.

Pay attention to the `AbstractController` you use, Storefront and Backend variation exists in Glue layer.

1. Create `FooBarRouteProviderPlugin`:`\Pyz\Glue\FooApi\Plugin\FooBarRouteProviderPlugin`

```
<?php

namespace Pyz\Glue\FooApi\Plugin;

use Pyz\Glue\FooApi\Controller\FooBarController;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RouteProviderPluginInterface;
use Spryker\Glue\Kernel\Backend\AbstractPlugin;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

class FooBarRouteProviderPlugin extends AbstractPlugin implements RouteProviderPluginInterface
{
    public function addRoutes(RouteCollection $routeCollection): RouteCollection
    {
        $getRoute = (new Route('/foo/bar'))
            ->setDefaults([
                '_controller' => [FooBarController::class, 'getCollectionAction'],
                '_resourceName' => 'fooBar',
            ])
            ->setMethods(Request::METHOD_GET);

        $routeCollection->add('fooBarGetCollection', $getRoute);
        
        return $routeCollection;
    }
}
```
Note the `AbstractPlugin` specific to the storefront/backend that needs to be used.

4. Create a controller to serve your request:`Pyz\Glue\FooApi\Controller\FooBarController`

```
<?php

namespace Pyz\Glue\FooApi\Controller;

use Generated\Shared\Transfer\GlueRequestTransfer;
use Generated\Shared\Transfer\GlueResponseTransfer;
use Spryker\Glue\Kernel\Backend\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class FooBarController extends AbstractController
{
    public function getCollectionAction(GlueRequestTransfer $glueRequestTransfer): GlueResponseTransfer
    {
        return (new GlueResponseTransfer())
            ->setHttpStatus(Response::HTTP_OK);
    }
}
```

5. Inject the `FooBarRouteProviderPlugin` into the `GlueBackendApiApplicationDependencyProvider`: `\Pyz\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider`

```
...
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProviderPlugins(): array
    {
        return [
            ...
            new FooBarRouteProviderPlugin(),
        ];
    }
...
```

6. Run the console command to re-generate the Symfony router cache:

```
docker/sdk cli glue api:router:cache:warm-up
```

At this point the GET endpoint should be testable at `GET http://glue-backend.de.spryker.local/foo/bar`.

Here is the cURL command I tested successfully:

```
curl --location --request GET 'http://glue-backend.de.spryker.local/foo/bar' \
--header 'Accept: application/json'
```

* * *

Now let's add a POST method to the same route.

7. Add a method to a controller: `\Pyz\Glue\FooApi\Controller\FooBarController`
```
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

8. Add a new route to the same route provider plugin: `\Pyz\Glue\FooApi\Plugin\FooBarRouteProviderPlugin`

```
...
        $postRoute = (new Route('/foo/bar'))
            ->setDefaults([
                '_controller' => [FooBarController::class, 'postAction'],
            ])
            ->setMethods(Request::METHOD_POST);
        $routeCollection->add('fooBarPost', $postRoute);
...
```
9. Reset the router cache again and test your POST request. Here is mine:

```
curl --location --request POST 'http://glue-backend.de.spryker.local/foo/bar' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": "foo",
    "name": "bar"
}'
```

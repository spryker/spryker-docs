---
title: How to create a route
description: This document describes how to create a route
last_updated: September 30, 2022
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/create-a-route.html
---

This guide shows how you can create an API endpoint using a custom route.

Glue lets you create plain routes directly to a controller. This might be useful in a variety of cases—for example, building a non-resource-based API or endpoints that do not need or cannot be adapted to use resources.

Custom routes are based on Symfony routing.

Let's say you have a Storefront module named `FooApi`, where you want to have a new backend API endpoint `/foo/bar` with GET and POST methods. To create the new backend API endpoint, follow these steps:

1. Create a `FooBarController` with the action:

**\Pyz\Glue\FooApi\Controller\FooBarController**

```php
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

Even though an empty response is returned, the module's Factory is available and can be used to access Processor models or external dependencies the same way it is done everywhere in Spryker.

{% info_block infoBox %}

Pay attention to `AbstractController` you use, Storefront and Backend variation exists in the `Glue` layer.

{% endinfo_block %}

2. Create `FooBarRouteProviderPlugin`

**\Pyz\Glue\FooApi\Plugin\FooBarRouteProviderPlugin**

```php
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

{% info_block infoBox %}

Ensure you use `AbstractPlugin` specific to the storefront or backend needs.

{% endinfo_block %}

3. Create a controller to serve your request:

**Pyz\Glue\FooApi\Controller\FooBarController**

```php
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

4. Inject `FooBarRouteProviderPlugin` into `GlueBackendApiApplicationDependencyProvider`: 

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
            new FooBarRouteProviderPlugin(),
        ];
    }
...
```

5. Regenerate the Symfony router cache:

```bash
docker/sdk cli glue api:router:cache:warm-up
```

At this point, you can test the GET endpoint at `GET https://glue-backend.mysprykershop.com/foo/bar`.

The following is an example of a sucessfully tested cURL command:

```bash
curl --location --request GET 'https://glue-backend.mysprykershop.com/foo/bar' \
--header 'Accept: application/json'
```

6. Add a `POST` method to the same route:

   1. Add a method to a controller: `\Pyz\Glue\FooApi\Controller\FooBarController`

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

   2. Add a new route to the same route provider plugin: `\Pyz\Glue\FooApi\Plugin\FooBarRouteProviderPlugin`

   ```php
   ...
           $postRoute = (new Route('/foo/bar'))
               ->setDefaults([
                   '_controller' => [FooBarController::class, 'postAction'],
               ])
               ->setMethods(Request::METHOD_POST);
           $routeCollection->add('fooBarPost', $postRoute);
   ...
   ```

   3. Reset the router cache again and test your `POST` request:

   ```
   curl --location --request POST 'https://glue-backend.mysprykershop.com/foo/bar' \
   --header 'Accept: application/json' \
   --header 'Content-Type: application/json' \
   --data-raw '{
       "id": "foo",
       "name": "bar"
   }'
   ```

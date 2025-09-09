This document describes how to use API Key authorization mechanism with Backend API in Spryker.

## How authentication works

The API Key authorization mechanism lets users authenticate themselves with their API Key generated from the Back Office. The generated API Key can then be used to access protected resources.

## Prerequisites

To be able to generate the API key in the Back Office, make sure the required features are installed. For the installation guidelines, see [Integrate the API Key Authorization](/docs/dg/dev/upgrade-and-migrate/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-api-key-authorization.html).

## Protect routes with API Key authorization

To protect a route with the API Key authorization, you must add the authorization strategy to the route configuration. To do this, add the following code to the required route:

```php
<?php

namespace Spryker\Glue\DummyStoresApi\Plugin;

use Spryker\Glue\DummyStoresApi\Plugin\Controller\StoresResourceController;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RouteProviderPluginInterface;
use Spryker\Glue\Kernel\Backend\AbstractPlugin;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

class DummyStoresApiProviderPlugin extends AbstractPlugin implements RouteProviderPluginInterface
{
    /**
     * @var string
     */
    protected const METHOD_GET = 'GET';

    /**
     * @var string
     */
    protected const ROUTE_STORES_GET_LIST = 'stores/get-list';

    /**
     * @var string
     */
    protected const ROUTE_STORES_GET_LIST_ACTION = 'getCollectionAction';

    /**
     * @var string
     */
    protected const STRATEGIES_AUTHORIZATION = '_authorization_strategies';

    /**
     * @var string
     */
    protected const STRATEGY_AUTHORIZATION_API_KEY = 'ApiKey';

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Symfony\Component\Routing\RouteCollection $routeCollection
     *
     * @return \Symfony\Component\Routing\RouteCollection
     */
    public function addRoutes(RouteCollection $routeCollection): RouteCollection
    {
        $route = new Route(static::ROUTE_STORES_GET_LIST);
        $route->setMethods([static::METHOD_GET])
            ->setController(StoresResourceController::class, static::ROUTE_STORES_GET_LIST_ACTION)
            ->setDefault(static::STRATEGIES_AUTHORIZATION, [static::STRATEGY_AUTHORIZATION_API_KEY]);

        $routeCollection->add(
            static::ROUTE_STORES_GET_LIST,
            static::METHOD_GET,
            $route
         );

         return $routeCollection;
    }
}
```

## Create an API Key in the Back Office

To create an API Key in the Back Office, follow these steps:
1. Log in to the Back Office.
2. Go to **Administration** > **API Keys**.
3. Click **Create API Key**.
4. Enter a name for the API Key.
5. Optional: Enter a *Valid To* date if needed. If you *don't* enter a date, the API Key will be valid indefinitely.
6. Click **Create**.
7. Copy the generated API Key and save it in a secure place. Spryker does not store the API Keys, so if you lose it, you will have to generate a new one or regenerate the current Key.

## Use the API Key to access protected resources

There are two ways to pass the API Key to access protected resources:
1. Pass the API Key in the `X-Api-Key` header.
2. Pass the API Key in the `api_key` URL parameter.

<details>
<summary>An example of how to pass the API Key in the `X-Api-Key` header:</summary>

```bash
curl --location 'http://glue-backend.de.spryker.local/dynamic-entity/countries \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'X-Api-Key: 6264714260f980fe38c6be2439b0a8e9'
```
</details>

<details>
<summary>An example of how to pass the API Key in the `api_key` URL parameter:</summary>

```bash
curl --location 'http://glue-backend.de.spryker.local/dynamic-entity/countries?api_key=6264714260f980fe38c6be2439b0a8e9 \
--header 'Content-Type: application/json' \
--header 'Accept: application/json'
```
</details>
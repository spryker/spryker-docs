---
title: How to use authorization framework
description: This document shows how to create a new authorization strategy.
last_updated: September 30, 2022
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/using-authorization-framework.html
---

This document shows how to create a new authorization strategy.

Integrate authorization following this guide [https://docs.spryker.com/docs/scos/dev/technical-enhancement-integration-guides/integrating-authorization-enabler.html](https://docs.spryker.com/docs/scos/dev/technical-enhancement-integration-guides/integrating-authorization-enabler.html).

The first step is creating a strategy that is a plugin responsible for performing the authorization itself:

<details><summary markdown='span'>AuthorizationStrategyPluginInterface</summary>

```php
<?php

namespace Spryker\Client\Customer\Plugin\Authorization;

use Generated\Shared\Transfer\AuthorizationRequestTransfer;
use Spryker\Client\AuthorizationExtension\Dependency\Plugin\AuthorizationStrategyPluginInterface;
use Spryker\Glue\Kernel\AbstractPlugin;

class CustomAuthorizationStrategyPlugin extends AbstractPlugin implements AuthorizationStrategyPluginInterface
{
    /**
     * @var string
     */
    protected const STRATEGY_NAME = 'CustomAuthorizationStrategy';

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\AuthorizationRequestTransfer $authorizationRequestTransfer
     *
     * @return bool
     */
    public function authorize(AuthorizationRequestTransfer $authorizationRequestTransfer): bool
    {
        //$result = $this->getClient();
        // Call any client or make an external service call.
        
        return $result;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return string
     */
    public function getStrategyName(): string
    {
        return static::STRATEGY_NAME;
    }
}
```
</details>

This plugin is run by `AuthorizationClient::authorize()`.

There is a way to connect the resources and custom routes with the just-created strategy. They need to implement `AuthorizationStrategyAwareResourceRoutePluginInterface` pointing to the strategy:

**AuthorizationStrategyAwareResourceRoutePluginInterface**

```php
<?php

namespace Spryker\Glue\DummyStoresApi\Plugin;

use Generated\Shared\Transfer\RouteAuthorizationConfigTransfer;
use Spryker\Glue\GlueApplication\Plugin\GlueApplication\AbstractResourcePlugin;
use Spryker\Glue\GlueApplicationAuthorizationConnectorExtension\Dependency\Plugin\AuthorizationStrategyAwareResourceRoutePluginInterface;
use Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\JsonApiResourceInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DummyStoresResource extends AbstractResourcePlugin implements JsonApiResourceInterface, AuthorizationStrategyAwareResourceRoutePluginInterface
{
    /**
     * @return array<\Generated\Shared\Transfer\RouteAuthorizationConfigTransfer>
     */
    public function getRouteAuthorizationConfigurations(): array
    {
        return [
            Request::METHOD_GET => (new RouteAuthorizationConfigTransfer())
                ->addStrategy('CustomAuthorizationStrategy')
                ->setApiCode('xx01')
                ->setHttpStatusCode(Response::HTTP_NOT_FOUND)
                ->setApiMessage('Authorization failed.'),
        ];
    }
}
```

| FIELD IN ROUTE AUTHORIZATION CONFIG TRANSFER | MEANING |
| --- | --- |
| `strategies` | The array of strategies name to be used to evaluate the request. |
| `apiCode` | API code returned if authorization fails. |
| `httpStatusCode` | HTTP response status returned if authorization fails. |
| `apiMessage` | API message returned if authorization fails. |

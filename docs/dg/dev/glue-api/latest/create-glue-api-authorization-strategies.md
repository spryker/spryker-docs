---
title: Create Glue API authorization strategies
description: This document describes how to create a new authorization strategy.
last_updated: September 30, 2022
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/using-authorization-framework.html
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/how-to-use-authorization-framework.html
  - /docs/scos/dev/glue-api-guides/202212.0/decoupled-glue-infrastructure/how-to-guides/how-to-use-authorization-framework.html
  - /docs/scos/dev/glue-api-guides/202204.0/create-glue-api-authorization-strategies.html
  - /docs/scos/dev/glue-api-guides/202404.0/create-glue-api-authorization-strategies.html

---

This document describes how to create a new authorization strategy.

Integrate authorization following the [Integrating Authorization Enabler](/docs/dg/dev/integrate-and-configure/integrate-authorization-enabler.html) guide.

The first step is creating a strategy that is a plugin responsible for performing the authorization:

<details><summary>AuthorizationStrategyPluginInterface</summary>

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

`AuthorizationClient::authorize()` runs the plugin.

To connect the resources and custom routes with this strategy, they need to implement `AuthorizationStrategyAwareResourceRoutePluginInterface` pointing to the strategy:

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

| FIELD IN ROUTE AUTHORIZATION CONFIG TRANSFER | DESCRIPTION |
| --- | --- |
| `strategies` | The array of strategies name to be used to evaluate the request. |
| `apiCode` | API code returned if authorization fails. |
| `httpStatusCode` | HTTP response status returned if authorization fails. |
| `apiMessage` | API message returned if authorization fails. |

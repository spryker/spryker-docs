This page will demonstrate how to create a new authorization strategy.

Integrate authorization following this guide [https://docs.spryker.com/docs/scos/dev/technical-enhancement-integration-guides/integrating-authorization-enabler.html](https://docs.spryker.com/docs/scos/dev/technical-enhancement-integration-guides/integrating-authorization-enabler.html).

The first step is creating a strategy that is a plugin responsible for performing the authorization itself:
`AuthorizationStrategyPluginInterface`

```
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

This plugin will be run by the `AuthorizationClient::authorize()`.

There is a way to connect the Resources and Custom Routes with the strategy we just created. They need to implement `AuthorizationStrategyAwareResourceRoutePluginInterface` pointing to the strategy:
`AuthorizationStrategyAwareResourceRoutePluginInterface`


```
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

|     |     |
| --- | --- |
| **Field in RouteAuthorizationConfigTransfer** | **Meaning** |
| `strategies` | The array of strategies name to be used to evaluate the request. |
| `apiCode` | API code that will be returned if authorization fails. |
| `httpStatusCode` | HTTP response status that will be returned if authorization fails. |
| `apiMessage` | API message that will be returned if authorization fails. |

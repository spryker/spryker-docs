This document describes how to create a new authorization strategy for Backend API and integrate external authentication services.

Integrate authorization following the [Integrating Authorization Enabler](/docs/dg/dev/integrate-and-configure/integrate-authorization-enabler.html) guide.

## Creating Authorization Strategies

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

## Integrating External Authentication Services (CIAM)

You can integrate third-party Customer Identity and Access Management (CIAM) providers into your Backend API authorization flow. This extends the existing authorization functionality to work with external authentication services.

### Prerequisites for CIAM Integration

Use JWT-based tokens to transfer required customer data between CIAM and Spryker. For more details about JWT, see [JSON Web Tokens](https://auth0.com/docs/secure/tokens/json-web-tokens).

Install the required JWT library:

```bash
composer require "firebase/php-jwt": "^5.4" --update-with-dependencies
```

### Creating a CIAM Provider Module

Create a separate CIAM provider Client layer with the following structure:

```
+ Client/
  + CiamProvider/
    + Decoder/
      + CiamTokenDecoder.php // Decodes JWT token using php-jwt library
      + CiamTokenDecoderInterface.php
    + Mapper/
      + CiamTokenMapper.php // Maps decoded token attributes
      + CiamTokenMapperInterface.php
    + Reader/
      + CiamDataReader.php // Provides token keys from the provider
      + CiamDataReaderInterface.php
    + CiamClient.php
    + CiamClientInterface.php  
    + CiamConfig.php
```

### CIAM Token Decoding Example

```php
class CiamTokenDecoder implements CiamTokenDecoderInterface
{
    protected $ciamDataReader;
    protected $firebaseJwk;
    protected $firebaseJwt;
    protected $ciamTokenMapper;

    public function __construct(
        JWK $firebaseJwk,
        JWT $firebaseJwt,
        CiamDataReaderInterface $ciamDataReader,
        CiamTokenMapperInterface $ciamTokenMapper
    ) {
        $this->firebaseJwk = $firebaseJwk;
        $this->firebaseJwt = $firebaseJwt;
        $this->ciamDataReader = $ciamDataReader;
        $this->ciamTokenMapper = $ciamTokenMapper;
    }

    public function decodeCiamToken(string $ciamToken): CiamTokenTransfer
    {
        $ciamTokenTransfer = new CiamTokenResponseTransfer();
        $ciamProviderApiResponseTransfer = $this->ciamDataReader->getCiamKeys();

        $parsedCiamKeys = $this->firebaseJwk->parseKeySet($ciamProviderApiResponseTransfer->getKeys());
        $token = $this->firebaseJwt->decode($ciamToken, $parsedCiamKeys, ['RS256']);

        $ciamTokenTransfer = $this->ciamTokenMapper->mapTokenToCiamProviderTokenTransfer($token);

        return $ciamTokenTransfer;
    }
}
```

### Creating CIAM Authorization Strategy

Create a custom authorization strategy that integrates with your CIAM provider:

```php
<?php

namespace Pyz\Client\CiamProvider\Plugin\Authorization;

use Generated\Shared\Transfer\AuthorizationRequestTransfer;
use Spryker\Client\AuthorizationExtension\Dependency\Plugin\AuthorizationStrategyPluginInterface;
use Spryker\Glue\Kernel\AbstractPlugin;

class CiamAuthorizationStrategyPlugin extends AbstractPlugin implements AuthorizationStrategyPluginInterface
{
    protected const STRATEGY_NAME = 'CiamAuthorizationStrategy';

    public function authorize(AuthorizationRequestTransfer $authorizationRequestTransfer): bool
    {
        // Extract CIAM token from request
        $ciamToken = $this->extractCiamToken($authorizationRequestTransfer);
        
        if (!$ciamToken) {
            return false;
        }

        // Decode and validate CIAM token
        $ciamTokenTransfer = $this->getCiamProviderClient()->decodeCiamToken($ciamToken);
        
        // Perform authorization logic based on decoded token
        return $this->validateCiamToken($ciamTokenTransfer);
    }

    public function getStrategyName(): string
    {
        return static::STRATEGY_NAME;
    }
}
```

This integration allows you to combine Spryker's native authorization strategies with external CIAM providers for comprehensive authentication and authorization in your Backend API.
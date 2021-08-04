---
title: Glue API- Spryker Сore feature integration
originalLink: https://documentation.spryker.com/2021080/docs/glue-api-spryker-core-feature-integration
redirect_from:
  - /2021080/docs/glue-api-spryker-core-feature-integration
  - /2021080/docs/en/glue-api-spryker-core-feature-integration
---

This document describes how to integrate the Glue API: Spryker Core feature into a Spryker project.

## Install Feature API

### Prerequisites

To start feature integration, integrate the required features:

| NAME | TYPE | VERSION |
| --- | --- | --- |
| Spryker Core | Feature | dev-master |

### 1) Install the required modules using Composer

Install the required modules:
```bash
composer require spryker/glue-application:"^1.0.0" spryker/entity-tags-rest-api:"^1.0.0" spryker/stores-rest-api:"^1.0.0" spryker/urls-rest-api:"^1.0.0" spryker/security-blocker-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:
| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| GlueApplication | vendor/spryker/glue-application |
| EntityTagsRestApi | vendor/spryker/entity-tag-rest-api |
| StoresRestApi | vendor/spryker/stores-rest-api |
| UrlsRestApi | vendor/spryker/urls-rest-api |
| SecurityBlockerRestApi | vendor/spryker/security-blocker-rest-api |

{% endinfo_block %}

### 2) Set up configuration

Add the necessary parameters to `config/Shared/config_default.php`:
**config/Shared/config_default.php**
```php
$config[GlueApplicationConstants::GLUE_APPLICATION_DOMAIN] = 'http://glue.mysprykershop.com';
$config[GlueApplicationConstants::GLUE_APPLICATION_CORS_ALLOW_ORIGIN] = 'http://glue.mysprykershop.com';
$config[GlueApplicationConstants::GLUE_APPLICATION_REST_DEBUG] = false;
```

#### Add global CORS policy

:::(Info)
`GLUE_APPLICATION_CORS_ALLOW_ORIGIN` should be configured for every domain used in the project. 
:::

Adjust `config/Shared/config_default.php`:
**config/Shared/config_default.php**
```php
$config[GlueApplicationConstants::GLUE_APPLICATION_CORS_ALLOW_ORIGIN] = 'http://glue.mysprykershop.com';
```

#### Allow CORS requests to any domain

Adjust `config/Shared/config_default.php`:
**config/Shared/config_default.php**
```php
$config[GlueApplicationConstants::GLUE_APPLICATION_CORS_ALLOW_ORIGIN] = '*';
```
{% info_block warningBox "Verification" %}

To make sure that the CORS headers are set up correctly, send the OPTIONS request to any valid GLUE resource with the `Origin` header `http://glue.mysprykershop.com/` and see the correct JSON response:
* Verify that the `access-control-allow-origin` header is present and is the same to the one set in `config`.
* Verify that the `access-control-allow-methods` header is present and contains all available methods.
* Send POST, PATCH, or DELETE requests (can choose any of available ones), and verify that the response headers are the same.

{% endinfo_block %}

#### Configure included section

:::(Info)
* When the `GlueApplicationConfig::isEagerRelationshipsLoadingEnabled()` option is set to `false`, no relationship is loaded, unless they are explicitly specified in the include query parameter (e.g., `/abstract-products?include=abstract-product-prices`). 
* When the `GlueApplicationConfig::isEagerRelationshipsLoadingEnabled()` option is set to `true`, all resource relationships is loaded by default unless you pass the empty include query parameter (e.g., `/abstract-products?include=`). If you specify needed relationships in the include query parameter, only required relationships are added to response data.
:::

### 3) Set up transfer objects

Generate transfer objects:
```bash
console transfer:generate
```

::: (Warning) (Verification)
Make sure that the following changes have occurred:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| RestPageOffsetsTransfer | class | created | src/Generated/Shared/Transfer/RestPageOffsetsTransfer.php |
| RestErrorMessageTransfer |  class | created | src/Generated/Shared/Transfer/RestErrorMessageTransfer.php |
| RestErrorCollectionTransfer |  class | created | src/Generated/Shared/Transfer/RestErrorCollectionTransfer.php |
| RestVersionTransfer |  class | created | src/Generated/Shared/Transfer/RestVersionTransfer.php |
| RestUserTransfer |  class | created | src/Generated/Shared/Transfer/RestUserTransfer.php |
| StoresRestAttributesTransfer |  class | created | src/Generated/Shared/Transfer/StoresRestAttributesTransfer.php |
StoreCountryRestAttributesTransfer| class | created  | src/Generated/Shared/Transfer/StoreCountryRestAttributesTransfer.php |
| StoreRegionRestAttributesTransfer |  class | created | src/Generated/Shared/Transfer/StoreRegionRestAttributesTransfer.php |
| StoreLocaleRestAttributesTransfer |  class | created | src/Generated/Shared/Transfer/StoreLocaleRestAttributesTransfer.php |
| StoreCurrencyRestAttributesTransfer |  class | created | src/Generated/Shared/Transfer/StoreCurrencyRestAttributesTransfer.php |
| RestUrlResolverAttributesTransfer |  class | created | src/Generated/Shared/Transfer/RestUrlResolverAttributesTransfer.php |
| SecurityCheckAuthContextTransfer |  class | created | src/Generated/Shared/Transfer/SecurityCheckAuthContextTransfer.php |
| SecurityCheckAuthResponseTransfer |  class | created | src/Generated/Shared/Transfer/SecurityCheckAuthResponseTransfer.php |
| RestAccessTokensAttributesTransfer |  class | created | src/Generated/Shared/Transfer/RestAccessTokensAttributesTransfer.php |
| RestAgentAccessTokensRequestAttributesTransfer |  class | created | src/Generated/Shared/Transfer/RestAgentAccessTokensRequestAttributesTransfer.php |
:::
    
### 4) Set up behavior

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| GlueApplicationApplicationPlugin | Registers the resource builder service and configures the debug mode in Glue Application. |  | Spryker\Glue\GlueApplication\Plugin\Application |
| HttpApplicationPlugin | Sets trusted proxies and host. Adds `HttpKernel`, `RequestStack`, and `RequestContext` to the container. |  | Spryker\Glue\Http\Plugin\Application |
| EventDispatcherApplicationPlugin | Extends `EventDispatcher` with plugins. |  | Spryker\Glue\EventDispatcher\Plugin\Application |
| SessionApplicationPlugin | Registers session in Glue Application. |  | Spryker\Glue\Session\Plugin\Application |
| GlueRestControllerListenerEventDispatcherPlugin | Registers the `onKernelController` event listeners in Glue Application |  | Spryker\Glue\GlueApplication\Plugin\Rest |
| RouterApplicationPlugin | Registers the URL matcher and router services in Glue Application. |  | Spryker\Glue\Router\Plugin\Application |
| SetStoreCurrentLocaleBeforeActionPlugin | Sets a locale for the whole current store. |  | Spryker\Glue\GlueApplication\Plugin\Rest\ |
| EntityTagFormatResponseHeadersPlugin | Adds the `ETag` header to response if applicable. |  | Spryker\Glue\EntityTagsRestApi\Plugin\GlueApplication\ |
| EntityTagRestRequestValidatorPlugin | Verifies that the `If-Match` header is equal to the entity tag. |  | Spryker\Glue\EntityTagsRestApi\Plugin\GlueApplication\ |
| StoresResourceRoutePlugin | Registers the stores resource. |  | Spryker\Glue\StoresRestApi\Plugin |
| UrlResolverResourceRoutePlugin | Registers the url-resolver resource. |  | Spryker\Glue\UrlsRestApi\Plugin\GlueApplication\ |
| ProductAbstractRestUrlResolverAttributesTransferProviderPlugin | Provides abstract-products resource from the `UrlStorageTransfer` object. |  | Spryker\Glue\ProductsRestApi\Plugin\UrlsRestApi\ |
| CategoryNodeRestUrlResolverAttributesTransferProviderPlugin | Provides category-nodes resource from the UrlStorageTransfer object. |  | Spryker\Glue\CategoriesRestApi\Plugin\UrlsRestApi\ |
| SecurityBlockerCustomerRestRequestValidatorPlugin | Stops the customer accounts that are blocked by SecurityBlocker from being able to make access-tokens requests. |  | Spryker\Glue\SecurityBlockerRestApi\Plugin\GlueApplication |
| SecurityBlockerAgentRestRequestValidatorPlugin | Stops the agent accounts that are blocked by SecurityBlocker from being able to make agent-access-tokens requests. |  | Spryker\Glue\SecurityBlockerRestApi\Plugin\GlueApplication |
| SecurityBlockerCustomerControllerAfterActionPlugin | Counts the failed customer login attempts. |  | Spryker\Glue\SecurityBlockerRestApi\Plugin\GlueApplication |
| SecurityBlockerAgentControllerAfterActionPlugin | Counts the failed agent login attempts. |  | Spryker\Glue\SecurityBlockerRestApi\Plugin\GlueApplication |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**
```php
<?php
  
namespace Pyz\Glue\GlueApplication;
  
use Spryker\Glue\EventDispatcher\Plugin\Application\EventDispatcherApplicationPlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplication\Plugin\Application\GlueApplicationApplicationPlugin;
use Spryker\Glue\Http\Plugin\Application\HttpApplicationPlugin;
use Spryker\Glue\Router\Plugin\Application\RouterApplicationPlugin;
use Spryker\Glue\Session\Plugin\Application\SessionApplicationPlugin;
 
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        return [
        new HttpApplicationPlugin(),
        new SessionApplicationPlugin(),
        new EventDispatcherApplicationPlugin(),
        new GlueApplicationApplicationPlugin(),
        new RouterApplicationPlugin(),
        ];
    }
}
```

Create a new entry point for Glue Application:

**public/Glue/index.php**

```php
<?php
 
use Pyz\Glue\GlueApplication\Bootstrap\GlueBootstrap;
use Spryker\Shared\Config\Application\Environment;
use Spryker\Shared\ErrorHandler\ErrorHandlerEnvironment;
 
define('APPLICATION', 'GLUE');
defined('APPLICATION_ROOT_DIR') || define('APPLICATION_ROOT_DIR', realpath(__DIR__ . '/../..'));
 
require_once APPLICATION_ROOT_DIR . '/vendor/autoload.php';
 
Environment::initialize();
 
$errorHandlerEnvironment = new ErrorHandlerEnvironment();
$errorHandlerEnvironment->initialize();
 
$bootstrap = new GlueBootstrap();
$bootstrap
    ->boot()
    ->run();
```

#### Configure web server

Create Nginx VHOST configuration:
**/etc/nginx/sites-enabled/DE_development_glue**
```php
server {
    # Listener for production/staging - requires external LoadBalancer directing traffic to this port
    listen 10001;
 
    # Listener for testing/development - one host only, doesn't require external LoadBalancer
    listen 80;
 
    server_name ~^glue\\..+\\.com$;
 
    keepalive_timeout 0;
    access_log  /data/logs/development/glue-access.log extended;
 
    # entry point for Glue Application
    root /data/shop/development/current/public/Glue;
 
    set $application_env development;
    # Binding store
    set $application_store DE;
    include "spryker/zed.conf";
}
```

Update hosts configuration by adding the following line (replace **ip** with your server's IP address):
**/etc/hosts**
```
ip glue.mysprykershop.com
```

{% info_block warningBox "Verification" %}

If everything is set up correctly, you should be able to access `http://glue.mysprykershop.com` and get a correct JSON response as follows:

{% endinfo_block %}

**Default JSON Response**
```json
{
    "errors": [
        {
            "status": 404,
            "detail": "Not Found"
        }
    ]
}
```

<details><summary>\Pyz\Glue\GlueApplication\GlueApplicationDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplication\Plugin\Rest\SetStoreCurrentLocaleBeforeActionPlugin;
use Spryker\Glue\SecurityBlockerRestApi\Plugin\GlueApplication\SecurityBlockerAgentControllerAfterActionPlugin;
use Spryker\Glue\SecurityBlockerRestApi\Plugin\GlueApplication\SecurityBlockerAgentRestRequestValidatorPlugin;
use Spryker\Glue\SecurityBlockerRestApi\Plugin\GlueApplication\SecurityBlockerCustomerControllerAfterActionPlugin;
use Spryker\Glue\SecurityBlockerRestApi\Plugin\GlueApplication\SecurityBlockerCustomerRestRequestValidatorPlugin;
use Spryker\Glue\StoresRestApi\Plugin\StoresResourceRoutePlugin;
use Spryker\Glue\UrlsRestApi\Plugin\GlueApplication\UrlsResourceRoutePlugin;
 
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new StoresResourceRoutePlugin(),
            new UrlResolverResourceRoutePlugin(),
        ];
    }
 
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ControllerBeforeActionPluginInterface[]
     */
    protected function getControllerBeforeActionPlugins(): array
    {
        return [
            new SetStoreCurrentLocaleBeforeActionPlugin(),
        ];
    }
     
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\FormatResponseHeadersPluginInterface[]
     */
    protected function getFormatResponseHeadersPlugins(): array
    {
        return [
            new EntityTagFormatResponseHeadersPlugin(),
        ];
    }
 
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RestRequestValidatorPluginInterface[]
     */
    protected function getRestRequestValidatorPlugins(): array
    {
        return [
            new EntityTagRestRequestValidatorPlugin(),
            new SecurityBlockerCustomerRestRequestValidatorPlugin(),
            new SecurityBlockerAgentRestRequestValidatorPlugin(),
        ];
    }
 
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ControllerAfterActionPluginInterface[]
     */
    protected function getControllerAfterActionPlugins(): array
    {
        return [
            new SecurityBlockerCustomerControllerAfterActionPlugin(),
            new SecurityBlockerAgentControllerAfterActionPlugin(),
        ];
    }
}
```

**\Pyz\Glue\UrlsRestApi\UrlsRestApiDependencyProvider.php**
```php
<?php
 
namespace Pyz\Glue\UrlsRestApi;
 
use Spryker\Glue\CategoriesRestApi\Plugin\UrlsRestApi\CategoryNodeResourceIdentifierProviderPlugin;
use Spryker\Glue\ProductsRestApi\Plugin\UrlsRestApi\ProductAbstractResourceIdentifierProviderPlugin;
use Spryker\Glue\UrlsRestApi\UrlsRestApiDependencyProvider as SprykerUrlsRestApiDependencyProvider;
 
class UrlsRestApiDependencyProvider extends SprykerUrlsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\UrlsRestApiExtension\Dependency\Plugin\ResourceIdentifierProviderPluginInterface[]
     */
    protected function getResourceIdentifierProviderPlugins(): array
    {
        return [
            new ProductAbstractRestUrlResolverAttributesTransferProviderPlugin(),
            new CategoryNodeRestUrlResolverAttributesTransferProviderPlugin(),
        ];
    }
}
```

**src/Pyz/Glue/EntityTagsRestApi/EntityTagsRestApiConfig.php**

```php
<?php
 
namespace Pyz\Glue\EntityTagsRestApi;
 
use Spryker\Glue\CartsRestApi\CartsRestApiConfig;
use Spryker\Glue\EntityTagsRestApi\EntityTagsRestApiConfig as SprykerEntityTagsRestApiConfig;
 
 class EntityTagsRestApiConfig extends SprykerEntityTagsRestApiConfig
{
    /**
     * @return string[]
     */
    public function getEntityTagRequiredResources(): array
    {
        return array_merge(
            parent::getEntityTagRequiredResources(),
            [PyzRestApiConfig::RESOURCE_NAME]
        );
    }
}
```

</details>

{% info_block warningBox "Verification" %}

If everything is set up correctly, a request to `http://glue.mysprykershop.com` with the header `[{"key":"Accept-Language","value":"de_DE, de;q=0.9"}]` should result in a response that contains the `content-language` header set to **de_DE**.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

`EntityTagFormatResponseHeadersPlugin` is set up correctly if the response of any of the resources configured to require `ETag` (in `EntityTagsRestApiConfig::getEntityTagRequiredResources()`) contains the `ETag` header.

Check this by sending a GET request to `http://glue.mysprykershop.com/{% raw %}{{{% endraw %}RESOURCE_NAME{% raw %}}}{% endraw %}/{% raw %}{{{% endraw %}identifier{% raw %}}}{% endraw %}`.

{% endinfo_block %}
{% info_block warningBox "Verification" %}

Make sure the `EntityTagRestRequestValidatorPlugin` is set up correctly.

Send a PATCH request to `http://glue.mysprykershop.com/{% raw %}{{{% endraw %}RESOURCE_NAME{% raw %}}}{% endraw %}/{% raw %}{{{% endraw %}identitifer{% raw %}}}{% endraw %}` with the `If-Match` header equal the value of `ETag` from the GET response header:
**PATCH http://glue.mysprykershop.com/{% raw %}{{{% endraw %}RESOURCE_NAME{% raw %}}}{% endraw %}/identitifer**

```json
HEADER If-Match: cc1eb2e0b45ee5026b72d21dbded0090
 
{
    "data": {
        "type": "RESOURCE_NAME",
        "attributes": {
            "name": "{% raw %}{{{% endraw %}new_name{% raw %}}}{% endraw %}"
        }
    }
}
```

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that returned resource contains updated `ETag`.

Sending a wrong `If-Match` header value results in the following error:
```json
{
    "errors": [
        {
            "detail": "If-Match header is missing.",
            "status": 428,
            "code": "005"
        }
    ]
}
```

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the `http://glue.mysprykershop.com/stores` endpoint is available: 

{% endinfo_block %}

{% info_block warningBox "Verification" %}

To make sure the `ProductAbstractRestUrlResolverAttributesTransferProviderPlugin` plugin is set up correctly, request the abstract-products URL via the /URLs API endpoint and make sure you receive the correct resource identifier in response.

{% endinfo_block %}

**Request body**
```json
http://glue.mysprykershop.com/url-resolver/?url=/product-abstract-url
{
    "data": [
        {
            "type": "url-resolver",
            "id": null,
            "attributes": {
                "entityType": "abstract-products",
                "entityId": "134"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/url-resolver?url=/de/acer-aspire-s7-134"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/url-resolver?url=/de/acer-aspire-s7-134"
    }
}
```
{% info_block warningBox "Verification" %}

To make sure `CategoryNodeRestUrlResolverAttributesTransferProviderPlugin` is set up correctly, request the category URL via the /URLs API endpoint, and ensure you receive the correct resource identifier in response.

{% endinfo_block %}
**Request body**
```json
http://glue.mysprykershop.com/url-resolver/?url=/category-url
{
    "data": [
        {
            "type": "url-resolver",
            "id": null,
            "attributes": {
                "entityType": "category-nodes",
                "entityId": "5"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/url-resolver?url=/de/computer"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/url-resolver?url=/de/computer"
    }
}
```

{% info_block warningBox "Verification" %}

Make sure `SecurityBlockerCustomerControllerAfterActionPlugin` and `SecurityBlockerCustomerRestRequestValidatorPlugin` are activated correctly by attempting to get an access token (see [Authenticating as a customer](https://documentation.spryker.com/docs/authenticating-as-a-customer) with the wrong credentials as a customer. After making the number of attempts you specified in `SecurityBlockerConstants::SECURITY_BLOCKER_BLOCKING_NUMBER_OF_ATTEMPTS`, the account should be blocked for `SecurityBlockerConstants::SECURITY_BLOCKER_BLOCK_FOR` seconds. Check that with the consequent login attempts, you get the `429 Too many requests` error.

Repeat the same actions for the agent sign-in to check `SecurityBlockerAgentRestRequestValidatorPlugin` and `SecurityBlockerAgentControllerAfterActionPlugin`. The agent should get the blocking configuration specific for agents if you specified the agent-specific settings in step 3 of the integration of the feature core. See  [Authenticating as an agent assist](https://documentation.spryker.com/docs/authenticating-as-an-agent-assist#authenticate-as-an-agent-assist) for agent access tokens manual.


{% endinfo_block %}

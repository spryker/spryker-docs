

This document describes how to install the Spryker Core Glue API.

## Prerequisites

Install the required features:

| NAME | TYPE | VERSION |
| --- | --- | --- |
| Spryker Core | Feature | {{page.version}} |

## 1) Install the required modules

Install the required modules using Composer:

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

## 2) Set up configuration

Set up the configuration in the following sections.

### Configure CORS

Based on the following examples, add `cors-allow-origin` to the needed deploy file:

```yml
glue_eu:
    application: glue
    endpoints:
        glue.de.mysprykershop.com:
            store: DE
            cors-allow-origin: 'http://cors-allow-origin1.domain'
            cors-allow-headers: "accept,content-type,content-language,accept-language,authorization,User-Agent,newrelic,traceparent,tracestate"
        glue.at.mysprykershop.com:
            store: AT
            cors-allow-origin: 'http://cors-allow-origin2.domain'
            cors-allow-headers: "accept,content-type,content-language,accept-language,authorization,If-Match,Cache-Control,If-Modified-Since,User-Agent,newrelic,traceparent,tracestate,X-Device-Id"
```

* CORS is disabled. Example:

```yml
glue_eu:
    application: glue
    endpoints:
        glue.de.mysprykershop.com:
            store: DE
        glue.at.mysprykershop.com:
            store: AT
```

*  `*`: allow CORS requests from any domain. Example:

```yml
glue_eu:
    application: glue
    endpoints:
        glue.de.mysprykershop.com:
            store: DE
            cors-allow-origin: '*'
        glue.at.mysprykershop.com:
            store: AT
            cors-allow-origin: '*'
```

* Allow CORS requests only from a specific origin. Example:

```yml
glue_eu:
    application: glue
    endpoints:
        glue.de.mysprykershop.com:
            store: DE
            cors-allow-origin: 'http://www.example1.com'
        glue.at.mysprykershop.com:
            store: AT
            cors-allow-origin: 'http://www.example1.com'
```

{% info_block warningBox "Verification" %}

To make sure that the CORS headers are set up correctly, follow the steps:

1. In the deploy file, define a specific origin to accept requests from. In our example, it's `http://www.example1.com`


2. Send the OPTIONS request to any valid Glue API resource with the `Origin` header:

```bash
curl -X OPTIONS -H "Origin: http://www.example1.com" -i http://glue.mysprykershop.com
```

3. Using the following example, verify the headers:

* The `access-control-allow-origin` header is present and is the same as set in the deploy file.
* The `access-control-allow-methods` header is present and contains all available methods.


```bash
Content-Type: text/plain; charset=utf-8
Content-Length: 0
Connection: keep-alive
Access-Control-Http-Origin: http://www.example1.com
Access-Control-Allow-Origin: http://www.example1.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS
Access-Control-Allow-Headers: accept,content-type,content-language,accept-language,authorization,X-Anonymous-Customer-Unique-Id,Merchant-Reference,If-Match,Cache-Control,If-Modified-Since,User-Agent,newrelic,traceparent,tracestate
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: ETag
```

{% endinfo_block %}

### Configure relationships

Set the value of `GlueApplicationConfig::isEagerRelationshipsLoadingEnabled()` according to your requirements:

|VALUE | DESCRIPTION |
|-|-|
| false | If the `include` query parameter is not passed, no resource relationships are returned. If particular relationships are requested thorough the `include` parameter, only those relationships are returned. For example: `/abstract-products?include=abstract-product-prices` |
| true | If the `include` query parameter is not passed, all resource relationships are returned. If an empty include query parameter is passed, no relationships are returned: `/abstract-products?include=`. If particular relationships are requested thorough the `include` parameter, only those relationships are returned. |


## 3) Set up transfer objects

Generate transfer objects:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| RestPageOffsetsTransfer | class | created | src/Generated/Shared/Transfer/RestPageOffsetsTransfer.php |
| RestErrorMessageTransfer |  class | created | src/Generated/Shared/Transfer/RestErrorMessageTransfer.php |
| RestErrorCollectionTransfer |  class | created | src/Generated/Shared/Transfer/RestErrorCollectionTransfer.php |
| RestVersionTransfer |  class | created | src/Generated/Shared/Transfer/RestVersionTransfer.php |
| RestUserTransfer |  class | created | src/Generated/Shared/Transfer/RestUserTransfer.php |
| StoresRestAttributesTransfer |  class | created | src/Generated/Shared/Transfer/StoresRestAttributesTransfer.php |
| StoreCountryRestAttributesTransfer| class | created  | src/Generated/Shared/Transfer/StoreCountryRestAttributesTransfer.php |
| StoreRegionRestAttributesTransfer |  class | created | src/Generated/Shared/Transfer/StoreRegionRestAttributesTransfer.php |
| StoreLocaleRestAttributesTransfer |  class | created | src/Generated/Shared/Transfer/StoreLocaleRestAttributesTransfer.php |
| StoreCurrencyRestAttributesTransfer |  class | created | src/Generated/Shared/Transfer/StoreCurrencyRestAttributesTransfer.php |
| RestUrlResolverAttributesTransfer |  class | created | src/Generated/Shared/Transfer/RestUrlResolverAttributesTransfer.php |
| SecurityCheckAuthContextTransfer |  class | created | src/Generated/Shared/Transfer/SecurityCheckAuthContextTransfer.php |
| SecurityCheckAuthResponseTransfer |  class | created | src/Generated/Shared/Transfer/SecurityCheckAuthResponseTransfer.php |
| RestAccessTokensAttributesTransfer |  class | created | src/Generated/Shared/Transfer/RestAccessTokensAttributesTransfer.php |
| RestAgentAccessTokensRequestAttributesTransfer |  class | created | src/Generated/Shared/Transfer/RestAgentAccessTokensRequestAttributesTransfer.php |

{% endinfo_block %}

## 4) Set up behavior

1. Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| GlueApplicationApplicationPlugin | Registers the resource builder service and configures the debug mode in Glue Application. |  | Spryker\Glue\GlueApplication\Plugin\Application |
| HttpApplicationPlugin | Sets trusted proxies and host. Adds `HttpKernel`, `RequestStack`, and `RequestContext` to the container. |  | Spryker\Glue\Http\Plugin\Application |
| EventDispatcherApplicationPlugin | Extends `EventDispatcher` with plugins. |  | Spryker\Glue\EventDispatcher\Plugin\Application |
| SessionApplicationPlugin | Registers the session in Glue Application. |  | Spryker\Glue\Session\Plugin\Application |
| GlueRestControllerListenerEventDispatcherPlugin | Registers the `onKernelController` event listeners in Glue Application. |  | Spryker\Glue\GlueApplication\Plugin\Rest |
| RouterApplicationPlugin | Registers the URL matcher and router services in Glue Application. |  | Spryker\Glue\Router\Plugin\Application |
| SetStoreCurrentLocaleBeforeActionPlugin | Sets a locale for the whole current store. |  | Spryker\Glue\GlueApplication\Plugin\Rest\ |
| EntityTagFormatResponseHeadersPlugin | Adds the `ETag` header to response if applicable. |  | Spryker\Glue\EntityTagsRestApi\Plugin\GlueApplication\ |
| EntityTagRestRequestValidatorPlugin | Verifies that the `If-Match` header is equal to the entity tag. |  | Spryker\Glue\EntityTagsRestApi\Plugin\GlueApplication\ |
| StoresResourceRoutePlugin | Registers the `stores` resource. |  | Spryker\Glue\StoresRestApi\Plugin |
| UrlResolverResourceRoutePlugin | Registers the `url-resolver` resource. |  | Spryker\Glue\UrlsRestApi\Plugin\GlueApplication\ |
| ProductAbstractRestUrlResolverAttributesTransferProviderPlugin | Provides the `abstract-products` resource from the `UrlStorageTransfer` object. |  | Spryker\Glue\ProductsRestApi\Plugin\UrlsRestApi\ |
| CategoryNodeRestUrlResolverAttributesTransferProviderPlugin | Provides the `category-nodes` resource from the `UrlStorageTransfer` object. |  | Spryker\Glue\CategoriesRestApi\Plugin\UrlsRestApi\ |
| SecurityBlockerCustomerRestRequestValidatorPlugin | Stops the customer accounts that are blocked by SecurityBlocker from being able to make access-tokens requests. |  | Spryker\Glue\SecurityBlockerRestApi\Plugin\GlueApplication |
| SecurityBlockerAgentRestRequestValidatorPlugin | Stops the agent accounts that are blocked by SecurityBlocker from being able to make agent-access-tokens requests. |  | Spryker\Glue\SecurityBlockerRestApi\Plugin\GlueApplication |
| SecurityBlockerCustomerControllerAfterActionPlugin | Counts failed customer login attempts. |  | Spryker\Glue\SecurityBlockerRestApi\Plugin\GlueApplication |
| SecurityBlockerAgentControllerAfterActionPlugin | Counts failed agent login attempts. |  | Spryker\Glue\SecurityBlockerRestApi\Plugin\GlueApplication |

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

2. Create a new entry point for Glue Application:

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

3. Create the Nginx VHOST configuration:

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

4. Update the hosts configuration. Replace `{IP}` with your server's IP address:

**/etc/hosts**
```bash
{IP} glue.mysprykershop.com
```

{% info_block warningBox "Verification" %}

Make sure you can access `https://glue.mysprykershop.com` and get the following JSON response:

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
{% endinfo_block %}


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
</details>

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

{% info_block warningBox "Verification" %}

Make a request to `https://glue.mysprykershop.com` with the header `[{"key":"Accept-Language","value":"de_DE, de;q=0.9"}]`. The response should contain the `content-language` header set to **de_DE**.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

1. To verify `EntityTagFormatResponseHeadersPlugin`, send the `GET https://glue.mysprykershop.com/{% raw %}{{{% endraw %}RESOURCE_NAME{% raw %}}}{% endraw %}/{% raw %}{{{% endraw %}identifier{% raw %}}}{% endraw %}` request to a resource that requires an `ETag`.
    The response should contain the `ETag` header.


2. To verify `EntityTagRestRequestValidatorPlugin`, send the following request with the `If-Match` header equal the value of the `ETag` value from the response to the previous request:

`PATCH https://glue.mysprykershop.com/{% raw %}{{{% endraw %}RESOURCE_NAME{% raw %}}}{% endraw %}/{% raw %}{{{% endraw %}identitifer{% raw %}}}{% endraw %}`
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
    Make sure that the returned resource contains an updated `ETag`.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that sending a wrong `If-Match` header value results in the following error:

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

Make sure you can send requests to the `https://glue.mysprykershop.com/stores` endpoint.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

To verify `ProductAbstractRestUrlResolverAttributesTransferProviderPlugin`, send the following request:

`POST https://glue.mysprykershop.com/url-resolver/?url=/product-abstract-url`
```json

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
                "self": "https://glue.mysprykershop.com/url-resolver?url=/de/acer-aspire-s7-134"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/url-resolver?url=/de/acer-aspire-s7-134"
    }
}
```
    Make sure you receive the correct resource identifier in the response.

{% endinfo_block %}


{% info_block warningBox "Verification" %}

To verify `CategoryNodeRestUrlResolverAttributesTransferProviderPlugin`, request the category URL via the `/URLs` API endpoint:

```json
https://glue.mysprykershop.com/url-resolver/?url=/category-url
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
                "self": "https://glue.mysprykershop.com/url-resolver?url=/de/computer"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/url-resolver?url=/de/computer"
    }
}
```

Make sure the response contains the correct resource identifier.

{% endinfo_block %}


{% info_block warningBox "Verification" %}

* To verify `SecurityBlockerCustomerControllerAfterActionPlugin` and `SecurityBlockerCustomerRestRequestValidatorPlugin`, [authenticate as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html) with incorrect credentials for as many times as you've specified in `SecurityBlockerConstants::SECURITY_BLOCKER_BLOCKING_NUMBER_OF_ATTEMPTS`.
    Make sure the account gets blocked for the number of seconds you've specified in `SecurityBlockerConstants::SECURITY_BLOCKER_BLOCK_FOR`. Consequent login attempts should return the `429 Too many requests` error.

* To verify `SecurityBlockerAgentRestRequestValidatorPlugin` and `SecurityBlockerAgentControllerAfterActionPlugin`, [authenticate as an agent assist](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-an-agent-assist.html#authenticate-as-an-agent-assist) with incorrect credentials.
    The agent account should get blocked according to the configured you've set up.

{% endinfo_block %}

---
title: Glue API- Spryker Core Feature Integration
originalLink: https://documentation.spryker.com/v5/docs/glue-api-spryker-core-feature-integration
redirect_from:
  - /v5/docs/glue-api-spryker-core-feature-integration
  - /v5/docs/en/glue-api-spryker-core-feature-integration
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Type | Version |
| --- | --- | --- |
| Spryker Core | Feature | 202001.0 |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker/glue-application:"^1.0.0" spryker/entity-tags-rest-api:"^1.0.0" spryker/stores-rest-api:"^1.0.0" spryker/urls-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><thead><tr><th>Module</th><th>Expected Directory </th></tr></thead><tbody><tr><td>`GlueApplication`</td><td>`vendor/spryker/glue-application`</td></tr><tr><td>`EntityTagsRestApi`</td><td>`vendor/spryker/entity-tag-rest-api`</td></tr><tr><td>`StoresRestApi`</td><td>`vendor/spryker/stores-rest-api`</td></tr><tr><td>`UrlsRestApi`</td><td>`vendor/spryker/urls-rest-api`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set Up Configuration
Add the necessary parameters to `config/Shared/config_default.php`:

```php
$config[GlueApplicationConstants::GLUE_APPLICATION_DOMAIN] = 'http://glue.mysprykershop.com';
$config[GlueApplicationConstants::GLUE_APPLICATION_CORS_ALLOW_ORIGIN] = 'http://glue.mysprykershop.com';
$config[GlueApplicationConstants::GLUE_APPLICATION_REST_DEBUG] = false;
```

#### Add Global CORS policy

{% info_block infoBox "Info" %}
`GLUE_APPLICATION_CORS_ALLOW_ORIGIN` should be configured for every domain used in the project. 
{% endinfo_block %}

Adjust `config/Shared/config_default.php`:

```php
$config[GlueApplicationConstants::GLUE_APPLICATION_CORS_ALLOW_ORIGIN] = 'http://glue.mysprykershop.com';
```

#### Allow CORS requests to any domain
Adjust `config/Shared/config_default.php`:

```php
$config[GlueApplicationConstants::GLUE_APPLICATION_CORS_ALLOW_ORIGIN] = '*';
```

{% info_block warningBox "Verification" %}
To make sure that the CORS headers are set up correctly, send the OPTIONS request to any valid GLUE resource with the **Origin** header `http://glue.mysprykershop.com/` and see the correct JSON response<ul><li>Verify that the **access-control-allow-origin** header is present and is the same to the one set in `config`</li><li>Verify that the **access-control-allow-methods** header is present and contains all available methods</li><li>Send POST, PATCH or DELETE requests (can choose any of available ones
{% endinfo_block %} and verify that the response headers are the same</li></ul>)

#### Configure included section

{% info_block infoBox "Info" %}
<ul><li>When the `GlueApplicationConfig::isEagerRelationshipsLoadingEnabled(
{% endinfo_block %}` option is set to "false", no relationship will be loaded unless they are explicitly specified in the "included" query parameter (for example, `/abstract-products?include=abstract-product-prices`).</li><li>When the `GlueApplicationConfig::isEagerRelationshipsLoadingEnabled()` option is set to "true", all resource relationships will be loaded by default unless you pass an empty "include" query parameter (for example, `/abstract-products?include=`). If you specify needed relationships in the "included" query parameter, only required relationships will be added to response data.)
    
### 3) Set Up Transfer Objects
Run the following command to generate transfer objects:
    
```bash
console transfer:generate
```
    
{% info_block warningBox "Verification" %}
Make sure that the following changes have occurred:<table><thead><tr><th>Transfer</th><th>Type</th><th>Event</th><th>Path</th></tr></thead><tbody><tr><td>`RestPageOffsetsTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/RestPageOffsetsTransfer.php`</td></tr><tr><td>`RestErrorMessageTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/RestErrorMessageTransfer.php`</td></tr><tr><td>`RestErrorCollectionTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/RestErrorCollectionTransfer.php`</td></tr><tr><td>`RestVersionTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/RestVersionTransfer.php`</td></tr><tr><td>`RestUserTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/RestUserTransfer.php`</td></tr><tr><td>`StoresRestAttributesTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/StoresRestAttributesTransfer.php`</td></tr><tr><td>`StoreCountryRestAttributesTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/StoreCountryRestAttributesTransfer.php`</td></tr><tr><td>`StoreRegionRestAttributesTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/StoreRegionRestAttributesTransfer.php`</td></tr><tr><td>`StoreLocaleRestAttributesTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/StoreLocaleRestAttributesTransfer.php`</td></tr><tr><td>`StoreCurrencyRestAttributesTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/StoreCurrencyRestAttributesTransfer.php`</td></tr><tr><td>`RestUrlResolverAttributesTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/RestUrlResolverAttributesTransfer.php`</td></tr></tbody></table>
{% endinfo_block %}
    
### 4) Set Up Behavior
Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `GlueResourceBuilderService` | Registers the resource builder service in Glue Application. | None | `Spryker\Glue\GlueApplication\Plugin\Rest\ServiceProvider` |
| `GlueApplicationServiceProvider` | Registers the pimple plugin, the controller resolver and configures the debug mode in Glue Application. | None | `Spryker\Glue\GlueApplication\Plugin\Rest\ServiceProvider` |
| `SessionApplicationPlugin` | Registers the session services in Glue Application. | None | `Spryker\Glue\Session\Plugin\Application` |
| `GlueServiceProviderPlugin` | Registers the `onKernelController` event listeners in Glue Application. | None | `Spryker\Glue\GlueApplication\Plugin\Rest` |
| `GlueRoutingServiceProvider` | Registers the URL matcher and router services in Glue Application. | None | `Spryker\Glue\GlueApplication\Plugin\Rest\ServiceProvider` |
| `SetStoreCurrentLocaleBeforeActionPlugin` | Sets a locale for the whole current store. | None | `Spryker\Glue\GlueApplication\Plugin\Rest\SetStoreCurrentLocaleBeforeActionPlugin` |
| `EntityTagFormatResponseHeadersPlugin` | Adds the ETag header to the response if applicable. | None | `Spryker\Glue\EntityTagsRestApi\Plugin\GlueApplication\EntityTagFormatResponseHeadersPlugin` |
| `EntityTagRestRequestValidatorPlugin` | Verifies that the `If-Match` header is equal to the entity tag. | None | `Spryker\Glue\EntityTagsRestApi\Plugin\GlueApplication\EntityTagRestRequestValidatorPlugin` |
| `StoresResourceRoutePlugin` | Registers the stores resource. | None | `Spryker\Glue\StoresRestApi\Plugin` |
| `UrlResolverResourceRoutePlugin` | Registers the url-resolver resource. | None | `Spryker\Glue\UrlsRestApi\Plugin\GlueApplication\UrlResolverResourceRoutePlugin` |
| `ProductAbstractRestUrlResolverAttributesTransferProviderPlugin` | Provides the abstract-products resource from the `UrlStorageTransfer` object. | None | `Spryker\Glue\ProductsRestApi\Plugin\UrlsRestApi\ProductAbstractRestUrlResolverAttributesTransferProviderPlugin` |
| `CategoryNodeRestUrlResolverAttributesTransferProviderPlugin`| Provides the category-nodes resource from the `UrlStorageTransfer` object. | None | `Spryker\Glue\CategoriesRestApi\Plugin\UrlsRestApi\CategoryNodeRestUrlResolverAttributesTransferProviderPlugin`|
    
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

```
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

\Pyz\Glue\GlueApplication\GlueApplicationDependencyProvider.php

```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\EventDispatcher\Plugin\Application\EventDispatcherApplicationPlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplication\Plugin\Application\GlueApplicationApplicationPlugin;
use Spryker\Glue\GlueApplication\Plugin\Rest\SetStoreCurrentLocaleBeforeActionPlugin;
use Spryker\Glue\Router\Plugin\Application\RouterApplicationPlugin;
use Spryker\Glue\Session\Plugin\Application\SessionApplicationPlugin;
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
        ];
    }
    
    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        return [
            new SessionApplicationPlugin(),
            new EventDispatcherApplicationPlugin(),
            new GlueApplicationApplicationPlugin(),
            new RouterApplicationPlugin(),
        ];
    }
}
```

\Pyz\Glue\UrlsRestApi\UrlsRestApiDependencyProvider.php

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

src/Pyz/Glue/EntityTagsRestApi/EntityTagsRestApiConfig.php

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
If everything is set up correctly, a request to `http://glue.mysprykershop.com` with the header `[{"key":"Accept-Language","value":"de_DE, de;q=0.9"}]` should result in a response that contains the **content-language** header set to **de_DE**.
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Send a GET request to `http://glue.mysprykershop.com/{% raw %}{{{% endraw %}RESOURCE_NAME{% raw %}}}{% endraw %}/{% raw %}{{{% endraw %}identifier{% raw %}}}{% endraw %} `.</br>Make sure that the response contains the 'ETag' header.</br>Prepare a PATCH request to  `http://glue.mysprykershop.com/{% raw %}{{{% endraw %}RESOURCE_NAME{% raw %}}}{% endraw %}/{% raw %}{{{% endraw %}identitifer{% raw %}}}{% endraw %}`</br>Add the 'If-Match' header with the value of ETag from a GET response header.</br>Add a request body.
{% endinfo_block %}

**Request body**

```json
{
    "data": {
        "type": "RESOURCE_NAME",
        "attributes": {
            "name": "{% raw %}{{{% endraw %}new_name{% raw %}}}{% endraw %}"
        }
    }
}
```

{% info_block warningBox "Verification" %}
Send a request with the specified header and body.</br>Make sure that the returned resource contains the updated 'ETag'.
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Send a GET request to `http://glue.mysprykershop.com/{% raw %}{{{% endraw %}RESOURCE_NAME{% raw %}}}{% endraw %}/{% raw %}{{{% endraw %}identifier{% raw %}}}{% endraw %} `.</br>Make sure that the response contains the 'ETag' header.</br>Prepare a PATCH request to  `http://glue.mysprykershop.com/{% raw %}{{{% endraw %}RESOURCE_NAME{% raw %}}}{% endraw %}/{% raw %}{{{% endraw %}identifier{% raw %}}}{% endraw %}`</br>Add the 'If-Match' header with some random value.</br>Add a request body.
{% endinfo_block %}

**Request body**

```json
{
    "data": {
        "type": "RESOURCE_NAME",
        "attributes": {
            "name": "{% raw %}{{{% endraw %}new_name{% raw %}}}{% endraw %}"
        }
    }
}
```
{% info_block warningBox "Verification" %}
Send a request with the specified header and body.</br>Make sure that the response contains the ETag validation error.
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following endpoint is available:<ul><li>`http://glue.mysprykershop.com/stores`</li></ul>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
To make sure that the `ProductAbstractRestUrlResolverAttributesTransferProviderPlugin` plugin is set up correctly, request the `abstract-products` URL via the `/urls` API endpoint and make sure that you receive the correct resource identifier in the response.
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
To make sure that the `CategoryNodeRestUrlResolverAttributesTransferProviderPlugin` plugin is set up correctly, request the `category` URL via the `/urls` API endpoint and make sure that you receive the correct resource identifier in the response.
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


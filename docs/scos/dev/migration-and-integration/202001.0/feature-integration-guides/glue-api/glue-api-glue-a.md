---
title: Glue API- Glue Application Feature Integration
originalLink: https://documentation.spryker.com/v4/docs/glue-api-glue-application-feature-integration
redirect_from:
  - /v4/docs/glue-api-glue-application-feature-integration
  - /v4/docs/en/glue-api-glue-application-feature-integration
---

Follow the steps below to install Glue application feature API.


### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Type | Version |
| --- | --- | --- |
| Spryker Core | Feature | 202001.0 |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker/glue-application:"^1.0.0" spryker/entity-tags-rest-api:"^1.0.0" spryker/stores-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Make sure that the following modules are installed:)

| Module | Expected Directory |
| --- | --- |
| `GlueApplication` | `vendor/spryker/glue-application` |
| `EntityTagsRestApi` | `vendor/spryker/entity-tag-rest-api` |
| `StoresRestApi` | `vendor/spryker/stores-rest-api` |

### 2) Set Up Configuration
Add the necessary parameters to `config/Shared/config_default.php`:

<details open>
<summary>config/Shared/config_default.php</summary>
    
```bash
$config[GlueApplicationConstants::GLUE_APPLICATION_DOMAIN] = 'http://glue.mysprykershop.com';
$config[GlueApplicationConstants::GLUE_APPLICATION_CORS_ALLOW_ORIGIN] = 'http://glue.mysprykershop.com';
$config[GlueApplicationConstants::GLUE_APPLICATION_REST_DEBUG] = false;
```
    
</br>
</details>

#### Add Global CORS policy

@(Info" %}
`GLUE_APPLICATION_CORS_ALLOW_ORIGIN` should be configured for every domain used in the project.
{% endinfo_block %}

Adjust `config/Shared/config_default.php`:

<details open>
<summary>config/Shared/config_default.ph</summary>
    
```bash
$config[GlueApplicationConstants::GLUE_APPLICATION_CORS_ALLOW_ORIGIN] = 'http://glue.mysprykershop.com';
```
    
</br>
</details>

#### Allow CORS requests to any domain
Adjust `config/Shared/config_default.php`:

<details open>
<summary>config/Shared/config_default.php</summary>

```bash
$config[GlueApplicationConstants::GLUE_APPLICATION_CORS_ALLOW_ORIGIN] = '*';
```
    
</br>
</details>

{% info_block warningBox %}
To make sure the CORS headers are set up correctly, send an `OPTIONS` request to any valid GLUE resource with Origin header `http://glue.mysprykershop.com/` and see the correct JSON response:<ul><li>Verify that the access-control-allow-origin header exists and is the same as set in config</li><li>Verify that the access-control-allow-methods header exists and contains all available methods</li><li>Make POST, PATCH or DELETE request (can choose any of available one
{% endinfo_block %} and verify that response headers are the same</li></ul>)

{% info_block infoBox %}
<ul><li>When the `GlueApplicationConfig::isEagerRelationshipsLoadingEnabled(
{% endinfo_block %}` option is set to "false", no relationship will be loaded, unless they are explicitly specified in the "included" query parameter (e.g. `/abstract-products?include=abstract-product-prices`).</li><li>When the `GlueApplicationConfig::isEagerRelationshipsLoadingEnabled()` option is set to "true", all resource relationships will be loaded by default unless you pass empty "include" query parameter (e.g. `/abstract-products?include=`). If you specify needed relationships in the "included" query parameter, only required relationships will be added to response data.</li></ul>)

### 3) Set Up Transfer Objects
Run the following command to generate transfer objects:

```bash
console transfer:generate
```

{% info_block warningBox %}
Make sure that the following changes have occurred:
{% endinfo_block %}

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `RestPageOffsetsTransfer` | class | created | `src/Generated/Shared/Transfer/RestPageOffsetsTransfer.php` |
| `RestErrorMessageTransfer` | class | created | `src/Generated/Shared/Transfer/RestErrorMessageTransfer.php` |
| `RestErrorCollectionTransfer` | class | created | `src/Generated/Shared/Transfer/RestErrorCollectionTransfer.php` |
| `RestVersionTransfer` | class | created | `src/Generated/Shared/Transfer/RestVersionTransfer.php` |
| `RestUserTransfer` | class | created | `src/Generated/Shared/Transfer/RestUserTransfer.php` |
| `StoresRestAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/StoresRestAttributesTransfer.php` |
| `StoreCountryRestAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/StoreCountryRestAttributesTransfer.php` |
| `StoreRegionRestAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/StoreRegionRestAttributesTransfer.php` |
| `StoreLocaleRestAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/StoreLocaleRestAttributesTransfer.php` |
| `StoreCurrencyRestAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/StoreCurrencyRestAttributesTransfer.php` |

### 4) Set Up Behavior
Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `GlueResourceBuilderService` | Registers the resource builder service in Glue Application. | None | `Spryker\Glue\GlueApplication\Plugin\Rest\ServiceProvider` |
| `GlueApplicationServiceProvider` | Registers the pimple plugin, the controller resolver and configures the debug mode in Glue Application. | None | `Spryker\Glue\GlueApplication\Plugin\Rest\ServiceProvider` |
| `SessionServiceProvider` | Registers session services in Glue Application. | None | `Silex\Provider` |
| `ServiceControllerServiceProvider` | Registers the controller resolver service in Glue Application. | None | `Silex\Provider` |
| `GlueServiceProviderPlugin` | Registers the `onKernelController` event listeners in Glue Application. | None | `Spryker\Glue\GlueApplication\Plugin\Rest` |
| `GlueRoutingServiceProvider` | Registers the URL matcher and router services in Glue Application. | None | `Spryker\Glue\GlueApplication\Plugin\Rest\ServiceProvider` |
| `SetStoreCurrentLocaleBeforeActionPlugin` | Sets a locale for the whole current store. | None | `Spryker\Glue\GlueApplication\Plugin\Rest\SetStoreCurrentLocaleBeforeActionPlugin` |
| `EntityTagFormatResponseHeadersPlugin` | Adds the ETag header to response if applicable. | None | `Spryker\Glue\EntityTagsRestApi\Plugin\GlueApplication\EntityTagFormatResponseHeadersPlugin` |
| `EntityTagRestRequestValidatorPlugin` | Verifies that the `If-Match` header is equal to entity tag. | None | `Spryker\Glue\EntityTagsRestApi\Plugin\GlueApplication\EntityTagRestRequestValidatorPlugin` |
| `StoresResourceRoutePlugin` | Registers the `stores` resource. | None | `Spryker\Glue\StoresRestApi\Plugin` |

<details open>
<summary>src/Pyz/Glue/GlueApplication/Bootstrap/GlueBootstrap.php</summary>
    
```php
<?php
 
namespace Pyz\Glue\GlueApplication\Bootstrap;
 
use Silex\Provider\ServiceControllerServiceProvider;
use Silex\Provider\SessionServiceProvider;
use Spryker\Glue\GlueApplication\Bootstrap\AbstractGlueBootstrap;
use Spryker\Glue\GlueApplication\Plugin\Rest\GlueServiceProviderPlugin;
use Spryker\Glue\GlueApplication\Plugin\Rest\ServiceProvider\GlueApplicationServiceProvider;
use Spryker\Glue\GlueApplication\Plugin\Rest\ServiceProvider\GlueResourceBuilderService;
use Spryker\Glue\GlueApplication\Plugin\Rest\ServiceProvider\GlueRoutingServiceProvider;
 
class GlueBootstrap extends AbstractGlueBootstrap
{
	/**
	* @return void
	*/
	protected function registerServiceProviders(): void
	{
		$this->application
			->register(new GlueResourceBuilderService())
			->register(new GlueApplicationServiceProvider())
			->register(new SessionServiceProvider())
			->register(new ServiceControllerServiceProvider())
			->register(new GlueServiceProviderPlugin())
			->register(new GlueRoutingServiceProvider());
	}
}
```

</br>
</details>

Create a new entry point for Glue Application:

<details open>
<summary>public/Glue/index.php</summary>

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

</br>
</details>

#### Configure web server
Create Nginx VHOST configuration:

<details open>
<summary>/etc/nginx/sites-enabled/DE_development_glue</summary>

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

</br>
</details>

Update hosts configuration by adding the following line (replace IP with your server's IP address):

<details open>
<summary>/etc/hosts</summary>

```
ip glue.mysprykershop.com
```

</br>
</details>

{% info_block warningBox %}
If everything is set up correctly, you should be able to access http://glue.mysprykershop.com and get a correct JSON response as follows:
{% endinfo_block %}

<details open>
<summary>Default JSON Response</summary>

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

</br>
</details>

<details open>
<summary>\Pyz\Glue\GlueApplication\GlueApplicationDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplication\Plugin\Rest\SetStoreCurrentLocaleBeforeActionPlugin;
use Spryker\Glue\StoresRestApi\Plugin\StoresResourceRoutePlugin;
 
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
	/**
	* @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
	*/
	protected function getResourceRoutePlugins(): array
	{
		return [
			new StoresResourceRoutePlugin(),
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
}
```

</br>
</details>

{% info_block infoBox "Hint" %}
Use constant of resource name instead of plain string.
{% endinfo_block %}

<details open>
<summary>src/Pyz/Glue/EntityTagsRestApi/EntityTagsRestApiConfig.php</summary>

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

</br>
</details>

{% info_block warningBox %}
If everything is set up correctly, a request to http://glue.mysprykershop.com with the header `[{"key":"Accept-Language","value":"de_DE, de;q=0.9"}]` should result in a response that contains the content-language header set to de_DE.
{% endinfo_block %}

{% info_block warningBox %}
Send a GET request to `http://glue.mysprykershop.com/{% raw %}{{{% endraw %}RESOURCE_NAME{% raw %}}}{% endraw %}/{% raw %}{{{% endraw %}identifier{% raw %}}}{% endraw %}`. Make sure that the response contains the 'ETag' header.</br>Prepare a PATCH request to `http://glue.mysprykershop.com/{% raw %}{{{% endraw %}RESOURCE_NAME{% raw %}}}{% endraw %}/{% raw %}{{{% endraw %}identitifer{% raw %}}}{% endraw %}`.</br>Add the 'If-Match' header with the value of ETag from the GET response header.</br>Add the request body.
{% endinfo_block %}

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

{% info_block warningBox %}
Send a request with the specified header and body.</br>Make sure that the returned resource contains updated 'ETag'.
{% endinfo_block %}

{% info_block warningBox %}
Send a GET request to `http://glue.mysprykershop.com/{% raw %}{{{% endraw %}RESOURCE_NAME{% raw %}}}{% endraw %}/{% raw %}{{{% endraw %}identifier{% raw %}}}{% endraw %}`.</br>Make sure that the response contains the 'ETag' header.</br>Prepare a PATCH request to `http://glue.mysprykershop.com/{% raw %}{{{% endraw %}RESOURCE_NAME{% raw %}}}{% endraw %}/{% raw %}{{{% endraw %}identifier{% raw %}}}{% endraw %}`.</br>Add the 'If-Match' header with some random value.</br>Add a request body.
{% endinfo_block %}

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

Send a request with the specified header and body.

Make sure that the response contains the ETag validation error.
		
{% info_block warningBox %}
Make sure that the following endpoint is available:</br>http://mysprykershop.com/stores
{% endinfo_block %}


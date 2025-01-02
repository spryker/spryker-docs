---
title: Integrate Zed API
description: Integrate the Zed API into your project
template: feature-integration-guide-template
last_updated: Oct 30, 2023
redirect_from:
  - /docs/scos/dev/feature-integration-guides/202212.0/backend-api-feature-integration.html
  - /docs/scos/dev/technical-enhancement-integration-guides/integrate-zed-api/integrate-zed-api.html
  - /docs/dg/dev/integrate-and-configure/integrate-zed-api/integrate-zed-api.html
---



This document describes how to integrate the Zed API feature into a Spryker project.

## Install feature core

Follow the steps below to install the Zed API feature core.

### Prerequisites

To start feature integration, integrate the required features and Glue APIs:

| NAME    | VERSION    | INSTALLATION GUIDE            |
|---------------| ----------------- |------------------------|
| Spryker Core  | {{site.version}}  | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)  |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/api:"^0.4.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE       | EXPECTED DIRECTORY           |
|--------------|------------------------------|
| Api          | vendor/spryker/api           |
| ApiExtension | vendor/spryker/api-extension |


{% endinfo_block %}

### 2) Set up the configuration

Add the following configuration:

| CONFIGURATION                      | SPECIFICATION                                                                          | NAMESPACE          |
|------------------------------------|----------------------------------------------------------------------------------------|--------------------|
| ApiConstants::ENABLE_API_DEBUG     | Enables the mode when API response is extended with request parameters and stacktrace. | Spryker\Shared\Api |
| ApiConfig::isApiEnabled()          | Enables Zed API.                                                                   | Spryker\Zed\Api    |
| ApiConfig::getAllowedOrigin()      | Defines the CORS Access-Control-Allowed-Origin header.                                 | Spryker\Zed\Api    |
| ApiConfig::getSafeHeaderDataKeys() | Defines allowed headers.                                                               | Spryker\Zed\Api    |
| ApiConfig::getSafeServerDataKeys() | Defines allowed server data keys.                                                      | Spryker\Zed\Api    |

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Api\ApiConstants;

// >>> Debug
$config[ApiConstants::ENABLE_API_DEBUG] = (bool)getenv('SPRYKER_DEBUG_ENABLED');
```

<details>
<summary>src/Pyz/Zed/Api/ApiConfig.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Api;

use Spryker\Zed\Api\ApiConfig as SprykerApiConfig;

class ApiConfig extends SprykerApiConfig
{
    /**
     * @api
     *
     * @return bool
     */
    public function isApiEnabled(): bool
    {
        return true;
    }

    /**
     * @api
     *
     * @return string|null
     */
    public function getAllowedOrigin(): ?string
    {
        return '*';
    }

    /**
     * @return array<string>
     */
    public function getSafeHeaderDataKeys(): array
    {
        return [
            'accept-language',
            'accept-encoding',
            'accept',
            'range',
            'origin',
            'user-agent',
            'upgrade-insecure-requests',
            'cache-control',
            'connection',
            'host',
            'x-request-start',
            'content-length',
            'content-type',
            'x-php-ob-level',
        ];
    }

    /**
     * @return array<string>
     */
    public function getSafeServerDataKeys(): array
    {
        return [
            'VM_DOMAIN',
            'VM_PROJECT',
            'USER',
            'HOME',
            'HTTP_ACCEPT_LANGUAGE',
            'HTTP_ACCEPT_ENCODING',
            'HTTP_ACCEPT',
            'HTTP_USER_AGENT',
            'HTTP_UPGRADE_INSECURE_REQUESTS',
            'HTTP_CACHE_CONTROL',
            'HTTP_CONNECTION',
            'HTTP_HOST',
            'APPLICATION_STORE',
            'APPLICATION_ENV',
            'HTTP_X_REQUEST_START',
            'HTTPS',
            'REDIRECT_STATUS',
            'SERVER_NAME',
            'SERVER_PORT',
            'SERVER_ADDR',
            'REMOTE_PORT',
            'REMOTE_ADDR',
            'SERVER_SOFTWARE',
            'GATEWAY_INTERFACE',
            'SERVER_PROTOCOL',
            'DOCUMENT_ROOT',
            'DOCUMENT_URI',
            'REQUEST_URI',
            'SCRIPT_NAME',
            'SCRIPT_FILENAME',
            'CONTENT_LENGTH',
            'CONTENT_TYPE',
            'REQUEST_METHOD',
            'QUERY_STRING',
            'FCGI_ROLE',
            'PHP_SELF',
            'REQUEST_TIME_FLOAT',
            'REQUEST_TIME',
        ];
    }
}
```
</details>

{% info_block warningBox "Verification" %}

Make sure that Zed API is enabled by accessing any backend API resource.

Make sure that the backend API is extended with request parameters and stacktrace when `ApiConstants::ENABLE_API_DEBUG` is set to `true`.

{% endinfo_block %}


### 3) Set up transfer objects

Generate transfers:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure the following transfers have been created:

| TRANSFER           | TYPE  | EVENT   | PATH                                                         |
|--------------------|-------|---------|--------------------------------------------------------------|
| ApiRequest         | class | created | src/Generated/Shared/Transfer/ApiRequestTransfer.php         |
| ApiResponse        | class | created | src/Generated/Shared/Transfer/ApiResponseTransfer.php        |
| ApiValidationError | class | created | src/Generated/Shared/Transfer/ApiValidationErrorTransfer.php |
| ApiFilter          | class | created | src/Generated/Shared/Transfer/ApiFilterTransfer.php          |
| ApiData            | class | created | src/Generated/Shared/Transfer/ApiDataTransfer.php            |
| ApiPagination      | class | created | src/Generated/Shared/Transfer/ApiPaginationTransfer.php      |
| ApiCollection      | class | created | src/Generated/Shared/Transfer/ApiCollectionTransfer.php      |
| ApiItem            | class | created | src/Generated/Shared/Transfer/ApiItemTransfer.php            |
| ApiOptions         | class | created | src/Generated/Shared/Transfer/ApiOptionsTransfer.php         |
| ApiMeta            | class | created | src/Generated/Shared/Transfer/ApiMetaTransfer.php            |

{% endinfo_block %}

### 4) Set up behavior
Enable the following behaviors by registering the plugins:

| PLUGIN   | SPECIFICATION          | PREREQUISITES | NAMESPACE      |
|--------------------|------------------------|---------------|-------------------------|
| ApiRouterPlugin                                   | Provides `Router` which handles backend API calls.                                                                           |               | Spryker\Zed\Api\Communication\Plugin\Router                 |
| MonitoringRequestTransactionEventDispatcherPlugin | Adds subscriber to listen for controller events.                                                                             |               | Spryker\Zed\Monitoring\Communication\Plugin\EventDispatcher |
| RouterListenerEventDispatcherPlugin               | Adds a `RouteListener` to the `EventDispatcher`.                                                                             |               | Spryker\Zed\Router\Communication\Plugin\EventDispatcher     |
| ResponseListenerEventDispatcherPlugin             | Adds a `ResponseListener` to the `EventDispatcher`.                                                                          |               | Spryker\Shared\Http\Plugin\EventDispatcher                  |
| ApiControllerEventDispatcherPlugin                | Adds a listener for the `KernelEvents::CONTROLLER` event to execute an `ApiController` if current request is an API request. |               | Spryker\Zed\Api\Communication\Plugin\EventDispatcher        |
| AutoloaderCacheEventDispatcherPlugin              | Adds a listener for the `KernelEvents::TERMINATE` event, which will write a class resolver cache.                            |               | Spryker\Zed\Kernel\Communication\Plugin                     |
| ApiRequestTransferFilterHeaderDataPlugin          | Filters out `ApiRequestTransfer` headers that are not specified in `ApiConfig::getSafeHeaderDataKeys()`.                     |               | Spryker\Zed\Api\Communication\Plugin                        |
| ApiRequestTransferFilterServerDataPlugin          | Filters out `ApiRequestTransfer` server data that are not specified in `ApiConfig::getSafeServerDataKeys()`.                 |               | Spryker\Zed\Api\Communication\Plugin                        |

**src/Pyz/Zed/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Router;

use Spryker\Zed\Api\Communication\Plugin\Router\ApiRouterPlugin;
use Spryker\Zed\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\RouterExtension\Dependency\Plugin\RouterPluginInterface>
     */
    protected function getBackendApiRouterPlugins(): array
    {
        return [
            new ApiRouterPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/EventDispatcher/EventDispatcherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\EventDispatcher;

use Spryker\Shared\Http\Plugin\EventDispatcher\ResponseListenerEventDispatcherPlugin;
use Spryker\Zed\Api\Communication\Plugin\EventDispatcher\ApiControllerEventDispatcherPlugin;
use Spryker\Zed\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;
use Spryker\Zed\Kernel\Communication\Plugin\AutoloaderCacheEventDispatcherPlugin;
use Spryker\Zed\Monitoring\Communication\Plugin\EventDispatcher\MonitoringRequestTransactionEventDispatcherPlugin;
use Spryker\Zed\Router\Communication\Plugin\EventDispatcher\RouterListenerEventDispatcherPlugin;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface>
     */
    protected function getBackendApiEventDispatcherPlugins(): array
    {
        return [
            new MonitoringRequestTransactionEventDispatcherPlugin(),
            new RouterListenerEventDispatcherPlugin(),
            new ResponseListenerEventDispatcherPlugin(),
            new ApiControllerEventDispatcherPlugin(),
            new AutoloaderCacheEventDispatcherPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Api/ApiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Api;

use Spryker\Zed\Api\ApiDependencyProvider as SprykerApiDependencyProvider;
use Spryker\Zed\Api\Communication\Plugin\ApiRequestTransferFilterHeaderDataPlugin;
use Spryker\Zed\Api\Communication\Plugin\ApiRequestTransferFilterServerDataPlugin;

class ApiDependencyProvider extends SprykerApiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\Api\Communication\Plugin\ApiRequestTransferFilterPluginInterface>
     */
    protected function getApiRequestTransferFilterPluginCollection(): array
    {
        return [
            new ApiRequestTransferFilterServerDataPlugin(),
            new ApiRequestTransferFilterHeaderDataPlugin(),
        ];
    }
}
```

Create a new entry point for Zed API Application:

**public/BackendApi/index.php**

```php
<?php

use Spryker\Shared\Config\Application\Environment;
use Spryker\Shared\ErrorHandler\ErrorHandlerEnvironment;
use Spryker\Zed\Application\Communication\Bootstrap\BackendApiBootstrap;

define('APPLICATION', 'ZED');
defined('APPLICATION_ROOT_DIR') || define('APPLICATION_ROOT_DIR', dirname(__DIR__, 2));

require_once APPLICATION_ROOT_DIR . '/vendor/autoload.php';

Environment::initialize();

$errorHandlerEnvironment = new ErrorHandlerEnvironment();
$errorHandlerEnvironment->initialize();

$bootstrap = new BackendApiBootstrap();
$bootstrap
    ->boot()
    ->run();
```

#### 5) Configure web server

Create Nginx VHOST configuration:

**/etc/nginx/sites-enabled/DE_development_glue**

```php
<?php

server {
	# Listener for production/staging - requires external LoadBalancer directing traffic to this port
	listen 10001;

	# Listener for testing/development - one host only, doesn't require external LoadBalancer
	listen 80;

	server_name ~^zed-api\\..+\\.com$;

	keepalive_timeout 0;
	access_log  /data/logs/development/zed-api-access.log extended;

	# entry point for Glue Application
	root /data/shop/development/current/public/BackendApi;

	set $application_env development;
	# Binding store
	set $application_store DE;
	include "spryker/zed.conf";
}
```

Update hosts configuration by adding the following line (replace IP with your server's IP address):

**/etc/hosts**

```bash
ip zed-api.mysprykershop.com
```


{% info_block warningBox “Verification” %}

If everything is set up correctly, you should be able to access `http://zed-api.mysprykershop.com`.

{% endinfo_block %}

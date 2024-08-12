---
title: "Decoupled Glue infrastructure: Integrate Storefront and Backend Glue API applications"
description: Integrate the Glue Storefront and Backend API applications into a Spryker project.
last_updated: September 30, 2022
template: feature-integration-guide-template
redirect_from:
  - /docs/scos/dev/feature-integration-guides/202212.0/glue-api/decoupled-glue-infrastructure/glue-api-storefront-and-backend-api-applications-integration.html
  - /docs/scos/dev/feature-integration-guides/202307.0/glue-api/glue-api-glue-storefront-and-backend-api-applications-integration.html
  - /docs/scos/dev/feature-integration-guides/202204.0/glue-api/decoupled-glue-infrastructure/glue-api-glue-storefront-and-backend-api-applications-integration.html
  - /docs/scos/dev/migration-concepts/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-storefront-and-backend-glue-api-applications.html
---

This document describes how to integrate the Glue Storefront and Backend API applications into a Spryker project.

## Install feature core

Follow the steps below to install the Glue Storefront and Backend API applications core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Glue Application | {{page.version}} | [Glue API - Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/glue-storefront-api-application:"^1.0.0" spryker/glue-backend-api-application:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| GlueApplication | vendor/spryker/glue-application |
| GlueStorefrontApiApplication | vendor/spryker/glue-storefront-api-application |
| GlueBackendApiApplication | vendor/spryker/glue-backend-api-application |

{% endinfo_block %}

### 2) Set up the configuration

1. Add the following configuration:

**config/Shared/config\_default.php**

```php
<?php

use Spryker\Shared\GlueBackendApiApplication\GlueBackendApiApplicationConstants;
use Spryker\Shared\GlueStorefrontApiApplication\GlueStorefrontApiApplicationConstants;

// ----------------------------------------------------------------------------
// ------------------------------ Glue Backend API -------------------------------
// ----------------------------------------------------------------------------
$sprykerGlueBackendHost = getenv('SPRYKER_GLUE_BACKEND_HOST');
$config[GlueBackendApiApplicationConstants::GLUE_BACKEND_API_HOST] = $sprykerGlueBackendHost;
$config[GlueBackendApiApplicationConstants::PROJECT_NAMESPACES] = [
    'Pyz',
];

// ----------------------------------------------------------------------------
// ------------------------------ Glue Storefront API -------------------------------
// ----------------------------------------------------------------------------
$sprykerGlueStorefrontHost = getenv('SPRYKER_GLUE_STOREFRONT_HOST');
$config[GlueStorefrontApiApplicationConstants::GLUE_STOREFRONT_API_HOST] = $sprykerGlueStorefrontHost;
```

__src/Pyz/Glue/GlueApplication/Bootstrap/****GlueBackendApiBootstrap****.php__

```php
<?php

namespace Pyz\Glue\GlueApplication\Bootstrap;

use Spryker\Glue\GlueApplication\Bootstrap\GlueBootstrap;
use Spryker\Glue\GlueBackendApiApplication\Plugin\GlueApplication\BackendApiGlueApplicationBootstrapPlugin;
use Spryker\Shared\Application\ApplicationInterface;

class GlueBackendApiBootstrap extends GlueBootstrap
{
    /**
     * @param array $glueApplicationBootstrapPluginClassNames
     *
     * @return \Spryker\Shared\Application\ApplicationInterface
     */
    public function boot(array $glueApplicationBootstrapPluginClassNames = []): ApplicationInterface
    {
        return parent::boot([BackendApiGlueApplicationBootstrapPlugin::class]);
    }
}
```

__src/Pyz/Glue/GlueApplication/Bootstrap/****GlueBootstrap****.php__

```php
<?php

namespace Pyz\Glue\GlueApplication\Bootstrap;

use Spryker\Glue\GlueApplication\Bootstrap\GlueBootstrap as SprykerGlueBootstrap;
use Spryker\Glue\GlueApplication\Plugin\GlueApplication\FallbackStorefrontApiGlueApplicationBootstrapPlugin;
use Spryker\Shared\Application\ApplicationInterface;

class GlueBootstrap extends SprykerGlueBootstrap
{
    /**
     * @param array<string> $glueApplicationBootstrapPluginClassNames
     *
     * @return \Spryker\Shared\Application\ApplicationInterface
     */
    public function boot(array $glueApplicationBootstrapPluginClassNames = []): ApplicationInterface
    {
        return parent::boot([FallbackStorefrontApiGlueApplicationBootstrapPlugin::class]);
    }
}
```

__src/Pyz/Glue/GlueApplication/Bootstrap/****GlueStorefrontApiBootstrap****.php__

```php
<?php

namespace Pyz\Glue\GlueApplication\Bootstrap;

use Spryker\Glue\GlueApplication\Bootstrap\GlueBootstrap;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\StorefrontApiGlueApplicationBootstrapPlugin;
use Spryker\Shared\Application\ApplicationInterface;

class GlueStorefrontApiBootstrap extends GlueBootstrap
{
    /**
     * @param array $glueApplicationBootstrapPluginClassNames
     *
     * @return \Spryker\Shared\Application\ApplicationInterface
     */
    public function boot(array $glueApplicationBootstrapPluginClassNames = []): ApplicationInterface
    {
        return parent::boot([StorefrontApiGlueApplicationBootstrapPlugin::class]);
    }
}
```

**public/GlueBackend/index.php**

```php
<?php

use Pyz\Glue\GlueApplication\Bootstrap\GlueBackendApiBootstrap;
use Spryker\Shared\Config\Application\Environment;
use Spryker\Shared\ErrorHandler\ErrorHandlerEnvironment;

define('APPLICATION', 'GLUE_BACKEND');
defined('APPLICATION_ROOT_DIR') || define('APPLICATION_ROOT_DIR', dirname(__DIR__, 2));

require_once APPLICATION_ROOT_DIR . '/vendor/autoload.php';

Environment::initialize();

$errorHandlerEnvironment = new ErrorHandlerEnvironment();
$errorHandlerEnvironment->initialize();

$bootstrap = new GlueBackendApiBootstrap();
$bootstrap
    ->boot()
    ->run();
```

__public/Glue****/index.****php__

```php
<?php

use Pyz\Glue\GlueApplication\Bootstrap\GlueBootstrap;
use Spryker\Shared\Config\Application\Environment;
use Spryker\Shared\ErrorHandler\ErrorHandlerEnvironment;

define('APPLICATION', 'GLUE');
defined('APPLICATION_ROOT_DIR') || define('APPLICATION_ROOT_DIR', dirname(__DIR__, 2));

require_once APPLICATION_ROOT_DIR . '/vendor/autoload.php';

Environment::initialize();

$errorHandlerEnvironment = new ErrorHandlerEnvironment();
$errorHandlerEnvironment->initialize();

$bootstrap = new GlueBootstrap();
$bootstrap
    ->boot()
    ->run();
```

__public/GlueStorefront****/index.****php__

```php
use Pyz\Glue\GlueApplication\Bootstrap\GlueStorefrontApiBootstrap;
use Spryker\Shared\Config\Application\Environment;
use Spryker\Shared\ErrorHandler\ErrorHandlerEnvironment;

define('APPLICATION', 'GLUE_STOREFRONT');
defined('APPLICATION_ROOT_DIR') || define('APPLICATION_ROOT_DIR', dirname(__DIR__, 2));

require_once APPLICATION_ROOT_DIR . '/vendor/autoload.php';

Environment::initialize();

$errorHandlerEnvironment = new ErrorHandlerEnvironment();
$errorHandlerEnvironment->initialize();

$bootstrap = new GlueStorefrontApiBootstrap();
$bootstrap
    ->boot()
    ->run();
```

__deploy****.yml__

```
groups:
  EU:
    applications:
      glue_eu:
        application: glue
        endpoints:
          glue.de.spryker.local:
              store: DE
      glue_storefront_eu:
        application: glue-storefront
        endpoints:
          glue-storefront.de.spryker.local:
            store: DE
      glue_backend_eu:
        application: glue-backend
        endpoints:
          glue-backend.de.spryker.local:
            store: DE
  US:
    applications:
      glue_us:
        application: glue
        endpoints:
          glue.us.spryker.local:
            store: US
      glue_storefront_us:
        application: glue-storefront
        endpoints:
          glue-storefront.us.spryker.local:
            store: US
      glue_backend_us:
        application: glue-backend
        endpoints:
          glue-backend.us.spryker.local:
            store: US
```

2. Activate your new API:

```bash
docker/sdk boot
docker/sdk up
```

{% info_block warningBox "Verification" %}

Verify that your domains are available: `http://glue-storefront.de.spryker.local`, `http://glue-backend.de.spryker.local`, and `http://glue.de.spryker.local`.

{% endinfo_block %}

### 3) Set up transfer objects

Generate transfers:

```bash
vendor/bin/console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure the following transfers have been created:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| GlueApiContext | class | created | src/Generated/Shared/Transfer/GlueApiContextTransfer.php |
| GlueResponse | class | created | src/Generated/Shared/Transfer/GlueResponseTransfer.php |
| GlueRequest | class | created | src/Generated/Shared/Transfer/GlueRequestTransfer.php |
| GlueRequestValidation | class | created | src/Generated/Shared/Transfer/GlueRequestValidationTransfer.php |
| GlueError | class | created | src/Generated/Shared/Transfer/GlueErrorTransfer.php |
| GlueResource | class | created | src/Generated/Shared/Transfer/GlueResourceTransfer.php |
| GlueResourceMethodCollection | class | created | src/Generated/Shared/Transfer/GlueResourceMethodCollectionTransfer.php |
| GlueResourceMethodConfiguration | class | created | src/Generated/Shared/Transfer/GlueResourceMethodConfigurationTransfer.php |
| GlueVersion | class | created | src/Generated/Shared/Transfer/GlueVersionTransfer.php |
| GlueFilter | class | created | src/Generated/Shared/Transfer/GlueFilterTransfer.php |
| GluePagination | class | created | src/Generated/Shared/Transfer/GluePaginationTransfer.php |
| GlueSparseResource | class | created | src/Generated/Shared/Transfer/GlueSparseResourceTransfer.php |
| Sort | class | created | src/Generated/Shared/Transfer/SortTransfer.php |
| Store | class | created | src/Generated/Shared/Transfer/StoreTransfer.php |

{% endinfo_block %}

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| BackendApiGlueApplicationBootstrapPlugin | Returns the `Application` class responsible for executing the Backend API application. | Spryker\\Glue\\GlueBackendApiApplication\\Plugin\\GlueApplication |
| StorefrontApiGlueApplicationBootstrapPlugin | Returns the `Application` class responsible for executing the Storefront API application. | Spryker\\Glue\\GlueStorefrontApiApplication\\Plugin\\GlueApplication |
| FallbackStorefrontApiGlueApplicationBootstrapPlugin | Returns the `Application` class responsible for executing the Storefront Fallback API application. | Spryker\\Glue\\GlueApplication\\Plugin\\FallbackStorefrontApiGlueApplicationBootstrapPlugin |
| ControllerCacheCollectorConsole | Builds a cache of controller parameters for the API applications controllers. | Spryker\\Glue\\GlueApplication\\Plugin\\Console |
| RouterCacheWarmUpConsole | Builds a Router cache for the ApiApplications. | Spryker\\Glue\\GlueApplication\\Plugin\\Console |
| RouterDebugGlueApplicationConsole | Renders a table with all available routes for specified API Application | Spryker\\Glue\\GlueApplication\\Plugin\\Console |
| ApplicationIdentifierRequestBuilderPlugin | Sets `GlueRequestTransfer::$application` to the correct application. | Spryker\\Glue\\GlueStorefrontApiApplication\\Plugin\\GlueApplication and Spryker\\Glue\\GlueBackendApiApplication\\Plugin\\GlueApplication |
| LocaleRequestBuilderPlugin | Builds `GlueRequestTransfer.locale` from the `accept-language` header for Glue Storefront/Backend API application. | Spryker\\Glue\\GlueBackendApiApplication\\Plugin\\GlueApplication and Spryker\\Glue\\GlueStorefrontApiApplication\\Plugin\\GlueApplication |
| SecurityHeaderResponseFormatterPlugin | Extends `GlueResponseTransfer` with security headers for Glue Storefront/Backend API application. | Spryker\\Glue\\GlueStorefrontApiApplication\\Plugin\\GlueApplication and Spryker\\Glue\\GlueBackendApiApplication\\Plugin\\GlueApplication |
| RequestCorsValidatorPlugin | Validates cors headers for Glue Storefront API application. | Spryker\\Glue\\GlueBackendApiApplication\\Plugin\\GlueApplication and Spryker\\Glue\\GlueStorefrontApiApplication\\Plugin\\GlueApplication |
| CustomRouteRoutesProviderPlugin | Returns the stack of `\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RouteProviderPluginInterface` for the current application. | Spryker\\Glue\\GlueStorefrontApiApplication\\Plugin\\GlueApplication and Spryker\\Glue\\GlueBackendApiApplication\\Plugin\\GlueApplication |
| ResourcesProviderPlugin | Returns the stack of `\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface` for the current application. | Spryker\\Glue\\GlueStorefrontApiApplication\\Plugin\\GlueApplication and Spryker\\Glue\\GlueBackendApiApplication\\Plugin\\GlueApplication |
| StorefrontRouterProviderPlugin | Gets route collection from current Glue Storefront API Application for route debug console command. | Spryker\\Glue\\GlueStorefrontApiApplication\\Plugin\\GlueApplication |
| BackendRouterProviderPlugin | Gets route collection from current Glue Backend API Application for route debug console command. | Spryker\\Glue\\GlueBackendApiApplication\\Plugin\\GlueApplication |
| ControllerCacheCollectorPlugin | Returns controllers configuration for GlueStorefrontApiApplication/GlueBackendApiApplication applications. | Spryker\\Glue\\GlueStorefrontApiApplication\\Plugin\\GlueApplication and Spryker\\Glue\\GlueBackendApiApplication\\Plugin\\GlueApplication |

<details open>
<summary markdown='span'>src/Pyz/Glue/GlueApplication/****GlueApplicationDependencyProvider****.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplication\Plugin\GlueApplication\FallbackStorefrontApiGlueApplicationBootstrapPlugin;
use Spryker\Glue\GlueBackendApiApplication\Plugin\GlueApplication\BackendApiGlueApplicationBootstrapPlugin;
use Spryker\Glue\GlueBackendApiApplication\Plugin\GlueApplication\BackendRouterProviderPlugin;
use Spryker\Glue\GlueBackendApiApplication\Plugin\GlueApplication\ControllerCacheCollectorPlugin as BackendControllerCacheCollectorPlugin;
use Spryker\Glue\GlueBackendApiApplication\Plugin\GlueApplication\CustomRouteRoutesProviderPlugin as BackendCustomRouteRoutesProviderPlugin;
use Spryker\Glue\GlueBackendApiApplication\Plugin\GlueApplication\ResourcesProviderPlugin as BackendResourcesProviderPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueApplication\ControllerCacheCollectorPlugin as StorefrontControllerCacheCollectorPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueApplication\CustomRouteRoutesProviderPlugin as StorefrontCustomRouteRoutesProviderPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueApplication\ResourcesProviderPlugin as StorefrontResourcesProviderPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueApplication\StorefrontApiGlueApplicationBootstrapPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueApplication\StorefrontRouterProviderPlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\GlueApplicationBootstrapPluginInterface>
     */
    protected function getGlueApplicationBootstrapPlugins(): array
    {
        return [
            new StorefrontApiGlueApplicationBootstrapPlugin(),
            new BackendApiGlueApplicationBootstrapPlugin(),
            new FallbackStorefrontApiGlueApplicationBootstrapPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ConventionPluginInterface>
     */
    protected function getConventionPlugins(): array
    {
        return [
            // Wire the conventions your project supports only.
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ControllerCacheCollectorPluginInterface>
     */
    protected function getControllerCacheCollectorPlugins(): array
    {
        return [
            new StorefrontControllerCacheCollectorPlugin(),
            new BackendControllerCacheCollectorPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ApiApplicationEndpointProviderPluginInterface>
     */
    protected function getGlueApplicationRouterProviderPlugins(): array
    {
        return [
            new BackendRouterProviderPlugin(),
            new StorefrontRouterProviderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RoutesProviderPluginInterface>
     */
    protected function getRoutesProviderPlugins(): array
    {
        return [
            new StorefrontCustomRouteRoutesProviderPlugin(),
            new BackendCustomRouteRoutesProviderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourcesProviderPluginInterface>
     */
    protected function getResourcesProviderPlugins(): array
    {
        return [
            new StorefrontResourcesProviderPlugin(),
            new BackendResourcesProviderPlugin(),
        ];
    }
}
```
</details>

**src/Pyz/Glue/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\Console;

use Spryker\Glue\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Glue\GlueApplication\Plugin\Console\ControllerCacheCollectorConsole;
use Spryker\Glue\GlueApplication\Plugin\Console\RouterCacheWarmUpConsole;
use Spryker\Glue\GlueApplication\Plugin\Console\RouterDebugGlueApplicationConsole;
use Spryker\Glue\Kernel\Container;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Glue\Kernel\Container $container
     *
     * @return array<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new ControllerCacheCollectorConsole(),
            new RouterDebugGlueApplicationConsole(),
            new RouterCacheWarmUpConsole(),
        ];
    }
}
```

If the console commands are setup correctly, the following commands are available:
* `vendor/bin/glue glue-api:controller:cache:warm-up`
* `vendor/bin/glue router:debug [application_name]`
* `vendor/bin/glue api:router:cache:warm-up [application_name]`

<details open>
<summary markdown='span'>src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use Spryker\Glue\GlueBackendApiApplication\Plugin\GlueApplication\ApplicationIdentifierRequestBuilderPlugin;
use Spryker\Glue\GlueBackendApiApplication\Plugin\GlueApplication\LocaleRequestBuilderPlugin;
use Spryker\Glue\GlueBackendApiApplication\Plugin\GlueApplication\RequestCorsValidatorPlugin;
use Spryker\Glue\GlueBackendApiApplication\Plugin\GlueApplication\ScopeRequestAfterRoutingValidatorPlugin;
use Spryker\Glue\GlueBackendApiApplication\Plugin\GlueApplication\SecurityHeaderResponseFormatterPlugin;
use Spryker\Glue\OauthBackendApi\Plugin\UserRequestBuilderPlugin;
use Spryker\Zed\Propel\Communication\Plugin\Application\PropelApplicationPlugin;
use Spryker\Glue\GlueBackendApiApplicationAuthorizationConnector\Plugin\GlueBackendApiApplication\AuthorizationRequestAfterRoutingValidatorPlugin;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getApplicationPlugins(): array
    {
        return [
            new PropelApplicationPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestBuilderPluginInterface>
     */
    protected function getRequestBuilderPlugins(): array
    {
        return [
            new ApplicationIdentifierRequestBuilderPlugin(),
            new LocaleRequestBuilderPlugin(),
            new UserRequestBuilderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestValidatorPluginInterface>
     */
    protected function getRequestValidatorPlugins(): array
    {
        return [
            // Wire validators.
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestAfterRoutingValidatorPluginInterface>
     */
    protected function getRequestAfterRoutingValidatorPlugins(): array
    {
        return [
            new RequestCorsValidatorPlugin(),
            new ScopeRequestAfterRoutingValidatorPlugin(),
            new AuthorizationRequestAfterRoutingValidatorPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResponseFormatterPluginInterface>
     */
    protected function getResponseFormatterPlugins(): array
    {
        return [
            new SecurityHeaderResponseFormatterPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface>
     */
    protected function getResourcePlugins(): array
    {
        return [
            // Wire resources.
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProviderPlugins(): array
    {
        return [
            // Wire routes.
        ];
    }
}
```
</details>

<details open>
<summary markdown='span'>src/Pyz/Glue/GlueStorefrontApiApplication/GlueStorefrontApiApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueStorefrontApiApplication;

use Spryker\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider as SprykerGlueStorefrontApiApplicationDependencyProvider;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueApplication\ApplicationIdentifierRequestBuilderPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueApplication\LocaleRequestBuilderPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueApplication\RequestCorsValidatorPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueApplication\ScopeRequestAfterRoutingValidatorPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueApplication\SecurityHeaderResponseFormatterPlugin;
use Spryker\Glue\GlueStorefrontApiApplicationAuthorizationConnector\Plugin\GlueStorefrontApiApplicationAuthorizationConnector\AuthorizationRequestAfterRoutingValidatorPlugin;
use Spryker\Glue\OauthApi\Plugin\CustomerRequestBuilderPlugin;

class GlueStorefrontApiApplicationDependencyProvider extends SprykerGlueStorefrontApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestBuilderPluginInterface>
     */
    protected function getRequestBuilderPlugins(): array
    {
        return [
            new ApplicationIdentifierRequestBuilderPlugin(),
            new LocaleRequestBuilderPlugin(),
            new CustomerRequestBuilderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestValidatorPluginInterface>
     */
    protected function getRequestValidatorPlugins(): array
    {
        return [
            // Wire validators.
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestAfterRoutingValidatorPluginInterface>
     */
    protected function getRequestAfterRoutingValidatorPlugins(): array
    {
        return [
            new RequestCorsValidatorPlugin(),
            new ScopeRequestAfterRoutingValidatorPlugin(),
            new AuthorizationRequestAfterRoutingValidatorPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResponseFormatterPluginInterface>
     */
    protected function getResponseFormatterPlugins(): array
    {
        return [
            new SecurityHeaderResponseFormatterPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface>
     */
    protected function getResourcePlugins(): array
    {
        return [
            // Wire resources.
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProviderPlugins(): array
    {
        return [
            // Wire routes.
        ];
    }
}
```
</details>

If everything is set up correctly, you can access it as follows:
 * Glue Backend API application: `http://glue-backend.mysprykershop.com`.
 * Glue Storefront API application: `http://glue-storefront.mysprykershop.com`.

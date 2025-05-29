---
title: Integrate separate endpoint bootstraps
description: Learn how to enable and integrate sperate endpoint bootstraps into your Spryker based project.
last_updated: Feb 8, 2022
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/separating-different-endpoint-bootstraps
originalArticleId: 9f42f274-0278-4632-8a9f-0279c3ed4675
redirect_from:
  - /docs/scos/dev/technical-enhancement-integration-guides/integrating-separate-endpoint-bootstraps.html
  - /docs/scos/dev/technical-enhancements/separating-different-endpoint-bootstraps.html
---

Gateway and ZedRestApi requests require a different stack of plugins to be processed with. Separation of the application bootstrapping into individual endpoints reduces the number of wired plugins which improves the performance of request processing.

To separate application bootstrapping into individual endpoints, take the following steps:

## 1) Update modules using Composer

Update the required modules:

1. Specify module versions in `composer.json`:

```json
"spryker/application": "3.28.0"
"spryker/event-dispatcher": "1.3.0"
"spryker/monitoring": "2.3.0"
"spryker/router": "1.12.0"
"spryker/session": "4.10.0"
"spryker/twig": "3.15.1"
```

2. Update the modules to the specified versions:

```bash
composer update spryker/twig spryker/session spryker/router spryker/monitoring spryker/event-dispatcher spryker/application
```

## 2) Update modules using npm

Update the required module:

1. Specify the module version in `package.json`:

```json
"@spryker/oryx-for-zed": "~2.11.3"
```

2. Add the copy command `&& node ./node_modules/@spryker/oryx-for-zed/lib/copy.mp` to every `zed` script in the `package.json`, for example:

```json
"zed": "node ./node_modules/@spryker/oryx-for-zed/build && node ./node_modules/@spryker/oryx-for-zed/lib/copy.mp",
"zed:watch": "node ./node_modules/@spryker/oryx-for-zed/build --dev && node ./node_modules/@spryker/oryx-for-zed/lib/copy.mp",
"zed:production": "node ./node_modules/@spryker/oryx-for-zed/build --prod && node ./node_modules/@spryker/oryx-for-zed/lib/copy.mp",
```

3. Update the module to the specified version:

```bash
npm install
```

4. Build zed assets:

```bash
npm run zed
```

## 3) Add application entry points

1. Add the following application entry points:

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

**public/BackendGateway/index.php**

```php
<?php

use Spryker\Shared\Config\Application\Environment;
use Spryker\Shared\ErrorHandler\ErrorHandlerEnvironment;
use Spryker\Zed\Application\Communication\Bootstrap\BackendGatewayBootstrap;

define('APPLICATION', 'ZED');
defined('APPLICATION_ROOT_DIR') || define('APPLICATION_ROOT_DIR', dirname(__DIR__, 2));

require_once APPLICATION_ROOT_DIR . '/vendor/autoload.php';

Environment::initialize();

$errorHandlerEnvironment = new ErrorHandlerEnvironment();
$errorHandlerEnvironment->initialize();

$bootstrap = new BackendGatewayBootstrap();
$bootstrap
    ->boot()
    ->run();
```

**public/Backoffice/index.php**

```php
<?php

use Spryker\Shared\Config\Application\Environment;
use Spryker\Shared\ErrorHandler\ErrorHandlerEnvironment;
use Spryker\Zed\Application\Communication\Bootstrap\BackofficeBootstrap;

require __DIR__ . '/maintenance/maintenance.php';

define('APPLICATION', 'ZED');
defined('APPLICATION_ROOT_DIR') || define('APPLICATION_ROOT_DIR', dirname(__DIR__, 2));

require_once APPLICATION_ROOT_DIR . '/vendor/autoload.php';

Environment::initialize();

$errorHandlerEnvironment = new ErrorHandlerEnvironment();
$errorHandlerEnvironment->initialize();

$bootstrap = new BackofficeBootstrap();
$bootstrap
    ->boot()
    ->run();
```

2. Add the following error pages:

<details><summary>public/Backoffice/errorpage/4xx.html</summary>

```html
<!DOCTYPE html>
<html lang="en-US" xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>Spryker Zed - Error</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <link href="//fonts.googleapis.com/css?family=PT+Mono" rel="stylesheet" type="text/css" />
    </head>
    <style>
        body {
            font-family: 'PT Mono', sans-serif;
        }
        #so-doc {
            margin: 0 auto;
            width: 960px;
        }
    </style>
    <body>
        <div id="so-doc">
            <div>
                <pre>
            THE REQUEST SEEMS TO WRONG AND CANNOT BE PROCESSED!

            W     W      W
            W        W  W     W
            '.  W
            .-""-._     \ \.--|
            /       "-..__) .-'
            |     _         /
            \'-.__,   .__.,'
            `'----'._\--'
            VVVVVVVVVVVVVVVVVVVVV
                </pre>
            </div>
        </div>
    </body>
</html>
```

</details>

<details><summary>public/Backoffice/errorpage/5xx.html</summary>

```html
<!DOCTYPE html>
<html lang="en-US" xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>Spryker Zed - Error</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <link href="//fonts.googleapis.com/css?family=PT+Mono" rel="stylesheet" type="text/css" />
    </head>
    <style>
        body {
            font-family: 'PT Mono', sans-serif;
        }
        #so-doc {
            margin: 0 auto;
            width: 960px;
        }
    </style>
    <body>
        <div id="so-doc">
            <div>
                <pre>
            FAIL WHALE!

            W     W      W
            W        W  W     W
            '.  W
            .-""-._     \ \.--|
            /       "-..__) .-'
            |     _         /
            \'-.__,   .__.,'
            `'----'._\--'
            VVVVVVVVVVVVVVVVVVVVV
                </pre>
            </div>
        </div>
    </body>
</html>
```

</details>

3. Configure a maintenance page:

{% info_block warningBox %}

The maintenance page is not yet compatible with Spryker Cloud.

{% endinfo_block %}

    1. Add the maintenance page:

    **public/Backoffice/maintenance/index.html**

    ```html
        <!DOCTYPE html>
        <html lang="en-US" xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>Spryker Zed - Maintenance</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />
                <link href="http://fonts.googleapis.com/css?family=PT+Mono" rel="stylesheet" type="text/css" />
            </head>
            <style>
                body {
                    font-family: 'PT Mono', sans-serif;
                }
                #so-doc {
                    margin: 0 auto;
                    width: 960px;
                }
            </style>
            <body>
                <div id="so-doc">
                    <div>
                        <pre>
                        PAGE UNDER CONSTRUCTION!

                        Come back in a few minutes...
                        </pre>
                    </div>
                </div>
            </body>
        </html>
    ```

    2. Configure the page you've added in step 1 to be displayed when the error `503` occurs:

    **public/Backoffice/maintenance/maintenance.php**

    ```php
    <?php

    /**
     * Copyright © 2017-present Spryker Systems GmbH. All rights reserved.
     * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
     */

    if (file_exists(__DIR__ . '/maintenance.marker')) {
        http_response_code(503);
        echo file_get_contents(__DIR__ . '/index.html');
        exit(1);
    }
    ```

## 4) Separate application plugin stacks

1. Replace `ApplicationDependencyProvider::getApplicationPlugins();` with separate plugin stacks per endpoint:

- `ApplicationDependencyProvider::getBackofficeApplicationPlugins()`
- `ApplicationDependencyProvider::getBackendGatewayApplicationPlugins()`
- `ApplicationDependencyProvider::getBackendApiApplicationPlugins()`

2. Add the following methods:

<details>
<summary>src/Pyz/Zed/Application/ApplicationDependencyProvider.php</summary>

```php
class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
  /**
    * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
    */
  protected function getBackofficeApplicationPlugins(): array
  {
      $plugins = [
          new SessionApplicationPlugin(),
          new TwigApplicationPlugin(),
          new EventDispatcherApplicationPlugin(),
          new LocaleApplicationPlugin(),
          new TranslatorApplicationPlugin(),
          new MessengerApplicationPlugin(),
          new PropelApplicationPlugin(),
          new BackofficeRouterApplicationPlugin(),
          new HttpApplicationPlugin(),
          new ErrorHandlerApplicationPlugin(),
          new FormApplicationPlugin(),
          new ValidatorApplicationPlugin(),
          new SecurityApplicationPlugin(),
      ];
      if (class_exists(WebProfilerApplicationPlugin::class)) {
          $plugins[] = new WebProfilerApplicationPlugin();
      }

      return $plugins;
  }

  /**
    * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
    */
  protected function getBackendGatewayApplicationPlugins(): array
  {
      return [
          new BackendGatewayEventDispatcherApplicationPlugin(),
          new MockArraySessionApplicationPlugin(),
          new TranslatorApplicationPlugin(),
          new TwigApplicationPlugin(),
          new PropelApplicationPlugin(),
          new BackendGatewayRouterApplicationPlugin(),
          new HttpApplicationPlugin(),
      ];
  }

  /**
    * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
    */
  protected function getBackendApiApplicationPlugins(): array
  {
      return [
          new BackendApiEventDispatcherApplicationPlugin(),
          new LocaleApplicationPlugin(),
          new TranslatorApplicationPlugin(),
          new PropelApplicationPlugin(),
          new BackendApiRouterApplicationPlugin(),
          new HttpApplicationPlugin(),
          new ErrorHandlerApplicationPlugin(),
          new ValidatorApplicationPlugin(),
      ];
  }
}
```

</details>

## 5) Separate event dispatcher plugin stacks

Update `src/Pyz/Zed/EventDispatcher/EventDispatcherDependencyProvider.php` with the following changes:

1. Remove `new GatewayControllerEventDispatcherPlugin()` from `EventDispatcherDependencyProvider::getEventDispatcherPlugins()`.

2. Add the following two methods:

**src/Pyz/Zed/EventDispatcher/EventDispatcherDependencyProvider.php**

```php
class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
  ...

  /**
     * @return \Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface[]
     */
    protected function getBackendGatewayEventDispatcherPlugins(): array
    {
        return [
            new GatewayMonitoringRequestTransactionEventDispatcherPlugin(),
            new GatewayControllerEventDispatcherPlugin(),
            new RouterListenerEventDispatcherPlugin(),
            new ResponseListenerEventDispatcherPlugin(),
            new AutoloaderCacheEventDispatcherPlugin(),
        ];
    }

    /**
     * @return \Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface[]
     */
    protected function getBackendApiEventDispatcherPlugins(): array
    {
        return [
            new MonitoringRequestTransactionEventDispatcherPlugin(),
            new RouterListenerEventDispatcherPlugin(),
            new ResponseListenerEventDispatcherPlugin(),
            new AutoloaderCacheEventDispatcherPlugin(),
        ];
    }
}
```

## 6) Separate router plugin stacks

Replace `RouterDependencyProvider::getRouterPlugins();`  with two new methods:

**src/Pyz/Zed/Router/RouterDependencyProvider.php**

```php
//

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return \Spryker\Zed\RouterExtension\Dependency\Plugin\RouterPluginInterface[]
     */
    protected function getBackendGatewayRouterPlugins(): array
    {
        return [
            new BackendGatewayRouterPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\RouterExtension\Dependency\Plugin\RouterPluginInterface[]
     */
    protected function getBackendApiRouterPlugins(): array
    {
        return [
            new ApiRouterPlugin()
        ];
    }
}
```

## 7) Add console commands

1. Configure the following console commands with a router cache warmup per endpoint:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
//src/Pyz/Zed/Console/ConsoleDependencyProvider.php

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    protected const COMMAND_SEPARATOR = ':';
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Symfony\Component\Console\Command\Command[]
     */
    protected function getConsoleCommands(Container $container): array
    {
        $commands = [
        ...
            new BackofficeRouterCacheWarmUpConsole(),
            new BackendGatewayRouterCacheWarmUpConsole(),
        ...
        ];
    }

  return $commands;
}    
```

You've added the following commands:

- `console router:cache:warm-up:backoffice`
- `console router:cache:warm-up:backend-gateway`

2. Extend the required installation recipes with route cache warmup commands for `backend` and `backend-gateway` applications:

{% info_block infoBox "Location of installation recipes" %}

By default, installation recipes are located in `config/install/`.

{% endinfo_block %}

```yaml
env:
    NEW_RELIC_ENABLED: 0

sections:
    build:
        ...
        router-cache-warmup-backoffice:
            command: 'vendor/bin/console router:cache:warm-up:backoffice'

        router-cache-warmup-backend-gateway:
            command: 'vendor/bin/console router:cache:warm-up:backend-gateway'
        ...
```

## 8) Configure the application

1. Configure the Back Office error page, default port, and the ACL rule for the rest endpoint:

<details>
<summary>config/Shared/config_default.php</summary>

```php
// >>> ERROR HANDLING

$config[ErrorHandlerConstants::YVES_ERROR_PAGE] = APPLICATION_ROOT_DIR . '/public/Yves/errorpage/5xx.html';
$config[ErrorHandlerConstants::ZED_ERROR_PAGE] = APPLICATION_ROOT_DIR . '/public/Backoffice/errorpage/5xx.html';
$config[ErrorHandlerConstants::ERROR_RENDERER] = WebHtmlErrorRenderer::class;

...

$config[ZedRequestConstants::ZED_API_SSL_ENABLED] = (bool)getenv('SPRYKER_ZED_SSL_ENABLED');
$backofficeDefaultPort = $config[ZedRequestConstants::ZED_API_SSL_ENABLED] ? 443 : 80;
$zedPort = ((int)getenv('SPRYKER_ZED_PORT')) ?: $backofficeDefaultPort;
$config[ZedRequestConstants::HOST_ZED_API] = sprintf(
    '%s%s',
    getenv('SPRYKER_ZED_HOST') ?: 'not-configured-host',
    $zedPort !== $backofficeDefaultPort ? ':' . $zedPort : ''
);

...

// ACL: Allow or disallow of urls for Zed Admin GUI for ALL users
$config[AclConstants::ACL_DEFAULT_RULES] = [
    [
        'bundle' => 'security-gui',
        'controller' => '*',
        'action' => '*',
        'type' => 'allow',
    ],
    [
        'bundle' => 'acl',
        'controller' => 'index',
        'action' => 'denied',
        'type' => 'allow',
    ],
    [
        'bundle' => 'health-check',
        'controller' => 'index',
        'action' => 'index',
        'type' => 'allow',
    ],
    [
        'bundle' => 'api',
        'controller' => 'rest',
        'action' => '*',
        'type' => 'allow',
    ],
...
```

</details>

2. To open new entry points for external API systems, add the following paths to `src/Pyz/Zed/SecurityGui/SecurityGuiConfig.php`:

```php
class SecurityGuiConfig extends SprykerSecurityGuiConfig
{
    protected const IGNORABLE_ROUTE_PATTERN = '^/(security-gui|health-check|_profiler/wdt|api/rest/.+)';
}
```

3. Adjust the server configuration of the application according to the added endpoints.

4. To configure your cloud environment to be compatible with separate endpoint bootstraps, [contact us](https://spryker.com/en/support/) and provide the following information:
    - Updated deploy file
    - List of the new endpoints

Make sure to do this at least 5 working days prior to the planned change.


## 9) Update the Docker SDK

1. Update the Docker SDK to version `1.36.1` or higher.
2. In the needed deploy files, replace the `zed` application with `backoffice`, `backend-gateway` and `backend-api` as follows.

<details>
<summary>Example of replacing the application name</summary>

```yaml
// One "zed" application.

...

regions:
   ...

groups:
   EU:
    region: EU
    applications:
      zed_eu:
        application: zed
        endpoints:
          domain-name.local:
            store: DE
...


// Separated endpoints: "backoffice", "backend-gateway" and "backend-api".

...

regions:
   ...

groups:
   EU:
    region: EU
    applications:
      backoffice_eu:
        application: backoffice
        endpoints:
          backoffice.domain-name.local:
            store: DE
          ...  
      backend-gateway_eu:
        application: backend-gateway  
        endpoints:
          backend-gateway.de.spryker.local:
            store: DE
            primal: true  
          ...
      backend_api_eu:
        application: zed
        endpoints:
          backend-api.de.spryker.local:
            store: DE
            entry-point: BackendApi      
...
```

</details>

1. Update the hosts file by running the `docker/sdk boot {deploy_file}` or `docker/sdk install` command and following the instructions in the output.

2. Run the application:

```bash
docker/sdk up --build
```

---
title: Setting up New Relic for Monitoring
last_updated: Oct 14, 2022
template: howto-guide-template
---

## Introduction

New Relic's application performance monitoring (APM) provides a unified monitoring service for all of your applications and microservices. You can monitor everything from the hundreds of dependencies of a modern stack down to simple web-transaction times and throughput of an app. Using New Relic, you can also keep track of an applications's health in real-time by monitoring your metrics, events, logs, and transactions (MELT) through pre-built and custom dashboards.

By using the extensions configured for use with Spryker, you can have every request automatically logged by New Relic. The name of the requests will be the name of the used route for Yves and the `[module]/[controller]/[action]` for Zed. Also, URL request and the host can be stored as custom parameters for each request.

## Prerequisites

* Access to New Relic
* A New Relic API key.

For help with creating an API key with New Relic, please refer to the following documentation: [New Relic API keys](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/)

## Setting up the New Relic module.

Through the Spryker-ECO respository, you can find a the [Spryker new-relic module](https://github.com/spryker-eco/new-relic) which can be integrated with your Spryker eCommerce shop. New Relic can be set up in your project by including this module and applying additional changes to connect  the two together. You can find this module available ready-to-use in our [Spryker B2B Demo Shop](https://github.com/spryker-shop/b2b-demo-shop).

To ensure that its installation, you can follow these steps:

1. Add the module to your `composer.json` file with the following command:

```bash
composer require spryker-eco/new-relic
```

2. To enable the extension for New Relic in your PHP image, update your deploy file to toggle New Relic and apply your API key:

```yaml
environment: docker.dev
image:
    php:
        enabled-extensions:
            - newrelic

...

docker:

    newrelic:
        license: API_KEY_HERE
        distributed tracing:
            enabled: true
```

3. Bootstrap your environment and then bring your environment up:

```bash
docker/sdk boot deploy.*.yml
docker/sdk up
```

Once your application has rebuilt, you will now be able to access its metrics and data as an APM in the New Relic dashboard.

### Optional: Making New Relic transactions names unique

By default, New Relic transactions are created with the same name: `index.php`. To make transaction names readable, we implemented an application plugin, which sets transaction names by the pattern: `{{AplicationName}}:{{RequestMethod}}{{RequestUri}}`.

To use the transaction plugin, add it to the application dependency providers:

**Yves**: 
**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**
```php
<?php
namespace Pyz\Yves\ShopApplication;
...
use SprykerEco\Service\NewRelic\Plugin\NewRelicTransactionNameHandlerPlugin;
...
class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    ...
    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        $plugins = [
            ...
            new NewRelicTransactionNameHandlerPlugin(),
        ];
        ...
        return $plugins;
    }
}
```

**Glue**:
**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**
```php
<?php
namespace Pyz\Glue\GlueApplication;
...
use SprykerEco\Service\NewRelic\Plugin\NewRelicTransactionNameHandlerPlugin;
...
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    ...
    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        $plugins = [
            ...
            new NewRelicTransactionNameHandlerPlugin(),
        ];
        ...
        return $plugins;
    }
}
```

**Backoffice**:
**src/Pyz/Zed/Application/ApplicationDependencyProvider.php**
```php
<?php
namespace Pyz\Zed\Application;
...
use SprykerEco\Service\NewRelic\Plugin\NewRelicTransactionNameHandlerPlugin;
...
class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
    ...
    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getBackofficeApplicationPlugins(): array
    {
        $plugins = [
            ...
            new NewRelicTransactionNameHandlerPlugin(),
        ];
        ...
        return $plugins;
    }
}
```

**BackendGateway**:
**src/Pyz/Zed/Application/ApplicationDependencyProvider.php**
```php
<?php
namespace Pyz\Zed\Application;
...
use SprykerEco\Service\NewRelic\Plugin\NewRelicTransactionNameHandlerPlugin;
...
class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
    ...
    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getBackendGatewayApplicationPlugins(): array
    {
        $plugins = [
            ...
            new NewRelicTransactionNameHandlerPlugin(),
        ];
        ...
        return $plugins;
    }
}
```

**BackendApi**:
**src/Pyz/Zed/Application/ApplicationDependencyProvider.php**
```php
<?php
namespace Pyz\Zed\Application;
...
use SprykerEco\Service\NewRelic\Plugin\NewRelicTransactionNameHandlerPlugin;
...
class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
    ...
    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getBackendApiApplicationPlugins(): array
    {
        $plugins = [
            ...
            new NewRelicTransactionNameHandlerPlugin(),
        ];
        ...
        return $plugins;
    }
}
```

#### Help! My transactions aren't showing up as unique names!

If you encounter an error where your transaction names are still showing as something like `index.php`, you may need to make additional changes to the `spryker-eco/new-relic` module. This requires modifying and reconfiguring pieces of the module.

1. Create a new configuration file for the New Relic plugin.

**NewRelicConfig**:
**src/SprykerEco/Service/NewRelic/NewRelicConfig.php**
```php
<?php

namespace SprykerEco\Service\NewRelic;

use Spryker\Service\Kernel\AbstractBundleConfig;

class NewRelicConfig extends AbstractBundleConfig
{
    /**
     * @return string
     */
    public function getDefaultTransactionName(): string
    {
        return APPLICATION . ':' . $_SERVER['REQUEST_METHOD'] . (strtok($_SERVER['REQUEST_URI'], '?') ?: '/');
    }
}
```

2. Create a service to help facilitate functionality for New Relic.

**NewRelicService**:
**src/SprykerEco/Service/NewRelic/NewRelicService.php**
```php
<?php

namespace SprykerEco\Service\NewRelic;

use Spryker\Service\Kernel\AbstractService;

class NewRelicService extends AbstractService implements NewRelicServiceInterface
{
    protected const EXTENSION_NAME = 'newrelic';

    /**
     * @var string
     */
    protected $application;

    /**
     * @var bool
     */
    protected $isActive;

    public function __construct()
    {
        $this->isActive = extension_loaded(static::EXTENSION_NAME);
    }

    /**
     * @param string $message
     * @param \Exception|\Throwable $exception
     *
     * @return void
     */
    public function setError(string $message, $exception): void
    {
        if (!$this->isActive) {
            return;
        }

        newrelic_notice_error($message, $exception);
    }

    /**
     * @param string|null $application
     * @param string|null $store
     * @param string|null $environment
     *
     * @return void
     */
    public function setApplicationName(?string $application = null, ?string $store = null, ?string $environment = null): void
    {
        if (!$this->isActive) {
            return;
        }

        $this->application = $application . '-' . $store . ' (' . $environment . ')';

        newrelic_set_appname($this->application, null, false);
    }

    /**
     * @param string $name
     *
     * @return void
     */
    public function setTransactionName(string $name): void
    {
        if (!$this->isActive) {
            return;
        }

        newrelic_name_transaction($name);
    }

    /**
     * @return void
     */
    public function markStartTransaction(): void
    {
        if (!$this->isActive) {
            return;
        }

        newrelic_start_transaction($this->application);
    }

    /**
     * @return void
     */
    public function markEndOfTransaction(): void
    {
        if (!$this->isActive) {
            return;
        }

        newrelic_end_transaction();
    }

    /**
     * @return void
     */
    public function markIgnoreTransaction(): void
    {
        if (!$this->isActive) {
            return;
        }

        newrelic_ignore_apdex();
        newrelic_ignore_transaction();
    }

    /**
     * @return void
     */
    public function markAsConsoleCommand(): void
    {
        if (!$this->isActive) {
            return;
        }

        newrelic_background_job(true);
    }

    /**
     * @param string $key
     * @param mixed $value
     *
     * @return void
     */
    public function addCustomParameter(string $key, $value): void
    {
        if (!$this->isActive) {
            return;
        }

        newrelic_add_custom_parameter($key, $value);
    }

    /**
     * @param string $tracer
     *
     * @return void
     */
    public function addCustomTracer(string $tracer): void
    {
        if (!$this->isActive) {
            return;
        }

        newrelic_add_custom_tracer($tracer);
    }
}
```

3. Create an interface for the New Relic service.

**NewRelicServiceInterface**:
**src/SprykerEco/Service/NewRelic/NewRelicServiceInterface.php**
```php
<?php

namespace SprykerEco\Service\NewRelic;

interface NewRelicServiceInterface
{
    /**
     * @param string $message
     * @param \Exception|\Throwable $exception
     *
     * @return void
     */
    public function setError(string $message, $exception): void;

    /**
     * @param string|null $application
     * @param string|null $store
     * @param string|null $environment
     *
     * @return void
     */
    public function setApplicationName(?string $application = null, ?string $store = null, ?string $environment = null): void;

    /**
     * @param string $name
     *
     * @return void
     */
    public function setTransactionName(string $name): void;

    /**
     * @return void
     */
    public function markStartTransaction(): void;

    /**
     * @return void
     */
    public function markEndOfTransaction(): void;

    /**
     * @return void
     */
    public function markIgnoreTransaction(): void;

    /**
     * @return void
     */
    public function markAsConsoleCommand(): void;

    /**
     * @param string $key
     * @param mixed $value
     *
     * @return void
     */
    public function addCustomParameter(string $key, $value): void;

    /**
     * @param string $tracer
     *
     * @return void
     */
    public function addCustomTracer(string $tracer): void;
}
```

4. Update the `NewRelicMonitoringExtensionPlugin`. Here, we will be changing the file itself, removing some things and adding others. The primary change is the functioning of the class itself, using `AbstractPlugin` to extend the monitoring plugin.

**NewRelicMonitoringExtensionPlugin**:
**src/SprykerEco/Service/NewRelic/Plugin/NewRelicMonitoringExtensionPlugin.php**
```php
<?php

/**
 * MIT License
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace SprykerEco\Service\NewRelic\Plugin;

use Spryker\Service\Kernel\AbstractPlugin;
use Spryker\Service\MonitoringExtension\Dependency\Plugin\MonitoringExtensionPluginInterface;

/**
 * @method \SprykerEco\Service\NewRelic\NewRelicServiceInterface getService()
 */
class NewRelicMonitoringExtensionPlugin extends AbstractPlugin implements MonitoringExtensionPluginInterface
{
    /**
     * @param string $message
     * @param \Exception|\Throwable $exception
     *
     * @return void
     */
    public function setError(string $message, $exception): void
    {
        $this->getService()->setError($message, $exception);
    }

    /**
     * @param string|null $application
     * @param string|null $store
     * @param string|null $environment
     *
     * @return void
     */
    public function setApplicationName(?string $application = null, ?string $store = null, ?string $environment = null): void
    {
        $this->getService()->setApplicationName($application, $store, $environment);
    }

    /**
     * @param string $name
     *
     * @return void
     */
    public function setTransactionName(string $name): void
    {
        $this->getService()->setTransactionName($name);
    }

    /**
     * @return void
     */
    public function markStartTransaction(): void
    {
        $this->getService()->markStartTransaction();
    }

    /**
     * @return void
     */
    public function markEndOfTransaction(): void
    {
        $this->getService()->markEndOfTransaction();
    }

    /**
     * @return void
     */
    public function markIgnoreTransaction(): void
    {
        $this->getService()->markIgnoreTransaction();
    }

    /**
     * @return void
     */
    public function markAsConsoleCommand(): void
    {
        $this->getService()->markAsConsoleCommand();
    }

    /**
     * @param string $key
     * @param mixed $value
     *
     * @return void
     */
    public function addCustomParameter(string $key, $value): void
    {
        $this->getService()->addCustomParameter($key, $value);
    }

    /**
     * @param string $tracer
     *
     * @return void
     */
    public function addCustomTracer(string $tracer): void
    {
        $this->getService()->addCustomTracer($tracer);
    }
}

```

5. Add a plugin which will be used to handle the New Relic transaction names.

**NewRelicTransactionNameHandlerPlugin**:
**src/SprykerEco/Service/NewRelic/Plugin/NewRelicTransactionNameHandlerPlugin.php**
```php
<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace SprykerEco\Service\NewRelic\Plugin;

use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface;
use Spryker\Shared\ApplicationExtension\Dependency\Plugin\BootableApplicationPluginInterface;
use Spryker\Service\Kernel\AbstractPlugin;

/**
 * @method \SprykerEco\Service\NewRelic\NewRelicServiceInterface getService()
 * @method \SprykerEco\Service\NewRelic\NewRelicConfig getConfig()
 */
class NewRelicTransactionNameHandlerPlugin extends AbstractPlugin implements ApplicationPluginInterface, BootableApplicationPluginInterface
{
    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    public function provide(ContainerInterface $container): ContainerInterface
    {
        return $container;
    }

    /**
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Spryker\Service\Container\ContainerInterface
     */
    public function boot(ContainerInterface $container): ContainerInterface
    {
        $this->getService()
            ->setTransactionName($this->getConfig()->getDefaultTransactionName());

        return $container;
    }
}
```

Once these changes have been implemented, your transaction names should begin to show as `{{AplicationName}}:{{RequestMethod}}{{RequestUri}}`. If you wish to change how these transactions URIs look, you can adjust `getDefaultTransactionName()` in `src/SprykerEco/Service/NewRelic/NewRelicConfig.php`.

### Optional: Separating the New Relic APM into Yves, Zed, etc with Deployment Logging

To be able to use the deployment recording feature of New Relic, you need to add your `api_key` and `deployment_api_url` to the project config. The API key is generated in your New Relic account. Open your account settings in New Relic and enable the API Access on the Data Sharing page. Once done, you’ll get your API key. For more details, view the API Explorer page. Your project configuration can be found in `/config/Shared`.



```yaml
$config[\SprykerEco\Shared\NewRelic\NewRelicEnv::NEW_RELIC_API_KEY] = 'YOUR_API_KEY';
$config[\SprykerEco\Shared\NewRelic\NewRelicEnv::NEW_RELIC_DEPLOYMENT_API_URL] = 'NEW_RELIC_DEPLOYMENT_API_URL';
```

The NEW_RELIC_DEPLOYMENT_API_URL can be retrieved from the official documentation about [Record Deployment](https://docs.newrelic.com/docs/apm/new-relic-apm/maintenance/record-deployments). It should contain the environment application id you want to register the deployment for.

For example: `https://api.newrelic.com/v2/applications/12345/deployments.json`

However, the latest version (1.1.0)  of the module allows passing a list of IDs in order to be able to record multiple deployments (i.e. Yves and Zed for different stores) at once. In that case, the config has to be modified using the %s as a placeholder in the deployment URL:

```yaml
$config[\SprykerEco\Shared\NewRelic\NewRelicEnv::NEW_RELIC_DEPLOYMENT_API_URL] =
    'https://api.newrelic.com/v2/applications/%s/deployments.json';
$config[\SprykerEco\Shared\NewRelic\NewRelicEnv::NEW_RELIC_APPLICATION_ID_ARRAY] = [
    'yves_de'   => '12345',
    'zed_de'    => '12346',
    'yves_us'   => '12347',
    'zed_us'    => '12348',
];
```

This will make it possible for your configuration to use New Relic's deployment functionality. You can now bootstrap your deploy file again and rebuild your application. You can also access the New Relic record deployment through CLI with `vendor/bin/console newrelic:record-deployment`.

---
title: Create Glue API applications
description: This document describes how to create a new API application
last_updated: September 30, 2022
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/create-api-application.html
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/how-to-create-api-applications.html
  - /docs/scos/dev/glue-api-guides/202212.0/decoupled-glue-infrastructure/create-glue-api-applications.html
  - /docs/scos/dev/glue-api-guides/202204.0/decoupled-glue-infrastructure/create-glue-api-applications.html
  - /docs/scos/dev/glue-api-guides/202404.0/create-glue-api-applications.html

---

New Glue projects can create API applications. This is what you need to do in order to create one.


Because the backend and storefront APIs have different sets of configured services, they also have different settings in Docker and different containers. Ensure your `deploy.yml` file contains the correct setting for `application`. The available options are listed in the following table:

| OPTION | MEANING |
| --- | --- |
| `glue` | Old application value. For the new APIs, choose one of the following options. |
| `glue-storefront` | Application that has access to the following: <ul><li>key, value, store</li><li>search</li><li>Zed via RPC call</li></ul>.   |
| `glue-backend` | Application that has access to the following: <ul><li>database</li><li>broker</li><li>key, value, store</li><li>session</li><li>search</li></ul> |

**deploy.yml**

```yml
groups:
    US:
        applications:
           ...
           glue_storefront:
                application: glue-storefront
                endpoints:
                    glue-storefront.us.spryker.local:
                        store: US
                        entry-point: CustomApi
            glue_backend:
                application: glue-backend
                endpoints:
                    glue-backend.us.spryker.local:
                        store: US
                        entry-point: BackendCustomApi
```

1. Activate your new API:

```bash
docker/sdk boot
docker/sdk up
```

2. Verify that your domain is now available: `https://storefront.mysprykershop.com`.
3. Create an entry point for your new API: `public/CustomApi/index.php`.

```php
<?php

use Pyz\Glue\CustomApiApplication\Bootstrap\GlueCustomApiBootstrap;
use Spryker\Shared\Config\Application\Environment;
use Spryker\Shared\ErrorHandler\ErrorHandlerEnvironment;

define('APPLICATION', 'GLUE_CUSTOM');
defined('APPLICATION_ROOT_DIR') || define('APPLICATION_ROOT_DIR', dirname(__DIR__, 2));

require_once APPLICATION_ROOT_DIR . '/vendor/autoload.php';

Environment::initialize();

$errorHandlerEnvironment = new ErrorHandlerEnvironment();
$errorHandlerEnvironment->initialize();

$bootstrap = new GlueCustomApiBootstrap();
$bootstrap
    ->boot()
    ->run();

```

*Line 7* defines `APPLICATION`, a constant reused across Spryker.

*Line 17* has `GlueCustomApiBootstrap`, a bootstrap the application must use. You create it in the next step.

4. Create the bootstrap to serve your application:

**src/Pyz/Glue/CustomApiApplication/Bootstrap/GlueCustomApiBootstrap.php**

```php
<?php

namespace Pyz\Glue\CustomApiApplication\Bootstrap;

use Pyz\Glue\CustomApiApplication\Plugin\CustomApiGlueApplicationBootstrapPlugin;
use Spryker\Glue\GlueApplication\Bootstrap\GlueBootstrap;
use Spryker\Shared\Application\ApplicationInterface;

class GlueCustomApiBootstrap extends GlueBootstrap
{
    /**
     * @param array<string> $glueApplicationBootstrapPluginClassNames
     *
     * @return \Spryker\Shared\Application\ApplicationInterface
     */
    public function boot(array $glueApplicationBootstrapPluginClassNames = []): ApplicationInterface
    {
        return parent::boot([CustomApiGlueApplicationBootstrapPlugin::class]);
    }
}

```

**src/Pyz/Glue/CustomApiApplication/Plugin/CustomApiGlueApplicationBootstrapPlugin.php**

```php
<?php

namespace Pyz\Glue\CustomApiApplication\Plugin;

use Generated\Shared\Transfer\GlueApiContextTransfer;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\GlueApplicationBootstrapPluginInterface;
use Spryker\Glue\Kernel\AbstractPlugin;
use Spryker\Shared\Application\ApplicationInterface;

class CustomApiGlueApplicationBootstrapPlugin extends AbstractPlugin implements GlueApplicationBootstrapPluginInterface
{
    public function isServing(GlueApiContextTransfer $glueApiContextTransfer): bool
    {
        return APPLICATION === 'GLUE_CUSTOM';
    }

    public function getApplication(): ApplicationInterface
    {
        return $this->getFactory()->createCustomApiApplication();
    }
}
```

*Line 19* creates an instance of `ApplicationInterface`, which can take an array of `ApplicationPluginInterface`. You can add features like DB access using these plugins.

In the factory, the constructor looks like this:

<details>
<summary markdown='span'>src/Pyz/Glue/CustomApiApplication/CustomApiApplicationFactory.php</summary>

```php
<?php

namespace Pyz\Glue\CustomApiApplication;

use Pyz\Glue\CustomApiApplication\Application\CustomApiApplication;
use Spryker\Glue\Kernel\AbstractFactory;
use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\Application\ApplicationInterface;
use Spryker\Shared\Kernel\Container\ContainerProxy;

class CustomApiApplicationFactory extends AbstractFactory
{
    /**
     * @return \Spryker\Shared\Application\ApplicationInterface
     */
    public function createCustomApiApplication(): ApplicationInterface
    {
        return new CustomApiApplication(
            $this->createServiceContainer(),
            $this->getApplicationPlugins(),
        );
    }

    /**
     * @return \Spryker\Service\Container\ContainerInterface
     */
    public function createServiceContainer(): ContainerInterface
    {
        return new ContainerProxy(['logger' => null, 'debug' => $this->getConfig()->isDebugModeEnabled(), 'charset' => 'UTF-8']);
    }

    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    public function getApplicationPlugins(): array
    {
        return $this->getProvidedDependency(CustomApiApplicationDependencyProvider::PLUGINS_APPLICATION);
    }
}
```
</details>

The dependency provider looks like this:

<details><summary markdown='span'>src/Pyz/Glue/CustomApiApplication/CustomApiApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\CustomApiApplication;

use Spryker\Glue\Kernel\AbstractBundleDependencyProvider;
use Spryker\Glue\Kernel\Container;

class CustomApiApplicationDependencyProvider extends AbstractBundleDependencyProvider
{
    public const PLUGINS_APPLICATION = 'PLUGINS_APPLICATION';

    /**
     * @param \Spryker\Glue\Kernel\Container $container
     *
     * @return \Spryker\Glue\Kernel\Container
     */
    public function provideDependencies(Container $container): Container
    {
        $container = parent::provideDependencies($container);
        $container = $this->addApplicationPlugins($container);

        return $container;
    }

    /**
     * @param \Spryker\Glue\Kernel\Container $container
     *
     * @return \Spryker\Glue\Kernel\Container
     */
    protected function addApplicationPlugins(Container $container): Container
    {
        $container->set(static::PLUGINS_APPLICATION, function () {
            return $this->getApplicationPlugins();
        });

        return $container;
    }

    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getApplicationPlugins(): array
    {
        return [];
    }
}
```
</details>

The following example is what the `Application` can look like:

<details><summary markdown='span'>src/Pyz/Glue/CustomApiApplication/Application/CustomApiApplication.php</summary>

```php
<?php

namespace Spryker\Glue\GlueStorefrontApiApplication\Application;

use Spryker\Client\Session\SessionClient;
use Spryker\Glue\GlueApplication\ApiApplication\Type\RequestFlowAwareApiApplication;
use Spryker\Glue\GlueApplication\Session\Storage\MockArraySessionStorage;
use Spryker\Shared\Application\ApplicationInterface;
use Symfony\Component\HttpFoundation\Session\Session;

/**
 * @method \Spryker\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationFactory getFactory()
 */
class GlueStorefrontApiApplication extends RequestFlowAwareApiApplication
{
    /**
     * @return \Spryker\Shared\Application\ApplicationInterface
     */
    public function boot(): ApplicationInterface
    {
        return parent::boot();
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestBuilderPluginInterface>
     */
    public function provideRequestBuilderPlugins(): array
    {
        return $this->getFactory()->getRequestBuilderPlugins();
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestValidatorPluginInterface>
     */
    public function provideRequestValidatorPlugins(): array
    {
        return $this->getFactory()->getRequestValidatorPlugins();
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestAfterRoutingValidatorPluginInterface>
     */
    public function provideRequestAfterRoutingValidatorPlugins(): array
    {
        return $this->getFactory()->getRequestAfterRoutingValidatorPlugins();
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResponseFormatterPluginInterface>
     */
    public function provideResponseFormatterPlugins(): array
    {
        return $this->getFactory()->getResponseFormatterPlugins();
    }

}
```
</details>

Each method in `CustomApiApplication` represents a step in the API application request flow. It can be used as an extension point in each of the steps.

This application extends `RequestFlowAwareApiApplication`, which means that this API application follows the default Glue workflow. This is beneficial because it lets you make use the most of the Spryker conventions and features that wire into the request flow.

If your API uses its own workflow, you can opt for extending `RequestFlowAgnosticApiApplication`. This kind of application has everything—a separate set of application plugins, boot, and run methods—but not the request flow actions. The application that follows the `RequestFlowAgnosticApiApplication` extension is the old Glue storefront API application. It is request-agnostic and creates and follows its own request flow. Here is an example of the application:

**src/Pyz/Glue/CustomApiApplication/Application/CustomApiApplication.php**

```php
<?php

namespace Pyz\Glue\CustomApiApplication\Application;

use Spryker\Glue\GlueApplication\ApiApplication\Type\RequestFlowAgnosticApiApplication;
use Spryker\Shared\Application\ApplicationInterface;

class CustomApiApplication extends RequestFlowAgnosticApiApplication
{
    /**
     * @return \Spryker\Shared\Application\ApplicationInterface
     */
    public function boot(): ApplicationInterface
    {
        return parent::boot();
    }

    /**
     * @return void
     */
    public function run(): void
    {
        // run can execute any logic.
        parent::run();
    }
}
```

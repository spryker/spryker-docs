---
title: How to create a new API application
description: 
last_updated: September 30, 2022
template: howto-guide-template
---
The new Glue projects have the possibility to create API applications. This is what you need to do in order to create one.

### Docker configuration

First of all, the backend and storefront API have different settings in docker (they have different sets of services configured for them). Make sure your `deploy.yml` contains the correct setting for the `application`. Available options are:

|     |     |
| --- | --- |
| **Option** | **Meaning** |
| `glue` | Old application value. For the new APIs please choose one of the options below. |
| `glue-storefront` | Application that has access to:<br><br>*   key\_value\_store<br>    <br>*   search |
| `glue-backend` | Application that has access to:<br><br>*   database<br>    <br>*   broker<br>    <br>*   key\_value\_store<br>    <br>*   session<br>    <br>*   search |

**deploy.yml**
```
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
To activate your new API, run the following commands:

```
docker/sdk boot
docker/sdk up
```

Verify that your domain is now available: `http://storefront.de.spryker.local`.

* * *

Create an entry point for your new API: `public/CustomApi/index.php`

```
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

Line 7 defines the `APPLICATION`, constant reused across Spryker.

Line 17 has the `GlueCustomApiBootstrap`, a bootstrap the application should use. We create it in the next step.

Create the bootstrap to serve your application: `src/Pyz/Glue/CustomApiApplication/Bootstrap/GlueCustomApiBootstrap.php`

```
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
`src/Pyz/Glue/CustomApiApplication/Plugin/CustomApiGlueApplicationBootstrapPlugin.php` 

```
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

Line 19 must create an instance of the `ApplicationInterface`, which can take and array of `ApplicationPluginInterface`. You can add features like DB access via these plugins.

Its constructor will look like this in the factory: `src/Pyz/Glue/CustomApiApplication/CustomApiApplicationFactory.php`
```
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
Here is the dependency provider: `src/Pyz/Glue/CustomApiApplication/CustomApiApplicationDependencyProvider.php`

```
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

Here is what the `Application` can look like: `src/Pyz/Glue/CustomApiApplication/Application/CustomApiApplication.php`

```
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

Each method in the `CustomApiApplication` represents a step in the API application request flow. It can be used is an extension point into each of the steps.

This application extends `RequestFlowAwareApiApplication` which means that this API application will follow the default Glue workflow. This is beneficial because it allows making the most use of the conventions and features in Spryker that wire into the request flow.

If your API uses its own workflow you can opt for extending `RequestFlowAgnosticApiApplication`. This kind of application will have everything (separate set of application plugins, boot and run methods) but not the request flow actions. One of these is the old Glue application. Here is an example of the application: `src/Pyz/Glue/CustomApiApplication/Application/CustomApiApplication.php`
```
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

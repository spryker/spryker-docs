---
title: Create API applications
description: This document describes how to create a new API application
last_updated: Sep 21, 2025
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/create-api-application.html
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/how-to-create-api-applications.html
  - /docs/scos/dev/glue-api-guides/202212.0/decoupled-glue-infrastructure/create-glue-api-applications.html
  - /docs/scos/dev/glue-api-guides/202204.0/decoupled-glue-infrastructure/create-glue-api-applications.html
  - /docs/scos/dev/glue-api-guides/202404.0/create-glue-api-applications.html
  - /docs/integrations/spryker-glue-api/backend-api/developing-apis/create-api-applications.md
  - /docs/dg/dev/glue-api/latest/create-glue-api-applications.html
---

Spryker's Backend API is a powerful tool for building custom front end applications, integrating with third-party services, and creating unique customer experiences. This guide provides a high level overview of the process for creating a new API application.


### Key concepts

- Backend API: The core of Spryker's API infrastructure.
  - Storefront API: Designed for customer facing applications–for example mobile apps, single page applications. It has access to services like search and key value storage.
  - Backend API: Intended for backend integrations and administrative tasks. It has more direct access to the database, broker, and other core services.
- Backend API Applications: The latest version of the Backend API infrastructure, which offers improved flexibility and performance. When creating a new application, it's recommended to use the modern infrastructure.
- Modules and Resources: Your API will be organized into modules, and each module can expose one or more resources–for example, "products," "carts," "orders".


### The development process

Creating a new API application in Spryker involves the following steps:

1. Define your application Type: Decide whether you are building a Storefront or a Backend API. This choice determines which services your application has access to and how it's configured.

2. Create a new module: You'll need to create a new module for your API. This module will contain all the code for your new API resources, including controllers, processors, and data transfer objects (DTOs).

3. Define resources: For each resource you want to expose through your API–for example, a new "wishlists" resource–you'll need to define the corresponding routes, controllers, and business logic.

4. Implement business logic: This is where you'll write the code that handles the actual work of your API. This might involve retrieving data from the database, calling other services, or performing calculations.

5. Data transfer objects (DTOs): You'll use DTOs to define the structure of the data that your API sends and receives. This helps to ensure that your API is well documented and easy to use.

6. Register resources: Once you've created your resources, you'll need to register them with the Backend API application so that they can be accessed through the API.

7. Authentication and authorization: You'll need to secure your API by implementing authentication and authorization checks to ensure that only authorized users can access your resources.

8. Documentation: It's important to document your API so that other developers can understand how to use it. Spryker provides tools to help you generate API documentation automatically.


To create Backend API applications ensure your `deploy.yml` file contains the correct setting for `application`. The available options are listed in the following table:

| OPTION | MEANING |
| --- | --- |
| `glue-backend` | Application that has access to the following: <ul><li>database</li><li>broker</li><li>key, value, store</li><li>session</li><li>search</li></ul> |

**deploy.yml**

```yml
groups:
    US:
        applications:
           ...
            custom_backend:
                application: glue-backend
                endpoints:
                  custom-backend.eu.mysprykershop.com:
                        store: EU
                        entry-point: CustomBackendApi
```

1. Activate your new API:

```bash
docker/sdk boot
docker/sdk up
```

2. Verify that your domain is now available: `https://custom-backend.eu.mysprykershop.com`.
3. Create an entry point for your new API:

**public/CustomBackendApi/index.php**

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

Line 7 defines `APPLICATION`, a constant reused across Spryker.

Line 17 has `GlueCustomApiBootstrap`, a bootstrap the application must use. You create it in the next step.

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

Line 19 creates an instance of `ApplicationInterface`, which can take an array of `ApplicationPluginInterface`. You can add features like DB access using these plugins.

In the factory, the constructor looks like this:

<details>
<summary>src/Pyz/Glue/CustomApiApplication/CustomApiApplicationFactory.php</summary>

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

<details><summary>src/Pyz/Glue/CustomApiApplication/CustomApiApplicationDependencyProvider.php</summary>

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

<details><summary>src/Pyz/Glue/CustomApiApplication/Application/CustomApiApplication.php</summary>

```php
<?php

namespace Spryker\Glue\GlueBackendApiApplication\Application;

use Spryker\Client\Session\SessionClient;
use Spryker\Glue\GlueApplication\ApiApplication\Type\RequestFlowAwareApiApplication;
use Spryker\Glue\GlueApplication\Session\Storage\MockArraySessionStorage;
use Spryker\Shared\Application\ApplicationInterface;
use Symfony\Component\HttpFoundation\Session\Session;

/**
 * @method \Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationFactory getFactory()
 */
class GlueBackendApiApplication extends RequestFlowAwareApiApplication
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

If your API uses its own workflow, you can opt for extending `RequestFlowAgnosticApiApplication`. This kind of application has everything—a separate set of application plugins, boot, and run methods—but not the request flow actions. The application that follows the `RequestFlowAgnosticApiApplication` extension is the Storefront API application. It is request-agnostic and creates and follows its own request flow. Here is an example of the application:

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

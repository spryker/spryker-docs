---
title: Zed API project implementation
description: The article describes the implementation process of activating API and API bundles.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/zed-api-project-implementation
originalArticleId: a710e2b6-ccec-4a08-8cc3-4284ebc4cf53
redirect_from:
  - /docs/scos/dev/zed-api/zed-api-project-implementation.html
  - /docs/scos/dev/sdk/201811.0/zed-api/zed-api-project-implementation.html
  - /docs/scos/dev/sdk/201903.0/zed-api/zed-api-project-implementation.html
  - /docs/scos/dev/sdk/201907.0/zed-api/zed-api-project-implementation.html
  - /docs/scos/dev/sdk/202001.0/zed-api/zed-api-project-implementation.html
  - /docs/scos/dev/sdk/202005.0/zed-api/zed-api-project-implementation.html
  - /docs/scos/dev/sdk/202009.0/zed-api/zed-api-project-implementation.html
  - /docs/scos/dev/sdk/202108.0/zed-api/zed-api-project-implementation.html
  - /docs/scos/dev/sdk/zed-api/zed-api-project-implementation.html
related:
  - title: Zed API (Beta)
    link: docs/scos/dev/sdk/zed-api/zed-api-beta.html
  - title: Zed API configuration
    link: docs/scos/dev/sdk/zed-api/zed-api-configuration.html
  - title: Zed API resources
    link: docs/scos/dev/sdk/zed-api/zed-api-resources.html
  - title: Zed API CRUD functionality
    link: docs/scos/dev/sdk/zed-api/zed-api-crud-functionality.html
  - title: Zed API processor stack
    link: docs/scos/dev/sdk/zed-api/zed-api-processor-stack.html
---
{% info_block warningBox "Warning" %}

Zed API, initially released as a beta version, is now considered outdated and is no longer being developed. Instead of it, we recommend using [Glue Backend API](/docs/dg/dev/glue-api/{{site.version}}/decoupled-glue-api.html#new-type-of-application-glue-backend-api-application).

{% endinfo_block %}

For the API and the API bundles to get activated we need to configure our own service provider stack in the Zed `ApplicationDependencyProvider` class:

```php
<?php
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Silex\ServiceProviderInterface[]
     */
    protected function getApiServiceProviders(Container $container)
    {
        $providers = [
            // Add Security/CORS service providers
            // Add Auth service providers

            new RequestServiceProvider(),
            new SslServiceProvider(),
            new ServiceControllerServiceProvider(),
            new RoutingServiceProvider(),
            $this->getApiServiceProvider(),
            new ApiRoutingServiceProvider(),
            new PropelServiceProvider(),
        ];

        if (Environment::isDevelopment()) {
            $providers[] = new WhoopsErrorHandlerServiceProvider();
        }

        return $providers;
    }

    /**
     * @return \Spryker\Zed\Api\Communication\Plugin\ApiServiceProviderPlugin
     */
    protected function getApiServiceProvider()
    {
        $controllerListener = new ApiControllerListenerPlugin();
        $serviceProvider = new ApiServiceProviderPlugin();
        $serviceProvider->setControllerListener($controllerListener);

        return $serviceProvider;
    }
```

In the `ZedBootstrap` class we activate this service provider stack based on the URI:

```php
<?php
    /**
     * @SuppressWarnings(PHPMD)
     *
     * @return void
     */
    protected function setUp()
    {
        if (!empty($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], ApiConfig::ROUTE_PREFIX_API_REST) === 0) {
            $this->registerApiServiceProviders();
            return;
        }

        parent::setUp();
    }

    /**
     * @return void
     */
    protected function registerApiServiceProviders()
    {
        foreach ($this->getApiServiceProvider() as $provider) {
            $this->application->register($provider);
        }
    }

    /**
     * @return \Silex\ServiceProviderInterface[]
     */
    protected function getApiServiceProvider()
    {
        return $this->getProvidedDependency(ApplicationDependencyProvider::SERVICE_PROVIDER_API);
    }
```

As an alternative you can have your own rest.php PHP entry point and configure your server/container nginx to route into a different ZedBootstrap setup.

This own stack uses the minimal service providers needed exclusively to run the API.

Steps for installation when migrating an older demoshop version:

Update `spryker/propel-query-builder` to ^0.2.0.

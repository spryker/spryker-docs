---
title: Yves Bootstrapping
originalLink: https://documentation.spryker.com/v4/docs/t-yves-bootstrap
redirect_from:
  - /v4/docs/t-yves-bootstrap
  - /v4/docs/en/t-yves-bootstrap
---

<!--used to be: http://spryker.github.io/tutorials/yves/yves-bootstrapping/-->
Yves and Zed are both built upon the [Silex micro-framework](https://silex.symfony.com/doc/2.0/). So most concepts about modern web frameworks are applied here as well.

In `static/public/Yves/index.php`, you will find the entry for the front-end application.

```php
<?php
Environment::initialize();

$errorHandlerEnvironment = new ErrorHandlerEnvironment();
$errorHandlerEnvironment->initialize();

$bootstrap = new YvesBootstrap();
$bootstrap
    ->boot()
    ->run();
```

The `boot()` method returns a Silex application which has the `run()` method that processes the request and returns a response to the browser. YvesBootstrap is responsible for registering all the used service providers, controller providers, and routers. The registration process is handled by the `boot()` operation.

```php
<?php
namespace SprykerShop\Yves\Application;
 
abstract class YvesBootstrap
{
    /**
     * @var \Spryker\Yves\Kernel\Application
     */
    protected $application;

    /**
     * @var \SprykerShop\Yves\ShopApplication\ShopApplicationConfig
     */
    protected $config;

    /**
     * @var \Spryker\Shared\Application\Application|null
     */
    protected $sprykerApplication;

    public function __construct()
    {
        $this->application = $this->getBaseApplication();

        if ($this->application instanceof ContainerInterface) {
            $this->sprykerApplication = new Application($this->application);
        }

        $this->config = new ShopApplicationConfig();
    }
 
    /**
     * @return \Spryker\Shared\Application\Application|\Spryker\Yves\Kernel\Application
     */
    public function boot()
    {
        $this->registerServiceProviders();

        if ($this->sprykerApplication !== null) {
            $this->setupApplication();
        }
        /** @deprecated */
        $this->registerRouters();
        /** @deprecated */
        $this->registerControllerProviders();

        $this->application->boot();

        if ($this->sprykerApplication === null) {
            return $this->application;
        }

        $this->sprykerApplication->boot();

        return $this->sprykerApplication;
    }
 
    // ...
}
```

## Service Providers
We are using the Silex way to register service providers. You can easily register new service providers in YvesBootstrap. Note that the order of the registration matters, since sometimes one service provider already needs another service to be registered already.

```php
<?php
// ...
 
/**
 * @return void
 */
protected function registerServiceProviders()
{
    $this->application->register(new ServiceProvider1());
    $this->application->register(new ServiceProvider2());
    // ...
}
 
// ...
```

Service providers need to implement `\Silex\ServiceProviderInterface`. You can find some detailed information about service providers on the official [Silex documentation](https://silex.symfony.com/doc/2.0/providers.html) page.

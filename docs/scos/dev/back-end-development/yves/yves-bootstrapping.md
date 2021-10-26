---
title: Yves Bootstrapping
description: Yves and Zed are both built upon the Silex micro-framework. So most concepts about modern web frameworks apply here as well.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-yves-bootstrap
originalArticleId: cc0ab207-b4ba-4537-96af-079e1524bd2b
redirect_from:
  - /2021080/docs/t-yves-bootstrap
  - /2021080/docs/en/t-yves-bootstrap
  - /docs/t-yves-bootstrap
  - /docs/en/t-yves-bootstrap
  - /v6/docs/t-yves-bootstrap
  - /v6/docs/en/t-yves-bootstrap
  - /v5/docs/t-yves-bootstrap
  - /v5/docs/en/t-yves-bootstrap
  - /v4/docs/t-yves-bootstrap
  - /v4/docs/en/t-yves-bootstrap
  - /v3/docs/t-yves-bootstrap
  - /v3/docs/en/t-yves-bootstrap
  - /v2/docs/t-yves-bootstrap
  - /v2/docs/en/t-yves-bootstrap
  - /v1/docs/t-yves-bootstrap
  - /v1/docs/en/t-yves-bootstrap
---

<!--used to be: http://spryker.github.io/tutorials/yves/yves-bootstrapping/-->
Yves and Zed are both built upon the [Symfony components](https://symfony.com/components). So most concepts about modern web frameworks are applied here as well.

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

The `boot()` method returns an application which has the `run()` method that processes the request and returns a response to the browser. YvesBootstrap is responsible for building the desired application. The registration process is handled by the `boot()` operation.


## Application plugins
The application is using application plugins that are used to add the required base functionality of your project.

```php
<?php

namespace Pyz\Yves\ShopApplication;
// ...

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{

    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        return [
            new TwigApplicationPlugin(),
            new EventDispatcherApplicationPlugin(),
            // ...
        ];
    }
 
// ...
```


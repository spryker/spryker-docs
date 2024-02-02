---
title: Yves bootstrapping
description: Yves and Zed are both built upon the Silex micro-framework. So most concepts about modern web frameworks apply here as well.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-yves-bootstrap
originalArticleId: cc0ab207-b4ba-4537-96af-079e1524bd2b
redirect_from:
  - /docs/scos/dev/back-end-development/yves/yves-bootstrapping.html
related:
  - title: Yves overview
    link: docs/scos/dev/back-end-development/yves/yves.html
  - title: Add translations for Yves
    link: docs/scos/dev/back-end-development/yves/adding-translations-for-yves.html
  - title: CLI entry point for Yves
    link: docs/scos/dev/back-end-development/yves/cli-entry-point-for-yves.html
  - title: Controllers and actions
    link: docs/scos/dev/back-end-development/yves/controllers-and-actions.html
  - title: Implement URL routing in Yves
    link: docs/scos/dev/back-end-development/yves/implement-url-routing-in-yves.html
  - title: Modular Frontend
    link: docs/scos/dev/back-end-development/yves/modular-frontend.html
  - title: Yves routes
    link: docs/scos/dev/back-end-development/yves/yves-routes.html
---

Yves and Zed are both built upon the [Symfony components](https://symfony.com/components). So most concepts about modern web frameworks are applied here as well.

In `static/public/Yves/index.php`, you can find the entry for the frontend application.

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

The `boot()` method returns an application that has the `run()` method, which processes the request and returns a response to the browser. YvesBootstrap is responsible for building the desired application. The registration process is handled by the `boot()` operation.


## Application plugins

The application uses application plugins that add the required base functionality of your project.

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

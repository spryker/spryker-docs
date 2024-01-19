---
title: Handling Internal Server messages
description: This document describes how to configure the behavior when an internal server error occurs.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/internal-server-error-handling
originalArticleId: 768a7105-7a19-4067-837e-238177413911
redirect_from:
  - /docs/scos/dev/back-end-development/messages-and-errors/handling-internal-server-messages.html
related:
  - title: Handling errors with ErrorHandler
    link: docs/scos/dev/back-end-development/messages-and-errors/handling-errors-with-errorhandler.html
  - title: Showing messages in Zed
    link: docs/dg/dev/backend-development/messages-and-errors/show-messages-in-the-back-office.html
---

The document describes how to configure the behavior when an internal server error occurs. Whether you need to show the details of the error or render a static page for an internal error, this is done through configuration.

## Configure internal server error

Depending on the environment in which the application is running, you can set the configuration to show the stack trace of the error or to display a static HTML page.

For a *development environment*, to see the details of the error, you need to have the following configuration in `Config/Shared/config_default.php`:

```php
<?php
$config[YvesConfig::YVES_SHOW_EXCEPTION_STACK_TRACE] = true;
$config[SystemConfig::ZED_SHOW_EXCEPTION_STACK_TRACE] = true;
```

For *production environments*, you need to set those fields to false. To configure the error page you want to display, set the path to the error page to the following fields in the config files:

```php
<?php
$config[YvesConfig::YVES_ERROR_PAGE]  = APPLICATION_ROOT_DIR . '/static/public/Yves/errorpage/error.html';
$config[SystemConfig::ZED_ERROR_PAGE] = APPLICATION_ROOT_DIR . '/static/public/Yves/errorpage/error.html';
```

## Custom Error Pages for HTTP errors

By default behavior, HTTP errors are converted to exceptions. To render different content when a specific error occurs, we have a built-in custom error handler.

*To create a custom error, follow these steps:*

1. Register the exception in the exception handlers under the `ApplicationFactory`, as shown in the following example:

```php
<?php
/**
 * @return ExceptionHandlerInterface[]
 */
public function createExceptionHandlers()
{
    return [
        Response::HTTP_NOT_FOUND =>  new DefaultExceptionHandler(),
        Response::HTTP_UNAUTHORIZED =>  new DefaultExceptionHandler(),
    ];
}
```

If one of the configured exceptions occurs, the request is forwarded to a route named `error/[STATUS_CODE]`.

2. Create `CustomErrorRouteProviderPlugin` which must implement `AbstractRouteProviderPlugin`.

3. To add the route, use the following code sample:

```php
<?php
...
public function addRoutes(RouteCollection $routeCollection): RouteCollection
{
    $routeCollection = $this->addCustomErrorRoute($routeCollection);

    return $routeCollection;
}
...
protected function addError403Route(RouteCollection $routeCollection): RouteCollection
{
    $route = $this->buildRoute('/error/480', 'CustomModule', 'Error480', 'indexAction');
    $routeCollection->add(static::ROUTE_ERROR_480, $route);

    return $routeCollection;
}
```

 The route mapping can be registered in the `\Pyz\Yves\Router\RouterDependencyProvider::getRouteProvider()` method, as in the following example:


```php
<?php

namespace Pyz\Yves\Router;

...

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
...
    protected function getRouteProvider(): array
    {
        return [
            ...
            new CustomModuleRouteProviderPlugin(),
        ];
    }
...
}
```

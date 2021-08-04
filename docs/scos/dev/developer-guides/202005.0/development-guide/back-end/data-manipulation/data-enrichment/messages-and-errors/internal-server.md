---
title: Handling Internal Server Messages
originalLink: https://documentation.spryker.com/v5/docs/internal-server-error-handling
redirect_from:
  - /v5/docs/internal-server-error-handling
  - /v5/docs/en/internal-server-error-handling
---

The document describes how to configure the behavior when an internal server error occurs. Whether you need to show the details of the error or render a static page for any internal error, this is done through configuration.

## Configure Internal Server Error
Page Depending on the environment on which the application is running, you can configure if you wish to show the stack trace of the error or to display a static HTML page.

For example, for development environment, you would like to see the details of the error, so you need have the following configuration in `Config/Shared/config_default.php`:

```php
<?php
$config[YvesConfig::YVES_SHOW_EXCEPTION_STACK_TRACE] = true;
$config[SystemConfig::ZED_SHOW_EXCEPTION_STACK_TRACE] = true;
```

For production environments, you would need to set those fields to false. To configure the error page you want to display, set the path to the error page to the following fields in the config files:

```php
<?php
$config[YvesConfig::YVES_ERROR_PAGE]  = APPLICATION_ROOT_DIR . '/static/public/Yves/errorpage/error.html';
$config[SystemConfig::ZED_ERROR_PAGE] = APPLICATION_ROOT_DIR . '/static/public/Yves/errorpage/error.html';
```

## Custom Error Pages for HTTP errors
By default behavior, HTTP errors are converted to Exceptions. To render different content when a specific error occurs, we have a built-in custom error handler.

**To create a custom error:**
Register the exception in the exception handlers under the `ApplicationFactory`, as below:

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

If one of the configured exceptions occurs, the request will be forwarded to a route named `error/[STATUS_CODE]`.
Next, create `CustomErrorRouteProviderPlugin` which must implement `AbstractRouteProviderPlugin`.

To add the route, use the following code sample:

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

 The route mapping can be registered in the `\Pyz\Yves\Router\RouterDependencyProvider::getRouteProvider()` method, as in the example below:
 
 
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

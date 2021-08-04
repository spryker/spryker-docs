---
title: Router generates absolute URL with localhost
originalLink: https://documentation.spryker.com/2021080/docs/router-generates-absolute-url-with-localhost
redirect_from:
  - /2021080/docs/router-generates-absolute-url-with-localhost
  - /2021080/docs/en/router-generates-absolute-url-with-localhost
---

Router generates URLs with an absolute path instead of a relative one.

## Cause

Prior to version 1.9.0 of the [Router](https://github.com/spryker/router) module, Spryker did not set the `RequestContext` properly in `ChainRouter`. This led to an issue that URLs were generated with an absolute path instead of a relative one. This silently happens inside Symfony's router when the host retrieved from `RequestContext` doesn't match the one that the resolved route has.

## Solution
Do the following:

1. Update the [Router](https://github.com/spryker/router) module to at least version 1.9.0.
2. Set `RequestContext` as follows: Extend `\Spryker\Yves\Router\Router\ChainRouter` in your project, add a new `addRequestContext()` method to it and call that method in the constructor of that class.

```php
/**
 * @param \Symfony\Component\Routing\RequestContext|null $requestContext
 *
 * @return void
 */
protected function addRequestContext(?RequestContext $requestContext = null): void
{
    $request = Request::createFromGlobals();

    if (!$requestContext) {
        $requestContext = new RequestContext();
    }
    $requestContext->fromRequest($request);

    $this->setContext($requestContext);
}

```
    

3. Update the constructor:

```php
/**
 * @param \Spryker\Yves\RouterExtension\Dependency\Plugin\RouterPluginInterface[] $routerPlugins
 * @param \Psr\Log\LoggerInterface|null $logger
 * @param \Symfony\Component\Routing\RequestContext|null $requestContext
 */
public function __construct(array $routerPlugins, ?LoggerInterface $logger = null, ?RequestContext $requestContext = null)
{
    parent::__construct($logger);

    $this->addRequestContext($requestContext);
    $this->addRouterPlugins($routerPlugins);
}
```






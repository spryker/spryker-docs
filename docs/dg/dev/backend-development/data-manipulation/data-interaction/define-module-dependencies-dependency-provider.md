---
title: Define module dependencies - Dependency Provider
description: Each module ships with a DependencyProvider class, which explicitly defines services and external dependencies to other modules.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/dependency-provider
originalArticleId: a08f126e-9ccc-44ac-91b4-2c00b536ff25
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/data-interaction/define-the-module-dependencies-dependency-provider.html
  - /docs/scos/dev/back-end-development/data-manipulation/data-interaction/defining-the-module-dependencies-dependency-provider.html
  - /docs/dg/dev/backend-development/data-manipulation/data-interaction/define-the-module-dependencies-dependency-provider.html
related:
  - title: Spryk
    link: docs/scos/dev/sdk/development-tools/spryk-code-generator.html
---

Each module ships with a `DependencyProvider` class, which explicitly defines services and external dependencies to other modules. For example, when the `Cms` module requires the `Glossary` module, this is configured here. The `DependencyProvider` defines dependencies for each layer. Usually, you need some of these classes:

- Services (Common functionality for Client, Yves, and Zed)
- Plugins
- Facades
- Queries

As you can see in the example, these required classes are wrapped into a closure to enable lazy loading. Inside of the closure you get a `$container` variable which gives you access to a so-called [service locator](https://en.wikipedia.org/wiki/Service_locator_pattern) to retrieve the required classes like this: `$container->getLocator()->glossary()->facade()`.

{% info_block warningBox %}

Instead of `->glossary()`, you can use any module name. The structure is always the same, so you can copy and adapt it for your use case.

{% endinfo_block %}

```php
<?php
...
class CmsDependencyProvider extends SprykerCmsDependencyProvider
{
    public const FACADE_GLOSSARY = 'FACADE_GLOSSARY';
    public const MY_PLUGINS = 'MY_PLUGINS';
    public const SERVICE_UTIL_SANITIZE = 'SERVICE_UTIL_SANITIZE';

    public function provideBusinessLayerDependencies(Container $container): Container
    {
        parent::provideBusinessLayerDependencies($container);
        // Provide access to a facade from another bundle (Glossary in this example)
        $container->set(static::FACADE_GLOSSARY, function (Container $container) {
            return $container->getLocator()->glossary()->facade();
        });

        // Provide a stack of plugins from other bundles
        $container->set(static::MY_PLUGINS, function (Container $container) {
            return [
                new APlugin(),
                new BPlugin(),
            ];
        });

        // Provide a service from another bundle (UtilSanitize in this example)
        $container->set(static::SERVICE_UTIL_SANITIZE, function (Container $container) {
            return $container->getLocator()->utilSanitize()->service();
        });

        return $container;
    }
}
```

## How to use the provided class

You can access the classes which are provided by the `DependencyProvider` in the [Factory](/docs/dg/dev/backend-development/factory/factory.html). Technically the `$container` variable is a simple [DI-container](http://martinfowler.com/articles/injection.html) based on [Pimple](https://github.com/silexphp/Pimple). The contained class is initialized only when you use it.

```php
<?php
...
class CmsBusinessFactory extends AbstractBusinessFactory
{
    /**
     * Returns an instance of the provided glossary facade.
     *
     * @return CmsToGlossaryInterface
     */
    protected function getGlossaryFacade(): CmsToGlossaryInterface
    {
        return $this->getProvidedDependency(CmsDependencyProvider::FACADE_GLOSSARY);
    }
}
```

## Snippet for a new dependency provider

To create a new dependency provider, copy and adapt the snippet. Just rename the const `FACADE_FOO_BAR` and `fooBar()` according to your requirements.

```php
<?php
namespace Pyz\Zed\MyBundle;

use Spryker\Zed\Kernel\AbstractBundleDependencyProvider;
use Spryker\Zed\Kernel\Container;

class MyBundleDependencyProvider extends AbstractBundleDependencyProvider
{
    const FACADE_FOO_BAR = 'FACADE_FOO_BAR';

    /**
     * @param Container $container
     *
     * @return Container
     */
    public function provideBusinessLayerDependencies(Container $container): Container
    {
        $container->set(static::FACADE_FOO_BAR, function (Container $container) {
            return $container->getLocator()->fooBar()->facade();
        });

        return $container;
    }

}
```

New bundles are not auto-completable in your IDE just yet. To get IDE type-hinting for those, run `vendor/bin/console dev:ide:generate-auto-completion`, and the yellow "markup" goes away.

## Bridges in Spryker core

When you look into dependency provider classes from the core level, you can discover the existence of bridges. Inside Spryker's Core, we are using the [Bridge pattern](https://en.wikipedia.org/wiki/Bridge_pattern) to avoid hard dependencies and to further decouple the bundles from each other.

{% info_block warningBox %}

This is not needed in the project code. We recommend avoiding it to reduce overhead.

{% endinfo_block %}

```php
<?php
...
$container->set(static::FACADE_GLOSSARY, function (Container $container) {
    // Here, the bridge is returned instead of the required facade. Core only!
    return new CmsToGlossaryBridge($container->getLocator()->glossary()->facade());
});
...
```

The same is true for services.

## Related Spryks

You might use the following definitions to generate related code:

- Add Zed Dependency Client Bridge
- Add Zed Dependency Client Bridge Interface Method
- Add Zed Dependency Client Bridge Method
- Add Zed Dependency Client Business Factory Method
- Add Zed Dependency Client Dependency Provider Constant
- Add Zed Dependency Client Dependency Provider Method
- Add Zed Dependency Client Interface
- Add Zed Dependency Facade Bridge
- Add Zed Dependency Facade Bridge Interface Method
- Add Zed Dependency Facade Bridge Method
- Add Zed Dependency Facade Business Factory Method
- Add Zed Dependency Facade Dependency Provider Constant
- Add Zed Dependency Facade Dependency Provider Method
- Add Zed Dependency Facade Interface
- Add Zed Dependency Facade Interface Method
- Add Zed Dependency Facade Method
- Add Zed Dependency Provider
- Add Zed Dependency Service Bridge
- Add Zed Dependency Service Bridge Interface Method
- Add Zed Dependency Service Bridge Method
- Add Zed Dependency Service Business Factory Method
- Add Zed Dependency Service Dependency Provider Constant
- Add Zed Dependency Service Dependency Provider Method
- Add Zed Dependency Service Interface
- Add Client Dependency Provider

For details, see [Spryk](/docs/dg/dev/sdks/sdk/spryks/spryks.html).

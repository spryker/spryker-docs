---
title: Twig and TwigExtension
originalLink: https://documentation.spryker.com/v1/docs/twig-and-twig-extension
redirect_from:
  - /v1/docs/twig-and-twig-extension
  - /v1/docs/en/twig-and-twig-extension
---

## Twig
Twig is a template engine that is used in Spryker to render the templates provided by the modules. For further information about Twig, check out the [twig documentation](https://twig.symfony.com/).

Previously, we used the `Silex\Application` microframework and its `ServiceProvider` capabilities to add the Twig service to the application.

## TwigApplicationPlugin
To be able to add Twig without using Silex, we created `TwigApplicationPlugin`. It initializes the Twig service and extends it with the corresponding Twig Plugins. `TwigApplicationPlugin` exists for both Yves and Zed and, under the twig service key, adds Twig to the Container to make it available in your application.

## Modules
You can find the list of all the modules related to the service below:

* Twig - spryker/twig
* TwigExtension - spryker/twig-extension

### Installation
To install these modules, run:
`spryker/twig & spryker/twig-extension installation`
`composer require spryker/twig`
`spryker/twig-extension` is installed along with `spryker/twig` since the earlier is required by the latter.

## Integration
To use the Twig service in your application, you need to add `TwigApplicationPlugin` of the `spryker/twig` module to your `ApplicationDependencyProvider`.
Zed integration:

```
<?php
 
namespace Pyz\Zed\Application;
 
use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\Twig\Communication\Plugin\Application\TwigApplicationPlugin;
 
class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
    ...
 
    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        return [
            ...
            new TwigApplicationPlugin(),
            ...
        ];
    }
 
    ...
```
Yves integration:
```
<?php
 
namespace Pyz\Yves\Application;
 
use Spryker\Yves\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Yves\Twig\Plugin\Application\TwigApplicationPlugin;
 
class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
    ...
 
    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        return [
            ...
            new TwigApplicationPlugin(),
            ...
        ];
    }
 
    ...
}
```
## Configure Twig
Twig provides wide configuration possibilities. For further information about Twig configuration, check out the Twig documentation [here](https://twig.symfony.com/doc/2.x/api.html#environment-options) and [here](https://twig.symfony.com/doc/2.x/api.html#loaders).

Some of the Twig options are predefined in our Twig service. You can check them in the TwigConfig files for Zed and Yves on core and project levels.

Configuration description can be found below:

| Method | Description | Yves | Zed |
| --- | --- | --- | --- |
| `getTemplatePaths` | Defines folders that contain templates to be listed in `TwigFilesystemLoader` | Yes | Yes |
| `getCacheFilePath` | Defines the cache folder for templates rendered by Twig | Yes | Yes |
| `getCacheFilePathForYves` | Defines the cache folder for Yves templates rendered by Twig | No | Yes |
| `isPathCacheEnabled` | Defines enabling of `FilesystemCache` | Yes | Yes |
| `getZedDirectoryPathPatterns` | Defines the path to Twig templates | No | Yes |
| `getYvesDirectoryPathPatterns` | Defines the path to Twig templates | Yes | No |
| `getPremissionMode` | Defines permission for created cache files | Yes | Yes |
| `getTwigOptions` | Here we can define standard options that are available for Twig. Check out [Twig documentation](https://twig.symfony.com/doc/2.x/api.html#environment-options) for more details. | Yes | Yes |

## Extending Twig
Twig offers several ways to add additional functionality such as functions, filters, globally available template variables, etc. For such purposes, there is a `spryker/twig-extension` module installed along with the `spryker/twig` module.
The extension module offers the following interfaces:

### TwigPluginInterface
<details open>
<summary>Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface</summary>
   
```
<?php
 
namespace Spryker\Shared\TwigExtension\Dependency\Plugin;
 
use Spryker\Service\Container\ContainerInterface;
use Twig\Environment;
 
interface TwigPluginInterface
{
    /**
     * Specification:
     * - Allows to extend Twig with additional functionality (e.g. functions, global variables, etc.).
     *
     * @api
     *
     * @param \Twig\Environment $twig
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Twig\Environment
     */
    public function extend(Environment $twig, ContainerInterface $container): Environment;
}
```
 <br>
</details>

This interface gets the Twig environment and `ContainerInterface` to be able to call the extension methods provided by Twig and to get other services from `ContainerInterface` if required.
<details open>
<summary>TwigPluginInterface implementation example</summary>
   
```
<?php
 
namespace Spryker\Shared\Twig\Plugin;
 
use Spryker\Service\Container\ContainerInterface;
use Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface;
use Twig\Environment;
use Twig\Extension\DebugExtension;
 
class DebugTwigPlugin implements TwigPluginInterface
{
    protected const SERVICE_DEBUG = 'debug';
 
    /**
     * {@inheritdoc}
     *
     * @api
     *
     * @param \Twig\Environment $twig
     * @param \Spryker\Service\Container\ContainerInterface $container
     *
     * @return \Twig\Environment
     */
    public function extend(Environment $twig, ContainerInterface $container): Environment
    {
        if ($container->has(static::SERVICE_DEBUG) === false || $container->get(static::SERVICE_DEBUG) === false) {
            return $twig;
        }
 
        $twig->addExtension(new DebugExtension());
 
        return $twig;
    }
}
```
 <br>
</details>

   
{% info_block infoBox %}
There are many AbstractTwigExtensionPlugin classes. They are created for  Yves (one for `spryker/spryker` and the other for `spryker/spryker-shop`
{% endinfo_block %}, Zed, and Service applications to help you with creating the `*TwigPlugin` classes.)

<details open>
<summary>AbstractTwigExtensionPlugin implementation example</summary>
   
```
namespace SprykerShop\Yves\ChartWidget\Plugin\Twig;
 
use SprykerShop\Yves\ShopApplication\Plugin\AbstractTwigExtensionPlugin;
 
/**
 * @method \SprykerShop\Yves\ChartWidget\ChartWidgetFactory getFactory()
 */
class ChartTwigPlugin extends AbstractTwigExtensionPlugin
{
    /**
     * @return \Twig\TwigFunction[]
     */
    public function getFunctions(): array
    {
        $functions = [];
        foreach ($this->getFactory()->getTwigChartFunctionPlugins() as $twigFunctionPlugin) {
            $functions = array_merge($functions, $twigFunctionPlugin->getChartFunctions());
        }
 
        return $functions;
    }
}
```
 <br>
</details>

If you need to use the Container inside of `TwigPlugin` based on `AbstractTwigExtensionPlugin`, you can override the extend method to get access to the Container.

The Twig module's `DependencyProviders` have the `getTwigPlugins()` method, which needs to be overridden on the project level. All the plugins returned from this method extend the Twig service. The example below describes how to add the `*TwigPlugin`:
<details open>
<summary>TwigPlugin usage</summary>
   
```
<?php
 
namespace Pyz\Yves\Twig;
 
use SprykerShop\Yves\CartPage\Plugin\Twig\CartTwigPlugin;
 
class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface[]
     */
    protected function getTwigPlugins(): array
    {
        return [
            ...
            new CategoryTwigPlugin(),
            ...
       ];
    }
}
```
 <br>
</details>

### TwigLoaderPluginInterface
<details open>
<summary>Spryker\Shared\TwigExtension\Dependency\Plugin\TwigLoaderPluginInterface</summary>
   
```
<?php
 
namespace Spryker\Shared\TwigExtension\Dependency\Plugin;
 
use Spryker\Shared\Twig\Loader\FilesystemLoaderInterface;
 
interface TwigLoaderPluginInterface
{
    /**
     * Specification:
     * - Returns required twig loader that can be used as separate loader or as part of ChainLoader.
     *
     * @api
     *
     * @return \Spryker\Shared\Twig\Loader\FilesystemLoaderInterface
     */
    public function getLoader(): FilesystemLoaderInterface;
}
```
 <br>
</details>

This interface returns a filesystem loader to add additional lookup paths for Twig templates to the `twig` service.
<details open>
<summary>TwigLoaderPluginInterface implementation example</summary>
   
```
<?php
 
namespace Spryker\Zed\WebProfiler\Communication\Plugin\Twig;
 
use Spryker\Shared\Twig\Loader\FilesystemLoaderInterface;
use Spryker\Shared\TwigExtension\Dependency\Plugin\TwigLoaderPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
 
/**
 * @method \Spryker\Zed\WebProfiler\Communication\WebProfilerCommunicationFactory getFactory()
 * @method \Spryker\Zed\WebProfiler\WebProfilerConfig getConfig()
 */
class WebProfilerTwigLoaderPlugin extends AbstractPlugin implements TwigLoaderPluginInterface
{
    /**
     * {@inheritdoc}
     *
     * @api
     *
     * @return \Spryker\Shared\Twig\Loader\FilesystemLoaderInterface
     */
    public function getLoader(): FilesystemLoaderInterface
    {
        return $this->getFactory()->createTwigFilesystemLoader();
    }
}
```
 <br>
</details>

The Twig module's `DependencyProviders` have the `getTwigLoaderPlugins()` method, which also needs to be overridden on the project level. The example below describes how to add the `*TwigLoaderPlugin`:

<details open>
<summary>TwigLoaderPluginInterface usage</summary>
   
```
<?php
 
namespace Pyz\Yves\Twig;
 
use Spryker\Yves\Twig\Plugin\FilesystemTwigLoaderPlugin;
 
class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigLoaderPluginInterface[]
     */
    protected function getTwigLoaderPlugins(): array
    {
        return [
            ...
            new FilesystemTwigLoaderPlugin(),
            ...
       ];
    }
}
```
 
<br>
</details>

<!-- Last review date: Mar 29, 2019 by Mykola Ostrizhnii, Dmitry Beirak-->



CMS content widgets is a CMS feature for adding dynamic content to CMS pages and blocks.

For example, you can list a single product, product lists, product groups, or product sets.

## Integration
First of all, you need to install the `cms-content-widget` module with Composer (update `composer.json` with `"cms-content-widget": "^1.0.0"` or use Composer require).

To enable the feature, configure it in your project.

To integrate a CMS widget, you need to take the following three parts:

1. Register the twig function in Yves.
2. Provide configuration in the module shared directory so that Yves and Zed can read it.
3. Optional: Provide CMS content function parameter mapper plugins.

### 1) Register the twig function in Yves.
The CMS content widget is a twig function. Therefore, twig syntax rules apply and must be followed when including the inside content.
For example, `{% raw %}{{{% endraw %} product(['012', '013', '321']) {% raw %}}}{% endraw %}` includes a carousel component with three products.

To register a new function, you need to create a plugin that implements the `\Spryker\Yves\CmsContentWidget\Dependency\CmsContentWidgetPluginInterface` interface and place it in the Yves application. Plugins are registered in `\Pyz\Yves\CmsContentWidget\CmsContentWidgetependencyProvider::getCmsContentWidgetPlugins`, which is an array stored as key-value pairs,
where *key* is the function name you want to use in a template, and *value* is a specific plugin instance. This plugin needs a configuration which is explained in the following paragraph.

To enable the feature for CMS blocks, you need to configure the twig rendering plugin `\Spryker\Yves\CmsContentWidget\Plugin\CmsTwigContentRendererPlugin` and add it to `\Pyz\Yves\CmsBlock\CmsBlockDependencyProvider::getCmsBlockTwigContentRendererPlugin`. This enables twig function rendering in CMS blocks.

### 2) Provide CMS content widget configuration.

Some information needs to be shared between Yves and Zed. Therefore, the configuration plugin must be placed in a shared namespace.

The new plugin *must* implement `\Spryker\Shared\CmsContentWidget\Depedency\CmsContentWidgetConfigurationProviderInterface`, which is used by Yves and Zed.

When used in Yves, inject this plugin directly to your plugin and use configuration when building twig callable. When used in Zed, it must be added to the `\Pyz\Zed\CmsContentWidget\CmsContentWidgetConfig::getCmsContentWidgetConfigurationProviders` plugin array, where *key* is the function name, and *value* is the plugin instance. Providing it to Zed allows rendering usage information below the content editor.

The configuration provider requires the implementation of the following methods:

* `getFunctionName` is the name of the function when used in CMS content.
* `getAvailableTemplates` is the list of supported templates, it's a key-value pair where *key* is the template identifier, which is passed to the function, and *value* is a path to the twig template.
* `getUsageInformation` is plain text usage information displayed when rendering the help pane below the content editor.

### 3) Optional: Provide CMS content function parameter mapper plugins

When defining functions, you may want to accept "natural identifiers", such as `sku` for products or `set_key` for product sets. The content manager should provide the identifiers instead of relying on surrogate keys. The problem arises when you need to read data from the Yves data store as the Yves data store uses "surrogate key/primary keys". Therefore, to read data, convert/map those natural identifiers to surrogate keys.

We provide mappers to help map the identifiers. Each mapper must implement: `\Spryker\Zed\CmsContentWidget\Dependency\Plugin\CmsContentWidgetParameterMapperPluginInterface` and be added to `\Pyz\Zed\Cms\CmsDependencyProvider::getCmsContentWidgetParameterMapperPlugins` where *key* is the function name, and *value* is a specific mapper.

The mapper receives unmapped values where your plugin is responsible for mapping and returning it as an array. Mapper plugins are invoked by CMS and block collectors. To export this data, you must register two plugins: one for CMS pages and one for CMS blocks.

For `CmsBlockCollector`, add plugin `\Spryker\Zed\CmsContentWidget\Communication\Plugin\CmsBlockCollector\CmsBlockCollectorParameterMapExpanderPlugin` to `\Pyz\Zed\CmsBlockCollector\CmsBlockCollectorDependencyProvider::getCollectorDataExpanderPlugins`.

For `CmsCollector`, add plugin `\Spryker\Zed\CmsContentWidget\Communication\Plugin\CmsPageCollector\CmsPageCollectorParameterMapExpanderPlugin` to `\Pyz\Zed\CmsCollector\CmsCollectorDependencyProvider::getCollectorDataExpanderPlugins`.

Make sure to update the `CmsBlockCollector` and `CmsCollector` modules because expander plugins were added during this feature release. It's exported to `\Spryker\Shared\CmsContentWidget\CmsContentWidgetConstants::CMS_CONTENT_WIDGET_PARAMETER_MAP`.	You can access parameter mapping inside the ` $contex` variable when implementing the CMS content function plugin in Yves.

The `$context` is a special twig function variable that uses a twig to pass the data you normally send to the template. This variable has the `cmsContent` key. This key has data from the Yves store. This can be either a CMS page or block data.

The parameter mapping can be read from the following:

```bash
$context['cmsContent'][CmsContentWidgetConstants::CMS_CONTENT_WIDGET_PARAMETER_MAP][$this->widgetConfiguration->getFunctionName()];
```

For example, you can use this method as a basis when implementing `\Spryker\Yves\CmsContentWidget\Dependency\CmsContentWidgetPluginInterface`.

```php
namespace Spryker\Yves\Module\Plugin;  

class CmsWidgetPlugin extends AbstractPlugin implements CmsContentWidgetPluginInterface
{
     /**
      * @return \Callable
       */
      public function getContentWidgetFunction()
      {
          return function (Twig_Environment $twig, array $context, $parameters, $templateIdentifier = null) {
              return $twig->render(
                  $this->resolveTemplatePath($templateIdentifier),
                  $this->getContent($context, $parameters)
              );
          };
      }

         /**
     * @param null|string $templateIdentifier
     *
     * @return string
     */
    protected function resolveTemplatePath($templateIdentifier = null)
    {
        return '@Module/partials/function_template.twig'
    }

     /**
     * @param array $context
     * @param array|string $parameters
     *
     * @return array
     */
    protected function getContent(array $context, $parameters)
    {
        return []; //return data to be inserted into the template
    }

 }
```

## Provided plugins

We provide three CMS content widget plugins. All are currently implemented in the Demo Shop, so you can take them from our repository and integrate them into your project.

The plugin configuration is described below.

### Zed plugins

```php
namespace Pyz\Zed\CmsContentWidget;
class CmsContentWidgetConfig extends SprykerCmsContentConfig
{        
       /**
        * {@inheritdoc}
        *
        * @return array|\Spryker\Shared\CmsContentWidget\CmsContentWidget\CmsContentWidgetConfigurationProviderInterface[]
        */
       public function getCmsContentWidgetConfigurationProviders()
      {
          return [
             \Spryker\Shared\CmsContentWidgetProductConnector\ContentWidgetConfigurationProvider\CmsProductContentWidgetConfigurationProvider::FUNCTION_NAME => new \Spryker\Shared\CmsProductConnector\ContentWidgetConfigurationProvider\CmsProductContentWidgetConfigurationProvider(),
             \Spryker\Shared\CmsContentWidgetProductSetConnector\ContentWidgetConfigurationProvider\CmsProductSetContentWidgetConfigurationProvider::FUNCTION_NAME => new \Spryker\Shared\CmsProductSetConnector\ContentWidgetConfigurationProvider\CmsProductSetContentWidgetConfigurationProvider(),
             \Spryker\Shared\CmsContentWidgetProductGroupConnector\ContentWidgetConfigurationProvider\CmsProductGroupContentWidgetConfigurationProvider::FUNCTION_NAME => new \Spryker\Shared\CmsProductGroupConnector\ContentWidgetConfigurationProvider\CmsProductGroupContentWidgetConfigurationProvider(),
            ];
       }
}
```

### Zed CMS configuration providers

```php
namespace Pyz\Zed\CmsContentWidget;
class CmsContentWidgetConfig extends SprykerCmsContentConfig
{        
       /**
        * {@inheritdoc}
        *
        * @return array|\Spryker\Shared\CmsContentWidget\CmsContentWidget\CmsContentWidgetConfigurationProviderInterface[]
        */
       public function getCmsContentWidgetConfigurationProviders()
      {
          return [
             \Spryker\Shared\CmsContentWidgetProductConnector\ContentWidgetConfigurationProvider\CmsProductContentWidgetConfigurationProvider::FUNCTION_NAME => new \Spryker\Shared\CmsProductConnector\ContentWidgetConfigurationProvider\CmsProductContentWidgetConfigurationProvider(),
             \Spryker\Shared\CmsContentWidgetProductSetConnector\ContentWidgetConfigurationProvider\CmsProductSetContentWidgetConfigurationProvider::FUNCTION_NAME => new \Spryker\Shared\CmsProductSetConnector\ContentWidgetConfigurationProvider\CmsProductSetContentWidgetConfigurationProvider(),
             \Spryker\Shared\CmsContentWidgetProductGroupConnector\ContentWidgetConfigurationProvider\CmsProductGroupContentWidgetConfigurationProvider::FUNCTION_NAME => new \Spryker\Shared\CmsProductGroupConnector\ContentWidgetConfigurationProvider\CmsProductGroupContentWidgetConfigurationProvider(),
            ];
       }
}
```

### Zed CMS collector parameter mapper plugins

```php
namespace Pyz\Zed\CmsContentWidget;

class CmsContentWidgetDependencyProvider extends SprykerCmsContentWidgetDependencyProvider
{

      /**
       * {@inheritdoc}
       *
       * @param \Spryker\Zed\Kernel\Container $container
       *
       * @return array|\Spryker\Zed\CmsContentWidget\Dependency\Plugin\CmsContentWidgetParameterMapperPluginInterface[]
       */
      protected function getCmsContentWidgetParameterMapperPlugins(Container $container)
      {
          return [
              \Spryker\Shared\CmsProductConnector\ContentWidgetConfigurationProvider\CmsProductContentWidgetConfigurationProvider::FUNCTION_NAME => new \Spryker\Zed\CmsProductConnector\Communication\Plugin\Cms\CmsProductSkuMapperPlugin(),
              \Spryker\Shared\CmsProductSetConnector\ContentWidgetConfigurationProvider\CmsProductSetContentWidgetConfigurationProvider::FUNCTION_NAME => new \Spryker\Zed\CmsProductSetConnector\Communication\Plugin\Cms\CmsProductSetKeyMapperPlugin(),
              \Spryker\Shared\CmsProductGroupConnector\ContentWidgetConfigurationProvider\CmsProductGroupContentWidgetConfigurationProvider::FUNCTION_NAME => new \Spryker\Zed\CmsProductConnector\Communication\Plugin\Cms\CmsProductSkuMapperPlugin(),
          ];
      }

}
```

### Yves plugin dependencies

```php
namespace Pyz\Zed\CmsContentWidget;

use Spryker\Shared\CmsContentWidgetProductConnector\ContentWidgetConfigurationProvider\CmsProductContentWidgetConfigurationProvider;
use Spryker\Shared\CmsContentWidgetProductGroupConnector\ContentWidgetConfigurationProvider\CmsProductGroupContentWidgetConfigurationProvider;
use Spryker\Shared\CmsContentWidgetProductSetConnector\ContentWidgetConfigurationProvider\CmsProductSetContentWidgetConfigurationProvider;
use Spryker\Zed\CmsContentWidget\CmsContentWidgetConfig as SprykerCmsContentConfig;

class CmsContentWidgetConfig extends SprykerCmsContentConfig
{
    /**
     * {@inheritdoc}
     *
     * @return array|\Spryker\Shared\CmsContentWidget\Dependency\CmsContentWidgetConfigurationProviderInterface[]
     */
    public function getCmsContentWidgetConfigurationProviders()
    {
        return [
            CmsProductContentWidgetConfigurationProvider::FUNCTION_NAME => new CmsProductContentWidgetConfigurationProvider(),
            CmsProductSetContentWidgetConfigurationProvider::FUNCTION_NAME => new CmsProductSetContentWidgetConfigurationProvider(),
            CmsProductGroupContentWidgetConfigurationProvider::FUNCTION_NAME => new CmsProductGroupContentWidgetConfigurationProvider(),
        ];
    }
}
```

### Version check when using the widget for CMS blocks
If you use this widget for CMS blocks, then check that you have proper versions of your modules as follows: `cms-block >= 1.2.0, cms-block-collector >= 1.1.0, cms-block-gui >= 1.1.0`.

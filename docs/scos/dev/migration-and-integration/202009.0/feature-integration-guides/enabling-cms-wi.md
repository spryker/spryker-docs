---
title: Enabling the content widget
originalLink: https://documentation.spryker.com/v6/docs/enabling-cms-widget
redirect_from:
  - /v6/docs/enabling-cms-widget
  - /v6/docs/en/enabling-cms-widget
---

CMS content widgets is a CMS feature for adding  dynamic content to CMS pages/blocks.
		
For example, you can list a single product, product lists, product groups or product sets.

## Integration
First of all you need to install the `cms-content-widget` module with Composer (update composer.json with `"cms-content-widget": "^1.0.0"` or use Composer require).

To enable the feature, configure it in your project.

Integration of CMS widget consists of three main parts:

1. Registering twig function in Yves.
2. Providing configuration in module shared directory so that Yves and Zed can read it.
3. (Optionally) Providing CMS content function parameter mapper plugins.

### Step 1: Registering twig function in Yves.
The CMS content widget is a twig function. Therefore, twig syntax rules apply and must be followed when including the inside content. 
For example, `{% raw %}{{{% endraw %} product(['012', '013', '321']) {% raw %}}}{% endraw %}` will include carousel component with three products.
				
To register a new function, you need to create a plugin which implements the `\Spryker\Yves\CmsContentWidget\Dependency\CmsContentWidgetPluginInterface` interface and place it in Yves application. Plugins are registered in `\Pyz\Yves\CmsContentWidget\CmsContentWidgetependencyProvider::getCmsContentWidgetPlugins` which is an array stored as key => value pairs, 
where **key** is the function name you want to use in a template and **value** is a specific plugin instance. This plugin needs configuration which is explained in the next paragraph.

To enable the feature for CMS blocks, you have to configure twig rendering plugin `\Spryker\Yves\CmsContentWidget\Plugin\CmsTwigContentRendererPlugin` and add it to `\Pyz\Yves\CmsBlock\CmsBlockDependencyProvider::getCmsBlockTwigContentRendererPlugin`. This will enable twig function rendering in CMS blocks.

### Step 2: Providing CMS content widget configuration.
				
Some information needs to be shared between Yves and Zed. Therefore, the configuration plugin must be placed in a shared namespace. 

**The new plugin must implement:** `\Spryker\Shared\CmsContentWidget\Depedency\CmsContentWidgetConfigurationProviderInterface` which is used by Yves and Zed. 

When used in Yves, inject this plugin directly to your plugin and use configuration when building twig callable. When used in Zed, it should be added to the `\Pyz\Zed\CmsContentWidget\CmsContentWidgetConfig::getCmsContentWidgetConfigurationProviders` plugin array where key is the function name and value is the plugin instance. Providing it to Zed allows rendering usage information below the content editor.
				
The configuration provider requires implementation of the following methods:

* `getFunctionName` is the name of function when used in CMS content.
* `getAvailableTemplates` is the list of supported templates, it's a key value pair where key is the template identifier which is passed to function and value is a path to twig template.
* `getUsageInformation` is a plain text usage information, displayed when rendering help pane below the content editor.

### Step 3: Function mapping plugins - optional.

When defining functions, you may want to accept "natural identifiers", such as "sku" for products or "set_key" for product sets. It is preferable that the content manager provides the identifiers instead of relying on surrogate keys. The problem arises when you need to read data from the Yves data store as the Yves data store uses "surrogate key/primary keys". Therefore, to read data, convert/map those natural identifiers to surrogate keys.

We provide mappers to help map the identifiers. Each mapper must implement: `\Spryker\Zed\CmsContentWidget\Dependency\Plugin\CmsContentWidgetParameterMapperPluginInterface` and be added to `\Pyz\Zed\Cms\CmsDependencyProvider::getCmsContentWidgetParameterMapperPlugins` where **key** is the function name and **value** is a specific mapper.

The mapper receives unmapped values where your plugin is responsible for mapping and returning it as an array. Mapper plugins are invoked by CMS and block collectors. To export this data, you must register two plugins one for CMS pages and one for CMS blocks.

For `CmsBlockCollector`, add plugin `\Spryker\Zed\CmsContentWidget\Communication\Plugin\CmsBlockCollector\CmsBlockCollectorParameterMapExpanderPlugin` to `\Pyz\Zed\CmsBlockCollector\CmsBlockCollectorDependencyProvider::getCollectorDataExpanderPlugins`.

For `CmsCollector`, add plugin `\Spryker\Zed\CmsContentWidget\Communication\Plugin\CmsPageCollector\CmsPageCollectorParameterMapExpanderPlugin` to `\Pyz\Zed\CmsCollector\CmsCollectorDependencyProvider::getCollectorDataExpanderPlugins`.

Make sure to update the `CmsBlockCollector` and `CmsCollector` modules as expander plugins were added during this feature release. It's exported to `\Spryker\Shared\CmsContentWidget\CmsContentWidgetConstants::CMS_CONTENT_WIDGET_PARAMETER_MAP`.	You can access parameter mapping inside the ` $contex` variable when implementing the CMS content function plugin in Yves.

The `$context` is a special twig function variable that uses twig to pass the data you normally send to the template. This variable has a `cmsContent` key. This key has data from the Yves store. This can be either a CMS page or block data.

The parameter mapping can be read from:

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
        return []; //return data to be inserted into template
    }
      
 }
```

## Provided Plugins
We provide three CMS content widget plugins . All are currently implemented in the demoshop so you can take them from our repository and integrate in your project.
		
Plugin configuration is described below.

### Zed Plugins:

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

### Zed CMS Configuration Providers:

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

### Zed CMS Collector Parameter Mapper Plugins:

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

### Yves Plugin Dependencies

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

<!-- 
### Demoshop - Add Twig Function for Your Application Scope

Open your YvesBootstrap `src/Pyz/Yves/AApplication/YvesBootstrap.php` and add the `CmsContentWidgetServiceProvider` provider to `registerServiceProviders`:

```php
namespace Pyz\Yves\Application;

...

class YvesBootstrap
{

    ...

    /**
     * @return void
     */
    protected function registerServiceProviders()
    {
                ...
            $this->application->register(new CmsContentWidgetServiceProvider());
    }
}
```
-->

### Version Check When Using the Widget for CMS Blocks
If you use this widget for CMS Blocks, then check that you have proper versions of your modules as follows: `cms-block >= 1.2.0, cms-block-collector >= 1.1.0, cms-block-gui >= 1.1.0`.

<!-- Last review date: Sep 20, 2017 -->

[//]: # (by Denis Turkov)

---
title: Modular Frontend
originalLink: https://documentation.spryker.com/v4/docs/modular-frontend
redirect_from:
  - /v4/docs/modular-frontend
  - /v4/docs/en/modular-frontend
---

This article provides information on [Pages](https://documentation.spryker.com/v4/docs/modular-frontend#pages) and [Widgets](https://documentation.spryker.com/v4/docs/modular-frontend#widgets), the Pages module and how the Pages module can be extended. Real-life examples included into the article will help you to understand the concept better.

## General Information 
### Pages
Pages are the main concept of modular front-end (Yves) which splits a code into modules. A *Page* module represents a set of pages displayed under some or similar URLs that logically belong together.

{% info_block infoBox %}
As an example, we consider Product Detail Page as one Page module which is responsible for displaying products and their basic information.
{% endinfo_block %}

![PDP page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Front+End/Yves/Modular+Frontend/pdp-page.png){height="" width=""}

{% info_block infoBox %}
Another *Page* module example would be any customer related pages, like Login, Register, Profile, Addresses. These are several different pages. Each page is responsible for something specific from the customer domain, so it's natural to group them under the same module.
{% endinfo_block %}

We group pages under a Page module when they are related to the same domain.

### Widgets
Meanwhile, Page modules implement only feature basics, while Widgets provide optional extensions for them.

{% info_block infoBox %}
**Product Detail Page** shows basic product information, like the name, description and attributes of the product. But there are lots of optional features that can appear on the same page. The most commonly used examples are product image, price, availability, options, groups, rating, relations, an much more.
{% endinfo_block %}

![PDP ratings](https://spryker.s3.eu-central-1.amazonaws.com/docs/Front+End/Yves/Modular+Frontend/pdp-ratings.png){height="" width=""}

The *Pages* and *Widgets* concept offers a solution to tailor projects to their custom needs.
When you get the general understanding of the Pages/Widgets concept, its time to investigate how the *Pages* module looks like, why and how the module can be extended.

### Page Module Appearance and Pages Extension
A Page module typically contains a `ControllerProvider` plugin for routing (see [URL Routing](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/yves/yves-url-routin)) and some Controllers with their twig templates (see [Controllers and Actions](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/yves/yves-controller)). The implementation scope of a *Page* module should be decided individually, depending on its need of re-usability. 

{% info_block infoBox %}
The more generic a Page module is the more it can be reused, but also it needs more extension points this way.
{% endinfo_block %}

As more features you need to have on in your *Page* module, as much you need to extend it.

To extend a Page with an additional functionality you use **Widgets**. When you extend the front-end by rendering a template fragment in a template of a controller action, you need to specify the exact place of each extension point on a template level.

![PDP schema template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Front+End/Yves/Modular+Frontend/product-details-page-schema-temlate.png){height="" width=""}

{% info_block warningBox %}
Before you start using the widget system, make sure to register the following plugins:
{% endinfo_block %}

src/Pyz/Yves/EventDispatcher/EventDispatcherDependencyProvider.php
    
```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\EventDispatcher;

use Spryker\Yves\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;
use SprykerShop\Yves\ShopApplication\Plugin\EventDispatcher\ShopApplicationEventDispatcherPlugin;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return \Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface[]
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            new ShopApplicationEventDispatcherPlugin(),
        ];
    }
}
```

src/Pyz/Yves/Twig/TwigDependencyProvider.php

```php
<?php

namespace Pyz\Yves\Twig;

use Spryker\Yves\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;
use SprykerShop\Yves\ShopApplication\Plugin\Twig\WidgetTagTwigPlugin;

class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface[]
     */
    protected function getTwigPlugins(): array
    {
        return [
            new WidgetTagTwigPlugin(),
        ];
    }
}
```

For more informaiton on how to implement a Widget, see the [How to Implement a Widget Plugin](https://documentation.spryker.com/v4/docs/t-widgets-widget-plugins#how-to-implement-a-widget-) section in *Tutorial - Widgets and Widget Plugins*.  

### Widget Twig Tag Reference

```xml
{% raw %}{%{% endraw %} widget WIDGET_EXPRESSION args WIDGET_ARGUMENTS use TWIG_TEMPLATE_PATH with TWIG_PARAMETERS only {% raw %}%}{% endraw %}
	{% raw %}{%{% endraw %} block WIDGET_BLOCK_N {% raw %}%}{% endraw %}
		{% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}
	{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} elsewidget ... {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} nowidget {% raw %}%}{% endraw %}
	WIDGET_FALLBACK
{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
```

| Tag | Description | Additional Comments |
| --- | --- | --- |
| `{% raw %}{%{% endraw %} widget ... {% raw %}%}{% endraw %}...{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}` | Required a twig tag to render a widget. | A widget is rendered only when it can be found in the local or global widget registry. |
| `WIDGET_EXPRESSION` | Can be a string that represents the widget name or an instance of a widget.
 | This argument is required. |
| `args WIDGET_ARGUMENTS` | Array of arguments that the widget is initialized with (by `constructor() of new widgets` or by `initialize()` method of old widget plugins). This parameter is only available when `WIDGET_EXPRESSION` was not an instance of a widget.| This parameter is optional, depending if the widget object to be initialized requires any arguments or not. |
| `use TWIG_TEMPLATE_PATH` | Render the widget with a different template then defined by the widget. `TWIG_TEMPLATE_PATH` is a string that represents a valid path for a twig template that can be loaded. | This parameter is optional. |
| `with TWIG_PARAMETERS` | Pass an associative array of variables for the scope of the rendered widget twig blocks.  | This parameter is optional. |
| `{% raw %}{%{% endraw %} block WIDGET_BLOCK_N {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}` | Twig blocks to overwrite/customize blocks of the twig template to be rendered. `{% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}` can be used to render the original content of a block.  | This tag is optional. |
| `only` | Optional argument to reduce the context of the template to be rendered to only the provided `TWIG_PARAMETERS`.  | By convention, in Spryker core we always provide this argument to prevent mixing template scopes. |
| `{% raw %}{%{% endraw %} elsewidget ... {% raw %}%}{% endraw %}` | Optional twig tag to render a widget when the previous widget(s) were not found. Has the same parameters as the base widget tag including `WIDGET_BLOCK_N`.  | Listing multiple `elsewidget` tags will render the first widget that is found. |
| `{% raw %}{%{% endraw %} nowidget {% raw %}%}{% endraw %} WIDGET_FALLBACK` | Optional twig tag to render any content `(WIDGET_FALLBACK)`, when no widget is found by the widget tag. | N/A | 

### findWidget() Twig Function Reference

```xml
{% raw %}{%{% endraw %} set widget = findWidget(WIDGET_NAME, WIDGET_ARGUMENTS) {% raw %}%}{% endraw %}
 
{% raw %}{{{% endraw %} widget.WIDGET_PARAMETER_N ?? null {% raw %}}}{% endraw %}
```

| Tag | Description | Additional Comments |
| --- | --- | --- |
| `findWidget(WIDGET_NAME)` | Find a widget by name and return it as an object.  | When a widget is not found, null will be returned instead.  |
| `WIDGET_ARGUMENTS` | Array of arguments that the widget is initialized with (`by constructor()` of new widgets or by `initialize()` method of old widget plugins). | This parameter is optional, depending if the widget object to be initialized requires any arguments or not. |
| `widget.WIDGET_PARAMETER_N ?? null` | Get parameters of the widget through its `ArrayAccess` interface.  | The `??` check is required in all cases to prevent errors of non-existing widgets. |

## Deprecations
The Page and Widget concepts were introduced in `spryker/kernel: 3.16.0` module version and originally Widgets were implemented as Yves plugins. Later, in **3.24.0** version of the *Kernel* module the widget plugins were deprecated. They started to be used  in their own domain called **Widget**. Use the following documentation in case you are on a lower Kernel version.

### Widget Plugins
**Widget Plugins** are scoped to a single use case. It's the main difference from Widgets which could be called from different Pages. 

Widgets are implemented on demand of an extension of a template. 

![MyPage module](https://spryker.s3.eu-central-1.amazonaws.com/docs/Front+End/Yves/Modular+Frontend/MyPage_module.png){height="" width=""}

Before you start using the widget plugin system, make sure to register the `\SprykerShop\Yves\ShopApplication\Plugin\Provider\WidgetServiceProvider` in your YvesBoostrap.

```php
<?php
 
namespace Pyz\Yves\ShopApplication;
 
use SprykerShop\Yves\ShopApplication\Plugin\Provider\WidgetServiceProvider;
use SprykerShop\Yves\ShopApplication\YvesBootstrap as SprykerYvesBootstrap;
 
class YvesBootstrap extends SprykerYvesBootstrap
{
	/**
	 * @return void
	 */
	protected function registerServiceProviders()
	{
		$this->application->register(new WidgetServiceProvider());
	}
}
```

For more information on how to create a Widget Plugin, see the *How to Implement a Widget Plugin* section in [Tutorial - Widgets and Widget Plugins](https://documentation.spryker.com/v4/docs/t-widgets-widget-plugins#how-to-implement-a-widget-plugin-).  


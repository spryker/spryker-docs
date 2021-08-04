---
title: Tutorial - Implementing Widgets and Widget Plugins
originalLink: https://documentation.spryker.com/2021080/docs/t-widgets-widget-plugins
redirect_from:
  - /2021080/docs/t-widgets-widget-plugins
  - /2021080/docs/en/t-widgets-widget-plugins
---

This tutorial provides instructions on how to implement widgets and widget plugins into [Modular Frontend](https://documentation.spryker.com/docs/modular-frontend). 

## How to Implement a Widget?
Each widget implementation is supposed to be designed as components: considering reusability and being able to render them on different Pages.

### Step 1 - Implement the Widget Class
    
To implement a widget class, follow the detailed example below.
    
```php
<?php

namespace Pyz\Yves\FooModule\Widget;

use Spryker\Yves\Kernel\Widget\AbstractWidget;

class FooBarWidget extends AbstractWidget
{
    /**
     * FooBarWidget constructor.
     *
     * @param $param1
     * @param $param2
     */
    public function __construct($param1, $param2)
	{
        // The constructor arguments are the input to render/create a widget in twig templates.
        // The constructor initializes the widget parameters that will be available inside the template to be rendered.
        // The widget parameters are publicly available on a widget instance by its ArrayAccess interface.
        $this->addParameter('param1', $param1)
            ->addParameter('param2', $param2);
    }

    /**
     * @return string
     */
    public static function getName(): string
    {
        // By convention the name of the widgets are equal with the name of the widget class to be able to find it easily from twig templates.
        // The widget names must be unique as they are registered globally.
        return 'FooBarWidget';
    }

    /**
     * @return string
     */
    public static function getTemplate(): string
    {
        // The template of the widget to be rendered by default.
        return '@FooModule/views/foo-bar-widget/foo-bar-widget.twig';
    }
}
```

### Step 2 - Implement the Widget Template

Create the template file that was added to your widget's    `getTemplate()` method previously.

src/Pyz/Yves/FooModule/Theme/default/views/foo-bar-widget/foo-bar-widget.twig

```json
{% raw %}{%{% endraw %} extends template('widget') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define data = {
    param1: _widget.param1, 
    param2: _widget.param2 | default
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
    <h1>FooBarWidget Content</h1>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

In the template of the widget, the parameters are accessible through the `_widget` twig variable. This way in twig template it's easy to determine where a parameter is coming from.

{% info_block infoBox %}
When you see `_widget.foo`, it means that the `foo` parameter is coming from the widget directly.
{% endinfo_block %}

### Step 3 - Activate Your Widget

You can activate Widgets by adding them to the  `\Pyz\Yves\ShopApplication\ShopApplicationDependencyProvider::getGlobalWidgets()` method. Widgets are instantiated in the background when they are called in twig templates. To activate a widget, use their **FQCNs** (Fully Qualified Class Names).

{% info_block infoBox %}
A widget with a given set of parameters, called multiple times, in the same `http` request is instantiated only once and cached in the memory for performance reasons. This also means that when there is a widget which has a bit heavier initialization logic, it will be executed only once even when used several times in twig templates. When the same widget is called with different parameters, it will still be a new instance and run its initialization separately.
{% endinfo_block %}

```php
<?php
 
namespace Pyz\Yves\ShopApplication;
 
use Pyz\Yves\FooModule\Widget\FooBarWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
 
class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
	/**
	 * @return string[]
	 */
	protected function getGlobalWidgets(): array
	{
		return [
			FooBarWidget::class,
		];
	}
}
```

### Step 4 - Render the Widget

Widgets are placed and rendered in twig templates. The following examples show several cases how to use them.

**Simple widget rendering with input parameters:**

```json
{% raw %}{%{% endraw %} widget 'FooBarWidget' args [param1, param2] only {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
```

**Widget rendering with different templates:**

```json
{% raw %}{%{% endraw %} widget 'FooBarWidget' use view('view1') only {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} widget 'FooBarWidget' use view('view2') only {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
```

**Widget rendering with additional HTML:**

```json
{% raw %}{%{% endraw %} set color = 'red' {% raw %}%}{% endraw %}
 
{% raw %}{%{% endraw %} if widgetExists('FooBarWidgetPlugin') {% raw %}%}{% endraw %}
	<div style="border:1px solid {% raw %}{{{% endraw %} color {% raw %}}}{% endraw %}">
		{% raw %}{{{% endraw %} widget('FooBarWidgetPlugin', param1, param2) {% raw %}}}{% endraw %}
	</div>
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}	
```

**Widget rendering with additional HTML and context variables:**

```json
{% raw %}{%{% endraw %} widget 'FooBarWidget' args [param1, param2] with {color: 'red'} only {% raw %}%}{% endraw %}
	{% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
		<div style="border:1px solid {% raw %}{{{% endraw %} color {% raw %}}}{% endraw %}">
			{% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}
		</div>
	{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
```

**Widget rendering with fallback when it doesn't exist or not activated:**

```json
{% raw %}{%{% endraw %} widget 'FooBarWidget' args [param1, param2] only {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} nowidget {% raw %}%}{% endraw %}
	display something else here...
{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}		
```

**Render widget into a variable:**

```json
{% raw %}{%{% endraw %} set fooWidget = findWidget('FooBarWidget', [param1, param2]) {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} set foo = fooWidget.foo|default {% raw %}%}{% endraw %}
```

**Subsequently, render widgets as a fallback when another widget doesn't exist:**

```json
{% raw %}{%{% endraw %} widget 'FooBarWidget' only {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} elsewidget 'BarWidget' only {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} nowidget {% raw %}%}{% endraw %}
	display something else here...
{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
```

## Deprecations
### How to Implement a Widget Plugin?

{% info_block infoBox %}
This section is valid only for projects which are running module `spryker/kernel` up to version **3.24.0**, exclusively. In version 3.24.0 of the `Kernel` module, the widget plugins were deprecated. In case you are running version 3.24.0 or later, refer to the previous section.
{% endinfo_block %}

 Follow the steps below to implement a widget. 

### Step 1 - Place Widget extensions

In the module you are planning to extend, find the extension point in the twig templates and place the necessary twig widget function(s). See the [How to implement a Widget](https://documentation.spryker.com/docs/t-widgets-widget-plugins#how-to-implement-a-widget-) section.

@MyPage/views/foo/foo-bar.twig

```json
<p>Some MyPage related content.</p>
 
{% raw %}{{{% endraw %} widget('MyWidgetPlugin', $param1, param2) {% raw %}}}{% endraw %}
 
<p>Some other MyPage related content.</p>
```

The following twig functions can be used to hook widgets in any twig template:

| Function | Description | Example |
| --- | --- | --- |
| `widget()` | This is the most commonly used widget function. It renders a widget by name with the given arguments. When the widget is not registered in the current render context of the twig template where the method is called, there will be no output of it. This makes widgets harmless and optional when they are placed in any template. | `{% raw %}{{{% endraw %} widget('WidgetName', ...$arguments) {% raw %}}}{% endraw %}` |
|`widgetBlock()`  | Sometimes a widget defines multiple [twig blocks](https://twig.symfony.com/doc/2.x/tags/block.html) that can be rendered separately. By calling this method and providing the appropriate block name you can render only some parts of a widget. | `{% raw %}{{{% endraw %} widgetBlock('WidgetName', 'blockName', ...$arguments) {% raw %}}}{% endraw %}` |
| `widgetGlobal()` | Some widgets might need to be rendered on most pages or on every page as a part of the layout. These widgets are registered in a central place only once and can be rendered in any twig template by calling the `widgetGlobal()` twig function. |`{% raw %}{{{% endraw %} widgetGlobal('WidgetName', ...$arguments) {% raw %}}}{% endraw %}`  |
| `widgetExists()` | Use this function when you need to check if a widget is registered in the current render context (for example, will be rendered) and do something in that case. For example, when you need to add `container/separator` when the widget is rendered, or when you want to render something else, when a widget is not shown. | `{% raw %}{{{% endraw %} widgetExists('WidgetName', ...$arguments) {% raw %}}}{% endraw %}` |
| `widgetGlobalExists()` | Use this function when you need to check if a global widget is registered (for example, will be rendered) and do something in that case. For example, when you need to add a container/separator when the widget is rendered, or when you want to render something else, when a widget is not shown. | `{% raw %}{{{% endraw %} widgetGlobalExists('WidgetName', ...$arguments) {% raw %}}}{% endraw %}` |

### Step 2 - Create Widget Interface and Contract

In the same module, you will create an interface that represents the widget used in the template. This step is important to make Dependency Inversion visible on PHP level in the caller module.

Create the interface for the widget and define the `initialize()` method. This method is a must have, it defines the contract (e.g. input) of a widget plugin.

The inputs of the widget plugins are usually different, that's why the `initialize()` method has to be defined for each case individually. When calling the `widget()`, `widgetBlock()` and `widgetGlobal()` twig functions, the `initialize()` method of the widget plugin will be executed internally, thus the system by design makes sure that the required inputs are passed.

In the following example the` initialize()` method defines one mandatory and one optional parameter. Also note that the interface defines the `NAME` constant. It's value is used in step 1 to identify and render the right widget.

src/Pyz/Yves/MyPage/Dependency/Plugin/MyWidget/MyWidgetPluginInterface.php

```php
<?php
 
namespace Pyz\Yves\MyPage\Dependency\Plugin\MyWidget;
 
use Spryker\Yves\Kernel\Dependency\Plugin\WidgetPluginInterface;
 
interface MyWidgetPluginInterface extends WidgetPluginInterface
{
	const NAME = 'MyWidgetPlugin';
 
	/**
	 * @param string $myMandatoryParam
	 * @param int|null $myOptionalParam
	 *
	 * @return void
	 */
	public function initialize(string $myMandatoryParam, int $myOptionalParam = null): void;
}
```

### Step 3 - Implement the Widget Plugin

In the target widget module (MyWidget in the examples), you can implement the widget plugin. Extend your plugin from `\Spryker\Yves\Kernel\Widget\AbstractWidgetPlugin` and implement the following methods:

* `getName()` - returns the name of the widget as it's used in the template. Most cases you can return `static::NAME;` in the method when the name is defined in the interface.

* `getTemplate()` - returns the template file path to renter the widget. 

* `initialize()` - initializes the rendering of the widget template, by processing the input parameters and providing parameters for the template to be rendered. Also, sub-widgets can be registered here.

{% info_block infoBox "Info" %}
 When a widget plugin is called several times with the same parameters by the widget twig functions, this method is executed only once to avoid unnecessary overhead.
{% endinfo_block %}

```php
<?php
 
namespace Pyz\Yves\MyWidget\Plugin\MyPage;
 
use Pyz\Yves\MyPage\Dependency\Plugin\MyWidget\MyWidgetPluginInterface;
use Spryker\Yves\Kernel\Widget\AbstractWidgetPlugin;
 
class MyWidgetPlugin extends AbstractWidgetPlugin implements MyWidgetPluginInterface
{
	/**
	 * @param string $myMandatoryParam
	 * @param int|null $myOptionalParam
	 *
	 * @return void
	 */
	public function initialize(string $myMandatoryParam, int $myOptionalParam = null): void
	{
		$this->addParameter('myMandatoryParam', $myMandatoryParam)
			->addParameter('myOptionalParam', $myOptionalParam)
			->addParameter('myComputedParam', $this->getMyComputedParam());
	}
 
	/**
	 * @return string
	 */
	public static function getName(): string
	{
		return static::NAME;
	}
 
	/**
	 * @return string
	 */
	public static function getTemplate(): string
	{
		return '@MyWidget/views/my-widget/my-widget.twig';
	}
}
```

### Step 4 - Implement Widget Template

Create the template file that was added to your Widget's `getTemplate()` method previously.

src/Pyz/Yves/MyWidget/Theme/default/views/my-widget/my-widget.twig

```json
{% raw %}{%{% endraw %} extends template('widget') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define data = {
    myMandatoryParam: _widget.myMandatoryParam, 
    myOptionalParam: _widget.myOptionalParam | default,
    myComputedParam: _widget.myComputedParam
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
    {# Render widget content here. #}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

In the widget template, the parameters are accessible through the `_widget` twig variable. This way in twig template it's easy to determine where a parameter is coming from. When you see `_widget.foo`, it means that the `foo` parameter is coming from the widget directly.

### Step 5 - Activate the Widget

There are three ways of activating a widget, depending on their scope where they need to be rendered:

* [Activate a widget in a Controller action](https://documentation.spryker.com/docs/t-widgets-widget-plugins#activate-a-widget-in-a-controller-action)
* [Activate a widget in another widget](https://documentation.spryker.com/docs/t-widgets-widget-plugins#activate-a-widget-in-another-widget)
* [Activate a widget to be available globally](https://documentation.spryker.com/docs/t-widgets-widget-plugins#activate-a-widget-to-be-available-globally)

### Activate a Widget in a Controller Action

Most of the times when a Page needs extension, we need to extend a template that is rendered by a `Controller` action. In this case, the action need to return the `\Spryker\Yves\Kernel\View\View` object. 

This View object can define the data for the template of the controller to be rendered, the list of active widget plugins, and the template to render.

```php
<?php
 
namespace Pyz\Yves\MyPage\Controller;
 
use SprykerShop\Yves\ShopApplication\Controller\AbstractController;
 
/**
 * @method \Pyz\Yves\MyPage\MyPageFactory getFactory()
 */
class FooController extends AbstractController
{
	/**
	 * @return \Spryker\Yves\Kernel\View\View
	 */
	public function barAction()
	{
		return $this->view(
			$this->getViewData(),
			$this->getFactory()->getMyPageFooBarWidgetPlugins(),
			'@MyPage/views/foo/foo-bar.twig'
		);
	}
 
	/**
	 * @return array
	 */
	protected function getViewData(): array
	{
		return [
			// some key-value array for the template to be rendered
		];
	}
}
```

{% info_block infoBox "Info" %}
When a controller action returns a View object, in the rendered twig template by default the data passed from the controller (view data
{% endinfo_block %} is accessible through the `_view` twig variable. This way in twig template it's easy to determine where a parameter is coming from. When you see `_view.foo`, it means that the `foo` parameter is coming from the controller directly.</br>If you would like to access the parameters directly without the _view variable in twig, set the `ShopApplicationConfig::useViewParametersToRenderTwig()` module configuration method to return `true` instead of the default `false`.)

```php
<?php
 
namespace Pyz\Yves\MyPage;
 
use Spryker\Yves\Kernel\AbstractFactory;
 
class MyPageFactory extends AbstractFactory
{
	/**
	 * @return string[]
	 */
	public function getMyPageFooBarWidgetPlugins(): array
	{
		return $this->getProvidedDependency(MyPageDependencyProvider::PLUGIN_MY_PAGE_FOO_BAR_WIDGETS);
	}
}	
```

```php
<?php
 
namespace Pyz\Yves\MyPage;
 
use Spryker\Yves\Kernel\AbstractFactory;
 
class MyPageFactory extends AbstractFactory
{
	/**
	 * @return string[]
	 */
	public function getMyPageFooBarWidgetPlugins(): array
	{
		return $this->getProvidedDependency(MyPageDependencyProvider::PLUGIN_MY_PAGE_FOO_BAR_WIDGETS);
	}
}
```

```php
<?php
 
namespace Pyz\Yves\MyPage;
 
use Pyz\Yves\MyWidget\Plugin\MyPage\MyWidgetPlugin;
use Spryker\Yves\Kernel\AbstractBundleDependencyProvider;
use Spryker\Yves\Kernel\Container;
 
class ProductSetDetailPageDependencyProvider extends AbstractBundleDependencyProvider
{
	const PLUGIN_MY_PAGE_FOO_BAR_WIDGETS = 'PLUGIN_MY_PAGE_FOO_BAR_WIDGETS';
 
	/**
	 * @param \Spryker\Yves\Kernel\Container $container
	 *
	 * @return \Spryker\Yves\Kernel\Container
	 */
	public function provideDependencies(Container $container)
	{
		$container = $this->addMyPageFooBarWidgetPlugins($container);
 
		return $container;
	}
 
	/**
	 * @param \Spryker\Yves\Kernel\Container $container
	 *
	 * @return \Spryker\Yves\Kernel\Container
	 */
	protected function addMyPageFooBarWidgetPlugins(Container $container)
	{
		$container[self::PLUGIN_MY_PAGE_FOO_BAR_WIDGETS] = function () {
			return $this->getMyPageFooBarWidgetPlugins();
		};
 
		return $container;
	}
 
	/**
	 * @return string[]
	 */
	protected function getMyPageFooBarWidgetPlugins(): array
	{
		// activate list of widgets plugins for FooController:barAction()
		return [
			MyWidgetPlugin::class,
		];
	}
}
```

### Activate a Widget in Another Widget

In the same cases, it's necessary to extend widgets with other sub-widgets. The concept of nesting widgets in each other is the same as they were used in a Page, the only difference is how they are activated. You can activate sub-widgets in the `initialize()` method of any widget.

Those widgets that were activated in a controller are not available in other widgets. Every rendered Page and Widget have their own scope of twig variables and available widgets.

```php
<?php
 
namespace Pyz\Yves\MyWidget\Plugin\MyPage;
 
use Pyz\Yves\MyPage\Dependency\Plugin\MyWidget\MyWidgetPluginInterface;
use Spryker\Yves\Kernel\Widget\AbstractWidgetPlugin;
 
/**
 * @method \Pyz\Yves\MyWidget\MyPageWidget getFactory()
 */
class MyWidgetPlugin extends AbstractWidgetPlugin implements MyWidgetPluginInterface
{
	/**
	 * @param string $myMandatoryParam
	 * @param int|null $myOptionalParam
	 *
	 * @return void
	 */
	public function initialize(string $myMandatoryParam, int $myOptionalParam = null): void
	{
		// activate list of sub-widgets
		$this->addWidgets($this->getFactory()->getMyWidgetSubWidgets());
	}
 
	// ...
}
```

### Activate a Widget to Be Available Globally

Widgets available globally are activated in a central place, in the dependency provider of the `ShopApplication` module. Only these widgets can be reached with the `widgetGlobal()` twig functions.

```php
<?php
 
namespace Pyz\Yves\ShopApplication;
 
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
 
class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
	/**
	 * @return string[]
	 */
	protected function getGlobalWidgetPlugins(): array
	{
		return [
			// list of active global widgets
		];
	}
}
```


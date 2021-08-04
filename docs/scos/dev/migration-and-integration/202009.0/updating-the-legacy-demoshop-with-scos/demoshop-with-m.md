---
title: Making the Legacy Demoshop Compatible with the Modular Frontend
originalLink: https://documentation.spryker.com/v6/docs/demoshop-with-modular-frontend
redirect_from:
  - /v6/docs/demoshop-with-modular-frontend
  - /v6/docs/en/demoshop-with-modular-frontend
---

## Infrastructure Preparation

{% info_block infoBox %}
This has to be done only once for the Legacy Demoshop (not for every feature.
{% endinfo_block %})

These steps are required to install features which use the new [shop pages and widgets](https://github.com/spryker-shop), that is the shop app.

### 1. Add infrastructure modules

To use the [spryker-shop](https://github.com/spryker-shop) modules, you need to add new modules required by infrastructure. Do the following:
1. Update all the existing modules:

```bash
composer update "spryker/*"
```

2. Remove the Event-Behavior module to avoid the version constraint problems:

```bash
composer remove spryker/event-behavior
```

3. Remove `$config[EventBehaviorConstants::EVENT_BEHAVIOR_TRIGGERING_ACTIVE] = false;` from `config_default.php`.


4. Remove `new EventBehaviorTriggerTimeoutConsole()`, from `\Pyz\Zed\Console\ConsoleDependencyProvider`.

5. Install the required modules for Shop-App:

```bash
composer require "spryker/kernel":"^3.24.0" spryker-shop/shop-router:"^1.0.0" spryker-shop/shop-application:"^1.3.0" spryker-shop/shop-ui:"^1.0.0" --update-with-all-dependencies
```

6. Install the required modules for Publish&amp;Synchronize:

```yaml
composer require spryker/availability-storage:"^1.0.0" spryker/category-page-search:"^1.0.0" 
spryker/category-storage:"^1.0.0" spryker/cms-block-category-storage:"^1.0.0"
spryker/cms-block-product-storage:"^1.0.0" spryker/cms-block-storage:"^1.0.0"
spryker/cms-page-search:"^1.0.0" spryker/cms-storage:"^1.0.0" spryker/glossary-storage:"^1.0.0"
spryker/navigation-storage:"^1.0.0" spryker/price-product-storage:"^1.0.0"
spryker/product-category-filter-storage:"^1.0.0"
spryker/product-category-storage:"^1.0.0" spryker/product-group-storage:"^1.0.0"
spryker/product-image-storage:"^1.0.0" spryker/product-label-search:"^1.0.0"
spryker/product-label-storage:"^1.0.0" spryker/product-measurement-unit:"^0.2.0"
spryker/product-measurement-unit-storage:"^0.2.0" spryker/product-option-storage:"^1.0.0"
spryker/product-page-search:"^1.0.0" spryker/product-relation-storage:"^1.0.0"
spryker/product-review-search:"^1.0.0" spryker/product-review-storage:"^1.0.0"
spryker/product-search-config-storage:"^1.0.0" spryker/product-set-page-search:"^1.0.0"
spryker/product-set-storage:"^1.0.0" spryker/product-storage:"^1.0.0"
spryker/url-storage:"^1.0.0"  spryker/product-quantity-storage:"^0.1.1" --update-with-all-dependencies
```

### 2. Add namespace to configuration
To let the Kernel find your files within the SprykerShop Organization namespace, add SprykerShop as a new namespace to `Spryker\Shared\Kernel\KernelConstants::CORE_NAMESPACES` in your `./config/Shared/config_default.php`. 

{% info_block infoBox %}
`$config[\Spryker\Shared\Kernel\KernelConstants::CORE_NAMESPACES] = [ 'SprykerEco', 'Spryker',  'SprykerShop'];`
{% endinfo_block %}

### 3. Add Application plugins
To make all the features available from the newly added Modules, add the following lines to `\Pyz\Yves\ShopApplication\ShopApplicationDependencyProvider::getApplicationPlugins()`.

src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php
    
```php
// ...

use SprykerShop\Yves\ShopApplication\Plugin\Twig\ShopApplicationTwigPlugin;
use SprykerShop\Yves\ShopApplication\Plugin\Application\ShopApplicationApplicationPlugin;
use Spryker\Yves\Store\Plugin\Application\StoreApplicationPlugin;
use Spryker\Yves\Locale\Plugin\Application\LocaleApplicationPlugin;
 
class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return \Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface[]
     */
    protected function getApplicationPlugins(): array
    {
        return [
	    // ...
	    new ShopApplicationTwigPlugin(),
	    new ShopApplicationApplicationPlugin(),
	    new StoreApplicationPlugin(),
	    new LocaleApplicationPlugin(),
	];
    }
}
```

### 4. Add EventDispatcher plugins
To make all the features available from the newly added Modules, add the following lines to `\Pyz\Yves\EventDispatcher\EventDispatcherDependencyProvider::getEventDispatcherPlugins()`.

src/Pyz/Yves/EventDispatcher/EventDispatcherDependencyProvider.php
    
```php
// ...

use SprykerShop\Yves\ShopApplication\Plugin\EventDispatcher\ShopApplicationEventDispatcherPlugin;
use SprykerShop\Yves\ShopApplication\Plugin\EventDispatcher\ShopApplicationFilterControllerEventDispatcherPlugin;
 
class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return \Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface[]
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
	    // ...
	    new ShopApplicationEventDispatcherPlugin(),
	    new ShopApplicationFilterControllerEventDispatcherPlugin(),
	];
    }
}
```


### 5. Add Twig plugins
To make all the features available from the newly added Modules, add the following lines to `\Pyz\Yves\Twig\TwigDependencyProvider::getTwigPlugins()`.

src/Pyz/Yves/Twig/TwigDependencyProvider.php
    
```php
// ...

use SprykerShop\Yves\ShopApplication\Plugin\Twig\WidgetTwigPlugin;
use SprykerShop\Yves\ShopApplication\Plugin\Twig\WidgetTagTwigPlugin;
 
class TwigDependencyProvider extends SprykerShopTwigDependencyProvider
{
    /**
     * @return \Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface[]
     */
    protected function getTwigPlugins(): array
    {
        return [
	    // ...
	    new WidgetTwigPlugin(),
	    new WidgetTagTwigPlugin(),
	];
    }
}
```


### 6. Inherit YvesBootstrap
You need to inherit YvesBootstrap from `SprykerShop\Yves\ShopApplication\YvesBootstrap`

src/Pyz/Yves/Application/YvesBootstrap.php
    
```php
use SprykerShop\Yves\ShopApplication\YvesBootstrap as SprykerYvesBootstrap;
 
class YvesBootstrap extends SprykerYvesBootstrap
```

### 7. Change layout for new shop app modules
The new shop app modules use a new layout which is not supported in Demoshop. To make them compatible, you need to switch to the existing layout.

Create a file `page-layout-main.twig` and add the following code.

src/Pyz/Yves/ShopUi/Theme/default/templates/page-layout-main/page-layout-main.twig

```php
{% raw %}{%{% endraw %} extends "@application/layout/layout.twig" {% raw %}%}{% endraw %}
```

Don't forget to flush the cache afterwards.

```bash
console cache:empty-all
```


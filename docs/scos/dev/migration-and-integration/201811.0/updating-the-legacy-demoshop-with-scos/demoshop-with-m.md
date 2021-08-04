---
title: Making the Legacy Demoshop Compatible with the Modular Frontend
originalLink: https://documentation.spryker.com/v1/docs/demoshop-with-modular-frontend
redirect_from:
  - /v1/docs/demoshop-with-modular-frontend
  - /v1/docs/en/demoshop-with-modular-frontend
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

### 3. Add service providers
To make all the features available from the newly added Modules, add the following lines to `Pyz\Yves\Application\YvesBootstrap::registerServiceProviders()` between the registration of the `TwigServiceProvider` and the `SprykerTwigServiceProvider`.

<details open>
<summary>src/Pyz/Yves/Application/YvesBootstrap.php</summary>
    
```php
...
use SprykerShop\Yves\ShopApplication\Plugin\Provider\ShopApplicationServiceProvider;
use SprykerShop\Yves\ShopApplication\Plugin\Provider\ShopControllerEventServiceProvider;
use SprykerShop\Yves\ShopApplication\Plugin\Provider\ShopTwigServiceProvider;
use SprykerShop\Yves\ShopApplication\Plugin\Provider\WidgetServiceProvider;
use SprykerShop\Yves\ShopApplication\Plugin\Provider\WidgetTagServiceProvider;
use SprykerShop\Yves\ShopUi\Plugin\Provider\ShopUiTwigServiceProvider;
 
class YvesBootstrap
{
	...
 
	protected function registerServiceProviders()
	{
		...
 
		$this->application->register(new TwigServiceProvider()); // existing registration
 
		$this->application->egister(new ShopApplicationServiceProvider());
		$this->application->register(new ShopControllerEventServiceProvider());
		$this->application->register(new ShopTwigServiceProvider());
		$this->application->register(new WidgetServiceProvider());
		$this->application->register(new WidgetTagServiceProvider());
		$this->application->register(new ShopUiTwigServiceProvider());
 
		$this->application->register(new SprykerTwigServiceProvider()); // existing registration
 
		...
	}
}
```

</br>
</details>

### 4. Inherit YvesBootstrap
You need to inherit YvesBootstrap from `SprykerShop\Yves\ShopApplication\YvesBootstrap`

<details open>
<summary>src/Pyz/Yves/Application/YvesBootstrap.php</summary>
    
```php
use SprykerShop\Yves\ShopApplication\YvesBootstrap as SprykerYvesBootstrap;
 
class YvesBootstrap extends SprykerYvesBootstrap
```

</br>
</details>

### 5. Adopt routers in YvesBootstrap
You will also need to change the applied `SilexRouter` so that the new controllers from the `SprykerShop` namespace can be used.

```php
// use Pyz\Shared\Application\Business\Routing\SilexRouter;
use SprykerShop\Yves\ShopRouter\Plugin\Router\SilexRouter
```

### 6. Change layout for new shop app modules
The new shop app modules use a new layout which is not supported in Demoshop. To make them compatible, you need to switch to the existing layout.

Create a file `page-layout-main.twig` and add the following code.

src/Pyz/Yves/ShopUi/Theme/default/templates/page-layout-main/page-layout-main.twig

```
{% raw %}{%{% endraw %} extends "@application/layout/layout.twig" {% raw %}%}{% endraw %}
```

Don't forget to flush the cache afterwards.

```bash
console cache:empty-all
```

<!-- Last review date: November 1st, 2018by René Klatt, Tamás Nyulas, Dmitry Beirak -->

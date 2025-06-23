

{% info_block errorBox %}

This guide expects the basic feature to be in place and only adds the following functionality:

- [Add product to cart from the Catalog page](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/feature-overviews/cart-feature-overview/quick-order-from-the-catalog-page-overview.html)
- Dynamic cart page update functionality
- Database storage strategy for customer quotes

{% endinfo_block %}

## Install feature core

Follow the steps below to install the core of the functionality.

### Prerequisites

Install the required features:

| NAME           | VERSION           | INSTALLATION GUIDE |
| -------------- | ----------------- | ----------------- |
| Spryker Core | {{site.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

### 1) Install the required modules

```bash
composer require spryker-feature/cart {{site.version}} --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE         | EXPECTED DIRECTORY                   |
|----------------|--------------------------------------|
| Calculation    | vendor/spryker/calculation           |
| Cart           | vendor/spryker/cart                  |
| CartNote       | vendor/spryker/cart-note             |
| CartVariant    | vendor/spryker/cart-variant          |
| PersistentCart | vendor/spryker/persistent-cart       |

{% endinfo_block %}

### 2) Add translations

1. Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
global.add-to-cart,In den Warenkorb,de_DE
global.add-to-cart,Add to Cart,en_US
cart_page.error_message.unexpected_error,Unexpected error occurred.,en_US
cart_page.error_message.unexpected_error,Ein unerwarteter Fehler aufgetreten.,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure the keys with translations have been added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

### 3) Enable database storage strategy

To enable database storage strategy for customer quotes, override the `getStorageStrategy()` method in the Quote module's shared configuration.

**src/Pyz/Shared/Quote/QuoteConfig.php**

```php
<?php

namespace Pyz\Shared\Quote;

use Spryker\Shared\Quote\QuoteConfig as SprykerQuoteConfig;

class QuoteConfig extends SprykerQuoteConfig
{
    /**
     * @return string
     */
    public function getStorageStrategy(): string
    {
        return static::STORAGE_STRATEGY_DATABASE;
    }
}
```

{% info_block warningBox "Verification" %}

1. Log in on the Storefront as a customer.
2. Add items to cart.
  Make sure records have been created in the `spy_quote` table.
3. Log out and log back in.
  Make sure your cart items are still in cart.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the frontend of the functionality.

### Prerequisites

Install the required features:

| NAME           | VERSION           | INSTALLATION GUIDE |
| -------------- | ----------------- | ----------------- |
| Spryker Core | {{site.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

### 1) Install the required modules

```bash
composer require spryker-feature/cart {{site.version}} --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE         | EXPECTED DIRECTORY                   |
|----------------|--------------------------------------|
| CartPage       | vendor/spryker-shop/cart-page        |
| CartNoteWidget | vendor/spryker-shop/cart-note-widget |

{% endinfo_block %}

### 2) Set up configuration

Set up the following configuration:

| CONFIGURATION                                                  | SPECIFICATION                                                              | NAMESPACE                    |
|----------------------------------------------------------------|----------------------------------------------------------------------------|------------------------------|
| CartPageConfig::IS_CART_CART_ITEMS_VIA_AJAX_LOAD_ENABLED       | Enables cart items to be loaded via AJAX.                                  | SprykerShop\Yves\CartPage    |
| CartPageConfig::IS_LOADING_UPSELLING_PRODUCTS_VIA_AJAX_ENABLED | Enables upselling products to be loaded via AJAX.                          | SprykerShop\Yves\CartPage    |
| CartPageConfig::IS_CART_ACTIONS_ASYNC_MODE_ENABLED             | Enables cart actions to be performed via AJAX.                             | SprykerShop\Yves\CartPage    |
| CatalogPageConfig::IS_MINI_CART_ASYNC_MODE_ENABLED             | Enables the mini cart to be rendered async during the AJAX add to cart action. | SprykerShop\Yves\CatalogPage |
| CartPageConfig::IS_QUOTE_VALIDATION_ENABLED_FOR_AJAX_CART_ITEMS| Disables quote validation when retrieving cart items via AJAX.              | SprykerShop\Yves\CartPage    |

**src/Pyz/Yves/CartPage/CartPageConfig.php**

```php
<?php

namespace Pyz\Yves\CartPage;

use SprykerShop\Yves\CartPage\CartPageConfig as SprykerCartPageConfig;

class CartPageConfig extends SprykerCartPageConfig
{
    /**
     * @var bool
     */
    protected const IS_CART_CART_ITEMS_VIA_AJAX_LOAD_ENABLED = true;

    /**
     * @var bool
     */
    protected const IS_LOADING_UPSELLING_PRODUCTS_VIA_AJAX_ENABLED = true;

    /**
     * @var bool
     */
    protected const IS_CART_ACTIONS_ASYNC_MODE_ENABLED = true;
    
    /**
     * @var bool
     */
    protected const IS_QUOTE_VALIDATION_ENABLED_FOR_AJAX_CART_ITEMS = false;
}
```

{% info_block warningBox "Verification" %}

Make sure the following applies on the **Cart** page:
- Cart items are loaded via AJAX
- Upselling products are loaded via AJAX
- Cart actions, like changing item quantity or removing an item, are performed via AJAX

{% endinfo_block %}

**src/Pyz/Yves/CatalogPage/CatalogPageConfig.php**

```php
<?php

namespace Pyz\Yves\CatalogPage;

use SprykerShop\Yves\CatalogPage\CatalogPageConfig as SprykerCatalogPageConfig;

class CatalogPageConfig extends SprykerCatalogPageConfig
{
    /**
     * @var bool
     */
    protected const IS_MINI_CART_ASYNC_MODE_ENABLED = true;
}
```

{% info_block warningBox "Verification" %}

Make sure that, on the **Catalog** page, cart actions, like changing item quantity or removing an item, are performed via AJAX.

{% endinfo_block %}

### 3) Enable controllers

Register the following route providers on the Storefront:

| PROVIDER                                | NAMESPACE                                     |
|-----------------------------------------|-----------------------------------------------|
| CartPageRouteProviderPlugin             | SprykerShop\Yves\CartPage\Plugin\Router       |
| CartPageAsyncRouteProviderPlugin        | SprykerShop\Yves\CartPage\Plugin\Router       |
| CartNoteWidgetRouteProviderPlugin       | SprykerShop\Yves\CartNoteWidget\Plugin\Router |
| CartNoteWidgetAsyncRouteProviderPlugin  | SprykerShop\Yves\CartNoteWidget\Plugin\Router |


**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\CartNoteWidget\Plugin\Router\CartNoteWidgetAsyncRouteProviderPlugin;
use SprykerShop\Yves\CartNoteWidget\Plugin\Router\CartNoteWidgetRouteProviderPlugin;
use SprykerShop\Yves\CartPage\Plugin\Router\CartPageAsyncRouteProviderPlugin;
use SprykerShop\Yves\CartPage\Plugin\Router\CartPageRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return list<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new CartPageRouteProviderPlugin(),
            new CartPageAsyncRouteProviderPlugin(),
            new CartNoteWidgetRouteProviderPlugin(),
            new CartNoteWidgetAsyncRouteProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}


| PLUGIN | VERIFICATION |
| - | - |
| CartPageRouteProviderPlugin` | `https://mysprykershop.com/cart` page is accessible. |

| CartPageAsyncRouteProviderPlugin | You can perform cart actions, like changing item quantity or removing an item, with AJAX mode enabled. |

| CartNoteWidgetRouteProviderPlugin | You can add a cart note. |

| CartNoteWidgetAsyncRouteProviderPlugin | You can add a cart item note with AJAX mode enabled. |

{% endinfo_block %}

### 4) Set up behavior

1. Activate the following plugins:

| PLUGIN                               | SPECIFICATION                                                    | PREREQUISITES | NAMESPACE                                 |
|--------------------------------------|------------------------------------------------------------------|---------------|-------------------------------------------|
| CartBlockMiniCartViewExpanderPlugin  | Expands the provided `MiniCartView.content` with a mini cart view. |           | SprykerShop\Yves\CartPage\Plugin\CartPage |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CartPage;

use SprykerShop\Yves\CartPage\CartPageDependencyProvider as SprykerCartPageDependencyProvider;
use SprykerShop\Yves\CartPage\Plugin\CartPage\CartBlockMiniCartViewExpanderPlugin;

class CartPageDependencyProvider extends SprykerCartPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\CartPageExtension\Dependency\Plugin\MiniCartViewExpanderPluginInterface>
     */
    protected function getMiniCartViewExpanderPlugins(): array
    {
        return [
            new CartBlockMiniCartViewExpanderPlugin(),
        ];
    }
}
```


2. B2C Shop: Add the following configuration:

**src/Pyz/Yves/CartPage/CartPageConfig.php**

```php
<?php

namespace Pyz\Yves\CartPage;

use SprykerShop\Yves\CartPage\CartPageConfig as SprykerCartPageConfig;

class CartPageConfig extends SprykerCartPageConfig
{
    /**
     * @var string
     */
    protected const CART_BLOCK_MINI_CART_VIEW_TEMPLATE_PATH = '@ShopUi/components/organisms/navigation-top-async/navigation-top-async.twig';
}
```

{% info_block warningBox "Verification" %}

Make sure that, on the **Cart** page, cart actions, like changing item quantity or removing an item, are reflected in the mini cart.

{% endinfo_block %}

### 5) Set up widgets

1. Register the following widgets:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductAbstractAddToCartButtonWidget | Displays a button for adding a product abstract to cart in case the product is eligible. |  | SprykerShop\Yves\CartPage\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\CartPage\Widget\ProductAbstractAddToCartButtonWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            ProductAbstractAddToCartButtonWidget::class,
        ];
    }
}
```

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

On the catalog page, the add to cart product is displayed for an abstract product with a single concrete product.

{% endinfo_block %}

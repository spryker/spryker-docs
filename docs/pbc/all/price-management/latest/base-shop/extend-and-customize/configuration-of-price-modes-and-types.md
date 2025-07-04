---
title: Configuration of price modes and types
description: The article describes the net and gross prices management and how you can configure them for you Spryker Cloud Commerce OS Store.
last_updated: Sep 30, 2024
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/net-gross-prices-management
originalArticleId: 9240561a-379b-4a9e-a6c4-05bdf2dfa264
redirect_from:
  - /2021080/docs/net-gross-prices-management
  - /2021080/docs/en/net-gross-prices-management
  - /docs/net-gross-prices-management
  - /docs/en/net-gross-prices-management
  - /v6/docs/net-gross-prices-management
  - /v6/docs/en/net-gross-prices-management
  - /v5/docs/net-gross-prices-management
  - /v5/docs/en/net-gross-prices-management
  - /v4/docs/net-gross-prices-management
  - /v4/docs/en/net-gross-prices-management
  - /docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/net-and-gross-prices-management.html
  - /docs/pbc/all/price-management/extend-and-customize/configuration-of-price-modes-and-types.html
  - /docs/pbc/all/price-management/202204.0/base-shop/extend-and-customize/configuration-of-price-modes-and-types.html
related:
  - title: Multiple currencies per store configuration
    link: docs/pbc/all/price-management/page.version/base-shop/extend-and-customize/multiple-currencies-per-store-configuration.html
---

The following price modes are used to identify pricing type:

- GROSS_MODE: prices after tax.
- NET_MODE: prices before tax.

When a customer changes the price mode, they see different prices, taxes, as well as the discounts. Price mode is stored in Quote, which means that both modes can't be used at the same time. The price is selected in `\Spryker\Zed\PriceCartConnector\Communication\Plugin\CartItemPricePlugin` based on the current currency, type, and price mode.

Price type entity also has price mode to indicate which prices this type is applicable to:

- If it has the `BOTH` value, this price type is used for gross and net prices.
- If `GROSS_MODE` is selected for all price types, the price input form renders only gross part of prices.
- If `NET_MODE` is selected, the net price inputs are displayed respectively.

Each store can have a default price mode and a price type selected. These values are used when customer has not selected currency or changed the price mode.

You can use these keys in environment configuration:

- For default price type:

```php
$config[PriceProductConstants::DEFAULT_PRICE_TYPE] = 'DEFAULT';
```


- For default price mode:

```php
$config[PriceProductConstants::DEFAULT_PRICE_TYPE] = 'DEFAULT';
```

```php
$config[PriceConstants::DEFAULT_PRICE_MODE] = PriceConfig::PRICE_MODE_GROSS;
```


## Set up a price mode switcher

1. Upgrade the Price module to version 5 or higher. For instructions, see [Upgrade the Price module](/docs/pbc/all/price-management/latest/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-price-module.html).

2. Add `\SprykerShop\Yves\PriceWidget\Widget\PriceModeSwitcherWidget` to the `\Pyz\Yves\ShopApplication\ShopApplicationDependencyProvider::getGlobalWidgets()` method.
   This renders a drop-down list with the price mode selection.

3. Add `\SprykerShop\Yves\PriceWidget\Plugin\Router\PriceWidgetRouteProviderPlugin` to the `\Pyz\Yves\Router\RouterDependencyProvider::getRouteProvider()` method.

4. Create a template for the component:

**Pyz/Yves/Price/Theme/default/partial/price_mode_switcher.twig**

```html
   {% raw %}{%{% endraw %} if price_modes|length > 1 {% raw %}%}{% endraw %}
   	<form method="GET" action="{% raw %}{{{% endraw %} path('price-mode-switch') {% raw %}}}{% endraw %}" data-component="price-mode-switch">
   		<select name="price-mode" onchange="this.form.submit()">
   			{% raw %}{%{% endraw %} for price_mode in price_modes {% raw %}%}{% endraw %}
   				<option value="{% raw %}{{{% endraw %} price_mode {% raw %}}}{% endraw %}" {% raw %}{{{% endraw %} (price_mode == current_price_mode) ? 'selected' : ''{% raw %}}}{% endraw %}>{% raw %}{{{% endraw %} ('price.mode.' ~ price_mode | lower) | trans {% raw %}}}{% endraw %}</option>
   				{% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
   			</select>
   		<input type="hidden" name="referrer-url" value="{% raw %}{{{% endraw %} app.request.requestUri {% raw %}}}{% endraw %}" />
   	</form>
   {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
```

The switch works only when cart contains at least one item.


## Switching to net prices

To show only NET prices in the catalog, but use gross prices in cart and checkout, override `getDefaultPriceMode` and change to `PRICE_MODE_NET` in the `\Spryker\Shared\Price\PriceConfig` class.

Example of changing the mode for all stores:

```php
<?php

namespace Pyz\Shared\Price;

use Spryker\Shared\Price\PriceConfig as DefaultPriceConfig;

class PriceConfig extends DefaultPriceConfig
{
    /**
     * @return string
     */
    public function getDefaultPriceMode(): string
    {
        return static::PRICE_MODE_NET;
    }
}
```

Example of changing the mode for DE store:

```php
<?php

namespace Pyz\Shared\PriceDE;

use Spryker\Shared\Price\PriceConfig as DefaultPriceConfig;

class PriceConfig extends DefaultPriceConfig
{
    /**
     * @return string
     */
    public function getDefaultPriceMode(): string
    {
        return static::PRICE_MODE_NET;
    }
}
```

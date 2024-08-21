---
title: Configuration of price modes and types
description: The article describes the net and gross prices management
last_updated: Jun 16, 2021
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
related:
  - title: Multiple currencies per store configuration
    link: docs/pbc/all/price-management/page.version/base-shop/extend-and-customize/multiple-currencies-per-store-configuration.html
---

We use the following price modes to identify pricing type:

- **GROSS_MODE**- prices after tax.
- **NET_MODE** - prices before tax.

When customer changes the price mode, they will see different prices, taxes, as well as the discounts, as they are also applied based on the price mode. Price mode is stored in Quote, which means that you cannot have both modes at the same time. The price is selected in `\Spryker\Zed\PriceCartConnector\Communication\Plugin\CartItemPricePlugin` based on the current currency, type, and price mode.

Price type entity also has price mode to indicate which prices this type is applicable to:

- If it has `BOTH` value, then this price type will be used for gross and net prices.
- If you, for example, have selected price `GROSS_MODE` for all your price types - the price input form will render only gross part of prices.
- If you use `NET_MODE` - the net price inputs will be displayed respectively.

Each store can have a default price mode and a price type selected. Those values will be used when customer has not selected currency or changed the price mode.

You can use these keys in environment configuration:

- For default price type:

  ```yaml
  $config[PriceProductConstants::DEFAULT_PRICE_TYPE] = 'DEFAULT';
  ```


- For default price mode:

   ```yaml
  $config[PriceProductConstants::DEFAULT_PRICE_TYPE] = 'DEFAULT';
  ```

  ```yaml
  $config[PriceConstants::DEFAULT_PRICE_MODE] = PriceConfig::PRICE_MODE_GROSS;
  ```


## Set up a price mode switcher

1. Add  `\SprykerShop\Yves\PriceWidget\Widget\PriceModeSwitcherWidget` to the `\Pyz\Yves\ShopApplication\ShopApplicationDependencyProvider::getGlobalWidgets()` method.

   This will render a drop-down list with the price mode selection.

2. Add `\SprykerShop\Yves\PriceWidget\Plugin\Router\PriceWidgetRouteProviderPlugin` to the `\Pyz\Yves\Router\RouterDependencyProvider::getRouteProvider()` method.

3. Create template for the component:

   ```xml
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

5. Place the template you just created to `Pyz/Yves/Price/Theme/default/partial/price_mode_switcher.twig`

   The switch can happen only if quote have to items.

   This is available after the product currency release so you must first follow the steps in [Upgrade the Price module](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-price-module.html).


 {% info_block infoBox "Switching shop to Net prices:" %}

If you want to have only NET prices shown in catalog, but proceed in cart and checkout with Gross ones, you need to override `getDefaultPriceMode` and change to `PRICE_MODE_NET` in this class:

`return PriceConfig::PRICE_MODE_GROSS;`

{% endinfo_block %}

---
title: Multiple currencies per store configuration
description: Learn about the configuration of multiple currencies per store for your Spryker based projects.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/multiple-currencies-per-store-configuration
originalArticleId: cc037cf2-9504-4eac-a288-0a73691d0f2f
redirect_from:
  - /2021080/docs/multiple-currencies-per-store-configuration
  - /2021080/docs/en/multiple-currencies-per-store-configuration
  - /docs/multiple-currencies-per-store-configuration
  - /docs/en/multiple-currencies-per-store-configuration
  - /v6/docs/multiple-currencies-per-store-configuration
  - /v6/docs/en/multiple-currencies-per-store-configuration
  - /v5/docs/multiple-currencies-per-store-configuration
  - /v5/docs/en/multiple-currencies-per-store-configuration
  - /v4/docs/multiple-currencies-per-store-configuration
  - /v4/docs/en/multiple-currencies-per-store-configuration
  - /docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/multiple-currencies-per-store-configuration.html
  - /docs/pbc/all/price-management/202204.0/base-shop/extend-and-customize/multiple-currencies-per-store-configuration.html
related:
  - title: Net and gross prices management
    link: docs/pbc/all/price-management/latest/base-shop/extend-and-customize/configuration-of-price-modes-and-types.html
---

In a Spryker-based shop, you can define multiple currencies per store for product, product option, and shipping method. A product can, for example, cost 5 EUR in Germany, 6 EUR in France and 5 CHF in Switzerland. Your customers may easily choose between these different currencies.

All prices on the **Product Page** and in the **Cart** are adjusted automatically upon changing the currency.

{% info_block infoBox %}

Products for which you did not define a price in a specific currency do not appear in the catalog for that currency.

{% endinfo_block %}

This article describes how you can configure multiple currencies for your project.

## Currency module

{% info_block infoBox %}

The Currency module provides an easy way to retrieve information about a currency given as an ISO code.

{% endinfo_block %}


The methods in `CurrencyFacade` always returns an instance of the `CurrencyTransfer`. You can get any currency by its ISO code or the current configured currency.

## Usage

`CurrencyFacade` exposes the following methods:

- `CurrencyFacade::fromIsoCode()`
- `CurrencyFacade::getCurrent()`

The methods defined in the `CurrencyFacade` return an instance of the `CurrencyTransfer`, that contains:

- currency ISO code–for example, EUR
- currency name–for example, Euro
- currency symbol –for example, €

In addition, `CurrencyTransfer` contains information that specifies if it's the default currency or not. `CurrencyTransfer::$isDefault` can be used to check if currency that was retrieved by `CurrencyFacade::fromIsoCode()` is the same as the one configured as default for the current store.

From currency version 3, we have introduced currency table where currencies are persisted. Also, currency facade provides API to read this data.

{% info_block infoBox "Info" %}

Check the [Curency migration guide](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-currency-module.html) to migrate to the latest  module version.

{% endinfo_block %}

We have also introduced a currency switcher to Yves. To use it, do the following:

1. Add the `\SprykerShop\Yves\CurrencyWidget\Widget\CurrencyWidget` to your `\Pyz\Yves\ShopApplication\ShopApplicationDependencyProvider::getGlobalWidgets()` method. With this switcher, we have introduced a new extension point to act when currency is changed. Implement `"\Spryker\Yves\Currency\Dependency\CurrencyPostChangePluginInterface"` in your custom plugin, place it to `"\Pyz\Yves\Currency\CurrencyDependencyProvider::getCurrencyPostChangePlugins"` and get notified when currency is changed.

2. Register in Yves `RouterDependencyProvider`:

```php
<?php

namespace Pyz\Yves\Router;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        return [
            // ...
            new CurrencyWidgetRouteProviderPlugin($isSsl),
            // ...
        ]
    }
}
```

3. Create template in `"/Pyz/Yves/Currency/Theme/default/partial/currency_switcher.twig"`:

```xml
{% raw %}{%{% endraw %} if currencies|length > 1 {% raw %}%}{% endraw %}
    <form method="GET" action="{% raw %}{{{% endraw %} path('currency-switch') {% raw %}}}{% endraw %}" data-component="currency-switch">
        <select name="currency-iso-code" onchange="this.form.submit()">
        {% raw %}{%{% endraw %} for currency in currencies {% raw %}%}{% endraw %}
               <option value="{% raw %}{{{% endraw %} currency.code {% raw %}}}{% endraw %}" {% raw %}{{{% endraw %} (currency.code == currentCurrency) ? 'selected' : ''{% raw %}}}{% endraw %}>{% raw %}{{{% endraw %} currency.name | trans {% raw %}}}{% endraw %}</option>
        {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
        </select>
        <input type="hidden" name="referrer-url" value="{% raw %}{{{% endraw %} app.request.requestUri {% raw %}}}{% endraw %}" />
    </form>
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
```

In order to get the cart recalculated when currency is switched, you need rebuild quote/recalculate item discounts, prices and other related product data when currency changes. To do that, follow these steps:

1. Install the new `composer require spryker/cart-currency-connector` module.
2. Include plugin `\Spryker\Yves\CartCurrencyConnector\CurrencyChange\RebuildCartOnCurrencyChangePlugin` to the currency post change plugin stack:

```php
<?php

namespace Pyz\Yves\Currency;

use Spryker\Yves\CartCurrencyConnector\CurrencyChange\RebuildCartOnCurrencyChangePlugin;
use Spryker\Yves\Currency\CurrencyDependencyProvider as SprykerCurrencyDependencyProvider;

class CurrencyDependencyProvider extends SprykerCurrencyDependencyProvider
{
    /**
     * @return \Spryker\Yves\Currency\Dependency\CurrencyPostChangePluginInterface[]
     */
    protected function getCurrencyPostChangePlugins()
    {
        return [
            new RebuildCartOnCurrencyChangePlugin(),
        ];
    }
}
```

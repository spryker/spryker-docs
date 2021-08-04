---
title: Multiple Currencies per Store Configuration
originalLink: https://documentation.spryker.com/v5/docs/multiple-currencies-per-store-configuration
redirect_from:
  - /v5/docs/multiple-currencies-per-store-configuration
  - /v5/docs/en/multiple-currencies-per-store-configuration
---

## Currency Module

{% info_block infoBox %}
The Currency module provides an easy way to retrieve information about a currency given as an ISO code.
{% endinfo_block %}


The methods in `CurrencyFacade` always returns an instance of the `CurrencyTransfer`. You can get any currency by its ISO code or the current configured currency.

## Usage

`CurrencyFacade` exposes the following methods:

* `CurrencyFacade::fromIsoCode()`
* `CurrencyFacade::getCurrent()`

The methods defined in the `CurrencyFacade` return an instance of the `CurrencyTransfer`, that contains:

* currency ISO code e.g. EUR
* currency name e.g. Euro
* currency symbol e.g. €

In addition, `CurrencyTransfer` contains information that specifies if it is the default currency or not. `CurrencyTransfer::$isDefault` can be used to check if currency that was retrieved by `CurrencyFacade::fromIsoCode()` is the same as the one configured as default for the current store.

From currency version 3, we have introduced currency table where currencies are persisted. Also, currency facade provides API to read this data. 
{% info_block infoBox "Info" %}

Check the [Curency migration guide](https://documentation.spryker.com/docs/en/mg-currency) to migrate to the latest  module version.

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


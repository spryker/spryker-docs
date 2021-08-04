---
title: Multiple Currencies per Store
originalLink: https://documentation.spryker.com/v1/docs/multiple-currencies-per-store
redirect_from:
  - /v1/docs/multiple-currencies-per-store
  - /v1/docs/en/multiple-currencies-per-store
---

The Spryker Commerce OS lets you to define multiple currencies per store for product, product option and shipping method. A product can, for example, cost 5 EUR in Germany, 6 EUR in France and 5 CHF in Switzerland. Your customers may easily choose between these different currencies.

All prices on the **Product Page** and in the **Cart** are adjusted automatically upon changing the currency.

{% info_block infoBox %}
Products for which you did not define a price in a specific currency do not appear in the catalog for that currency.
{% endinfo_block %}

## Currency Module

{% info_block infoBox %}
The Currency module provides an easy way to retrieve information about a currency given as an ISO code.
{% endinfo_block %}


The methods in the `CurrencyFacade` will always return an instance of the `CurrencyTransfer`. You can get any currency by its ISO code or the current configured currency.

## Usage

`CurrencyFacade` exposes the following methods:

* `CurrencyFacade::fromIsoCode()`
* `CurrencyFacade::getCurrent()`

The methods defined in the `CurrencyFacade` return an instance of the `CurrencyTransfer`, that contains:

* currency ISO code e.g. EUR
* currency name e.g. Euro
* currency symbol e.g. €

In addition, `CurrencyTransfer` contains information that specifies if it is the default currency or not. `CurrencyTransfer::$isDefault` can be used to check if currency that was retrieved by `CurrencyFacade::fromIsoCode()` is the same as the one configured as default for the current store.

From currency version 3, we have introduced currency table where currencies are persisted. And currency facade provides API to read this data. Please check migration guide to migrate to the latest currency module. We have also introduced a currency switcher to Yves. To use it, do the following:

1. Include `"\Spryker\Yves\Currency\Plugin\CurrencySwitcherServiceProvider"` to your Yves bootstrap and then include twig function `"spyCurrencySwitch"` in your template where you want the switcher to appear. With this switcher we have introduced a new extension point to act when currency is changed. Implement `"\Spryker\Yves\Currency\Dependency\CurrencyPostChangePluginInterface"` in your custom plugin, place it to `"\Pyz\Yves\Currency\CurrencyDependencyProvider::getCurrencyPostChangePlugins"` and get notified when currency is changed.
2. Create a Controller Provider for switcher:
```php
<php

/**
* This file is part of the Spryker Demoshop.
* For full license information, please view the LICENSE file that was distributed with this source code.
*/

namespace Pyz\Yves\Price\Plugin;

use Pyz\Yves\Application\Plugin\Provider\AbstractYvesControllerProvider;
use Silex\Application;

class PriceControllerProvider extends AbstractYvesControllerProvider
{
   const ROUTE_PRICE_SWITCH = 'price-mode-switch';

   /**
    * @param \Silex\Application $app
    *
    * @return void
    */
   protected function defineControllers(Application $app)
   {
       $this->createController(
           '/price-mode-switch',
           static::ROUTE_PRICE_SWITCH,
           'Price',
           'PriceModeSwitch',
           'index'
       );
   }
}
```

3. Register in Yves bootstrap:
```php
<?php

namespace Pyz\Yves\Application;

class YvesBootstrap
{
    /**
    * @param bool|null $isSsl
    *
    * @return \Pyz\Yves\Application\Plugin\Provider\AbstractYvesControllerProvider[]
    */
   protected function getControllerProviderStack($isSsl)
   {
      return [
        ...
        new CurrencyControllerProvider($isSsl),
        ...
    ]
   }
}
```

4. Create template in `"/Pyz/Yves/Currency/Theme/default/partial/currency_switcher.twig"`:
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

In order to get the cart recalculated when currency is switched, you need rebuild quote/recalculate item discounts, prices and other related product data when currency changes. To do that, install the new `composer require spryker/cart-currency-connector` module.

Then include plugin `\Spryker\Yves\CartCurrencyConnector\CurrencyChange\RebuildCartOnCurrencyChangePlugin` to currency post change plugin stack:

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

<!--
**See also:**

* Money
* Migration Guide - Currency
-->


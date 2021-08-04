---
title: Net & Gross Prices
originalLink: https://documentation.spryker.com/v1/docs/net-gross-price
redirect_from:
  - /v1/docs/net-gross-price
  - /v1/docs/en/net-gross-price
---

You can easily manage gross and net prices per product, country, currency or anything else and define which price you want to display in the shop. In turn, your customers can choose their preferred currency when visiting your store. Customers can switch between gross and net mode in the shop.

## Price Mode

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


### Price Mode Switching

There is a price switcher plugin to help you with implementing price switcher in Yves.

To use it, do the following:

1. Register ` "\Spryker\Yves\Price\Plugin\PriceModeSwitcherServiceProvider"`  in Yves Application bootstrap `$this->application->register(new PriceModeSwitcherServiceProvider());` .

   This service provider plugin will activate `spyPriceModeSwitch` twig function which can be inserted anywhere in your twig template.

   This will render drop-down list with the price mode selection.

2. Create Controller Provider for switcher:

   ```php
   <?php
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

3. Add it to YvesBootstrap:

   ```php
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
          		new PriceControllerProvider($isSsl),
          		...
   		]
    	 }
   }
   ```
4. Create template for component:

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

   This is available after the product currency release so you must first follow the steps in [Migration Guide - Price](/docs/scos/dev/migration-and-integration/201811.0/module-migration-guides/mg-price).
   
   
 {% info_block infoBox "Switching shop to Net prices:" %}
If you want to have only NET prices shown in catalog, but proceed in cart and checkout with Gross ones, you need to override `getDefaultPriceMode` and change to `PRICE_MODE_NET` in this class:<br>`return PriceConfig::PRICE_MODE_GROSS;`
{% endinfo_block %}
 

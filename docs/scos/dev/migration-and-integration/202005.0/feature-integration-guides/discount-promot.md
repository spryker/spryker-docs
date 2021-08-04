---
title: Discount Promotion Feature Integration
originalLink: https://documentation.spryker.com/v5/docs/discount-promotion-feature-integration
redirect_from:
  - /v5/docs/discount-promotion-feature-integration
  - /v5/docs/en/discount-promotion-feature-integration
---

To start using the Discount Promotion feature, you have to do some configuration in your Zed application.

## Prerequisites

1. First make sure you have the latest `DiscountPromotion` module. 
Usecthe `composer require spryker/discount-promotion` command to install it.
2. You also need at least  `"spryker/discount": "^4.5.0"` for the discount module.
* Run `vendor/bin/console transfer:generate` to generate the latest transfer object.
* Run `vendor/bin/console propel:diff` to generate migration file for the database. Inspect this new file and check if only `spy_discount_promotion` has been created there.
* Run `vendor/bin/console propel:migrate` to migrate the latest generate migration file.
* Run `vendor/bin/console propel:model:build` to generate new propel Entities and Query classes.

## Enabling Discount Promotions

To enable Discount promotions, you have to add a number of plugins to the `Discount` module so that `DiscountPromotion` can  extend it.
Below there is the example of the `DiscountDependencyProvider` class.

```php
<?php
            
namespace Pyz\Zed\Discount;

use Spryker\Zed\Discount\DiscountDependencyProvider as SprykerDiscountDependencyProvider;
use Spryker\Zed\DiscountPromotion\Communication\Plugin\Discount\DiscountFilterPromotionDiscountsPlugin;
use Spryker\Zed\DiscountPromotion\Communication\Plugin\Discount\DiscountPromotionCalculationFormExpanderPlugin;
use Spryker\Zed\DiscountPromotion\Communication\Plugin\Discount\DiscountPromotionCollectorStrategyPlugin;
use Spryker\Zed\DiscountPromotion\Communication\Plugin\Discount\DiscountPromotionConfigurationExpanderPlugin;
use Spryker\Zed\DiscountPromotion\Communication\Plugin\Discount\DiscountPromotionPostSavePlugin;
use Spryker\Zed\DiscountPromotion\Communication\Plugin\Discount\DiscountPromotionPostUpdatePlugin;

	class DiscountDependencyProvider extends SprykerDiscountDependencyProvider
	{
		/**
		 	 * @return array
			 */
			protected function getDiscountableItemFilterPlugins()
			{
				return [
					new DiscountFilterPromotionDiscountsPlugin(), //Filter out discountable items which have promotionItem = trye
				];
			}

			/**
			 * @return \Spryker\Zed\Discount\Dependency\Plugin\CollectorStrategyPluginInterface[]
			 */
			protected function getCollectorStrategyPlugins()
			{
				return [
					new DiscountPromotionCollectorStrategyPlugin(), //specialized collector strategy for promotion discounts
				];
			}

			/**
			 * @return \Spryker\Zed\Discount\Dependency\Plugin\DiscountPostSavePluginInterface[]
			 */
			protected function getDiscountPostSavePlugins()
			{
				return [
					new DiscountPromotionPostSavePlugin(), //Save promotion discount
				];
			}

			/**
			 * @return \Spryker\Zed\Discount\Dependency\Plugin\DiscountPostUpdatePluginInterface[]
			 */
			protected function getDiscountPostUpdatePlugins()
			{
				return [
					new DiscountPromotionPostUpdatePlugin(),//Update promotion discount
				];
			}

			/**
			 * @return \Spryker\Zed\Discount\Dependency\Plugin\DiscountConfigurationExpanderPluginInterface[]
			 */
			protected function getDiscountConfigurationExpanderPlugins()
			{
				return [
					new DiscountPromotionConfigurationExpanderPlugin(), //Expand DiscountConfigurationTransfer with Promotion discount data.
				];
       		}

			/**
			 * This plugin allows to expand DiscountConfigurationTransfer when using
			 *
			 * @return \Spryker\Zed\Discount\Dependency\Plugin\Form\DiscountFormExpanderPluginInterface[]
			 */
			protected function getDiscountFormExpanderPlugins()
			{
				return [
					new DiscountPromotionCalculationFormExpanderPlugin(), //Expand Discount form type with new promotion discount. Adds new form fields.
				];
			}

			/**
			 * @return \Spryker\Zed\Discount\Dependency\Plugin\Form\DiscountFormDataProviderExpanderPluginInterface[]
			 */
			protected function getDiscountFormDataProviderExpanderPlugins()
			{
				return [
					new DiscountPromotionCalculationFormDataExpanderPlugin(), // Expand Discount form with additional data
				];
			}

			/**
			 * @return \Spryker\Zed\Discount\Dependency\Plugin\DiscountViewBlockProviderPluginInterface[]
			 */
			protected function getDiscountViewTemplateProviderPlugins()
			{
				return [
					new DiscountPromotionViewBlockProviderPlugin(), //Provide additional content to discount view page
				];
			}

			/**
			 * @return \Spryker\Zed\Discount\Dependency\Plugin\DiscountViewBlockProviderPluginInterface[]
			 */
			protected function getDiscountApplicableFilterPlugins()
			{
				return [
					new DiscountPromotionFilterApplicableItemsPlugin(), //Filter promotion items from decision rule
				];
			}
	}
```

The new calculator plugin must be registered in `CalculationDependencyProvider`:

```php
<?php
namespace Pyz\Zed\Calculation;

use Spryker\Zed\DiscountPromotion\Communication\Plugin\Calculation\RemovePromotionItemsCalculatorPlugin;

class CalculationDependencyProvider extends SprykerCalculationDependencyProvider
{
	protected function getQuoteCalculatorPluginStack(Container $container)
		{
			return [
				new RemoveTotalsCalculatorPlugin(),
				new RemoveAllCalculatedDiscountsCalculatorPlugin(),
				new RemovePromotionItemsCalculatorPlugin(), //Removes promotion items from quote

				...//other plugins
			];
		}
}
```

The new Cart expander plugin must be registered in:

```php
<?php
namespace Pyz\Zed\Cart;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
	/**
	 * @param \Spryker\Zed\Kernel\Container $container
	 *
	 * @return \Spryker\Zed\Cart\Dependency\ItemExpanderPluginInterface[]
	 */
	protected function getExpanderPlugins(Container $container)
		{
			return [
				... //other plugins
				new CartGroupPromotionItems(), //expand group key with promo item identifier
			];
		}
```

## Usage in Yves
To be able to see promotion products, you have to change how cart items are rendered in Yves:
1. Take the `Pyz\Yves\DiscountPromotion` module from demoshop and place it somewhere in your project.
2. Change the `CartOperationHandler::add` method to include promotion item flag. 
Like `$itemTransfer->setIsPromotion((bool)$this->request->request->get('isPromo'));`
3. Inject `ProductPromotionMapperPlugin` to Cart Module:

```php
<?php
namespace Pyz\Yves\Cart;

use Spryker\Yves\DiscountPromotion\Plugin\ProductPromotionMapperPlugin;

class CartDependencyProvider extends AbstractBundleDependencyProvider
{
	const PLUGIN_PROMOTION_PRODUCT_MAPPER = 'PLUGIN_PROMOTION_PRODUCT_MAPPER';

	/**
	 * @param \Spryker\Yves\Kernel\Container $container
	 *
	 * @return \Spryker\Yves\Kernel\Container
	 */
	protected function providePlugins(Container $container)
		{
			...//other plugins
			$container[self::PLUGIN_PROMOTION_PRODUCT_MAPPER] = function () {
			return new ProductPromotionMapperPlugin();
		};
	}
}
```

4. Add the  `getProductPromotionMapperPlugin` method to the `DiscountFactory` provider.

```php
<?php
namespace Pyz\Yves\Cart;

class CartFactory extends AbstractFactory
{
	/**
	 * @return \Spryker\Yves\DiscountPromotion\Dependency\PromotionProductMapperPluginInterface
	 */
	public function getProductPromotionMapperPlugin()
	{
		return $this->getProvidedDependency(CartDependencyProvider::PLUGIN_PROMOTION_PRODUCT_MAPPER);
	}
}
```

5. Add call to plugin in `CartController`.

```php
<?php
namespace Pyz\Yves\Cart\Controller;

/**
 * @method \Spryker\Client\Cart\CartClientInterface getClient()
 * @method \Pyz\Yves\Cart\CartFactory getFactory()
 */
class CartController extends AbstractController
{

	/**
	 * @param array|null $selectedAttributes
	 *
	 * @return array
	 */
	public function indexAction(array $selectedAttributes = null)
		{
			$promotionStorageProducts = $this->getFactory()
				->getProductPromotionMapperPlugin()
				->mapPromotionItemsFromProductStorage(
					$quoteTransfer,
					$this->getRequest()
			);

			$this->viewResponse([
				//other data
				'promotionStorageProducts' => $promotionStorageProducts,
			]);

}
```

Change twig templates to render promotion products. Since we've changed how quantity is rendered for promotion products, some cart templates in our demoshop were reorganized.

Firstly, make sure a promotion item twig template is called in `Pyz/Yves/Cart/Theme/default/cart/index.twig`. This usually should be placed after cart items as in the example below:

```php
{% raw %}{%{% endraw %} for cartItem in cartItems {% raw %}%}{% endraw %}
	{% raw %}{%{% endraw %} if cartItem.bundleProduct is defined {% raw %}%}{% endraw %}
		{% raw %}{%{% endraw %} include '@cart/cart/parts/cart-item.twig' with {
			cartItem: cartItem.bundleProduct,
			bundleItems: cartItem.bundleItems
		} {% raw %}%}{% endraw %}
		{% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
			{% raw %}{%{% endraw %} include '@cart/cart/parts/cart-item.twig' {% raw %}%}{% endraw %}
		{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
	{% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %} //existing code

{% raw %}{%{% endraw %} include '@DiscountPromotion/discount-promotion/item-list.twig' {% raw %}%}{% endraw %} //new include
```

`Pyz/Yves/Cart/Theme/default/cart/parts/cart-item.twig` was also heavily modified to work with promotion products (please check our demoshop version), as the cart page can be different per project.

The key points that were changed: the "Add to cart" button extracted to `Pyz/Yves/Cart/Theme/default/cart/parts/cart-add-to-cart.twig`, item price information extracted to `Pyz/Yves/Cart/Theme/default/cart/parts/cart-item-prices.twig`, cart product variants extracted to `Pyz/Yves/Cart/Theme/default/cart/parts/cart-product-variants.twig`.

Below there is the demoshop `Pyz/Yves/Cart/Theme/default/cart/parts/cart-item.twig` file for reference.

```php
<div class="callout cart-item"><div class="row">

	{% raw %}{%{% endraw %} include '@Cart/cart/parts/cart-images.twig' {% raw %}%}{% endraw %}

 	<div class="small-9 large-expand columns"><ul class="no-bullet">
		{# General data #}
		<li class="lead">{% raw %}{{{% endraw %} cartItem.name {% raw %}}}{% endraw %}</li><li class="__secondary"><small>{% raw %}{{{% endraw %} 'cart.item.sku' | trans {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} cartItem.sku {% raw %}}}{% endraw %}</small></li>

		{% raw %}{%{% endraw %} if bundleItems is defined {% raw %}%}{% endraw %}
			{# Product Bundles #}
			<li><strong>{% raw %}{{{% endraw %} 'cart.item.bundle.description' | trans {% raw %}}}{% endraw %}</strong><ul>
				{% raw %}{%{% endraw %} for bundleItem in bundleItems {% raw %}%}{% endraw %}
					<li>{% raw %}{{{% endraw %} bundleItem.quantity {% raw %}}}{% endraw %} x {% raw %}{{{% endraw %} bundleItem.name {% raw %}}}{% endraw %}  </li>
				{% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
					</ul></li>
				{% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
					{% raw %}{%{% endraw %} include '@Cart/cart/parts/cart-product-variants.twig' {% raw %}%}{% endraw %}
				{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
		</ul></div>

		{% raw %}{%{% endraw %} include '@Cart/cart/parts/cart-item-prices.twig' {% raw %}%}{% endraw %}

		{% raw %}{%{% endraw %} include '@Cart/cart/parts/cart-add-to-cart.twig' {% raw %}%}{% endraw %}
</div></div>
```

Make sure `CartOperationHandler` sets ID of `idDiscountPromotion`.

```php
public function add($sku, $quantity, $optionValueUsageIds = [])
	{
		$itemTransfer = new ItemTransfer();
		$itemTransfer->setSku($sku);
		$itemTransfer->setQuantity($quantity);
		$itemTransfer->setIdDiscountPromotion($this->getIdDiscountPromotion()); //new setter

		$this->addProductOptions($optionValueUsageIds, $itemTransfer);

		$quoteTransfer = $this->cartClient->addItem($itemTransfer);
		$this->cartClient->storeQuote($quoteTransfer);
	}

protected function getIdDiscountPromotion()
{
	return (int)$this->request->request->get('idDiscountPromotion');
}
```
When using promotion discount with voucher code, you will get the error message that voucher is not correct. It’s because voucher code is a product offered as promotion and not yet added to cart.

You have to modify `\Pyz\Yves\Discount\Handler\VoucherHandler::addFlashMessages` to handle discounts with promotions.

Add the following condition:

```php
namespace Pyz\Yves\Discount\Handler;

class VoucherHandler extends BaseHandler implements VoucherHandlerInterface
{
	/**
	 * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
	 * @param string $voucherCode
	 *
	 * @return void
	 */
	protected function addFlashMessages($quoteTransfer, $voucherCode)
		{

			//---new code
				if ($this->isVoucherFromPromotionDiscount($quoteTransfer, $voucherCode)) {
			return;
		}
		//-----

			if ($this->isVoucherCodeApplied($quoteTransfer, $voucherCode)) {
				$this->setFlashMessagesFromLastZedRequest($this->calculationClient);
		return;
		}

			$this->flashMessenger->addErrorMessage('cart.voucher.apply.failed');
		}

		/**
		 * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
		 * @param string $voucherCode
		 *
		 * @return bool
		 */
		protected function isVoucherFromPromotionDiscount(QuoteTransfer $quoteTransfer, $voucherCode)
		{
			foreach ($quoteTransfer->getUsedNotAppliedVoucherCodes() as $voucherCodeUsed) {
				if ($voucherCodeUsed === $voucherCode) {
 			return true;
		}
	}

    	return false;
	}
}
```

After this you should be able to use the new discounts with promotion.

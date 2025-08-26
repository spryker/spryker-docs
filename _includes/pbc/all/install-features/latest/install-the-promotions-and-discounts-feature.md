

{% info_block errorBox %}

The following feature integration guide expects the basic feature to be in place. This document describes how to add the *discount prioritization*, *HH:MM time definition in discount validity period*, and *voucher codes removal after the discount type switching* functionality.

{% endinfo_block %}

## Install feature core

Follow the steps below to install the Promotions & Discounts feature core.

### Prerequisites

Install the required features:


| NAME  | VERSION  | INSTALLATION GUIDE  |
|----------------|--------------------|---------------------|
| Spryker Core   | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)   |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/promotions-discounts 202507.0 --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE    | EXPECTED DIRECTORY       |
|-----------|--------------------------|
| Discount  | vendor/spryker/discount  |

 {% endinfo_block %}

### 2) Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY       | TYPE   | EVENT  |
|-----------------------|--------|--------|
| spy_discount.priority | column | added  |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes have been triggered in transfer objects:

| TRANSFER                     | TYPE     | EVENT   | PATH                                                               |
|------------------------------|----------|---------|--------------------------------------------------------------------|
| DiscountConfiguratorResponse | class    | created | src/Generated/Shared/Transfer/DiscountConfiguratorResponseTransfer |
| DiscountAmountCriteria       | class    | created | src/Generated/Shared/Transfer/DiscountAmountCriteriaTransfer       |
| Discount.priority            | property | created | src/Generated/Shared/Transfer/DiscountTransfer                     |
| Discount.minimumItemAmount   | property | created | src/Generated/Shared/Transfer/DiscountTransfer                     |
| Discount.storeRelation       | property | created | src/Generated/Shared/Transfer/DiscountTransfer                     |
| CalculatedDiscount.priority  | property | created | src/Generated/Shared/Transfer/CalculatedDiscountTransfer           |
| DiscountGeneral.priority     | property | created | src/Generated/Shared/Transfer/DiscountGeneral                      |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the discount form has the *PRIORITY* field, and the discounts table has the *PRIORITY* column.

Make sure, that the existing discounts in the `spy_discount` DB table have priority set to `9999`.

{% endinfo_block %}

### 3) Add translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

{% info_block warningBox "Verification" %}

Make sure that all labels and help tooltips in the discount form has English and German translation.

{% endinfo_block %}

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                            | SPECIFICATION                                                                                                                           | PREREQUISITES | NAMESPACE                                          |
|---------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------|
| DeleteDiscountVoucherPoolDiscountPostUpdatePlugin | Deletes all vouchers from the voucher pool and the voucher pool itself after switching the discount type from `voucher` to another one. |               | Spryker\Zed\Discount\Communication\Plugin\Discount |

**src/Pyz/Zed/Discount/DiscountDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Discount;

use Spryker\Zed\Discount\Communication\Plugin\Discount\DeleteDiscountVoucherPoolDiscountPostUpdatePlugin;
use Spryker\Zed\Discount\DiscountDependencyProvider as SprykerDiscountDependencyProvider;

class DiscountDependencyProvider extends SprykerDiscountDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\Discount\Dependency\Plugin\DiscountPostUpdatePluginInterface>
     */
    protected function getDiscountPostUpdatePlugins(): array
    {
        return [
            new DeleteDiscountVoucherPoolDiscountPostUpdatePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. In the Back Office, go to **Merchandising&nbsp;<span aria-label="'">></span> Discount**.
2. Create a discount with the **Voucher** type.
3. Generate several voucher codes for the created discount.
4. Switch the discount type from **Voucher** to another type–for example, **Cart rule**. Make sure the voucher pool and voucher codes related to discount are deleted from `spy_discount_voucher_pool` and from `spy_discount_voucher` DB tables.

{% endinfo_block %}

### 5) Build Zed UI frontend

Enable Javascript and CSS changes:

```bash
console frontend:project:install-dependencies
console frontend:zed:build
```

{% info_block warningBox "Verification" %}

Make sure that discounts are calculated according to their priorities:
1. Create a couple of percentage discounts with different priorities.
2. To fulfill the discounts' requirements, add items to the cart.
3. Check that discounts are applied in the correct order and that the calculated discount total is correct.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that you can submit the *Discount Create* and *Discount Update* forms with specified date and time for **Valid From** and **Valid To** discount form fields:
1. In the Back Office, go to **Merchandising&nbsp;<span aria-label="'">></span> Discount**.
2. Create a new discount or update an existing one and check that you can see the **Discount** form.
3. To ensure you can see the calendar, click on **Valid From** and **Valid To** fields, where you can select a specific date and time.
4. Make sure **Valid From** and **Valid To** fields can accept the selected date and time (for times not falling on the hour, use keystroke entry—for example, 13:45).
5. In the `spy_discount` DB table, make sure **Valid From** and **Valid To** date and time are saved correctly.

{% endinfo_block %}

[//]: # (---)

[//]: # (title: Install the Promotions & Discounts feature)

[//]: # (description: This guides provides you with a set of steps needed to be performed in order to integrate the Discount Promotion feature into your project.)

[//]: # (last_updated: Jun 16, 2021)

[//]: # (template: feature-integration-guide-template)

[//]: # (originalLink: https://documentation.spryker.com/2021080/docs/promotions-discounts-feature-integration)

[//]: # (originalArticleId: 7aa7d23c-7a28-415c-a4cd-a011c9e85a6c)

[//]: # (redirect_from:)

[//]: # (  - /2021080/docs/promotions-discounts-feature-integration)

[//]: # (  - /2021080/docs/en/promotions-discounts-feature-integration)

[//]: # (  - /docs/promotions-discounts-feature-integration)

[//]: # (  - /docs/en/promotions-discounts-feature-integration)

[//]: # (---)

[//]: # (To start using the Discount Promotion feature, you have to do some configuration in your Zed application.)

[//]: # ()
[//]: # (## Prerequisites)

[//]: # ()
[//]: # (1. First make sure you have the latest `DiscountPromotion` module.)

[//]: # (   Usecthe `composer require spryker/discount-promotion` command to install it.)

[//]: # (2. You also need at least  `"spryker/discount": "^4.5.0"` for the discount module.)

[//]: # ()
[//]: # (* Run `vendor/bin/console transfer:generate` to generate the latest transfer object.)

[//]: # (* Run `vendor/bin/console propel:diff` to generate migration file for the database. Inspect this new file and check if only `spy_discount_promotion` has been created there.)

[//]: # (* Run `vendor/bin/console propel:migrate` to migrate the latest generate migration file.)

[//]: # (* Run `vendor/bin/console propel:model:build` to generate new propel Entities and Query classes.)

[//]: # ()
[//]: # (## Enabling discount promotions)

[//]: # ()
[//]: # (To enable Discount promotions, you have to add a number of plugins to the `Discount` module so that `DiscountPromotion` can  extend it.)

[//]: # (Below there is the example of the `DiscountDependencyProvider` class.)

[//]: # ()
[//]: # (```php)

[//]: # (<?php)

[//]: # ()
[//]: # (namespace Pyz\Zed\Discount;)

[//]: # ()
[//]: # (use Spryker\Zed\Discount\DiscountDependencyProvider as SprykerDiscountDependencyProvider;)

[//]: # (use Spryker\Zed\DiscountPromotion\Communication\Plugin\Discount\DiscountFilterPromotionDiscountsPlugin;)

[//]: # (use Spryker\Zed\DiscountPromotion\Communication\Plugin\Discount\DiscountPromotionCalculationFormExpanderPlugin;)

[//]: # (use Spryker\Zed\DiscountPromotion\Communication\Plugin\Discount\DiscountPromotionCollectorStrategyPlugin;)

[//]: # (use Spryker\Zed\DiscountPromotion\Communication\Plugin\Discount\DiscountPromotionConfigurationExpanderPlugin;)

[//]: # (use Spryker\Zed\DiscountPromotion\Communication\Plugin\Discount\DiscountPromotionPostSavePlugin;)

[//]: # (use Spryker\Zed\DiscountPromotion\Communication\Plugin\Discount\DiscountPromotionPostUpdatePlugin;)

[//]: # ()
[//]: # (	class DiscountDependencyProvider extends SprykerDiscountDependencyProvider)

[//]: # (	{)

[//]: # (		/**)

[//]: # (		 	 * @return array)

[//]: # (			 */)

[//]: # (			protected function getDiscountableItemFilterPlugins&#40;&#41;)

[//]: # (			{)

[//]: # (				return [)

[//]: # (					new DiscountFilterPromotionDiscountsPlugin&#40;&#41;, //Filter out discountable items which have promotionItem = trye)

[//]: # (				];)

[//]: # (			})

[//]: # ()
[//]: # (			/**)

[//]: # (			 * @return \Spryker\Zed\Discount\Dependency\Plugin\CollectorStrategyPluginInterface[])

[//]: # (			 */)

[//]: # (			protected function getCollectorStrategyPlugins&#40;&#41;)

[//]: # (			{)

[//]: # (				return [)

[//]: # (					new DiscountPromotionCollectorStrategyPlugin&#40;&#41;, //specialized collector strategy for promotion discounts)

[//]: # (				];)

[//]: # (			})

[//]: # ()
[//]: # (			/**)

[//]: # (			 * @return \Spryker\Zed\Discount\Dependency\Plugin\DiscountPostSavePluginInterface[])

[//]: # (			 */)

[//]: # (			protected function getDiscountPostSavePlugins&#40;&#41;)

[//]: # (			{)

[//]: # (				return [)

[//]: # (					new DiscountPromotionPostSavePlugin&#40;&#41;, //Save promotion discount)

[//]: # (				];)

[//]: # (			})

[//]: # ()
[//]: # (			/**)

[//]: # (			 * @return \Spryker\Zed\Discount\Dependency\Plugin\DiscountPostUpdatePluginInterface[])

[//]: # (			 */)

[//]: # (			protected function getDiscountPostUpdatePlugins&#40;&#41;)

[//]: # (			{)

[//]: # (				return [)

[//]: # (					new DiscountPromotionPostUpdatePlugin&#40;&#41;,//Update promotion discount)

[//]: # (				];)

[//]: # (			})

[//]: # ()
[//]: # (			/**)

[//]: # (			 * @return \Spryker\Zed\Discount\Dependency\Plugin\DiscountConfigurationExpanderPluginInterface[])

[//]: # (			 */)

[//]: # (			protected function getDiscountConfigurationExpanderPlugins&#40;&#41;)

[//]: # (			{)

[//]: # (				return [)

[//]: # (					new DiscountPromotionConfigurationExpanderPlugin&#40;&#41;, //Expand DiscountConfigurationTransfer with Promotion discount data.)

[//]: # (				];)

[//]: # (       		})

[//]: # ()
[//]: # (			/**)

[//]: # (			 * This plugin allows to expand DiscountConfigurationTransfer when using)

[//]: # (			 *)

[//]: # (			 * @return \Spryker\Zed\Discount\Dependency\Plugin\Form\DiscountFormExpanderPluginInterface[])

[//]: # (			 */)

[//]: # (			protected function getDiscountFormExpanderPlugins&#40;&#41;)

[//]: # (			{)

[//]: # (				return [)

[//]: # (					new DiscountPromotionCalculationFormExpanderPlugin&#40;&#41;, //Expand Discount form type with new promotion discount. Adds new form fields.)

[//]: # (				];)

[//]: # (			})

[//]: # ()
[//]: # (			/**)

[//]: # (			 * @return \Spryker\Zed\Discount\Dependency\Plugin\Form\DiscountFormDataProviderExpanderPluginInterface[])

[//]: # (			 */)

[//]: # (			protected function getDiscountFormDataProviderExpanderPlugins&#40;&#41;)

[//]: # (			{)

[//]: # (				return [)

[//]: # (					new DiscountPromotionCalculationFormDataExpanderPlugin&#40;&#41;, // Expand Discount form with additional data)

[//]: # (				];)

[//]: # (			})

[//]: # ()
[//]: # (			/**)

[//]: # (			 * @return \Spryker\Zed\Discount\Dependency\Plugin\DiscountViewBlockProviderPluginInterface[])

[//]: # (			 */)

[//]: # (			protected function getDiscountViewTemplateProviderPlugins&#40;&#41;)

[//]: # (			{)

[//]: # (				return [)

[//]: # (					new DiscountPromotionViewBlockProviderPlugin&#40;&#41;, //Provide additional content to discount view page)

[//]: # (				];)

[//]: # (			})

[//]: # ()
[//]: # (			/**)

[//]: # (			 * @return \Spryker\Zed\Discount\Dependency\Plugin\DiscountViewBlockProviderPluginInterface[])

[//]: # (			 */)

[//]: # (			protected function getDiscountApplicableFilterPlugins&#40;&#41;)

[//]: # (			{)

[//]: # (				return [)

[//]: # (					new DiscountPromotionFilterApplicableItemsPlugin&#40;&#41;, //Filter promotion items from decision rule)

[//]: # (				];)

[//]: # (			})

[//]: # (	})

[//]: # (```)

[//]: # ()
[//]: # (The new calculator plugin must be registered in `CalculationDependencyProvider`:)

[//]: # ()
[//]: # (```php)

[//]: # (<?php)

[//]: # (namespace Pyz\Zed\Calculation;)

[//]: # ()
[//]: # (use Spryker\Zed\DiscountPromotion\Communication\Plugin\Calculation\RemovePromotionItemsCalculatorPlugin;)

[//]: # ()
[//]: # (class CalculationDependencyProvider extends SprykerCalculationDependencyProvider)

[//]: # ({)

[//]: # (	protected function getQuoteCalculatorPluginStack&#40;Container $container&#41;)

[//]: # (		{)

[//]: # (			return [)

[//]: # (				new RemoveTotalsCalculatorPlugin&#40;&#41;,)

[//]: # (				new RemoveAllCalculatedDiscountsCalculatorPlugin&#40;&#41;,)

[//]: # (				new RemovePromotionItemsCalculatorPlugin&#40;&#41;, //Removes promotion items from quote)

[//]: # ()
[//]: # (				...//other plugins)

[//]: # (			];)

[//]: # (		})

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (The new Cart expander plugin must be registered in:)

[//]: # ()
[//]: # (```php)

[//]: # (<?php)

[//]: # (namespace Pyz\Zed\Cart;)

[//]: # ()
[//]: # (class CartDependencyProvider extends SprykerCartDependencyProvider)

[//]: # ({)

[//]: # (	/**)

[//]: # (	 * @param \Spryker\Zed\Kernel\Container $container)

[//]: # (	 *)

[//]: # (	 * @return \Spryker\Zed\Cart\Dependency\ItemExpanderPluginInterface[])

[//]: # (	 */)

[//]: # (	protected function getExpanderPlugins&#40;Container $container&#41;)

[//]: # (		{)

[//]: # (			return [)

[//]: # (				... //other plugins)

[//]: # (				new CartGroupPromotionItems&#40;&#41;, //expand group key with promo item identifier)

[//]: # (			];)

[//]: # (		})

[//]: # (```)

[//]: # ()
[//]: # (## Usage in Yves)

[//]: # ()
[//]: # (To be able to see promotion products, you have to change how cart items are rendered in Yves:)

[//]: # ()
[//]: # (1. Take the `Pyz\Yves\DiscountPromotion` module from demoshop and place it somewhere in your project.)

[//]: # (2. Change the `CartOperationHandler::add` method to include promotion item flag.)

[//]: # (   Like `$itemTransfer->setIsPromotion&#40;&#40;bool&#41;$this->request->request->get&#40;'isPromo'&#41;&#41;;`)

[//]: # (3. Inject `ProductPromotionMapperPlugin` to Cart Module:)

[//]: # ()
[//]: # (```php)

[//]: # (<?php)

[//]: # (namespace Pyz\Yves\Cart;)

[//]: # ()
[//]: # (use Spryker\Yves\DiscountPromotion\Plugin\ProductPromotionMapperPlugin;)

[//]: # ()
[//]: # (class CartDependencyProvider extends AbstractBundleDependencyProvider)

[//]: # ({)

[//]: # (	const PLUGIN_PROMOTION_PRODUCT_MAPPER = 'PLUGIN_PROMOTION_PRODUCT_MAPPER';)

[//]: # ()
[//]: # (	/**)

[//]: # (	 * @param \Spryker\Yves\Kernel\Container $container)

[//]: # (	 *)

[//]: # (	 * @return \Spryker\Yves\Kernel\Container)

[//]: # (	 */)

[//]: # (	protected function providePlugins&#40;Container $container&#41;)

[//]: # (		{)

[//]: # (			...//other plugins)

[//]: # (			$container[self::PLUGIN_PROMOTION_PRODUCT_MAPPER] = function &#40;&#41; {)

[//]: # (			return new ProductPromotionMapperPlugin&#40;&#41;;)

[//]: # (		};)

[//]: # (	})

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (4. Add the  `getProductPromotionMapperPlugin` method to the `DiscountFactory` provider.)

[//]: # ()
[//]: # (```php)

[//]: # (<?php)

[//]: # (namespace Pyz\Yves\Cart;)

[//]: # ()
[//]: # (class CartFactory extends AbstractFactory)

[//]: # ({)

[//]: # (	/**)

[//]: # (	 * @return \Spryker\Yves\DiscountPromotion\Dependency\PromotionProductMapperPluginInterface)

[//]: # (	 */)

[//]: # (	public function getProductPromotionMapperPlugin&#40;&#41;)

[//]: # (	{)

[//]: # (		return $this->getProvidedDependency&#40;CartDependencyProvider::PLUGIN_PROMOTION_PRODUCT_MAPPER&#41;;)

[//]: # (	})

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (5. Add call to plugin in `CartController`.)

[//]: # ()
[//]: # (```php)

[//]: # (<?php)

[//]: # (namespace Pyz\Yves\Cart\Controller;)

[//]: # ()
[//]: # (/**)

[//]: # ( * @method \Spryker\Client\Cart\CartClientInterface getClient&#40;&#41;)

[//]: # ( * @method \Pyz\Yves\Cart\CartFactory getFactory&#40;&#41;)

[//]: # ( */)

[//]: # (class CartController extends AbstractController)

[//]: # ({)

[//]: # ()
[//]: # (	/**)

[//]: # (	 * @param array|null $selectedAttributes)

[//]: # (	 *)

[//]: # (	 * @return array)

[//]: # (	 */)

[//]: # (	public function indexAction&#40;array $selectedAttributes = null&#41;)

[//]: # (		{)

[//]: # (			$promotionStorageProducts = $this->getFactory&#40;&#41;)

[//]: # (				->getProductPromotionMapperPlugin&#40;&#41;)

[//]: # (				->mapPromotionItemsFromProductStorage&#40;)

[//]: # (					$quoteTransfer,)

[//]: # (					$this->getRequest&#40;&#41;)

[//]: # (			&#41;;)

[//]: # ()
[//]: # (			$this->viewResponse&#40;[)

[//]: # (				//other data)

[//]: # (				'promotionStorageProducts' => $promotionStorageProducts,)

[//]: # (			]&#41;;)

[//]: # ()
[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (Change twig templates to render promotion products. Since we've changed how quantity is rendered for promotion products, some cart templates in our demoshop were reorganized.)

[//]: # ()
[//]: # (Firstly, make sure a promotion item twig template is called in `Pyz/Yves/Cart/Theme/default/cart/index.twig`. This usually should be placed after cart items as in the example below:)

[//]: # ()
[//]: # (```php)

[//]: # ({% raw %}{%{% endraw %} for cartItem in cartItems {% raw %}%}{% endraw %})

[//]: # (	{% raw %}{%{% endraw %} if cartItem.bundleProduct is defined {% raw %}%}{% endraw %})

[//]: # (		{% raw %}{%{% endraw %} include '@cart/cart/parts/cart-item.twig' with {)

[//]: # (			cartItem: cartItem.bundleProduct,)

[//]: # (			bundleItems: cartItem.bundleItems)

[//]: # (		} {% raw %}%}{% endraw %})

[//]: # (		{% raw %}{%{% endraw %} else {% raw %}%}{% endraw %})

[//]: # (			{% raw %}{%{% endraw %} include '@cart/cart/parts/cart-item.twig' {% raw %}%}{% endraw %})

[//]: # (		{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %})

[//]: # (	{% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %} //existing code)

[//]: # ()
[//]: # ({% raw %}{%{% endraw %} include '@DiscountPromotion/discount-promotion/item-list.twig' {% raw %}%}{% endraw %} //new include)

[//]: # (```)

[//]: # ()
[//]: # (`Pyz/Yves/Cart/Theme/default/cart/parts/cart-item.twig` was also heavily modified to work with promotion products &#40; check our demoshop version&#41;, as the cart page can be different per project.)

[//]: # ()
[//]: # (The key points that were changed: the "Add to cart" button extracted to `Pyz/Yves/Cart/Theme/default/cart/parts/cart-add-to-cart.twig`, item price information extracted to `Pyz/Yves/Cart/Theme/default/cart/parts/cart-item-prices.twig`, cart product variants extracted to `Pyz/Yves/Cart/Theme/default/cart/parts/cart-product-variants.twig`.)

[//]: # ()
[//]: # (Below there is the demoshop `Pyz/Yves/Cart/Theme/default/cart/parts/cart-item.twig` file for reference.)

[//]: # ()
[//]: # (```php)

[//]: # (<div class="callout cart-item"><div class="row">)

[//]: # ()
[//]: # (	{% raw %}{%{% endraw %} include '@Cart/cart/parts/cart-images.twig' {% raw %}%}{% endraw %})

[//]: # ()
[//]: # ( 	<div class="small-9 large-expand columns"><ul class="no-bullet">)

[//]: # (		{# General data #})

[//]: # (		<li class="lead">{% raw %}{{{% endraw %} cartItem.name {% raw %}}}{% endraw %}</li><li class="__secondary"><small>{% raw %}{{{% endraw %} 'cart.item.sku' | trans {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} cartItem.sku {% raw %}}}{% endraw %}</small></li>)

[//]: # ()
[//]: # (		{% raw %}{%{% endraw %} if bundleItems is defined {% raw %}%}{% endraw %})

[//]: # (			{# Product Bundles #})

[//]: # (			<li><strong>{% raw %}{{{% endraw %} 'cart.item.bundle.description' | trans {% raw %}}}{% endraw %}</strong><ul>)

[//]: # (				{% raw %}{%{% endraw %} for bundleItem in bundleItems {% raw %}%}{% endraw %})

[//]: # (					<li>{% raw %}{{{% endraw %} bundleItem.quantity {% raw %}}}{% endraw %} x {% raw %}{{{% endraw %} bundleItem.name {% raw %}}}{% endraw %}  </li>)

[//]: # (				{% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %})

[//]: # (					</ul></li>)

[//]: # (				{% raw %}{%{% endraw %} else {% raw %}%}{% endraw %})

[//]: # (					{% raw %}{%{% endraw %} include '@Cart/cart/parts/cart-product-variants.twig' {% raw %}%}{% endraw %})

[//]: # (				{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %})

[//]: # (		</ul></div>)

[//]: # ()
[//]: # (		{% raw %}{%{% endraw %} include '@Cart/cart/parts/cart-item-prices.twig' {% raw %}%}{% endraw %})

[//]: # ()
[//]: # (		{% raw %}{%{% endraw %} include '@Cart/cart/parts/cart-add-to-cart.twig' {% raw %}%}{% endraw %})

[//]: # (</div></div>)

[//]: # (```)

[//]: # ()
[//]: # (Make sure `CartOperationHandler` sets ID of `idDiscountPromotion`.)

[//]: # ()
[//]: # (```php)

[//]: # (public function add&#40;$sku, $quantity, $optionValueUsageIds = []&#41;)

[//]: # (	{)

[//]: # (		$itemTransfer = new ItemTransfer&#40;&#41;;)

[//]: # (		$itemTransfer->setSku&#40;$sku&#41;;)

[//]: # (		$itemTransfer->setQuantity&#40;$quantity&#41;;)

[//]: # (		$itemTransfer->setIdDiscountPromotion&#40;$this->getIdDiscountPromotion&#40;&#41;&#41;; //new setter)

[//]: # ()
[//]: # (		$this->addProductOptions&#40;$optionValueUsageIds, $itemTransfer&#41;;)

[//]: # ()
[//]: # (		$quoteTransfer = $this->cartClient->addItem&#40;$itemTransfer&#41;;)

[//]: # (		$this->cartClient->storeQuote&#40;$quoteTransfer&#41;;)

[//]: # (	})

[//]: # ()
[//]: # (protected function getIdDiscountPromotion&#40;&#41;)

[//]: # ({)

[//]: # (	return &#40;int&#41;$this->request->request->get&#40;'idDiscountPromotion'&#41;;)

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (When using promotion discount with voucher code, you will get the error message that voucher is not correct. It's because voucher code is a product offered as promotion and not yet added to cart.)

[//]: # ()
[//]: # (You have to modify `\Pyz\Yves\Discount\Handler\VoucherHandler::addFlashMessages` to handle discounts with promotions.)

[//]: # ()
[//]: # (Add the following condition:)

[//]: # ()
[//]: # (```php)

[//]: # (namespace Pyz\Yves\Discount\Handler;)

[//]: # ()
[//]: # (class VoucherHandler extends BaseHandler implements VoucherHandlerInterface)

[//]: # ({)

[//]: # (	/**)

[//]: # (	 * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer)

[//]: # (	 * @param string $voucherCode)

[//]: # (	 *)

[//]: # (	 * @return void)

[//]: # (	 */)

[//]: # (	protected function addFlashMessages&#40;$quoteTransfer, $voucherCode&#41;)

[//]: # (		{)

[//]: # ()
[//]: # (			//---new code)

[//]: # (				if &#40;$this->isVoucherFromPromotionDiscount&#40;$quoteTransfer, $voucherCode&#41;&#41; {)

[//]: # (			return;)

[//]: # (		})

[//]: # (		//-----)

[//]: # ()
[//]: # (			if &#40;$this->isVoucherCodeApplied&#40;$quoteTransfer, $voucherCode&#41;&#41; {)

[//]: # (				$this->setFlashMessagesFromLastZedRequest&#40;$this->calculationClient&#41;;)

[//]: # (		return;)

[//]: # (		})

[//]: # ()
[//]: # (			$this->flashMessenger->addErrorMessage&#40;'cart.voucher.apply.failed'&#41;;)

[//]: # (		})

[//]: # ()
[//]: # (		/**)

[//]: # (		 * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer)

[//]: # (		 * @param string $voucherCode)

[//]: # (		 *)

[//]: # (		 * @return bool)

[//]: # (		 */)

[//]: # (		protected function isVoucherFromPromotionDiscount&#40;QuoteTransfer $quoteTransfer, $voucherCode&#41;)

[//]: # (		{)

[//]: # (			foreach &#40;$quoteTransfer->getUsedNotAppliedVoucherCodes&#40;&#41; as $voucherCodeUsed&#41; {)

[//]: # (				if &#40;$voucherCodeUsed === $voucherCode&#41; {)

[//]: # ( 			return true;)

[//]: # (		})

[//]: # (	})

[//]: # ()
[//]: # (    	return false;)

[//]: # (	})

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (After this you should be able to use the new discounts with promotion.)

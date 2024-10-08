---
title: Integrating the Easy Credit payment method for Heidelpay
description: Integrate easy credit payment through Heidelpay into the Spryker-based shop.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/heidelpay-easy-credit
originalArticleId: 83746ef1-fe16-4a17-bd70-98519e4418fa
redirect_from:
  - /2021080/docs/heidelpay-easy-credit
  - /2021080/docs/en/heidelpay-easy-credit
  - /docs/heidelpay-easy-credit
  - /docs/en/heidelpay-easy-credit
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-easy-credit-payment-method-for-heidelpay.html
  - /docs/scos/dev/technology-partner-guides/202307.0/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-easy-credit-payment-method-for-heidelpay.html
  - /docs/pbc/all/payment-service-provider/202307.0/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-easy-credit-payment-method-for-heidelpay.html
related:
  - title: Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/heidelpay.html
  - title: Integrating the Credit Card Secure payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-credit-card-secure-payment-method-for-heidelpay.html
  - title: Configuring Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/configure-heidelpay.html
  - title: Integrating the Paypal Authorize payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-paypal-authorize-payment-method-for-heidelpay.html
  - title: Integrating Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-heidelpay.html
  - title: Integrating the Direct Debit payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-direct-debit-payment-method-for-heidelpay.html
  - title: Installing Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/install-heidelpay.html
  - title: Heidelpay workflow for errors
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/heidelpay-workflow-for-errors.html
  - title: Integrating the Invoice Secured B2C payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-invoice-secured-b2c-payment-method-for-heidelpay.html
---

## Setup

The following configuration should be implemented after Heidelpay has been [installed](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/heidelpay/install-heidelpay.html) and [integrated](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/heidelpay/integrate-heidelpay.html).

## Configuration

| CONFIGURATION KEY | TYPE | DESCRIPTION |
| --- | --- | --- |
| `HeidelpayConstants::CONFIG_HEIDELPAY_EASYCREDIT_CRITERIA_REJECTED_DELIVERY_ADDRESS`	 | string | Criteria to reject by delivery address (for example 'Packstation') |
| `HeidelpayConstants::CONFIG_HEIDELPAY_EASYCREDIT_CRITERIA_GRAND_TOTAL_LESS_THAN`	 | int | Criteria to reject if grand total less than (for example 200) |
| `HeidelpayConstants::CONFIG_HEIDELPAY_EASYCREDIT_CRITERIA_GRAND_TOTAL_MORE_THAN`	 | int | Criteria to reject if grand total greater than (for example 5000) |
| `HeidelpayConstants::CONFIG_HEIDELPAY_TRANSACTION_CHANNEL_EASY_CREDIT`	 | string | Transaction channel for Easy Credit payment method (provided by Heidelpay) |

1. Activate Heidelpay Easycredit payment method.

**OMS Configuration**

```php
$config[OmsConstants::PROCESS_LOCATION] = [
	...
	APPLICATION_ROOT_DIR . '/vendor/spryker-eco/heidelpay/config/Zed/Oms',
];
$config[OmsConstants::ACTIVE_PROCESSES] = [
	...
	'HeidelpayEasyCredit01',
];
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
	...
	HeidelpayConfig::PAYMENT_METHOD_EASY_CREDIT => 'HeidelpayEasyCredit01',
];
```

2. Add Easycredit checkout steps to `StepFactory`.

**\Pyz\Yves\CheckoutPage\Process\StepFactory**

```php
<?php

namespace Pyz\Yves\CheckoutPage\Process;

use Pyz\Yves\CheckoutPage\CheckoutPageDependencyProvider;
use Pyz\Yves\CheckoutPage\Plugin\Provider\CheckoutPageControllerProvider;
use Spryker\Yves\StepEngine\Process\StepCollection;
use SprykerEco\Client\Heidelpay\HeidelpayClientInterface;
use SprykerEco\Yves\Heidelpay\CheckoutPage\Process\Steps\HeidelpayEasycreditInitializeStep;
use SprykerEco\Yves\Heidelpay\CheckoutPage\Process\Steps\HeidelpayEasycreditStep;
use SprykerShop\Yves\CheckoutPage\Process\StepFactory as BaseStepFactory;
use SprykerShop\Yves\HomePage\Plugin\Provider\HomePageControllerProvider;

/**
 * @method \SprykerShop\Yves\CheckoutPage\CheckoutPageConfig getConfig()
 */
class StepFactory extends BaseStepFactory
{
	/**
	 * @return \Spryker\Yves\StepEngine\Process\StepCollectionInterface
	 */
	public function createStepCollection()
	{
		$stepCollection = new StepCollection(
			$this->getUrlGenerator(),
			CheckoutPageControllerProvider::CHECKOUT_ERROR
		);

		$stepCollection
			->addStep($this->createEntryStep())
			->addStep($this->createCustomerStep())
			->addStep($this->createAddressStep())
			->addStep($this->createShipmentStep())
			->addStep($this->createHeidelpayEasyCreditInitializeStep())
			->addStep($this->createPaymentStep())
			->addStep($this->createHeidelpayEasyCreditStep())
			->addStep($this->createSummaryStep())
			->addStep($this->createPlaceOrderStep())
			->addStep($this->createSuccessStep());

		return $stepCollection;
	}

	/**
	 * @return \SprykerEco\Yves\Heidelpay\CheckoutPage\Process\Steps\HeidelpayEasycreditInitializeStep
	 */
	public function createHeidelpayEasyCreditInitializeStep(): HeidelpayEasycreditInitializeStep
	{
		return new HeidelpayEasycreditInitializeStep(
			CheckoutPageControllerProvider::CHECKOUT_EASYCREDIT_INITIALIZE,
			HomePageControllerProvider::ROUTE_HOME,
			$this->getHeidelpayClient()
		);
	}

	/**
	 * @return \SprykerEco\Yves\Heidelpay\CheckoutPage\Process\Steps\HeidelpayEasycreditStep
	 */
	public function createHeidelpayEasyCreditStep(): HeidelpayEasycreditStep
	{
		return new HeidelpayEasycreditStep(
			CheckoutPageControllerProvider::CHECKOUT_EASYCREDIT,
			HomePageControllerProvider::ROUTE_HOME
		);
	}

	/**
	 * @return \SprykerEco\Client\Heidelpay\HeidelpayClientInterface
	 */
	public function getHeidelpayClient(): HeidelpayClientInterface
	{
		return $this->getProvidedDependency(CheckoutPageDependencyProvider::CLIENT_HEIDELPAY);
	}
}
```

3. Extend `CheckoutPageFactory` to change step factory creation:

**\Pyz\Yves\CheckoutPage\CheckoutPageFactory**

```php
<?php

namespace Pyz\Yves\CheckoutPage;

use Pyz\Yves\CheckoutPage\Process\StepFactory;
use SprykerShop\Yves\CheckoutPage\CheckoutPageFactory as SprykerShopCheckoutPageFactory;

class CheckoutPageFactory extends SprykerShopCheckoutPageFactory
{
	/**
	 * @return \Pyz\Yves\CheckoutPage\Process\StepFactory
	 */
	public function createStepFactory()
	{
		return new StepFactory();
	}
}
```

4. Extend `CheckoutController` to add `Easycredit` step action:

**\Pyz\Yves\CheckoutPage\Controller\CheckoutController**

```php
<?php

namespace Pyz\Yves\CheckoutPage\Controller;

use SprykerShop\Yves\CheckoutPage\Controller\CheckoutController as BaseCheckoutController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \SprykerShop\Yves\CheckoutPage\CheckoutPageFactory getFactory()
 */
class CheckoutController extends BaseCheckoutController
{
	/**
	 * @param \Symfony\Component\HttpFoundation\Request $request
	 *
	 * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
	 */
	public function easyCreditAction(Request $request)
	{
		return $this->createStepProcess()->process($request);
	}
}
```

5. Extend `CheckoutPageRouteProviderPlugin` to add `Easycredit` actions:

**\Pyz\Yves\CheckoutPage\Plugin\Router\CheckoutPageControllerProvider**

```php
<?php

namespace Pyz\Yves\CheckoutPage\Plugin\Provider;

use Spryker\Yves\Router\Route\RouteCollection;
use SprykerShop\Yves\CheckoutPage\Plugin\Router\CheckoutPageRouteProviderPlugin as SprykerShopCheckoutPageRouteProviderPlugin;

class CheckoutPageRouteProviderPlugin extends SprykerShopCheckoutPageRouteProviderPlugin
{
    public const ROUTE_NAME_CHECKOUT_EASYCREDIT = 'checkout-easycredit';
    public const ROUTE_NAME_CHECKOUT_EASYCREDIT_INITIALIZE = 'checkout-easycredit-initialize';

    /**
     * Specification:
     * - Adds Routes to the RouteCollection.
     *
     * @api
     *
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    public function addRoutes(RouteCollection $routeCollection): RouteCollection
    {
	$route = $this->buildRoute('/checkout/easycredit', 'CheckoutPage', 'Checkout', 'easyCreditAction');
        $routeCollection->add(static::ROUTE_NAME_CHECKOUT_EASYCREDIT, $route);

	$route = $this->buildRoute('/checkout/easycredit-initialize', 'CheckoutPage', 'Checkout', 'easyCreditAction');
        $routeCollection->add(static::ROUTE_NAME_CHECKOUT_EASYCREDIT_INITIALIZE, $route);

        return $routeCollection;
    }
}
```

6. Update `CheckoutPageDependencyProvider` with `Easycredit` related modifications:

**\Pyz\Yves\CheckoutPage\CheckoutPageDependencyProvider**

```php
<?php

namespace Pyz\Yves\CheckoutPage;

...
use SprykerEco\Yves\Heidelpay\Plugin\Subform\HeidelpayEasyCreditSubFormPlugin;
...

class CheckoutPageDependencyProvider extends SprykerShopCheckoutPageDependencyProvider
{
	public const CLIENT_HEIDELPAY = 'CLIENT_HEIDELPAY';

	/**
	 * @param \Spryker\Yves\Kernel\Container $container
	 *
	 * @return \Spryker\Yves\Kernel\Container
	 */
	public function provideDependencies(Container $container)
	{
		$container = parent::provideDependencies($container);
		$container = $this->addHeidelpayClient($container);

		return $container;
	}

	/**
	 * @param \Spryker\Yves\Kernel\Container $container
	 *
	 * @return \Spryker\Yves\Kernel\Container
	 */
	protected function addSubFormPluginCollection(Container $container): Container
	{
		$container[self::PAYMENT_SUB_FORMS] = function () {
			$subFormPluginCollection = new SubFormPluginCollection();
			...
			$subFormPluginCollection->add(new HeidelpayEasyCreditSubFormPlugin());

			return $subFormPluginCollection;
		};

		return $container;
	}

	/**
	 * @param \Spryker\Yves\Kernel\Container $container
	 *
	 * @return \Spryker\Yves\Kernel\Container
	 */
	protected function addPaymentMethodHandlerPluginCollection(Container $container): Container
	{
		$container[self::PAYMENT_METHOD_HANDLER] = function () {
			$stepHandlerPluginCollection = new StepHandlerPluginCollection();
			...
			$stepHandlerPluginCollection->add(new HeidelpayHandlerPlugin(), PaymentTransfer::HEIDELPAY_EASY_CREDIT);

			return $stepHandlerPluginCollection;
		};

		return $container;
	}

	/**
	 * @param \Spryker\Yves\Kernel\Container $container
	 *
	 * @return \Spryker\Yves\Kernel\Container
	 */
	protected function addHeidelpayClient(Container $container): Container
	{
		$container[static::CLIENT_HEIDELPAY] = function () use ($container) {
			return $container->getLocator()->heidelpay()->client();
		};

		return $container;
	}
}
```

7. Update `payment.twig` template with `Easycredit` payment method:

**src/Pyz/Yves/CheckoutPage/Theme/default/views/payment/payment.twig**

```html
{% raw %}{%{% endraw %} extends template('page-layout-checkout', 'CheckoutPage') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define data = {
	backUrl: _view.previousStepUrl,
	forms: {
		payment: _view.paymentForm
	},

	title: 'checkout.step.payment.title' | trans,
	customForms: {
		...
		'heidelpay/easy-credit': ['easy-credit', 'heidelpay'],
	}
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
	...
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

8. Update `summary.twig` to template to display `Easycredit` related fees:
<details>
<summary>src/Pyz/Yves/CheckoutPage/Theme/default/views/payment/payment.twig</summary>

```html
{% raw %}{%{% endraw %} extends template('page-layout-checkout', 'CheckoutPage') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define data = {
	backUrl: _view.previousStepUrl,
	transfer: _view.quoteTransfer,
	cartItems: _view.cartItems,
	shippingAddress: _view.quoteTransfer.shippingAddress,
	billingAddress: _view.quoteTransfer.billingAddress,
	shipmentMethod: _view.quoteTransfer.shipment.method.name,
	paymentMethod: _view.quoteTransfer.payment.paymentMethod,
	heidelpayEasyCredit: _view.quoteTransfer.payment.heidelpayEasyCredit | default(null),

	forms: {
		summary: _view.summaryForm
	},

	overview: {
		shipmentMethod: _view.quoteTransfer.shipment.method.name,
		expenses: _view.quoteTransfer.expenses,
		voucherDiscounts: _view.quoteTransfer.voucherDiscounts,
		cartRuleDiscounts: _view.quoteTransfer.cartRuleDiscounts,

		prices: {
			subTotal: _view.quoteTransfer.totals.subtotal,
			storeCurrency: _view.quoteTransfer.shipment.method.storeCurrencyPrice,
			grandTotal: _view.quoteTransfer.totals.grandtotal,
			tax: _view.quoteTransfer.totals.taxtotal.amount,
			discountTotal: _view.quoteTransfer.totals.discounttotal | default
		}
	},

	title: 'checkout.step.summary.title' | trans
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
	<div class="grid">
		<div class="col col--sm-12 col--lg-4">
			<div class="box">
				<span class="float-right">{% raw %}{{{% endraw %} 'checkout.step.summary.with_method' | trans {% raw %}}}{% endraw %} <strong>{% raw %}{{{% endraw %}data.paymentMethod{% raw %}}}{% endraw %}</strong></span>
				<h6>{% raw %}{{{% endraw %} 'checkout.step.summary.payment' | trans {% raw %}}}{% endraw %}</h6>
				<br>
				{% raw %}{%{% endraw %} if data.heidelpayEasyCredit is not null {% raw %}%}{% endraw %}
					<span class="float-right">{% raw %}{{{% endraw %} data.heidelpayEasyCredit.amortisationText {% raw %}}}{% endraw %}</span>
					<div class="grid">
						<a href="{% raw %}{{{% endraw %} data.heidelpayEasyCredit.preContractionInformationUrl {% raw %}}}{% endraw %} "class="float-left">
							{% raw %}{{{% endraw %} 'heidelpay.payment.easy_credit.pre_contraction_info_link_text' | trans {% raw %}}}{% endraw %}
						</a>
					</div>
					<br>
					<div>
						<ul>
							<li><strong>{% raw %}{{{% endraw %} 'heidelpay.payment.easy_credit.order_total' | trans {% raw %}}}{% endraw %} </strong>{% raw %}{{{% endraw %} data.heidelpayEasyCredit.totalOrderAmount | money {% raw %}}}{% endraw %}</li>
							<li><strong>{% raw %}{{{% endraw %} 'heidelpay.payment.easy_credit.interest' | trans {% raw %}}}{% endraw %} </strong>{% raw %}{{{% endraw %} data.heidelpayEasyCredit.accruingInterest | money {% raw %}}}{% endraw %}</li>
							<li><strong>{% raw %}{{{% endraw %} 'heidelpay.payment.easy_credit.total_inc_interest' | trans {% raw %}}}{% endraw %} </strong>{% raw %}{{{% endraw %} data.heidelpayEasyCredit.totalAmount | money {% raw %}}}{% endraw %}</li>
						</ul>
					</div>
				{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
				<hr/>

				{% raw %}{%{% endraw %} include molecule('display-address') with {
					class: 'text-small',
					data: {
						address: data.billingAddress
					}
				} only {% raw %}%}{% endraw %}
			</div>

			<div class="box">
				<span class="float-right">{% raw %}{{{% endraw %} 'checkout.step.summary.with_method' | trans {% raw %}}}{% endraw %} <strong>{% raw %}{{{% endraw %} data.shipmentMethod {% raw %}}}{% endraw %}</strong></span>
				<h6>{% raw %}{{{% endraw %} 'checkout.step.summary.shipping' | trans {% raw %}}}{% endraw %}</h6>
				<hr/>

				{% raw %}{%{% endraw %} include molecule('display-address') with {
					class: 'text-small',
					data: {
						address: data.shippingAddress
					}
				} only {% raw %}%}{% endraw %}
			</div>
		</div>

		<div class="col col--sm-12 col--lg-8">
			<div class="box">
				{% raw %}{%{% endraw %} for item in data.cartItems {% raw %}%}{% endraw %}
					{% raw %}{%{% endraw %} set item = item.bundleProduct is defined ? item.bundleProduct : item {% raw %}%}{% endraw %}
					{% raw %}{%{% endraw %} embed molecule('summary-item', 'CheckoutPage') with {
						data: {
							name: item.name,
							quantity: item.quantity,
							price: item.sumPrice | money,
							options: item.productOptions | default({}),
							bundleItems: item.bundleItems | default([]),
							quantitySalesUnit: item.quantitySalesUnit,
							amountSalesUnit: item.amountSalesUnit,
							amount: item.amount
						},
						embed: {
							isLast: not loop.last,
							item: item
						}
					} only {% raw %}%}{% endraw %}
						{% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
							{% raw %}{{{% endraw %}parent(){% raw %}}}{% endraw %}
							{% raw %}{%{% endraw %} if widgetExists('CartNoteQuoteItemNoteWidgetPlugin') {% raw %}%}{% endraw %}
								{% raw %}{%{% endraw %} if embed.item.cartNote is not empty {% raw %}%}{% endraw %}
									{% raw %}{{{% endraw %} widget('CartNoteQuoteItemNoteWidgetPlugin', embed.item) {% raw %}}}{% endraw %} {# @deprecated Use molecule('note-list', 'CartNoteWidget') instead. #}
								{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
							{% raw %}{%{% endraw %} elseif embed.item.cartNote is not empty {% raw %}%}{% endraw %}
								{% raw %}{%{% endraw %} include molecule('note-list', 'CartNoteWidget') ignore missing with {
									data: {
										label: 'cart_note.checkout_page.item_note',
										note: embed.item.cartNote
									}
								} only {% raw %}%}{% endraw %}
							{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
							{% raw %}{%{% endraw %} if embed.isLast {% raw %}%}{% endraw %}<hr/>{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
						{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
					{% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
				{% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
			</div>

			{% raw %}{%{% endraw %} if data.transfer.cartNote is not empty {% raw %}%}{% endraw %}
				{% raw %}{%{% endraw %} if widgetExists('CartNoteQuoteNoteWidgetPlugin') {% raw %}%}{% endraw %}
					<div class="box">
						{% raw %}{{{% endraw %} widget('CartNoteQuoteNoteWidgetPlugin', data.transfer) {% raw %}}}{% endraw %}  {#@deprecated Use molecule('note-list', 'CartNoteWidget') instead.#}
					</div>
				{% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
					<div class="box">
						{% raw %}{%{% endraw %} include molecule('note-list', 'CartNoteWidget') ignore missing with {
							data: {
								label: 'cart_note.checkout_page.quote_note',
								note: data.transfer.cartNote
							}
						} only {% raw %}%}{% endraw %}
					</div>
				{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
			{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}

			<div class="box">
				{% raw %}{%{% endraw %} widget 'CheckoutVoucherFormWidget' args [data.transfer] only {% raw %}%}{% endraw %}
				{% raw %}{%{% endraw %} elsewidget 'CheckoutVoucherFormWidgetPlugin' args [data.transfer] only {% raw %}%}{% endraw %} {# @deprecated Use CheckoutVoucherFormWidget instead. #}
				{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
			</div>

			{% raw %}{%{% endraw %} embed molecule('form') with {
				class: 'box',
				data: {
					form: data.forms.summary,
					submit: {
						enable: can('SeeOrderPlaceSubmitPermissionPlugin'),
						text: 'checkout.step.place.order' | trans
					},
					cancel: {
						enable: true,
						url: data.backUrl,
						text: 'general.back.button' | trans
					}
				},
				embed: {
					overview: data.overview
				}
			} only {% raw %}%}{% endraw %}
				{% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
					{% raw %}{%{% endraw %} include molecule('summary-overview', 'CheckoutPage') with {
						data: embed.overview
					} only {% raw %}%}{% endraw %}

					<hr />
					{% raw %}{{{% endraw %}parent(){% raw %}}}{% endraw %}
				{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
			{% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
		</div>
	</div>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```
<br>
</details>

## Checkout Payment Step Display

Displays payment method name with a radio button. No extra input fields are required.

## Payment Step Submitting

No further actions are needed, the quote being filled with payment method selection as default. After selecting Easy Credit as a payment method "HP.IN" request will be sent. In the response, Heidelpay returns an URL string which defines where the customer has to be redirected. If everything was ok, the user would be redirected to the Easy Credit Externally.

## Summary Review and Order Submitting

Once the customer is redirected back to us, the response from Easy Credit is sent to the Heidelpay, and Heidelpay makes a synchronous POST request to the shop's `CONFIG_HEIDELPAY_PAYMENT_RESPONSE_URL URL` (Yves), with the result of payment (see `EasyCreditController::paymentAction()`). It is called "external response transaction," the result will be persisted in `spy_payment_heidelpay_transaction_log` as usual. The most important data here - is the payment reference ID which can be used for further transactions like `finalize/reserve/etc`.

After that, the customer can see the order summary page, where they can review all related data.

There the user will see:
* Rate plan (`CRITERION.EASYCREDIT_AMORTISATIONTEXT`)
* Interest fees (`CRITERION_EASYCREDIT_ACCRUINGINTEREST`)
* Total sum including the interest fees (`CRITERION.EASYCREDIT_TOTALAMOUNT`)

If the customer has not yet completed the HP.IN they must do that again.

**On the "save order" event** - save Heidelpay payment per order and items, as usual.

**When the state machine is initialized**, an event "send authorize on registration request" will trigger the authorize on registration request. In case of success, the state will be changed.

Finalize - later on, when the item is shipped to the customer, it is time to call "finalize" command of the state machine. This will send HP.FI request to the Payment API. This is done in FinalizePlugin of the OMS command.

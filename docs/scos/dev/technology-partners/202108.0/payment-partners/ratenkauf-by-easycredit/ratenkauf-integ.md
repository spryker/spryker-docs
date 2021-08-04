---
title: Ratenkauf by Easycredit - Integration into a project
originalLink: https://documentation.spryker.com/2021080/docs/ratenkauf-integration-into-project
redirect_from:
  - /2021080/docs/ratenkauf-integration-into-project
  - /2021080/docs/en/ratenkauf-integration-into-project
---

{% info_block errorBox %}

There is currently an issue when using giftcards with Ratenkauf. Our team is developing a fix for it.

{% endinfo_block %}

This article provides step-by-step instruction on how to integrate Ratenkauf by Easycredit payment into your project. 

To integrate Easycredit into a Spryker project, do the following:

1. Update `CheckoutPageDependencyProvider` by adding a new payment subform and a payment method handler.
To show the Easycredit payment method on the payment step, define `SubFormPlugin` and `StepHandlerPlugin`.   

CheckoutPageDependencyProvider.php

```php
public const CLIENT_EASYCREDIT = 'CLIENT_EASYCREDIT';
 
...
    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    public function provideDependencies(Container $container): Container
    {
        $container = parent::provideDependencies($container);
        $container = $this->addEasycreditClient($container);
     
        return $container;
    }
 
    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addSubFormPluginCollection(Container $container): Container
    {
        $container[static::PAYMENT_SUB_FORMS] = function () {
            $subFormPluginCollection = new SubFormPluginCollection();
            $subFormPluginCollection->add(new EasycreditSubFormPlugin());
 
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
            $stepHandlerPluginCollection->add(new EasycreditHandlerPlugin(), PaymentTransfer::EASYCREDIT);
             return $stepHandlerPluginCollection;
        };
 
        return $container;
    }
 
    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addEasycreditClient(Container $container): Container
    {
        $container[static::CLIENT_EASYCREDIT] = function (Container $container) {
            return $container->getLocator()->easycredit()->client();
        };
 
        return $container;
    }
...
```

2. The next dependency provider you should update is `OmsDependencyProvider`.
To use commands and conditions for events in OMS,  define them.   

**OmsDependencyProvider**
    
```php
...
$container->extend(self::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {
    $conditionCollection->add(new IsOrderConfirmedPlugin(), 'Easycredit/IsOrderConfirmed');
    return $conditionCollection;
});
...
```

3. And one more dependency provider to be updated is `CheckoutDependencyProvider`.
To send requests to Easycredit, you need the technical order identifier value. After adding this plugin, the order identifier will be saved to the database in table `spy_payment_easycredit_order_identifier`.   

**CheckoutDependencyProvider**

```php
...
protected function getCheckoutOrderSavers(Container $container)
{
    return [
        ...
        new EasycreditOrderIdentifierPlugin(),
    ];
}
 
...
```

To use Easycredit requests during the checkout process, you have to create your own checkout steps. To implement the checkout steps, follow the guidelines below:

1. Extend `StepFactory`.

**CheckoutPageFactory**

```php
<?php

namespace Pyz\Yves\CheckoutPage;

use Pyz\Yves\CheckoutPage\Process\StepFactory;
use SprykerShop\Yves\CheckoutPage\CheckoutPageFactory as SprykerCheckoutPageFactory;

class CheckoutPageFactory extends SprykerCheckoutPageFactory
{
	/**
	 * @return \SprykerShop\Yves\CheckoutPage\Process\StepFactory
	 */
	public function createStepFactory()
	{
		return new StepFactory();
	}
}
```

2. Implement `StepFactory` as shown in this example:

**StepFactory**

```php
<?php

namespace Pyz\Yves\CheckoutPage\Process;

use Pyz\Yves\CheckoutPage\CheckoutPageDependencyProvider;
use Pyz\Yves\CheckoutPage\Plugin\Provider\CheckoutPageControllerProvider;
use Pyz\Yves\CheckoutPage\Process\Steps\EasycreditStep;
use Pyz\Yves\CheckoutPage\Process\Steps\ShipmentStep;
use Pyz\Yves\CheckoutPage\Process\Steps\SummaryStep;
use Spryker\Client\Messenger\MessengerClientInterface;
use Spryker\Yves\StepEngine\Dependency\Step\StepInterface;
use Spryker\Yves\StepEngine\Process\StepCollection;
use Spryker\Zed\Messenger\Business\MessengerFacadeInterface;
use SprykerEco\Client\Easycredit\EasycreditClient;
use SprykerShop\Yves\CheckoutPage\Process\StepFactory as SprykerStepFactory;
use SprykerShop\Yves\HomePage\Plugin\Provider\HomePageControllerProvider;

class StepFactory extends SprykerStepFactory
{
    /**
     * @return StepInterface
     */
    public function createEasycreditStep(): StepInterface
    {
        return new EasycreditStep(
            CheckoutPageControllerProvider::CHECKOUT_EASY_CREDIT,
            HomePageControllerProvider::ROUTE_HOME,
            $this->getEasycreditClient()
        );
    }

    /**
    * @return StepInterface
    */
    public function createSummaryStep(): StepInterface
    {
          return new SprykerShopSummaryStep(
            $this->getProductBundleClient(),
            $this->getShipmentService(),
            $this->getConfig(),
            SprykerShopCheckoutPageControllerProvider::CHECKOUT_SUMMARY,
            HomePageControllerProvider::ROUTE_HOME,
            $this->getCheckoutClient()
        );

    }

   /**
    * @return StepInterface
    */
    public function createShipmentStep(): StepInterface
    {
        return new ShipmentStep(
            $this->getCalculationClient(),
            $this->getShipmentPlugins(),
            $this->createShipmentStepPostConditionChecker(),
            $this->createGiftCardItemsChecker(),
            SprykerShopCheckoutPageControllerProvider::CHECKOUT_SHIPMENT,
            HomePageControllerProvider::ROUTE_HOME,
            $this->getEasycreditClient()
        );

    }

    /**
     * @return \Spryker\Yves\StepEngine\Process\StepCollectionInterface
     */
    public function createStepCollection(): StepCollectionInterface
    {
        $stepCollection = new StepCollection(
            $this->getUrlGenerator(),            {% raw %}{%{% endraw %} if data.easycredit {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} include molecule('easycredit-summary', 'Easycredit') with {
                    data: {
                        interest: data.easycredit.interest,
                        url: data.easycredit.url,
                        text: data.easycredit.text
                    }
                } only {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}

            CheckoutPageControllerProvider::CHECKOUT_ERROR
        );
         $stepCollection
            ->addStep($this->createEntryStep())
            ->addStep($this->createCustomerStep())
            ->addStep($this->createAddressStep())
            ->addStep($this->createShipmentStep())
            ->addStep($this->createPaymentStep())
            ->addStep($this->createEasycreditStep())
            ->addStep($this->createSummaryStep())
            ->addStep($this->createPlaceOrderStep())
            ->addStep($this->createSuccessStep());
         return $stepCollection;
    }

    /**
     * @return EasycreditClientInterface
     */
    protected function getEasycreditClient(): EasycreditClientInterface
    {
        return $this->getProvidedDependency(CheckoutPageDependencyProvider::CLIENT_EASYCREDIT);
    }
}
```

3. Now you can extend the basic steps on the project level and can create your Easycredit step that will be called when a user takes Easycredit as `PaymentMethod`.
Examples of steps implementations:   

EasycreditStep.php

```php
<?php

namespace Pyz\Yves\CheckoutPage\Process\Steps;

use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use Spryker\Yves\StepEngine\Dependency\Step\AbstractBaseStep;
use Spryker\Yves\StepEngine\Dependency\Step\StepWithExternalRedirectInterface;
use SprykerEco\Client\Easycredit\EasycreditClient;
use SprykerEco\Shared\Easycredit\EasycreditConfig;
use Symfony\Component\HttpFoundation\Request;

class EasycreditStep extends AbstractBaseStep implements StepWithExternalRedirectInterface
{
    protected const URL_EASYCREDIT_REDIRECT_URL = 'https://ratenkauf.easycredit.de/ratenkauf/content/intern/einstieg.jsf?vorgangskennung=';

    /**
     * @var string
     */
    protected $redirectUrl = '';

   /**
    * @var \SprykerEco\Client\Easycredit\EasycreditClientInterface
    */
    protected $easycreditClient;

     /**
     * @param string $stepRoute
     * @param string $escapeRoute
     * @param \SprykerEco\Client\Easycredit\EasycreditClientInterface $easycreditClient
     */
    public function __construct(
        $stepRoute,
        $escapeRoute,
        EasycreditClientInterface $easycreditClient
    ) {
        parent::__construct($stepRoute, $escapeRoute);
        $this->easycreditClient = $easycreditClient;
    }

    /**
     * @param \Spryker\Shared\Kernel\Transfer\AbstractTransfer|\Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return bool
     */
    public function requireInput(AbstractTransfer $quoteTransfer)
    {
        return false;
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \Spryker\Shared\Kernel\Transfer\AbstractTransfer|\Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Spryker\Shared\Kernel\Transfer\AbstractTransfer
     */
    public function execute(Request $request, AbstractTransfer $quoteTransfer)
    {
        $payment = $quoteTransfer->getPayment();
         if ($payment->getPaymentSelection() === 'easycredit') {
            $responseTransfer = $this->easycreditClient->sendInitializePaymentRequest($quoteTransfer);
            $this->redirectUrl = static::URL_EASYCREDIT_REDIRECT_URL . $responseTransfer->getPaymentIdentifier();
            $quoteTransfer->getPayment()->getEasycredit()->setVorgangskennung($responseTransfer->getPaymentIdentifier());
        }
         return $quoteTransfer;
    }

    /**
     * @param \Spryker\Shared\Kernel\Transfer\AbstractTransfer|\Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return bool
     */
    public function postCondition(AbstractTransfer $quoteTransfer)
    {
        return true;
    }

    /**
     * Return external redirect url, when redirect occurs not within same application. Used after execute.
     *
     * @return string
     */
    public function getExternalRedirectUrl()
    {
        return $this->redirectUrl;
    }

    /**
     * Requirements for this step, return true when satisfied.
     *
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return bool
     */
    public function preCondition(AbstractTransfer $quoteTransfer)
    {
        return true;
    }
    
```

**ShipmentStep.php**

```php
<?php

namespace Pyz\Yves\CheckoutPage\Process\Steps;

use Generated\Shared\Transfer\EasycreditLegalTextTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginCollection;
use SprykerEco\Client\Easycredit\EasycreditClient;
use SprykerEco\Shared\Easycredit\EasycreditConfig;
use SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToCalculationClientInterface;
use SprykerShop\Yves\CheckoutPage\Process\Steps\ShipmentStep as SprykerShipmentStep;
use Symfony\Component\HttpFoundation\Request;

class ShipmentStep extends SprykerShipmentStep
{
    /**
     * @var EasycreditClientInterface
     */
    protected $easycreditClient;

    public function __construct(
        CheckoutPageToCalculationClientInterface $calculationClient,
        StepHandlerPluginCollection $shipmentPlugins,
        string $stepRoute,
        string $escapeRoute,
        EasycreditClientInterface $client
    ) {
        parent::__construct($calculationClient, $shipmentPlugins, $stepRoute, $escapeRoute);
        $this->easycreditClient = $client;
    }

    /**
     * @param Request $request
     * @param QuoteTransfer $quoteTransfer
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function execute(Request $request, AbstractTransfer $quoteTransfer)
    {
        $easycreditLegalTextTransfer = new EasycreditLegalTextTransfer();
        $easycreditLegalTextTransfer->setText($this->easycreditClient->sendApprovalTextRequest()->getText());
        $quoteTransfer->setEasycreditLegalText($easycreditLegalTextTransfer);
        return parent::execute($request, $quoteTransfer);
    }
}
```

**SummaryStep.php**

```php
<?php

namespace Pyz\Yves\CheckoutPage\Process\Steps;

use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use SprykerEco\Client\Easycredit\EasycreditClient;
use SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToProductBundleClientInterface;
use SprykerShop\Yves\CheckoutPage\Process\Steps\SummaryStep as SprykerSummaryStep;
use Symfony\Component\HttpFoundation\Request;

class SummaryStep extends SprykerSummaryStep
{
     /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return array
     */
    public function getTemplateVariables(AbstractTransfer $quoteTransfer)
    {
        $easycreditData = [];
             if ($quoteTransfer->getPayment() && $quoteTransfer->getPayment()->getEasycredit()) {
            $easycreditData = [
                'interest' => $quoteTransfer->getPayment()->getEasycredit()->getAnfallendeZinsen(),
                'url' => $quoteTransfer->getPayment()->getEasycredit()->getUrlVorvertraglicheInformationen(),
                'text' => $quoteTransfer->getPayment()->getEasycredit()->getTilgungsplanText(),
            ];
        }

        return [
            'quoteTransfer' => $quoteTransfer,
            'cartItems' => $this->productBundleClient->getGroupedBundleItems(
                $quoteTransfer->getItems(),
                $quoteTransfer->getBundleItems()
            ),
            'easycredit' => $easycreditData,
        ];
    }
}
```

4. To run the step process for the new Easycredit step, extend the default `CheckoutController` with a new action for handling the Easycredit step.

**CheckoutController**

```php
<?php

namespace Pyz\Yves\CheckoutPage\Controller;

use SprykerShop\Yves\CheckoutPage\Controller\CheckoutController as SprykerCheckoutController;
use Symfony\Component\HttpFoundation\Request;

class CheckoutController extends SprykerCheckoutController
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

5. After creating a new action in the checkout controller, define a new route in `CheckoutPageRouteProviderPlugin`.

**CheckoutPageRouteProviderPlugin.php**

```php
<?php

namespace Pyz\Yves\CheckoutPage\Plugin\Router;

use SprykerShop\Yves\CheckoutPage\Plugin\Router\CheckoutPageRouteProviderPlugin as SprykerCheckoutPageRouteProviderPlugin;
use Spryker\Yves\Router\Route\RouteCollection;

class CheckoutPageRouteProviderPlugin extends SprykerCheckoutPageRouteProviderPlugin
{
    public const CHECKOUT_EASY_CREDIT = 'easy-credit';
    protected const ROUTE_CART = 'cart';

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
        $routeCollection = parent::addRoutes($routeCollection);

        $routeCollection = $this->addEasycreditStepRoute($routeCollection);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     */
    public function addEasycreditStepRoute($routeCollection)
    {
        $route = $this->buildRoute('/checkout/easycredit', 'CheckoutPage', 'Checkout', 'easyCredit');
        $route = $route->setMethods(['GET', 'POST']);
        $routeCollection->add(static::CHECKOUT_EASY_CREDIT, $route);

        return $routeCollection;
    }
}

```

6. Also, the Easycredit bundle has its own `YvesController` for handling a success response from Easycredit, so you have to define a controller in `RouterDependencyProvider`.

**RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

...
use Pyz\Yves\CheckoutPage\Plugin\Router\CheckoutPageRouteProviderPlugin;
...

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{

	...
	protected function getRouteProvider(): array
	{
		...
		new CheckoutPageRouteProviderPlugin(),
		...
	}
	...
}
```

## Frontend Integration

To show the Easycredit info on the Product Details page, at the Summary and Payment steps, you have to extend some views on the project level .

You can find some examples below in `[`payment.twig`](#payment-step)`, [`summary.twig`](#summary-step) and [`pdp.twig`](#pdp-page).

<details open>
<summary>payment.twig</summary>

Payment step - `src/Pyz/Yves/CheckoutPage/Theme/default/views/payment/payment.twig`

```js
{% raw %}{%{% endraw %} extends template('page-layout-checkout', 'CheckoutPage') {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} define data = {
    backUrl: _view.previousStepUrl,
    forms: {
        payment: _view.paymentForm
    },
    title: 'checkout.step.payment.title' | trans,
    customForms: {
        'Easycredit/easycredit': 1
    }
} {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} embed molecule('form') with {
        class: 'box',
        data: {
            form: data.forms.payment,
            options: {
                attr: {
                    id: 'payment-form'
                }
            },
            submit: {
                enable: true,
                text: 'checkout.step.summary' | trans
            },
            cancel: {
                enable: true,
                url: data.backUrl,
                text: 'general.back.button' | trans
            },
            customForms: data.customForms
        }
    } only {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} block fieldset {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} for name, choices in data.form.paymentSelection.vars.choices {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} set paymentProviderIndex = loop.index0 {% raw %}%}{% endraw %}
                <h5>{% raw %}{{{% endraw %} ('checkout.payment.provider.' ~ name) | trans {% raw %}}}{% endraw %}</h5>
                <ul>
                    {% raw %}{%{% endraw %} for key, choice in choices {% raw %}%}{% endraw %}
                        <li class="list__item spacing-y clear">
                            {% raw %}{%{% endraw %} embed molecule('form') with {
                                data: {
                                    form: data.form[data.form.paymentSelection[key].vars.value],
                                    enableStart: false,
                                    enableEnd: false,
                                    customForms: data.customForms
                                },
                                embed: {
                                    index: loop.index ~ '-' ~ paymentProviderIndex,
                                    toggler: data.form.paymentSelection[key]
                                }
                            } only {% raw %}%}{% endraw %}
                                {% raw %}{%{% endraw %} block fieldset {% raw %}%}{% endraw %}
                                    {% raw %}{{{% endraw %} form_row(embed.toggler, {
                                        required: false,
                                        component: molecule('toggler-radio'),
                                        attributes: {
                                            'target-selector': '.js-payment-method-' ~ embed.index,
                                            'class-to-toggle': 'is-hidden'
                                        }
                                    }) {% raw %}}}{% endraw %}
                                    <div class="col col--sm-12 is-hidden js-payment-method-{% raw %}{{{% endraw %}embed.index{% raw %}}}{% endraw %}">
                                        <div class="col col--sm-12 col--md-6">
                                            {% raw %}{%{% endraw %} if data.customForms[data.form.vars.template_path] is not defined {% raw %}%}{% endraw %}
                                                {% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}
                                            {% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
                                                {% raw %}{%{% endraw %} include view('easycredit', 'Easycredit') with {
                                                    data: {
                                                        form: data.form,
                                                        legalText: data.form.vars.legalText
                                                    }
                                                } only  {% raw %}%}{% endraw %}
                                            {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
                                        </div>
                                    </div>
                                {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
                            {% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
                        </li>
                    {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
                </ul>
            {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```
</details>

<details open>
<summary>summary.twig</summary>

Summary step - `src/Pyz/Yves/CheckoutPage/Theme/default/views/summary/summary.twig`

```js
{% raw %}{%{% endraw %} extends template('page-layout-checkout', 'CheckoutPage') {% raw %}%}{% endraw %}

 {% raw %}{%{% endraw %} define data = {
	backUrl: _view.previousStepUrl,
	transfer: _view.quoteTransfer,
	cartItems: _view.cartItems,
	easycredit: _view.easycredit,
	shippingAddress: _view.quoteTransfer.shippingAddress,
	billingAddress: _view.quoteTransfer.billingAddress,
	shipmentMethod: _view.quoteTransfer.shipment.method.name,
	paymentMethod: _view.quoteTransfer.payment.paymentMethod,

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
			% embed molecule('form') with {
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
			{% raw %}{%{% endraw %} if data.easycredit {% raw %}%}{% endraw %}
				{% raw %}{%{% endraw %} include molecule('easycredit-summary', 'Easycredit') with {
					data: {
						interest: data.easycredit.interest,
						url: data.easycredit.url,
						text: data.easycredit.text
					}
				} only {% raw %}%}{% endraw %}
			{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
		</div>
	</div>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```
</details>

<details open>
<summary>pdp.twig</summary>

PDP page - `src/Pyz/Yves/ProductDetailPage/Theme/default/views/pdp/pdp.twig`

```js
{% raw %}{%{% endraw %} extends template('page-layout-main') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define data = {
	product: _view.product,
	productUrl: _view.productUrl,

	title: product.metaTitle | default(_view.product.name),
	metaTitle: product.metaTitle | default(_view.product.name),
	metaDescription: _view.product.metaDescription | default,
	metaKeywords: _view.product.metaKeywords | default
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block headScripts {% raw %}%}{% endraw %}
	{% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" type="text/javascript"></script>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block breadcrumbs {% raw %}%}{% endraw %}
	{% raw %}{%{% endraw %} widget 'ProductBreadcrumbsWithCategoriesWidget' args [data.product] only {% raw %}%}{% endraw %}
	{% raw %}{%{% endraw %} elsewidget 'ProductCategoryWidgetPlugin' args [data.product] only {% raw %}%}{% endraw %} {# @deprecated Use ProductBreadcrumbsWithCategoriesWidget instead. #}
	{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block title {% raw %}%}{% endraw %}
	<h3 itemprop="name">{% raw %}{{{% endraw %} data.product.name {% raw %}}}{% endraw %}</h3>
	<link itemprop="url" href="{% raw %}{{{% endraw %} data.productUrl {% raw %}}}{% endraw %}" />
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
	<div class="grid">
		<div class="col col--sm-12 col--lg-7 col--xl-8">
			{% raw %}{%{% endraw %} include molecule('product-carousel', 'ProductDetailPage') with {
				class: 'box',
				data: {
					product: data.product
				}
			} only {% raw %}%}{% endraw %}
	</div>

	<div class="col col--sm-12 col--lg-5 col--xl-4">
		{% raw %}{%{% endraw %} include molecule('product-configurator', 'ProductDetailPage') with {
			class: 'box',
			data: {
				product: data.product
			}
		} only {% raw %}%}{% endraw %}
	</div>
</div>

{% raw %}{%{% endraw %} widget 'ProductAlternativeListWidget' args [data.product] only {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} elsewidget 'ProductAlternativeWidgetPlugin' args [data.product] only {% raw %}%}{% endraw %} {# @deprecated Use ProductAlternativeListWidget instead. #}
{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} include molecule('product-detail', 'ProductDetailPage') with {
	class: 'box',
	data: {
		description: data.product.description,
		attributes: data.product.attributes
	}
} only {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} widget 'ProductReplacementForListWidget' args [data.product.sku] only {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} elsewidget 'ProductReplacementForWidgetPlugin' args [data.product.sku] only {% raw %}%}{% endraw %} {# @deprecated Use ProductReplacementForListWidget instead. #}
{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} widget 'ProductDetailPageReviewWidget' args [data.product.idProductAbstract] only {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} elsewidget 'ProductReviewWidgetPlugin' args [data.product.idProductAbstract] only {% raw %}%}{% endraw %} {# @deprecated Use ProductDetailPageReviewWidget instead. #}
{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} widget 'SimilarProductsWidget' args [data.product] only {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} elsewidget 'SimilarProductsWidgetPlugin' args [data.product] only {% raw %}%}{% endraw %} {# @deprecated Use SimilarProductsWidget instead. #}
{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} if widgetExists('ProductCmsBlockWidgetPlugin') {% raw %}%}{% endraw %}
	{% raw %}{{{% endraw %} widget('ProductCmsBlockWidgetPlugin', data.product) {% raw %}}}{% endraw %} {# @deprecated Use molecule('product-cms-block', 'CmsBlockWidget') instead. #}
{% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
	{% raw %}{%{% endraw %} include molecule('product-cms-block', 'CmsBlockWidget') ignore missing with {
		class: 'box',
		data: {
			idProductAbstract: data.product.idProductAbstract
		}
	} only {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

  {% info_block infoBox "Note" %}
You might want to configure the product detail page to add some validation and show the Easycredit badge in `src/Pyz/Yves/ProductDetailPage/Theme/default/components/molecules/product-configurator/product-configurator.twig`
{% endinfo_block %}

**product-configurator.twig**

```js
...
    {% raw %}{%{% endraw %} set easyCreditMinTreshold = 20000 {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} set easyCreditMaxTreshold = 500000 {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} if data.product.price > easyCreditMinTreshold and data.product.price < easyCreditMaxTreshold {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} include molecule('easycredit-badge', 'EasyCredit' ) with {
            data: {
                title: 'EasyCredit:',
                id: 'easy-credit-id'
            },
            attributes: {
                'easycredit-options': '{
                    "webshopId": "<Your shop identifier>",
                    "finanzierungsbetrag": "' ~ data.product.price / 100 ~ '" ,
                    "textVariante": "KURZ"
                }'
            }
        } only {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
...
```
</details>

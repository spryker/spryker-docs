---
title: "Tutorial: Checkout and step engine"
description: Use the tutorial to understand how to work with Checkout and Step Engine and to extend Spryker core by adding a voucher step and a voucher form.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-checkout-and-step-engine-spryker-commerce-os
originalArticleId: 27252ff0-474b-47cf-9f0c-02b1ccdf2ad5
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/introduction-tutorials/tutorial-checkout-and-step-engine-spryker-commerce-os.html
  - /docs/pbc/all/cart-and-checkout/202204.0/base-shop/tutorials-and-howtos/tutorial-checkout-and-step-engine.html
related:
  - title: Checkout steps
    link: docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/checkout/checkout-steps.html
  - title: "Step engine: Workflow overview"
    link: docs/pbc/all/order-management-system/latest/base-shop/datapayload-conversion/step-engine/step-engine-workflow-overview.html
---

{% info_block infoBox %}

This tutorial is also available on the Spryker Training website. For more information and hands-on exercises, visit the [Spryker Training](https://training.spryker.com/courses/developer-bootcamp) website.

{% endinfo_block %}

## Challenge description

This task helps you learn how to do the following:
- Work with Checkout and the Step Engine.
- Apply and use discounts.
- Extend the Spryker core code and functionalities.

{% info_block infoBox "Info" %}

This tutorial shows how to add a voucher step to the existing out-of-the-box Spryker checkout.

{% endinfo_block %}

## 1. Add the voucher step

1. Before adding the step, define the route for the step.

   1. Add `CheckoutPageRouteProviderPlugin` that extends the core `AbstractRouteProviderPlugin` in `src/Pyz/Yves/CheckoutPage/Plugin/Router`.
   2. Add the route for the step.

	```php
	<?php

	namespace Pyz\Yves\CheckoutPage\Plugin\Router;

	use SprykerShop\Yves\CheckoutPage\Plugin\Router\CheckoutPageRouteProviderPlugin as SprykerShopCheckoutPageRouteProviderPlugin;

	class CheckoutPageRouteProviderPlugin extends SprykerShopCheckoutPageRouteProviderPlugin
	{
    	protected const CHECKOUT_VOUCHER = 'checkout-voucher';

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
        	$routeCollection = $this->addCheckoutIndexRoute($routeCollection);
        	$routeCollection = $this->addCustomerStepRoute($routeCollection);
        	$routeCollection = $this->addAddressStepRoute($routeCollection);
        	$routeCollection = $this->addShipmentStepRoute($routeCollection);
        	$routeCollection = $this->addVoucherStepRoute($routeCollection);
        	$routeCollection = $this->addPaymentStepRoute($routeCollection);
        	$routeCollection = $this->addCheckoutSummaryStepRoute($routeCollection);
        	$routeCollection = $this->addPlaceOrderStepRoute($routeCollection);
        	$routeCollection = $this->addCheckoutErrorRoute($routeCollection);
        	$routeCollection = $this->addCheckoutSuccessRoute($routeCollection);

        	return $routeCollection;
    	}

    	/**
    	 * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
    	 *
    	 * @return \Spryker\Yves\Router\Route\RouteCollection
    	 */
    	protected function addVoucherStepRoute(RouteCollection $routeCollection): RouteCollection
    	{
        	$route = $this->buildRoute('/checkout/voucher', 'CheckoutPage', 'Checkout', 'voucherAction');
        	$route = $route->setMethods(['GET', 'POST']);
        	$routeCollection->add(static::CHECKOUT_VOUCHER, $route);

        	return $routeCollection;
    	}
	}    
	```

3. In YvesBootstrap in `src/Pyz/Yves/Router/RouterDependencyProvider`, update the `getRouteProvider` method to use the new Route Provider instead of the core one.
4. Clear route cache:

```bash
vendor/bin/console router:cache:warm-up
```

5. Add the voucher step class inside `src/Pyz/Yves/CheckoutPage/Process/Steps` and call it `VoucherStep`.

{% info_block infoBox "Info" %}

`VoucherStep` must extend the `AbstractBaseStep` class from core.
<br>`CalculationClient` is injected into the class. This client is used when you apply the discount because you need to recalculate the grand total with the applied voucher code.

```php
namespace Pyz\Yves\CheckoutPage\Process\Steps;

use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use Spryker\Yves\StepEngine\Dependency\Step\StepWithBreadcrumbInterface;
use SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToCalculationClientInterface;
use SprykerShop\Yves\CheckoutPage\Process\Steps\AbstractBaseStep;
use Symfony\Component\HttpFoundation\Request;

class VoucherStep extends AbstractBaseStep implements StepWithBreadcrumbInterface
{
	/**
	 * @var \SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToCalculationClientInterface
	 */
	protected $calculationClient;

	/**
	 * @param \SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToCalculationClientInterface $calculationClient
	 * @param string $stepRoute
	 * @param string $escapeRoute
	 */
	public function __construct(
		CheckoutPageToCalculationClientInterface $calculationClient,
		$stepRoute,
		$escapeRoute
	) {
		parent::__construct($stepRoute, $escapeRoute);

		$this->calculationClient = $calculationClient;
	}

	/**
	 * @param \Spryker\Shared\Kernel\Transfer\AbstractTransfer $quoteTransfer
	 *
	 * @return bool
	 */
	public function preCondition(AbstractTransfer $quoteTransfer)
	{
		return true;
	}

	/**
	 * @param \Spryker\Shared\Kernel\Transfer\AbstractTransfer $quoteTransfer
	 *
	 * @return bool
	 */
	public function requireInput(AbstractTransfer $quoteTransfer)
	{
		return true;
	}

	/**
	 * @param \Symfony\Component\HttpFoundation\Request $request
	 * @param \Generated\Shared\Transfer\QuoteTransfer|\Spryker\Shared\Kernel\Transfer\AbstractTransfer|\Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
	 *
	 * @return \Generated\Shared\Transfer\QuoteTransfer
	 */
	public function execute(Request $request, AbstractTransfer $quoteTransfer)
	{
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
	 * @return string
	 */
	public function getBreadcrumbItemTitle()
	{
		return 'Voucher';
	}

	/**
	 * @param \Spryker\Shared\Kernel\Transfer\AbstractTransfer $dataTransfer
	 *
	 * @return bool
	 */
	public function isBreadcrumbItemEnabled(AbstractTransfer $dataTransfer)
	{
		return $this->postCondition($dataTransfer);
	}

	/**
	 * @param \Spryker\Shared\Kernel\Transfer\AbstractTransfer $dataTransfer
	 *
	 * @return bool
	 */
	public function isBreadcrumbItemHidden(AbstractTransfer $dataTransfer)
	{
		return !$this->requireInput($dataTransfer);
	}
}    
```

{% endinfo_block %}

6. To add the step to `StepFactory`, in `src/Pyz/Yves/CheckoutPage/Process`, extend the core `StepFactory`.

```php
namespace Pyz\Yves\CheckoutPage\Process;

use Pyz\Yves\CheckoutPage\Plugin\Router\CheckoutPageRouteProviderPlugin;
use Pyz\Yves\CheckoutPage\Process\Steps\VoucherStep;
use Spryker\Yves\StepEngine\Process\StepCollection;
use SprykerShop\Yves\CheckoutPage\Process\StepFactory as SprykerShopStepFactory;
use SprykerShop\Yves\HomePage\Plugin\Router\HomePageRouteProviderPlugin;

/**
 * @method \SprykerShop\Yves\CheckoutPage\CheckoutPageConfig getConfig()
 */
class StepFactory extends SprykerShopStepFactory
{
	/**
	 * @return \Spryker\Yves\StepEngine\Process\StepCollectionInterface
	 */
	public function createStepCollection()
	{
		$stepCollection = new StepCollection(
			$this->getUrlGenerator(),
			CheckoutPageRouteProviderPlugin::CHECKOUT_ERROR
		);

		$stepCollection
			->addStep($this->createEntryStep())
			->addStep($this->createCustomerStep())
			->addStep($this->createAddressStep())
			->addStep($this->createShipmentStep())
			->addStep($this->createPaymentStep())
			->addStep($this->createVoucherStep())
			->addStep($this->createSummaryStep())
			->addStep($this->createPlaceOrderStep())
			->addStep($this->createSuccessStep());

		return $stepCollection;
	}

	/**
	 * @return \Pyz\Yves\CheckoutPage\Process\Steps\VoucherStep
	 */
	public function createVoucherStep()
	{
		return new VoucherStep(
			$this->getCalculationClient(),
			CheckoutPageRouteProviderPlugin::CHECKOUT_VOUCHER,
			HomePageRouteProviderPlugin::ROUTE_HOME
		);
	}
}
```

7. To get the step factory to work, extend `CheckoutPageFactory` to use the new factory instead of the core one.

```php
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

8. In `src/Pyz/Yves/CheckoutPage/Controller`, extend `CheckoutController`.

Add a controller action and call it `voucherAction`.

{% info_block infoBox "Info" %}

To make sure that the step works correctly, return any string. You get back to this action when you build the form in the following step.

```php
namespace Pyz\Yves\CheckoutPage\Controller;

use SprykerShop\Yves\CheckoutPage\Controller\CheckoutController as SprykerShopCheckoutController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \Pyz\Yves\CheckoutPage\CheckoutPageFactory getFactory()
 */
class CheckoutController extends SprykerShopCheckoutController
{
	/**
	 * @param \Symfony\Component\HttpFoundation\Request $request
	 *
	 * @return mixed
	 */
	public function voucherAction(Request $request)
	{
		return 'Hello Voucher Step';
	}
}  
```

The step is now created:
1. Go to the shop.
2. Add any product to the cart.
3. Check out.

The Voucher step must be working now.

{% endinfo_block %}

## 2. Add the voucher form

Spryker uses Symfony forms as a foundation to build and handle forms. One of the main concepts in Symfony forms is binding form fields with data objects. This helps in setting and getting different data fields directly from and to the form. As Spryker uses transfer objects, they can be directly bound to your forms.

Build the form and get the customer's input for the voucher:
1. In `src/Pyz/Yves/CheckoutPage/Form/Steps/`, create the form type and call it `VoucherForm`.

```php
namespace Pyz\Yves\CheckoutPage\Form\Steps;

use Spryker\Yves\Kernel\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

class VoucherForm extends AbstractType
{
	const FIELD_ID_VOUCHER_CODE = 'voucher-code';
	const VOUCHER_PROPERTY_PATH = 'voucher';

	/**
	 * @return string
	 */
	public function getBlockPrefix()
	{
		return 'voucherForm';
	}

	/**
	 * @param \Symfony\Component\Form\FormBuilderInterface $builder
	 * @param array $options
	 *
	 * @return $this
	 */
	public function buildForm(FormBuilderInterface $builder, array $options)
	{
		$builder->add(self::FIELD_ID_VOUCHER_CODE, TextType::class, [
			'required' => true,
			'property_path' => static::VOUCHER_PROPERTY_PATH,
			'constraints' => [
				new NotBlank(),
			],
			'label' => false,
		]);

		return $this;
	}
}
```

2. In `src/Pyz/Yves/CheckoutPage/Form`, extend the core's `FormFactory` and create the form collection for the `VoucherForm`.

```php
namespace Pyz\Yves\CheckoutPage\Form;

use Pyz\Yves\CheckoutPage\Form\Steps\VoucherForm;
use SprykerShop\Yves\CheckoutPage\Form\FormFactory as SprykerShopFormFactory;

class FormFactory extends SprykerShopFormFactory
{
	/**
	 * @return \Spryker\Yves\StepEngine\Form\FormCollectionHandlerInterface
	 */
	public function createVoucherFormCollection()
	{
		return $this->createFormCollection($this->getVoucherFormTypes());
	}

	/**
	 * @return string[]
	 */
	public function getVoucherFormTypes()
	{
		return [
			$this->getVoucherForm(),
		];
	}

	/**
	 * @return string
	 */
	public function getVoucherForm()
	{
		return VoucherForm::class;
	}
}
```

3. In `CheckoutPageFactory`, override the `createCheckoutFormFactory()` method to use the new `FormFactory`.

```php
namespace Pyz\Yves\CheckoutPage;

use Pyz\Yves\CheckoutPage\Form\FormFactory;
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

	/**
	 * @return \Pyz\Yves\CheckoutPage\Form\FormFactory
	 */
	public function createCheckoutFormFactory()
	{
		return new FormFactory();
	}
}
```

1. Add the twig template for the voucher form in `src/Pyz/Yves/CheckoutPage/Theme/default/views/voucher` and name it `voucher.twig`.

```php
{% raw %}{%{% endraw %} extends template('page-layout-checkout', 'CheckoutPage') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define data = {
	backUrl: _view.previousStepUrl,
	forms: {
		voucher: _view.voucherForm
	},

	title: 'Voucher' | trans
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
	{% raw %}{%{% endraw %} embed molecule('form') with {
		class: 'box',
		data: {
			form: data.forms.voucher,
			options: {
				attr: {
					id: 'voucher-form'
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
			}
		}
	} only {% raw %}%}{% endraw %}
		{% raw %}{%{% endraw %} block fields {% raw %}%}{% endraw %}

		{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
	{% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

5. Bind the form to the transfer object.

{% info_block infoBox %}

In the `VoucherForm` form class, you have already added the `property_path` to the text field with the value `voucher`.

{% endinfo_block %}

To finish the binding, in `src/Pyz/Shared/Checkout/Transfer`, extend `QuoteTransfer` and call it `checkout.transfer.xml`.

When you add a new schema with the same names for the schema file and the transfer object of the core ones, you extend the transfer object.

Add the voucher field in the `Quote` transfer.

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

	<transfer name="Quote">
		<property name="voucher" type="string"/>
	</transfer>

</transfers>
```

6. Generate the new transfer object:

 ```bash
 console transfer:generate
 ```

7. Return to the controller and use the new form instead of the returned string.

To create the process for the voucher step and use the form collection, modify the voucher action.

```php
/**
 * @param \Symfony\Component\HttpFoundation\Request $request
 *
 * @return mixed
 */
public function voucherAction(Request $request)
{
	$response = $this->createStepProcess()->process(
		$request,
		$this->getFactory()
			->createCheckoutFormFactory()
			->createVoucherFormCollection()
	);

	if (!is_array($response)) {
		return $response;
	}

	return $this->view(
		$response,
		$this->getFactory()->getCustomerPageWidgetPlugins(),
		'@CheckoutPage/views/voucher/voucher.twig'
	);
}
```

{% info_block infoBox "Info" %}

The step has a form now and receives the voucher code value from the customer. Go to the shop `http://www.de.suite.local/` and try it out.

{% endinfo_block %}

## 3. Apply the voucher in the step execution

1. Generate some voucher codes from the Back Office:
   1. In the Back Office, go to **Discount**, create a new discount, and generate some voucher codes.
   2. Choose the discount and enter the voucher code. In the **Valid to** field, make sure to select future dates.
   3. Add the rule SKU equals to *, so the voucher code is applied to all products in the shop.
   4. Save and go to the **Voucher codes** tab, and generate the codes.

2. In `VoucherStep`, implement the `execute()` method to calculate the new grand total after applying the discount. To do so, use `CalculationClient`:
   1. Add the voucher code to a discount transfer object.
   2. The `CalculationClient` in the checkout works only with the `quoteTransfer`; thus, add the discount transfer back to the `quoteTransfer` using the method `$quoteTransfer→addVoucherDiscount()`.
   3. Call the method `recalculate()` from the `CalculationClient` and pass the `quoteTransfer` as a parameter and the discount should be applied.

```php
/**
 * @param \Symfony\Component\HttpFoundation\Request $request
 * @param \Generated\Shared\Transfer\QuoteTransfer|\Spryker\Shared\Kernel\Transfer\AbstractTransfer|\Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
 *
 * @return \Generated\Shared\Transfer\QuoteTransfer
 */
public function execute(Request $request, AbstractTransfer $quoteTransfer)
{
	$discountTransfer = new DiscountTransfer();
	$discountTransfer->setVoucherCode($quoteTransfer->getVoucher());
	$quoteTransfer->addVoucherDiscount($discountTransfer);

	return $this->calculationClient->recalculate($quoteTransfer);
}
```

{% info_block infoBox "Info" %}

Done and ready for testing!

1. Go to the shop.
2. Add any product to the cart.
3. Go to the checkout and enter any of the available voucher codes.
You receive a discount on your order.

{% endinfo_block %}

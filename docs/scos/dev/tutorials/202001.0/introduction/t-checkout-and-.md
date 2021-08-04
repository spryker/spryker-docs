---
title: Tutorial - Checkout and Step Engine - Spryker Commerce OS
originalLink: https://documentation.spryker.com/v4/docs/t-checkout-and-step-engine-spryker-commerce-os
redirect_from:
  - /v4/docs/t-checkout-and-step-engine-spryker-commerce-os
  - /v4/docs/en/t-checkout-and-step-engine-spryker-commerce-os
---

{% info_block infoBox %}
This tutorial is also available on the Spryker Training web-site. For more information and hands-on exercises, visit the [Spryker Training](https://training.spryker.com/courses/developer-bootcamp
{% endinfo_block %} web-site.)

## Challenge Description
This task helps you to learn how to:

* Work with Checkout and the Step Engine
* Apply and use discounts
* Extend the Spryker core code and functionalities

{% info_block infoBox "Info" %}
In this task we will add a voucher step to the existing out-of-the-box Spryker checkout.
{% endinfo_block %}

## 1. Add the Voucher Step
    
1. Before adding the step, you need to define the route for the step. 
* Add `CheckoutPageRouteProviderPlugin` that extends the core `AbstractRouteProviderPlugin` in `src/Pyz/Yves/CheckoutPage/Plugin/Provider`.

* Then, add the route for the step.
    
```php
class CheckoutPageControllerProvider extends SprykerShopCheckoutPageControllerProvider
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
    
2. Update the `getRouteProvider` method in YvesBootstrap in `src/Pyz/Yves/Router/RouterDependencyProvider` to use the new Controller Provider instead of the core one.
3. Clear route cache `vendor/bin/console router:cache:warm-up`

4. Next, add the voucher step class inside `src/Pyz/Yves/CheckoutPage/Process/Steps` and call it **VoucherStep**. 

{% info_block infoBox "Info" %}
`VoucherStep` should extend the `AbstractBaseStep` class from core.<br>As you may notice, `CalculationClient` is injected into the class. We will use this client later when we apply the discount, as we need to recalculate the grand total with the applied voucher code.
{% endinfo_block %}
    
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
    
4. Add the step to `StepFactory`.  To do so, extend the core `StepFactory` in `src/Pyz/Yves/CheckoutPage/Process`.

```php
namespace Pyz\Yves\CheckoutPage\Process;
 
use Pyz\Yves\CheckoutPage\Plugin\Provider\CheckoutPageControllerProvider;
use Pyz\Yves\CheckoutPage\Process\Steps\VoucherStep;
use Spryker\Yves\StepEngine\Process\StepCollection;
use SprykerShop\Yves\CheckoutPage\Process\StepFactory as SprykerShopStepFactory;
use SprykerShop\Yves\HomePage\Plugin\Provider\HomePageControllerProvider;
 
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
			CheckoutPageControllerProvider::CHECKOUT_ERROR
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
			CheckoutPageControllerProvider::CHECKOUT_VOUCHER,
			HomePageControllerProvider::ROUTE_HOME
		);
	}
}
```
    
5. To get the step factory to work, you also need to extend  `CheckoutPageFactory` in order to use the new factory instead of the core one.

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
    
6. Finally, extend `CheckoutController` in `src/Pyz/Yves/CheckoutPage/Controller`. 

Add a controller action and call it **voucherAction**.
    
{% info_block infoBox "Info" %}
You can return any string for now, just to make sure that the step works correctly. We will get back to this action once we build the form in the next step.
{% endinfo_block %}
    
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
    
{% info_block infoBox %}
The step is now created:<ul><li>Go to the shop.</li><li>Add any product to the cart.</li><li>Checkout.</li></ul><br>The Voucher step should be working now.
{% endinfo_block %}

## 2. Add the Voucher Form
    
Spryker uses Symfony forms as a foundation to build and handle forms. One of the main concepts in Symfony forms is binding form fields with data objects. This helps in setting and getting different data fields directly from/to the form. As Spryker uses transfer objects, they can be directly bound to your forms.
    
Let’s build the form and get the customers input for the voucher:
    
1. Create the form type in `src/Pyz/Yves/CheckoutPage/Form/Steps/`. Call it **VoucherForm**.

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
    
2. Extend the core's `FormFactory` in `src/Pyz/Yves/CheckoutPage/Form` and create the form collection for the `VoucherForm`.

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
    
3. Override the `createCheckoutFormFactory()` method in `CheckoutPageFactory` to use the new `FormFactory`.

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
    
4. The only missing thing is the twig template for it. 

Add the twig template for the voucher form in `src/Pyz/Yves/CheckoutPage/Theme/default/views/voucher`. Call it **voucher.twig**.
    
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
    
5. Next, let’s bind the form to the transfer object.

{% info_block infoBox %}
In the `VoucherForm` form class, we have already added the `property_path` to the text field with the value 'voucher'.
{% endinfo_block %}
    
To finish the binding, you need to extend `QuoteTransfer` in `src/Pyz/Shared/Checkout/Transfer` and call it **checkout.transfer.xml**.

When you add a new schema with exactly the same names for the schema file and the transfer object of the core ones, you are then extending the transfer object.

Now, add the voucher field in the _Quote_ transfer.
    
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
    
6. Run the `console transfer:generate` command to generate the new transfer object.
7. Return to the controller and use the new form instead of the returned string. 

Modify the voucher action to create the process for the voucher step and use the form collection.
    
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
The step has a form now and receives the voucher code value from the customer. Go to the [shop](http://www.de.suite.local/
{% endinfo_block %} and try it out.)

## 3. Apply the Voucher in the Step Execution

1. Generate some voucher codes from the Back Office: 

    1. Go to the **Back Office > Discount**  section, create a new discount and generate some voucher codes.
    2. Choose the discount type *Voucher code* and make sure that the **Valid to** field is in the future.
    3. Add the rule Sku equals to *, so the voucher code is applied on all products in the shop.
    4. Save and then go the **Voucher codes** tab and generate the codes.

2. Now, you need to implement the `execute()` method in `VoucherStep`to calculate the new grand total after applying the discount.

To do so, use the `CalculationClient`:
    
    1. Add the voucher code which you from the form into a discount transfer object.
    2. The **CalculationClient** in the checkout works only with the quoteTransfer, thus you need to add the discount transfer back to the `quoteTransfer` using the method `$quoteTransfer→addVoucherDiscount()`.
    3. Finally, call the method `recalculate()` from the **CalculationClient** and pass the `quoteTransfer` as a parameter and the discount should be applied.

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
Done and ready for testing! <ol><li>Go to the shop.</li><li>Add any product to cart.</li><li>Go the checkout and enter any of the available voucher codes.</li></ol><br>You should receive a discount on your order.
{% endinfo_block %}

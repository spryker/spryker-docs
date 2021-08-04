---
title: PayOne - Integration into the Legacy Demoshop Project
originalLink: https://documentation.spryker.com/v6/docs/payone-integration-with-project-example
redirect_from:
  - /v6/docs/payone-integration-with-project-example
  - /v6/docs/en/payone-integration-with-project-example
---

{% info_block errorBox %}

There is currently an issue when using gifcards with PayOne. Our team is developing a fix for it.

{% endinfo_block %}

**Objectives:**
* Place order with PayPal express checkout.
* Be redirected to summary page of standard checkout.
* Have shipping a method selector on summary page.

First of all we need to provide a URL to Payone module, which will be used to redirect user when the quote is filled with data obtained from PayPal.
 To achieve this, make the following steps:

1. Add custom controller action to `src/Pyz/Yves/Checkout/Controller/CheckoutController.php`:

```php
/**
* @return \Symfony\Component\HttpFoundation\RedirectResponse
*/
public function paypalExpressCheckoutEntryPointAction()
{
$this->getFactory()
->createExpressCheckoutHandler()
->fulfillPostConditionsUntilSummaryStep();
return $this->redirectResponseInternal(CheckoutControllerProvider::CHECKOUT_SUMMARY);
}
```

2. Register a new controller action in controller provider:

```php
...
const CHECKOUT_PAYPAL_EXPRESS_CHECKOUT_ENTRY_POINT = 'checkout-paypal-express-checkout-entry-point';
...
protected function defineControllers(Application $app)
{
...
$this->createController('/{checkout}/paypal-express-checkout-entry-point', self::CHECKOUT_PAYPAL_EXPRESS_CHECKOUT_ENTRY_POINT, 'Checkout', 'Checkout', 'paypalExpressCheckoutEntryPoint')
->assert('checkout', $allowedLocalesPattern . 'checkout|checkout')
->value('checkout', 'checkout')
->method('GET');
...
}
```

3. Create `ExpressCheckoutHandler` class `src/Pyz/Yves/Checkout/Handler/ExpressCheckoutHandler.php` with corresponding interface:

```php
namespace Pyz\Yves\Checkout\Handler;
use Generated\Shared\Transfer\ExpenseTransfer;
use Spryker\Client\Cart\CartClientInterface;
use Spryker\Shared\Shipment\ShipmentConstants;
class ExpressCheckoutHandler implements ExpressCheckoutHandlerInterface
{
/**
* @var \Spryker\Client\Cart\CartClientInterface
*/
protected $cartClient;
/**
* @param \Spryker\Client\Cart\CartClientInterface $cartClient
*/
public function __construct(CartClientInterface $cartClient)
{
$this->cartClient = $cartClient;
}
/**
* @return void
*/
public function fulfillPostConditionsUntilSummaryStep()
{
$quoteTransfer = $this->cartClient->getQuote();
$quoteTransfer->addExpense(
(new ExpenseTransfer())->setType(ShipmentConstants::SHIPMENT_EXPENSE_TYPE)
);
}
}
```

4. Add `ExpressCheckoutHandler` related method in `src/Pyz/Yves/Checkout/CheckoutFactory.php`:

```php
/**
* @return \Pyz\Yves\Checkout\Handler\ExpressCheckoutHandler
*/
public function createExpressCheckoutHandler()
{
return new ExpressCheckoutHandler(
$this->getCartClient()
);
}
```

5. Extend `ShipmentForm` class to override a property_path option (create `src/Pyz/Yves/Shipment/Form/ShipmentSubForm.php`):

```php
namespace Pyz\Yves\Shipment\Form;
class ShipmentSubForm extends ShipmentForm
{
/**
* @const string
*/
const SHIPMENT_SELECTION_PROPERTY_PATH = self::SHIPMENT_SELECTION;
}
```

6. Adjust summary form by adding a shipment subform in `src/Pyz/Yves/Checkout/Form/Steps/SummaryForm.php`:

```php
class SummaryForm extends AbstractType
{
/**
* Builds the form.
*
* This method is called for each type in the hierarchy starting from the
* top most type. Type extensions can further modify the form.
*
* @see FormTypeExtensionInterface::buildForm()
*
* @param \Symfony\Component\Form\FormBuilderInterface $builder The form builder
* @param array $options The options
*
* @return void
*/
public function buildForm(FormBuilderInterface $builder, array $options)
{
$builder->add(
'shipmentForm',
ShipmentSubForm::class,
array_merge(
$options,
[
'data_class' => ShipmentTransfer::class,
'property_path' => 'shipment',
]
)
);
}
/**
* @param \Symfony\Component\OptionsResolver\OptionsResolver $resolver
*
* @return void
*/
public function configureOptions(OptionsResolver $resolver)
{
$resolver->setRequired('shipmentMethods');
$resolver->setDefaults([
'data_class' => QuoteTransfer::class,
]);
}
/**
* Returns the name of this type.
*
* @return string The name of this type
*/
public function getName()
{
return 'summaryForm';
}
}
```

7. Create shipment subform template for summary page in `src/Pyz/Yves/Checkout/Theme/default/checkout/partials/shipment.twig`:

```php

<div class="row columns">

 {% raw %}{%{% endraw %} set shipmentForm = summaryForm.shipmentForm {% raw %}%}{% endraw %}

 <div class="callout">
  <ul class="no-bullet">

   {% raw %}{%{% endraw %} for name, choices in shipmentForm.idShipmentMethod.vars.choices {% raw %}%}{% endraw %}

   <h4>{% raw %}{{{% endraw %} name {% raw %}}}{% endraw %}</h4>

   {% raw %}{%{% endraw %} for key, choice in choices {% raw %}%}{% endraw %}
   <li>
    <label>
     {% raw %}{{{% endraw %} form_widget(shipmentForm.idShipmentMethod[key], {'attr': {'class': '__toggler'{% raw %}}}{% endraw %}) {% raw %}}}{% endraw %}
     {% raw %}{{{% endraw %} shipmentForm.idShipmentMethod[key].vars.label | raw {% raw %}}}{% endraw %}
    </label>
   </li>
   {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
   {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
  </ul>
 </div>
</div>
```

8. Update summary twig template in `src/Pyz/Yves/Checkout/Theme/default/checkout/summary.twig`.
Move `form_start` expression to the top of a content section and `form_end` to the end:

```php
...
{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
{% raw %}{{{% endraw %} form_start(summaryForm, {'attr': {'class': 'row'{% raw %}}}{% endraw %}) {% raw %}}}{% endraw %}
...
...
...
{% raw %}{{{% endraw %} form_end(summaryForm) {% raw %}}}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

9. Remove `{% raw %}{%{% endraw %} include '@checkout/checkout/partials/voucher-form.twig' {% raw %}%}{% endraw %}` include from summary template. Include `checkout/partials/shipment.twig` in your summary template:

```php
      ...
{% raw %}{{{% endraw %} 'checkout.step.summary.shipping' | trans {% raw %}}}{% endraw %}
      {% raw %}{%{% endraw %} include '@checkout/checkout/partials/shipment.twig' {% raw %}%}{% endraw %}
      ...
```
10. Add shipment form data provider and remove voucher form from summary form collection(It is just an example, if you need voucher form, you need to adjust summary page on your own).            In `src/Pyz/Yves/Checkout/Form/FormFactory.php`:

```php
/**
* @param \Generated\Shared\Transfer\QuoteTransfer
*
* @return \Spryker\Yves\StepEngine\Form\FormCollectionHandlerInterface
*/
public function createSummaryFormCollection()
{
return $this->createFormCollection($this->createSummaryFormTypes(), $this->getShipmentFormDataProviderPlugin());
}

....


/**
* @return \Symfony\Component\Form\FormTypeInterface[]
*/
protected function createSummaryFormTypes()
{
return [
$this->createSummaryForm(),
//$this->createVoucherFormType(),
];
}
```
11. Handle shipment form data, when summary form is submitted. Inject two dependencies into `src/Pyz/Yves/Checkout/Process/Steps/SummaryStep.php`:

```php
/**
* @var \Spryker\Client\Calculation\CalculationClientInterface
*/
protected $calculationClient;
/**
* @var \Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginCollection
*/
protected $shipmentPlugins;
/**
* @param \Spryker\Yves\ProductBundle\Grouper\ProductBundleGrouperInterface $productBundleGrouper
* @param \Spryker\Client\Cart\CartClientInterface $cartClient
* @param \Spryker\Client\Calculation\CalculationClientInterface $calculationClient
* @param \Spryker\Client\Calculation\CalculationClientInterface $shipmentPlugins
* @param string $stepRoute
* @param string $escapeRoute
*/
public function __construct(
ProductBundleGrouperInterface $productBundleGrouper,
CartClientInterface $cartClient,
CalculationClientInterface $calculationClient,
StepHandlerPluginCollection $shipmentPlugins,
$stepRoute,
$escapeRoute
) {
parent::__construct($stepRoute, $escapeRoute);
$this->productBundleGrouper = $productBundleGrouper;
$this->cartClient = $cartClient;
$this->calculationClient = $calculationClient;
$this->shipmentPlugins = $shipmentPlugins;
}
```

12. Extend `execute` method:

```php
/**
* @param \Symfony\Component\HttpFoundation\Request $request
* @param \Spryker\Shared\Kernel\Transfer\AbstractTransfer|\Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
*
* @return \Generated\Shared\Transfer\QuoteTransfer
*/
public function execute(Request $request, AbstractTransfer $quoteTransfer)
{
$shipmentHandler = $this->shipmentPlugins->get(CheckoutDependencyProvider::PLUGIN_SHIPMENT_STEP_HANDLER);
$shipmentHandler->addToDataClass($request, $quoteTransfer);
$this->calculationClient->recalculate($quoteTransfer);
$this->markCheckoutConfirmed($request, $quoteTransfer);
return $quoteTransfer;
}
```

Now, go to checkout and try placing an order with Paypal express checkout.

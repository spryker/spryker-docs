---
title: Computop - PayNow
originalLink: https://documentation.spryker.com/v1/docs/computop-paynow
redirect_from:
  - /v1/docs/computop-paynow
  - /v1/docs/en/computop-paynow
---

 Example State Machine
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Computop/computop_paynow.png){height="" width=""}

## Front-end Integration

To adjust the frontend appearance, provide the following templates in your theme directory: `src/<project_name>/Yves/Computop/Theme/<custom_theme_name>/paynow.twig`

## State Machine Integration

The Computop provides a demo state machine for the PayNow payment method which implements `Authorization/Capture` flow.

To enable the demo state machine, extend the configuration with the following values:
```php
<?php
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
 ...
 ComputopConfig::PAYMENT_METHOD_PAY_NOW => 'ComputopPayNow01',
];

$config[OmsConstants::ACTIVE_PROCESSES] = [
 ...
 'ComputopPayNow01',
 ];
 ```

 ### Checkout Integration

Add the following lines to `Yves\Checkout\CheckoutDependencyProvider.php`
```php
$container[static::PAYMENT_METHOD_HANDLER] = function () {
 $paymentMethodHandler = new StepHandlerPluginCollection();
 .....
 $paymentMethodHandler->add(new ComputopPaymentHandlerPlugin(), PaymentTransfer::COMPUTOP_PAY_NOW);

 return $paymentMethodHandler;
};

$container[static::PAYMENT_SUB_FORMS] = function () {
 $paymentSubFormPlugin = new SubFormPluginCollection();
 .....
 $paymentSubFormPlugin->add(new PayNowSubFormPlugin());

 return $paymentSubFormPlugin;
};

protected function provideClients(Container $container)
{
 $container = parent::provideClients($container);

 .....

 $container[static::CLIENT_COMPUTOP] = function (Container $container) {
 return $container->getLocator()->computop()->client();
 };

 return $container;
}
```

Computop PayNow payment method also provides a new Checkout Step for filling the Credit Card data and sending it to the Computop paygate. You have to create `Yves/Checkout/Process/Steps/PayNowStep.php` class with the following content:
<details open>
 <summary>Click here to expand the code sample</summary>

 ```php
 <?php

/**
* This file is part of the Spryker Demoshop.
* For full license information, please view the LICENSE file that was distributed with this source code.
*/

namespace Pyz\Yves\Checkout\Process\Steps;

use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use SprykerEco\Shared\Computop\ComputopConfig;

class PayNowStep extends AbstractBaseStep
{
 /**
 * @param string $stepRoute
 * @param string $escapeRoute
 */
 public function __construct(
 $stepRoute,
 $escapeRoute
 ) {
 parent::__construct($stepRoute, $escapeRoute);
 }

 /**
 * @param \Spryker\Shared\Kernel\Transfer\AbstractTransfer|\Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
 *
 * @return bool
 */
 public function requireInput(AbstractTransfer $quoteTransfer)
 {
 if ($this->isMethodPayNow($quoteTransfer)) {
 return true;
 }

 return false;
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
 * @param \Spryker\Shared\Kernel\Transfer\AbstractTransfer|\Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
 *
 * @return array
 */
 public function getTemplateVariables(AbstractTransfer $quoteTransfer)
 {
 return [
 'data' => $quoteTransfer->getPayment()->getComputopPayNow()->getData(),
 'len' => $quoteTransfer->getPayment()->getComputopPayNow()->getLen(),
 'merchant' => $quoteTransfer->getPayment()->getComputopPayNow()->getMerchantId(),
 'action' => $quoteTransfer->getPayment()->getComputopPayNow()->getUrl(),
 'brandOptions' => $this->getBrandOptions(),
 ];
 }

 /**
 * @param \Spryker\Shared\Kernel\Transfer\AbstractTransfer|\Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
 *
 * @return bool
 */
 protected function isMethodPayNow(AbstractTransfer $quoteTransfer)
 {
 return $quoteTransfer->getPayment()->getPaymentSelection() === ComputopConfig::PAYMENT_METHOD_PAY_NOW;
 }

 /**
 * @return array
 */
 protected function getBrandOptions()
 {
 return [
 'VISA' => 'Visa',
 'MasterCard' => 'Master Card',
 'AMEX' => 'American Express',
 'DINERS' => 'Diners Club',
 'JCB' => 'JCB',
 'CBN' => 'CBN',
 'SWITCH' => 'Switch',
 'SOLO' => 'Solo',
 ];
 }
}
```
<br>
</details>

Then you need to add it to `Yves/Checkout/Process/StepFactory.php` right after the `PlaceOrder` step and before the `Success` step.
```php
protected function createPayNowStep()
{
 return new PayNowStep(
 CheckoutControllerProvider::CHECKOUT_COMPUTOP_PAYNOW,
 ApplicationControllerProvider::ROUTE_HOME
 );
}

public function createStepCollection()
{
 $stepCollection = new StepCollection(
 $this->getUrlGenerator(),
 CheckoutControllerProvider::CHECKOUT_ERROR
 );

 $stepCollection
 ....
 ->addStep($this->createPlaceOrderStep())
 ->addStep($this->createPayNowStep())
 ->addStep($this->createSuccessStep());

 return $stepCollection;
}
```

Also you need to add action to `Yves/Checkout/Controller/CheckoutController.php`
```php
public function paynowAction(Request $request)
{
 return $this->createStepProcess()->process($request);
}
```

And define this action in `Yves/Checkout/Plugin/Provider/CheckoutControllerProvider.php`
```php
protected function defineControllers(Application $app)
{
 $allowedLocalesPattern = $this->getAllowedLocalesPattern();

 .....

 $this->createController('/{checkout}/computop/paynow', self::CHECKOUT_COMPUTOP_PAYNOW, 'Checkout', 'Checkout', 'paynow')
 ->assert('checkout', $allowedLocalesPattern . 'checkout|checkout')
 ->value('checkout', 'checkout')
 ->method('GET|POST');
}
```

The final step is to create a template for rendering `PayNow` step in `Yves/Checkout/Theme/default/checkout/paynow.twig`

<details open>
 <summary>Click here to expand the code sample</summary>

 ```xml
{% raw %}{%{% endraw %} extends "@checkout/layout.twig" {% raw %}%}{% endraw %}

 {% raw %}{%{% endraw %} block breadcrumb {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

 {% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
<div class="row columns">
 <form name="paynowStepForm" method="post" action="{% raw %}{{{% endraw %} action {% raw %}}}{% endraw %}">
 <div id="paynowStepForm" class="callout">
 <div class="small-12 large-6 columns">
 <div>
 <label for="paynowStepForm_CCBrand" class="required">Credit Card Brand</label>
 <select id="paynowStepForm_CCBrand" name="CCBrand">
 {% raw %}{%{% endraw %} for key, value in brandOptions {% raw %}%}{% endraw %}
 <option value="{% raw %}{{{% endraw %} key {% raw %}}}{% endraw %}">{% raw %}{{{% endraw %} value {% raw %}}}{% endraw %}</option>
 {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
 </select>
 </div>
 <div>
 <label for="paynowStepForm_CCNr" class="required">Credit Card Number</label>
 <input type="text" id="paynowStepForm_CCNr" name="CCNr" required="required">
 </div>
 <div>
 <label for="paynowStepForm_CCExpiry" class="required">Credit card expiry date in the format YYYYMM, e.g. 201807</label>
 <input type="text" id="paynowStepForm_CCExpiry" name="CCExpiry" required="required">
 </div>
 <div>
 <label for="paynowStepForm_CCCVC" class="required">CVV</label>
 <input type="text" id="paynowStepForm_CCCVC" name="CCCVC" required="required">
 </div>
 <input type="hidden" id="paynowStepForm_MerchantID" name=""MerchantID" value="{% raw %}{{{% endraw %} merchant {% raw %}}}{% endraw %}">
 <input type="hidden" id="paynowStepForm_Data" name="Data" value="{% raw %}{{{% endraw %} data {% raw %}}}{% endraw %}">
 <input type="hidden" id="paynowStepForm_Len" name="Len" value="{% raw %}{{{% endraw %} len {% raw %}}}{% endraw %}">
 <input type="hidden" id="paynowStepForm__token" name="paynowStepForm[_token]" value="QU3KalLrQ3pyUPPNc13NzPQ5U4O_vdjK5gkPKR5pkEo">
 <div class="row align-right">
 <div class="small-12 medium-6 large-4 xlarge-6 columns">
 <button type="submit" class="button success expanded __no-margin-bottom">Pay</button>
 </div>
 </div>
 </div>
 </div>
 </form>
</div>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
 ```
 <br>
</details>

To make this specific step work only with PayNow payment method we have to update `Yves/Checkout/Process/Steps/PlaceOrderStep.php`
```php
public function execute(Request $request, AbstractTransfer $quoteTransfer)
{
 if ($this->isPaymentPayNow($quoteTransfer) && $this->isComputopPaymentExist($quoteTransfer)) {
 return $quoteTransfer;
 }

 $quoteTransfer = parent::execute($request, $quoteTransfer);

 if ($this->isPaymentPayNow($quoteTransfer)) {
 $this->setComputopInitData($quoteTransfer);
 }

 return $quoteTransfer;
}

protected function isPaymentPayNow(QuoteTransfer $quoteTransfer)
{
 return $quoteTransfer->getPayment()->getPaymentSelection() === ComputopConfig::PAYMENT_METHOD_PAY_NOW;
}

protected function isComputopPaymentExist(QuoteTransfer $quoteTransfer)
{
 $quoteTransfer = $this->computopClient->isComputopPaymentExist($quoteTransfer);

 return (bool)$quoteTransfer->getPayment()->getIsComputopPaymentExist();
}
```

Also, you will need to add `ComputopClient` to `PlaceOrderSpet` dependecy `Yves/Checkout/Process/StepFactory.php`
```php
public function getComputopClient()
{
 return $this->getProvidedDependency(CheckoutDependencyProvider::CLIENT_COMPUTOP);
}

protected function createPlaceOrderStep()
{
 return new PlaceOrderStep(
 $this->getCheckoutClient(),
 $this->getFlashMessenger(),
 $this->getComputopClient(),
 CheckoutControllerProvider::CHECKOUT_PLACE_ORDER,
 ApplicationControllerProvider::ROUTE_HOME,
 [
 'payment failed' => CheckoutControllerProvider::CHECKOUT_PAYMENT,
 ShipmentCheckoutConnectorConfig::ERROR_CODE_SHIPMENT_FAILED => CheckoutControllerProvider::CHECKOUT_SHIPMENT,
 ]
 );
}
```

## PayNow Payment Flow

1. There is a radio button on <b>Payment</b> step. After submitting the order, the customer is redirected to the to PayNow checkout step. The step contains Credit Card form with the following fields:
  - Credit Card brand choice;
  - Credit Card number;
  - Credit Card expires date (in the format `YYYYMM`, e.g. 201807);
  - Credit Card security code (CVV);
  - Data (hidden field, encrypted parameters, e.g. currency, amount, description);
  - Length (hidden field, length of `data` parameter);
  - Merchant id (hidden field, assigned by Computop).

Form posts directly to Computop paygate. After the process is requested, Computop redirects the customer to success or failure URL.

2. By default, on success the customer will be redirected to "Success" step. The response contains `payId`. On error, the customer will be redirected to "Payment" step with the error message. Response data is stored in the DB.
3. Authorization is added by default right after the success init action. Capture/Refund and Cancel actions are implemented in the Administration Interface (on manage order). On requests, Spryker will use `payId` parameter stored in the DB to identify a payment.

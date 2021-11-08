---
title: PayOne - Risk Check and Address Check
description: In this article, you will get information on the Payone risk check and address check services.
last_updated: Jan 27, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/payone-risk-check-address-check-scos
originalArticleId: 45c76422-7cb7-4833-9b81-c1cfe99cf1eb
redirect_from:
  - /v3/docs/payone-risk-check-address-check-scos
  - /v3/docs/en/payone-risk-check-address-check-scos
related:
  - title: PayOne - Cash on Delivery
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/scos-integration/payone-cash-on-delivery.html
  - title: PayOne - Authorization and Preauthorization Capture Flows
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-authorization-and-preauthorization-capture-flows.html
  - title: PayOne - Invoice Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-invoice-payment.html
  - title: PayOne - Prepayment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-prepayment.html
  - title: PayOne - Direct Debit Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-direct-debit-payment.html
  - title: PayOne - Security Invoice Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-security-invoice-payment.html
  - title: PayOne - Online Transfer Payment
    link: docs/scos/user/technology-partners/page.version/payment-partners/bs-payone/legacy-demoshop-integration/payone-payment-methods/payone-online-transfer-payment.html
---

On the project level, you should override execute and postCondition methods of `SprykerShop\Yves\CheckoutPage\Process\Steps\AddressStep`.

<details open>
 <summary markdown='span'>src/Pyz/Yves/CheckoutPage/Process/Steps/AddressStep.php</summary>

```php
<?php

namespace Pyz\Yves\CheckoutPage\Process\Steps;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use SprykerEco\Client\Payone\PayoneClientInterface;
use SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToCalculationClientInterface;
use SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToCustomerClientInterface;
use SprykerShop\Yves\CheckoutPage\Process\Steps\AddressStep as SprykerAddressStep;
use Symfony\Component\HttpFoundation\Request;

class AddressStep extends SprykerAddressStep
{
 protected const ADDRESS_CHECK_STATUS_VALID = 'VALID';

 /**
 * @var \SprykerEco\Client\Payone\PayoneClientInterface
 */
 protected $payoneClient;

 public function __construct(CheckoutPageToCustomerClientInterface $customerClient, CheckoutPageToCalculationClientInterface $calculationClient, string $stepRoute, string $escapeRoute, PayoneClientInterface $payoneClient)
 {
 parent::__construct($customerClient, $calculationClient, $stepRoute, $escapeRoute);
 $this->payoneClient = $payoneClient;
 }

 public function execute(Request $request, AbstractTransfer $quoteTransfer)
 {
 ...
 $responseTransfer = $this->payoneClient->sendAddressCheckRequest($quoteTransfer);
 $quoteTransfer->setIsAddressValid($responseTransfer->getStatus() === static::ADDRESS_CHECK_STATUS_VALID);
 ...
 }

 /**
 * @param \Generated\Shared\Transfer\QuoteTransfer|\Spryker\Shared\Kernel\Transfer\AbstractTransfer $quoteTransfer
 *
 * @return bool
 */
 public function postCondition(AbstractTransfer $quoteTransfer)
 {
 ...

 if (!$quoteTransfer->getIsAddressValid()) {
 return false;
 }

 ...
 }
}
```
<br>
</details>

Also, `src/Pyz/Yves/CheckoutPage/Process/StepFactory.php` should be updated on the project level.

<details open>
<summary markdown='span'>src/Pyz/Yves/CheckoutPage/Process/StepFactory.php</summary>

```php
<?php

namespace Pyz\Yves\CheckoutPage\Process;

...
use SprykerShop\Yves\HomePage\Plugin\Provider\HomePageControllerProvider;
...

class StepFactory extends SprykerStepFactory
{
 /**
 * @var PayoneClientInterface
 */
 protected $payoneClient;

 public function __construct(PayoneClientInterface $payoneClient)
 {
 $this->payoneClient = $payoneClient;
 }

 ...

 /**
 * @return \Pyz\Yves\CheckoutPage\Process\Steps\AddressStep
 */
 public function createAddressStep()
 {
 return new AddressStep(
 $this->getCustomerClient(),
 $this->getCalculationClient(),
 CheckoutPageControllerProvider::CHECKOUT_ADDRESS,
 HomePageControllerProvider::ROUTE_HOME,
 $this->payoneClient
 );
 }

 ...
}
```
<br>
</details>

## Consumer Score Integration

On the project level, you should override the execute method of `SprykerShop\Yves\CheckoutPage\Process\Steps\AddressStep`.

<details open>
<summary markdown='span'>src/Pyz/Yves/CheckoutPage/Process/Steps/ShipmentStep.php</summary>

 ```php
<?php

namespace Pyz\Yves\CheckoutPage\Process\Steps;
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginCollection;
use SprykerEco\Client\Payone\PayoneClientInterface;
use SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToCalculationClientInterface;
use SprykerShop\Yves\CheckoutPage\Process\Steps\ShipmentStep as SprykerShipmentStep;
use Symfony\Component\HttpFoundation\Request;

class ShipmentStep extends SprykerShipmentStep
{
 /**
 * @var PayoneClientInterface
 */
 protected $payoneClient;

 public function __construct(
 CheckoutPageToCalculationClientInterface $calculationClient,
 StepHandlerPluginCollection $shipmentPlugins,
 string $stepRoute,
 string $escapeRoute,
 PayoneClientInterface $payoneClient
 ) {
 parent::__construct($calculationClient, $shipmentPlugins, $stepRoute, $escapeRoute);
 $this->payoneClient = $payoneClient;
 }

 public function execute(Request $request, AbstractTransfer $quoteTransfer)
 {
 $responseTransfer = $this->payoneClient->sendConsumerScoreRequest($quoteTransfer);
 $quoteTransfer->setConsumerScore($responseTransfer->getScore());
 return parent::execute($request, $quoteTransfer);
 }
}
```
<br>
</details>

`src/Pyz/Yves/CheckoutPage/Process/StepFactory.php` should be updated:

<details open>
<summary markdown='span'>src/Pyz/Yves/CheckoutPage/Process/Steps/ShipmentStep.php</summary>

 ```php
<?php

namespace Pyz\Yves\CheckoutPage\Process\Steps;
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginCollection;
use SprykerEco\Client\Payone\PayoneClientInterface;
use SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToCalculationClientInterface;
use SprykerShop\Yves\CheckoutPage\Process\Steps\ShipmentStep as SprykerShipmentStep;
use Symfony\Component\HttpFoundation\Request;

class ShipmentStep extends SprykerShipmentStep
{
 /**
 * @var PayoneClientInterface
 */
 protected $payoneClient;

 public function __construct(
 CheckoutPageToCalculationClientInterface $calculationClient,
 StepHandlerPluginCollection $shipmentPlugins,
 string $stepRoute,
 string $escapeRoute,
 PayoneClientInterface $payoneClient
 ) {
 parent::__construct($calculationClient, $shipmentPlugins, $stepRoute, $escapeRoute);
 $this->payoneClient = $payoneClient;
 }

 public function execute(Request $request, AbstractTransfer $quoteTransfer)
 {
 $responseTransfer = $this->payoneClient->sendConsumerScoreRequest($quoteTransfer);
 $quoteTransfer->setConsumerScore($responseTransfer->getScore());
 return parent::execute($request, $quoteTransfer);
 }
}
```
<br>
</details>

`src/Pyz/Yves/CheckoutPage/Process/StepFactory.php` should be updated:

 <details open>
<summary markdown='span'>src/Pyz/Yves/CheckoutPage/Process/StepFactory.php</summary>

 ```php
<?php

namespace Pyz\Yves\CheckoutPage\Process;

...
use SprykerShop\Yves\HomePage\Plugin\Provider\HomePageControllerProvider;
...

class StepFactory extends SprykerStepFactory
{
 /**
 * @var PayoneClientInterface
 */
 protected $payoneClient;

 public function __construct(PayoneClientInterface $payoneClient)
 {
 $this->payoneClient = $payoneClient;
 }

 ...

 public function createShipmentStep()
 {
 return new ShipmentStep(
 $this->getCalculationClient(),
 $this->getProvidedDependency(CheckoutPageDependencyProvider::PLUGIN_SHIPMENT_HANDLER),
 CheckoutPageControllerProvider::CHECKOUT_SHIPMENT,
 HomePageControllerProvider::ROUTE_HOME,
 $this->payoneClient
 );
 }

 ...
}
```
<br>
</details>

`src/Pyz/Zed/Payment/PaymentDependencyProvider.php` should be updated:

 <details open>
<summary markdown='span'>src/Pyz/Zed/Payment/PaymentDependencyProvider.php</summary>

 ```php
<?php

...
use SprykerEco\Zed\Payone\Communication\Plugin\Payment\PayonePaymentMethodFilterPlugin;
...

class PaymentDependencyProvider extends SprykerPaymentDependencyProvider
{
 ...

 /**
 * @return \Spryker\Zed\Payment\Dependency\Plugin\Payment\PaymentMethodFilterPluginInterface[]
 */
 protected function getPaymentMethodFilterPlugins(): array
 {
 return [
 new PayonePaymentMethodFilterPlugin(),
 ];
 }
 ...
}
```
<br>
</details>

<br>Now Payone is ready for filtering Payment methods. Configuration for each score result should be defined in the config:

 <details open>
<summary markdown='span'>Example of configuration for score results</summary>

 ```php
<?php

 ...

 PayoneConstants::PAYONE_GREEN_SCORE_AVAILABLE_PAYMENT_METHODS => [
 PayoneConfig::PAYMENT_METHOD_INVOICE,
 PayoneConfig::PAYMENT_METHOD_CREDIT_CARD,
 ],
 PayoneConstants::PAYONE_YELLOW_SCORE_AVAILABLE_PAYMENT_METHODS => [
 PayoneConfig::PAYMENT_METHOD_EPS_ONLINE_TRANSFER
 ],
 PayoneConstants::PAYONE_RED_SCORE_AVAILABLE_PAYMENT_METHODS => [
 PayoneConfig::PAYMENT_METHOD_PRE_PAYMENT
 ],
 PayoneConstants::PAYONE_UNKNOWN_SCORE_AVAILABLE_PAYMENT_METHODS => [
 PayoneConfig::PAYMENT_METHOD_CREDIT_CARD,
 PayoneConfig::PAYMENT_METHOD_EPS_ONLINE_TRANSFER,
 PayoneConfig::PAYMENT_METHOD_PRE_PAYMENT,
 ],

 //Also you should define the check types for bot requests
 PayoneConstants::PAYONE_ADDRESS_CHECK_TYPE => 'BA',
 PayoneConstants::PAYONE_CONSUMER_SCORE_TYPE => 'IH',
...
```
<br>
</details>


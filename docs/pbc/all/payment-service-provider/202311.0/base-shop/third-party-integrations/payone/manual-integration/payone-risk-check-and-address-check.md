---
title: PayOne - Risk Check and Address Check
description: In this article, you will get information on the Payone risk check and address check services.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/payone-risk-check-address-check-scos
originalArticleId: 38b985f4-811e-4e38-8f43-c7863cb5add2
redirect_from:
  - /docs/scos/user/technology-partners/202311.0/payment-partners/bs-payone/scos-integration/payone-risk-check-and-address-check.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/payone/manual-integration/payone-risk-check-and-address-check.html
---

On the project level, you should override execute and postCondition methods of `SprykerShop\Yves\CheckoutPage\Process\Steps\AddressStep`.

**src/Pyz/Yves/CheckoutPage/Process/Steps/AddressStep.php**

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

Also, `src/Pyz/Yves/CheckoutPage/Process/StepFactory.php` should be updated on the project level.

**src/Pyz/Yves/CheckoutPage/Process/StepFactory.php**

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

## Consumer Score Integration

On the project level, you should override the execute method of `SprykerShop\Yves\CheckoutPage\Process\Steps\AddressStep`.

**src/Pyz/Yves/CheckoutPage/Process/Steps/ShipmentStep.php**

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

`src/Pyz/Yves/CheckoutPage/Process/StepFactory.php` should be updated:

**src/Pyz/Yves/CheckoutPage/Process/Steps/ShipmentStep.php**

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

`src/Pyz/Yves/CheckoutPage/Process/StepFactory.php` should be updated:

**src/Pyz/Yves/CheckoutPage/Process/StepFactory.php**

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

`src/Pyz/Zed/Payment/PaymentDependencyProvider.php` should be updated:

**src/Pyz/Zed/Payment/PaymentDependencyProvider.php**

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

<br>Now Payone is ready for filtering Payment methods. Configuration for each score result should be defined in the config:

**Example of configuration for score results**

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

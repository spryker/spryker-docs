---
title: Integrating the CRIF payment method for Computop
description: In this article, you can find information on the CRIF process for Spryker Commerce OS.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/computop-crif
originalArticleId: 9e295864-bffd-4b37-b8a8-33c413bc46db
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202001.0/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-crif-payment-method-for-computop.html
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-crif-payment-method-for-computop.html
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-crif-payment-method-for-computop.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-crif-payment-method-for-computop.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/computop/integrating-payment-methods-for-computop/integrating-the-crif-payment-method-for-computop.html
  - /docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-crif-payment-method-for-computop.html
related:
  - title: Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/computop.html
  - title: Integrating the Sofort payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-sofort-payment-method-for-computop.html
  - title: Integrating the PayPal payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-paypal-payment-method-for-computop.html
  - title: Integrating the PayNow payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-paynow-payment-method-for-computop.html
  - title: Computop API calls
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/computop-api-calls.html
  - title: Integrating the Direct Debit payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-direct-debit-payment-method-for-computop.html
  - title: Integrating the iDeal payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-ideal-payment-method-for-computop.html
  - title: Computop - Credit Card
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-credit-card-payment-method-for-computop.html
  - title: Integrating the Easy Credit payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-easy-credit-payment-method-for-computop.html
  - title: Integrating the Paydirekt payment method for Computop
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/computop/integrate-payment-methods-for-computop/integrate-the-paydirekt-payment-method-for-computop.html
---

## General Information About CRIF

Popular with customers, risky for the merchant: Payment methods such as direct debit or purchase on account involve a high level of default risk. Computop Paycontrol, an automated credit rating with all standard credit agencies, combines flexibility and payment security for online business. With Paycontrol you can, amongst other things, automatically obtain information from CRIF without having to connect your shop system to individual information interfaces.

CRIF (formerly Deltavista) provides information on about 80 million individuals, 6 million companies, and 10 million payment, register, and address records from Germany, Austria and Switzerland.

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Computop/CRIF-process-flow.png)

## Calling the Interface

To carry out a CRIF order check via a Server-to-Server connection, go to [that URL](https://www.computop-paygate.com/deltavista.aspx).

For security reasons, Paygate rejects all payment requests with formatting errors. Therefore  use the correct data type for each parameter.

## Integration with Checkout

Integrated into Computop module CRIF provides risk check functionality based on customer, cart, address and other data. CRIF analyzes information and provides result as color response code (GREEN, YELLOW, RED) which corresponds to potential risks. Based on this result payment methods should be filtered. Only allowed payment methods should be displayed on checkout payment page. Module provides possibility to configure list of allowed payment methods for each response color.

1. First of all you need to add CRIF specific configurations into `config_default.php` file:

**config/Shared/config_default.php**

```php
$config[ComputopConstants::CRIF_ENABLED] = false; // Enable or disable CRIF functionality.
$config[ComputopApiConstants::CRIF_ACTION] = 'https://www.computop-paygate.com/deltavista.aspx'; //CRIF API call enpoint.
$config[ComputopApiConstants::CRIF_PRODUCT_NAME] = ''; //This is checking method, could be: QuickCheckConsumer, CreditCheckConsumer, QuickCheckBusiness, CreditCheckBusiness, IdentCheckConsumer
$config[ComputopApiConstants::CRIF_LEGAL_FORM] = ''; // Legal form of the person/company sought, could be: PERSON, COMPANY, UNKNOWN

$config[ComputopConstants::CRIF_GREEN_AVAILABLE_PAYMENT_METHODS] = []; //List of allowed payment methods if CRIF returns GREED code, for example: computopCreditCard, computopDirectDebit and so on.
$config[ComputopConstants::CRIF_YELLOW_AVAILABLE_PAYMENT_METHODS] = []; //List of allowed payment methods if CRIF returns YELLOW code, for example: computopPaydirekt, computopEasyCredit and so on.
$config[ComputopConstants::CRIF_RED_AVAILABLE_PAYMENT_METHODS] = []; //List of allowed payment methods if CRIF returns RED code, for example: computopSofort, computopPayPal and so on.
```

2. Extend `ShipmentStep` to add CRIF risk check call before checkout payment step:

**\Pyz\Yves\CheckoutPage\Process\Steps\ShipmentStep**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information,  view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Process\Steps;

use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginCollection;
use SprykerEco\Client\Computop\ComputopClientInterface;
use SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToCalculationClientInterface;
use SprykerShop\Yves\CheckoutPage\Process\Steps\ShipmentStep as SprykerShipmentStep;
use Symfony\Component\HttpFoundation\Request;

class ShipmentStep extends SprykerShipmentStep
{
	/**
	 * @var \SprykerEco\Client\Computop\ComputopClientInterface
	 */
	protected $computopClient;

	/**
	 * @param \SprykerShop\Yves\CheckoutPage\Dependency\Client\CheckoutPageToCalculationClientInterface $calculationClient
	 * @param \Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginCollection $shipmentPlugins
	 * @param string $stepRoute
	 * @param string $escapeRoute
	 * @param \SprykerEco\Client\Computop\ComputopClientInterface $computopClient
	 */
	public function __construct(
		CheckoutPageToCalculationClientInterface $calculationClient,
		StepHandlerPluginCollection $shipmentPlugins,
		$stepRoute,
		$escapeRoute,
		ComputopClientInterface $computopClient
	) {
		parent::__construct(
			$calculationClient,
			$shipmentPlugins,
			$stepRoute,
			$escapeRoute
		);

		$this->computopClient = $computopClient;
	}

	/**
	 * @param \Symfony\Component\HttpFoundation\Request $request
	 * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
	 *
	 * @return \Generated\Shared\Transfer\QuoteTransfer
	 */
	public function execute(Request $request, AbstractTransfer $quoteTransfer)
	{
		$quoteTransfer = parent::execute($request, $quoteTransfer);

		return $this->computopClient->performCrifApiCall($quoteTransfer);
	}
}
```

3. Extend `StepFactory` to update shipment checkout step:

**\Pyz\Yves\CheckoutPage\Process\StepFactory**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information,  view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Process;

use Pyz\Yves\CheckoutPage\CheckoutPageDependencyProvider;
use Pyz\Yves\CheckoutPage\Plugin\Provider\CheckoutPageControllerProvider;
use Pyz\Yves\CheckoutPage\Process\Steps\ShipmentStep;
use SprykerEco\Client\Computop\ComputopClientInterface;
use SprykerShop\Yves\CheckoutPage\Process\StepFactory as SprykerStepFactory;
use SprykerShop\Yves\HomePage\Plugin\Provider\HomePageControllerProvider;

/**
 * @method \SprykerShop\Yves\CheckoutPage\CheckoutPageConfig getConfig()
 */
class StepFactory extends SprykerStepFactory
{
	/**
	 * @return \SprykerShop\Yves\CheckoutPage\Process\Steps\ShipmentStep
	 */
	public function createShipmentStep()
	{
		return new ShipmentStep(
			$this->getCalculationClient(),
			$this->getShipmentPlugins(),
			CheckoutPageControllerProvider::CHECKOUT_SHIPMENT,
			HomePageControllerProvider::ROUTE_HOME,
			$this->getComputopClient()
		);
	}

	/**
	 * @return \SprykerEco\Client\Computop\ComputopClientInterface
	 */
	public function getComputopClient(): ComputopClientInterface
	{
		return $this->getProvidedDependency(CheckoutPageDependencyProvider::CLIENT_COMPUTOP);
	}
}
```

4. Extend `CheckoutPageFactory` for project level `StepFactory` usage:

**\Pyz\Yves\CheckoutPage\CheckoutPageFactory**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information,  view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage;

use Pyz\Yves\CheckoutPage\Process\StepFactory;
use SprykerShop\Yves\CheckoutPage\CheckoutPageFactory as SprykerShopCheckoutPageFactory;

class CheckoutPageFactory extends SprykerShopCheckoutPageFactory
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

An example of the configuration can be taken from `vendor/spryker-eco/computop/config/config.dist.php` file.

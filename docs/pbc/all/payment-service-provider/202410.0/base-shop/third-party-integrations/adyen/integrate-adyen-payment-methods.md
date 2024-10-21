---
title: Integrating Adyen payment methods
description: Adyen supports credit card, direct debit, Klarna invoice, Prepayment, Sofort,  PayPal, iDeal, AliPay, WeChatPay payment methods that can be integrated into the Spryker Commerce OS.
last_updated: Oct 4, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/adyen-provided-payment-methods
originalArticleId: f1994f41-32fd-4af3-8e5a-b3a3ce75e39c
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/adyen/integrating-adyen-payment-methods.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/adyen/integrate-adyen-payment-methods.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/adyen/integrating-adyen-payment-methods.html
related:
  - title: Installing and configuring Adyen
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/adyen/install-and-configure-adyen.html
  - title: Integrating Adyen
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/adyen/integrate-adyen.html
  - title: Enabling filtering of payment methods for Ayden
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/adyen/enable-filtering-of-payment-methods-for-adyen.html
---

## Credit card

Adyen module provides the following integration options:
  * Simple
  * With 3D Secure authorization

3D Secure integration requires adjustments on the project level. Do the following:

1. Add one more checkout step.
Exemplary implementation:

**src/Pyz/Yves/CheckoutPage/Process/Steps/AdyenExecute3DStep.php**

 ```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Process\Steps;

use Pyz\Yves\CheckoutPage\CheckoutPageConfig;
use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use SprykerEco\Shared\Adyen\AdyenConfig;
use SprykerShop\Yves\CheckoutPage\Process\Steps\AbstractBaseStep;

class AdyenExecute3DStep extends AbstractBaseStep
{
    /**
     * @var \Pyz\Yves\CheckoutPage\CheckoutPageConfig
     */
    protected $config;

    /**
     * @param string $stepRoute
     * @param string $escapeRoute
     * @param \Pyz\Yves\CheckoutPage\CheckoutPageConfig $config
     */
    public function __construct(
        $stepRoute,
        $escapeRoute,
        CheckoutPageConfig $config
    ) {
        parent::__construct($stepRoute, $escapeRoute);

        $this->config = $config;
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return bool
     */
    public function requireInput(AbstractTransfer $quoteTransfer)
    {
        return $this->isAdyenCreditCardPayment($quoteTransfer) &&
            $this->config->isAdyenCreditCard3dSecureEnabled() &&
            $quoteTransfer->getPayment()->getAdyenRedirect();
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return bool
     */
    public function postCondition(AbstractTransfer $quoteTransfer)
    {
        return true;
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return array
     */
    public function getTemplateVariables(AbstractTransfer $quoteTransfer)
    {
        return [
            'action' => $quoteTransfer->getPayment()->getAdyenRedirect()->getAction(),
            'fields' => $quoteTransfer->getPayment()->getAdyenRedirect()->getFields(),
        ];
    }
}
    /**
     * @param \Spryker\Shared\Kernel\Transfer\AbstractTransfer $quoteTransfer
     *
     * @return bool
     */
    protected function isAdyenCreditCardPayment(AbstractTransfer $quoteTransfer): bool
    {
        return $quoteTransfer->getPayment() && $quoteTransfer->getPayment()->getPaymentSelection() === AdyenConfig::ADYEN_CREDIT_CARD;
    }
```

2. Add a template for this step:

**src/Pyz/Yves/CheckoutPage/Theme/default/views/adyen/execute_3d.twig**

 ```php
{% raw %}{%{% endraw %} extends template('page-layout-main') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
    <form id="adyenExecute3DStepForm_" name="adyenExecute3DStepForm" method="post" action="{% raw %}{{{% endraw %} _view.action {% raw %}}}{% endraw %}">
        {% raw %}{%{% endraw %} for key, value in _view.fields {% raw %}%}{% endraw %}
            <input type="hidden" id="adyenExecute3DStepForm_{% raw %}{{{% endraw %} key {% raw %}}}{% endraw %}" name="{% raw %}{{{% endraw %} key {% raw %}}}{% endraw %}" value="{% raw %}{{{% endraw %} value {% raw %}}}{% endraw %}">
        {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
    </form>
    <script type="text/javascript">
        document.getElementById('adyenExecute3DStepForm_').submit();
    </script>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```

3. Create `StepFactory` on the project level and add `AdyenExecute3DStep` between `PlaceOrderStep` / `SuccessStep`:

**src/Pyz/Yves/CheckoutPage/Process/StepFactory.php**

 ```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Process;

use Pyz\Yves\CheckoutPage\Plugin\Router\CheckoutPageRouteProviderPlugin;
use Pyz\Yves\CheckoutPage\Process\Steps\AdyenExecute3DStep;
use Pyz\Yves\CheckoutPage\Process\Steps\PlaceOrderStep;
use Spryker\Yves\StepEngine\Dependency\Step\StepInterface;
use SprykerShop\Yves\CheckoutPage\Process\StepFactory as SprykerShopStepFactory;

/**
 * @method \Pyz\Yves\CheckoutPage\CheckoutPageConfig getConfig()
 */
class StepFactory extends SprykerShopStepFactory
{
    /**
     * @return \Spryker\Yves\StepEngine\Dependency\Step\StepInterface[]
     */
    public function getSteps(): array
    {
        return [
            $this->createEntryStep(),
            $this->createCustomerStep(),
            $this->createAddressStep(),
            $this->createShipmentStep(),
            $this->createPaymentStep(),
            $this->createSummaryStep(),
            $this->createPlaceOrderStep(),
            $this->createAdyenExecute3DStep(),
            $this->createSuccessStep(),
            $this->createErrorStep(),
        ];
    }

    /**
     * @return \Spryker\Yves\StepEngine\Dependency\Step\StepInterface
     */
    public function createPlaceOrderStep(): StepInterface
    {
        return new PlaceOrderStep(
            $this->getCheckoutClient(),
            $this->getFlashMessenger(),
            $this->getLocaleClient()->getCurrentLocale(),
            $this->getGlossaryStorageClient(),
            CheckoutPageRouteProviderPlugin::ROUTE_NAME_CHECKOUT_PLACE_ORDER,
            $this->getConfig()->getEscapeRoute(),
            [
                'payment failed' => CheckoutPageRouteProviderPlugin::ROUTE_NAME_CHECKOUT_PAYMENT,
                'shipment failed' => CheckoutPageRouteProviderPlugin::ROUTE_NAME_CHECKOUT_SHIPMENT,
            ]
        );
    }

    /**
     * @return \Spryker\Yves\StepEngine\Dependency\Step\StepInterface
     */
    public function createAdyenExecute3DStep(): StepInterface
    {
        return new AdyenExecute3DStep(
            CheckoutPageRouteProviderPlugin::ROUTE_NAME_CHECKOUT_ADYEN_EXECUTE_3D,
            $this->getConfig()->getEscapeRoute(),
            $this->getConfig()
        );
    }
}
 ```

4. Add a controller to process the 3D secure step:

**src/Pyz/Yves/CheckoutPage/Controller/CheckoutController.php**

 ```php
 <?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Controller;

use SprykerShop\Yves\CheckoutPage\Controller\CheckoutController as SprykerShopCheckoutController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \SprykerShop\Yves\CheckoutPage\CheckoutPageFactory getFactory()
 */
class CheckoutController extends SprykerShopCheckoutController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Spryker\Yves\Kernel\View\View|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function adyenExecute3DAction(Request $request)
    {
        $response = $this->createStepProcess()->process($request);

        if (!is_array($response)) {
            return $response;
        }

        return $this->view(
            $response,
            $this->getFactory()->getCustomerPageWidgetPlugins(),
            '@CheckoutPage/views/adyen/execute_3d.twig'
        );
    }
}
```

5. Add action to the route provider plugin:

**src/Pyz/Yves/CheckoutPage/Plugin/Router/CheckoutPageRouteProviderPlugin.php**

 ```php
 <?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Plugin\Router;

use Spryker\Yves\Router\Route\RouteCollection;
use SprykerShop\Yves\CheckoutPage\Plugin\Router\CheckoutPageRouteProviderPlugin as SprykerShopCheckoutPageRouteProviderPlugin;

class CheckoutPageRouteProviderPlugin extends SprykerShopCheckoutPageRouteProviderPlugin
{
    /**
     * @var string
     */
    public const ROUTE_NAME_CHECKOUT_ADYEN_EXECUTE_3D = 'checkout-adyen-execute-3d';

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
        $routeCollection = $this->addAdyenExecute3DStepRoute($routeCollection);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addAdyenExecute3DStepRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute('/checkout/adyen-execute-3d', 'CheckoutPage', 'Checkout', 'adyenExecute3D');
        $routeCollection->add(static::ROUTE_NAME_CHECKOUT_ADYEN_EXECUTE_3D, $route);

        return $routeCollection;
    }
}
 ```

6. Extend the `PlaceOrder` step to set 3D Secure URL and parameters for `QuoteTransfer`:

**src/Pyz/Yves/CheckoutPage/Process/Steps/PlaceOrderStep.php**

 ```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage\Process\Steps;

use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use SprykerShop\Yves\CheckoutPage\Process\Steps\PlaceOrderStep as SprykerShopPlaceOrderStep;
use Symfony\Component\HttpFoundation\Request;

class PlaceOrderStep extends SprykerShopPlaceOrderStep
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\QuoteTransfer
     */
    public function execute(Request $request, AbstractTransfer $quoteTransfer)
    {
        /** @var \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer */
        $quoteTransfer = parent::execute($request, $quoteTransfer);

        $quoteTransfer->getPayment()->setAdyenRedirect($this->checkoutResponseTransfer->getAdyenRedirect());

        return $quoteTransfer;
    }
}
 ```

7. To make the route available, replace `CheckoutPageRouteProviderPlugin` from core with the one created on the project level:

**\Pyz\Yves\Router\RouterDependencyProvider**

```php
- use SprykerShop\Yves\CheckoutPage\Plugin\Router\CheckoutPageRouteProviderPlugin;
+ use Pyz\Yves\CheckoutPage\Plugin\Router\CheckoutPageRouteProviderPlugin;
```

8. Extend `CheckoutPageConfig` to add a method for checking if 3D Secure is enabled:

**\Pyz\Yves\CheckoutPage\CheckoutPageConfig**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage;

use SprykerEco\Shared\Adyen\AdyenConstants;
use SprykerShop\Yves\CheckoutPage\CheckoutPageConfig as SprykerShopCheckoutPageConfig;

class CheckoutPageConfig extends SprykerShopCheckoutPageConfig
{
    /**
     * @return bool
     */
    public function isAdyenCreditCard3dSecureEnabled(): bool
    {
        return $this->get(AdyenConstants::CREDIT_CARD_3D_SECURE_ENABLED);
    }
}
```

9. Extend `CheckoutPageFactory` to replace SprykerShop Step Factory with the project-level one:

**\Pyz\Yves\CheckoutPage\CheckoutPageFactory**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
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
{% info_block infoBox "Info" %}

The state machine example is available in `vendor/spryker-eco/adyen/config/Zed/Oms/AdyenCreditCard01.xml`.

{% endinfo_block %}


## Direct debit (SEPA Direct Debit)

SEPA (Single Euro Payments Area) Direct Debit was introduced by the European Payments Council to create a standardized payments infrastructure within the EU. With SEPA Direct Debit, businesses can process one-off or recurring payments for EU customers, making it a key payment method for businesses looking to expand across Europe.

{% info_block infoBox "Info" %}

The state machine is available in `vendor/spryker-eco/adyen/config/Zed/Oms/AdyenDirectDebit01.xml`.

{% endinfo_block %}

## Klarna invoice

Klarna Invoice enables your customers to pay without giving their credit card information to the online store. The customers do not have to pay until they have received their products.

When a customer has checked out an order in your store, they can choose Klarna, and then the customer needs to type in their full social security number (CPR in Denmark). German or Dutch customers have to type in their birth date. Klarna performs the credit check, after which the customer should be accepted. When the customer is accepted, Klarna pays the full amount to you, while the customer has to pay the amount directly to Klarna.

{% info_block infoBox "Info" %}

The state machine example is available in `vendor/spryker-eco/adyen/config/Zed/Oms/AdyenKlarnaInvoice01.xml`.

{% endinfo_block %}

## Prepayment (Bank Transfer IBAN)

The Prepayment method is a safe alternative to payments involving credit cards or debit cards (such as online banking transfer). Usually, bank transfer requires manual processing to mark the transaction as canceled or completed, but the process is fully automated through the integration with the Adyen platform.

The payment status is transmitted to the shop via a notification from the payment provider(Adyen).

{% info_block infoBox "Info" %}

The state machine example is available in `vendor/spryker-eco/adyen/config/Zed/Oms/AdyenPrepayment01.xml`.

{% endinfo_block %}

## Sofort

SOFORT is the main online direct payment method that works via online banking. It is the predominant online banking method in countries such as Germany, Austria, Switzerland, and Belgium, making it a must-have for any business wanting to operate in this area.

State machine example can be found in `vendor/spryker-eco/adyen/config/Zed/Oms/AdyenSofort01.xml`

## PayPal

PayPal Holdings, Inc. is an American company operating a worldwide online payments system that supports online money transfers. It serves as an electronic alternative to traditional paper methods like cheques and money orders. The company operates as a payment processor for online vendors, auction sites, and other commercial users. It charges a fee in exchange for benefits such as one-click transactions and password memory.

State machine example can be found in `vendor/spryker-eco/adyen/config/Zed/Oms/AdyenPayPal01.xml`

## iDeal

The most popular payment method in the Netherlands, iDeal is an inter-bank system covered by all major Dutch consumer banks.

{% info_block infoBox "Info" %}

The state machine example is available in `vendor/spryker-eco/adyen/config/Zed/Oms/AdyenIdeal01.xml`.

{% endinfo_block %}

## AliPay

Alipay is the most widely used third-party online payment service provider in China. With over 100 million daily transactions and over 520 million active users. Its primary product is a digital wallet, Alipay Wallet, which also includes a mobile app that allows customers to conduct transactions directly from their mobile devices.

Alipay is a must-have payment method for any business looking to reach a critical mass of Chinese shoppers both home and abroad. It is available in 70 markets and has already been adopted by over 80,000 retail stores worldwide.

{% info_block infoBox "Info" %}

The state machine example is available in `vendor/spryker-eco/adyen/config/Zed/Oms/AdyenAliPay01.xml`.

{% endinfo_block %}

## WeChatPay

WeChat Pay is rapidly becoming a keystone payment method for businesses wanting to reach Chinese shoppers, both home and abroad. Originally a messaging app (like WhatsApp) WeChat has evolved into an ecosystem that allows Chinese shoppers to chat, browse, and make payments, all in one place - making shopping as easy as chatting to your friends.

{% info_block infoBox "Info" %}

The state machine example is available in `vendor/spryker-eco/adyen/config/Zed/Oms/AdyenWeChatPay01.xml`.

{% endinfo_block %}

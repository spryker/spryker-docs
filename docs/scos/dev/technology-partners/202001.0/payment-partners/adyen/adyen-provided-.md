---
title: Adyen - Provided Payment Methods
originalLink: https://documentation.spryker.com/v4/docs/adyen-provided-payment-methods
redirect_from:
  - /v4/docs/adyen-provided-payment-methods
  - /v4/docs/en/adyen-provided-payment-methods
---

## Credit Card

Adyen module provides the following integration options:

  *  simple
   * with 3D Secure authorization

3D Secure integration requires adjustments on the project level:

1. Add an additional Checkout Step. Examplary implementation:

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
        if ($quoteTransfer->getPayment()->getPaymentSelection() === AdyenConfig::ADYEN_CREDIT_CARD &&
            $this->config->isAdyenCreditCard3dSecureEnabled()
        ) {
            return true;
        }
 
        return false;
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
```

2. Add template for this step:

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

3. Put the step between place order and success steps:

**src/Pyz/Yves/CheckoutPage/Process/StepFactory.php**

 ```php
<?php
 
/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */
 
namespace Pyz\Yves\CheckoutPage\Process;
 
use Pyz\Yves\CheckoutPage\Plugin\Provider\CheckoutPageControllerProvider;
use Pyz\Yves\CheckoutPage\Process\Steps\AdyenExecute3DStep;
use Pyz\Yves\CheckoutPage\Process\Steps\PlaceOrderStep;
use Spryker\Yves\StepEngine\Dependency\Step\StepInterface;
use Spryker\Yves\StepEngine\Process\StepCollection;
use SprykerShop\Yves\CheckoutPage\Process\StepFactory as SprykerShopStepFactory;
use SprykerShop\Yves\HomePage\Plugin\Provider\HomePageControllerProvider;
 
/**
 * @method \Pyz\Yves\CheckoutPage\CheckoutPageConfig getConfig()
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
            ->addStep($this->createSummaryStep())
            ->addStep($this->createPlaceOrderStep())
            ->addStep($this->createAdyenExecute3DStep())
            ->addStep($this->createSuccessStep());
        return $stepCollection;
    }
 
    /**
     * @return \Spryker\Yves\StepEngine\Dependency\Step\StepInterface
     */
    public function createPlaceOrderStep(): StepInterface
    {
        return new PlaceOrderStep(
            $this->getCheckoutClient(),
            $this->getFlashMessenger(),
            $this->getStore()->getCurrentLocale(),
            $this->getGlossaryStorageClient(),
            CheckoutPageControllerProvider::CHECKOUT_PLACE_ORDER,
            HomePageControllerProvider::ROUTE_HOME,
            [
                'payment failed' => CheckoutPageControllerProvider::CHECKOUT_PAYMENT,
                'shipment failed' => CheckoutPageControllerProvider::CHECKOUT_SHIPMENT,
            ]
        );
    }
    /**
     * @return \Spryker\Yves\StepEngine\Dependency\Step\StepInterface
     */
    public function createAdyenExecute3DStep(): StepInterface
    {
        return new AdyenExecute3DStep(
            CheckoutPageControllerProvider::CHECKOUT_ADYEN_EXECUTE_3D,
            HomePageControllerProvider::ROUTE_HOME,
            $this->getConfig()
        );
    }
}
 ```

4. Add controller to process 3D secure step:

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

5. Add action to controller provider:

**src/Pyz/Yves/CheckoutPage/Plugin/Provider/CheckoutPageControllerProvider.php**

 ```php
 <?php
 
/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */
 
namespace Pyz\Yves\CheckoutPage\Plugin\Provider;
 
use Silex\Application;
use SprykerShop\Yves\CheckoutPage\Plugin\Provider\CheckoutPageControllerProvider as SprykerShopCheckoutPageControllerProvider;
 
class CheckoutPageControllerProvider extends SprykerShopCheckoutPageControllerProvider
{
    public const CHECKOUT_ADYEN_EXECUTE_3D = 'checkout-adyen-execute-3d';
 
    /**
     * @param \Silex\Application $app
     *
     * @return void
     */
    protected function defineControllers(Application $app)
    {
        $this->addCheckoutIndexRoute()
            ->addCustomerStepRoute()
            ->addAddressStepRoute()
            ->addShipmentStepRoute()
            ->addPaymentStepRoute()
            ->addCheckoutSummaryStepRoute()
            ->addPlaceOrderStepRoute()
            ->addCheckoutErrorRoute()
            ->addCheckoutSuccessRoute()
            ->addAdyenExecute3DStepRoute();
    }
 
    /**
     * @return $this
     */
    protected function addAdyenExecute3DStepRoute()
    {
        $this->createController('/{checkout}/adyen-execute-3d', static::CHECKOUT_ADYEN_EXECUTE_3D, 'CheckoutPage', 'Checkout', 'adyenExecute3D')
            ->assert('checkout', $this->getAllowedLocalesPattern() . 'checkout|checkout')
            ->value('checkout', 'checkout')
            ->method('GET|POST');
 
        return $this;
    }
}
 ```

6. Extend `PlaceOrder` step to set 3D Secure url and params into `QuoteTransfer`:

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
     * @return \Spryker\Shared\Kernel\Transfer\AbstractTransfer
     */
    public function execute(Request $request, AbstractTransfer $quoteTransfer)
    {
        $checkoutResponseTransfer = $this->checkoutClient->placeOrder($quoteTransfer);
 
        if ($checkoutResponseTransfer->getIsExternalRedirect()) {
            $this->externalRedirectUrl = $checkoutResponseTransfer->getRedirectUrl();
        }
 
        if ($checkoutResponseTransfer->getSaveOrder() !== null) {
            $quoteTransfer->setOrderReference($checkoutResponseTransfer->getSaveOrder()->getOrderReference());
        }
 
        $this->setCheckoutErrorMessages($checkoutResponseTransfer);
        $this->checkoutResponseTransfer = $checkoutResponseTransfer;
 
        $quoteTransfer->getPayment()->setAdyenRedirect($checkoutResponseTransfer->getAdyenRedirect());
 
        return $quoteTransfer;
    }
}
 ```

7. Move `CheckoutPageControllerProvider` from core to project level in `YvesBootstrap`:

**\Pyz\Yves\ShopApplication\YvesBootstrap**

```php
- use SprykerShop\Yves\CheckoutPage\Plugin\Provider\CheckoutPageControllerProvider;
+ use Pyz\Yves\CheckoutPage\Plugin\Provider\CheckoutPageControllerProvider;
```

8. Extend `CheckoutPageConfig` to add method for checking if 3D Secure is enabled:

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

The state machine example can be found in: `vendor/spryker-eco/adyen/config/Zed/Oms/AdyenCreditCard01.xml`

## Direct Debit (SEPA Direct Debit)

SEPA (Single Euro Payments Area) Direct Debit was introduced by the European Payments Council to create a standardized payments infrastructure within the EU. With SEPA Direct Debit, businesses can process one-off or recurring payments for EU customers, making it a key payment method for businesses looking to expand across Europe.

The state machine example can be found in: `vendor/spryker-eco/adyen/config/Zed/Oms/AdyenDirectDebit01.xml`

## Klarna Invoice

Klarna Invoice enables your customers to pay without giving their credit card information to the online store. The customers do not have to pay until they have received their products.

When a customer has checked out an order in your online store he/she will be able to choose Klarna and then the customer needs to type in his/her full social security number (CPR in Denmark). German or Dutch customers have to type in their Birth date. The customer is accepted throughout a credit check, which is done by Klarna. When the customer is accepted, Klarna pays the full amount to your online shop and the customer has to pay the amount directly to Klarna.

State machine example can be found in: `vendor/spryker-eco/adyen/config/Zed/Oms/AdyenKlarnaInvoice01.xml`

## Prepayment (Bank Transfer IBAN)

Prepayment method is a safe alternative to payments involving credit cards or debit cards (such as online banking transfer). Usually bank transfer would require manual processing to mark transaction as cancelled or completed, but the process is fully automated through the integration with the Adyen platform.

The payment status is transmitted to the shop via a notification from the payment provider(Adyen).

State machine example can be found in: `vendor/spryker-eco/adyen/config/Zed/Oms/AdyenPrepayment01.xml`

## Sofort

SOFORT is the main online direct payment method and works via online banking. It is the predominant online banking method in countries such as Germany, Austria, Switzerland and Belgium, making it a must-have for any business wanting to operate in this area.

State machine example can be found in: `vendor/spryker-eco/adyen/config/Zed/Oms/AdyenSofort01.xml`

## PayPal

PayPal Holdings, Inc. is an American company operating a worldwide online payments system that supports online money transfers and serves as an electronic alternative to traditional paper methods like cheques and money orders. The company operates as a payment processor for online vendors, auction sites, and other commercial users, for which it charges a fee in exchange for benefits such as one-click transactions and password memory.

State machine example can be found in: `vendor/spryker-eco/adyen/config/Zed/Oms/AdyenPayPal01.xml`

## iDeal

The most popular payment method in the Netherlands, iDEAL is an inter-bank system covered by all major Dutch consumer banks.

State machine example can be found in: `vendor/spryker-eco/adyen/config/Zed/Oms/AdyenIdeal01.xml`

## AliPay

Alipay is the most widely used third-party online payment service provider in China. With over 100 million daily transactions and over 520 million active users. Its primary product is a digital wallet, Alipay Wallet, which also includes a mobile app that allows customers to conduct transactions directly from their mobile devices.

Alipay is a must-have payment method for any business looking to reach a critical mass of Chinese shoppers both home and abroad. It is available in 70 markets and has already been adopted by over 80,000 retail stores worldwide.

State machine example can be found in: `vendor/spryker-eco/adyen/config/Zed/Oms/AdyenAliPay01.xml`

## WeChatPay

WeChat Pay is rapidly becoming a keystone payment method for businesses wanting to reach Chinese shoppers, both home and abroad. Originally a messaging app (like WhatsApp) WeChat has evolved into an ecosystem that allows Chinese shoppers to chat, browse, and make payments, all in one place - making shopping as easy as chatting to your friends.

State machine example can be found in: `vendor/spryker-eco/adyen/config/Zed/Oms/AdyenWeChatPay01.xml`

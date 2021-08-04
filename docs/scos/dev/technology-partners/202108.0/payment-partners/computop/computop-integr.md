---
title: Computop - Integration into a project
originalLink: https://documentation.spryker.com/2021080/docs/computop-integration-into-project
redirect_from:
  - /2021080/docs/computop-integration-into-project
  - /2021080/docs/en/computop-integration-into-project
---

{% info_block errorBox %}

There is currently an issue when using giftcards with Computop. Our team is developing a fix for it.

{% endinfo_block %}

This article provides step-by-step instructions on integrating the Computop module into your project.

## Prerequisites
Prior to integrating Computop into your project, make sure you [installed and configured the Computop module](https://documentation.spryker.com/docs/computop-installation-and-configuration).

## Integrating Computop into your project
To integrate Computop, do the following:

### OMS configuration

To configure the OMS:

{% info_block warningBox "Examplary content" %}

The state machines provided below are examples of PSP provider flow.

{% endinfo_block %}


1. Copy the state machines below on the project level and adjust them according to your requirements.  
**config/Shared/config_default.php**

```php
$config[OmsConstants::PROCESS_LOCATION] = [
    ...
    APPLICATION_ROOT_DIR . '/vendor/spryker-eco/cmoputop/config/Zed/Oms', // Is not required after State machine are copied to project level.
];
$config[OmsConstants::ACTIVE_PROCESSES] = [
    ...
    'ComputopPayNow01',
    'ComputopCreditCard01',
    'ComputopDirectDebit01',
    'ComputopPaydirekt01',
    'ComputopPayPal01',
    'ComputopSofort01',
    'ComputopIdeal01',
    'ComputopEasyCredit01',
];
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    ...
    ComputopConfig::PAYMENT_METHOD_PAY_NOW => 'ComputopPayNow01',
    ComputopConfig::PAYMENT_METHOD_CREDIT_CARD => 'ComputopCreditCard01',
    ComputopConfig::PAYMENT_METHOD_DIRECT_DEBIT => 'ComputopDirectDebit01',
    ComputopConfig::PAYMENT_METHOD_PAYDIREKT => 'ComputopPaydirekt01',
    ComputopConfig::PAYMENT_METHOD_PAY_PAL => 'ComputopPayPal01',
    ComputopConfig::PAYMENT_METHOD_SOFORT => 'ComputopSofort01',
    ComputopConfig::PAYMENT_METHOD_IDEAL => 'ComputopIdeal01',
    ComputopConfig::PAYMENT_METHOD_EASY_CREDIT => 'ComputopEasyCredit01',
];
```
  
2. In the `OmsDependencyProvider`, add OMS command and condition plugins:

<details open>
<summary>src/Pyz/Zed/Oms/OmsDependencyProvider.php</summary>
    
```php
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandCollectionInterface;
use Spryker\Zed\Oms\Dependency\Plugin\Condition\ConditionCollectionInterface;
use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use SprykerEco\Zed\Computop\Communication\Plugin\Oms\Command\AuthorizePlugin;
use SprykerEco\Zed\Computop\Communication\Plugin\Oms\Command\CancelPlugin;
use SprykerEco\Zed\Computop\Communication\Plugin\Oms\Command\CapturePlugin;
use SprykerEco\Zed\Computop\Communication\Plugin\Oms\Command\EasyCreditAuthorizePlugin;
use SprykerEco\Zed\Computop\Communication\Plugin\Oms\Command\RefundPlugin;
use SprykerEco\Zed\Computop\Communication\Plugin\Oms\Condition\IsAuthorizedPlugin;
use SprykerEco\Zed\Computop\Communication\Plugin\Oms\Condition\IsCancelledPlugin;
use SprykerEco\Zed\Computop\Communication\Plugin\Oms\Condition\IsCapturedPlugin;
use SprykerEco\Zed\Computop\Communication\Plugin\Oms\Condition\IsInitializedPlugin;
use SprykerEco\Zed\Computop\Communication\Plugin\Oms\Condition\IsPaymentConfirmedPlugin;
use SprykerEco\Zed\Computop\Communication\Plugin\Oms\Condition\IsRefundedPlugin;

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container): Container
    {
        $container = parent::provideBusinessLayerDependencies($container);
        $container = $this->extendCommandPlugins($container);
        $container = $this->extendConditionPlugins($container);

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendCommandPlugins(Container $container): Container
    {
        $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
            ...

            // ----- Computop
            $commandCollection->add(new AuthorizePlugin(), 'Computop/Authorize');
            $commandCollection->add(new CancelPlugin(), 'Computop/Cancel');
            $commandCollection->add(new CapturePlugin(), 'Computop/Capture');
            $commandCollection->add(new EasyCreditAuthorizePlugin(), 'Computop/EasyCreditAuthorize');
            $commandCollection->add(new RefundPlugin(), 'Computop/Refund');


            return $commandCollection;
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendConditionPlugins(Container $container): Container
    {
        $container->extend(self::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {
			...            

            // ----- Computop
            $conditionCollection->add(new IsPaymentConfirmedPlugin(), 'Computop/IsPaymentConfirmed');
            $conditionCollection->add(new IsAuthorizedPlugin(), 'Computop/IsAuthorized');
            $conditionCollection->add(new IsCancelledPlugin(), 'Computop/IsCancelled');
            $conditionCollection->add(new IsCapturedPlugin(), 'Computop/IsCaptured');
            $conditionCollection->add(new IsInitializedPlugin(), 'Computop/IsInitialized');
            $conditionCollection->add(new IsRefundedPlugin(), 'Computop/IsRefunded');

            return $conditionCollection;
        });

        return $container;
    }
}
```
</details>

### Data import

To display the payment methods on the Storefront, import them for each store:

**data/import/common/common/payment_method.csv**

```yaml
payment_method_key,payment_method_name,payment_provider_key,payment_provider_name,is_active
computopCreditCard,Computop Credit Card,Computop,Computop,1
computopDirectDebit,Computop Direct Debit,Computop,Computop,1
computopEasyCredit,Computop Easycredit,Computop,Computop,1
computopIdeal,Computop Ideal,Computop,Computop,1
computopPaydirect,Computop Paydirect,Computop,Computop,1
computopPayNow,Computop PayNow,Computop,Computop,1
computopPayPal,Computop PayPal,Computop,Computop,1
computopSofort,Computop Sofort,Computop,Computop,1
```
  

**data/import/common/DE/payment_method_store.csv**
```yaml
payment_method_key,store
computopCreditCard,DE
computopDirectDebit,DE
computopEasyCredit,DE
computopIdeal,DE
computopPaydirect,DE
computopPayNow,DE
computopPayPal,DE
computopSofort,DE
```
### Router configuration

To configure router, add `ComputopRouterProviderPlugin` to `RouterDependencyProvider`:


**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerEco\Yves\Computop\Plugin\Router\ComputopRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        return [
            ...
            new ComputopRouteProviderPlugin(),
        ];
    }
}
```

### Checkout configuration

To configure checkout:

1. Add Checkout plugins to `CheckoutDependencyProvider`:


<details open>
    <summary>src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php</summary>
   
```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\Kernel\Container;
use SprykerEco\Zed\Computop\Communication\Plugin\Checkout\ComputopPostCheckPlugin;
use SprykerEco\Zed\Computop\Communication\Plugin\Checkout\ComputopSaveOrderPlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutSaveOrderInterface[]
     */
    protected function getCheckoutOrderSavers(Container $container): Container
    {
        /** @var \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutSaveOrderInterface[] $plugins */
        $plugins = [
            ...

            new ComputopSaveOrderPlugin(),
        ];

        return $plugins;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPostSaveHookInterface[]
     */
    protected function getCheckoutPostHooks(Container $container): Container
    {
        return [
    		...        
	
            new ComputopPostCheckPlugin(),
        ];
    }
}
```

</details>

2. Add the subforms of the desired payment methods to `CheckoutPageDependencyProvider`:

<details open>
    <summary>src/Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php</summary>
    
```php
<?php

namespace Pyz\Yves\CheckoutPage;

use Spryker\Yves\Kernel\Container;
use Spryker\Yves\StepEngine\Dependency\Plugin\Form\SubFormPluginCollection;
use Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginCollection;
use SprykerEco\Shared\Computop\ComputopConfig;
use SprykerEco\Yves\Computop\Plugin\ComputopPaymentHandlerPlugin;
use SprykerEco\Yves\Computop\Plugin\CreditCardSubFormPlugin;
use SprykerEco\Yves\Computop\Plugin\DirectDebitSubFormPlugin;
use SprykerEco\Yves\Computop\Plugin\EasyCreditSubFormPlugin;
use SprykerEco\Yves\Computop\Plugin\IdealSubFormPlugin;
use SprykerEco\Yves\Computop\Plugin\PaydirektSubFormPlugin;
use SprykerEco\Yves\Computop\Plugin\PayNowSubFormPlugin;
use SprykerEco\Yves\Computop\Plugin\PayPalSubFormPlugin;
use SprykerEco\Yves\Computop\Plugin\SofortSubFormPlugin;
use SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerShopCheckoutPageDependencyProvider;

class CheckoutPageDependencyProvider extends SprykerShopCheckoutPageDependencyProvider
{
    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    public function provideDependencies(Container $container): Container
    {
        $container = parent::provideDependencies($container);
        $container = $this->extendPaymentMethodHandler($container);
        $container = $this->extendSubFormPluginCollection($container);

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function extendPaymentMethodHandler(Container $container): Container
    {
        $container->extend(static::PAYMENT_METHOD_HANDLER, function (StepHandlerPluginCollection $paymentMethodHandler) {
            ...

            // --- Computop
            $paymentMethodHandler->add(new ComputopPaymentHandlerPlugin(), ComputopConfig::PAYMENT_METHOD_CREDIT_CARD);
            $paymentMethodHandler->add(new ComputopPaymentHandlerPlugin(), ComputopConfig::PAYMENT_METHOD_DIRECT_DEBIT);
            $paymentMethodHandler->add(new ComputopPaymentHandlerPlugin(), ComputopConfig::PAYMENT_METHOD_EASY_CREDIT);
            $paymentMethodHandler->add(new ComputopPaymentHandlerPlugin(), ComputopConfig::PAYMENT_METHOD_IDEAL);
            $paymentMethodHandler->add(new ComputopPaymentHandlerPlugin(), ComputopConfig::PAYMENT_METHOD_PAYDIREKT);
            $paymentMethodHandler->add(new ComputopPaymentHandlerPlugin(), ComputopConfig::PAYMENT_METHOD_PAY_NOW);
            $paymentMethodHandler->add(new ComputopPaymentHandlerPlugin(), ComputopConfig::PAYMENT_METHOD_PAY_PAL);
            $paymentMethodHandler->add(new ComputopPaymentHandlerPlugin(), ComputopConfig::PAYMENT_METHOD_SOFORT);

            return $paymentMethodHandler;
        });

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function extendSubFormPluginCollection(Container $container): Container
    {
        $container->extend(static::PAYMENT_SUB_FORMS, function (SubFormPluginCollection $paymentSubFormPluginCollection) {
            ...

            // --- Computop
            $paymentSubFormPluginCollection->add(new CreditCardSubFormPlugin());
            $paymentSubFormPluginCollection->add(new DirectDebitSubFormPlugin());
            $paymentSubFormPluginCollection->add(new EasyCreditSubFormPlugin());
            $paymentSubFormPluginCollection->add(new IdealSubFormPlugin());
            $paymentSubFormPluginCollection->add(new PaydirektSubFormPlugin());
            $paymentSubFormPluginCollection->add(new PayNowSubFormPlugin());
            $paymentSubFormPluginCollection->add(new PayPalSubFormPlugin());
            $paymentSubFormPluginCollection->add(new SofortSubFormPlugin());

            return $paymentSubFormPluginCollection;
        });

        return $container;
    }
}
```

</details>

3. Add form templates of the desired payment methods to `customForms`:

**src/Pyz/Yves/CheckoutPage/Theme/default/views/payment/payment.twig**

```twig
{% raw %}{%{% endraw %} extends template('page-layout-checkout', 'CheckoutPage') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define data = {
    backUrl: _view.previousStepUrl,
    forms: {
        payment: _view.paymentForm
    },
    title: 'checkout.step.payment.title' | trans,
    customForms: {
        'Computop/credit-card': ['credit-card', 'computop'],
        'Computop/direct-debit': ['direct-debit', 'computop'],
        'Computop/easy-credit': ['easy-credit', 'computop'],
        'Computop/ideal': ['ideal', 'computop'],
        'Computop/paydirekt': ['paydirekt', 'computop'],
        'Computop/paynow': ['paynow', 'computop'],
        'Computop/paypal': ['paypal', 'computop'],
        'Computop/sofort': ['sofort', 'computop'],
    }
} {% raw %}%}{% endraw %}
```

#### CheckoutStepEngine configuration

Payment methods like CreditCard, PayNow, EasyCredit require adjustments in the `CheckoutStepEngine` flow. To adjust the flow:

1. To create Computop specific steps and replace placeOrder and Summary steps with the project-level ones, adjust `StepFactory`:

<details open>
    <summary>src/Pyz/Yves/CheckoutPage/Process/StepFactory.php</summary>
    
```php
<?php

namespace Pyz\Yves\CheckoutPage\Process;

use Pyz\Yves\CheckoutPage\Plugin\Router\CheckoutPageRouteProviderPlugin;
use Pyz\Yves\CheckoutPage\Process\Steps\PlaceOrderStep;
use Pyz\Yves\CheckoutPage\Process\Steps\SummaryStep;
use Spryker\Yves\StepEngine\Dependency\Step\StepInterface;
use SprykerEco\Yves\Computop\CheckoutPage\Process\Steps\ComputopCreditCardInitStep;
use SprykerEco\Yves\Computop\CheckoutPage\Process\Steps\ComputopEasyCreditInitStep;
use SprykerEco\Yves\Computop\CheckoutPage\Process\Steps\ComputopPayNowInitStep;
use SprykerShop\Yves\CheckoutPage\Process\StepFactory as SprykerStepFactory;

/**
 * @method \SprykerShop\Yves\CheckoutPage\CheckoutPageConfig getConfig()
 */
class StepFactory extends SprykerStepFactory
{
    /**
     * @uses \SprykerShop\Yves\HomePage\Plugin\Router\HomePageRouteProviderPlugin::ROUTE_NAME_HOME
     */
    protected const ROUTE_NAME_HOME = 'home';

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
            $this->createComputopEasyCreditInitStep(),
            $this->createSummaryStep(),
            $this->createPlaceOrderStep(),
            $this->createComputopCreditCardInitStep(),
            $this->createComputopPayNowInitStep(),
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
            $this->getStore()->getCurrentLocale(),
            $this->getGlossaryStorageClient(),
            CheckoutPageRouteProviderPlugin::ROUTE_NAME_CHECKOUT_PLACE_ORDER,
            $this->getConfig()->getEscapeRoute(),
            [
                static::ERROR_CODE_GENERAL_FAILURE => static::ROUTE_CART,
                'payment failed' => CheckoutPageRouteProviderPlugin::ROUTE_NAME_CHECKOUT_PAYMENT,
                'shipment failed' => CheckoutPageRouteProviderPlugin::ROUTE_NAME_CHECKOUT_SHIPMENT,
            ]
        );
    }

    /**
     * @return \Spryker\Yves\StepEngine\Dependency\Step\StepInterface
     */
    public function createSummaryStep(): StepInterface
    {
        return new SummaryStep(
            $this->getProductBundleClient(),
            $this->getShipmentService(),
            $this->getConfig(),
            CheckoutPageRouteProviderPlugin::ROUTE_NAME_CHECKOUT_SUMMARY,
            $this->getConfig()->getEscapeRoute(),
            $this->getCheckoutClient()
        );
    }

    /**
     * @return \Spryker\Yves\StepEngine\Dependency\Step\StepInterface
     */
    public function createComputopCreditCardInitStep(): StepInterface
    {
        return new ComputopCreditCardInitStep(
            CheckoutPageRouteProviderPlugin::ROUTE_NAME_CHECKOUT_COMPUTOP_CREDIT_CARD_INIT,
            static::ROUTE_NAME_HOME
        );
    }

    /**
     * @return \Spryker\Yves\StepEngine\Dependency\Step\StepInterface
     */
    public function createComputopPayNowInitStep(): StepInterface
    {
        return new ComputopPayNowInitStep(
            CheckoutPageRouteProviderPlugin::ROUTE_NAME_CHECKOUT_COMPUTOP_PAY_NOW_INIT,
            static::ROUTE_NAME_HOME
        );
    }

    /**
     * @return \Spryker\Yves\StepEngine\Dependency\Step\StepInterface
     */
    public function createComputopEasyCreditInitStep(): StepInterface
    {
        return new ComputopEasyCreditInitStep(
            CheckoutPageRouteProviderPlugin::ROUTE_NAME_CHECKOUT_COMPUTOP_EASY_CREDIT_INIT,
            static::ROUTE_NAME_HOME
        );
    }
}
```

</details>

2. To use the project-level `StepFactory`, adjust `CheckoutPageFactory`:

**src/Pyz/Yves/CheckoutPage/CheckoutPageFactory.php**

```php
<?php

namespace Pyz\Yves\CheckoutPage;

use Pyz\Yves\CheckoutPage\Process\StepFactory;
use SprykerShop\Yves\CheckoutPage\CheckoutPageFactory as SprykerShopCheckoutPageFactory;

/**
 * @method \SprykerShop\Yves\CheckoutPage\CheckoutPageConfig getConfig()
 */
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

3. Adjust `CheckoutController` with the step actions of the desired payment methods:

<details open>
    <summary>src/Pyz/Yves/CheckoutPage/Controller/CheckoutController.php</summary>
    
```php
<?php=

namespace Pyz\Yves\CheckoutPage\Controller;

use SprykerShop\Yves\CheckoutPage\Controller\CheckoutController as SprykerShopCheckoutController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \SprykerShop\Yves\CheckoutPage\CheckoutPageFactory getFactory()
 * @method \Spryker\Client\Checkout\CheckoutClientInterface getClient()
 */
class CheckoutController extends SprykerShopCheckoutController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Spryker\Yves\Kernel\View\View|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function computopCreditCardInitAction(Request $request)
    {
        $quoteValidationResponseTransfer = $this->canProceedCheckout();

        if (!$quoteValidationResponseTransfer->getIsSuccessful()) {
            $this->processErrorMessages($quoteValidationResponseTransfer->getMessages());

            return $this->redirectResponseInternal(static::ROUTE_CART);
        }

        $response = $this->createStepProcess()->process($request);

        if (!is_array($response)) {
            return $response;
        }

        return $this->view(
            $response,
            [],
            '@Computop/views/credit-card-init/credit-card-init.twig'
        );
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function computopEasyCreditInitAction(Request $request)
    {
        return $this->createStepProcess()->process($request);
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Spryker\Yves\Kernel\View\View|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function computopPayNowInitAction(Request $request)
    {
        $quoteValidationResponseTransfer = $this->canProceedCheckout();

        if (!$quoteValidationResponseTransfer->getIsSuccessful()) {
            $this->processErrorMessages($quoteValidationResponseTransfer->getMessages());

            return $this->redirectResponseInternal(static::ROUTE_CART);
        }

        $response = $this->createStepProcess()->process($request);

        if (!is_array($response)) {
            return $response;
        }

        return $this->view(
            $response,
            $this->getFactory()->getCustomerPageWidgetPlugins(),
            '@Computop/views/paynow-init/paynow-init.twig'
        );
    }
}
```

</details>

4. To register additional checkout step routes, adjust `CheckoutPageRouteProviderPlugin`:


<details open>
    <summary>src/Pyz/Yves/CheckoutPage/Plugin/Router/CheckoutPageRouteProviderPlugin.php</summary>

```php
<?php

namespace Pyz\Yves\CheckoutPage\Plugin\Router;

use Spryker\Yves\Router\Route\RouteCollection;
use SprykerShop\Yves\CheckoutPage\Plugin\Router\CheckoutPageRouteProviderPlugin as SprykerShopCheckoutPageRouteProviderPlugin;

class CheckoutPageRouteProviderPlugin extends SprykerShopCheckoutPageRouteProviderPlugin
{
    public const ROUTE_NAME_CHECKOUT_COMPUTOP_CREDIT_CARD_INIT = 'checkout-computop-credit-card-init';
    public const ROUTE_NAME_CHECKOUT_COMPUTOP_EASY_CREDIT_INIT = 'checkout-computop-easy-credit-init';
    public const ROUTE_NAME_CHECKOUT_COMPUTOP_PAY_NOW_INIT = 'checkout-computop-pay-now-init';

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
        $routeCollection = $this->addComputopCreditCardInitRoute($routeCollection);
        $routeCollection = $this->addComputopPayNowInitRoute($routeCollection);
        $routeCollection = $this->addComputopEasyCreditInitRoute($routeCollection);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addComputopCreditCardInitRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute(
            '/checkout/computop-credit-card-init',
            'CheckoutPage',
            'Checkout',
            'computopCreditCardInitAction'
        );
        $route = $route->setMethods(['GET', 'POST']);
        $routeCollection->add(static::ROUTE_NAME_CHECKOUT_COMPUTOP_CREDIT_CARD_INIT, $route);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addComputopPayNowInitRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute(
            '/checkout/computop-pay-now-init',
            'CheckoutPage',
            'Checkout',
            'computopPayNowInitAction'
        );
        $route = $route->setMethods(['GET', 'POST']);
        $routeCollection->add(static::ROUTE_NAME_CHECKOUT_COMPUTOP_PAY_NOW_INIT, $route);

        return $routeCollection;
    }

    /**
     * @param \Spryker\Yves\Router\Route\RouteCollection $routeCollection
     *
     * @return \Spryker\Yves\Router\Route\RouteCollection
     */
    protected function addComputopEasyCreditInitRoute(RouteCollection $routeCollection): RouteCollection
    {
        $route = $this->buildRoute(
            '/checkout/computop-easy-credit-init',
            'CheckoutPage',
            'Checkout',
            'computopEasyCreditInitAction'
        );
        $route = $route->setMethods(['GET', 'POST']);
        $routeCollection->add(static::ROUTE_NAME_CHECKOUT_COMPUTOP_EASY_CREDIT_INIT, $route);

        return $routeCollection;
    }
}
```

</details>

5. Adjust `RouterDependencyProvider` to use `CheckoutPageRouteProviderPlugin` from the project level:

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Pyz\Yves\CheckoutPage\Plugin\Router\CheckoutPageRouteProviderPlugin;
use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        return [
            ...
            new CheckoutPageRouteProviderPlugin(),
        ];
    }
}
```

6. Only for PayNow payment method: To set the Computop payment transfer with necessary data in `QuoteTransfer`, adjust `PlaceOrderStep`:



<details open>
    <summary>src/Pyz/Yves/CheckoutPage/Process/Steps/PlaceOrderStep.php</summary>

```php
<?php

namespace Pyz\Yves\CheckoutPage\Process\Steps;

use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use SprykerEco\Shared\Computop\ComputopConfig;
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
        $quoteTransfer = parent::execute($request, $quoteTransfer);

        if ($quoteTransfer->getPayment()->getPaymentSelection() !== ComputopConfig::PAYMENT_METHOD_PAY_NOW) {
            return $quoteTransfer;
        }

        $computopPaymentTransfer = $quoteTransfer->getPayment()->getComputopPayNow();
        $computopPaymentTransfer
            ->setData($this->checkoutResponseTransfer->getComputopInitPayment()->getData())
            ->setLen($this->checkoutResponseTransfer->getComputopInitPayment()->getLen());
        $quoteTransfer->getPayment()->setComputopPayNow($computopPaymentTransfer);

        return $quoteTransfer;
    }
}
```

</details>

7. Only for EasyCredit payment method: adjust the SummaryStep with EasyCredit installment information by adding the `easy-credit-summary` molecule to `summary.twig`.

<details open>
    <summary>src/Pyz/Yves/CheckoutPage/Process/Steps/SummaryStep.php</summary>

```php
<?php

namespace Pyz\Yves\CheckoutPage\Process\Steps;

use Generated\Shared\Transfer\PaymentTransfer;
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use SprykerShop\Yves\CheckoutPage\Process\Steps\SummaryStep as SprykerShopSummaryStep;

class SummaryStep extends SprykerShopSummaryStep
{
    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return array
     */
    public function getTemplateVariables(AbstractTransfer $quoteTransfer)
    {
        $shipmentGroups = $this->shipmentService->groupItemsByShipment($quoteTransfer->getItems());
        $isPlaceableOrderResponseTransfer = $this->checkoutClient->isPlaceableOrder($quoteTransfer);

        return [
            'quoteTransfer' => $quoteTransfer,
            'cartItems' => $this->productBundleClient->getGroupedBundleItems(
                $quoteTransfer->getItems(),
                $quoteTransfer->getBundleItems()
            ),
            'shipmentGroups' => $this->expandShipmentGroupsWithCartItems($shipmentGroups, $quoteTransfer),
            'totalCosts' => $this->getShipmentTotalCosts($shipmentGroups, $quoteTransfer),
            'isPlaceableOrder' => $isPlaceableOrderResponseTransfer->getIsSuccess(),
            'isPlaceableOrderErrors' => $isPlaceableOrderResponseTransfer->getErrors(),
            'shipmentExpenses' => $this->getShipmentExpenses($quoteTransfer),
            'acceptTermsFieldName' => QuoteTransfer::ACCEPT_TERMS_AND_CONDITIONS,
            'additionalData' => $this->getAdditionalData($quoteTransfer),
        ];
    }

    /**
     * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
     *
     * @return array
     */
    protected function getAdditionalData(QuoteTransfer $quoteTransfer): array
    {
        if ($quoteTransfer->getPayment()->getPaymentSelection() !== PaymentTransfer::COMPUTOP_EASY_CREDIT) {
            return [];
        }

        $easyCreditStatusResponse = $quoteTransfer->getPayment()
            ->getComputopEasyCredit()
            ->getEasyCreditStatusResponse();

        $financing = $easyCreditStatusResponse->getFinancingData();
        $process = $easyCreditStatusResponse->getProcessData();

        return [
            'installmentPlanMoney' => [
                'Kaufbetrag' => (int)round($financing['finanzierung']['bestellwert'] * 100),
                '+ Zinsen' => (int)round($financing['ratenplan']['zinsen']['anfallendeZinsen'] * 100),
                '= Gesamtbetrag' => (int)round($financing['ratenplan']['gesamtsumme'] * 100),
                'Ihre monatliche Rate' => (int)round($financing['ratenplan']['zahlungsplan']['betragRate'] * 100),
                'letzte Rate' => (int)round($financing['ratenplan']['zahlungsplan']['betragLetzteRate'] * 100),
            ],
            'installmentPlanTax' => [
                'Sollzinssatz p.a. fest für die gesamte Laufzeit' => $financing['ratenplan']['zinsen']['nominalzins'],
                'effektiver Jahreszins' => $financing['ratenplan']['zinsen']['effektivzins'],
            ],
            'installmentText' => $financing['tilgungsplanText'],
            'installmentLink' => $process['allgemeineVorgangsdaten']['urlVorvertraglicheInformationen'],
        ];
    }
}
```

</details>
  

### CRIF configuration  

To configure [CRIF](https://documentation.spryker.com/docs/computop-crif):

1\. Adjust `PaymentDependencyProvider` to use `ComputopPaymentMethodFilterPlugin`:  

**\Pyz\Zed\Payment\PaymentDependencyProvider**

```php
<?php

namespace Pyz\Zed\Payment;

use Spryker\Zed\Payment\PaymentDependencyProvider as SprykerPaymentDependencyProvider;
use SprykerEco\Zed\Computop\Communication\Plugin\ComputopPaymentMethodFilterPlugin;

class PaymentDependencyProvider extends SprykerPaymentDependencyProvider
{
    /**
     * @return \Spryker\Zed\Payment\Dependency\Plugin\Payment\PaymentMethodFilterPluginInterface[]
     */
    protected function getPaymentMethodFilterPlugins(): array
    {
        return [
            ...
            new ComputopPaymentMethodFilterPlugin(),
        ];
    }
}
```

2. Adjust `ShipmentStep` to perform the API call of CRIF risk check:

<details open>
    <summary>\Pyz\Yves\CheckoutPage\Process\Steps\ShipmentStep</summary>

```php
<?php

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
     * @param \SprykerShop\Yves\CheckoutPage\Process\Steps\PostConditionCheckerInterface $postConditionChecker
     * @param \SprykerShop\Yves\CheckoutPage\GiftCard\GiftCardItemsCheckerInterface $giftCardItemsChecker
     * @param string $stepRoute
     * @param string|null $escapeRoute
     * @param \SprykerShop\Yves\CheckoutPageExtension\Dependency\Plugin\CheckoutShipmentStepEnterPreCheckPluginInterface[] $checkoutShipmentStepEnterPreCheckPlugins
	 * @param \SprykerEco\Client\Computop\ComputopClientInterface $computopClient
     */
    public function __construct(
        CheckoutPageToCalculationClientInterface $calculationClient,
        StepHandlerPluginCollection $shipmentPlugins,
        PostConditionCheckerInterface $postConditionChecker,
        GiftCardItemsCheckerInterface $giftCardItemsChecker,
        $stepRoute,
        $escapeRoute,
        array $checkoutShipmentStepEnterPreCheckPlugins,
		ComputopClientInterface $computopClient
    ) {
        parent::__construct(
			$calculationClient, 
			$shipmentPlugins, 
			$postConditionChecker, 
			$giftCardItemsChecker, 
			$stepRoute, 
			$escapeRoute, 
			$checkoutShipmentStepEnterPreCheckPlugins
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

</details>

3. To use the project-level `ShipmentStep`, adjust `StepFactory`:

<details open>
    <summary>src/Pyz/Yves/CheckoutPage/Process/StepFactory.php</summary>

```php
<?php

namespace Pyz\Yves\CheckoutPage\Process;

use Pyz\Yves\CheckoutPage\Plugin\Router\CheckoutPageRouteProviderPlugin;
use Pyz\Yves\CheckoutPage\Process\Steps\ShipmentStep;
use Spryker\Yves\StepEngine\Dependency\Step\StepInterface;
use SprykerEco\Client\Computop\ComputopClientInterface;
use SprykerShop\Yves\CheckoutPage\Process\StepFactory as SprykerStepFactory;

/**
 * @method \SprykerShop\Yves\CheckoutPage\CheckoutPageConfig getConfig()
 */
class StepFactory extends SprykerStepFactory
{
    /**
     * @return \SprykerShop\Yves\CheckoutPage\Process\Steps\ShipmentStep
     */
    public function createShipmentStep(): StepInterface
    {
        return new ShipmentStep(
            $this->getCalculationClient(),
            $this->getShipmentPlugins(),
            $this->createShipmentStepPostConditionChecker(),
            $this->createGiftCardItemsChecker(),
            CheckoutPageRouteProviderPlugin::ROUTE_NAME_CHECKOUT_SHIPMENT,
            $this->getConfig()->getEscapeRoute(),
            $this->getCheckoutShipmentStepEnterPreCheckPlugins()
			$this->getComputopClient()
        );
    }

	/**
     * @return \SprykerEco\Client\Computop\ComputopClientInterface
     */
    public function getPaymentMethodHandler(): ComputopClientInterface
    {
        return $this->getProvidedDependency(CheckoutPageDependencyProvider::CLIENT_COMPUTOP);
    }
}
```

</details>

4. To add `ComputopClient` to dependencies, adjust `CheckoutPageDependencyProvider`:

<details open>
    <summary>src/Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Yves\CheckoutPage;

use Spryker\Yves\Kernel\Container;
use SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerShopCheckoutPageDependencyProvider;

class CheckoutPageDependencyProvider extends SprykerShopCheckoutPageDependencyProvider
{
    public const CLIENT_COMPUTOP = 'CLIENT_COMPUTOP';

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    public function provideDependencies(Container $container): Container
    {
        $container = parent::provideDependencies($container);
        $container = $this->addComputopClient($container);

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addComputopClient(Container $container): Container
    {
        $container->set(static::CLIENT_COMPUTOP, function (Container $container) {
            return $container->getLocator()->computop()->client();
        });

        return $container;
    }
}
```
</details>

## Integration into a project
To integrate the computop module, make sure you [installed](http://#installation) and [configured](http://#configuration) it.

## Test mode

Computop provides a test mode to test payment methods without making real transactions.

To enable the test mode, in `\SprykerEco\Service\ComputopApi\Mapper\ComputopApiMapper::getDescriptionValue()`, add `Test:0000` to the beginning of the transaction description. 

You can find Computop test cards at [Test Cards EN](https://developer.computop.com/display/public/DOCCT/Test+Cards+EN).

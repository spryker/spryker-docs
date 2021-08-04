---
title: Adyen - Integration into a project
originalLink: https://documentation.spryker.com/v6/docs/adyen-integration
redirect_from:
  - /v6/docs/adyen-integration
  - /v6/docs/en/adyen-integration
---

{% info_block errorBox %}

There is currently an issue when using giftcards with Adyen. Our team is developing a fix for it.

{% endinfo_block %}

## Integration into a Project

Add sub form plugins and payment method handlers:

**\Pyz\Yves\CheckoutPage\CheckoutPageDependencyProvider:**
    
```php
<?php
 
/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */
 
namespace Pyz\Yves\CheckoutPage;
 
...
use Spryker\Yves\StepEngine\Dependency\Plugin\Form\SubFormPluginCollection;
use SprykerEco\Shared\Adyen\AdyenConfig;
use SprykerEco\Yves\Adyen\Plugin\AdyenPaymentHandlerPlugin;
use SprykerEco\Yves\Adyen\Plugin\StepEngine\AdyenCreditCardSubFormPlugin;
use SprykerEco\Yves\Adyen\Plugin\StepEngine\AdyenDirectDebitSubFormPlugin;
use SprykerEco\Yves\Adyen\Plugin\StepEngine\AdyenIdealSubFormPlugin;
use SprykerEco\Yves\Adyen\Plugin\StepEngine\AdyenKlarnaInvoiceSubFormPlugin;
use SprykerEco\Yves\Adyen\Plugin\StepEngine\AdyenSofortSubFormPlugin;
use SprykerEco\Yves\Adyen\Plugin\StepEngine\AdyenPrepaymentSubFormPlugin;
use SprykerEco\Yves\Adyen\Plugin\StepEngine\AdyenPayPalSubFormPlugin;
use SprykerEco\Yves\Adyen\Plugin\StepEngine\AdyenAliPaySubFormPlugin;
use SprykerEco\Yves\Adyen\Plugin\StepEngine\AdyenWeChatPaySubFormPlugin;
...
 
class CheckoutPageDependencyProvider extends SprykerShopCheckoutPageDependencyProvider
{
    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    public function provideDependencies(Container $container)
    {
        $container = parent::provideDependencies($container);
        $container = $this->extendPaymentMethodHandler($container);
        $container = $this->extendSubFormPluginCollection($container);
 
        return $container;
    }
 
    ...
 
    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function extendPaymentMethodHandler(Container $container): Container
    {
        $container->extend(static::PAYMENT_METHOD_HANDLER, function (StepHandlerPluginCollection $paymentMethodHandlerCollection) {
            $paymentMethodHandlerCollection->add(new AdyenPaymentHandlerPlugin(), AdyenConfig::ADYEN_CREDIT_CARD);
            $paymentMethodHandlerCollection->add(new AdyenPaymentHandlerPlugin(), AdyenConfig::ADYEN_SOFORT);
            $paymentMethodHandlerCollection->add(new AdyenPaymentHandlerPlugin(), AdyenConfig::ADYEN_DIRECT_DEBIT);
            $paymentMethodHandlerCollection->add(new AdyenPaymentHandlerPlugin(), AdyenConfig::ADYEN_KLARNA_INVOICE);
            $paymentMethodHandlerCollection->add(new AdyenPaymentHandlerPlugin(), AdyenConfig::ADYEN_PREPAYMENT);
            $paymentMethodHandlerCollection->add(new AdyenPaymentHandlerPlugin(), AdyenConfig::ADYEN_IDEAL);
            $paymentMethodHandlerCollection->add(new AdyenPaymentHandlerPlugin(), AdyenConfig::ADYEN_PAY_PAL);
            $paymentMethodHandlerCollection->add(new AdyenPaymentHandlerPlugin(), AdyenConfig::ADYEN_ALI_PAY);
            $paymentMethodHandlerCollection->add(new AdyenPaymentHandlerPlugin(), AdyenConfig::ADYEN_WE_CHAT_PAY);
 
            return $paymentMethodHandlerCollection;
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
        $container->extend(static::PAYMENT_SUB_FORMS, function (SubFormPluginCollection $subFormPluginCollection) {
            $subFormPluginCollection->add(new AdyenCreditCardSubFormPlugin());
            $subFormPluginCollection->add(new AdyenSofortSubFormPlugin());
            $subFormPluginCollection->add(new AdyenDirectDebitSubFormPlugin());
            $subFormPluginCollection->add(new AdyenKlarnaInvoiceSubFormPlugin());
            $subFormPluginCollection->add(new AdyenPrepaymentSubFormPlugin());
            $subFormPluginCollection->add(new AdyenIdealSubFormPlugin());
            $subFormPluginCollection->add(new AdyenPayPalSubFormPlugin());
            $subFormPluginCollection->add(new AdyenAliPaySubFormPlugin());
            $subFormPluginCollection->add(new AdyenWeChatPaySubFormPlugin());
 
            return $subFormPluginCollection;
        });
 
        return $container;
    }
}
```

Add route provider plugin: 

**\Pyz\Yves\Router\RouterDependencyProvider:**

```php
<?php
 
namespace Pyz\Yves\ShopApplication;
 
use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerEco\Yves\Adyen\Plugin\Router\AdyenRouteProviderPlugin;
 
class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        return [
            new AdyenRouteProviderPlugin(),
        ];
    }
}
 ```
 
 Add checkout plugins:
 
**\Pyz\Zed\Checkout\CheckoutDependencyProvider**
    
 ```php
    <?php
 
/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */
 
namespace Pyz\Zed\Checkout;
 
...
use SprykerEco\Zed\Adyen\Communication\Plugin\Checkout\AdyenDoSaveOrderPlugin;
use SprykerEco\Zed\Adyen\Communication\Plugin\Checkout\AdyenPostSaveHookPlugin;
 
class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    ...
 
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutSaveOrderInterface[]
     */
    protected function getCheckoutOrderSavers(Container $container)
    {
        /** @var \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutSaveOrderInterface[] $plugins */
        $plugins = [
            ...
            new AdyenDoSaveOrderPlugin(),
        ];
 
        return $plugins;
    }
 
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutPostSaveHookInterface[]
     */
    protected function getCheckoutPostHooks(Container $container)
    {
        return [
            ...
            new AdyenPostSaveHookPlugin(),
        ];
    }
}

```

Add OMS commands and conditions:

**\Pyz\Zed\Oms\OmsDependencyProvider**

```php
<?php
 
/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */
 
namespace Pyz\Zed\Oms;
 
...
use SprykerEco\Zed\Adyen\Communication\Plugin\Oms\Command\AuthorizePlugin;
use SprykerEco\Zed\Adyen\Communication\Plugin\Oms\Command\CancelPlugin;
use SprykerEco\Zed\Adyen\Communication\Plugin\Oms\Command\CancelOrRefundPlugin;
use SprykerEco\Zed\Adyen\Communication\Plugin\Oms\Command\CapturePlugin;
use SprykerEco\Zed\Adyen\Communication\Plugin\Oms\Command\RefundPlugin;
use SprykerEco\Zed\Adyen\Communication\Plugin\Oms\Condition\IsAuthorizedPlugin;
use SprykerEco\Zed\Adyen\Communication\Plugin\Oms\Condition\IsAuthorizedAndCapturedPlugin;
use SprykerEco\Zed\Adyen\Communication\Plugin\Oms\Condition\IsCanceledPlugin;
use SprykerEco\Zed\Adyen\Communication\Plugin\Oms\Condition\IsCancellationFailedPlugin;
use SprykerEco\Zed\Adyen\Communication\Plugin\Oms\Condition\IsCancellationReceivedPlugin;
use SprykerEco\Zed\Adyen\Communication\Plugin\Oms\Condition\IsCapturedPlugin;
use SprykerEco\Zed\Adyen\Communication\Plugin\Oms\Condition\IsCaptureFailedPlugin;
use SprykerEco\Zed\Adyen\Communication\Plugin\Oms\Condition\IsCaptureReceivedPlugin;
use SprykerEco\Zed\Adyen\Communication\Plugin\Oms\Condition\IsRefundedPlugin;
use SprykerEco\Zed\Adyen\Communication\Plugin\Oms\Condition\IsRefundFailedPlugin;
use SprykerEco\Zed\Adyen\Communication\Plugin\Oms\Condition\IsRefundReceivedPlugin;
 
class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
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
    protected function extendCommandPlugins(Container $container)
    {
        $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
            ...
            $commandCollection->add(new AuthorizePlugin(), 'Adyen/Authorize');
            $commandCollection->add(new CancelPlugin(), 'Adyen/Cancel');
            $commandCollection->add(new CapturePlugin(), 'Adyen/Capture');
            $commandCollection->add(new RefundPlugin(), 'Adyen/Refund');
            $commandCollection->add(new CancelOrRefundPlugin(), 'Adyen/CancelOrRefund');
 
            return $commandCollection;
        });
 
        return $container;
    }
 
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendConditionPlugins(Container $container)
    {
        $container->extend(OmsDependencyProvider::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {
            ...
            $conditionCollection->add(new IsAuthorizedPlugin(), 'Adyen/IsAuthorized');
            $conditionCollection->add(new IsCanceledPlugin(), 'Adyen/IsCanceled');
            $conditionCollection->add(new IsCancellationReceivedPlugin(), 'Adyen/IsCancellationReceived');
            $conditionCollection->add(new IsCancellationFailedPlugin(), 'Adyen/IsCancellationFailed');
            $conditionCollection->add(new IsCapturedPlugin(), 'Adyen/IsCaptured');
            $conditionCollection->add(new IsCaptureReceivedPlugin(), 'Adyen/IsCaptureReceived');
            $conditionCollection->add(new IsCaptureFailedPlugin(), 'Adyen/IsCaptureFailed');
            $conditionCollection->add(new IsRefundedPlugin(), 'Adyen/IsRefunded');
            $conditionCollection->add(new IsRefundReceivedPlugin(), 'Adyen/IsRefundReceived');
            $conditionCollection->add(new IsRefundFailedPlugin(), 'Adyen/IsRefundFailed');
            $conditionCollection->add(new IsAuthorizationFailedPlugin(), 'Adyen/IsAuthorizationFailed');
 
            return $conditionCollection;
        });
 
        return $container;
    }
}
```

### Frontend Integration

To make Adyen module work properly, update `payment.twig` file and add payment method forms into `customForms`:

**src/Pyz/Yves/CheckoutPage/Theme/default/views/payment/payment.twig:**

 ```twig
...
 
{% raw %}{%{% endraw %} define data = {
    backUrl: _view.previousStepUrl,
    forms: {
        payment: _view.paymentForm
    },
    title: 'checkout.step.payment.title' | trans,
    customForms: {
        'Adyen/alipay': ['alipay', 'adyen'],
        'Adyen/credit-card': ['credit-card', 'adyen'],
        'Adyen/direct-debit': ['direct-debit', 'adyen'],
        'Adyen/ideal': ['ideal', 'adyen'],
        'Adyen/klarna-invoice': ['klarna-invoice', 'adyen'],
        'Adyen/paypal': ['paypal', 'adyen'],
        'Adyen/prepayment': ['prepayment', 'adyen'],
        'Adyen/sofort': ['sofort', 'adyen'],
        'Adyen/wechatpay': ['wechatpay', 'adyen'],
    }
} {% raw %}%}{% endraw %}
 
...

{% raw %}{%{% endraw %} embed molecule('form') with {
    ...
    data: {
       ... 
       submit: {
           ...
           class: '... js-payment-form__submit',
       },
    }
...
```


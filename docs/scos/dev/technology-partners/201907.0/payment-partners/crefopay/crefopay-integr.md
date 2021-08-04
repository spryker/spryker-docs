---
title: CrefoPay - Integration
originalLink: https://documentation.spryker.com/v3/docs/crefopay-integration
redirect_from:
  - /v3/docs/crefopay-integration
  - /v3/docs/en/crefopay-integration
---

This article provides step-by-step instructions on integrating the CrefoPay system into your project.

## Prerequisites
Prior to integrating CrefoPay into your project, make sure you [installed and configured the CrefoPay module](/docs/scos/dev/technology-partners/202001.0/payment-partners/crefopay/crefopay-config).

## Integrating CrefoPay into Your Project
To integrate CrefoPay, do the following:

1. Add shipment step plugin, payment subform plugins and payment method handlers:

<details open>
    <summary>\Pyz\Yves\CheckoutPage\CheckoutPageDependencyProvider</summary>

```PHP
<?php

namespace Pyz\Yves\CheckoutPage;

use Spryker\Shared\Nopayment\NopaymentConfig;
use Spryker\Yves\Kernel\Container;
use Spryker\Yves\Kernel\Plugin\Pimple;
use Spryker\Yves\Nopayment\Plugin\NopaymentHandlerPlugin;
use Spryker\Yves\Payment\Plugin\PaymentFormFilterPlugin;
use Spryker\Yves\StepEngine\Dependency\Plugin\Form\SubFormPluginCollection;
use Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginCollection;
use SprykerEco\Shared\CrefoPay\CrefoPayConfig;
use SprykerEco\Yves\CrefoPay\Plugin\StepEngine\CrefoPayPaymentExpanderPlugin;
use SprykerEco\Yves\CrefoPay\Plugin\StepEngine\CrefoPayQuoteExpanderPlugin;
use SprykerEco\Yves\CrefoPay\Plugin\StepEngine\SubForm\CrefoPayBillSubFormPlugin;
use SprykerEco\Yves\CrefoPay\Plugin\StepEngine\SubForm\CrefoPayCashOnDeliverySubFormPlugin;
use SprykerEco\Yves\CrefoPay\Plugin\StepEngine\SubForm\CrefoPayCreditCard3DSubFormPlugin;
use SprykerEco\Yves\CrefoPay\Plugin\StepEngine\SubForm\CrefoPayCreditCardSubFormPlugin;
use SprykerEco\Yves\CrefoPay\Plugin\StepEngine\SubForm\CrefoPayDirectDebitSubFormPlugin;
use SprykerEco\Yves\CrefoPay\Plugin\StepEngine\SubForm\CrefoPayPayPalSubFormPlugin;
use SprykerEco\Yves\CrefoPay\Plugin\StepEngine\SubForm\CrefoPayPrepaidSubFormPlugin;
use SprykerEco\Yves\CrefoPay\Plugin\StepEngine\SubForm\CrefoPaySofortSubFormPlugin;
use SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerShopCheckoutPageDependencyProvider;
use SprykerShop\Yves\CustomerPage\Form\CheckoutAddressCollectionForm;
use SprykerShop\Yves\CustomerPage\Form\CustomerCheckoutForm;
use SprykerShop\Yves\CustomerPage\Form\DataProvider\CheckoutAddressFormDataProvider;
use SprykerShop\Yves\CustomerPage\Form\GuestForm;
use SprykerShop\Yves\CustomerPage\Form\LoginForm;
use SprykerShop\Yves\CustomerPage\Form\RegisterForm;
use SprykerShop\Yves\SalesOrderThresholdWidget\Plugin\CheckoutPage\SalesOrderThresholdWidgetPlugin;

class CheckoutPageDependencyProvider extends SprykerShopCheckoutPageDependencyProvider
{
    public const PLUGIN_CREFO_PAY_SHIPMENT_STEP = 'PLUGIN_CREFO_PAY_SHIPMENT_STEP';

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    public function provideDependencies(Container $container)
    {
        $container = parent::provideDependencies($container);
        $container = $this->extendShipmentHandlerPluginCollection($container);
        $container = $this->extendSubFormPluginCollection($container);
        $container = $this->extendPaymentMethodHandler($container);

        return $container;
    }

...

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function extendShipmentHandlerPluginCollection(Container $container): Container
    {
        $container->extend(static::PLUGIN_SHIPMENT_HANDLER, function (StepHandlerPluginCollection $shipmentHandlerPlugins) {
            $shipmentHandlerPlugins->add(new CrefoPayQuoteExpanderPlugin(), static::PLUGIN_CREFO_PAY_SHIPMENT_STEP);

            return $shipmentHandlerPlugins;
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
            $paymentSubFormPluginCollection->add(new CrefoPayBillSubFormPlugin());
            $paymentSubFormPluginCollection->add(new CrefoPayCashOnDeliverySubFormPlugin());
            $paymentSubFormPluginCollection->add(new CrefoPayDirectDebitSubFormPlugin());
            $paymentSubFormPluginCollection->add(new CrefoPayPayPalSubFormPlugin());
            $paymentSubFormPluginCollection->add(new CrefoPayPrepaidSubFormPlugin());
            $paymentSubFormPluginCollection->add(new CrefoPaySofortSubFormPlugin());
            $paymentSubFormPluginCollection->add(new CrefoPayCreditCardSubFormPlugin());
            $paymentSubFormPluginCollection->add(new CrefoPayCreditCard3DSubFormPlugin());

            return $paymentSubFormPluginCollection;
        });

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function extendPaymentMethodHandler(Container $container): Container
    {
        $container->extend(static::PAYMENT_METHOD_HANDLER, function (StepHandlerPluginCollection $paymentMethodHandlerCollection) {
            $paymentMethodHandlerCollection->add(new NopaymentHandlerPlugin(), NopaymentConfig::PAYMENT_PROVIDER_NAME);
            $paymentMethodHandlerCollection->add(new CrefoPayPaymentExpanderPlugin(), CrefoPayConfig::CREFO_PAY_PAYMENT_METHOD_BILL);
            $paymentMethodHandlerCollection->add(new CrefoPayPaymentExpanderPlugin(), CrefoPayConfig::CREFO_PAY_PAYMENT_METHOD_CASH_ON_DELIVERY);
            $paymentMethodHandlerCollection->add(new CrefoPayPaymentExpanderPlugin(), CrefoPayConfig::CREFO_PAY_PAYMENT_METHOD_DIRECT_DEBIT);
            $paymentMethodHandlerCollection->add(new CrefoPayPaymentExpanderPlugin(), CrefoPayConfig::CREFO_PAY_PAYMENT_METHOD_PAY_PAL);
            $paymentMethodHandlerCollection->add(new CrefoPayPaymentExpanderPlugin(), CrefoPayConfig::CREFO_PAY_PAYMENT_METHOD_PREPAID);
            $paymentMethodHandlerCollection->add(new CrefoPayPaymentExpanderPlugin(), CrefoPayConfig::CREFO_PAY_PAYMENT_METHOD_SOFORT);
            $paymentMethodHandlerCollection->add(new CrefoPayPaymentExpanderPlugin(), CrefoPayConfig::CREFO_PAY_PAYMENT_METHOD_CREDIT_CARD);
            $paymentMethodHandlerCollection->add(new CrefoPayPaymentExpanderPlugin(), CrefoPayConfig::CREFO_PAY_PAYMENT_METHOD_CREDIT_CARD_3D);

            return $paymentMethodHandlerCollection;
        });

        return $container;
    }
}
```
<br>
</details>

2. Extend `ShipmentStep` to add payment methods filtering logic:

<details open>
<summary>\Pyz\Yves\CheckoutPage\Process\Steps\ShipmentStep</summary>

```PHP
<?php

namespace Pyz\Yves\CheckoutPage\Process\Steps;

use Generated\Shared\Transfer\CrefoPayApiCompanyTransfer;
use Pyz\Yves\CheckoutPage\CheckoutPageDependencyProvider;
use Spryker\Shared\Kernel\Transfer\AbstractTransfer;
use SprykerShop\Yves\CheckoutPage\Process\Steps\ShipmentStep as SprykerShopShipmentStep;
use Symfony\Component\HttpFoundation\Request;

class ShipmentStep extends SprykerShopShipmentStep
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
        $crefoPayPlugin = $this->shipmentPlugins->get(CheckoutPageDependencyProvider::PLUGIN_CREFO_PAY_SHIPMENT_STEP);

        return $crefoPayPlugin->addToDataClass($request, $quoteTransfer);
    }
}
```
<br>
</details>

3. Extend `StepFactory` for the project-level `ShipmentStep` usage:

<details open>
<summary>\Pyz\Yves\CheckoutPage\Process\StepFactory</summary>

```PHP
<?php

namespace Pyz\Yves\CheckoutPage\Process;

use Pyz\Yves\CheckoutPage\Process\Steps\ShipmentStep;
use Spryker\Yves\StepEngine\Process\StepCollection;
use SprykerShop\Yves\CheckoutPage\Plugin\Provider\CheckoutPageControllerProvider;
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
            ->addStep($this->createSummaryStep())
            ->addStep($this->createPlaceOrderStep())
            ->addStep($this->createSuccessStep());

        return $stepCollection;
    }

    /**
     * @return \SprykerShop\Yves\CheckoutPage\Process\Steps\ShipmentStep
     */
    public function createShipmentStep()
    {
        return new ShipmentStep(
            $this->getCalculationClient(),
            $this->getShipmentPlugins(),
            CheckoutPageControllerProvider::CHECKOUT_SHIPMENT,
            HomePageControllerProvider::ROUTE_HOME
        );
    }
}
```
<br>
</details>

4. Extend `CheckoutPageFactory` for the project-level `StepFactory` usage:

<details open>
<summary>\Pyz\Yves\CheckoutPage\CheckoutPageFactory</summary>

```PHP
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
<br>
</details>

5. Extend checkout page layout to add `jQuery`:

<details open>
<summary>Pyz/Yves/CheckoutPage/Theme/default/templates/page-layout-checkout/page-layout-checkout.twig</summary>

```PHP
{% raw %}{%{% endraw %} extends template('page-layout-main') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define data = {
    breadcrumbs: _view.stepBreadcrumbs.breadcrumbs | default([])
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block headScripts {% raw %}%}{% endraw %}
    {% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js" type="text/javascript"></script>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block sidebar {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block header {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} include organism('header') with {
        data: {
            showSearchForm: false,
            showNavigation: false
        }
    } only {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block breadcrumbs {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} include view('cart-checkout-breadcrumb', 'CheckoutWidget') with {
        data: {
            isCartPage: false,
            checkoutBreadcrumbs: data.breadcrumbs
        }
    } only {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block footer {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```
<br>
</details>

6. Extend payment twig to add CrefoPay payment methods:

<details open>
<summary>Pyz/Yves/CheckoutPage/Theme/default/views/payment/payment.twig</summary>

```PHP
{% raw %}{%{% endraw %} extends template('page-layout-checkout', 'CheckoutPage') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define data = {
    backUrl: _view.previousStepUrl,
    forms: {
        payment: _view.paymentForm
    },
    title: 'checkout.step.payment.title' | trans,
    customForms: {
        'crefoPay/bill': ['bill', 'crefoPay'],
        'crefoPay/cash-on-delivery': ['cash-on-delivery', 'crefoPay'],
        'crefoPay/direct-debit': ['direct-debit', 'crefoPay'],
        'crefoPay/paypal': ['paypal', 'crefoPay'],
        'crefoPay/prepaid': ['prepaid', 'crefoPay'],
        'crefoPay/sofort': ['sofort', 'crefoPay'],
        'crefoPay/credit-card': ['credit-card', 'crefoPay'],
        'crefoPay/credit-card-3d': ['credit-card-3d', 'crefoPay']
    }
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} include molecule('script-loader') with {
        class: 'js-crefopay-payment-form__script-loader',
        attributes: {
            src: 'https://libs.crefopay.de/3.0/secure-fields.js'
        }
    } only {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} include atom('crefopay-checkbox-helper', 'CrefoPay') with {
        attributes: {
            'trigger-selector': '.toggler-radio',
            'payment-container-selector': '.js-crefopay-payment',
            'target-selector': '.radio__input',
            'custom-attribute-name': 'data-crefopay',
            'custom-attribute-value': 'paymentMethod',
            'joint-container-selector': '.form'
        }
    } only {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} embed molecule('form') with {
        class: 'box',
        data: {
            form: data.forms.payment,
            options: {
                attr: {
                    id: 'payment-form'
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
            },
            customForms: data.customForms
        }
    } only {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} block fieldset {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} for name, choices in data.form.paymentSelection.vars.choices {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} set paymentProviderIndex = loop.index0 {% raw %}%}{% endraw %}
                <h5>{% raw %}{{{% endraw %} ('checkout.payment.provider.' ~ name) | trans {% raw %}}}{% endraw %}</h5>
                <ul class="js-crefopay-payment">
                    {% raw %}{%{% endraw %} for key, choice in choices {% raw %}%}{% endraw %}
                        <li class="list__item spacing-y clear">
                            {% raw %}{%{% endraw %} embed molecule('form') with {
                                data: {
                                    form: data.form[data.form.paymentSelection[key].vars.value],
                                    enableStart: false,
                                    enableEnd: false,
                                    customForms: data.customForms
                                },
                                embed: {
                                    index: loop.index ~ '-' ~ paymentProviderIndex,
                                    toggler: data.form.paymentSelection[key]
                                }
                            } only {% raw %}%}{% endraw %}
                                {% raw %}{%{% endraw %} block fieldset {% raw %}%}{% endraw %}
                                    {% raw %}{{{% endraw %} form_row(embed.toggler, {
                                        required: false,
                                        component: molecule('toggler-radio'),
                                        attributes: {
                                            'target-selector': '.js-payment-method-' ~ embed.index,
                                            'class-to-toggle': 'is-hidden'
                                        }
                                    }) {% raw %}}}{% endraw %}
                                    <div class="col col--sm-12 is-hidden js-payment-method-{% raw %}{{{% endraw %}embed.index{% raw %}}}{% endraw %}">
                                        <div class="col col--sm-12 col--md-6">
                                            {% raw %}{%{% endraw %} if data.customForms[data.form.vars.template_path] is not defined {% raw %}%}{% endraw %}
                                                {% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}
                                            {% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
                                                {% raw %}{%{% endraw %} set viewName = data.customForms[data.form.vars.template_path] | first {% raw %}%}{% endraw %}
                                                {% raw %}{%{% endraw %} set moduleName = data.customForms[data.form.vars.template_path] | last {% raw %}%}{% endraw %}
                                                {% raw %}{%{% endraw %} include view(viewName, moduleName) ignore missing with {
                                                    form: data.form.parent
                                                } only {% raw %}%}{% endraw %}
                                            {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
                                        </div>
                                    </div>
                                {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
                            {% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
                        </li>
                    {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
                </ul>
            {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
```
<br>
</details>

7. Add controller provider:
<details open>

<summary>\Pyz\Yves\ShopApplication\YvesBootstrap</summary>

```PHP
<?php

namespace Pyz\Yves\ShopApplication;

use Spryker\Yves\Session\Plugin\ServiceProvider\SessionServiceProvider as SprykerSessionServiceProvider;
use SprykerEco\Yves\CrefoPay\Plugin\Provider\CrefoPayControllerProvider;

class YvesBootstrap extends SprykerYvesBootstrap
{
    /**
     * @param bool|null $isSsl
     *
     * @return \SprykerShop\Yves\ShopApplication\Plugin\Provider\AbstractYvesControllerProvider[]
     */
    protected function getControllerProviderStack($isSsl)
    {
        return [
            ...
            new CrefoPayControllerProvider($isSsl),
        ];
    }
}
```
<br>
</details>

8. Add checkout plugins:

<details open>
<summary>\Pyz\Zed\Checkout\CheckoutDependencyProvider</summary>


```PHP
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use SprykerEco\Zed\CrefoPay\Communication\Plugin\Checkout\CrefoPayDoSaveOrderPlugin;
use SprykerEco\Zed\CrefoPay\Communication\Plugin\Checkout\CrefoPayPostSaveHookPlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
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
            new CrefoPayDoSaveOrderPlugin(),
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
            new CrefoPayPostSaveHookPlugin(),
        ];
    }
}
```
<br>
</details>

9. Add OMS commands and conditions:

<details open>

<summary>\Pyz\Zed\Oms\OmsDependencyProvider</summary>


```PHP
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use SprykerEco\Zed\CrefoPay\Communication\Plugin\Oms\Command\CancelPlugin;
use SprykerEco\Zed\CrefoPay\Communication\Plugin\Oms\Command\CapturePlugin;
use SprykerEco\Zed\CrefoPay\Communication\Plugin\Oms\Command\FinishPlugin;
use SprykerEco\Zed\CrefoPay\Communication\Plugin\Oms\Command\RefundPlugin;
use SprykerEco\Zed\CrefoPay\Communication\Plugin\Oms\Condition\IsAcknowledgePendingReceivedPlugin;
use SprykerEco\Zed\CrefoPay\Communication\Plugin\Oms\Condition\IsCanceledReceivedPlugin;
use SprykerEco\Zed\CrefoPay\Communication\Plugin\Oms\Condition\IsCancelCallSuccessfulPlugin;
use SprykerEco\Zed\CrefoPay\Communication\Plugin\Oms\Condition\IsCiaPendingReceivedPlugin;
use SprykerEco\Zed\CrefoPay\Communication\Plugin\Oms\Condition\IsPaidReceivedPlugin;
use SprykerEco\Zed\CrefoPay\Communication\Plugin\Oms\Condition\IsCaptureCallSuccessfulPlugin;
use SprykerEco\Zed\CrefoPay\Communication\Plugin\Oms\Condition\IsDoneReceivedPlugin;
use SprykerEco\Zed\CrefoPay\Communication\Plugin\Oms\Condition\IsExpiredReceivedPlugin;
use SprykerEco\Zed\CrefoPay\Communication\Plugin\Oms\Condition\IsFinishCallSuccessfulPlugin;
use SprykerEco\Zed\CrefoPay\Communication\Plugin\Oms\Condition\IsChargeBackReceivedPlugin;
use SprykerEco\Zed\CrefoPay\Communication\Plugin\Oms\Condition\IsRefundCallSuccessfulPlugin;
use SprykerEco\Zed\CrefoPay\Communication\Plugin\Oms\Condition\IsReserveCallSuccessfulPlugin;
use SprykerEco\Zed\CrefoPay\Communication\Plugin\Oms\Condition\IsMerchantPendingReceivedPlugin;

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
            $commandCollection->add(new CancelPlugin(), 'CrefoPay/Cancel');
            $commandCollection->add(new CapturePlugin(), 'CrefoPay/Capture'); //Or you can use CaptureSplitPlugin instead. OMS command name (second param) should not be changed.
            $commandCollection->add(new RefundPlugin(), 'CrefoPay/Refund'); ////Or you can use RefundSplitPlugin instead. OMS command name (second param) should not be changed.
            $commandCollection->add(new FinishPlugin(), 'CrefoPay/Finish');

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
        $container->extend(OmsDependencyProvider::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {
            ...
            $conditionCollection->add(new IsReserveCallSuccessfulPlugin(), 'CrefoPay/IsReserveCallSuccessful');
            $conditionCollection->add(new IsAcknowledgePendingReceivedPlugin(), 'CrefoPay/IsAcknowledgePendingReceived');
            $conditionCollection->add(new IsMerchantPendingReceivedPlugin(), 'CrefoPay/IsMerchantPendingReceived');
            $conditionCollection->add(new IsCiaPendingReceivedPlugin(), 'CrefoPay/IsCiaPendingReceived');
            $conditionCollection->add(new IsCancelCallSuccessfulPlugin(), 'CrefoPay/IsCancelCallSuccessful');
            $conditionCollection->add(new IsCanceledReceivedPlugin(), 'CrefoPay/IsCanceledReceived');
            $conditionCollection->add(new IsExpiredReceivedPlugin(), 'CrefoPay/IsExpiredReceived');
            $conditionCollection->add(new IsCaptureCallSuccessfulPlugin(), 'CrefoPay/IsCaptureCallSuccessful');
            $conditionCollection->add(new IsPaidReceivedPlugin(), 'CrefoPay/IsPaidReceived');
            $conditionCollection->add(new IsRefundCallSuccessfulPlugin(), 'CrefoPay/IsRefundCallSuccessful');
            $conditionCollection->add(new IsChargeBackReceivedPlugin(), 'CrefoPay/IsChargeBackReceived');
            $conditionCollection->add(new IsFinishCallSuccessfulPlugin(), 'CrefoPay/IsFinishCallSuccessful');
            $conditionCollection->add(new IsDoneReceivedPlugin(), 'CrefoPay/IsDoneReceived');

            return $conditionCollection;
        });

        return $container;
    }
}
```
<br>
</details>

10. Extend `PaymentDependencyProvider` to add payment method filter plugin:

<details open>
<summary>\Pyz\Zed\Payment\PaymentDependencyProvider</summary>

```PHP
<?php

namespace Pyz\Zed\Payment;

use Spryker\Zed\Payment\PaymentDependencyProvider as SprykerPaymentDependencyProvider;
use SprykerEco\Zed\CrefoPay\Communication\Plugin\CrefoPayPaymentMethodFilterPlugin;

class PaymentDependencyProvider extends SprykerPaymentDependencyProvider
{
    /**
     * @return \Spryker\Zed\Payment\Dependency\Plugin\Payment\PaymentMethodFilterPluginInterface[]
     */
    protected function getPaymentMethodFilterPlugins()
    {
        return [
            ...
            new CrefoPayPaymentMethodFilterPlugin(),
        ];
    }
}
```
<br>
</details>

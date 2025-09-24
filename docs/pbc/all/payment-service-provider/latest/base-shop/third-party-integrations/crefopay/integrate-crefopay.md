---
title: Integrating CrefoPay
description: This document shows how to integrate CrefoPay into the Spryker Commerce OS.
last_updated: Aug 10, 2022
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/crefopay-integration
originalArticleId: ce1c7803-e0a5-493f-94a6-0f602616e987
redirect_from:
  - /2021080/docs/crefopay-integration
  - /2021080/docs/en/crefopay-integration
  - /docs/crefopay-integration
  - /docs/en/crefopay-integration
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/crefopay/integrating-crefopay.html
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/crefopay/integrating-crefopay.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/crefopay/integrate-crefopay.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/crefopay/integrating-crefopay.html
related:
  - title: CrefoPay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/crefopay/crefopay.html
  - title: Installing and configuring CrefoPay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/crefopay/install-and-configure-crefopay.html
  - title: CrefoPay payment methods
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/crefopay/crefopay-payment-methods.html
  - title: CrefoPay capture and refund Processes
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/crefopay/crefopay-capture-and-refund-processes.html
  - title: CrefoPay—Enabling B2B payments
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/crefopay/crefopay-enable-b2b-payments.html
  - title: CrefoPay callbacks
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/crefopay/crefopay-callbacks.html
  - title: CrefoPay notifications
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/crefopay/crefopay-notifications.html
---

This document shows how to integrate the CrefoPay system into your project.

## Prerequisites

Before integrating CrefoPay into your project, make sure you [installed and configured the CrefoPay module](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/crefopay/install-and-configure-crefopay.html).

## Integrating CrefoPay into your project

To integrate CrefoPay, do the following:

1. Add shipment step plugin, payment subform plugins, and payment method handlers:

<details>
<summary>\Pyz\Yves\CheckoutPage\CheckoutPageDependencyProvider</summary>

```php
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
    public function provideDependencies(Container $container): Container
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

</details>

2. Extend `ShipmentStep` with the filtering logic for payment methods:

**\Pyz\Yves\CheckoutPage\Process\Steps\ShipmentStep**

```php
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

3. Extend `StepFactory` to be used by project-level `ShipmentStep`:

**\Pyz\Yves\CheckoutPage\Process\StepFactory**

```php
<?php

namespace Pyz\Yves\CheckoutPage\Process;

use Pyz\Yves\CheckoutPage\Process\Steps\ShipmentStep;
use SprykerShop\Yves\CheckoutPage\Plugin\Router\CheckoutPageRouteProviderPlugin;
use SprykerShop\Yves\CheckoutPage\Process\StepFactory as SprykerShopStepFactory;

/**
 * @method \SprykerShop\Yves\CheckoutPage\CheckoutPageConfig getConfig()
 */
class StepFactory extends SprykerShopStepFactory
{
    /**
     * @return \SprykerShop\Yves\CheckoutPage\Process\Steps\ShipmentStep
     */
    public function createShipmentStep()
    {
        return new ShipmentStep(
            $this->getCalculationClient(),
            $this->getShipmentPlugins(),
            $this->createShipmentStepPostConditionChecker(),
            $this->createGiftCardItemsChecker(),
            CheckoutPageRouteProviderPlugin::ROUTE_NAME_CHECKOUT_SHIPMENT,
            $this->getConfig()->getEscapeRoute(),
            $this->getCheckoutShipmentStepEnterPreCheckPlugins()
        );
    }
}
```

4. Extend `CheckoutPageFactory` to be used by the project-level `StepFactory`:

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

5. Extend the checkout page layout to add `jQuery`:

**Pyz/Yves/CheckoutPage/Theme/default/templates/page-layout-checkout/page-layout-checkout.twig**

```twig
{% raw %}{%{% endraw %} extends template('page-layout-checkout', '@SprykerShop:CheckoutPage') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block headScripts {% raw %}%}{% endraw %}
    {% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js" type="text/javascript"></script>
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

```

6. Extend payment Twig with CrefoPay payment methods:

**Demo Shop template extension (a B2C theme example)**

<details>
<summary>Pyz/Yves/CheckoutPage/Theme/default/views/payment/payment.twig</summary>

```twig
{% raw %}{%{% endraw %} extends view('payment', '@SprykerShop:CheckoutPage') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define data = {
    customForms: {
        'crefoPay/bill': ['bill', 'crefoPay'],
        'crefoPay/cash-on-delivery': ['cash-on-delivery', 'crefoPay'],
        'crefoPay/direct-debit': ['direct-debit', 'crefoPay'],
        'crefoPay/paypal': ['paypal', 'crefoPay'],
        'crefoPay/prepaid': ['prepaid', 'crefoPay'],
        'crefoPay/sofort': ['sofort', 'crefoPay'],
        'crefoPay/credit-card': ['credit-card', 'crefoPay'],
        'crefoPay/credit-card-3d': ['credit-card-3d', 'crefoPay']
    },
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} include molecule('script-loader') with {
        class: 'js-crefopay-payment-form__script-loader',
        attributes: {
            src: 'https://libs.crefopay.de/3.0/secure-fields.js'
        },
    } only {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} include atom('crefopay-checkbox-helper', 'CrefoPay') with {
        attributes: {
            'trigger-selector': '.toggler-radio__input',
            'payment-container-selector': '.js-payment-method-crefoPay',
            'target-selector': '.radio__input',
            'custom-attribute-name': 'data-crefopay',
            'custom-attribute-value': 'paymentMethod',
        },
    } only {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} embed molecule('form') with {
        modifiers: ['checkout-actions', 'checkout-form-elements'],
        data: {
            form: data.forms.payment,
            submit: {
                enable: true,
                text: 'checkout.step.summary' | trans,
                class: 'form__action--checkout button  button--large button--expand',
            },
            cancel: {
                enable: true,
                url: data.backUrl,
                text: 'general.back.button' | trans,
                class: 'form__action--checkout button button--hollow button--expand',
            },
            options: {
                attr: {
                    novalidate: 'novalidate',
                    id: 'payment-form',
                }
            },
        },
        embed: {
            customForms: data.customForms,
        },
    } only {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} block fieldset {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} for name, choices in data.form.paymentSelection.vars.choices {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} set paymentProviderIndex = loop.index0 {% raw %}%}{% endraw %}

                <div class="js-payment-method-{% raw %}{{{% endraw %} name {% raw %}}}{% endraw %}">
                    {% raw %}{%{% endraw %} embed molecule('list-switches') with {
                        modifiers: ['register-type', 'layout-width', 'one-column'],
                        data: {
                            form: data.form.paymentSelection,
                            choices: choices,
                            rowAttrClass: 'toggler-radio--with-bg',
                            targetClassName: 'js-payment-method-',
                            providerIndex: paymentProviderIndex,
                        },
                    } only {% raw %}%}{% endraw %}
                        {% raw %}{%{% endraw %} block item {% raw %}%}{% endraw %}
                            {% raw %}{%{% endraw %} set fullIndex = loop.index ~ '-' ~ data.providerIndex {% raw %}%}{% endraw %}

                            {% raw %}{{{% endraw %} form_row(data.form[key], {
                                label: data.form[key].vars.label,
                                required: false,
                                component: data.targetClassName ? molecule('toggler-radio'),
                                rowAttr: {
                                    class: data.rowAttrClass,
                                },
                                attributes: {
                                    'target-class-name': data.targetClassName ? data.targetClassName ~ fullIndex,
                                    checked: choice.value == data.providerIndex,
                                    'target-payment-form-class-name': 'js-payment-method-' ~ loop.index ~ '-' ~ data.providerIndex,
                                },
                            }) {% raw %}}}{% endraw %}

                            {% raw %}{%{% endraw %} if key == 0 {% raw %}%}{% endraw %}
                                <div class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__img-wrap">
                                    <img class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__img" src="{% raw %}{{{% endraw %} publicPath('images/logo-visa.png') {% raw %}}}{% endraw %}" alt="Visa">
                                    <img class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__img" src="{% raw %}{{{% endraw %} publicPath('images/logo-mastercard.png') {% raw %}}}{% endraw %}" alt="Mastercard">
                                </div>
                            {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
                        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
                    {% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}

                    {% raw %}{%{% endraw %} for key, choice in choices {% raw %}%}{% endraw %}
                        {% raw %}{%{% endraw %} embed molecule('form') with {
                            class: 'spacing-bottom spacing-bottom--bigger',
                            modifiers: ['grid-indent', 'checkout-form-elements'],
                            data: {
                                form: data.form[data.form.paymentSelection[key].vars.value],
                                enableStart: false,
                                enableEnd: false,
                                layout: {
                                    'card_number': 'col col--sm-12 col--lg-6',
                                    'name_on_card': 'col col--sm-12 col--lg-6',
                                    'card_expires_month': 'col col--sm-12 col--md-6 col--lg-3 col--bottom',
                                    'card_expires_year': 'col col--sm-12 col--md-6 col--lg-3 col--bottom',
                                    'card_security_code': 'col col--sm-12 col--lg-6 col--bottom',
                                },
                            },
                            embed: {
                                name: name,
                                customForms: embed.customForms,
                                index: loop.index ~ '-' ~ paymentProviderIndex,
                                toggler: data.form.paymentSelection[key],
                            },
                        } only {% raw %}%}{% endraw %}
                            {% raw %}{%{% endraw %} block fieldset {% raw %}%}{% endraw %}
                                <div class="js-payment-method-{% raw %}{{{% endraw %} embed.index {% raw %}}}{% endraw %} js-payment-form-{% raw %}{{{% endraw %} embed.name {% raw %}}}{% endraw %} {% raw %}{%{% endraw %} if embed.index != '1-0' {% raw %}%}{% endraw %} is-hidden{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}">
                                    <h2 class="title title--primary">{% raw %}{{{% endraw %} embed.toggler.vars.label | trans {% raw %}}}{% endraw %}</h2>

                                    {% raw %}{%{% endraw %} if embed.customForms[data.form.vars.template_path] is not defined {% raw %}%}{% endraw %}
                                        {% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}
                                    {% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
                                        {% raw %}{%{% endraw %} set viewName = embed.customForms[data.form.vars.template_path] | first {% raw %}%}{% endraw %}
                                        {% raw %}{%{% endraw %} set moduleName = embed.customForms[data.form.vars.template_path] | last {% raw %}%}{% endraw %}
                                        {% raw %}{%{% endraw %} include view(viewName, moduleName) ignore missing with {
                                            form: data.form.parent,
                                        } only {% raw %}%}{% endraw %}
                                    {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
                                </div>
                            {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
                        {% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
                    {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
                </div>
            {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} endembed {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

```

</details>

7. In the project root, add an alias for the `CrefoPay` module to `tsconfig.json`:

**tsconfig.json:**

```json
{
    "compilerOptions": {
        ...
        "paths": {
            ...
            "SprykerEcoCrefoPay/*": [
                "./vendor/spryker-eco/crefo-pay/src/SprykerEco/Yves/CrefoPay/Theme/default/*"
            ]
        }
    },
    ...
}
```

8. Extend the `crefopay-checkbox-helper` atom of the `CrefoPay` module:

**\Pyz\Yves\CrefoPay\Theme\default\components\atoms\crefopay-checkbox-helper\crefopay-checkbox-helper.ts**

```ts
import SprykerEcoCrefopayCheckboxHelper from 'SprykerEcoCrefoPay/components/atoms/crefopay-checkbox-helper/crefopay-checkbox-helper';

export default class CrefopayCheckboxHelper extends SprykerEcoCrefopayCheckboxHelper {

    protected readyCallback(): void {}

    protected init(): void {
        super.readyCallback();
    }

    protected checkCheckbox(checkboxTrigger: EventTarget): void {
        const targetFormContainerClassName = this.getTargetPaymentFormClassName(<HTMLElement>checkboxTrigger);
        const formContainer = <HTMLElement>this.paymentForm.getElementsByClassName(targetFormContainerClassName)[0];
        const checkbox: HTMLInputElement = formContainer.querySelector(this.targetSelector);

        checkbox.checked = true;
    }

    protected getTargetPaymentFormClassName(element: HTMLElement): string {
        return element.getAttribute('target-payment-form-class-name');
    }
}

```

9. Add an entry point for the extended `crefopay-checkbox-helper` atom:

**\Pyz\Yves\CrefoPay\Theme\default\components\atoms\crefopay-checkbox-helper\index.ts**

```ts
import register from 'ShopUi/app/registry';
export default register('crefopay-checkbox-helper', () => import(/* webpackMode: "lazy" */'./crefopay-checkbox-helper'));
```

10. Override layout of the `crefopay-payment-form` molecule:

<details>
<summary>\Pyz\Yves\CrefoPay\Theme\default\components\molecule\crefopay-payment-form\crefopay-payment-form.twig</summary>

```twig
{% raw %}{%{% endraw %} extends model('component') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define config = {
    name: 'crefopay-payment-form',
    tag: 'crefopay-payment-form',
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define data = {
    paymentMethodSubForm: required,
    shopPublicKey: required,
    orderId: required,
    fields: [],
    endpointUrl: required,
    placeholders: required
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} set crefoPayConfig = {
    url: data.endpointUrl,
    placeholders: {
        accountHolder: data.placeholders.accountHolder,
        number: data.placeholders.number,
        cvv: data.placeholders.cvv
    }
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define attributes = {
    'shop-public-key': data.shopPublicKey,
    'order-id': data.orderId,
    'crefo-pay-config': crefoPayConfig | json_encode(),
    'payment-form-selector': '#payment-form',
    'class-to-toggle': 'is-hidden',
    'payment-container-selector': '.form',
    'payment-toggler-selector': '[class*="js-payment-form-crefoPay"]',
    'toggle-class-to-check': 'is-hidden'
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block body {% raw %}%}{% endraw %}
    {% raw %}{%{% endraw %} macro crefopayField(name, attribute, blockName) {% raw %}%}{% endraw %}
        <div class="spacing-y">
            <label class="label label--required">{% raw %}{{{% endraw %} name {% raw %}}}{% endraw %}</label>
            <div class="{% raw %}{{{% endraw %} blockName {% raw %}}}{% endraw %}__input-container" data-crefopay-placeholder="{% raw %}{{{% endraw %} attribute {% raw %}}}{% endraw %}"></div>
        </div>
    {% raw %}{%{% endraw %} endmacro {% raw %}%}{% endraw %}

    {% raw %}{%{% endraw %} block requestForm {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} import _self as macros {% raw %}%}{% endraw %}

        <div class="is-hidden">
            {% raw %}{{{% endraw %} form_widget(data.paymentMethodSubForm) {% raw %}}}{% endraw %}
        </div>

        {% raw %}{%{% endraw %} for field in data.fields {% raw %}%}{% endraw %}
            {% raw %}{{{% endraw %} macros.crefopayField(field.name, field.attribute, config.name) {% raw %}}}{% endraw %}
        {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}

        <div class="{% raw %}{{{% endraw %} config.name {% raw %}}}{% endraw %}__error {% raw %}{{{% endraw %} config.jsName {% raw %}}}{% endraw %}__error spacing-y is-hidden">
            {% raw %}{{{% endraw %} 'crefopay.required_notification' | trans {% raw %}}}{% endraw %}
        </div>
    {% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} endblock {% raw %}%}{% endraw %}

```

</details>

11. Add a route provider plugin:

**\Pyz\Yves\Router\RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerEco\Yves\CrefoPay\Plugin\Router\CrefoPayRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        return [
            ...
            new CrefoPayRouteProviderPlugin(),
        ];
    }
}
```

12. Add checkout plugins:

<details>
<summary>\Pyz\Zed\Checkout\CheckoutDependencyProvider.php</summary>

```php
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

</details>

13. Add OMS commands and conditions:

<details>
<summary>\Pyz\Zed\Oms\OmsDependencyProvider.php</summary>

```php
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

</details>

14. Extend `PaymentDependencyProvider` with a plugin for filtering payment methods:

**Pyz\Zed\Payment\PaymentDependencyProvider.php**

```php
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

{% info_block warningBox "Note" %}

If an additional validation for input fields that are filled by a customer is needed, we recommend creating a plugin that implements `\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface`.
The plugin must be added to the `Pyz\Zed\Checkout\CheckoutDependencyProvider::getCheckoutPreConditions()` method.

For more details, see [Checkout process review and implementation](/docs/pbc/all/cart-and-checkout/latest/base-shop/extend-and-customize/checkout-process-review-and-implementation.html).

{% endinfo_block %}

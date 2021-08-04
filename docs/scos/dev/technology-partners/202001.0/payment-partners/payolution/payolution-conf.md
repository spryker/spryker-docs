---
title: Payolution - Installation and Configuration
originalLink: https://documentation.spryker.com/v4/docs/payolution-configuration
redirect_from:
  - /v4/docs/payolution-configuration
  - /v4/docs/en/payolution-configuration
---

To integrate Payolution into your project, first you need to install and configure the CrefoPay module. This topic describes how to do that.

## Installation
To install the Payolution module, run:
```Bash
composer require spryker-eco/payolution
```
## Configuration
Please refer to `config/config.dist.php` for example of module configuration.

To set up the initial Payolution configuration, use the credentials you received after registering your Payolution merchant account:
```php
$config[PayolutionConstants::TRANSACTION_GATEWAY_URL] = '';
$config[PayolutionConstants::CALCULATION_GATEWAY_URL] = '';
$config[PayolutionConstants::TRANSACTION_SECURITY_SENDER] = '';
$config[PayolutionConstants::TRANSACTION_USER_LOGIN] = '';
$config[PayolutionConstants::TRANSACTION_USER_PASSWORD] = '';
$config[PayolutionConstants::CALCULATION_SENDER] = '';
$config[PayolutionConstants::CALCULATION_USER_LOGIN] = '';
$config[PayolutionConstants::CALCULATION_USER_PASSWORD] = '';
$config[PayolutionConstants::TRANSACTION_CHANNEL_PRE_CHECK] = '';
$config[PayolutionConstants::TRANSACTION_CHANNEL_INVOICE] = '';
$config[PayolutionConstants::TRANSACTION_CHANNEL_INSTALLMENT] = '';
$config[PayolutionConstants::CALCULATION_CHANNEL] = '';
```

Next, specify modes and order limits:
```php
$config[PayolutionConstants::TRANSACTION_MODE] = 'CONNECTOR_TEST';
$config[PayolutionConstants::CALCULATION_MODE] = 'TEST';
$config[PayolutionConstants::MIN_ORDER_GRAND_TOTAL_INVOICE] = '500';
$config[PayolutionConstants::MAX_ORDER_GRAND_TOTAL_INVOICE] = '500000';
$config[PayolutionConstants::MIN_ORDER_GRAND_TOTAL_INSTALLMENT] = '500';
$config[PayolutionConstants::MAX_ORDER_GRAND_TOTAL_INSTALLMENT] = '500000';
 ```

### Checkout Configuration

To use Payolution in frontend, add Payolution payment method handlers and subform to `Pyz/Yves/Checkout/CheckoutDependencyProvider.php`
```php
 $container[static::PAYMENT_METHOD_HANDLER] = function () {
 $paymentHandlerPlugins = new StepHandlerPluginCollection();

 $paymentHandlerPlugins->add(new PayolutionHandlerPlugin(), PaymentTransfer::PAYOLUTION_INVOICE);
 $paymentHandlerPlugins->add(new PayolutionHandlerPlugin(), PaymentTransfer::PAYOLUTION_INSTALLMENT);

 return $paymentHandlerPlugins;
 };

 $container[static::PAYMENT_SUB_FORMS] = function () {
 $paymentSubFormPlugins = new SubFormPluginCollection();

 $paymentSubFormPlugins->add(new PayolutionInstallmentSubFormPlugin());
 $paymentSubFormPlugins->add(new PayolutionInvoiceSubFormPlugin());

 return $paymentSubFormPlugins;
 };
 ```

All subform and handler plugins are located in `SprykerEco\Yves\Payolution\Plugin\` namespace.

### OMS Configuration

Activate the following Payolution process:
```php
$config[OmsConstants::ACTIVE_PROCESSES][] ='PayolutionInstalmentPayment01',
$config[OmsConstants::ACTIVE_PROCESSES][] ='PayolutionInvoicePayment01',

 ```

Default implementation for commands and options should be added to `Pyz/Zed/Oms/OmsDependencyProvider.php`

Commands:
```php
$container->extend(OmsDependencyProvider::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
    $commandCollection
        ->add(new PreAuthorizePartialPlugin(), 'Payolution/PreAuthorize')
        ->add(new ReAuthorizePartialPlugin(), 'Payolution/ReAuthorize')
        ->add(new RevertPartialPlugin(), 'Payolution/Revert')
        ->add(new CapturePartialPlugin(), 'Payolution/Capture')
        ->add(new RefundPlugin(), 'Payolution/Refund');

    return $commandCollection;
});
```

Plugins `PreAuthorizePlugin`, `ReAuthorizePlugin`, `RevertPlugin`, `CapturePlugin` still can be used but they cannot execute partial operations

Conditions:
```php
$container->extend(OmsDependencyProvider::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {
    $conditionCollection
        ->add(new IsPreAuthorizationApprovedPlugin(), 'Payolution/IsPreAuthorizationApproved')
        ->add(new IsReAuthorizationApprovedPlugin(), 'Payolution/IsReAuthorizationApproved')
        ->add(new IsReversalApprovedPlugin(), 'Payolution/IsReversalApproved')
        ->add(new IsCaptureApprovedPlugin(), 'Payolution/IsCaptureApproved')
        ->add(new IsRefundApprovedPlugin(), 'Payolution/IsRefundApproved');

    return $conditionCollection;
});
```

All commands and conditions are located in `SprykerEco\Zed\Payolution\Communication\Plugin\Oms\` namespace.

### Payment Configuration

Default implementation for checkout payment plugins should be added to `Pyz/Zed/Payment/PaymentDependencyProvider.php`
```php
 $container->extend(static::CHECKOUT_PLUGINS, function (CheckoutPluginCollection $pluginCollection) {
 $pluginCollection
 ->add(new PayolutionPreCheckPlugin(), PayolutionConfig::PROVIDER_NAME, static::CHECKOUT_PRE_CHECK_PLUGINS)
 ->add(new PayolutionSaveOrderPlugin(), PayolutionConfig::PROVIDER_NAME, static::CHECKOUT_ORDER_SAVER_PLUGINS)
 ->add(new PayolutionPostCheckPlugin(), PayolutionConfig::PROVIDER_NAME, static::CHECKOUT_POST_SAVE_PLUGINS);

 return $pluginCollection;
 });
 ```

All payment plugins are located in `SprykerEco\Zed\Payolution\Communication\Plugin\Checkout\` namespace.

## Frontend Integration
To show Payolution on Frontend, extend the payment view:

src/Pyz/Yves/CheckoutPage/Theme/default/views/payment/payment.twig

 ```php
 {% raw %}{%{% endraw %} extends template('page-layout-checkout', 'CheckoutPage') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define data = {
    backUrl: _view.previousStepUrl,
    forms: {
        payment: _view.paymentForm
    },
    title: 'checkout.step.payment.title' | trans,
    customForms: {}
} {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} block content {% raw %}%}{% endraw %}
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
                <ul>
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
                                            'target-class-name': 'js-payment-method-' ~ embed.index,
                                        }
                                    }) {% raw %}}}{% endraw %}
                                    {% raw %}{%{% endraw %} set templateName = data.form.vars.template_path | replace('/', '-') {% raw %}%}{% endraw %}
                                    {% raw %}{%{% endraw %} set viewName = data.form.vars.template_path | split('/') {% raw %}%}{% endraw %}

                                    <div class="col col--sm-12 is-hidden js-payment-method-{% raw %}{{{% endraw %}embed.index{% raw %}}}{% endraw %}">
                                        <div class="col col--sm-12 col--md-6">
                                            {% raw %}{%{% endraw %} if 'Payolution' in data.form.vars.template_path {% raw %}%}{% endraw %}
                                                {% raw %}{%{% endraw %} include view(viewName[1], viewName[0]) with {
                                                    form: data.form.parent
                                                } only {% raw %}%}{% endraw %}
                                            {% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
                                                {% raw %}{{{% endraw %} parent() {% raw %}}}{% endraw %}
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

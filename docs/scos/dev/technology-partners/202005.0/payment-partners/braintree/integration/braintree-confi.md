---
title: Braintree - Configuration
originalLink: https://documentation.spryker.com/v5/docs/braintree-configuration
redirect_from:
  - /v5/docs/braintree-configuration
  - /v5/docs/en/braintree-configuration
---

To configure Braintree module for Spryker Commerce OS (SCOS), do the following:

Add `spryker-eco/braintree` to your project by running `composer require spryker-eco/braintree`.

Please refer to `config/config.dist.php` for an example of module configuration.

To setup the initial Braintree configuration, use the credentials you received after registering your Braintree merchant account:
```php
// the mode of the transaction, either development, integration, sandbox, production, qa (required)
$config[BraintreeConstants::ENVIRONMENT] = '';

// the id of the merchant used (required)
$config[BraintreeConstants::MERCHANT_ID] = '';

// the public key given by the defined merchant account (required)
$config[BraintreeConstants::PUBLIC_KEY] = '';

// the private key given by the defined merchant account (required)
$config[BraintreeConstants::PRIVATE_KEY] = '';

// merchant account id specifying the currency (Marketplace master merchant is used by default)
$config[BraintreeConstants::ACCOUNT_ID] = '';

// merchant account unique identifier (Marketplace master merchant is used by default)
$config[BraintreeConstants::ACCOUNT_UNIQUE_IDENTIFIER] = '';

// defaults to false
$config[BraintreeConstants::IS_VAULTED] = true;

// defaults to false
$config[BraintreeConstants::IS_3D_SECURE] = true;
```

## Checkout Configuration

To use Braintree in frontend, Braintree payment method handlers and subforms should be added to `Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php`.
```php
use Spryker\Yves\StepEngine\Dependency\Plugin\Form\SubFormPluginCollection;
use Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginCollection;
use SprykerEco\Yves\Braintree\Plugin\BraintreeCreditCardSubFormPlugin;
use SprykerEco\Yves\Braintree\Plugin\BraintreeHandlerPlugin;
use SprykerEco\Yves\Braintree\Plugin\BraintreePayPalSubFormPlugin;
use Generated\Shared\Transfer\PaymentTransfer;

...

/**
 * @param \Spryker\Yves\Kernel\Container $container
 *
 * @return \Spryker\Yves\Kernel\Container
 */
protected function addSubFormPluginCollection(Container $container): Container
{
 $container[self::PAYMENT_SUB_FORMS] = function () {
 $paymentSubFormPluginCollection = new SubFormPluginCollection();
 $paymentSubFormPluginCollection->add(new BraintreeCreditCardSubFormPlugin());
 $paymentSubFormPluginCollection->add(new BraintreePayPalSubFormPlugin());

 return $paymentSubFormPluginCollection;
 };

 return $container;
}

/**
 * @param \Spryker\Yves\Kernel\Container $container
 *
 * @return \Spryker\Yves\Kernel\Container
 */
protected function addPaymentMethodHandlerPluginCollection(Container $container): Container
{
 $container[self::PAYMENT_METHOD_HANDLER] = function () {
 $paymentMethodHandlerCollection = new StepHandlerPluginCollection();
 $paymentMethodHandlerCollection->add(new BraintreeHandlerPlugin(), PaymentTransfer::BRAINTREE_CREDIT_CARD);
 $paymentMethodHandlerCollection->add(new BraintreeHandlerPlugin(), PaymentTransfer::BRAINTREE_PAY_PAL);

 return $paymentMethodHandlerCollection;
 };

 return $container;
}
```

All subform and handler plugins are located in `SprykerEco\Yves\Braintree\Plugin\` namespace.

## OMS Configuration

Activate the following Braintree process:
```php
$config[OmsConstants::ACTIVE_PROCESSES] = [
 'BraintreePayPal01',
 'BraintreeCreditCard01',
];

$config[OmsConstants::PROCESS_LOCATION] = [
 OmsConfig::DEFAULT_PROCESS_LOCATION,
 APPLICATION_VENDOR_DIR . '/spryker-eco/braintree/config/Zed/Oms',
];

$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
 \SprykerEco\Shared\Braintree\BraintreeConfig::PAYMENT_METHOD_CREDIT_CARD => 'BraintreeCreditCard01',
 \SprykerEco\Shared\Braintree\BraintreeConfig::PAYMENT_METHOD_PAY_PAL => 'BraintreePayPal01',
];
```

Default implementation for commands and options should be added to `Pyz/Zed/Oms/OmsDependencyProvider.php`.

1. Commands:
```php
$container->extend(OmsDependencyProvider::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
	$commandCollection
		->add(new AuthorizePlugin(), 'Braintree/Authorize')
		->add(new RevertPlugin(), 'Braintree/Revert')
		->add(new CapturePlugin(), 'Braintree/Capture')
		->add(new RefundPlugin(), 'Braintree/Refund');

	return $commandCollection;
});
```
2. Conditions:
```php
$container->extend(OmsDependencyProvider::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {
	$conditionCollection
		->add(new IsAuthorizationApprovedPlugin(), 'Braintree/IsAuthorizationApproved')
		->add(new IsReversalApprovedPlugin(), 'Braintree/IsReversalApproved')
		->add(new IsCaptureApprovedPlugin(), 'Braintree/IsCaptureApproved')
		->add(new IsRefundApprovedPlugin(), 'Braintree/IsRefundApproved');

	return $conditionCollection;
});
```
All commands and conditions are located in `SprykerEco\Zed\Braintree\Communication\Plugin\Oms\` namespace.

## Payment Configuration

Default implementation for checkout payment plugins should be added to `Pyz/Zed/Checkout/CheckoutDependencyProvider.php`
```php
protected function getCheckoutPreConditions(Container $container)
{
 return [
 ...
 new BraintreePreCheckPlugin(),
 ];
}

protected function getCheckoutOrderSavers(Container $container)
{
 $plugins = [
 ...
 new BraintreeSaveOrderPlugin(),
 ];

 return $plugins;
}

protected function getCheckoutPostHooks(Container $container)
{
 return [
 ...
 new BraintreePostSavePlugin(),
 ];
}
```

All payment plugins are located in the `SprykerEco\Zed\Braintree\Communication\Plugin\Checkout\` namespace.

## Frontend Integration
src/Pyz/Yves/CheckoutPage/Theme/default/views/payment/payment.twig

 ```php
 {% raw %}{%{% endraw %} extends template('page-layout-checkout', 'CheckoutPage') {% raw %}%}{% endraw %}

{% raw %}{%{% endraw %} define data = {
 backUrl: _view.previousStepUrl,
 forms: {
 payment: _view.paymentForm
 },

 title: 'checkout.step.payment.title' | trans
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
 }
 }
 } only {% raw %}%}{% endraw %}
 {% raw %}{%{% endraw %} block fieldset {% raw %}%}{% endraw %}
 {% raw %}{%{% endraw %} for name, choices in data.form.paymentSelection.vars.choices {% raw %}%}{% endraw %}
 <h5>{% raw %}{{{% endraw %} ('checkout.payment.provider.' ~ name) | trans {% raw %}}}{% endraw %}</h5>

 <ul class="list spacing-y">
 {% raw %}{%{% endraw %} for key, choice in choices {% raw %}%}{% endraw %}
 <li class="list__item spacing-y clear">
 {% raw %}{%{% endraw %} embed molecule('form') with {
 data: {
 form: data.form[data.form.paymentSelection[key].vars.value],
 enableStart: false,
 enableEnd: false,
 layout: {
 'card_expires_month': 'col col--sm-4',
 'card_expires_year': 'col col--sm-8'
 }
 },
 embed: {
 toggler: data.form.paymentSelection[key]
 }
 } only {% raw %}%}{% endraw %}
 {% raw %}{%{% endraw %} block fieldset {% raw %}%}{% endraw %}
 {% raw %}{%{% endraw %} set templateName = data.form.vars.template_path | replace('/', '-') {% raw %}%}{% endraw %}
 {% raw %}{%{% endraw %} set viewName = data.form.vars.template_path | split('/') {% raw %}%}{% endraw %}

 {% raw %}{{{% endraw %} form_row(embed.toggler, {
 required: false,
 component: molecule('toggler-radio'),
 attributes: {
 'target-selector': '.js-payment-method-' ~ templateName,
 'class-to-toggle': 'is-hidden'
 }
 }) {% raw %}}}{% endraw %}

 <div class="col col--sm-12 is-hidden js-payment-method-{% raw %}{{{% endraw %} templateName {% raw %}}}{% endraw %}">
 <div class="col col--sm-12 col--md-6">
 {% raw %}{%{% endraw %} if 'Braintree' in data.form.vars.template_path {% raw %}%}{% endraw %}
 {% raw %}{%{% endraw %} include view(viewName[1], viewName[0]) with {
 form: data.form.parent
 } only {% raw %}%}{% endraw %}
 {% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
 {% raw %}{{{% endraw %}parent(){% raw %}}}{% endraw %}
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

---
title: Integrating Heidelpay
description: This article contains information on integrating the Heidelpay module into the Spryker Commerce OS.
last_updated: Dec 8, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/heidelpay-integration-scos
originalArticleId: 2b8e0b5b-eda6-4ce4-8483-f94db9135223
redirect_from:
  - /v6/docs/heidelpay-integration-scos
  - /v6/docs/en/heidelpay-integration-scos
related:
  - title: Heidelpay
    link: docs/scos/user/technology-partners/page.version/payment-partners/heidelpay.html
  - title: Integrating the Credit Card Secure payment method for Heidelpay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-credit-card-secure-payment-method-for-heidelpay.html
  - title: Configuring Heidelpay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/configuring-heidelpay.html
  - title: Integrating the Direct Debit payment method for Heidelpay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-direct-debit-payment-method-for-heidelpay.html
  - title: Integrating the Paypal Authorize payment method for Heidelpay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-paypal-authorize-payment-method-for-heidelpay.html
  - title: Installing Heidelpay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/installing-heidelpay.html
  - title: Heidelpay workflow for errors
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/heidelpay-workflow-for-errors.html
  - title: Integrating the Split-payment Marketplace payment method for Heidelpay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-split-payment-marketplace-payment-method-for-heidelpay.html
  - title: Integrating the Easy Credit payment method for Heidelpay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-easy-credit-payment-method-for-heidelpay.html
---

{% info_block errorBox %}

There is currently an issue when using giftcards with Heidelpay. Our team is developing a fix for it.

{% endinfo_block %}

To integrate Heidelpay, follow the steps below:

## Back-end Integration

1. Add sub form plugins and payment method handlers:

Pyz\Yves\CheckoutPage\CheckoutPageDependencyProvider

```php
 protected function addSubFormPluginCollection(Container $container): Container
{
	$container[self::PAYMENT_SUB_FORMS] = function () {
		$subFormPluginCollection = new SubFormPluginCollection();
		...
		$subFormPluginCollection->add(new HeidelpaySofortSubFormPlugin());
		$subFormPluginCollection->add(new HeidelpayPaypalAuthorizeSubFormPlugin());
		$subFormPluginCollection->add(new HeidelpayPaypalDebitSubFormPlugin());
		$subFormPluginCollection->add(new HeidelpayIdealSubFormPlugin());
		$subFormPluginCollection->add(new HeidelpayCreditCardSecureSubFormPlugin());

		return $subFormPluginCollection;
	};

	return $container;
}

protected function addPaymentMethodHandlerPluginCollection(Container $container):
{
	$container[self::PAYMENT_METHOD_HANDLER] = function () {
		$stepHandlerPluginCollection = new StepHandlerPluginCollection();
		...
		$stepHandlerPluginCollection->add(new HeidelpayHandlerPlugin(), PaymentTransfer::HEIDELPAY_SOFORT);
		$stepHandlerPluginCollection->add(new HeidelpayHandlerPlugin(), PaymentTransfer::HEIDELPAY_PAYPAL_AUTHORIZE);
		$stepHandlerPluginCollection->add(new HeidelpayHandlerPlugin(), PaymentTransfer::HEIDELPAY_PAYPAL_DEBIT);
		$stepHandlerPluginCollection->add(new HeidelpayHandlerPlugin(), PaymentTransfer::HEIDELPAY_IDEAL);
		$stepHandlerPluginCollection->add(new HeidelpayCreditCardHandlerPlugin(), PaymentTransfer::HEIDELPAY_CREDIT_CARD_SECURE);

		return $stepHandlerPluginCollection;
	};

	return $container;
}
```

2. Add controller provider:

\Pyz\Yves\ShopApplication\YvesBootstrap

```php
 protected function getControllerProviderStack($isSsl)
{
	return [
		...
		new HeidelpayControllerProvider($isSsl),
	];>
}
```
    
3. Add checkout plugins:
 
\Pyz\Zed\Checkout\CheckoutDependencyProvider

```php
 protected function getCheckoutOrderSavers(Container $container)
{
	$plugins = [
		...
		new HeidelpaySaveOrderPlugin(),
	];

	return $plugins;
}

protected function getCheckoutPostHooks(Container $container)
{
	return [
		...
		new HeidelpayPostSavePlugin(),
	];
}
```

4. Add OMS commands and conditions:

\Pyz\Zed\Oms\OmsDependencyProvider

```php
public function provideBusinessLayerDependencies(Container $container)
{
	$container = parent::provideBusinessLayerDependencies($container);
	$container = $this->addCommandPlugins($container);
	$container = $this->addConditionPlugins($container);

	return $container;
}
protected function addConditionPlugins(Container $container): Container
{
	$container[self::CONDITION_PLUGINS] = function () {
		$conditionCollection = new ConditionCollection();
		$conditionCollection->add(new IsAuthorizationCompletedPlugin(), 'Heidelpay/IsAuthorizationCompleted');
		$conditionCollection->add(new IsDebitCompletedPlugin(), 'Heidelpay/IsDebitCompleted');
		$conditionCollection->add(new IsCaptureApprovedPlugin(), 'Heidelpay/IsCaptureApproved');

		return $conditionCollection;
	};

	return $container;
}

protected function addCommandPlugins(Container $container): Container
{
	$container[self::COMMAND_PLUGINS] = function () {
		$commandCollection = new CommandCollection();
		$commandCollection->add(new SendOrderConfirmationPlugin(), 'Oms/SendOrderConfirmation');
		$commandCollection->add(new SendOrderShippedPlugin(), 'Oms/SendOrderShipped');
		$commandCollection->add(new AuthorizePlugin(), 'Heidelpay/Authorize');
		$commandCollection->add(new DebitPlugin(), 'Heidelpay/Debit');
		$commandCollection->add(new CapturePlugin(), 'Heidelpay/Capture');

		return $commandCollection;
	};

	return $container;
}
```

## Front-end Integration

To make Heidelpay module work with your project, it's necessary to extend the frontend part:

tsconfig.json
 
```json
 "include": [
 "./vendor/spryker/spryker-shop/**/*",
 "./vendor/spryker-eco/**/*",
 "./src/Pyz/Yves/**/*"
],
```

frontend/settings.js

```bash
 // eco folders
eco: {
 // all modules
 modules: './vendor/spryker-eco'
},
...
 componentEntryPoints: {
 // absolute dirs in which look for
 dirs: [
 ...
 path.join(context, paths.eco.modules),
 ...
 ],
 ```

src/Pyz/Yves/CheckoutPage/Theme/default/views/payment/payment.twig

```twig
 ...

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
 {% raw %}{%{% endraw %} set paymentProviderIndex = loop.index {% raw %}%}{% endraw %}
 <h5>{% raw %}{{{% endraw %} ('checkout.payment.provider.' ~ name) | trans {% raw %}}}{% endraw %}</h5>
 <ul class="list spacing-y">
 {% raw %}{%{% endraw %} for key, choice in choices {% raw %}%}{% endraw %}
 <li class="list__item spacing-y clear">
 {% raw %}{%{% endraw %} embed molecule('form') with {
 data: {
 form: data.form[data.form.paymentSelection[key].vars.value],
 enableStart: false,
 enableEnd: false
 },
 embed: {
 index: loop.index ~ '-' ~ paymentProviderIndex,
 toggler: data.form.paymentSelection[key]
 }
 } only {% raw %}%}{% endraw %}
 {% raw %}{%{% endraw %} block fieldset {% raw %}%}{% endraw %}
 {% raw %}{%{% endraw %} for name, choices in data.form.paymentSelection.vars.choices {% raw %}%}{% endraw %}
 {% raw %}{%{% endraw %} set paymentProviderIndex = (loop.index0) {% raw %}%}{% endraw %}
 <h5>{% raw %}{{{% endraw %} ('checkout.payment.provider.' ~ name) | trans {% raw %}}}{% endraw %}</h5>
 <ul class="list spacing-y">
 {% raw %}{%{% endraw %} if choices is iterable {% raw %}%}{% endraw %}
 {% raw %}{%{% endraw %} for key, choice in choices {% raw %}%}{% endraw %}
 <li class="list__item spacing-y clear">
 {% raw %}{%{% endraw %} include molecule('payment-method', 'CheckoutPage') with {
 data: {
 form: data.form[data.form.paymentSelection[key].vars.value],
 index: loop.index ~ '-' ~ paymentProviderIndex,
 toggler: data.form.paymentSelection[key],
 }
 } only {% raw %}%}{% endraw %}
 </li>
 {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
 {% raw %}{%{% endraw %} else {% raw %}%}{% endraw %}
 <li class="list__item spacing-y clear">
 {% raw %}{%{% endraw %} include molecule('payment-method', 'CheckoutPage') with {
 data: {
 form: data.form[data.form.paymentSelection[paymentProviderIndex].vars.value],
 index: loop.index ~ '-' ~ paymentProviderIndex,
 toggler: data.form.paymentSelection[paymentProviderIndex],
 parentFormId: data.options.attr.id
 }
 } only {% raw %}%}{% endraw %}
 </li>
 {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
 </ul>
 {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
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

src/Pyz/Yves/Twig/TwigConfig.php

```twig
 protected function addCoreTemplatePaths(array $paths)
{
 ...
 $paths[] = APPLICATION_VENDOR_DIR . '/spryker-eco/%1$s/src/SprykerEco/Yves/%1$s/Theme/' . $themeName;

 return $paths;
}
```

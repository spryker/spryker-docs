---
title: Heidelpay - Integration into SCOS
originalLink: https://documentation.spryker.com/v2/docs/heidelpay-integration-scos
redirect_from:
  - /v2/docs/heidelpay-integration-scos
  - /v2/docs/en/heidelpay-integration-scos
---

To integrate Heidelpay, follow the steps below:

## Back-end Integration

1. Add sub form plugins and payment method handlers:

<details open>
<summary>Pyz\Yves\CheckoutPage\CheckoutPageDependencyProvider</summary>

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
<br>
</details>

2. Add controller provider:

<details open>
<summary>\Pyz\Yves\ShopApplication\YvesBootstrap</summary>  

    ```php
 protected function getControllerProviderStack($isSsl)
{
	return [
		...
		new HeidelpayControllerProvider($isSsl),
	];>
}
```
<br>
</details>
    
3. Add checkout plugins:
 
 <details open>
<summary>\Pyz\Zed\Checkout\CheckoutDependencyProvider</summary>

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
<br>
</details>

4. Add OMS commands and conditions:

<details open>
<summary>\Pyz\Zed\Oms\OmsDependencyProvider</summary>

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
<br>
</details>

## Front-end Integration

To make Heidelpay module work with your project, it's necessary to extend the frontend part:

<details open>
<summary>tsconfig.json</summary>
 
 ```json
 "include": [
 "./vendor/spryker/spryker-shop/**/*",
 "./vendor/spryker-eco/**/*",
 "./src/Pyz/Yves/**/*"
],
```
<br>
</details>


<details open>
<summary>frontend/settings.js</summary>

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
<br>
</details>

 <details open>
<summary>src/Pyz/Yves/CheckoutPage/Theme/default/views/payment/payment.twig</summary>

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
<br>
</details>

 <details open>
<summary>src/Pyz/Yves/Twig/TwigConfig.php</summary>

 ```twig
 protected function addCoreTemplatePaths(array $paths)
{
 ...
 $paths[] = APPLICATION_VENDOR_DIR . '/spryker-eco/%1$s/src/SprykerEco/Yves/%1$s/Theme/' . $themeName;

 return $paths;
}
```
<br>
</details>

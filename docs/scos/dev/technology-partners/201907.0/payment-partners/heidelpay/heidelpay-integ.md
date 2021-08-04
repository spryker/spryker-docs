---
title: Heidelpay - Integration into the Legacy Demoshop
originalLink: https://documentation.spryker.com/v3/docs/heidelpay-integration
redirect_from:
  - /v3/docs/heidelpay-integration
  - /v3/docs/en/heidelpay-integration
---

**Configuration**
You can copy over configs to your config from the Heidelpay's module `config.dist.php` file.
The most important configuration items are explained in the table below, make sure to get the required configuration items from Heidelpay:

| Configuration key* | Description | Obtained from Heidelpay? | Value for debugging |
| --- | --- | --- | --- |
|  `CONFIG_HEIDELPAY_SECURITY_SENDER` | Hash which is needed for making requests to Heidelpay payment system | Yes | See "Authentifizierungsdaten" section in `https://dev.heidelpay.de/sandbox-environment`|
|  `CONFIG_HEIDELPAY_USER_LOGIN` | Merchant login to the Heidelpay payment system | Yes | See "Authentifizierungsdaten" section in `https://dev.heidelpay.de/sandbox-environment`|
|  `CONFIG_HEIDELPAY_USER_PASSWORD` | Merchant password to the Heidelpay payment system | Yes | See "Authentifizierungsdaten" section in `https://dev.heidelpay.de/sandbox-environment` |
|  `CONFIG_HEIDELPAY_TRANSACTION_CHANNEL_[YOUR_CHANNEL_NAME]**` | Transaction channel hash used for specified payment method in Heidelpay payment system, necessary for making API requests. | Yes | See "Authentifizierungsdaten" section for each payment method in `https://dev.heidelpay.de/sandbox-environment` |
|  `CONFIG_HEIDELPAY_APPLICATION_SECRET` | Internal secret key, used by Heidelpay to "sign" API requests | Recommended |  `debug_secret` |
|  `CONFIG_HEIDELPAY_PAYMENT_RESPONSE_URL` | A response URL used by Heidelpay to send Payment results to the system when the order is made. Make sure it is accessible from outside! | No | If your dev (staging/whatever) system is not accessible from outside, see "Usage from localhost" section below to figure out how to debug the system when developing locally. |
|  `CONFIG_YVES_CHECKOUT_ASYNC_RESPONSE_URL` | A response URL used by Secure Credit Card payment method on the payment step of the checkout. Heidelpay payment system will use it to send asynchronous credit card registration response. | No | If your dev (staging/whatever) system is not accessible from outside, see "Usage from localhost" section below to figure out how to debug the system when developing locally. |
Configuration keys are used as follows: `$config[HeidelpayConstants::CONFIGURATION_KEY_HERE] = 'CONFIGURATION VALUE HERE'`<br>
** Repeat this configuration for each payment method you're going to use.<br>
<br>
Based on the payment methods you're going to use, remove unnecessary processes from `OmsConstants::ACTIVE_PROCESSES` and `SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING`. Please see example of the configuration below: 
```php
// Navigation
$YVES_HOST_PROTOCOL = 'http';

$config[HeidelpayConstants::CONFIG_YVES_CHECKOUT_SUCCESS_URL] = $YVES_HOST_PROTOCOL . '://' . $config[ApplicationConstants::HOST_YVES] . '/checkout/success';
$config[HeidelpayConstants::CONFIG_YVES_URL] = $YVES_HOST_PROTOCOL . '://' . $config[ApplicationConstants::HOST_YVES];
$config[HeidelpayConstants::CONFIG_YVES_CHECKOUT_PAYMENT_FAILED_URL] = $YVES_HOST_PROTOCOL . '://' . $config[ApplicationConstants::HOST_YVES] . '/heidelpay/payment-failed?error_code=%s';
$config[HeidelpayConstants::CONFIG_YVES_CHECKOUT_IDEAL_AUTHORIZE_URL] = $YVES_HOST_PROTOCOL . '://' . $config[ApplicationConstants::HOST_YVES] . '/heidelpay/ideal-authorize';
$config[HeidelpayConstants::CONFIG_YVES_CHECKOUT_SUMMARY_STEP_URL] = $YVES_HOST_PROTOCOL . '://' . $config[ApplicationConstants::HOST_YVES] . '/checkout/summary';
$config[HeidelpayConstants::CONFIG_YVES_CHECKOUT_ASYNC_RESPONSE_URL] = $YVES_HOST_PROTOCOL . '://' . $config[ApplicationConstants::HOST_YVES] . '/heidelpay/cc-register-response';

// Error handling
$config[ErrorHandlerConstants::DISPLAY_ERRORS] = true;
$config[ErrorHandlerConstants::ERROR_RENDERER] = WebExceptionErrorRenderer::class;

// Heidelpay API
$config[HeidelpayConstants::CONFIG_HEIDELPAY_SECURITY_SENDER] = 'CONFIG_HEIDELPAY_SECURITY_SENDER';
$config[HeidelpayConstants::CONFIG_HEIDELPAY_USER_LOGIN] = 'CONFIG_HEIDELPAY_USER_LOGIN';
$config[HeidelpayConstants::CONFIG_HEIDELPAY_USER_PASSWORD] = 'CONFIG_HEIDELPAY_USER_PASSWORD';

$config[HeidelpayConstants::CONFIG_HEIDELPAY_TRANSACTION_CHANNEL_CC_3D_SECURE] = 'CONFIG_HEIDELPAY_TRANSACTION_CHANNEL_CC_3D_SECURE';
$config[HeidelpayConstants::CONFIG_HEIDELPAY_TRANSACTION_CHANNEL_PAYPAL] = 'CONFIG_HEIDELPAY_TRANSACTION_CHANNEL_PAYPAL';
$config[HeidelpayConstants::CONFIG_HEIDELPAY_TRANSACTION_CHANNEL_IDEAL] = 'CONFIG_HEIDELPAY_TRANSACTION_CHANNEL_IDEAL';
$config[HeidelpayConstants::CONFIG_HEIDELPAY_TRANSACTION_CHANNEL_SOFORT] = 'CONFIG_HEIDELPAY_TRANSACTION_CHANNEL_SOFORT';

// Shop configuration values
$config[HeidelpayConstants::CONFIG_HEIDELPAY_APPLICATION_SECRET] = 'application_secret';
$config[HeidelpayConstants::CONFIG_HEIDELPAY_SANDBOX_REQUEST] = true;

$config[HeidelpayConstants::CONFIG_HEIDELPAY_LANGUAGE_CODE] = 'DE';
$config[HeidelpayConstants::CONFIG_HEIDELPAY_PAYMENT_RESPONSE_URL] = $YVES_HOST_PROTOCOL . '://' . $config[ApplicationConstants::HOST_YVES] . '/heidelpay/payment';

$config[HeidelpayConstants::CONFIG_YVES_CHECKOUT_SUCCESS_URL] = $YVES_HOST_PROTOCOL . '://' . $config[ApplicationConstants::HOST_YVES] . '/checkout/success';
$config[HeidelpayConstants::CONFIG_YVES_URL] = $YVES_HOST_PROTOCOL . '://' . $config[ApplicationConstants::HOST_YVES];
$config[HeidelpayConstants::CONFIG_YVES_CHECKOUT_PAYMENT_FAILED_URL] = $YVES_HOST_PROTOCOL . '://' . $config[ApplicationConstants::HOST_YVES] . '/heidelpay/payment-failed?error_code=%s';
$config[HeidelpayConstants::CONFIG_YVES_CHECKOUT_IDEAL_AUTHORIZE_URL] = $YVES_HOST_PROTOCOL . '://' . $config[ApplicationConstants::HOST_YVES] . '/heidelpay/ideal-authorize';
$config[HeidelpayConstants::CONFIG_YVES_CHECKOUT_PAYMENT_STEP_PATH] = '/checkout/payment';
$config[HeidelpayConstants::CONFIG_YVES_CHECKOUT_SUMMARY_STEP_URL] = $YVES_HOST_PROTOCOL . '://' . $config[ApplicationConstants::HOST_YVES] . '/checkout/summary';
$config[HeidelpayConstants::CONFIG_YVES_CHECKOUT_ASYNC_RESPONSE_URL] = $YVES_HOST_PROTOCOL . '://' . $config[ApplicationConstants::HOST_YVES] . '/heidelpay/cc-register-response';

$config[HeidelpayConstants::CONFIG_YVES_CHECKOUT_PAYMENT_FRAME_CUSTOM_CSS_URL] = '';
$config[HeidelpayConstants::CONFIG_YVES_CHECKOUT_PAYMENT_FRAME_PREVENT_ASYNC_REDIRECT] = "FALSE";
$config[HeidelpayConstants::CONFIG_ENCRYPTION_KEY] = "encryption_key";

// Heidelpay Split-payment marketplace logic
$config[HeidelpayConstants::CONFIG_IS_SPLIT_PAYMENT_ENABLED_KEY] = true;
```
**Add dependencies to `src/Pyz/Yves/Checkout/CheckoutDependencyProvider.php`:**

```php
class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
...
	/**
	 * @param \Spryker\Yves\Kernel\Container $container
	 *
	 * @return \Spryker\Yves\Kernel\Container
  	 */
	protected function providePlugins(Container $container)
...
		return $pimplePlugin->getApplication();
	};

+	$container[static::PAYMENT_SUB_FORMS] = function () {
+		$paymentSubFormPlugin = new SubFormPluginCollection();
+
+		$paymentSubFormPlugin->add(new HeidelpaySofortSubFormPlugin());
+		$paymentSubFormPlugin->add(new HeidelpayPaypalAuthorizeSubFormPlugin());
+		$paymentSubFormPlugin->add(new HeidelpayPaypalDebitSubFormPlugin());
+		$paymentSubFormPlugin->add(new HeidelpayIdealSubFormPlugin());
+		$paymentSubFormPlugin->add(new HeidelpayEasyCreditSubFormPlugin());
+ 		$paymentSubFormPlugin->add(new HeidelpayCreditCardSecureSubFormPlugin());
+			 return $paymentSubFormPlugin;
+ };
+ $container[static::PAYMENT_METHOD_HANDLER] = function () {
+ 		$paymentMethodHandler = new StepHandlerPluginCollection();
+ 		$paymentMethodHandler->add(new HeidelpayHandlerPlugin(), PaymentTransfer::HEIDELPAY_SOFORT);
+ 		$paymentMethodHandler->add(new HeidelpayHandlerPlugin(), PaymentTransfer::HEIDELPAY_PAYPAL_AUTHORIZE);
+ 		$paymentMethodHandler->add(new HeidelpayHandlerPlugin(), PaymentTransfer::HEIDELPAY_PAYPAL_DEBIT);
+ 		$paymentMethodHandler->add(new HeidelpayHandlerPlugin(), PaymentTransfer::HEIDELPAY_IDEAL);
+		$paymentMethodHandler->add(new HeidelpayHandlerPlugin(), PaymentTransfer::HEIDELPAY_EASY_CREDIT);
+ 		$paymentMethodHandler->add(new HeidelpayHandlerPlugin(), PaymentTransfer::HEIDELPAY_CREDIT_CARD_SECURE);
+
+		return $paymentMethodHandler;
+ };
+ return $container; }
+ 
+
```

**Add dependency to `src/Pyz/Zed/Oms/OmsDependencyProvider.php`:**

```php

 class OmsDependencyProvider extends SprykerOmsDependencyProvider
 {
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
...

+
+        $container->extend(static::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {
+            $conditionCollection
+                ->add(new IsAuthorizationCompletedPlugin(), 'Heidelpay/IsAuthorizationCompleted')
+                ->add(new IsDebitCompletedPlugin(), 'Heidelpay/IsDebitCompleted')
+                ->add(new IsCaptureApprovedPlugin(), 'Heidelpay/IsCaptureApproved');
+
+
+            return $conditionCollection;
+        });
+
+        $container->extend(static::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
+            $commandCollection
+                ->add(new AuthorizePlugin(), 'Heidelpay/Authorize')
+                ->add(new DebitPlugin(), 'Heidelpay/Debit')
+                ->add(new CapturePlugin(), 'Heidelpay/Capture');
+            return $commandCollection;
+        });
+
         return $container;
     }
 ```
In case of need to use marketplace integration, you should extend product with the additional field Heidelpay Item Channel Id, before order will be placed. For example, setting your Heidelpay Item Channel ID can look like:

```php
...
$product->setHeidelpayItemChannelId('........');
```

**Add dependencies to `src/Pyz/Zed/Payment/PaymentDependencyProvider.php`:**

```php
...

+class PaymentDependencyProvider extends  SprykerPaymentDependencyProvider
+{
+
+
+    public function provideBusinessLayerDependencies(Container $container)
+    {
+        $container = parent::provideBusinessLayerDependencies($container);
+        $container->extend(static::CHECKOUT_PLUGINS, function (CheckoutPluginCollection $pluginCollection) {
+            $pluginCollection->add(new HeidelpaySaveOrderPlugin(), HeidelpayConfig::PROVIDER_NAME, PaymentDependencyProvider::CHECKOUT_ORDER_SAVER_PLUGINS);
+            $pluginCollection->add(new HeidelpayPostSavePlugin(), HeidelpayConfig::PROVIDER_NAME, PaymentDependencyProvider::CHECKOUT_POST_SAVE_PLUGINS);
+            return $pluginCollection;
+        });
+
+
+    }
+}
```

**Add Heidelpay's controller provider to the Yve's bootstrap:**

```php...
use SprykerEco\Yves\Heidelpay\Plugin\Provider\HeidelpayControllerProvider;
 
class YvesBootstrap
{
...
protected function getControllerProviderStack($isSsl)
{
    return [
        ...
        new HeidelpayControllerProvider($isSsl),
    ];
}
...
```

**Setup database and DTOs**
The Heidelpay-Bundle will integrate 3 new tables to your database scheme. Make sure that you integrate them in accordance with your project migration guideline. (e.g. run console `propel:diff` to see the migrations needed).

```php
console propel:diff && console propel:migrate && console propel:model:build
```

You also have to genreate data transfer objects which is related with Heidelpay

```php
console tr:ge
```
**Change payment step template**
Change the following lines to change behavior on the payment selection step:

```php
+++ b/src/Pyz/Yves/Checkout/Theme/default/checkout/payment.twig
@@ -11,22 +11,17 @@

             <div class="callout">
                 <ul class="no-bullet">
-                    {% raw %}{%{% endraw %} for name, choices in paymentForm.paymentSelection.vars.choices {% raw %}%}{% endraw %}
-
-                        <h4>{% raw %}{{{% endraw %} ('checkout.payment.provider.' ~ name) | trans {% raw %}}}{% endraw %}</h4>
-
-                        {% raw %}{%{% endraw %} for key, choice in choices {% raw %}%}{% endraw %}
-                            <li>  &nbsp;
-                                {% raw %}{{{% endraw %} form_widget(paymentForm.paymentSelection[key], {'attr': {'class': '__toggler'{% raw %}}}{% endraw %}) {% raw %}}}{% endraw %}
-                                {% raw %}{{{% endraw %} form_label(paymentForm.paymentSelection[key]) {% raw %}}}{% endraw %}
-                                <div class="__toggler-target">
-                                    <div class="row columns">
-                                        {% raw %}{{{% endraw %} checkout.include_subform(paymentForm[paymentForm.paymentSelection[key].vars.value]) {% raw %}}}{% endraw %}
-                                    </div>
+                    {% raw %}{%{% endraw %} for method in paymentForm.paymentSelection {% raw %}%}{% endraw %}
+                        <li>
+                            {% raw %}{{{% endraw %} form_widget(method, {'attr': {'class': '__toggler'{% raw %}}}{% endraw %}) {% raw %}}}{% endraw %}
+                            {% raw %}{{{% endraw %} form_label(method) {% raw %}}}{% endraw %}
+                            <div class="__toggler-target">
+                                <div class="row columns">
+                                    {% raw %}{{{% endraw %} checkout.include_subform(paymentForm[method.vars.value]) {% raw %}}}{% endraw %}
                                 </div>
-                            </li>
-                        {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
-
+                                {% raw %}{%{% endraw %} if not loop.last {% raw %}%}{% endraw %}<hr>{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
+                            </div>
+                        </li>
                     {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}
                 </ul>
             </div>
```

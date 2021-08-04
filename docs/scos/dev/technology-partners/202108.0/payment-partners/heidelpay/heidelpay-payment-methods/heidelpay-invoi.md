---
title: Heidelpay - Invoice Secured B2C
originalLink: https://documentation.spryker.com/2021080/docs/heidelpay-invoice-secured-b2c
redirect_from:
  - /2021080/docs/heidelpay-invoice-secured-b2c
  - /2021080/docs/en/heidelpay-invoice-secured-b2c
---

## Setup
The following configuration should be made after Heidelpay has been [installed](/docs/scos/dev/technology-partners/202001.0/payment-partners/heidelpay/heidelpay-insta) and [integrated](/docs/scos/dev/technology-partners/202001.0/payment-partners/heidelpay/scos-integration/heidelpay-integ).

## Configuration
```php
$config[HeidelpayConstants::CONFIG_HEIDELPAY_TRANSACTION_CHANNEL_INVOICE_SECURED_B2C] = ''; //You can use public test account for testing with channel `31HA07BC8142C5A171749A60D979B6E4` but replace it with real one when you go live. Config should be taken from Heidelpay.
 
$config[OmsConstants::PROCESS_LOCATION] = [
	...
	APPLICATION_ROOT_DIR . '/vendor/spryker-eco/heidelpay/config/Zed/Oms',
];
 
$config[OmsConstants::ACTIVE_PROCESSES] = [
	...
	'HeidelpayInvoiceSecuredB2c01',
];
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
	...
	HeidelpayConfig::PAYMENT_METHOD_INVOICE_SECURED_B2C => 'HeidelpayInvoiceSecuredB2c01',
];
```
## Notifications
Heidelpay InvoiceSecuredB2C payment method uses push notifications to inform the shop about the results of the transaction. An HTTP post request sends a push notification to a shop URL. The push notification contains the transaction response in XML format with all necessary data related to payment and transaction type. Headers of the HTTP request contain information about timestamp when the notification was sent and the number of retries. The body of the HTTP POST request includes the XML response of the reported transaction. There is no additional parameter encoding available; it is posted raw "text/xml". To confirm the notification, the shop server must reply with the HTTP status code "200". All other HTTP status codes are considered as an error, and a resend of the notification. Delivery is repeated up to 30 times if the merchant's server has not responded with HTTP status code "200“. The periods between the trials are increasing.
Notification URL for your website is `http://mysprykershop.com/heidelpay/notification`. It should be set up on Heidelpay's side with the help of Heidelpay support team.


## Integration into Project
All global integration parts of Heidelpay module should be done before the following steps.

1. Adjust `CheckoutPageDependencyProvider` on project level to add `InvoiceSecuredB2c` subform and payment method handler.

\Pyz\Yves\CheckoutPage\CheckoutPageDependencyProvider
    
```php
<?php
 
namespace Pyz\Yves\CheckoutPage;
 
use Spryker\Yves\Kernel\Container;
use Spryker\Yves\StepEngine\Dependency\Plugin\Form\SubFormPluginCollection;
use Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginCollection;
use SprykerEco\Shared\Heidelpay\HeidelpayConfig;
use SprykerEco\Yves\Heidelpay\Plugin\HeidelpayHandlerPlugin;
use SprykerEco\Yves\Heidelpay\Plugin\Subform\HeidelpayInvoiceSecuredB2cSubFormPlugin;
use SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerShopCheckoutPageDependencyProvider;
 
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
	protected function extendSubFormPluginCollection(Container $container): Container
	{
		$container->extend(static::PAYMENT_SUB_FORMS, function (SubFormPluginCollection $subFormPluginCollection) {
			...
			$subFormPluginCollection->add(new HeidelpayInvoiceSecuredB2cSubFormPlugin());
 
			return $subFormPluginCollection;
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
		$container->extend(static::PAYMENT_METHOD_HANDLER, function (StepHandlerPluginCollection $stepHandlerPluginCollection) {
			...
			$stepHandlerPluginCollection->add(new HeidelpayHandlerPlugin(), HeidelpayConfig::PAYMENT_METHOD_INVOICE_SECURED_B2C);
 
			return $stepHandlerPluginCollection;
		});
 
		return $container;
	}
}
```

2. Adjust define data section in the template of the Checkout Payment step to include `InvoiceSecuredB2c` payment method template.

src/Pyz/Yves/CheckoutPage/Theme/default/views/payment/payment.twig

```php
...
{% raw %}{%{% endraw %} define data = {
	backUrl: _view.previousStepUrl,
	forms: {
		payment: _view.paymentForm
	},
 
	title: 'checkout.step.payment.title' | trans,
	customForms: {
		...
		'heidelpay/invoice-secured-b2c': ['invoice-secured-b2c', 'heidelpay'],
	}
} {% raw %}%}{% endraw %}
...
```

3. Adjust `OmsDependencyProvider` to add conditions that represent notification receiving.

\Pyz\Zed\Oms\OmsDependencyProvider

```php
<?php
 
namespace Pyz\Zed\Oms;
 
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandCollectionInterface;
use Spryker\Zed\Oms\Dependency\Plugin\Condition\ConditionCollectionInterface;
use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use SprykerEco\Zed\Heidelpay\Communication\Plugin\Checkout\Oms\Condition\IsAuthorizationFailedPlugin;
use SprykerEco\Zed\Heidelpay\Communication\Plugin\Checkout\Oms\Condition\IsAuthorizationFinishedPlugin;
use SprykerEco\Zed\Heidelpay\Communication\Plugin\Checkout\Oms\Condition\IsFinalizingFailedPlugin;
use SprykerEco\Zed\Heidelpay\Communication\Plugin\Checkout\Oms\Condition\IsFinalizingFinishedPlugin;
use SprykerEco\Zed\Heidelpay\Communication\Plugin\Checkout\Oms\Condition\IsOrderPaidPlugin;
 
 
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
		$container = $this->extendConditionPlugins($container);
 
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
			$conditionCollection->add(new IsAuthorizationFinishedPlugin(), 'Heidelpay/IsAuthorizationFinished');
			$conditionCollection->add(new IsAuthorizationFailedPlugin(), 'Heidelpay/IsAuthorizationFailed');
			$conditionCollection->add(new IsFinalizingFinishedPlugin(), 'Heidelpay/IsFinalizingFinished');
			$conditionCollection->add(new IsFinalizingFailedPlugin(), 'Heidelpay/IsFinalizingFailed');
			$conditionCollection->add(new IsOrderPaidPlugin(), 'Heidelpay/IsOrderPaid');
 
			return $conditionCollection;
		});
 
		return $container;
	}
}
```

## Bank Account Information
After a customer placed an order, we receive payment response with information about bank account information where the customer has to pay. This information is stored into DB in `spy_payment_heidelpay.connector_invoice_account_info`. This information can be sent to the customer in the order confirmation e-mail or customer can be notified about this information in any other way.

{% info_block errorBox "Attention" %}
As far as we receive payment response from Heidelpay asynchronously, we can never be sure that the bank account information is stored in the DB before the customer is redirected to the checkout success page.
{% endinfo_block %}

## OMS State Machine
You can find an example of InvoiceSecuredB2c state machine in `vendor/spryker-eco/heidelpay/config/Zed/Oms/HeidelpayInvoiceSecuredB2c01.xml`

The state machine includes two main processes: Authorization and Finalize. After the order is placed successfully, the authorization process starts. After success authorization call, state machine expects to receive a notification to get information about finishing authorization transaction. If successful notification received finalize process starts. Notification behavior for completing the process is the same as for authorization. After the order was successfully finalized, the state machine waits for receiving notifications with information about customer payment. If the order was fully paid, the shipment process could be started.

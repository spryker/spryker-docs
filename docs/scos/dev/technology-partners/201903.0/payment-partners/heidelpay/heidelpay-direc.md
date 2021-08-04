---
title: Heidelpay - Direct Debit
originalLink: https://documentation.spryker.com/v2/docs/heidelpay-direct-debit
redirect_from:
  - /v2/docs/heidelpay-direct-debit
  - /v2/docs/en/heidelpay-direct-debit
---

## Setup
The following configuration should be made after Heidelpay has been [installed](/docs/scos/dev/technology-partners/201903.0/payment-partners/heidelpay/heidelpay-insta) and [integrated](/docs/scos/dev/technology-partners/201903.0/payment-partners/heidelpay/scos-integration/heidelpay-integ).

## Configuration
```php
$config[HeidelpayConstants::CONFIG_HEIDELPAY_TRANSACTION_CHANNEL_DIRECT_DEBIT] = ''; //You can use public test account for testing with channel `31HA07BC8142C5A171749A60D979B6E4` but replace it with real one when you go live. Config should be taken from Heidelpay.
$config[HeidelpayConstants::DIRECT_DEBIT_REGISTRATION_ASYNC_RESPONSE_URL] = $config[HeidelpayConstants::CONFIG_YVES_URL] . '/heidelpay/dd-register-response'; // This setting is store sensitive and should be set in store related config (config_default_DE.php for example).
 
$config[OmsConstants::PROCESS_LOCATION] = [
	...
	APPLICATION_ROOT_DIR . '/vendor/spryker-eco/heidelpay/config/Zed/Oms',
];
 
$config[OmsConstants::ACTIVE_PROCESSES] = [
	...
	'HeidelpayDirectDebit01',
];
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
	...
HeidelpayConfig::PAYMENT_METHOD_DIRECT_DEBIT => 'HeidelpayDirectDebit01',
];
```
## The Process of a Direct Debit Account Registration
Payment flow with direct debit is divided into two workflows - based on the new "Registration," and without/with the existing "Registration." Existing "Registration" means that customer's bank account data (IBAN, Account Holder and so on) will be persisted in the database to use it again next time if customer uses the same shipping address. Otherwise, use the new "Registration" option.

When you go to the checkout payment page and choose the DirectDebit payment method, there are two payment options - to use the already existing registration (if available) or to create a new registration (always available) with the two fields IBAN and Account Holder. Existing registration is available only for registered customer after he placed an order with DirectDebit payment method, and he uses the same shipping address.

## Integration into Project
All general integration parts of Heidelpay module should be done before the following steps.

1. Adjust `CheckoutPageDependencyProvider` on project level to add Direct Debit subform and payment method handler. Also, add `HeidelpayClient` into dependencies. It's used in specific `DirectDebitRegistration` checkout step.

<details open>
<summary>\Pyz\Yves\CheckoutPage\CheckoutPageDependencyProvider</summary>

```php
<?php
 
namespace Pyz\Yves\CheckoutPage;
 
use Spryker\Yves\Kernel\Container;
use Spryker\Yves\StepEngine\Dependency\Plugin\Form\SubFormPluginCollection;
use Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginCollection;
use SprykerEco\Shared\Heidelpay\HeidelpayConfig;
use SprykerEco\Yves\Heidelpay\Plugin\HeidelpayDirectDebitHandlerPlugin;
use SprykerEco\Yves\Heidelpay\Plugin\Subform\HeidelpayDirectDebitSubFormPlugin;
use SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerShopCheckoutPageDependencyProvider;
 
class CheckoutPageDependencyProvider extends SprykerShopCheckoutPageDependencyProvider
{
	public const CLIENT_HEIDELPAY = 'CLIENT_HEIDELPAY';
 
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
		$container = $this->addHeidelpayClient($container);
 
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
			$subFormPluginCollection->add(new HeidelpayDirectDebitSubFormPlugin());
 
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
			$stepHandlerPluginCollection->add(new HeidelpayDirectDebitHandlerPlugin(), HeidelpayConfig::PAYMENT_METHOD_DIRECT_DEBIT);
 
			return $stepHandlerPluginCollection;
		});
 
		return $container;
	}
 
	/**
	 * @param \Spryker\Yves\Kernel\Container $container
	 *
	 * @return \Spryker\Yves\Kernel\Container
	 */
	protected function addHeidelpayClient(Container $container): Container
	{
		$container[static::CLIENT_HEIDELPAY] = function () use ($container) {
			return $container->getLocator()->heidelpay()->client();
		};
 
		return $container;
	}
}
```
<br>
</details>

2. Extend `StepFactory` on project level to add specific `DirectDebitRegistration` checkout step. This step should be included right before the Payment step.

<details open>
<summary>\Pyz\Yves\CheckoutPage\Process\StepFactory</summary>

```php
<?php
 
namespace Pyz\Yves\CheckoutPage\Process;
 
use Pyz\Yves\CheckoutPage\CheckoutPageDependencyProvider;
use Pyz\Yves\CheckoutPage\Plugin\Provider\CheckoutPageControllerProvider;
use Spryker\Yves\StepEngine\Dependency\Step\StepInterface;
use Spryker\Yves\StepEngine\Process\StepCollection;
use SprykerEco\Client\Heidelpay\HeidelpayClientInterface;
use SprykerEco\Yves\Heidelpay\CheckoutPage\Process\Steps\HeidelpayDirectDebitRegistrationStep;
use SprykerShop\Yves\CheckoutPage\Process\StepFactory as BaseStepFactory;
use SprykerShop\Yves\HomePage\Plugin\Provider\HomePageControllerProvider;
 
/**
 * @method \SprykerShop\Yves\CheckoutPage\CheckoutPageConfig getConfig()
 */
class StepFactory extends BaseStepFactory
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
			->addStep($this->createHeidelpayDirectDebitRegistrationStep())
			->addStep($this->createPaymentStep())
			->addStep($this->createSummaryStep())
			->addStep($this->createPlaceOrderStep())
			->addStep($this->createSuccessStep());
 
		return $stepCollection;
	}
 
	/**
	 * @return \Spryker\Yves\StepEngine\Dependency\Step\StepInterface
	 */
	public function createHeidelpayDirectDebitRegistrationStep(): StepInterface
	{
		return new HeidelpayDirectDebitRegistrationStep(
			CheckoutPageControllerProvider::CHECKOUT_HEIDELPAY_DIRECT_DEBIT_REGISTRATION,
			HomePageControllerProvider::ROUTE_HOME,
			$this->getHeidelpayClient()
		);
	}
 
	/**
	 * @return \SprykerEco\Client\Heidelpay\HeidelpayClientInterface
	 */
	public function getHeidelpayClient(): HeidelpayClientInterface
	{
		return $this->getProvidedDependency(CheckoutPageDependencyProvider::CLIENT_HEIDELPAY);
	}
}
```
<br>
</details>

3. Extend Yves Factory to create `StepFactory` from project level instead of Spryker Core.

<details open>
<summary>\Pyz\Yves\CheckoutPage\CheckoutPageFactory</summary>

```php
<?php
 
namespace Pyz\Yves\CheckoutPage;
 
use Pyz\Yves\CheckoutPage\Process\StepFactory;
use SprykerShop\Yves\CheckoutPage\CheckoutPageFactory as SprykerShopCheckoutPageFactory;
 
class CheckoutPageFactory extends SprykerShopCheckoutPageFactory
{
	/**
	 *  @return \Pyz\Yves\CheckoutPage\Process\StepFactory
	 */
	public function createStepFactory()
	{
		return new StepFactory();
	}
}
```
<br>
</details>

4. Extend `CheckoutController` on the project level to add an action for direct debit registration step.

<details open>
<summary>\Pyz\Yves\CheckoutPage\Controller\CheckoutController</summary>

```php
<?php
 
namespace Pyz\Yves\CheckoutPage\Controller;
 
use SprykerShop\Yves\CheckoutPage\Controller\CheckoutController as BaseCheckoutController;
use Symfony\Component\HttpFoundation\Request;
 
/**
 * @method \SprykerShop\Yves\CheckoutPage\CheckoutPageFactory getFactory()
 */
class CheckoutController extends BaseCheckoutController
{
	public function heidelpayDirectDebitRegistrationAction(Request $request)
	{
		return $this->createStepProcess()->process($request);
	}
}
```
<br>
</details>

5. Extend `CheckoutPageControllerProvider` to register controller action described above.

<details open>
<summary>\Pyz\Yves\CheckoutPage\Controller\CheckoutController</summary>

```php
<?php
 
namespace Pyz\Yves\CheckoutPage\Plugin\Provider;
 
use Silex\Application;
use SprykerShop\Yves\CheckoutPage\Plugin\Provider\CheckoutPageControllerProvider as BaseCheckoutPageControllerProvider;
 
class CheckoutPageControllerProvider extends BaseCheckoutPageControllerProvider
{
	public const CHECKOUT_HEIDELPAY_DIRECT_DEBIT_REGISTRATION = 'checkout-heidelpay-direct-debit-registration';
 
	/**
	 * @param \Silex\Application $app
	 *
	 * @return void
	 */
	protected function defineControllers(Application $app)
	{
		parent::defineControllers($app);
 
		$this->addDirectDebitRegistrationRoute();
	}
 
	/**
	 * @return $this
	 */
	protected function addDirectDebitRegistrationRoute()
	{
		$this->createController(
			'/{checkout}/heidelpay-direct-debit-registration',
			static::CHECKOUT_HEIDELPAY_DIRECT_DEBIT_REGISTRATION,
			'CheckoutPage',
			'Checkout',
			'heidelpayDirectDebitRegistration'
		)
			->assert('checkout', $this->getAllowedLocalesPattern() . 'checkout|checkout')
			->value('checkout', 'checkout')
			->method('GET|POST');
 
		return $this;
	}
}
```
<br>
</details>

6. Adjust define data section in the template of Checkout Payment step to include DirectDebit payment method template.

<details open>
<summary>src/Pyz/Yves/CheckoutPage/Theme/default/views/payment/payment.twig</summary>

```twig
...
{% raw %}{%{% endraw %} define data = {
	backUrl: _view.previousStepUrl,
	forms: {
		payment: _view.paymentForm
	},
 
	title: 'checkout.step.payment.title' | trans,
	customForms: {
		...
		'heidelpay/direct-debit': ['direct-debit', 'heidelpay'],
	}
} {% raw %}%}{% endraw %}
...
```
<br>
</details>

7. Adjust `OmsDependencyProvider` to add debit on registration and refund OMS commands and conditions related to it.

<details open>
<summary>\Pyz\Zed\Oms\OmsDependencyProvider</summary>

```php
<?php
 
namespace Pyz\Zed\Oms;
 
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandCollectionInterface;
use Spryker\Zed\Oms\Dependency\Plugin\Condition\ConditionCollectionInterface;
use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use SprykerEco\Zed\Heidelpay\Communication\Plugin\Checkout\Oms\Command\DebitOnRegistrationPlugin;
use SprykerEco\Zed\Heidelpay\Communication\Plugin\Checkout\Oms\Command\RefundPlugin;
use SprykerEco\Zed\Heidelpay\Communication\Plugin\Checkout\Oms\Condition\IsDebitOnRegistrationCompletedPlugin;
use SprykerEco\Zed\Heidelpay\Communication\Plugin\Checkout\Oms\Condition\IsRefundedPlugin;
 
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
	protected function extendCommandPlugins(Container $container): Container
	{
		$container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
			...
			$commandCollection->add(new DebitOnRegistrationPlugin(), 'Heidelpay/DebitOnRegistration');
			$commandCollection->add(new RefundPlugin(), 'Heidelpay/Refund');
 
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
			$conditionCollection->add(new IsDebitOnRegistrationCompletedPlugin(), 'Heidelpay/IsDebitOnRegistrationCompleted');
			$conditionCollection->add(new IsRefundedPlugin(), 'Heidelpay/IsRefunded');
 
			return $conditionCollection;
		});
 
		return $container;
	}
}
```
<br>
</details>

## OMS State Machine
You can find an example of DirectDebit state machine in `vendor/spryker-eco/heidelpay/config/Zed/Oms/HeidelpayDirectDebit01.xml`

The state machine includes two main processes: **Debit on Registration** and **Refund**. After the order is placed successfully, the debit process starts. In this process, we use the identification of direct debit registration. In case of return order refund process is used.

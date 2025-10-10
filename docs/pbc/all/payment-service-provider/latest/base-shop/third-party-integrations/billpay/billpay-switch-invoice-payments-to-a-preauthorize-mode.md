---
title: Billpay - Switching invoice payments to a preauthorize mode
description: Learn how to switch BillPay invoice payments to a preauthorize mode in Spryker Cloud Commerce OS for enhanced payment processing
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/billpay-payment-methods
originalArticleId: 139410c0-8709-4f24-8016-b5b8afa7b435
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/billpay/billpay-switching-invoice-payments-to-a-preauthorize-mode.html
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/billpay/billpay-switching-invoice-payments-to-a-preauthorize-mode.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/billpay/billpay.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/billpay/billpay-switching-invoice-payments-to-a-preauthorize-mode.html
related:
  - title: Billpay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/billpay/billpay.html
---

Refer to [Billpay payment information](https://www.billpay.de/en/) for information about payment methods.

The identity and credit check are checked within a single "pre-authorize" call after summary page was submitted.
This may lead to the "rejection" of the order.

To switch to the authorize mode, **switch Billpay configuration variables** to "pre-authorize" set of configuration variables:

```php
<?php
b/config/Shared/config_default.php
@@ -364,19 +364,19 @@ $config[TaxConstants::DEFAULT_TAX_RATE] = 19;

...

+//$config[BillpayConstants::BILLPAY_PORTAL_ID] = '[your prescore id e.g. 8111]';//prescore
+//$config[BillpayConstants::BILLPAY_SECURITY_KEY] = '[your prescore security key]';//prescore

+$config[BillpayConstants::BILLPAY_PORTAL_ID] = '[your pre-authorize id e.g. 8112]';//pre-authorize
+$config[BillpayConstants::BILLPAY_SECURITY_KEY] = '[your pre-authorize security key]';//pre-authorize
....
-$config[BillpayConstants::USE_PRESCORE] = 1;
+$config[BillpayConstants::USE_PRESCORE] = 0;
```

## Billpay Invoice Payment with Prescoring

Using the "prescore" scoring model, the identity and credit check is performed before the payment method is selected. The results of the check are then used to display or hide the available payment methods accordingly. This eliminates the negative purchasing experience of a "rejection".

### Configuration

To switch to the authorize mode, **switch Billpay configuration variables** to "pre-score" set of the configuration variables:

```php
<?php
b/config/Shared/config_default.php
@@ -364,19 +364,19 @@ $config[TaxConstants::DEFAULT_TAX_RATE] = 19;

...

+$config[BillpayConstants::BILLPAY_PORTAL_ID] = '[your prescore id e.g. 8111]';//prescore
+$config[BillpayConstants::BILLPAY_SECURITY_KEY] = '[your prescore security key]';//prescore

+//$config[BillpayConstants::BILLPAY_PORTAL_ID] = '[your pre-authorize id e.g. 8112]';//pre-authorize
+//$config[BillpayConstants::BILLPAY_SECURITY_KEY] = '[your pre-authorize security key]';//pre-authorize
....
+$config[BillpayConstants::USE_PRESCORE] = 1;
-$config[BillpayConstants::USE_PRESCORE] = 0;
```

### Customer Setup

In Yves  `CustomerStep` needs to be extended by calling the `BillpayCustomerHandlerPlugin`:

```php
<?php
/**
 * Update QuoteTransfer with customer step handler plugin.
 *
 * @param \Symfony\Component\HttpFoundation\Request $request
 * @param \Spryker\Shared\Kernel\Transfer\AbstractTransfer|\Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
 *
 * @return \Generated\Shared\Transfer\QuoteTransfer
 */
 public function execute(Request $request, AbstractTransfer $quoteTransfer)
 {
 $this->customerStepHandler->get(CheckoutDependencyProvider::CUSTOMER_STEP_HANDLER)->addToDataClass($request, $quoteTransfer);
 $this->customerStepHandler->get(BillpayConstants::PAYMENT_METHOD_INVOICE)->addToDataClass($request, $quoteTransfer);

 return $quoteTransfer;
 }
 ```

Next, extend the `CheckoutDependencyProvider` to return the `StepHandlerPluginCollection`:

```php
<?php
 /**
 * @param \Spryker\Yves\Kernel\Container $container
 *
 * @return \Spryker\Yves\Kernel\Container
 */
 protected function providePlugins(Container $container)
 {
 parent::providePlugins($container);

 $container[self::PLUGIN_CUSTOMER_STEP_HANDLER] = function () {
 $plugins = new StepHandlerPluginCollection();
 $plugins->add(new BillpayCustomerHandlerPlugin(), BillpayConstants::PAYMENT_METHOD_INVOICE);
 $plugins->add(new CustomerStepHandler(), self::CUSTOMER_STEP_HANDLER);
 return $plugins;
 };
 ```

Lastly, change the `CustomerStep` constructor:

```php
<?php
 /**
 * @param \Pyz\Client\Customer\CustomerClientInterface $customerClient
 * @param \Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginCollection $customerStepHandler
 * @param string $stepRoute
 * @param string $escapeRoute
 */
 public function __construct(
 CustomerClientInterface $customerClient,
 StepHandlerPluginCollection $customerStepHandler,
 $stepRoute,
 $escapeRoute
 ) {
 parent::__construct($stepRoute, $escapeRoute);

 $this->customerClient = $customerClient;
 $this->customerStepHandler = $customerStepHandler;
 }
 ```

### Shipment Step

One of the places we can call prescore is the shipment step.

At this point, the checkout process can provide us with all the information we need to do prescoring.

To do prescoring, add the Billpay client to Shippment step by modifying the StepFactory:

```php
<?php
 /**
 * @return \Pyz\Yves\Checkout\Process\Steps\ShipmentStep
 */
 protected function createShipmentStep()
 {
 return new ShipmentStep(
 $this->getCalculationClient(),
 $this->getProvidedDependency(CheckoutDependencyProvider::CLIENT_BILLPAY),
 $this->createShipmentPlugins(),
 CheckoutControllerProvider::CHECKOUT_SHIPMENT,
 ApplicationControllerProvider::ROUTE_HOME
 );
 }
 ```

Then register the client in `CheckoutDependencyProvider`.

 ```php
 <?php

/src/Pyz/Yves/Checkout/CheckoutDependencyProvider.php

+use Spryker\Yves\StepEngine\Dependency\Plugin\Form\SubFormPluginCollection;
+use SprykerEco\Shared\Billpay\BillpaySharedConfig;

+use SprykerEco\Yves\Billpay\Plugin\BillpayInvoiceSubFormPlugin;
+use SprykerEco\Yves\Billpay\Plugin\BillpayPaymentHandlerPlugin;

 class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
 {
@@ -33,9 +37,8 @@ class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
 const PLUGIN_SHIPMENT_HANDLER = 'PLUGIN_SHIPMENT_HANDLER';
 const PLUGIN_SHIPMENT_FORM_DATA_PROVIDER = 'PLUGIN_SHIPMENT_FORM_DATA_PROVIDER';

- const PAYMENT_METHOD_HANDLER = 'PAYMENT_METHOD_HANDLER';
 const CUSTOMER_STEP_HANDLER = 'CUSTOMER STEP HANDLER';
- const PAYMENT_SUB_FORMS = 'PAYMENT_SUB_FORMS';
+
 const CLIENT_BILLPAY = 'CLIENT_BILLPAY';

 /**
 * @param \Spryker\Yves\Kernel\Container $container
 *
 * @return \Spryker\Yves\Kernel\Container
 */
 protected function providePlugins(Container $container)
 $container = parent::providePlugins($container);

 $container[self::PAYMENT_SUB_FORMS] = function () {
 $paymentSubForms = new SubFormPluginCollection();
 $paymentSubForms->add(new BillpayInvoiceSubFormPlugin());
 return $paymentSubForms;
 };

 $container[self::PAYMENT_METHOD_HANDLER] = function () {
 $paymentMethodHandler = new StepHandlerPluginCollection();
 $paymentMethodHandler->add(
 new BillpayPaymentHandlerPlugin(),
 BillpaySharedConfig::PAYMENT_METHOD_INVOICE
 );
 return $paymentMethodHandler;
 };

 ...

 /**
 * @param \Spryker\Yves\Kernel\Container $container
 *
 * @return \Spryker\Yves\Kernel\Container
 */
 protected function provideClients(Container $container)
 {

 // other clients ...

 $container[self::CLIENT_BILLPAY] = function (Container $container) {
 return $container->getLocator()->billpay()->client();
 };

 return $container;
 }
 ```

Now all we need to do is modify the Shippment step constructor:

```php
<?php
/**
 * @param \Spryker\Client\Calculation\CalculationClientInterface $calculationClient
 * @param \Spryker\Client\Billpay\BillpayClientInterface $billpayClient
 * @param \Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginCollection $shipmentPlugins
 * @param string $stepRoute
 * @param string $escapeRoute
 */
 public function __construct(
 CalculationClientInterface $calculationClient,
 BillpayClientInterface $billpayClient,
 StepHandlerPluginCollection $shipmentPlugins,
 $stepRoute,
 $escapeRoute
 ) {
 parent::__construct($stepRoute, $escapeRoute);

 $this->calculationClient = $calculationClient;
 $this->shipmentPlugins = $shipmentPlugins;
 $this->billpayClient = $billpayClient;
 }
 ```

and add a client call to the execute method:

```php
<?php
 /**
 * @param \Symfony\Component\HttpFoundation\Request $request
 * @param \Generated\Shared\Transfer\QuoteTransfer|\Spryker\Shared\Kernel\Transfer\AbstractTransfer|\Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
 *
 * @return \Generated\Shared\Transfer\QuoteTransfer
 */
 public function execute(Request $request, AbstractTransfer $quoteTransfer)
 {
 $shipmentHandler = $this->shipmentPlugins->get(CheckoutDependencyProvider::PLUGIN_SHIPMENT_STEP_HANDLER);
 $shipmentHandler->addToDataClass($request, $quoteTransfer);

 $quoteTransfer = $this->calculationClient->recalculate($quoteTransfer);

 //added prescoring step
 if (Config::get(BillpayConstants::USE_PRESCORE)) {
 $this->billpayClient->prescorePayment($quoteTransfer);
 }

 return $quoteTransfer;
 }
 ```

### Optional: Twig Extension

To populate the Billpay JS widget with data, use the Twig extension provided in the Billpay module.

To register the Twig extension, add it to YvesBootstrap as follows:

```php
protected function registerServiceProviders()
 {
 // other service providers ...
 $this->application->register(new TwigBillpayServiceProvider());
 }
 ```

**List of all available identifiers**:

| NAME| DESCRIPTION | NOTES |
| --- | --- | --- |
| `salutation` | Customer salutation | Taken from billing address |
| `firstName` | Customer first name | Taken from billing address |
| `lastName` | Customer last name | Taken from billing address |
| `address` | Customer billing address street name | for example, Main Street |
| `addressNo` | Customer billing address street name extension | for example, 3a |
| `zip` | Billing address postal number | for example, 10317 |
| `city` | Billing address city | for example, Berlin |
| `phone` | Customer telephone number |  |
| `dateOfBirth` | Customer date of birth | Entered at payment step |
| `cartAmount` | Total value of cart items with discounts | Equal to cart amount |
| `orderAmount` | Total value of order |  |
| `currency` | currrency iso code | Defined in store configuration |
| `language` | Current user language |  |
| `countryIso3Code` | Country iso3 code i.e deu | Defined in store configuration |
| `countryIso2Code` | Country iso2 code i.e de | Defined in store configuration |
| `identifier` | Unique session identifier | Autogenerated |
| `apiKey` | Billpay api key | Defined in config under key `BILLPAY_PUBLIC_API_KEY` |

### Checking Your Setup

You should be able to see the Billpay invoice on payment step of your checkout step. If you receive the "method not available" message when you select **Billpay invoice** at the payment step, check the `spy_payment_billpay_api_log` table in your database for logs.

## Zed

In Zed  `BillpaySaveOrderPlugin` has to be registered in the `CheckoutDependencyProvider`:

```php
<?php
 /**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Spryker\Zed\Checkout\Dependency\Plugin\CheckoutSaveOrderInterface[]
 */
 protected function getCheckoutOrderSavers(Container $container)
 {
 return [
 // other plugins ...

 new BillpaySaveOrderPlugin(),
 ];
 }
 ```

Then the following should be added in `OmsDependencyProvider`:

```php
<?php
/**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Spryker\Zed\Oms\Communication\Plugin\Oms\Condition\ConditionCollection
 */
 protected function getConditionPlugins(Container $container)
 {
 $collection = parent::getConditionPlugins($container);

 $collection->add(new IsInvoicePaidConditionPlugin(), 'Billpay/IsInvoicePaid');
 $collection->add(new IsPreauthorizedConditionPlugin(), 'Billpay/IsPreauthorized');
 $collection->add(new IsCancelledConditionPlugin(), 'Billpay/IsCancelled');
 $collection->add(new IsItemCancelledConditionPlugin(), 'Billpay/IsItemCancelled');

 return $collection;
 }

 /**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Spryker\Zed\Oms\Communication\Plugin\Oms\Command\CommandCollection
 */
 protected function getCommandPlugins(Container $container)
 {
 $collection = parent::getCommandPlugins($container);

 $collection->add(new PreauthorizeCommandPlugin(), 'Billpay/Preauthorize');
 $collection->add(new InvoiceCreatedCommandPlugin(), 'Billpay/InvoiceCreated');
 $collection->add(new CancelOrderCommandPlugin(), 'Billpay/CancelOrder');
 $collection->add(new CancelItemCommandPlugin(), 'Billpay/CancelItem');

 return $collection;
 }
 ```

### Check Your Settings

In your checkout process you can now see the Billapay as a payment method in the payment checkout step. If you log in to ZED, you will find the OMS state machine registered under `http://mysprykershop.com/oms/index/draw?process=BillpayInvoice01&format=svg&font=14&state=`.

If the link does not work, just click **Maintenance->OMS** to list all registered OMS state machines.

Basic state machine will look somewhat like this and you can use it as sample in your project.

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Billpay/basic_OMS_state_machine.png)

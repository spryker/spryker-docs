---
title: Integrate Payone
description: Learn how you can integrate the Payone app into your Spryker shop
template: howto-guide-template
redirect_from:
  - /docs/pbc/all/payment-service-providers/payone/integrate-payone.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/payone/integration-in-the-back-office/integrate-payone.html
---

To integrate Payone, follow these steps.

## Prerequisites

Before you can integrate Payone, make sure that your project is ACP-enabled. See [App Composition Platform installation](/docs/acp/user/app-composition-platform-installation.html) for details.

The Payone app requires the following Spryker modules:

* `spryker/message-broker: ^1.9.0`
* `spryker/message-broker-aws: ^1.5.0`
* `spryker/payment: ^5.15.0`
* `spryker/sales: ^11.41.0`
* `spryker/sales-return: ^1.5.0`
* `spryker-shop/checkout-page: ^3.24.0`
* `spryker-shop/payment-page: ^1.3.0`
* `spryker/oms: ^11.21.0`
* `spryker/sales-payment: ^1.2.0`

## 1. Connect Payone

1. In your store's Back Office, go to **Apps&nbsp;<span aria-label="and then">></span> Catalog**.
2. Click **Payone**.
   This takes you to the Payone app details page.
3. In the top right corner of the Payone app details page, click **Connect app**.
   This displays a message about the successful connection of the app to your SCCOS. The Payone app's status changes to *Connection pending*.   
4. Go to [Payone](https://www.payone.com/DE-en) and obtain the credentials.

   {% info_block infoBox "Info" %}

   It takes some time to obtain credentials from Payone because you have to go through a thorough vetting process by Payone, such as the "know your customer" (KYC) process before Payone verifies you.

   {% endinfo_block %}

## 2. Configure Payone

1. Go to your store's Back Office, to the Payone app details page.
2. In the top right corner of the Payone app details page, click **Configure**.
3. On the Payone app details page, fill in fields in the **Credentials** section.
   ![payone-app-detais](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-app-details.png)
4. Select **Payone Environment Mode**.
5. Enter your *Shop Name*. This name will be displayed on **Payment** page as a merchant label for whom to pay:
   ![payone-shop-name](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-shop-name.png)
6. Select one or more payment methods.
   ![payone-payment-methods](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-payment-methods.png)
7. Optional: To configure payment methods per store, click **Payment methods per store configuration** and select stores for the defined payment methods.
8. Click **Save**.

![configure-payone](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/payment-service-providers/payone/integrate-payone/configure-payone.png)

If the app was connected successfully, a corresponding message appears, and the app status changes to **Connected**. The payment methods you've selected in step 8, appear in **Administration&nbsp;<span aria-label="and then">></span>  Payment methods**:
![payone-credit-card](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/payone/payone-credit-card.png).

## 3. Integrate Payone

Follow these steps to integrate Payone.

### Add Payone domain to your allowlist

To enable Payone to redirect your customers to their 3D Secure page and later to your success page, you must add the ACP domain inside your **Content Security Policy** allowlist. To do that, change your `deploy.yml` file or your `config/Shared/config_default.php` file if changing the environment variable is not possible.

In the `deploy.yml` file, introduce the required changes:

```yml
image:
  environment:
    SPRYKER_AOP_APPLICATION: '{
      "APP_DOMAINS": [
        "os.apps.aop.spryker.com",
        ...
      ],
      ...
    }'
```

Alternatively, you may add the domain to the allowlist from the `config/Shared/config_default.php` file. If you updated the `deploy.yml` file, this step can be ignored.

```php
$config[KernelConstants::DOMAIN_WHITELIST][] = 'os.apps.aop.spryker.com';
```

### Configure shared configs

Add the following config to `config/Shared/config_default.php`:
    
```php
$config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] =
$config[MessageBrokerAwsConstants::MESSAGE_TO_CHANNEL_MAP] = [
    //...
    PaymentMethodAddedTransfer::class => 'payment-method-commands',
    PaymentMethodDeletedTransfer::class => 'payment-method-commands',
    PaymentCancelReservationRequestedTransfer::class => 'payment-commands',
    PaymentConfirmationRequestedTransfer::class => 'payment-commands',
    PaymentRefundRequestedTransfer::class => 'payment-commands',
    PaymentPreauthorizedTransfer::class => 'payment-events',
    PaymentPreauthorizationFailedTransfer::class => 'payment-events',
    PaymentConfirmedTransfer::class => 'payment-events',
    PaymentConfirmationFailedTransfer::class => 'payment-events',
    PaymentRefundedTransfer::class => 'payment-events',
    PaymentRefundFailedTransfer::class => 'payment-events',
    PaymentReservationCanceledTransfer::class => 'payment-events',
    PaymentCancelReservationFailedTransfer::class => 'payment-events',
];

$config[MessageBrokerConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] = [
    //...
    'payment-events' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
    'payment-method-commands' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
];

$config[MessageBrokerConstants::CHANNEL_TO_SENDER_TRANSPORT_MAP] = [
    //...
    'payment-commands' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
];

$config[OmsConstants::PROCESS_LOCATION] = [
    //...
    APPLICATION_ROOT_DIR . '/vendor/spryker/spryker/Bundles/Payment/config/Zed/Oms', # this line must be removed if exists
    APPLICATION_ROOT_DIR . '/vendor/spryker/spryker/Bundles/SalesPayment/config/Zed/Oms', # this line must be added
];

$config[OmsConstants::ACTIVE_PROCESSES] = [
    //...
    'B2CStateMachine01', # this line must be removed if exists
    'ForeignPaymentStateMachine01', # this line must be added
];

$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    //...
    PaymentConfig::PAYMENT_FOREIGN_PROVIDER => 'B2CStateMachine01', # this line must be removed if exists
    PaymentConfig::PAYMENT_FOREIGN_PROVIDER => 'ForeignPaymentStateMachine01', # this line must be added
];
```

### Configure dependencies in `MessageBroker`

Add the following code to `src/Pyz/Zed/MessageBroker/MessageBrokerDependencyProvider.php`:

```php
namespace Pyz\Zed\MessageBroker;

use Spryker\Zed\MessageBroker\MessageBrokerDependencyProvider as SprykerMessageBrokerDependencyProvider;
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentCancelReservationFailedMessageHandlerPlugin;
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentConfirmationFailedMessageHandlerPlugin;
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentConfirmedMessageHandlerPlugin;
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentMethodMessageHandlerPlugin;
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentPreauthorizationFailedMessageHandlerPlugin;
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentPreauthorizedMessageHandlerPlugin;
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentRefundedMessageHandlerPlugin;
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentRefundFailedMessageHandlerPlugin;
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentReservationCanceledMessageHandlerPlugin;

class MessageBrokerDependencyProvider extends SprykerMessageBrokerDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageHandlerPluginInterface>
     */
    public function getMessageHandlerPlugins(): array
    {
        return [
            //...
            new PaymentCancelReservationFailedMessageHandlerPlugin(),
            new PaymentConfirmationFailedMessageHandlerPlugin(),
            new PaymentConfirmedMessageHandlerPlugin(),
            new PaymentPreauthorizationFailedMessageHandlerPlugin(),
            new PaymentPreauthorizedMessageHandlerPlugin(),
            new PaymentReservationCanceledMessageHandlerPlugin(),
            new PaymentRefundedMessageHandlerPlugin(),
            new PaymentRefundFailedMessageHandlerPlugin(),
            new PaymentMethodMessageHandlerPlugin(),
        ];
    }
}
```

### Configure plugins in `Checkout`

The following plugin must be added to `src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php`:

```php
namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentAuthorizationCheckoutPostSavePlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPostSaveInterface>
     */
    protected function getCheckoutPostHooks(Container $container): array
    {
        return [
            //...
            new PaymentAuthorizationCheckoutPostSavePlugin(),
        ];
    }
}
```

- Remove the use of the following plugins (if any):

```php
SprykerEco\Zed\Payone\Communication\Plugin\Checkout\PayoneCheckoutDoSaveOrderPlugin;
SprykerEco\Zed\Payone\Communication\Plugin\Checkout\PayoneCheckoutPostSavePlugin;
SprykerEco\Zed\Payone\Communication\Plugin\Checkout\PayoneCheckoutPreConditionPlugin;
```

### Configure plugins in `CheckoutPage`

The following plugin must be added to `src/Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php`:

```php
namespace Pyz\Yves\CheckoutPage;

use SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerShopCheckoutPageDependencyProvider;
use SprykerShop\Yves\PaymentPage\Plugin\PaymentPage\PaymentForeignPaymentCollectionExtenderPlugin;

class CheckoutPageDependencyProvider extends SprykerShopCheckoutPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\CheckoutPageExtension\Dependency\Plugin\PaymentCollectionExtenderPluginInterface>
     */
    protected function getPaymentCollectionExtenderPlugins(): array
    {
        return [
            //...
            new PaymentForeignPaymentCollectionExtenderPlugin(),
        ];
    }
}
```

### Configure plugins in `Router`

The following plugin must be added to `src/Pyz/Yves/Router/RouterDependencyProvider.php`:

```php
namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\PaymentPage\Plugin\Router\PaymentPageRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        $routeProviders = [
            //...
            new PaymentPageRouteProviderPlugin(),
        ];
    }
}
```

### Configure plugins in `Oms`

The following file `\Pyz\Zed\Oms\OmsDependencyProvider` must be adjusted:

- Remove the use of the following plugins (if any):

```php
Spryker\Zed\Payment\Communication\Plugin\Command\SendEventPaymentCancelReservationPendingPlugin;
Spryker\Zed\Payment\Communication\Plugin\Command\SendEventPaymentConfirmationPendingPlugin;
Spryker\Zed\Payment\Communication\Plugin\Command\SendEventPaymentRefundPendingPlugin;
```

- Add next plugins:

```php
protected function extendCommandPlugins(Container $container): Container
{
    $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
        //...
        $commandCollection->add(new Spryker\Zed\SalesPayment\Communication\Plugin\Command\SendEventPaymentConfirmationPendingPlugin(), 'Payment/SendEventPaymentConfirmationPending');
        $commandCollection->add(new Spryker\Zed\SalesPayment\Communication\Plugin\Command\SendEventPaymentRefundPendingPlugin(), 'Payment/SendEventPaymentRefundPending');
        $commandCollection->add(new Spryker\Zed\SalesPayment\Communication\Plugin\Command\SendEventPaymentCancelReservationPendingPlugin(), 'Payment/SendEventPaymentCancelReservationPending');
    });
}
```
   
### OMS configuration

One single OMS file is now divided into the main process and sub-processes:
The following file must be changed `ForeignPaymentStateMachine01.xml`:

```xml
<process name="ForeignPaymentStateMachine01" main="true">

        <subprocesses>
            <process>PaymentAuthorization</process>
            <process>PaymentConfirmation</process>
            <process>ItemSupply</process>
            <process>ItemReturn</process>
            <process>PaymentRefund</process>
            <process>PaymentReservationCancel</process>
            <process>ItemClose</process>
        </subprocesses>
...
```

Main process not only combines and operates sub-processes, its main goal to build everything around the only reserved=”true” state named invoiced;
Each sub-process has its own states, events, transitions, entry and exit points and can be extended/expanded at the project level to meet all the needs of a particular tenant:

```xml
<process name="PaymentAuthorization" file="Subprocess/PaymentAuthorization01.xml"/> <!--Can be replaced with any subprocess file you want -->
```

### Data and presentation changes

New glossary keys were added and they require a few additional actions. Please add the following glossary keys to your glossary data import file:

```csv
...
payment_foreign.thank_you,Danke,de_DE
payment_foreign.thank_you,Thank you,en_US
payment_foreign.go_to_my_account,Gehe zum "Benutzerkonto",de_DE
payment_foreign.go_to_my_account,Go to "My Account",en_US
payment_foreign.success.order.placement.message,Deine Bestellung ist erfolgreich bei uns eingegangen. Die Bestellbestätigung wurde soeben per E-Mail versendet. In deinem Benutzerkonto kannst deine Bestellung überprüfen und nachverfolgen.,de_DE
payment_foreign.success.order.placement.message,Your order has been paid successfully. You will receive your order confirmation email in a few minutes. You can check and track your order in your account.,en_US
payment.cancellation.title,Bezahlvorgang abgebrochen,de_DE
payment.cancellation.title,Payment cancellation,en_US
payment.cancellation.message,Du hast den Bezahlvorgang abgebrochen.,de_DE
payment.cancellation.message,You have cancelled your payment.,en_US
oms.state.reservation-cancelled,Reservation Cancelled,en_US
oms.state.reservation-cancelled,Reservation Cancelled,de_DE
oms.state.reservation-cancellation-pending,Reservation Cancellation Pending,en_US
oms.state.reservation-cancellation-pending,Reservation Cancellation Pending,de_DE
```
Then run the data import for the glossary:

```bash
vendor/bin/console data:import glossary
```

### Template changes in `CheckoutPage`

Please be aware that if you have rewritten `@CheckoutPage/views/payment/payment.twig` on the project level:

- You should check that for payment selection choices a form molecule uses the following code:

```twig
{% for name, choices in data.form.paymentSelection.vars.choices %}
    ...
    {% embed molecule('form') with {
        data: {
            form: data.form[data.form.paymentSelection[key].vars.name],
            ...
```

- Payment provider names now have glossary keys instead of a name itself, so you need to check if the names of the payment providers are translated without using the prefix:
    
```twig
{% for name, choices in data.form.paymentSelection.vars.choices %}
    ...
    <h5>{{ name | trans }}</h5>
```

- Also, if you need, you can add the glossary keys for all the new (external) payment providers and methods to your glossary data import file. For example, there is 1 new external payment with the provider name Payone (can be found in spy_payment_method table in group_name column)  and the payment method name Credit Card (can be found in spy_payment_method table in label_name column). For all of them, you can add translations to your glossary data import file like this:

```csv
...
Payone,Payone Payments,en_US
Credit Card,Credit Card (Payone),en_US
```
Then run the data import for the glossary:
    
```bash
vendor/bin/console data:import glossary
```

### Console command for receiving messages

To receive messages from the Message Bus channel execute the following console command:

```bash
console message-broker:consume
```

This command must be executed periodically. To achieve this, configure Jenkins in `config/Zed/cronjobs/jenkins.php`:

```php
$jobs[] = [
    'name' => 'message-broker-consume-channels',
    'command' => '$PHP_BIN vendor/bin/console message-broker:consume --time-limit=15 --sleep=5',
    'schedule' => '* * * * *',
    'enable' => true,
    'stores' => $allStores,
];
```

## Next steps

[Activate the added payment methods](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/manage-in-the-back-office/edit-payment-methods.html)

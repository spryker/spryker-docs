---
title: Integrate Payone
description: Learn how you can integrate the Payone app into your Spryker shop
template: howto-guide-template
last_updated: Jan 09, 2024
redirect_from:
  - /docs/pbc/all/payment-service-providers/payone/integrate-payone.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/payone/integration-in-the-back-office/integrate-payone.html
---

This document describes how to integrate the Payone app into a Spryker shop.

## Prerequisites
Before integrating Algolia, ensure the following prerequisites are met:
- Make sure your project is ACP-enabled. See [App Composition Platform installation](/docs/acp/user/app-composition-platform-installation.html) for details.

- The Payone app requires the following Spryker modules:

* `spryker/payment: ^5.18.0`
* `spryker/sales: ^11.41.0`
* `spryker/sales-return: ^1.5.0`
* `spryker-shop/checkout-page: ^3.24.0`
* `spryker-shop/payment-page: ^1.3.0`
* `spryker/oms: ^11.21.0`
* `spryker/sales-payment: ^1.5.0`

Make sure that your installation meets these requirements.


## Integrate Payone

To integrate Payone, follow these steps.

### 1. Configure shared configs

Add the following config to `config/Shared/config_default.php`:
    
```php
use Generated\Shared\Transfer\AddPaymentMethodTransfer;
use Generated\Shared\Transfer\CancelPaymentTransfer;
use Generated\Shared\Transfer\CapturePaymentTransfer;
use Generated\Shared\Transfer\DeletePaymentMethodTransfer;
use Generated\Shared\Transfer\PaymentAuthorizationFailedTransfer;
use Generated\Shared\Transfer\PaymentAuthorizedTransfer;
use Generated\Shared\Transfer\PaymentCanceledTransfer;
use Generated\Shared\Transfer\PaymentCancellationFailedTransfer;
use Generated\Shared\Transfer\PaymentCapturedTransfer;
use Generated\Shared\Transfer\PaymentCaptureFailedTransfer;
use Generated\Shared\Transfer\PaymentRefundedTransfer;
use Generated\Shared\Transfer\PaymentRefundFailedTransfer;
use Generated\Shared\Transfer\RefundPaymentTransfer;
use Spryker\Shared\MessageBroker\MessageBrokerConstants;
use Spryker\Shared\OauthClient\OauthClientConstants;
use Spryker\Shared\Oms\OmsConstants;
use Spryker\Shared\Payment\PaymentConstants;
use Spryker\Shared\Sales\SalesConstants;
use Spryker\Zed\MessageBrokerAws\MessageBrokerAwsConfig;
use Spryker\Zed\Payment\PaymentConfig;

//...
$config[PaymentConstants::TENANT_IDENTIFIER] = getenv('SPRYKER_TENANT_IDENTIFIER') ?: '';

$config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] = [
    //...
    AddPaymentMethodTransfer::class => 'payment-method-commands',
    DeletePaymentMethodTransfer::class => 'payment-method-commands',
    CancelPaymentTransfer::class => 'payment-commands',
    CapturePaymentTransfer::class => 'payment-commands',
    RefundPaymentTransfer::class => 'payment-commands',
    PaymentAuthorizedTransfer::class => 'payment-events',
    PaymentAuthorizationFailedTransfer::class => 'payment-events',
    PaymentCapturedTransfer::class => 'payment-events',
    PaymentCaptureFailedTransfer::class => 'payment-events',
    PaymentRefundedTransfer::class => 'payment-events',
    PaymentRefundFailedTransfer::class => 'payment-events',
    PaymentCanceledTransfer::class => 'payment-events',
    PaymentCancellationFailedTransfer::class => 'payment-events',
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
    OmsConfig::DEFAULT_PROCESS_LOCATION,
    APPLICATION_ROOT_DIR . '/vendor/spryker/sales-payment/config/Zed/Oms', # this line must be added if your use unmodified ForeignPaymentStateMachine01.xml
];
$config[OmsConstants::ACTIVE_PROCESSES] = [
    //...
    'ForeignPaymentStateMachine01', # this line must be added or add your modified version of this OMS
];
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    //...
    PaymentConfig::PAYMENT_FOREIGN_PROVIDER => 'ForeignPaymentStateMachine01', # this line must be added or add your modified version of this OMS
];

// ----------------------------------------------------------------------------
// ------------------------------ OAUTH ---------------------------------------
// ----------------------------------------------------------------------------
//...
$config[OauthClientConstants::OAUTH_PROVIDER_NAME_FOR_PAYMENT_AUTHORIZE] = OauthAuth0Config::PROVIDER_NAME;
$config[OauthClientConstants::OAUTH_GRANT_TYPE_FOR_PAYMENT_AUTHORIZE] = OauthAuth0Config::GRANT_TYPE_CLIENT_CREDENTIALS;
$config[OauthClientConstants::OAUTH_OPTION_AUDIENCE_FOR_PAYMENT_AUTHORIZE] = 'aop-app';
```

### 2. Configure dependencies in `MessageBroker`

Add the following code to `src/Pyz/Zed/MessageBroker/MessageBrokerDependencyProvider.php`:

```php
namespace Pyz\Zed\MessageBroker;

use Spryker\Zed\MessageBroker\MessageBrokerDependencyProvider as SprykerMessageBrokerDependencyProvider;
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentMethodMessageHandlerPlugin;
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentOperationsMessageHandlerPlugin;

class MessageBrokerDependencyProvider extends SprykerMessageBrokerDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageHandlerPluginInterface>
     */
    public function getMessageHandlerPlugins(): array
    {
        return [
            //...
            new PaymentOperationsMessageHandlerPlugin();
            new PaymentMethodMessageHandlerPlugin(),
        ];
    }
}
```

### 3. Configure channels in the `MessageBroker` configuration

Add the following code to `src/Pyz/Zed/MessageBroker/MessageBrokerConfig.php`:

```php
namespace Pyz\Zed\MessageBroker;

use Spryker\Zed\MessageBroker\MessageBrokerConfig as SprykerMessageBrokerConfig;

class MessageBrokerConfig extends SprykerMessageBrokerConfig
{
    /**
     * @return array<string>
     */
    public function getDefaultWorkerChannels(): array
    {
        return [
            //...
            'payment-events',
            'payment-method-commands',
        ];
    }

    //...
}
```

### 4. Configure plugins in `Checkout`

1. Add the following plugin to `src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php`:

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

2. Eliminate the use of the following plugins (if any):

```php
SprykerEco\Zed\Payone\Communication\Plugin\Checkout\PayoneCheckoutDoSaveOrderPlugin;
SprykerEco\Zed\Payone\Communication\Plugin\Checkout\PayoneCheckoutPostSavePlugin;
SprykerEco\Zed\Payone\Communication\Plugin\Checkout\PayoneCheckoutPreConditionPlugin;
```

### 5. Configure plugins in `CheckoutPage`

Add the following plugin to `src/Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php`:

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

### 6. Configure plugins in `Router`

Add the following plugin to `src/Pyz/Yves/Router/RouterDependencyProvider.php`:

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

### 7. Configure plugins in `Oms`

Adjust the `\Pyz\Zed\Oms\OmsDependencyProvider` file as follows:

```php
protected function extendCommandPlugins(Container $container): Container
{
    $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
        //...
        $commandCollection->add(new Spryker\Zed\SalesPayment\Communication\Plugin\Oms\SendCapturePaymentMessageCommandPlugin(), 'Payment/Capture');
        $commandCollection->add(new Spryker\Zed\SalesPayment\Communication\Plugin\Oms\SendRefundPaymentMessageCommandPlugin(), 'Payment/Refund');
        $commandCollection->add(new Spryker\Zed\SalesPayment\Communication\Plugin\Oms\SendCancelPaymentMessageCommandPlugin(), 'Payment/Cancel');
    });
}
```

### 8. Optional: Configure your payment OMS

The complete default payment OMS configuration is available at `vendor/spryker/sales-payment/config/Zed/Oms/ForeignPaymentStateMachine01.xml`. Optionally, you can configure your own payment `config/Zed/oms/{your_payment_oms}.xml`as in the following example. This example demonstrates how to configure the order state machine transition from `ready for dispatch` to `payment capture pending`:

```xml
<?xml version="1.0"?>
<statemachine
    xmlns="spryker:oms-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

    <process name="SomePaymentProcess" main="true">

        <!-- other configurations -->

        <states>

            <!-- other states -->

          <state name="payment capture pending" display="oms.state.in-progress"/>

            <!-- other states -->

        </states>

        <transitions>

            <!-- other transitions -->

            <transition happy="true">
              <source>ready for dispatch</source>
              <target>payment capture pending</target>
              <event>capture payment</event>
            </transition>

            <!-- other transitions -->

        </transitions>

        <events>

            <!-- other events -->

            <event name="capture payment" onEnter="true" command="Payment/Capture"/>

            <!-- other events -->

        </events>

    </process>

</statemachine>
```

[Read more](/docs/acp/user/acp-payment-oms-guides.html) about ACP payment methods integration with your project OMS configuration.

### 9. Accommodate data and presentation change

The newly added glossary keys require a few additional actions. Do the following:

1. Add the following glossary keys to your glossary data import file:

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
oms.state.reservation-cancelled,Payment cancelled,en_US
oms.state.reservation-cancelled,Payment cancelled,de_DE
oms.state.reservation-cancellation-pending,Payment cancellation in progress,en_US
oms.state.reservation-cancellation-pending,Payment cancellation in progress,de_DE
```
2. Run the data import for the glossary:

```bash
console data:import glossary
```

### 10. Optional: Introduce template changes in `CheckoutPage`

If you have rewritten `@CheckoutPage/views/payment/payment.twig` on the project level, do the following:

1. Make sure that a form molecule uses the following code for the payment selection choices:

```twig
{% raw %}
{% for name, choices in data.form.paymentSelection.vars.choices %}
    ...
    {% embed molecule('form') with {
        data: {
            form: data.form[data.form.paymentSelection[key].vars.name],
            ...
        }
    {% endembed %}    
{% endfor %}           
{% endraw %} 
```

2. Payment provider names now have glossary keys instead of a name itself. To accommodate this change, make sure if the names of the payment providers are translated without using the prefix:
    
```twig
{% raw %}
{% for name, choices in data.form.paymentSelection.vars.choices %}
    ...
    <h5>{{ name | trans }}</h5>
{% endfor %}
{% endraw %} 
```

3. Optional: Add the glossary keys for all the new (external) payment providers and methods to your glossary data import file. 
For example, there is a new external payment with the provider name Payone, found in the `spy_payment_method` table under the `group_name` column,  and the payment method name Credit Card, found in the `spy_payment_method` table under the `label_name` column. For all of them, you can add translations to your glossary data import file like this:

```csv
...
Payone,Payone Payments,en_US
Credit Card,Credit Card (Payone),en_US
```
Then run the data import for the glossary:
    
```bash
console data:import glossary
```

### 11. Receive ACP messages

Now, you can start receiving ACP messages in SCOS. See [Receive messages](/docs/acp/user/receive-acp-messages.html) for details on how to do that.

## Next steps

[Configure the Payone app](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/payone/app-composition-platform-integration/configure-payone.html) for your store.

---
title: Integrate Stripe
description: Find out how you can install Stripe in your Spryker shop
draft: true
last_updated: Jan 31, 2024
template: howto-guide-template
related:
  - title: Stripe
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/stripe/stripe.html
redirect_from:
- /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/stripe/install-stripe.html
- /docs/pbc/all/payment-service-provider/202311.0/base-shop/third-party-integrations/stripe/install-stripe.html

---
This document describes how to integrate [Stripe](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/stripe.html) into a Spryker shop.

## Prerequisites

Before integrating Stripe, ensure the following prerequisites are met:

- Make sure your project is ACP-enabled. See [App Composition Platform installation](/docs/acp/user/app-composition-platform-installation.html) for details.

- The Stripe app catalog page lists specific packages that must be installed or upgraded before you can use the Stripe app. To check the list of the necessary packages, in the Back Office, go to **Apps**-> **Stripe**. Ensure that your installation meets these requirements.

## 1. Configure shared configs

Your project probably already contains the following code in `config/Shared/config_default.php` already. If not, add it:

```php
//...

use Generated\Shared\Transfer\PaymentConfirmationFailedTransfer;
use Generated\Shared\Transfer\PaymentConfirmationRequestedTransfer;
use Generated\Shared\Transfer\PaymentConfirmedTransfer;
use Generated\Shared\Transfer\PaymentMethodAddedTransfer;
use Generated\Shared\Transfer\PaymentMethodDeletedTransfer;
use Generated\Shared\Transfer\PaymentPreauthorizationFailedTransfer;
use Generated\Shared\Transfer\PaymentPreauthorizedTransfer;
use Spryker\Shared\MessageBroker\MessageBrokerConstants;
use Spryker\Shared\Oms\OmsConstants;
use Spryker\Shared\Payment\PaymentConstants;
use Spryker\Shared\Sales\SalesConstants;
use Spryker\Zed\MessageBrokerAws\MessageBrokerAwsConfig;
use Spryker\Zed\Oms\OmsConfig;
use Spryker\Zed\Payment\PaymentConfig;

//...
$config[PaymentConstants::TENANT_IDENTIFIER] = getenv('SPRYKER_TENANT_IDENTIFIER') ?: '';

$config[OmsConstants::PROCESS_LOCATION] = [
    //...
    OmsConfig::DEFAULT_PROCESS_LOCATION,
    //APPLICATION_ROOT_DIR . '/vendor/spryker/payment/config/Zed/Oms', # this line must be removed if exists
    APPLICATION_ROOT_DIR . '/vendor/spryker/sales-payment/config/Zed/Oms', # this line must be added
];
$config[OmsConstants::ACTIVE_PROCESSES] = [
    //...
    //'B2CStateMachine01', # this line must be removed if exists
    'ForeignPaymentStateMachine01', # this line must be added
];
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    //...
    //PaymentConfig::PAYMENT_FOREIGN_PROVIDER => 'B2CStateMachine01', # this line must be removed if exists
    PaymentConfig::PAYMENT_FOREIGN_PROVIDER => 'ForeignPaymentStateMachine01', # this line must be added
];

$config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] = [
    //...
    PaymentMethodAddedTransfer::class => 'payment-method-commands',
    PaymentMethodDeletedTransfer::class => 'payment-method-commands',
    PaymentConfirmationRequestedTransfer::class => 'payment-commands',
    PaymentPreauthorizedTransfer::class => 'payment-events',
    PaymentPreauthorizationFailedTransfer::class => 'payment-events',
    PaymentConfirmedTransfer::class => 'payment-events',
    PaymentConfirmationFailedTransfer::class => 'payment-events',
];

$config[MessageBrokerConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] = [
    //...
    'payment-method-commands' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
    'payment-events' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
];

$config[MessageBrokerConstants::CHANNEL_TO_SENDER_TRANSPORT_MAP] = [
    //...
    'payment-commands' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
];

```

## 2. Configure the Message Broker dependency provider

Your project probably already contains the following code in `src/Pyz/Zed/MessageBroker/MessageBrokerDependencyProvider.php` already. If not, add it:

```php

namespace Pyz\Zed\MessageBroker;

use Spryker\Zed\MessageBroker\MessageBrokerDependencyProvider as SprykerMessageBrokerDependencyProvider;
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentConfirmationFailedMessageHandlerPlugin;
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentConfirmedMessageHandlerPlugin;
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentMethodMessageHandlerPlugin;
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentPreauthorizationFailedMessageHandlerPlugin;
use Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentPreauthorizedMessageHandlerPlugin;

class MessageBrokerDependencyProvider extends SprykerMessageBrokerDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageHandlerPluginInterface>
     */
    public function getMessageHandlerPlugins(): array
    {
        return [
            //...

            # These plugins are handling messages sent from Stripe app to SCCOS.
            new PaymentConfirmationFailedMessageHandlerPlugin(),
            new PaymentConfirmedMessageHandlerPlugin(),
            new PaymentPreauthorizationFailedMessageHandlerPlugin(),
            new PaymentPreauthorizedMessageHandlerPlugin(),
            new PaymentMethodMessageHandlerPlugin(),
        ];
    }
}

```

### 3. Configure channels in Message Broker configuration

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

## 4. Configure the Order State Machine (OMS)
Your project is likely to have the following in `src/Pyz/Zed/Oms/OmsDependencyProvider.php` already. If not, add it:

```php
//...

use Spryker\Zed\SalesPayment\Communication\Plugin\Oms\SendEventPaymentCancelReservationPendingPlugin;
use Spryker\Zed\SalesPayment\Communication\Plugin\Oms\SendEventPaymentConfirmationPendingPlugin;
use Spryker\Zed\SalesPayment\Communication\Plugin\Oms\SendEventPaymentRefundPendingPlugin;

//...

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendCommandPlugins(Container $container): Container
    {
         $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
             //...

             $commandCollection->add(new SendEventPaymentConfirmationPendingPlugin(), 'Payment/SendEventPaymentConfirmationPending');

             // these two commands will be also supported soon.
             $commandCollection->add(new SendEventPaymentRefundPendingPlugin(), 'Payment/SendEventPaymentRefundPending');
             $commandCollection->add(new SendEventPaymentCancelReservationPendingPlugin(), 'Payment/SendEventPaymentCancelReservationPending');

             return $commandCollection;
        });

        return $container;
    }

```

### Optional: Configure your own payment OMS

The complete default payment OMS configuration is available at `vendor/spryker/sales-payment/config/Zed/Oms/ForeignPaymentStateMachine01.xml`.

It has payment flow when first payment is authorized (the amount is just blocked, when payment method allows it) and then OMS sends requests to capture (move previously blocked amount from customer's account to store account).
The capture action is initiated by `Payment/SendEventPaymentConfirmationPending` command, by default it's initiated when a Back office user clicks `ship` button in the order view. 

Optionally, you can change and configure your own payment OMS based on `ForeignPaymentStateMachine01.xml` from core package and change this behavior accroding to your business flow.

[Read more](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) about OMS feature and its configuration.

Copy & paste `ForeignPaymentStateMachine01.xml` with `Subprocess` folder to project root `config/Zed/oms`, change the name of the file and the value of `<process name=` inside the file.

This example demonstrates how to configure the order state machine transition from `ready for dispatch` to `payment capture pending`:

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

            <event name="capture payment" onEnter="true" command="Payment/SendEventPaymentConfirmationPending"/>

            <!-- other events -->

        </events>

    </process>

</statemachine>
```

By default timeout for payment authorization action is 1 day, it means if the order is in state `payment authorization pending` OMS will wait 1 day and then move the order state to `payment authorization failed`. In one more day after it the order is moved to `payment authorization canceled` automatically. So if you need to increase timeouts or change the states, modify also `config/Zed/oms/Subprocess/PaymentAuthorization01.xml` for your needs.


## Optional: Introduce template changes in `CheckoutPage`

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
Stripe,Pay Online with Stripe,en_US
```
Then run the data import for the glossary:

```bash
console data:import glossary
```

## Next step
[Configure Stripe in the Back Office](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/configure-stripe.html)

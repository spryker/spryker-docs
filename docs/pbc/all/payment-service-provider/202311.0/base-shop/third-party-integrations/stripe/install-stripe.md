---
title: Install Stripe
description: Find out how you can install Stripe in your Spryker shop
draft: true
last_updated: Jan 31, 2024
template: howto-guide-template
related:
  - title: Stripe
    link: docs/pbc/all/payment-service-provider/page.version/stripe/stripe.html
redirect_from:
    - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/stripe/install-stripe.html

---
This document describes how to integrate [Stripe](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/stripe.html) into a Spryker shop.

## Prerequisites

Before integrating Stripe, ensure the following prerequisites are met:

- Make sure your project is ACP-enabled. See [App Composition Platform installation](/docs/acp/user/app-composition-platform-installation.html) for details.

- The Stripe app catalog page lists specific packages that must be installed or upgraded before you can use the Stripe app. To check the list of the necessary packages, in the Back Office, go to **Apps**-> **Stripe**. Ensure that your installation meets these requirements.

## 1. Configure shared configs

Your project probably already contains the following code in `config/Shared/config_default.php` already. If not, add it:

```php
// ...

use Generated\Shared\Transfer\PaymentConfirmationFailedTransfer;
use Generated\Shared\Transfer\PaymentConfirmationRequestedTransfer;
use Generated\Shared\Transfer\PaymentConfirmedTransfer;
use Generated\Shared\Transfer\PaymentMethodAddedTransfer;
use Generated\Shared\Transfer\PaymentMethodDeletedTransfer;
use Generated\Shared\Transfer\PaymentPreauthorizationFailedTransfer;
use Generated\Shared\Transfer\PaymentPreauthorizedTransfer;
use Spryker\Shared\Sales\SalesConstants;
use Spryker\Shared\Oms\OmsConstants;
use Spryker\Zed\Oms\OmsConfig;
use Spryker\Zed\Payment\PaymentConfig;

// ...

$config[OmsConstants::PROCESS_LOCATION] = [
    // ...
    OmsConfig::DEFAULT_PROCESS_LOCATION,
    APPLICATION_ROOT_DIR . '/vendor/spryker/sales-payment/config/Zed/Oms',
];
$config[OmsConstants::ACTIVE_PROCESSES] = [
    // ...
    'ForeignPaymentStateMachine01',
];
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    // ...
    PaymentConfig::PAYMENT_FOREIGN_PROVIDER => 'ForeignPaymentStateMachine01',
];

$config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] =
$config[MessageBrokerAwsConstants::MESSAGE_TO_CHANNEL_MAP] = [
    PaymentMethodAddedTransfer::class => 'payment-method-commands',
    PaymentMethodDeletedTransfer::class => 'payment-method-commands',
    PaymentConfirmationRequestedTransfer::class => 'payment-commands',
    PaymentPreauthorizedTransfer::class => 'payment-events',
    PaymentPreauthorizationFailedTransfer::class => 'payment-events',
    PaymentConfirmedTransfer::class => 'payment-events',
    PaymentConfirmationFailedTransfer::class => 'payment-events',
];

$config[MessageBrokerAwsConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] = [
    // ...

    'payment-method-commands' => MessageBrokerAwsConfig::SQS_TRANSPORT,
    'payment-events' => MessageBrokerAwsConfig::SQS_TRANSPORT,
];

$config[MessageBrokerAwsConstants::CHANNEL_TO_SENDER_TRANSPORT_MAP] = [
    // ...

    'payment-commands' => 'http',
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
            // ...

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

## 3. Add Stripe domain to your allowlist

To enable Stripe to redirect your customers to the Stripe payment page and later to your payment success page, you must add the ACP domain inside your *Content Security Policy* allowlist. To do that, change your `deploy-{your_environment}.yml` file or your `config/Shared/config_default.php` file if changing the environment variable isn't possible.

In the `deploy.yml` file, introduce the required changes:

```yml
image:
  environment:
    SPRYKER_AOP_APPLICATION: '{
      "APP_DOMAINS": [
        "stripe.acp.spryker.com",
        ...
      ],
      ...
    }'
```

Alternatively, you may add the domain to the allowlist from the `config/Shared/config_default.php` file. If you updated the `deploy.yml` file, ignore this step.

```php
$config[KernelConstants::DOMAIN_WHITELIST][] = 'stripe.acp.spryker.com';
```

## 4. Configure the OMS dependency provider
Your project is likely to have the following in `src/Pyz/Zed/Oms/OmsDependencyProvider.php` already. If not, add it:

```php
// ...

use Spryker\Zed\SalesPayment\Communication\Plugin\Oms\SendEventPaymentConfirmationPendingPlugin;

// ...

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendCommandPlugins(Container $container): Container
    {
         $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {

             // ...

             $commandCollection->add(new SendEventPaymentConfirmationPendingPlugin(), 'Payment/SendEventPaymentConfirmationPending');

             // ...

             return $commandCollection;
        });

        return $container;
    }

```

### Optional: Configure your payment OMS

The complete default payment OMS configuration is available at `/vendor/spryker/sales-payment/config/Zed/Oms/ForeignPaymentStateMachine01.xml`. Optionally, you can configure your own payment `config/Zed/oms/{your_payment_oms}.xml`as in the following example. This example demonstrates how to configure the order state machine transition from `ready for dispatch` to `payment capture pending`:

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


## Next step
[Configure Stripe in the Back Office](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/configure-stripe.html)

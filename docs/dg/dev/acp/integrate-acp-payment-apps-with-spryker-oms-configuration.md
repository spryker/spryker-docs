---
title: Integrate ACP payment apps with Spryker OMS configuration
description: Learn how to seamlessly integrate ACP payment apps with your Spryker Order Management System (OMS).
template: howto-guide-template
last_updated: Feb 10, 2024
redirect_from:
- /docs/acp/user/acp-payment-oms-guides.html
---

This document describes how to set up your project with the ACP payment app, ensuring seamless integration with your customized Order Management System (OMS) configuration.

## Prerequisites

Before you begin, make sure the following prerequisites are met:
- You have installed the Spryker Order Management System. For the installation instructions, see [Install the Order Management feature](/docs/pbc/all/order-management-system/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html).
- You are familiar with the basics of OMS provided in [Order Management feature overview](/docs/pbc/all/order-management-system/{{site.version}}/base-shop/order-management-feature-overview/order-management-feature-overview.html), [State machine cookbook](/docs/pbc/all/order-management-system/{{site.version}}/base-shop/state-machine-cookbook/state-machine-cookbook.html) and their sub-pages.

## Default ACP Payment App OMS  

The default ACP Payment App OMS configuration is in `vendor/spryker/sales-payment/config/Zed/Oms/ForeignPaymentStateMachine01.xml`.
This configuration is assigned to each order paid with an ACP Payment App payment method. Use it as a starting point to build your own.

### XML file structure

The main OMS file includes `<subprocesses>` – similar to libraries or building blocks with their own `<states>`, `<transitions>`, and `<events>`:

#### Subprocesses

A typical state machine consists of a couple of sub processes that represent a complete order process.

Here is an example of how to add sub processes.

```xml
<subprocesses>
    <process name="PaymentAuthorization" file="Subprocess/PaymentAuthorization01.xml"/>
    <!-- Other subprocesses -->
</subprocesses>
```

Each process in the `<subprocesses>` section has a start state, one or more final states, and the states are linked to each other in the main State Machine .xml file.

Other default sub processes:
- `ItemClose01`
- `ItemReturn01`
- `ItemSupply01`
- `ItemSupplyNonMarketplace01`
- Marketplace-only: `MerchantOrder01`
- Marketplace-only: `MerchantPayout01`
- Marketplace-only: `MerchantPayoutReverse01`
- `PaymentCancel01`
- `PaymentCapture01`
- `PaymentRefund01`
- `PaymentRefund01NonMarketplace`

You can use them as examples or building blocks for your own state machine definition.


### Transition of orders and order items

Transitions between states in payment apps can be handled in two ways:  

- Event-based: Trigger events based on Payment App messages
- Conditional: Use conditional transitions based on Payment App messages and condition plugins

Each approach requires a different setup:  

- Event-based: Add `Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentOperationsMessageHandlerPlugin` to `MessageBrokerDependencyProvider`
- Conditional: Add `Spryker\Zed\PaymentApp\Communication\Plugin\MessageBroker\PaymentAppOperationsMessageHandlerPlugin` to `MessageBrokerDependencyProvider` along with the necessary condition plugins

The following sections provide detailed instructions for configuring each option.  







#### Transition based on event triggers  

The `Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentOperationsMessageHandlerPlugin` contains message handlers that trigger events based on messages received from the Payment App.  

State transitions occur automatically through asynchronous ACP messages, processed by the `spryker/message-broker` module. The following sub-processes have auto-transitions:

* `PaymentAuthorization`
* `PaymentCapture`
* `PaymentRefund`
* `PaymentCancel`

The MessageBroker worker runs in the background as a cron job, checking for new messages and triggering OMS events based on the configuration in `Spryker\Zed\Payment\PaymentConfig::getSupportedOrderPaymentEventTransfersList()`. You can modify this configuration to fit your project’s needs.  

{% info_block infobox %}

Use this approach when closely following the default `ForeignPaymentStateMachine01`, particularly if your OMS does not contain slow-running commands that could cause transition failures.  

The payment status on the app side can change rapidly, which may cause issues if your OMS is not in the correct state for the transition. For example, if a command between `PaymentAuthorized` and `PaymentCapturePending` takes too long to process and a message arrives attempting to transition from `PaymentCapturePending` to `PaymentCaptured`, the OMS may not be able to complete the transition because it is not yet in the required state.  

{% endinfo_block %}

#### Conditional transitions

The `Spryker\Zed\PaymentApp\Communication\Plugin\MessageBroker\PaymentAppOperationsMessageHandlerPlugin` contains message handlers that stores the payment status as provided by the App. The OMS then evaluates this status against predefined conditions to determine if the transition to the next state is possible.


The following condition plugins verify if the payment is in a specific state before allowing the transition:

- `IsPaymentAppPaymentStatusAuthorizationFailedConditionPlugin`
- `IsPaymentAppPaymentStatusAuthorizedConditionPlugin`
- `IsPaymentAppPaymentStatusCanceledConditionPlugin`
- `IsPaymentAppPaymentStatusCancellationFailedConditionPlugin`
- `IsPaymentAppPaymentStatusCapturedConditionPlugin`
- `IsPaymentAppPaymentStatusCaptureFailedConditionPlugin`
- `IsPaymentAppPaymentStatusCaptureRequestedConditionPlugin`
- `IsPaymentAppPaymentStatusOverpaidConditionPlugin`
- `IsPaymentAppPaymentStatusUnderpaidConditionPlugin`

Each condition ensures that the payment is in the expected state before allowing a transition. This approach decouples OMS from the Payment App, enabling you to run slow-processing commands within the OMS while maintaining fine-grained control over state transitions.

To use this approach, add the provided condition plugins to your OMS configuration in the `OmsDependencyProvider::extendConditionPlugins` method.

If some transitions don't occur as expected, you can adjust the configuration using the `Spryker\Zed\PaymentApp\PaymentAppConfig::STATUS_MAP` constant.

This setup allows the Payment App to progress through states independently of your OMS while ensuring that OMS conditions still execute correctly. For example, if the Payment App status advances to `PaymentCaptured` while the OMS remains in the `new` state, querying whether the payment is authorized returns true because authorization occurs before the `PaymentCaptured` state.



### Automatic transitions of states

The list of predefined payment event messages applies to all payment methods from the ACP App Catalog:

- `PaymentAuthorized`
- `PaymentAuthorizationFailed`
- `PaymentCanceled`
- `PaymentCancellationFailed`
- `PaymentCaptured`
- `PaymentCaptureFailed`
- `PaymentRefunded`
- `PaymentRefundFailed`
- `PaymentOverpaid`
- `PaymentUnderpaid`

Make sure that these messages are configured in your `config_default.php`.

{% info_block infoBox "Manual transition between states" %}

If a payment operation occurs offline or changes in the payment provider's system but the corresponding message is not sent or is lost, you can manually trigger a transition in the Back Office. For instructions on changing states of orders, see [Change the state of order items](/docs/pbc/all/order-management-system/{{site.version}}/base-shop/manage-in-the-back-office/orders/change-the-state-of-order-items.html).

For example, if an order gets stuck in the `payment capture pending` state, a Back office user can resolve the payment by clicking **payment capture successful** to transition the order to the `payment captured` state.

{% endinfo_block %}

### Payment operation commands

The following commands have to be triggered from your OMS to tell the Payment App what to do next. 

The default OMS setup has three commands:
- `Payment/Capture`
- `Payment/Cancel`
- `Payment/Refund`

The commands send asynchronous ACP messages to a payment app, allowing it to schedule the requested operation for a specific amount for the selected order and its items. The payment app responds with a payment event message indicating either success or failure.

The list of payment command messages is predefined:
- `CapturePayment`
- `CancelPayment`
- `RefundPayment`

In the project OMS configuration, you can put these commands into the needed transition.

## Configuring OMS for your project

As each project has its unique order flow and use cases, customize your OMS configuration while ensuring compatibility with ACP Catalog payment methods. Follow these steps:

1. Create your own payment OMS configuration based on `ForeignPaymentStateMachine01.xml`. Copy this file along with the `Subprocess/` folder to the project root `config/Zed/oms`.
2. Rename the file, for example to `MyProjectForeignPaymentStateMachine01.xml` and update the `<process name="MyProjectForeignPaymentStateMachine01">` tag at the beginning of the file.
3. Enable your new OMS configuration in the application config file:

```php
// config_default.php

$config[OmsConstants::PROCESS_LOCATION] = [
    OmsConfig::DEFAULT_PROCESS_LOCATION, # check that you have this line
];
$config[OmsConstants::ACTIVE_PROCESSES] = [
    //...
    'MyProjectForeignPaymentStateMachine01',
];
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    //...
    PaymentConfig::PAYMENT_FOREIGN_PROVIDER => 'MyProjectForeignPaymentStateMachine01',
];
```

### Adding commands

You can add new commands to the OMS configuration by extending the `OmsDependencyProvider::extendCommandPlugins` method. Example:

```php
...
protected function extendCommandPlugins(Container $container): Container
{
    $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
        ...
        // ----- External PSP
        $commandCollection->add(new SendCapturePaymentMessageCommandPlugin(), 'Payment/Capture');
        $commandCollection->add(new SendRefundPaymentMessageCommandPlugin(), 'Payment/Refund');
        $commandCollection->add(new RefundCommandPlugin(), 'Payment/Refund/Confirm');
        $commandCollection->add(new SendCancelPaymentMessageCommandPlugin(), 'Payment/Cancel');
        $commandCollection->add(new MerchantPayoutCommandByOrderPlugin(), 'SalesPaymentMerchant/Payout');
        $commandCollection->add(new MerchantPayoutReverseCommandByOrderPlugin(), 'SalesPaymentMerchant/ReversePayout');

        return $commandCollection;
    });

    return $container;
}

```


### Adding conditions

You can add new conditions to the OMS configuration by extending the `OmsDependencyProvider::extendConditionPlugins` method. Example:

```php
protected function extendConditionPlugins(Container $container): Container // phpcs:ignore SlevomatCodingStandard.Functions.UnusedParameter
{
    $container->extend(self::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {
        // ----- External PSP
        $conditionCollection->add(new IsMerchantPaidOutConditionPlugin(), 'SalesPaymentMerchant/IsMerchantPaidOut');
        $conditionCollection->add(new IsMerchantPayoutReversedConditionPlugin(), 'SalesPaymentMerchant/IsMerchantPayoutReversed');

        // ----- External PSP V2 Condition to ask for payment state instead of getting it told by the PSP
        $conditionCollection->add(new IsPaymentAppPaymentStatusAuthorizationFailedConditionPlugin(), 'Payment/IsAuthorizationFailed');
        $conditionCollection->add(new IsPaymentAppPaymentStatusAuthorizedConditionPlugin(), 'Payment/IsAuthorized');
        $conditionCollection->add(new IsPaymentAppPaymentStatusCanceledConditionPlugin(), 'Payment/IsCanceled');
        $conditionCollection->add(new IsPaymentAppPaymentStatusCancellationFailedConditionPlugin(), 'Payment/IsCancellationFailed');
        $conditionCollection->add(new IsPaymentAppPaymentStatusCapturedConditionPlugin(), 'Payment/IsCaptured');
        $conditionCollection->add(new IsPaymentAppPaymentStatusCaptureFailedConditionPlugin(), 'Payment/IsCaptureFailed');
        $conditionCollection->add(new IsPaymentAppPaymentStatusCaptureRequestedConditionPlugin(), 'Payment/IsCaptureRequested');
        $conditionCollection->add(new IsPaymentAppPaymentStatusOverpaidConditionPlugin(), 'Payment/IsOverpaid');
        $conditionCollection->add(new IsPaymentAppPaymentStatusUnderpaidConditionPlugin(), 'Payment/IsUnderpaid');

        return $conditionCollection;
    });

    return $container;
}
```


## Customizing for your business flow

You have several options to customize your business flow:

- Without shipping
- Without return and refund
- Without payment authorization and cancellation

### OMS without shipping
If your project doesn't involve product shipping, customize the main .XML file and each subprocess in the .XML file.
For example, you can change the transition from `"invoiced"` to `"payment capture ready"` state, making a direct transition
from `"invoiced"` to `"payment capture pending"` with `event = start payment capture`, which has the command `"Payment/Capture"` on-enter:

```xml
<transition happy="true">
    <source>invoiced</source>
    <target>payment capture pending</target>
    <event>start payment capture</event>
</transition>
```

![oms-without-shipping](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/acp/integrate-acp-payment-apps-with-spryker-oms-configuration/oms-without-shipping.png)


### OMS without return and refund

If your project doesn't require returns and refunds, remove the `"ItemReturn"` and `"PaymentRefund"` processes from the main .XML file under `<subprocesses>` and at the bottom of the file:

```xml
<!-- Remove these lines -->
<process name="ItemReturn" file="Subprocess/ItemReturn01.xml"/>
<process name="PaymentRefund" file="Subprocess/PaymentRefund01.xml"/>
```

Also, remove the transition in the main file using states from the removed processes:

```xml
<!-- Remove this transition -->
<transition>
    <source>returned</source>
    <target>payment refund ready</target>
    <event>refund</event>
</transition>
```

Now, your OMS won't include blocks for `"ItemReturn"` and `"PaymentRefund"`.

![oms-without-returns-and-refunds](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/acp/integrate-acp-payment-apps-with-spryker-oms-configuration/oms-without-returns-and-refunts.png)


### OMS without payment authorization and cancellation

For a simpler payment flow without pre-authorization, cancellation, and refunds, your configuration will be much simpler without these blocks:

- PaymentAuthorization
- PaymentCancel
- ItemReturn
- PaymentRefund

```xml
<?xml version="1.0"?>
<statemachine
    xmlns="spryker:oms-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:oms-01 https://static.spryker.com/oms-01.xsd">

    <process name="ForeignPaymentStateMachine01" main="true">
        <subprocesses>
            <process>PaymentCapture</process>
            <process>ItemSupply</process>
            <process>ItemClose</process>
        </subprocesses>

        <states>
            <state name="new" display="oms.state.new"/>
            <state name="invoiced" reserved="true" display="oms.state.waiting"/>
        </states>

        <transitions>
            <transition happy="true">
                <source>new</source>
                <target>payment capture ready</target>
                <event>created</event>
            </transition>

            <transition happy="true">
                <source>payment captured</source>
                <target>invoiced</target>
                <event>invoice customer</event>
            </transition>

            <transition happy="true">
                <source>invoiced</source>
                <target>delivered</target>
                <event>deliver</event>
            </transition>
        </transitions>

        <events>
            <event name="created" onEnter="true"/>
            <event name="invoice customer" manual="true"/>
        </events>
    </process>

    <process name="PaymentCapture" file="Subprocess/PaymentCapture01.xml"/>
    <process name="ItemSupply" file="Subprocess/ItemSupply01.xml"/>
    <process name="ItemClose" file="Subprocess/ItemClose01.xml"/>

</statemachine>
```

![oms-payment-capture-without-authorization](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/acp/integrate-acp-payment-apps-with-spryker-oms-configuration/oms-payment-capture-without-authorization.png)

### The most critical elements that must stay in your project

The following elements are critical and must stay in your project. They are responsible for the messages sent to the ACP payment apps to run payment operations for the specific order or order items:

1. `\Pyz\Zed\MessageBroker\MessageBrokerDependencyProvider::PLUGINS_MESSAGE_HANDLER` has plugins:
- `Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentOperationsMessageHandlerPlugin`
- `Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentMethodMessageHandlerPlugin`

2. `\Spryker\Zed\Oms\OmsDependencyProvider::COMMAND_PLUGINS` has commands:
- `$commandCollection->add(new SendCapturePaymentMessageCommandPlugin(), 'Payment/Capture');`
- `$commandCollection->add(new SendRefundPaymentMessageCommandPlugin(), 'Payment/Refund');`
- `$commandCollection->add(new SendCancelPaymentMessageCommandPlugin(), 'Payment/Cancel');`

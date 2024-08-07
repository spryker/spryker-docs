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

## Default ACP payment OMS  

The default ACP payment OMS configuration is located at `vendor/spryker/sales-payment/config/Zed/Oms/ForeignPaymentStateMachine01.xml`.
This configuration is assigned to each order paid with the ACP payment method. 

### XML file structure

The main OMS file includes `<subprocesses>` – similar to libraries or building blocks with their own `<states>`, `<transitions>`, and `<events>`:

```xml
<subprocesses>
    <process name="PaymentAuthorization" file="Subprocess/PaymentAuthorization01.xml"/>
    <!-- Other subprocesses -->
</subprocesses>
```

Each process in the `<subprocesses>` section has a start state, one or more final states, and the states are linked to each other in the main State Machine .xml file.

![default-oms](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/acp/integrate-acp-payment-apps-with-spryker-oms-configuration/default-oms.png)

The default setup assumes a two-step process for collecting money, beginning with the `PaymentAuthorization` subprocess.

### Automatic transitions of states

Transitions between states occur automatically via asynchronous ACP messages handled by the `spryker/message-broker` module. 
The sub-processes with auto-transitions are: `PaymentAuthorization`, `PaymentCapture`, `PaymentRefund`, and `PaymentCancel`.

The MessageBroker worker checks for new messages in the background (cron job) and triggers OMS events based on
the configuration in `\Spryker\Zed\Payment\PaymentConfig::getSupportedOrderPaymentEventTransfersList()`.You can modify this configuration for your project.

The list of payment event messages is predefined, and they are common for all payment methods from the ACP App Catalog:
- PaymentAuthorized
- PaymentAuthorizationFailed
- PaymentCanceled
- PaymentCancellationFailed
- PaymentCaptured
- PaymentCaptureFailed
- PaymentRefunded
- PaymentRefundFailed

For example, a submitted order from the state `"new"` moves to the `PaymentAuthorization` sub-process where OMS will wait for a payment event from ACP apps. Depending on the received message, the order is then moved to the next state: either `"payment authorized"` or `"payment authorization failed"`.

A similar approach is implemented also in the `PaymentCapture`, `PaymentRefund` and `PaymentCancel` sub-processes.

{% info_block infoBox "Manual transition between states" %}

In case where a payment operation happened offline or was changed in the payment provider system, but the corresponding message about it wasn't sent or was lost, you can manually trigger a transition for each operation in the Back Office. For instructions on how to change states of orders, see [Change the state of order items](/docs/pbc/all/order-management-system/{{site.version}}/base-shop/manage-in-the-back-office/orders/change-the-state-of-order-items.html).

For example, if an order got stuck in the `"payment capture pending"` state, a Back office user can make sure that the payment is resolved through alternative means and click **payment capture successful** to transition the order to the `"payment captured"` state.

{% endinfo_block %}

### Payment operation commands

The default OMS setup has three commands:
- `Payment/Capture`
- `Payment/Cancel`
- `Payment/Refund`

The commands send asynchronous ACP messages to a payment app, allowing it to schedule the requested operation for a specific amount for the selected order and its items. The payment app responds with a payment event message indicating either success or failure.

The list of payment command messages is predefined:
- CapturePayment
- CancelPayment
- RefundPayment

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




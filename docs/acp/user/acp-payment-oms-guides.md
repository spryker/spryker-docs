---
title: Integrate ACP Payment Apps with Your Spryker OMS configuration
description: Learn how to seamlessly integrate ACP payment apps with your Spryker Order Management System (OMS).
template: howto-guide-template
last_updated: Feb 10, 2024
---

**Introduction:**

This guide provides step-by-step instructions to set up your project with the ACP payment app, ensuring seamless integration with your customized Order Management System (OMS) configuration.

## Prerequisites

Before you begin, ensure the following:
- You have installed the Spryker Order Management System. Refer to the [Install the Order Management feature](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) guide.
- Familiarize yourself with OMS basics by exploring the [Order Management feature overview](https://docs.spryker.com/docs/pbc/all/order-management-system/{{page.version}}/base-shop/order-management-feature-overview/order-management-feature-overview.html), [State machine cookbook](https://docs.spryker.com/docs/pbc/all/order-management-system/{{page.version}}/base-shop/state-machine-cookbook/state-machine-cookbook.html) along with their subpages.

## Understanding Default ACP Payment OMS  

The default ACP payment OMS configuration is located at `vendor/spryker/sales-payment/config/Zed/Oms/ForeignPaymentStateMachine01.xml`.
This configuration is assigned to each order paid with the ACP payment method. 

### XML file structure

The main OMS file includes `<subprocesses>` – similar to libraries or building blocks with their own `<states>`, `<transitions>`, and `<events>`.

```xml
<subprocesses>
    <process name="PaymentAuthorization" file="Subprocess/PaymentAuthorization01.xml"/>
    <!-- Other subprocesses -->
</subprocesses>
```

Each process in the `<subprocesses>` section has a start state, one or more final states, and the states are linked to each other in the main State Machine .xml file.

[img: default OMS]

The default setup assumes a two-step process for collecting money, beginning with the "PaymentAuthorization" subprocess.

### Automatic states changing

Transitions between states occur automatically via asynchronous ACP messages handled by the "spryker/message-broker" module. 
The sub-processes with auto-transitions: "PaymentAuthorization", "PaymentCapture", "PaymentRefund" and "PaymentCancel".

The MessageBroker worker checks for new messages in the background (cron job) and triggers OMS events based on
the configuration in `\Spryker\Zed\Payment\PaymentConfig::getSupportedOrderPaymentEventTransfersList()` (you can modify it for your project).

The list of payment event messages is predefined:
- PaymentAuthorized
- PaymentAuthorizationFailed
- PaymentCanceled
- PaymentCancellationFailed
- PaymentCaptured
- PaymentCaptureFailed
- PaymentRefunded
- PaymentRefundFailed

and they are common for all payment methods from ACP App Catalog.

For example, a submitted order from the state `"new"` goes to the "PaymentAuthorization" subprocess where OMS will wait a payment event from ACP apps
which will move order to the next state: `"payment authorized"` or `"payment authorization failed"` depending on the message.

Similar approach is implemented also in "PaymentCapture", "PaymentRefund" and "PaymentCancel" sub-processes.

{% info_block infoBox "Note" %}

In case when payment operation happened offline or changed in payment provider system, but for some reason the message about it is not sent/lost,
there is a manual transition available for each operation (by clicking button in the Back office UI). For example, an order stuck in the `"payment capture pending"` state,
in this case a Back office user can make sure that the payment is solved in another way and click [payment capture successful] button to move the order to `"payment captured"`.

{% endinfo_block %}

### Payment Operation Commands

The default OMS setup has 3 commands:
1. "Payment/Capture"
2. "Payment/Cancel"
3. "Payment/Refund"

The commands send asynchronous ACP messages to a payment app, so it can schedule requested operation for the specific amount for selected order and its items.
Then as a response a payment app with payment event message (success/fail).

The list of payment command messages is predefined:
- CapturePayment
- CancelPayment
- RefundPayment

In the project OMS configuration you can put these commands into the needed transition.

## Configuring OMS for Your Project

As each project has its unique order flow and use-cases, customize your OMS configuration while ensuring compatibility with ACP Catalog payment methods. Follow these steps:

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

## Customizing for Your Business Flow

### Without shipping
If your project doesn't involve product shipping, customize the main .xml file and each subprocess .xml file.
For example, you can change the transition from `"invoiced"` to `"payment capture ready"` state, making a direct transition
from `"invoiced"` to `"payment capture pending"` with `event = start payment capture`, which has the command `"Payment/Capture"` on-enter.

```xml
<transition happy="true">
    <source>invoiced</source>
    <target>payment capture pending</target>
    <event>start payment capture</event>
</transition>
```

[img: OMS without shipping]


### Without Return and Refund

If your project doesn't require returns and refunds, remove the `"ItemReturn"` and `"PaymentRefund"` processes from the main .xml file under `<subprocesses>` and at the bottom of the file.

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

Now, your OMS will not include blocks for `"ItemReturn"` and `"PaymentRefund"`.

[img: OMS without returns and refunds]


### Without Payment Authorization and Cancellation

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

[img: OMS payment capture without authorization]

### The most critical elements that must stay in Your Project

1. `\Pyz\Zed\MessageBroker\MessageBrokerDependencyProvider::PLUGINS_MESSAGE_HANDLER` has plugins:
- `Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentOperationsMessageHandlerPlugin` 
- `Spryker\Zed\Payment\Communication\Plugin\MessageBroker\PaymentMethodMessageHandlerPlugin`

2. `\Spryker\Zed\Oms\OmsDependencyProvider::COMMAND_PLUGINS` has commands: 
- `$commandCollection->add(new SendCapturePaymentMessageCommandPlugin(), 'Payment/Capture');`
- `$commandCollection->add(new SendRefundPaymentMessageCommandPlugin(), 'Payment/Refund');`
- `$commandCollection->add(new SendCancelPaymentMessageCommandPlugin(), 'Payment/Cancel');`

They are responsible for the messages sent to the ACP payment apps to run payment operations for the specific order or order item(s).


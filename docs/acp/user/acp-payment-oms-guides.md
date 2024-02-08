---
title: Integrate ACP Payment Apps with Your Spryker OMS configuration
description: Learn how to seamlessly integrate ACP payment apps with your Spryker Order Management System (OMS).
template: howto-guide-template
last_updated: Feb 10, 2024
---

**Introduction:**

This guide outlines the steps to set up your project with the ACP payment app, ensuring compatibility with your customized OMS configuration.

## Configuring OMS for Your Project

The default ACP payment OMS configuration is located at `vendor/spryker/sales-payment/config/Zed/Oms/ForeignPaymentStateMachine01.xml`.

However, as each project has its own order flow and unique use-cases, you'll want to customize your OMS configuration and still
be compatible with payment methods from ACP Catalog. Follow these steps:

1. Familiarize yourself with OMS basics by referring to the [Install the Order Management feature](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) guide.
2. Create your own payment OMS configuration based on `ForeignPaymentStateMachine01.xml`. Copy this file along with the `Subprocess/` folder to the project root `config/Zed/oms`.
3. Rename the file and update the `<process name=""` value within the file to be equal to the file name.
4. Enabled your new OMS configuration in the config file.

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

The main OMS file includes `<subprocesses>` – similar to libraries or building blocks with their own `<states>`, `<transitions>`, and `<events>`.

```xml
<subprocesses>
    <process name="PaymentAuthorization" file="Subprocess/PaymentAuthorization01.xml"/>
    <!-- Other subprocesses -->
</subprocesses>
```

Each process in the `<subprocesses>` section has a start state, one or more final states, and they are linked to the main State Machine .xml file.

[img: default OMS]

## Customizing for Your Business Flow

If your project doesn't involve product shipping, customize the main .xml file and each subprocess .xml file.

### Without shipping

For example, you can change the transition from `"invoiced"` to `payment capture ready` state, making a direct transition
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

TODO
---
title: Create MerchantOms flows
description: This articles provides details how to create new MerchantOms flow within your Spryker Marketplace Project.
template: howto-guide-template
last_updated: Nov 21, 2023
---

This document provides the details about how to create a new MerchantOms flow.

To create a new MerchantOms flow, follow the steps:

1. Create a new XML file `config/Zed/oms/MarketplacePayment01.xml`.
2. Add the Demo01 state machine process schema as follows:

```xml
<?xml version="1.0"?>
<statemachine
	xmlns="spryker:oms-01"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">
	<!-- Used as example XML for OMS implementation -->

	<process name="MarketplacePayment01" main="true">
		<states>
		</states>

		<transitions>
		</transitions>

		<events>
		</events>
	</process>
</statemachine>		
```

3. Activate the OMS process in the `config_default.php` in config/shared folder by adding the name of the process `MarketplacePayment01` to the key `[OmsConstants::ACTIVE_PROCESSES]`.

```php
$config[OmsConstants::ACTIVE_PROCESSES] = [
	'MarketplacePayment01'
];
```

4. Create Merchant state machines. To learn more about state machine creation, see [Tutorial - OMS and State Machines](/docs/dg/dev/backend-development/data-manipulation/create-an-order-management-system-spryker-commerce-os.html).

**config/Zed/StateMachine/Merchant/MainMerchantStateMachine.xml**

```xml
<?xml version="1.0"?>
<statemachine
    xmlns="spryker:state-machine-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:state-machine-01 http://static.spryker.com/state-machine-01.xsd"
>

    <process name="MainMerchantStateMachine" main="true">

        <states>
            <state name="new"/>
            <state name="shipped"/>
            <state name="delivered"/>
        </states>

        <transitions>
            <transition happy="true">
                <source>new</source>
                <target>shipped</target>
                <event>ship</event>
            </transition>

            <transition happy="true">
                <source>shipped</source>
                <target>delivered</target>
                <event>deliver</event>
            </transition>

        </transitions>

        <events>
            <event name="deliver" manual="true"/>
            <event name="ship" manual="true"/>  
        </events>
    </process>
</statemachine>
```

6. Hook the state machine into the checkout.
Open the configuration file `config/Shared/config_default.php`(`config_default-docker.php` if you are using Docker) and make the invoice payment method use the `MarketplacePayment01` process.

```php
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    DummyPaymentConfig::PAYMENT_METHOD_INVOICE => 'MarketplacePayment01',
];
```

7. To assign the `MerchantOms` flow to a `Merchant`, you can use the `MerchantOmsDataImport` module.
Fill in the `merchant_oms_process.csv` as shown in the following example:

```php
merchant_reference,merchant_oms_process_name
MER000001,MainMerchantStateMachine
```
and run the following command:

```bash
data:import merchant-oms-process
```

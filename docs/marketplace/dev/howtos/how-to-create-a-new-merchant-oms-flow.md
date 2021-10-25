---
title: "How-To: Create a new MerchantOms flow"
description: This articles provides details how to create new MerchantOms flow
template: howto-guide-template
---

#Creating of a new MerchantOms flow <!---in -ing form, e.g. Creating CMS pages)-->

This article provides the details of how to create new MerchantOms flow

<!---Help the readers to determine quickly if the HowTo matches their interests or needs. In a few sentences, summarize the main points of your HowTo. Make sure to include any critical definitions which will help readers evaluate the utility of your HowTo.-->

<!---State the purpose of your HowTo. Explain how the reader will benefit from reading it. Give your reader an incentive or two to continue.-->
 
<!---Inform your readers about any required knowledge, configuration, or resources they may need before stepping through your HowTo. Give links to resources that will be useful to fulfill the prerequisites.-->

1. Create a new XML file `config/Zed/oms/MarketplacePayment01.xml`
2. Add the Demo01 state machine process schema as following:
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
3. Activate the OMS process in config_default.php in config/shared by adding the name of the process `MarketplacePayment01` to the key [OmsConstants::ACTIVE_PROCESSES].

```php
$config[OmsConstants::ACTIVE_PROCESSES] = [
	'MarketplacePayment01'
];
```
4. Create Merchant state machines (To learn more about state machine creation, see [Tutorial - OMS and State Machines](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/1018855468/Tutorial+-+OMS+and+State+Machines+-+Spryker+Commerce+OS+-review))

`MainMerchantStateMachine.xml`
```xml
<?xml version="1.0"?>
<statemachine
    xmlns="spryker:state-machine-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:state-machine-01 http://static.spryker.com/state-machine-01.xsd"
>

    <process name="MainMerchantStateMachine" main="true">

        <states>
            <state name="created"/>
            <state name="new"/>
            <state name="canceled"/>
            <state name="left the merchant location"/>
            <state name="arrived at distribution center"/>
            <state name="shipped"/>
            <state name="delivered"/>
            <state name="closed"/>
        </states>

        <transitions>
            <transition happy="true">
                <source>created</source>
                <target>new</target>
                <event>initiate</event>
            </transition>

            <transition>
                <source>new</source>
                <target>closed</target>
                <event>close</event>
            </transition>

            <transition>
                <source>new</source>
                <target>canceled</target>
                <event>cancel</event>
            </transition>

            <transition>
                <source>canceled</source>
                <target>closed</target>
                <event>close</event>
            </transition>

            <transition happy="true">
                <source>new</source>
                <target>left the merchant location</target>
                <event>send to distribution</event>
            </transition>

            <transition happy="true">
                <source>left the merchant location</source>
                <target>arrived at distribution center</target>
                <event>confirm at center</event>
            </transition>

            <transition happy="true">
                <source>arrived at distribution center</source>
                <target>shipped</target>
                <event>ship</event>
            </transition>

            <transition happy="true">
                <source>shipped</source>
                <target>delivered</target>
                <event>deliver</event>
            </transition>

            <transition happy="true">
                <source>delivered</source>
                <target>closed</target>
                <event>close</event>
            </transition>
        </transitions>

        <events>
            <event name="initiate" onEnter="true"/>
            <event name="send to distribution" manual="true"/>
            <event name="confirm at center" manual="true"/>
            <event name="ship" manual="true" command="MarketplaceOrder/ShipOrderItem"/>
            <event name="deliver" manual="true" command="MarketplaceOrder/DeliverOrderItem"/>
            <event name="close"/>
            <event name="cancel" manual="true" command="MarketplaceOrder/CancelOrderItem"/>
        </events>

        <subprocesses>
            <process>MerchantReturn</process>
            <process>MerchantRefund</process>
        </subprocesses>

    </process>

    <process name="MerchantReturn" file="Subprocess/MerchantReturn"/>
    <process name="MerchantRefund" file="Subprocess/MerchantRefund"/>

</statemachine>

```
5. And subprocesses:
MerchantRefund.xml
```xml
<?xml version="1.0"?>
<statemachine
    xmlns="spryker:oms-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

    <process name="MerchantRefund">
        <states>
            <state name="refunded"/>
        </states>

        <transitions>
            <transition>
                <source>delivered</source>
                <target>refunded</target>
                <event>refund</event>
            </transition>

            <transition>
                <source>returned</source>
                <target>refunded</target>
                <event>refund</event>
            </transition>
        </transitions>

        <events>
            <event name="refund" manual="true" command="MarketplaceOrder/Refund"/>
        </events>
    </process>

</statemachine>
```
MerchantReturn.xml
```xml
<?xml version="1.0"?>
<statemachine
    xmlns="spryker:oms-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

    <process name="MerchantReturn">
        <states>
            <state name="waiting for return"/>
            <state name="returned"/>
            <state name="return canceled"/>
            <state name="shipped to customer"/>
        </states>

        <transitions>
            <transition>
                <source>shipped</source>
                <target>waiting for return</target>
                <event>start-return</event>
            </transition>

            <transition>
                <source>delivered</source>
                <target>waiting for return</target>
                <event>start-return</event>
            </transition>

            <transition>
                <source>waiting for return</source>
                <target>returned</target>
                <event>execute-return</event>
            </transition>

            <transition>
                <source>waiting for return</source>
                <target>return canceled</target>
                <event>cancel-return</event>
            </transition>

            <transition>
                <source>return canceled</source>
                <target>shipped to customer</target>
                <event>ship-return</event>
            </transition>

            <transition>
                <source>shipped to customer</source>
                <target>delivered</target>
                <event>deliver-return</event>
            </transition>
        </transitions>

        <events>
            <event name="start-return"/>
            <event name="execute-return" command="MarketplaceReturn/ExecuteReturnForOrderItem" manual="true"/>
            <event name="cancel-return" command="MarketplaceReturn/CancelReturnForOrderItem" manual="true"/>
            <event name="ship-return" command="MarketplaceReturn/ShipReturnForOrderItem" manual="true"/>
            <event name="deliver-return" command="MarketplaceReturn/DeliverReturnForOrderItem" manual="true"/>
        </events>
    </process>

</statemachine>
```

6. Use the state machine by hooking it into the checkout.
To do so, open the configuration file `config/Shared/config_default.php`(`config_default-docker.php` if you use docker) and make the invoice payment method use the `MarketplacePayment01` process.
```php
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    DummyPaymentConfig::PAYMENT_METHOD_INVOICE => 'MarketplacePayment01',
];	
```

7. To assign the `MerchantOms` flow to a `Merchant`, you can use the `MerchantOmsDataImport` module.
Fill in `merchant_oms_process.csv` as shown in the example below:

```php
merchant_reference,merchant_oms_process_name
MER000001,MainMerchantStateMachine

```
and run the following command: 
```bash
data:import merchant-oms-process
```

<!---In a precise, step-by-step approach, walk your reader through the process. Make sure your reader can reproduce your intended result by following your exact steps. Make the learning process efficient by supplying code samples and/or configuration details as necessary.-->

<!---In a few sentences, summarize what the reader has just learned. Describe the end result they should obtain after executing the instructions of your HowTo.-->

<!---If your HowTo consists of several interdependent guides, add the "What's Next" section where you guide the reader to the next step. For example: *Now that the SprykerModule is installed*, <u>integrate it to your project</u> (this would be a link to the next HowTo explaining how to integrate the module).-->

<!---Provide links to external resources that will help the reader better understand the described topic or execute the guidelines more efficiently.-->

<!---Add topics from our documentation website that are related to the topic of your HowTo or that logically continues or supplements it.-->

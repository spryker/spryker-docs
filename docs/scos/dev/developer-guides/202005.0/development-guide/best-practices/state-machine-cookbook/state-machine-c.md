---
title: State Machine Cookbook - Part 2 - Building a State Machine
originalLink: https://documentation.spryker.com/v5/docs/state-machine-cookbook-2
redirect_from:
  - /v5/docs/state-machine-cookbook-2
  - /v5/docs/en/state-machine-cookbook-2
---

{% info_block infoBox %}
This chapter will help you model a state machine using Spryker to manage your sale orders.
{% endinfo_block %}

First of all, it’s important to know which tasks must be executed after an order is submitted and in which order. Keep in mind that you can define more than one state machine in your system to cover the use case scenarios you want to enable in your shop.

Before starting the development and configuration for a new state machine, it’s important to draw on a paper the sequence of the processes that must take place after an order is placed and to think about any scenario that could take place (the order is over/under paid, the order could not be delivered at the given address, etc.). Of course, the state machine can be improved/fixed if you observe that not every possible use case scenario is covered or if the order is not managed as expected.

Just as an exercise to understand how to draw and implement a state machine that can help you manage orders, we’ll build together a state machine that manages prepaid orders. Please keep in mind that this tutorial is focused on the steps that should be performed in order to add a new state machine in your application, and not on the use case scenario itself. This example should not be used in a production environment since it’s not complete.

This use case scenario must implement the following behaviors:

* the payment must be done before packing the order.
* after the order is paid, it can be packed and shipped to the customer.
* the customer can return order items within 100 days since the order was placed.
* if the customer returns order items, the refund process must be initiated.
* after 100 days have passed, the order is considered completed.
* after a return, the order is considered completed.

Please follow the steps described below to model the prepaid state machine:

* Create the XML file
* Identify the states
* Identify the events
* Define the transitions
* Development
* Integrate the State Machine

### Create the XML file
To start defining your new state machine, create a new XML file under `config/Zed/oms/` called `Prepayment.xml`. For the moment the file will contain only the name of the process that we are currently building (Prepayment).

```xml
<?xml version="1.0"?>
<statemachine
    xmlns="spryker:oms-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

    <process name="Prepayment" main="true">
    </process>

</statemachine>
```

We added the `main="true"` attribute to the process because this process manages an entire workflow. Given that there are many parts that are similar between the state machines that a system needs, you can reuse parts of them as subprocesses. Subprocesses are described in the XML file similar as the oms processes, the only process is the value of this attribute (`main="false"`).

{% info_block infoBox %}
To see a graphical representation of the current state of your state machine in Zed, register the state machine in the OmsConfig.
{% endinfo_block %}


```php
<?php
namespace Pyz\Zed\Oms;

use Generated\Shared\Transfer\OrderTransfer;
use Spryker\Zed\Oms\OmsConfig as SprykerOmsConfig;

class OmsConfig extends SprykerOmsConfig
{

const ORDER_PROCESS_PREPAYMENT = 'Prepayment';

    /**
     * @return string
     */
    public function getProcessDefinitionLocation()
    {
        return APPLICATION_ROOT_DIR . '/config/Zed/oms/';
    }

    /**
     * @return array
     */
    public function getActiveProcesses()
    {
        return [
            //..
            static::ORDER_PROCESS_PREPAYMENT,
        ];
    }
}
```

### Identify the States
Now, let’s identify the states in which the order can be at a moment. Which are the steps in which a order must pass to complete a prepaid order?

1. New
2. Invoice generated
3. Invoice sent
4. Waiting for payment
5. Payment reminder sent
6. Payment received
7. Order canceled
8. Order exported
9. Order shipped
10. Ready for return
11. Refund initiated
12. Order completed

Add these states in the XML file you previously created, as in the example below:

```xml
<?xml version="1.0"?>
<statemachine
    xmlns="spryker:oms-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

    <process name="Prepayment" main="true">

        <states>
            <state name="new"/>
            <state name="invoice generated"/>
            <state name="invoice sent"/>
            <state name="waiting for payment"/>
            <state name="cancelled"/>
            <state name="payment received"/>
            <state name="payment reminder sent"/>
            <state name="exported order"/>
            <state name="order shipped"/>
            <state name="ready for return"/>
            <state name="refund initiated"/>
            <state name="completed"/>
        </states>

    </process>
</statemachine>
```

You can check the current state of your state machine in Zed: [Prepayment](http://zed.mysprykershop.com/oms/index/draw?process=Prepayment&format=svg&font=14). You’ll see the states defined before, without any links between them. To pass from one state to another, a transition must be defined between two states. To be able to tell when a transition can be fired, an event attached to that transition must take place.

### Identify the Events
Next, let’s identify the events that can tell if a transition can be fired.

|  #   |        Event         |   Event Trigger   |                           Comments                           |
| :--: | :------------------: | :---------------: | :----------------------------------------------------------: |
|      |    Create invoice    |  onEnter=”true”   |                  Event fired automatically                   |
|      |     Send invoice     |  onEnter=”true”   |                                                              |
|      | Waiting for payment  |  onEnter=”true”   |                                                              |
|      | Payment not received |  timeout=”1hour”  |          Fired after the specified time has passed           |
|      |    Order canceled    |   manual=”true”   | Event fired after user action (either from back-office or from the shop interface) |
|      |   Payment received   |   manual=”true”   |                 Export order onEnter=”true”                  |
|      |      Ship order      |   manual=”true”   |                                                              |
|      |  Items not returned  | timeout=”100days” |                                                              |
|      |   Ready for return   |  onEnter=”true”   |                                                              |
|      |    Items returned    |   manual=”true”   |                                                              |
|      |    Refund payment    |   manual=”true”   |                                                              |

Now that we identified the events, we can add them in the XML file that defines our state machine.

```xml
<events>
        <event name="create invoice" onEnter="true" />
        <event name="send invoice" onEnter="true" />
        <event name="export order" onEnter="true" />
        <event name="ship order" manual="true" />
        <event name="waiting for payment" onEnter="true" />
        <event name="payment not received" timeout="1hour" />
        <event name="payment received" manual="true" />
        <event name="ready for return"  onEnter="true" />
        <event name="item not returned" timeout="100days" />
        <event  name="items returned" manual="true" />
        <event name="refund payment" manual="true" />
        <event name="cancel" manual="true" />
    </events>
```

{% info_block infoBox "Timeout Events " %}
If the state machine's current state is the source state for a transition that has a timeout event attached, it will be checked periodically by a cronjob to see if that amount of time has already passed.
{% endinfo_block %}

Define the Transitions

Transitions draw the links from one state to another. They are bound to an event, which tells when the transition can be fired( when the state machine can move from the current state to another state).

A transition can have a condition attach which is check when the state machine is currently in the source state by a cronjob that runs periodically. Basically, the condition is linked to a PHP class that contains logic that checks if the transition can take place.

Now, let’s draw the possible transitions between the previously defined states and setup the corresponding event for each of them.

```xml
<transitions>
        <transition>
            <source>new</source>
            <target>invoice generated</target>
            <event>create invoice</event>
        </transition>

        <transition>
            <source>invoice generated</source>
            <target>invoice sent</target>
            <event>send invoice</event>
        </transition>

        <transition>
            <source>invoice sent</source>
            <target>waiting for payment</target>
            <event>waiting for payment</event>
        </transition>

        <transition>
            <source>waiting for payment</source>
            <target>cancelled</target>
            <event>cancel</event>
        </transition>

        <transition>
            <source>waiting for payment</source>
            <target>payment reminder sent</target>
            <event>payment not received</event>
        </transition>

        <transition>
            <source>waiting for payment</source>
            <target>payment received</target>
            <event>payment received</event>
        </transition>

        <transition>
            <source>payment reminder sent</source>
            <target>cancelled</target>
            <event>cancel</event>
        </transition>

        <transition>
            <source>payment reminder sent</source>
            <target>payment received</target>
            <event>payment received</event>
        </transition>

        <transition>
            <source>payment received</source>
            <target>exported order</target>
            <event>export order</event>
        </transition>

        <transition>
            <source>exported order</source>
            <target>order shipped</target>
            <event>ship order</event>
        </transition>

        <transition>
            <source>order shipped</source>
            <target>ready for return</target>
            <event>ready for return</event>
        </transition>

        <transition>
            <source>ready for return</source>
            <target>completed</target>
            <event>item not returned</event>
        </transition>

        <transition>
                <source>ready for return</source>
                <target>refund initiated</target>
                <event>items returned</event>
            </transition>

            <transition>
                <source>refund initiated </source>
                <target>completed</target>
                <event>refund payment</event>
            </transition>

    </transitions>
```

You can check the current state of your state machine in Zed: [Prepayment](http://zed.mysprykershop.com/oms/index/draw?process=Prepayment&format=svg&font=14).

We can highlight the best case scenario by adding the happy=”true” attribute to the transitions, where is the case, as in the example below:

```xml
<transition happy="true">
	<source>ready for return</source>
       <target>completed</target>
       <event>item not returned</event>
</transition>
```

This transition would be the happy case, rather than the situation when the user returns some order items. If you check again the visual representation of the state machine we are building, you’ll observe that the best case scenario transitions are now highlighted.

{% info_block warningBox %}
Adding the **happy** attribute does not interfere to the behavior of the state machine; it just helps you visualize better the business processes that are modeled in the state machine.
{% endinfo_block %}

### Implement the Commands and Conditions
Now we can visualize the transitions defined in our state machine and we have an idea about the business processes that are involved when a prepaid order is submitted, but our state machine doesn’t do much for the moment. We need to attach the logic that gets executed when an event is fired or condition to check if a transition is possible. We’ll update the XML file that defines our state machine by adding the necessary commands and conditions to it.

```xml
<?xml version="1.0"?>
<statemachine
    xmlns="spryker:oms-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

    <process name="Prepayment" main="true">

        <states>
            <state name="new" reserved="true"/>
            <state name="invoice generated"/>
            <state name="invoice sent" />
            <state name="waiting for payment" />
            <state name="cancelled" />
            <state name="payment received" />
            <state name="payment reminder sent" />
            <state name="exported order" />
            <state name="order shipped" />
            <state name="ready for return" />
            <state name="refund initiated" />
            <state name="completed" />
        </states>

        <transitions>
            <transition happy="true" >
                <source>new</source>
                <target>invoice generated</target>
                <event>create invoice</event>
            </transition>

            <transition happy="true">
                <source>invoice generated</source>
                <target>invoice sent</target>
                <event>send invoice</event>
            </transition>

            <transition happy="true">
                <source>invoice sent</source>
                <target>waiting for payment</target>
                <event>waiting for payment</event>
            </transition>

            <transition>
                <source>waiting for payment</source>
                <target>cancelled</target>
                <event>cancel</event>
            </transition>

            <transition>
                <source>waiting for payment</source>
                <target>payment reminder sent</target>
                <event>payment not received</event>
            </transition>

            <transition happy="true">
                <source>waiting for payment</source>
                <target>payment received</target>
                <event>payment received</event>
            </transition>

            <transition>
                <source>payment reminder sent</source>
                <target>cancelled</target>
                <event>cancel</event>
            </transition>

            <transition>
                <source>payment reminder sent</source>
                <target>payment received</target>
                <event>payment received</event>
            </transition>

            <transition>
                <source>payment received</source>
                <target>exported order</target>
                <event>export order</event>
            </transition>

            <transition happy="true">
                <source>exported order</source>
                <target>order shipped</target>
                <event>ship order</event>
            </transition>

            <transition happy="true">
                <source>order shipped</source>
                <target>ready for return</target>
                <event>ready for return</event>
            </transition>

            <transition happy="true">
                <source>ready for return</source>
                <target>completed</target>
                <event>item not returned</event>
            </transition>

            <transition>
                <source>ready for return</source>
                <target>refund initiated</target>
                <event>items returned</event>
            </transition>

            <transition condition="Prepayment/IsRefundApproved">
                <source>refund initiated</source>
                <target>completed</target>
                <event>refund payment</event>
            </transition>

        </transitions>
        <events>
            <event name="create invoice" onEnter="true" command="Prepayment/CreateInvoice" />
            <event name="send invoice" onEnter="true" command="Prepayment/SendInvoice" />
            <event name="export order" onEnter="true" />
            <event name="ship order" manual="true" />
            <event name="waiting for payment" onEnter="true" />
            <event name="payment not received" timeout="1hour" command="Prepayment/UpdatePaymentStatus" />
            <event name="payment received" manual="true" command="Prepayment/UpdatePaymentStatus" />
            <event name="ready for return"  onEnter="true" />
            <event name="item not returned" timeout="100days" />
            <event  name="items returned" manual="true" command="Prepayment/UpdateOrder" />
            <event name="refund payment" manual="true" command="Prepayment/RefundPayment" />
            <event name="cancel" manual="true" command="Prepayment/CancelOrder" />
        </events>
    </process>
</statemachine>
```


Now check again the [Prepayment](http://zed.mysprykershop.com/oms/index/draw?process=Prepayment&format=svg&font=14) state machine in Zed. You’ll see that some of the events now have commands associated and some of the transitions appear to have conditions attached, but they are marked as being not yet implemented. For our state machine to be functional, we need to implement the configured commands and conditions.

The implementation for the commands will be placed in `the` OMS module on the project level, under `Communication/Plugin/Oms/Commandand` for the conditions under `Communication/Plugin/Oms/Condition`. After you finish with the implementation, the code must be linked to the XML file where we defined the state machine. To pass the right implementations of `commands/conditions` to your state machine, you must register the plugins in the `OmsDependencyProvider`: the conditions will be registered under `thegetConditionPlugins()` and the commands under the `getCommandPlugins()` operation.

**Example**:


```php
<?php
namespace Pyz\Zed\Oms;

use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
...

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    /**
     *
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Oms\Communication\Plugin\Oms\Condition\ConditionInterface[]
     */
    protected function getConditionPlugins(Container $container)
    {
        return [
            'Prepayment/IsRefundApproved' => new IsRefundApprovedPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Oms\Communication\Plugin\Oms\Command\CommandInterface[]
     */
    protected function getCommandPlugins(Container $container)
    {
        return [
            'Prepayment/CreateInvoice' => new CreateInvoicePlugin(),
            'Prepayment/SendInvoice' => new SendInvoicePlugin(),
            'Prepayment/UpdatePaymentStatus' => new UpdatePaymentStatusPlugin(),
            'Prepayment/UpdateOrder' => new UpdateOrderPlugin(),
            'Prepayment/RefundPayment' => new RefundPaymentPlugin(),
            'Prepayment/CancelOrder' => new CancelOrderPlugin(),

        ];
    }
}
```
Now check again the [Prepayment](http://zed.mysprykershop.com/oms/index/draw?process=Prepayment&format=svg&font=14) state machine in Zed. You’ll see that the implementation is linked to the state machine.

## Integrate the State Machine
You can have more than one state machines defined in your application and apply them according to the details of the order that gets submitted.

E.g.: you can have a state machine that doesn’t involves shipping for goods that are delivered electronic. Also, you can have a dedicated state machine for each payment method (invoice payment method involves other patterns than credit card payment does).

The mapping between a submitted order and the corresponding state machine that is able to process the payment is done in the `SalesConfig` class, under the `determineProcessForOrderItem(OrderTransfer $order, QuoteTransfer $request)` operation; here, you will set the corresponding process for your order.

```php
<?php

$order->setProcess('Prepayment');
```




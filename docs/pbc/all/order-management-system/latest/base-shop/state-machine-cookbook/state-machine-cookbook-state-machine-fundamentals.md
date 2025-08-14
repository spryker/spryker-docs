  - /docs/pbc/all/order-management-system/latest/base-shop/state-machine-cookbook/state-machine-cookbook-state-machine-fundamentals.html
---
title: "State machine cookbook: State machine fundamentals"
description: In Spryker you can use the OMS module to automate the management of orders or the StateMachine module to automate other processes you define in your shop.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/state-machine-cookbook
originalArticleId: c69ec585-3962-4da9-a973-ca1e23d256d8
redirect_from:
  - /2021080/docs/state-machine-cookbook
  - /2021080/docs/en/state-machine-cookbook
  - /docs/state-machine-cookbook
  - /docs/en/state-machine-cookbook
  - /v6/docs/state-machine-cookbook
  - /v6/docs/en/state-machine-cookbook  
  - /v5/docs/state-machine-cookbook
  - /v5/docs/en/state-machine-cookbook  
  - /v4/docs/state-machine-cookbook
  - /v4/docs/en/state-machine-cookbook  
  - /v3/docs/state-machine-cookbook
  - /v3/docs/en/state-machine-cookbook  
  - /v2/docs/state-machine-cookbook
  - /v2/docs/en/state-machine-cookbook  
  - /v1/docs/state-machine-cookbook
  - /v1/docs/en/state-machine-cookbook
  - /docs/scos/dev/best-practices/state-machine-cookbook/state-machine-cookbook-part-i-state-machine-fundamentals.html
  - /docs/scos/dev/best-practices/state-machine-cookbook/state-machine-cookbook-state-machine-fundamentals.html
---

State machines are a model of computation used to automate processes. In Spryker, you can use the `OMS` module to automate the management of orders or the `StateMachine` module to automate other processes you define in your shop. Both behave similarly, but the `OMS` one is a customized solution to manage the orders in a shop.

The machine can be in one of a finite number of states, and it can be only in one state at a time—for example, a state machine is in the `waiting for payment` state.

{% info_block infoBox %}

State machines can model problems that involve performing a predetermined sequence of actions that depend on a sequence of events—for example, the order is shipped if the payment is successful.

{% endinfo_block %}


## State machine components

E-Commerce companies need to implement highly individual processes that need to be continuously improved. Instead of building a code for every process or adapting the standard functionality of a shop system, Spryker takes a totally different approach. The order process is modeled with states and transitions, and it's then transferred to an XML notation. The XML format is understood and executed by Spryker's Zed engine. Zed executes the process model; no need to program a specification anymore.

You can define a state machine for each process you identify in your application. For example, the process of managing orders that use a credit card as a payment type differs from those that use invoices. You can define a separate state machine for each, and when a new order is submitted, you can choose which of the available state machines you want to manage.

### States

What are the relevant elements of a state machine? States lets you describe in which state a sales order according to the sales order item is. States can reflect everything that needs to be considered in your order processing. If you have a build-to-order process, one state can be `waiting for production finished`. If you sell digital goods, one state can be `download for customer activated`. In case of physical goods, a state called `shipped` reflects that the sales order or some items have been shipped.

How are the states modeled in XML? A list of state elements can be defined with this simple XML. First, the state has a name that allows referencing the state. The display attribute allows defining a glossary key that contains the translation for the state name.

```xml
<states>
    <state name="new" reserved="true"/>
    <state name="paid" display="customer.order.state.received">
        <flag>invoicable</flag>
    </state>
    <state name="shipped" display="custom.order.state.shipped" />
</states>
```

Furthermore, a state can contain several flags.

### Flagged items

Sometimes you need to have the ability to check if items are in a certain state. For determining if an order is flagged, `OmsFacade` exposes two operations:
- `isOrderFlagged($idOrder, $flag)`—checks if an order contains at least a flag (at least one order item is flagged).
- `isOrderFlaggedAll($idOrder, $flag)`—checks if the entire order is flagged (all order items are flagged).

**Example:**

```xml
<states>
..
 <state name="paid">
        <flag>ready for invoice</flag>
    </state>
</states>
```

### Transitions

States can be connected one to another through transitions, similar to a finite graph. Such a transition is bound to an event, which tells when the order or order item can leave the current state. For example, the states `waiting for credit card capture` and `captured` are connected with a transition that expects an external event `capture successful`. States and transition define the possible flow a sales order can take and also which flow is actually not possible.

Technically, transitions are very simple. A source and a target state are defined. The event tells when the transition can be fired.

The event element can be omitted. This way, an external call like `saveOrder` or `triggerEvent` is finished. It means that the control flow of the code goes back to the invoking method. Zed continues the execution of the process model with the help of a cronjob. If the event element is omitted and a condition is used, Zed uses the condition to evaluate if the transition can be fired.

```xml
<transition condition="PackageName/ClassName" happy="true">
    <source>paid</source>
    <target>shipped</target>
    <event>ship it</event>
</transition>
```

#### Transitions attributes

You can attach the following attributes to a transition:

| ATTRIBUTE | DESCRIIPTION                                                  | EXAMPLE                           |
| --------- | ------------------------------------------------------------ | --------------------------------- |
| happy     | Marks the transition as the happy case. When Zed renders the process model, this transition is marked with a green shade. | `happy="true"`                   |
| condition | Allows adding PHP coding that double checks whether this transition can be fired or not. The condition is evaluated when the defined event has been fired. | `condition="PackageName/ClassName"` |

### Conditions

A transition can be conditioned: the state machine can move from one state to another if a certain condition associated with that transition is being satisfied. This can be modeled in the XML file that describes the process, as in the following example:

```xml
<transition condition="Oms/PaymentIsCompleted">
    <source>paid</source>
    <target>shipped</target>
    <event>ship it</event>
</transition>
```

The mapping between the string that identifies the condition in the XML file and the actual implementation of the condition is done in `OmsDependencyProvider`, in the `getConditionPlugins` method:

```php
<?php
protected function getConditionPlugins(Container $container)
{
    return [
        'Oms/PaymentIsCompleted' => $container->getLocator()->oms()->pluginOmsConditionPaymentIsCompleted(),
        //..
];
}
```

Another use case of using conditions is when you need to go to different target states depending on the result returned after evaluating the condition. Basically, it's a way of implementing an *if-else* block in a state machine.

Example:
![State machine condition](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/State+Machine+Cookbook/State+Machine+Cookbook+-+Part+I+-+State+Machine+Fundamentals/state-machine-condition.png)

In the preceding example, transitions are defined with the same source state (`Payment Pending`) and event (`Pay`) but different target states (`Cancelled` and `Paid`). This means that when the `Pay` event is triggered, and the state machine is in the `Payment Pending` state, you have two options for the next state. The condition is evaluated, and if it returns true, the transition that has the condition attached gets executed. In this case, the state machine moves to the `Paid` state. If it's evaluated as false, the other transition gets executed—the state machine moves to the `Cancelled` state.

You can see the corresponding XML for this use case:

```xml
<transition condition="Oms/PaymentIsCompleted" happy="true">
    <source>payment pending</source>
    <target>paid</target>
    <event>pay</event>
</transition>
 <transition>
    <source>payment pending</source>
    <target>cancelled</target>
    <event>pay</event>
</transition>
```

#### Implementing a condition

Conditions are classes that implement `ConditionInterface`, which expects a method check. This returns either true or false, which tells Zed whether or not a transition can be executed.

```php
<?php
class PaymentIsCompleted extends AbstractPlugin implements ConditionInterface
{
    /**
     * @param SpySalesOrderItem $orderItem
     *
     * @return bool
     */
    public function check(SpySalesOrderItem $orderItem)
    {
      //..
    }
}
```

#### Checking conditions through a cronjob

You can define a transition with a condition attached but with no event linked to it.

The `Oms` module contains a console command for checking conditions (`oms:check-condition`) that are attached to this type of transition. This console command is configured to be periodically triggered through a cronjob. It looks for transitions with a condition and without an event. These special transitions are rendered with a dotted line in Zed.

The use case is when you want to wait for something—for example, *wait in this state until the product is delivered*.

```xml
<transition condition="Oms/IsDelivered">
    <source>shipped</source>
    <target>delivered</target>
</transition>
```

#### Transition representation

![Transition representation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/State+Machine+Cookbook/State+Machine+Cookbook+-+Part+I+-+State+Machine+Fundamentals/state-machine-transition-representation.png)

For performance reasons, it's not recommended to create scenarios where a lot of items wait. This check is executed every minute and can be time-consuming.

### Events

An event can be triggered from the outside, and it starts a transition.

By triggering an event, you tell the state machine which transition to execute and to which state to move from the current source state.

Triggering an event follows the transition that has the current state as a source state and the triggered event type attached to it. The event triggers the transaction, and the related command is executed. The condition is checked afterward. If no condition is evaluated to true, the item stays in the source state and the timeout is reset because it moved away for a moment.

{% info_block errorBox %}

Event names must be verbs like `ship`, `pay`, `authorize`, while state names must express that something happened or will happen (like `paid` or `payment pending`, `closed`, `cancelled`).

{% endinfo_block %}

This is how an event is defined:

```xml
<event name="ship it" timeout="" manual="true|false" onEnter="true|false" command="PackageName/ClassName"/>
```

#### Event types

**OnEnter events**

A special type of event is the `OnEnter` event. If this event is attached to a transition, the state machine automatically executes it when the current state is the same as the source state of the transition. By using the `OnEnter` events, you can model a chain of commands that you want to get executed because the state machine always looks if there is another thing to do after any transition that gets executed.

For example, after the payment is successfully submitted, you want to start the export process automatically. To achieve this, you can define a transition between the `Paid` and `Exported` states with an `OnEnter` event attached to it. This means that after the payment is registered, the order is ready to be prepared for shipping.
![OnEnter Events](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/State+Machine+Cookbook/State+Machine+Cookbook+-+Part+I+-+State+Machine+Fundamentals/state-machine-onenter-events.png)

**Manually executable events**

To trigger an event manually, mark it as manually executable. When an order is in the same state as the source state of a transition that has a manually executable event attached to it, in the Back Office, on the order details page, you can see a button that corresponds to that event. By clicking the button, you trigger the event associated with it.

On the default Zed Order Details page, you can trigger an event for a single item, group of items, or all items of the order.
![Manually executable events](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/State+Machine+Cookbook/State+Machine+Cookbook+-+Part+I+-+State+Machine+Fundamentals/manually-executable-events.png)

<a name="timeout"></a>

**Timeout events**

Events can be triggered after a defined period of time has passed through a timeout.

Let's assume you are trying to define the prepayment process, in which if, after 15 days, no payment is received, the reminder sent is fired because of the timeout. How is the reminder then technically sent? This can be implemented through a command attached to the send first reminder event. The command attribute references a PHP class that implements a specific interface. Every time the event is fired (automatically, after the timeout), Zed makes sure the associated command is executed. If an exception occurs in the command coding, the order or order item stays in the source state.

```xml
<transition command="Oms/sendFirstReminder">
    <source>payment pending</source>
    <target>first reminder sent</target>
    <event>sendFirstReminder</event>
</transition>
</transitions>
...
<events>
   <event name="sendFirstReminder" manual="true" timeout="15 days"/>
...
</events>
```

You can also set the date and time when the timeout is started. For details, see [OMS Timeout Processor](/docs/pbc/all/order-management-system/{{site.version}}/base-shop/datapayload-conversion/state-machine/order-process-modelling-via-state-machines.html#oms-timeout-processor)

#### Invoking an event

Events can be triggered through the following:

- timeout automatically
- onEnter
- facade calls
- oms:check-conditions

**Events triggered through timeout**

An event associated with a transition can have a timeout interval set. When that timeout interval passes, the order is transitioned to the target state.

```xml
..
    <transition>
        <source>completed but returnable</source>
        <target>completed success</target>
        <event>not returned</event>
    </transition>
</transitions>

<events>
    <event name="not returned" timeout="30days"/>
</events>
..
```

The textual timeout is evaluated with `\DateInterval::createFromDateString()`. For more information, see [DateInterval::createFromDateString](https://www.php.net/manual/en/dateinterval.createfromdatestring.php).

#### Events triggered automatically using onEnter

If an event has the `onEnter` attribute set to `True`, it's automatically triggered when the order is in the source state of the transition that contains the event.

```xml
..
<transition>
    <source>paid</source>
    <target>invoice created</target>
    <event>create invoice</event>
</transition>

</transitions>
<events>
..
    <event name="create invoice" command="Oms/CreateInvoice" onEnter="true"/>
</events>
```

In the preceding example, after an order is paid, the invoice is automatically created (when the state machine reaches the state `paid`, it fires the `create invoice` event that runs the `Oms/CreateInvoice` command and transitions it to the `invoice created` state).

**Events triggered through facade calls**

The Order Management System facade contains several methods that allow triggering an event:

- `triggerEvent`
- `triggerEventForNewItem`
- `triggerEventForNewOrderItems`
- `triggerEventForOneOrderItem`
- `triggerEventForOrderItems`

This is typically used if an external event is raised.

Examples of external events are as follows:
- An asynchronous payment response.
- A fulfillment message from the ERP.

Therefore you can implement a service that receives such a message. The next step is to correlate the event with a sales order or with the sales order items. That means you need to find the Sales Order for which the event has been raised. Correlation criteria can be the Sales Order ID or a payment transaction code that was previously saved in Zed. Afterward, the methods `triggerEventForOrderItems` or `triggerEventForNewOrderItems` can be used to trigger an event.

{% info_block errorBox %}

The process needs to be in a state where it's actually waiting for the event you are triggering. Otherwise, the event is not processed.

{% endinfo_block %}

#### Locking the triggered events

Every time the event is triggered, a dedicated lock based on the order item IDs is acquired. This is necessary to make sure that the same event is not triggered several times by incoming parallel requests.

Every time an attempt to trigger an event takes place, the locking process works as follows:

- Try to acquire a lock for target order items.
- If the lock doesn't exist already, proceed with the process; fail otherwise—the event has already been triggered by another request.
- When the process is finished (successfully or not), the lock is released.

Additionally, a cronjob cleans outdated locks for which the process did not finish successfully. You can configure the desired lock timeout interval in a module configuration file `Zed\Oms\OmsConfig::getStateMachineLockerTimeoutInterval()` and the frequency of the cleanup job in the cronjob configuration.

### Commands

A transition from one state to another has an event associated with it. The event can have a command associated with it, which is a piece of logic that gets executed when the event is fired. The attached command is specified in the XML file that describes the state machine, where the event is being defined:

```xml
<events>
    <event name="send payment request" onEnter="true" manual="true" command="Oms/SendPaymentRequest"/>
    ...
</events>
```

The mapping between the string that identifies the command in the XML file and the actual implementation of the command is done in `OmsDependencyProvider`, in the `getCommandPlugins` method:

```php
<?php
protected function getCommandPlugins(Container $container)
{
    return [
        'Oms/SendPaymentRequest' => $container->getLocator()->oms()->pluginOmsCommandSendPaymentRequest(),
        //..
    ];
}
```

In the preceding example, `Oms/SendPaymentRequest` is mapped to `Plugin/Oms/Command/SendPaymentRequest`.

#### Implementing a command

There are two types of commands:

- Commands by order item—they get executed for each order item; implements `CommandByItemInterface`.
- Commands by order—executed for all items of the order which are in the same transition; implements `CommandByOrderInterface`.

Depending on whether you want to execute the command for all sales order items that undergo the transition or separately for each sales order item, you choose the interface you want to implement. The fully qualified class name (including namespace) is added to the corresponding event.

The `run()` method gets executed when the event linked to the command is fired.

```php
<?php
class SendPaymentRequest extends AbstractCommand implements CommandByOrderInterface
{
    /**
     * @param array $orderItems
     * @param SpySalesOrder $orderEntity
     * @param ReadOnlyArrayObject $data
     *
     * @return array
     */
    public function run(array $orderItems, SpySalesOrder $orderEntity, ReadOnlyArrayObject $data)
    {
       //...
    }
}
```

### Processes

A process represents a model for things that are happening in a shop. In essence, it's a graph on which the nodes are possible statuses of the order, and the vertices that connect the nodes are the transitions.

For example, when submitting a new order, if the payment is made, the shipment subprocess can be initiated; if the payment was not performed, the state machine moves to the `cancelled` status.

Basically, a state machine can be described as a directed connected graph. It has a single starting state and a final state. The graphs that model the state machines are being defined in XML files that are placed under the `config/Zed/oms` folder. The XML file contains the definition of the OMS process, but in order to have a valid and functional state machine to what's configured in the XML files, the following items must be implemented:
- Implement the defined commands.
- Implement the defined conditions.
- Trigger events through API calls.

#### Starting a process

Zed automatically starts the corresponding order management process for an order when the sales order is saved in the database. Zed executes the process model until it reaches a final state ( *no Event* transition or a timeout Event). That means the control flow is only returned to the invoking method when one of these situations is reached. This is important to consider when modeling the process because when completing the checkout, the user wants a synchronous answer.

To check the code that does this, see [CheckoutWorkflow.php](https://github.com/spryker/Checkout/blob/master/src/Spryker/Zed/Checkout/Business/Workflow/CheckoutWorkflow.php#L72).

#### Order versus order item

Zed executes the process for every sales order item. This is helpful if you want to track that a specific item has been shipped and others are still waiting. The same for a return. A customer might keep two items and send back the third one. Therefore, it's important to walk through the process at the sales order item level. It is important to keep in mind when such a split might happen. Most of the time, an event is fired for all sales order items at the same time. However, sometimes it's important to wait in a specific state until all sales order items have a certain state or flag.

#### Subprocesses

A process can be split into multiple subprocesses, and each relates to a single independent concept—for example, the payment subprocess or cancellation subprocess.

There are several reasons for introducing subprocesses when modeling a state machine process:

- The flow of the process is easier to follow.
- If more than one process needs to be defined—for example, orders that are paid before delivery and orders that are paid on delivery—then the common parts of the processes can be extracted into subprocesses and reused.

To introduce a subprocess in the main process, specify its name under the subprocesses tag, as in the following example:

```xml
<process name="Prepayment" main="true">
    <subprocesses>
        <process>completion</process>
        <process>cancellation</process>
       ..
    </subprocesses>
..
```

And specify the path to the file in which the transitions of that subprocess are described:

```xml
<process name="Prepayment01" main="true">
 ..
</process>
<process name="completion" file="subprocesses/Completion.xml"/>
<process name="cancellation" file="subprocesses/Cancellation.xml"/>
```

In the main process, add the corresponding transitions between the starting and ending states of the included subprocesses and other states (that are defined in other subprocesses or in the main process).

### Putting it all together

The following snippet shows how all elements are brought together in an XML file. Note that you can also define subprocesses. This lets you reuse a subprocess from several processes. Therefore, `subprocess` used is declared in the `<subprocesses>` section. For each subprocess, you need to define a process element that contains the name and file location as attributes.

```xml
<statemachine
    xmlns="spryker:oms-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

    <process name="CreditCardDropShipping">
        <subprocesses>
            <process>invoice creation</process>
        </subprocesses>

        <!-- state go here -->
        <states>
             <state> ... </state>
        </states>

        <!-- Transitions go here -->
        <transitions>
             <transition> ... </transition>
        <transitions>


        <!-- Events go here -->
        <events>
             <event> ... </event>
        <events>
    </process>

    <process name="invoice creation" file="subprocesses/InvoiceCreation.xml"/>
</statemachine>
```

## Linking processes with code

Events can have commands attached to them, which is logic that gets executed when that event is fired.

Example:

```xml
<events>
    <event name="send payment request" onEnter="true" manual="true" command="Oms/SendPaymentRequest"/>
..
</events>
```

The mapping between this string and the actual implementation of the command is done through the OMS dependency provider.

Similar to this, the mapping between a string linked to a condition and the implementation of the condition is also done through the OMS dependency provider.

A transition from one state to another can be conditioned. It's only possible to make that transition if a condition is satisfied:

```xml
<transition condition="Oms/PaymentIsCompleted" happy="true">
    <source>paid</source>
    <target>shipped</target>
    <event>ship it</event>
</transition>
```

## Configure OMS cronjobs

Spryker has three dedicated console commands for managing orders:

- Check timeout (oms:check-timeout).
- Check condition (oms:check-condition).
- Clear locks (oms:clear-locks).

The `check timeout` console command checks if the timeout was reached for orders that are in a state that's a source for a transition that has an event with a timeout attached. If the timeout is reached, the order moves to the next state.

The `check condition` console command evaluates if the condition is satisfied for orders that are in a state that's source for a transition that has a condition attached. If the condition is satisfied, the order moves to the next state.

The `clear locks` console command cleans up outdated event trigger locks from the database. For the three console commands, a cronjob must be scheduled so that they are automatically executed on the configured time interval.

{% info_block infoBox "Cronjob Configuration" %}

Cronjobs are configured in the `jobs.php` configuration file that's placed under `config/Zed/cronjobs`.

{% endinfo_block %}

The following is an example of configuring the jobs for these commands:

```bash
/* STATE MACHINE */
$jobs[] = [
    'name'     => 'check-statemachine-conditions',
    'command'  => '$PHP_BIN vendor/bin/console oms:check-condition',
    'schedule' => '*/10 * * * *',
    'enable'   => true,
    'run_on_non_production' => true,
    'stores'   => $allStores,
];

$jobs[] = [
    'name'     => 'check-statemachine-timeouts',
    'command'  => '$PHP_BIN vendor/bin/console oms:check-timeout',
    'schedule' => '*/10 * * * *',
    'enable'   => true,
    'run_on_non_production' => true,
    'stores'   => $allStores,
];

$jobs[] = [
    'name' => 'oms-clear-locks',
    'command' => '$PHP_BIN vendor/bin/console oms:clear-locks',
    'schedule' => '0 6 * * *',
    'enable' => true,
    'run_on_non_production' => true,
    'stores' => $allStores,
];
```

In the preceding example, `check timeout` and `check condition` jobs are configured to run the console commands every 10 minutes (`*/10 * * * *`); clear locks are configured to run every day at 6 o'clock.

For more information on how to define a cron expression, see the [CRON expression](https://en.wikipedia.org/wiki/Cron#CRON_expression) section.

## Versioning the state machines

The ideal case would be that after designing your state machines and you start using them in the production environment, they stay the same and don't need any further adjustments.

However, you all know that a software product is subject to change in time. The state machines that model the order processing touch many critical parts of the system, so it might need updates in the future.

When a state machine is changed, but there are already orders which use this process, this part becomes important.


{% info_block infoBox "Info" %}

We recommend using versioning for your state machines.

{% endinfo_block %}


**Example**:

The first version of a state machine that is responsible for managing orders that use Paypal as a payment provider can be called `Paypal01`, and the XML that defines this state machine can be placed in the `Paypal01.xml` file. If an update is needed, the updated state machine can be called `Paypal02` and handle new orders that use Paypal for payment. The checkout must be changed so that all new orders use the new process while the existing ones use the old one.

As you can notice from the example, all changes that are BC breaking result in a higher number. However, you can change state machines without BC breaks as well—for example, when you just add states and transitions. BC break can be when you rename states or change the logic.

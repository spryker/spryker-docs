---
title: Order Process Modelling via State Machines
originalLink: https://documentation.spryker.com/v4/docs/order-process-modelling-state-machines
redirect_from:
  - /v4/docs/order-process-modelling-state-machines
  - /v4/docs/en/order-process-modelling-state-machines
---

State Machines help you define, execute and visualize predefined and automated processes. It can model events that involve performing a predetermined sequence of actions, for example in the order process.

{% info_block infoBox %}
The order is being shipped if the payment is successful.
{% endinfo_block %}
You can tailor the State Machine to your needs to trigger certain processes automatically or execute them manually.

* Model and visualize the process as state machine in XML
* Reusable sub processes (e.g. return-process) - programmable commands and conditions
* Events can be triggered manually or fully automated
* Timeouts

## State Machine Module
The `StateMachine` module provides generic implementation for state machines (SM). This module provides functionality for drawing the SM graph, triggering events, initializing a new state machine or for getting the state history for a processed item.

{% info_block warningBox %}
If you are looking for information on the OMS State Machine, see [OMS State Machine](/docs/scos/dev/features/202001.0/order-management/oms-matrix
{% endinfo_block %}.)

{% info_block infoBox %}
There is already an example state machine implemented in Legacy Demoshop. Look for `stateMachineExample` module. You can use it as a base for implementing your custom SM. 
{% endinfo_block %}

## States
How are the states modelled in the XML?

* A list of state elements can be easily defined in an XML file, as in the example below.
* A state is defined by a name.

{% info_block infoBox %}
The display attribute allows to link a glossary key that contains the name of the state for the locales configured in the application, as you want to be shown in Yves.
{% endinfo_block %}

```xml
<states>
    <state name="new" reserved="true"/>
    <state name="paid" display="customer.order.state.received">
        <flag>invoiceable</flag>
    </state>
    <state name="shipped" display="custom.order.state.shipped" />
</states>
```

Furthermore, a state can have several associated flags.

You can query the state machine for items marked with specified flags by using `StateMachineFacade::getItemsWithFlag()` or vice versa `StateMachineFacade::getItemsWithoutFlag()`.

{% info_block infoBox %}
We already have predefined number of sate machine flags in our `oms.xsd` filed which can be found in `http://static.spryker.com/oms-01.xsd`, you can find it in `stateType` definition flag subsection.
{% endinfo_block %}

Currently we use `exclude from customer` flag which will skip all orders having _ALL_ item states flagged with this flag. That means it won't be displayed in customer Yves order details/list pages.

## Transitions
Spryker’s state machine allows to define transitions between states. A transition is bound to an event, which tells when the state machine item can leave the current state.

{% info_block infoBox %}
For example, the states waiting for credit card capture and captured are connected with a transition that expects an external event capture successful. States and transitions define the possible flow a process can take, and also which sequence of states is actually not possible.
{% endinfo_block %}

Technically, transitions are very simple. The attribute `happy` marks this transition as the happy case. When the state machine graph is rendered in Zed, the transition is marked with green.

The condition attribute allows to add PHP code that double checks if this transition can be fired or not. The condition is evaluated when the event associated with the transition has been fired.

Furthermore a `source` and a `target` state are defined. The event specifies when the transition can be fired.

The event element can be omitted (making request not block user request). This way an external call like `saveOrder` or `triggerEvent` are finished. That means that the control flow of the code goes back to the invoking method. Zed will continue the execution of the process model with the help of a cron job. If the event element is omitted and a condition is used, Zed will use the condition to evaluate if the transition can be fired.

```xml
<transition condition="PackageName/ClassName" happy="true">
    <source>paid</source>
    <target>shipped</target>
    <event>ship it</event>
</transition>
```

## Events
Events tell when a transition can be fired. Every event has a name that is referenced in a transition.

* The easiest event is the one that has the `onEnter="true"` attribute associated. This event is fired automatically when the source state is reached.
* Another option is to attach a timeout. It can be used for a prepayment process.

How is the reminder then technically sent? This is implemented with the command attribute. The command attribute references a PHP class that implements a specific interface. Every time the event is fired (automatically, after timeout), Zed makes sure the associated command is executed.

{% info_block infoBox %}
If an exception occurs when executing the command, the item stays in the source state.
{% endinfo_block %}

This is how an event is defined:

```xml
<event name="ship it" timeout="" manual="true|false" onEnter="true|false" command="PackageName/ClassName"/>
```

The timeout attribute uses string date [relative formats](https://www.php.net/manual/en/datetime.formats.relative.php).
{% info_block infoBox %}
For example: 1 day, 1 hour, 1 min
{% endinfo_block %}

* Another option to fire the event is by setting the manual attribute to true. This allows adding manual button in your Zed UI to manually trigger events. By clicking the button the event will be fired and thus, the corresponding transition will take place.
* Furthermore events can be triggered via an API call. The method `triggerEvent` allows triggering an event for a given process instance. For example, if a message from the payment provider is received that a capture was successful, the corresponding process instance can be triggered via API call.

## Subprocesses
A process can be split into multiple subprocesses, that is each related to a single independent concept.

{% info_block infoBox %}
For example: Payment subprocess, cancellation subprocess.
{% endinfo_block %}

There are several reasons for introducing subprocesses when modeling a state machine process:

* the flow of the process is easier to follow
* if more then one process needs to be defined (e.g.: orders that are being paid before delivery and orders that are paid on delivery) then the common parts of the processes can be extracted into subprocesses and they be reused

To introduce a subprocess in the main process, you need to specify it’s name under the subprocesses tag as in the example below :

```xml
<process name="Prepayment" main="true">
    <subprocesses>
        <process>completion</process>
        <process>cancellation</process>
       ..
    </subprocesses>
..
```

You also need to specify the path to the file in which the transitions of that subprocess are being described :

```xml
<process name="Prepayment01" main="true">
 ..
</process>
<process name="completion" file="subprocesses/Completion.xml"/>
<process name="cancellation" file="subprocesses/Cancellation.xml"/>
```

In the main process add the corresponding transitions between the starting and ending states of the included subprocesses and other states (that are defined in other subprocesses or in the main process).

## Subprocess Prefix
You might want to copy a subprocess over to consolidate process endpoints. To do so, define a prefix for a subprocess and use it for a target/source state or an event definition.

```xml
<process name="Name" main="true">
...
<transition condition="PackageName/ClassName">
	<source>paid</source>
    <target>Foo - Cancellation</target>
    <event>Enter Foo cancellation</event>
</transition>

<transition condition="PackageName/ClassName" happy="true">
	<source>paid</source>
 	<target>Cancellation</target>
	<event>Enter general cancellation</event>
</transition>
...
</process>
<process name="cancellation" file="subprocesses/Cancellation.xml"/>
<process name="cancellation" file="subprocesses/Cancellation.xml" prefix="Foo"/>
```

## Putting It All Together
The following snippet shows how all the elements are brought together in an XML file. Notice that we can also define subprocesses. This allows reusing a subprocess from several processes. Thereforeб the subprocess used is declared in the `<subprocesses>` section. You need to define for each subprocess a process element that contains the name and file location as attributes.

```xml
<?xml version="1.0"?>
<statemachine
    xmlns="spryker:state-machine-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:state-machine-01 http://static.spryker.com/state-machine-01.xsd">

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

## Where to Store the File?
Each state machine should have a folder created under the `config/Zed/StateMachine/{StateMachineName}/` folder. `{StateMachineName}` name is taken from SM handler plugin `StateMachineHandlerInterface::getStateMachineName()`.

## Linking Processes With Code
Events can have commands attached to it, which is logic that gets executed when that event is fired.

Example:

```xml
<events>
    <event name="example event" onEnter="true" manual="true" command="Example/ExampleCommand"/>
    ..
</events>
```

The mapping between this string and the actual implementation of the command is done through the state machine handler `StateMachineHandlerInterface::getCommandPlugins()`.

Example of `\Pyz\Zed\Oms\OmsDependencyProvider`:
```php
<?php
...
class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    ...
    public function provideBusinessLayerDependencies(Container $container)
    {
        $container = parent::provideBusinessLayerDependencies($container);

        $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
            $commandCollection->add(new ExamplePlugin(), 'Example/ExampleCommand');

            return $commandCollection;
        });

        return $container;
    }
...
}
```

Similar to this, the mapping between a string linked to a condition and the implementation of the condition is also done through the state machine handler `StateMachineHandlerInterface::getConditionPlugins()`.

A transition from one state to another can be conditioned: it’s possible to make that transition if a condition is satisfied:

```xml
<transition condition="Example/ExampleTransition" happy="true">
    <source>paid</source>
    <target>shipped</target>
    <event>ship it</event>
</transition>
```

<!-- Last review date: Feb 21, 2019 by Aurimas Ličkus, Anastasija Datsun -->

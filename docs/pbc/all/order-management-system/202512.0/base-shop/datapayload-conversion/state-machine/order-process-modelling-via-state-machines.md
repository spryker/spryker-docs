---
title: Order process modelling via state machines
description: State Machines help you define, execute and visualize predefined and automated processes.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/order-process-modelling-state-machines
originalArticleId: 6beb29fc-d94c-4c76-8ad0-e0d71bbb21ff
redirect_from:
  - /2021080/docs/order-process-modelling-state-machines
  - /2021080/docs/en/order-process-modelling-state-machines
  - /docs/order-process-modelling-state-machines
  - /docs/en/order-process-modelling-state-machines
  - /v6/docs/order-process-modelling-state-machines
  - /v6/docs/en/order-process-modelling-state-machines
  - /v5/docs/order-process-modelling-state-machines
  - /v5/docs/en/order-process-modelling-state-machines
  - /v4/docs/order-process-modelling-state-machines
  - /v4/docs/en/order-process-modelling-state-machines
  - /v3/docs/order-process-modelling-state-machines
  - /v3/docs/en/order-process-modelling-state-machines
  - /v2/docs/order-process-modelling-state-machines
  - /v2/docs/en/order-process-modelling-state-machines
  - /v1/docs/order-process-modelling-state-machines
  - /v1/docs/en/order-process-modelling-state-machines
  - /capabilities/order_management/state_machine/order-process-modelling-state-machines.htm
  - /docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/state-machine/order-process-modelling-via-state-machines.html  
related:
  - title: Order management system multi-thread
    link: docs/pbc/all/order-management-system/latest/base-shop/datapayload-conversion/state-machine/order-management-system-multi-thread.html
  - title: State machine console commands
    link: docs/pbc/all/order-management-system/latest/base-shop/datapayload-conversion/state-machine/state-machine-console-commands.html
  - title: Common pitfalls in OMS design
    link: docs/pbc/all/order-management-system/latest/base-shop/datapayload-conversion/state-machine/common-pitfalls-in-oms-design.html
  - title: Create an Order Management System - Spryker Commerce OS
    link: docs/scos/dev/back-end-development/data-manipulation/create-an-order-management-system-spryker-commerce-os.html
---

State machines help you define, execute and visualize predefined and automated processes. It can model events that involve performing a predetermined sequence of actions—for example, in the order process.

{% info_block infoBox %}

The order is being shipped if the payment is successful.

{% endinfo_block %}

You can tailor the State Machine to your needs to trigger certain processes automatically or execute them manually.

- Model and visualize the process as a state machine in XML.
- Reusable sub-processes, such as return-process, programmable commands and conditions.
- Events can be triggered manually or fully automated.
- Timeouts.

## State machine module

The `StateMachine` module provides a generic implementation for state machines (SM). This module provides functionality for drawing the SM graph, triggering events, initializing a new state machine, or getting the state history for a processed item.

{% info_block warningBox %}

If you are looking for information on the OMS State Machine, see [OMS State Machine](/docs/pbc/all/order-management-system/{{site.version}}/base-shop/order-management-feature-overview/oms-order-management-system-matrix.html).

{% endinfo_block %}

{% info_block infoBox %}

There is already an example state machine implemented in Legacy Demoshop. Look for the `stateMachineExample` module. You can use it as a base for implementing your custom SM.

{% endinfo_block %}

## States

How are the states modeled in the XML?

- A list of state elements can be easily defined in an XML file, as in the following example.
- A state is defined by a name.

{% info_block infoBox %}

The display attribute allows for linking a glossary key that contains the name of the state for the locales configured in the application, as you want to be shown in Yves.

{% endinfo_block %}

```xml
<states>
    <state name="new" />
    <state name="paid" display="customer.order.state.received">
        <flag>invoiceable</flag>
    </state>
    <state name="shipped" display="custom.order.state.shipped" />
</states>
```

Furthermore, a state can have several associated flags.

You can query the state machine for items marked with specified flags by using `StateMachineFacade::getItemsWithFlag()` or vice versa `StateMachineFacade::getItemsWithoutFlag()`.

{% info_block infoBox %}

The number of state machine flags in the `oms.xsd` file has been already predefined and can be found in `http://static.spryker.com/oms-01.xsd`. You can find it in the `stateType` definition flag subsection.

{% endinfo_block %}

We use the `exclude from customer` flag that skips all orders having *ALL* item states flagged with this flag. That means it's not displayed on customer Yves order details and list pages.

## Transitions

Spryker's state machine allows you to define transitions between states. A transition is bound to an event, which tells when the state machine item can leave the current state.

{% info_block infoBox %}

For example, waiting for credit card capture and captured states are connected with a transition that expects an external event capture successful. States and transitions define the possible flow a process can take, and also which sequence of states is actually not possible.

{% endinfo_block %}

Technically, transitions are very simple. The `happy` attribute marks this transition as a happy case. When the state machine graph is rendered in Zed, the transition is marked with green.

The condition attribute allows you to add PHP code that double-checks if this transition can be fired or not. The condition is evaluated when the event associated with the transition has been fired.

Furthermore, `source` and `target` states are defined. The event specifies when the transition can be fired.

The event element can be omitted (making the request not block the user request). This way, an external call like `saveOrder` or `triggerEvent` is finished. That means that the control flow of the code goes back to the invoking method. Zed will continue the execution of the process model with the help of a cron job. If the event element is omitted and a condition is used, Zed will use the condition to evaluate if the transition can be fired.

```xml
<transition condition="PackageName/ClassName" happy="true">
    <source>paid</source>
    <target>shipped</target>
    <event>ship it</event>
</transition>
```

## Events

Events tell when a transition from one OMS state to another can be triggered. Every event has a name that is referenced in a transition. For example, event name="pay" signifies the transition to the paid OMS state.

The events can be fired as follows:

- Automatically: If an event has the `onEnter="true"` attribute associated, then the event is fired automatically when the source state is reached. For example, `<event name="authorize" onEnter="true"/>` means that the OMS state-authorized is triggered automatically.
- By setting the `manual` attribute to `true`: This adds a button in the **Back Office → View Order [Order ID**] page that allows you to manually trigger the corresponding transition by clicking the button. For example, `<event name="cancel" manual="true"/>` means that the OMS state canceled can only be triggered by clicking the **cancel** button for the order state.
- Via an API call: The `triggerEvent`method allows triggering an event for a given process instance. For example, if a message from the payment provider is received that the capture was successful, the corresponding process instance can be triggered via the API call.
- By a timeout: Events are triggered after the defined time has passed. For example, `<event name="close" manual="true" timeout="1 hour"/>` means that the OMS state closed will be triggered in 1 hour, if not triggered manually from the Back Office earlier. Now let's assume we are trying to define the prepayment process, in which if after 15 days no payment is received, `reminder sent` is fired because of the timeout. How is the reminder then technically sent? This can be implemented through a command attached to the `sendFirstReminder` event. The command attribute references a PHP class that implements a specific interface. Every time the event is fired (automatically, after the timeout), Zed makes sure the associated command is executed. If an exception occurs in the command coding, the order/order item stays in the source state.

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

You can also set the date and time from when the timeout should be started. For details, see the following *OMS Timeout Processor* section.

### OMS timeout processor

*Timeout processor* is designed to set a custom timeout for an OMS event.

Let's imagine today is Monday, and your shop plans to ship orders only on Friday. In this case, you can not specify the exact timeout (in days or hours) to start the shipping process. Even if you specify just the timeout, say, four days, for example, `<event name="ship" manual="" timeout="96 hour"/>`, the scheduler will be regularly checking if the event happened. This creates an unnecessary load on the OMS and is bad for your shop's performance, especially if you have many orders. For this specific case, it would be enough to start running the check in four days. This is when a timeout processor comes in handy: you use it to specify from when the timeout should be calculated.

Here is an example of a timeout processor in an event definition:

```xml
<events>
    <event name="pay" timeout="1 hour" timeoutProcessor="OmsTimeout/Initiation" command="DummyPayment/Pay"/>
</events>
```

In this example, `OmsTimeout/Initiation` is the name of the plugin which is executed to set the starting point of the timeout.

In the default implementation for Master Suite, the timeout processor in [OmsTimeout/Initiation](/docs/pbc/all/order-management-system/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) plugin starts the timeout immediately, from the current time:

<details>

<summary>src/Pyz/Zed/Oms/Communication/Plugin/Oms/InitiationTimeoutProcessorPlugin.php</summary>

```php
<?php

namespace Pyz\Zed\Oms\Communication\Plugin\Oms;

use Generated\Shared\Transfer\OmsEventTransfer;
use Generated\Shared\Transfer\TimeoutProcessorTimeoutRequestTransfer;
use Generated\Shared\Transfer\TimeoutProcessorTimeoutResponseTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\OmsExtension\Dependency\Plugin\TimeoutProcessorPluginInterface;

/**
 * @method \Pyz\Zed\Oms\Business\OmsFacadeInterface getFacade()
 * @method \Pyz\Zed\Oms\Communication\OmsCommunicationFactory getFactory()
 * @method \Pyz\Zed\Oms\OmsConfig getConfig()
 */
class InitiationTimeoutProcessorPlugin extends AbstractPlugin implements TimeoutProcessorPluginInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return string
     */
    public function getName(): string
    {
        return 'OmsTimeout/Initiation';
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\OmsEventTransfer $omsEventTransfer
     *
     * @return string
     */
    public function getLabel(OmsEventTransfer $omsEventTransfer): string
    {
        return sprintf(
            $this->getFactory()->getTranslatorFacade()->trans('Starts when defined timeout (%s) is over.'),
            $omsEventTransfer->getTimeout()
        );
    }

    /**
     * {@inheritDoc}
     * - Calculates the timeout based on the current time + the defined timeout.
     * - Returns `TimeoutProcessorTimeoutRequestTransfer` with timestamp when event should be triggered.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\TimeoutProcessorTimeoutRequestTransfer $timeoutProcessorTimeoutRequestTransfer
     *
     * @return \Generated\Shared\Transfer\TimeoutProcessorTimeoutResponseTransfer
     */
    public function calculateTimeout(TimeoutProcessorTimeoutRequestTransfer $timeoutProcessorTimeoutRequestTransfer): TimeoutProcessorTimeoutResponseTransfer
    {
        return $this->getFacade()->calculateInitiationTimeout($timeoutProcessorTimeoutRequestTransfer);
    }
}
```

</details>

With this implementation of the plugin, if the timeout is set to 1 hour, the event will be triggered 1 hour after the previous event.

If you need to start the timeout, say, on November 15, 2021, the plugin should be modified as follows:

<details><summary>src/Pyz/Zed/Oms/Communication/Plugin/Oms/InitiationTimeoutProcessorPlugin.php</summary>

```php
<?php

namespace Pyz\Zed\Oms\Communication\Plugin\Oms;use Generated\Shared\Transfer\OmsEventTransfer;

use Generated\Shared\Transfer\TimeoutProcessorTimeoutRequestTransfer;
use Generated\Shared\Transfer\TimeoutProcessorTimeoutResponseTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\OmsExtension\Dependency\Plugin\TimeoutProcessorPluginInterface;class InitiationTimeoutProcessorPlugin extends AbstractPlugin implements TimeoutProcessorPluginInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return string
     */
    public function getName(): string
    {
        return 'OmsTimeout/Initiation';
    }    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\OmsEventTransfer $omsEventTransfer
     *
     * @return string
     */
    public function getLabel(OmsEventTransfer $omsEventTransfer): string
    {
        return sprintf(
            $this->getFactory()->getTranslatorFacade()->trans('Starts after 2021-11-15.'),
            $omsEventTransfer->getTimeout()
        );
    }    /**
     * {@inheritDoc}
     * - Calculates the timeout based on the current time + the defined timeout.
     * - Returns `TimeoutProcessorTimeoutRequestTransfer` with timestamp when event should be triggered.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\TimeoutProcessorTimeoutRequestTransfer $timeoutProcessorTimeoutRequestTransfer
     *
     * @return \Generated\Shared\Transfer\TimeoutProcessorTimeoutResponseTransfer
     */
    public function calculateTimeout(TimeoutProcessorTimeoutRequestTransfer $timeoutProcessorTimeoutRequestTransfer): TimeoutProcessorTimeoutResponseTransfer
    {
        $omsEventTransfer = $timeoutProcessorTimeoutRequestTransfer->getOmsEvent();
        $interval = DateInterval::createFromDateString($omsEventTransfer->getTimeout());
        $newTime = (new DateTime('2021-11-15'));
        $timeout = $newTime->add($interval);
        return (new TimeoutProcessorTimeoutResponseTransfer())->setTimeoutTimestamp($timeout->getTimestamp());
    }
}
```

</details>

With this implementation of the plugin, if the timeout is set to 1 hour, the event will be triggered at 1:00 AM on November 15, 2021.

## Subprocesses

A process can be split into multiple sub-processes, that is each related to a single independent concept.

{% info_block infoBox %}

For example, a payment subprocess and cancellation subprocess.

{% endinfo_block %}

There are several reasons for introducing subprocesses when modeling a state machine process:

- The flow of the process is easier to follow.
- If more than one process needs to be defined–for example, orders that are being paid before delivery and orders that are paid on delivery–then the common parts of the processes can be extracted into subprocesses and reused.

To introduce a subprocess in the main process, you need to specify it's name under the subprocesses tag as in the following example:

```xml
<process name="Prepayment" main="true">
    <subprocesses>
        <process>completion</process>
        <process>cancellation</process>
       ..
    </subprocesses>
..
```

You also need to specify the path to the file in which the transitions of that subprocess are being described:

```xml
<process name="Prepayment01" main="true">
 ..
</process>
<process name="completion" file="subprocesses/Completion.xml"/>
<process name="cancellation" file="subprocesses/Cancellation.xml"/>
```

In the main process, add the corresponding transitions between the starting and ending states of the included subprocesses and other states (that are defined in other subprocesses or in the main process).

## Subprocess prefix

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

## Putting it all together

The following snippet shows how all the elements are brought together in an XML file. Notice that we can also define subprocesses. This allows reusing a subprocess from several processes. Therefore, the subprocess used is declared in the `<subprocesses>` section. For each subprocess, you need to define a process element that contains the name and file location as attributes.

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

## Storing the file

Each state machine should have a folder created under the `config/Zed/StateMachine/{StateMachineName}/` folder. `{StateMachineName}` name is taken from SM handler plugin `StateMachineHandlerInterface::getStateMachineName()`.

## Linking processes with code

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

A transition from one state to another can be conditioned: it's possible to make that transition if a condition is satisfied:

```xml
<transition condition="Example/ExampleTransition" happy="true">
    <source>paid</source>
    <target>shipped</target>
    <event>ship it</event>
</transition>
```

## General performance recommendations

Regarding performance, there are a few things to keep in mind when determining state machine to decrease order creation response time:

- It would be better not to determine any additional attributes for state `new`, such as `reserved="true"`, because additional action can increase time costs significantly.
- To move high time cost operation from handling HTTP-request for order creation to the background, you can use `timeout="1 second"` instead of `onEnter="true"` for the event in transition from the first state of order.

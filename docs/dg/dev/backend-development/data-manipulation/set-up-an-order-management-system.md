---
title: Set up an order management system
description: This task-based document shows how to create a full order management process (OMS) using the Spryker state machine and then use it in your shop.
last_updated: Feb 18, 2025
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-oms-and-state-machines-spryker-commerce-os
originalArticleId: dc0c3c0d-c1af-4949-9645-762c67f03c8a
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/create-an-order-management-system-spryker-commerce-os.html
  - /docs/scos/dev/back-end-development/data-manipulation/creating-an-order-management-system-spryker-commerce-os.html
  - /docs/dg/dev/backend-development/data-manipulation/create-an-order-management-system-spryker-commerce-os.html
related:
  - title: Order management system multi-thread
    link: docs/pbc/all/order-management-system/latest/base-shop/datapayload-conversion/state-machine/order-management-system-multi-thread.html
  - title: Order process modelling via state machines
    link: docs/pbc/all/order-management-system/latest/base-shop/datapayload-conversion/state-machine/order-process-modelling-via-state-machines.html
  - title: State machine console commands
    link: docs/pbc/all/order-management-system/latest/base-shop/datapayload-conversion/state-machine/state-machine-console-commands.html
  - title: Common pitfalls in OMS design
    link: docs/pbc/all/order-management-system/latest/base-shop/datapayload-conversion/state-machine/common-pitfalls-in-oms-design.html
---

{% info_block infoBox %}

This tutorial is also available on the Spryker Training website. For more information and hands-on exercises, visit the [Spryker Training](https://training.spryker.com/courses/developer-bootcamp) website.

{% endinfo_block %}

## Challenge description

This task-based document shows how to create a full order management process (OMS) using the Spryker state machine and then use it in your shop.

### 1. Create the state machine skeleton

In this order process, you will use the following states: new, `paid`, `shipped`, `returned`, `refunded`, `unauthorized`, and `closed`.

You will build all the transitions and events between these states as well. The skeleton of Spryker state machines is simply an XML file.

1. Create a new XML file in `config/Zed/oms` and call it `Demo01.xml`.
2. Add the `Demo01` state machine process schema as follows:

```xml
<?xml version="1.0"?>
<statemachine
	xmlns="spryker:oms-01"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">
	<!-- Used as example XML for OMS implementation -->

	<process name="Demo01" main="true">
		<states>
		</states>

		<transitions>
		</transitions>

		<events>
		</events>
	</process>
</statemachine>
```

3. Activate the OMS process in `config_default.php` in`config/shared` by adding the name of the process `Demo01` to the key `[OmsConstants::ACTIVE_PROCESSES]`:

```php
$config[OmsConstants::ACTIVE_PROCESSES] = [
	'Demo01'
];
```

4. Go back to the skeleton XML and add the first state by adding a state element with the name:

```xml
<states>
	<state name="new" />
</states>
```

5. Check the state machine graph while building it.
   1. In the Backend Office, go to the **Administration&nbsp;<span aria-label="and then">></span> OMS**.
   2. To see the graph that represents your XML file, in the **PROCESSES** section, click your state machine name **Demo01**.

	{% info_block infoBox %}

	Whenever you change the skeleton in the XML file, refresh the page to see the new changes.

	{% endinfo_block %}

6. Add the rest of the states to the state machine. Refresh the state machine graph after adding them.

```xml
<states>
	<state name="new" />
	<state name="paid" />
	<state name="unauthorized" />
	<state name="shipped" />
	<state name="returned" />
	<state name="refunded" />
	<state name="closed" />
</states>
```

7. Add the transitions with the statuses' events.

Every transition has a source, a target, and an optional event. The source and target are simply state names, and the event is the name of the event defined in the events section.

Let's start with the first transition. Refresh after adding the transition and check the updated state machine.

```xml
<transitions>
	<transition happy="true" condition="Demo/IsAuthorized">
		<source>new</source>
    <target>paid</target>
	</transition>
</transitions>

```

8. In the transition you already have, add the event to the events section and refresh the graph.

```xml
<transitions>
   <transition happy="true" condition="Demo/IsAuthorized">
        <source>new</source>
        <target>paid</target>
    <event>pay</event>
    </transition>
</transitions>

<events>
    <event name="pay" onEnter="true" />
</events>
```

9. Add rest of the transitions and events:

```xml
<transitions>
	<transition>
		<source>new</source>
		<target>paid</target>
		<event>pay</event>
	</transition>

	<transition>
		<source>new</source>
		<target>unauthorized</target>
		<event>pay</event>
	</transition>

	<transition>
		<source>paid</source>
		<target>shipped</target>
		<event>ship</event>
	</transition>

	<transition>
		<source>shipped</source>
		<target>returned</target>
		<event>return</event>
	</transition>

	<transition>
		<source>returned</source>
		<target>refunded</target>
		<event>refund</event>
	</transition>

	<transition>
		<source>shipped</source>
		<target>closed</target>
		<event>close</event>
	</transition>

	<transition>
		<source>refunded</source>
		<target>closed</target>
		<event>close after refund</event>
	</transition>
</transitions>

<events>
	<event name="pay" onEnter="true" />
	<event name="ship" manual="true" />
	<event name="return" manual="true" />
	<event name="refund" onEnter="true" />
	<event name="close" timeout="14 days" />
	<event name="close after refund" onEnter="true" />
</events>
```

{% info_block infoBox %}

The skeleton of the order process is done now. Refresh the graph and check your process.

{% endinfo_block %}

### 2. Add a command and condition to the state machine

The order process usually needs PHP implementations for certain functionalities like calling a payment provider or checking if payment is authorized or not.
To do so, Spryker introduces *Commands* and *Conditions*:

- Commands are used for any implementation of any functionality used in the process.
- Conditions are used to replace an if-then statement in your process.

They are both implemented in PHP and injected into the state machine skeleton.

1. Add a dummy command to perform the payment.

{% info_block infoBox %}

In a real scenario, this command calls a payment provider to authorize the payment.

{% endinfo_block %}

A command in the Spryker state machine is added to an event. So add the command `pay` to the pay event.

```xml
<event name="pay" onEnter="true" command="Demo/Pay" />
```

{% info_block infoBox %}

Refresh the graph again. The command is added with the label not implemented. This means that the PHP implementation is not hooked yet.

{% endinfo_block %}

2. Add the command and hook it into the skeleton. The command is simply a Spryker plugin connected to the OMS module.

{% info_block infoBox %}

For the demo, you add the command plugin directly to the OMS module. In a real-life scenario, you can include the plugin in any other module, depending on the software design of your shop.

{% endinfo_block %}

Add the command plugin to `src/Pyz/Zed/Oms/Communication/Plugin/Command/Demo` and call it `PayCommand`.

As the command is a plugin, it implements some interface. The interface for the command is `CommandByOrderInterface`, which has the method `run();`

```php
namespace Pyz\Zed\Oms\Communication\Plugin\Command\Demo;

use Orm\Zed\Sales\Persistence\SpySalesOrder;
use Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject;
use Spryker\Zed\Oms\Communication\Plugin\Oms\Command\AbstractCommand;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandByOrderInterface;

class PayCommand extends AbstractCommand implements CommandByOrderInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem[] $orderItems
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $orderEntity
     * @param \Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject $data
     *
     * @return array
     */
    public function run(array $orderItems, SpySalesOrder $orderEntity, ReadOnlyArrayObject $data): array
    {
        return [];
    }
}
```

3. Hook the command to your state machine using the `OmsDependencyProvider`.

In `OmsDependencyProvider`, there is a method called `extendCommandPlugins()`, which is then called from the `provideBusinessLayerDependencies()` method.

Add your new command to the command collection inside the container and use the same command name you have used in the XML skeleton like this:

```php
/**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Spryker\Zed\Kernel\Container
 */
protected function extendCommandPlugins(Container $container): Container
{
    $container->extend(static::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection): CommandCollectionInterface {
        ...

        $commandCollection->add(new PayCommand(), 'Demo/Pay');


        return $commandCollection;
    });

    return $container;
}
```

{% info_block infoBox %}

Refresh the graph. The not implemented label is not displayed anymore, meaning that the state machine recognizes the command.

{% endinfo_block %}

4. Add the condition in the same way but use the `ConditionInterface` interface for the plugin instead of the command one. The state machine engine recognizes where to move next using the event name. In this case, the transitions `paid->shipped` and `paid->unauthorized` must use the same event name with a condition on one of the transitions.

{% info_block infoBox %}

The machine then examines the condition. If it returns `true`, then go to shipped state. Otherwise, go to unauthorized.

{% endinfo_block %}

The skeleton looks like this:

```xml
<transition condition="Demo/IsAuthorized">
	<source>new</source>
	<target>paid</target>
	<event>pay</event>
</transition>

<transition>
	<source>new</source>
	<target>unauthorized</target>
	<event>pay</event>
</transition>
```

The condition plugin is as follows:

```php
namespace Pyz\Zed\Oms\Communication\Plugin\Condition\Demo;

use Orm\Zed\Sales\Persistence\SpySalesOrderItem;
use Spryker\Zed\Oms\Communication\Plugin\Oms\Condition\AbstractCondition;
use Spryker\Zed\Oms\Dependency\Plugin\Condition\ConditionInterface;

class IsAuthorizedCondition extends AbstractCondition implements ConditionInterface
{
    /**
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem $orderItem
     *
     * @return bool
     */
    public function check(SpySalesOrderItem $orderItem): bool
    {
        return true;
    }
}
```

And the `OmsDependencyProvider` is as follows:

```php

/**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Spryker\Zed\Kernel\Container
 */
protected function extendConditionPlugins(Container $container): Container
{
    $container->extend(static::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection): ConditionCollectionInterface {
        ...

        $conditionCollection->add(new IsAuthorizedCondition(), 'Demo/IsAuthorized');


        return $conditionCollection;
    });

    return $container;
}
```

The order process for your shop is done. Refresh the graph and check it out.

### 3. Use the state machine for your orders

To use the state machine, hook it into the checkout. To do this, open the configuration file `config/Shared/config_default.php` and make the invoice payment method use the **Demo01** process.

```php
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
	DummyPaymentConfig::PAYMENT_METHOD_INVOICE => 'Demo01',
];
```

Your process works now.

### 4. Test the state machine

After building a new order process, you need to test it:

1. Go to the shop, chose a product, add it to the cart, and checkout using the Invoice payment method.
2. Open the orders page in Zed UI and then open your order.

{% info_block infoBox %}

This order is now applying the process you have defined in the state machine.

{% endinfo_block %}

3. There is the **ship** button to trigger the manual event ship.
4. Click on the last state name under the state column to see the current state for a specific item.

{% info_block infoBox %}

The current state has a yellowish background color.

{% endinfo_block %}

5. To move the item into the next state click **ship**.
6. Click again on the last state name and check the current state.

{% info_block warningBox %}

You can keep moving the item until the order is closed.

{% endinfo_block %}

### 5. Automated tests for State Machine

Besides manual tests, we recommend implementing automated tests for state machine. The default test helpers can help you build your tests:

- `\SprykerTest\Zed\Oms\Helper\OmsHelper`: provides hooks to add your commands and conditions to tests
- `\SprykerTest\Shared\Sales\Helper\SalesOmsHelper`: provides methods to test the state machine

#### 5.1 Add the test helper

The following example shows how to add commands and conditions to `OmsHelper` through `codeception.yml`. You can add as many commands and conditions as needed.

```yaml
namespace: PyzTest\Zed\YourModuleName

suites:
    Integration:
        path: Integration
        actor: YourModuleNameIntegrationTester
        modules:
            enabled:
                - \SprykerTest\Shared\Sales\Helper\SalesHelper
                - \SprykerTest\Shared\Sales\Helper\SalesOmsHelper
                - \SprykerTest\Shared\Testify\Helper\DataCleanupHelper
                - \SprykerTest\Shared\Sales\Helper\SalesDataHelper
                - \SprykerTest\Shared\Shipment\Helper\ShipmentMethodDataHelper
                - \SprykerTest\Zed\Oms\Helper\OmsHelper:
                      conditions:
                      	  name-of/your-condition: \Fully\Qualified\Class\Name
                      	  ...
                      commands:
			  name-of/your-command: \Fully\Qualified\Class\Name
			  ...

```

There're also default commands and conditions, which can be used as placeholders for commands and conditions. The key is the name used in `OmsDependencyProvider` to set up the state machine.

Default commands and conditions:
- `\SprykerTest\Zed\Oms\Helper\Mock\AlwaysTrueConditionPluginMock`: condition that always returns true
- `\SprykerTest\Zed\Oms\Helper\Mock\AlwaysFalseConditionPluginMock`: condition that always returns true
- `\SprykerTest\Zed\Oms\Helper\Mock\CommandByItemPluginMock`: a mock for `CommandByItemInterface` that always returns an empty array
- `\SprykerTest\Zed\Oms\Helper\Mock\CommandByOrderPluginMock`: a mock for `CommandByOrderInterface` that always returns an empty array



{% info_block infoBox %}

- Commands and conditions can't be defined at runtime during tests. Instead, they must be specified in `codeception.yml`.
- Test scenarios support only a single item.
- Timeouts can't be tested.

{% endinfo_block %}

#### 5.2 Create a test for your state machine

Test example:

```php
<?php

declare(strict_types = 1);

namespace PyzTest\Zed\YourModuleName\Integration\Oms;

use Codeception\Test\Unit;
use PyzTest\Zed\YourModuleName\YourModuleNameIntegrationTester;

class OmsIntegrationTest extends Unit
{
	/**
     * @var string
     */
    protected const STATE_MACHINE_NAME = 'ForeignPaymentStateMachine01';

    /**
     * @param \Codeception\TestInterface $test
     *
     * @return void
     */
    public function _before(TestInterface $test): void
    {
        parent::_before($test);

        $xmlFileDirectory = APPLICATION_VENDOR_DIR . 'spryker/spryker/Bundles/SalesPayment/config/Zed/Oms/';
        $this->getSalesOmsHelper()->setupStateMachine(static::STATE_MACHINE_NAME, $xmlFileDirectory);
    }

	public function testMoveAnItemFromStateAToStateB(): void
    {
    	// Set up one single item with its current expected state
        $this->tester->haveOrderItemInState('a');

		// do something where you expect that the item should move to the next state

		// Trigger the state machine
        $this->tester->tryToTransitionOrderItems();
        // or
        $this->tester->tryToTransitionOrderItems('event name');

        // Assert that the item is moved to the expected state.
        $this->tester->assertOrderItemIsInState('b');
    }
}
```

The order is important as you have to set up the state machine to be used first, then set up the item in the initial state, trigger the event that should move the item to the next state, and finally assert that your code under test is doing what it should do.

This test is based on the following method, which are executed in the provided order:

1. The `_before` method sets up state machine. You need to specify the state machine name and the path to the XML files containing your definitions. You could also set this up inside your test but it would be redundant.

2. The `haveOrderItemInState` method initializes an item in `a` state. This method also accepts a second argument, allowing you to pass custom fields for order item creation. After setting up the item, add the logic that should move it to the next state, such as receiving an async API message or calling a command.  

3. The `tryToTransitionOrderItems` method (use only one of these methods) attempts to transition the order item to the next state. When used without an event name, it only checks conditions. To trigger a specific event, pass the event name as a parameter.

4. The `assertOrderItemIsInState` method asserts that the item is in the expected `b` state.


These tests can range from simple to highly complex, depending on your testing needs. If additional items or full order processing are required, you may need to create a custom helper.  




### 6. Optional: Define the happy path of an order item

Along with the nice representation of the state machine as a graph, Spryker provides the `happy` flag. It adds green arrows on the transitions to define the happy path of an order item.

To add this flag, write `happy = "true"` on the transitions that are a part of your process happy path and refresh the graph.























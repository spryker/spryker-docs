---
title: Creating an Order Management System - Legacy Demoshop
originalLink: https://documentation.spryker.com/v4/docs/oms-state-machine
redirect_from:
  - /v4/docs/oms-state-machine
  - /v4/docs/en/oms-state-machine
---

## Challenge Description
Create a simple state machine that demonstrates an order process. The simple order process has the following states: new, paid, shipped, closed, returned, and invalid. We use the invalid state in case a payment is unauthorized (could be used with some other cases as well). In order to build the state machine, only three main steps are needed.

## 1. Create the State Machine Graph
The first step is to create a graph that demonstrates the state machine and contains the states with their transitions, events, commands, and conditions. State machines in Spryker are built using easy and well structured XML files. Let’s get started and create the state machine.

* Create a new XML file in `\config\Zed\oms` and call it `Demo01.xml`.

* Add the `Demo01` state machine as an active process in `config_default.php` under `\config\Shared\` by adding it to the `$config[OmsConstants::ACTIVE_PROCESSES]` array.

* Now, let’s go back to the XML file. To build the state machine main schema, use the `statemachine` and `process` elements and the Spryker OMS schema like following:

```
<?xml version="1.0"?>
    <statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

        <process name="Demo01" main="true">

        </process>

    </statemachine>
```

* Now, you are ready to add the states to the state machine. Add the first state `new` inside the process element using the state element like this:

```
<states>
        <state name="new"/>
    </states>
```

* To see the state machine graph while, and after, building it, go to **Zed UI -> Maintenance -> OMS** and then you will see your state machine `Demo01`. Click on it and you will see the graph that represents your XML file.

* Add the other states to you state machine and refresh the graph to see the new changes.

* After adding all the states, you can now start adding the `transition` and their events. To do so, use the transitions element like this:

```php
<transition>
        <source>new</source>
        <target>paid</target>
        <event>pay</event>
    </transition>
```
A transition defines the source state, the target state, and the event to trigger the transition.

* Now, add the event like this:

```php
<events>
        <event name="pay" onEnter="true"/>
    </events>
```

`onEnter` event means that this transition will be triggered automatically. You can also use `manual` or `timeout`. A `manual` event will add a button to the order page to allow triggering the event manually. A `timeout` one will be triggered after the specified time is out. A timeout could be defined using natural language, e.g. 14days.

* Add all the other needed transitions and events until you have a logically working graph. Refresh every time you add something new to see the changes live.

## 2. Add Commands and Conditions to the State Machine

In state machine real live scenarios, most probably you need to use PHP implementations for some specific logic like sending request to a payment provider or an ERP system. To do so, Spryker provides Commands and Conditions. Commands are triggered with events, therefore they are added to events, and conditions helps deciding to which state an item should move next, and therefore they are added to transitions.

Add a command to the `pay` event like this:

```php
<events>
        <event name="pay" onEnter="true" command="Demo/Pay"/>
    </events>
```

* Add the other commands to the other events.

* Now, add conditions where needed in order to make decisions where to move next. This works well with payments. So let’s add a condition to the `paid->shipped` transition like this:

```php
<transition condition="Demo/IsPaymentAuthorized">
        <source>paid</source>
        <target>shipped</target>
        <event>ship</event>
    </transition>
```

The state machine engine recognizes where to move next using the event name. In this case, the transitions `paid->shipped` and `paid->invalid` should use the same event name with a condition on one of the transitions. The machine then will examine the condition, if it returns `true`, go to `shipped` state, otherwise go to `invalid`. If you check the drafted state machine in Zed now, you can see that the conditions and commands are marked with red color (“not implemented”). So let’s implement them.

* In order to implement the commands and conditions, we use Spryker Command and Condition interfaces `CommandByOrderInterface` and `ConditionInterface`.

* Go to `src/Pyz/Zed/Oms/Communication/Plugin/Oms/Command/` and create a new folder called **Demo**. Now, create a new class and call it `PayCommand.php`. Then, implement the command interface with the `run()` method like this:

```php
<?php
    namespace Pyz\Zed\Oms\Communication\Plugin\Oms\Command\Demo;

    use Orm\Zed\Sales\Persistence\SpySalesOrder;
    use Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject;
    use Spryker\Zed\Oms\Communication\Plugin\Oms\Command\AbstractCommand;
    use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandByOrderInterface;

    class PayCommand extends AbstractCommand implements CommandByOrderInterface
    {

        /**
         * @param array $orderItems
         * @param \Orm\Zed\Sales\Persistence\SpySalesOrder $orderEntity
         * @param \Spryker\Zed\Oms\Business\Util\ReadOnlyArrayObject $data
         *
         * @return array
         */
        public function run(array $orderItems, SpySalesOrder $orderEntity, ReadOnlyArrayObject $data)
        {
            return [];
        }

    }
```

You can add any implementation to the `PayCommand`, or just return an empty array for now.

* Do the same thing for the other commands.

* Follwing the same approach, add the condition to `src/Pyz/Zed/Oms/Communication/Plugin/Oms/Condition/` by creating a new **Demo** folder and a condition class in it called `IsPaymentAuthorizedCondition.php`. The condition can be implemented like this:

```php
<?php
namespace Pyz\Zed\Oms\Communication\Plugin\Oms\Condition\Demo;

use Orm\Zed\Sales\Persistence\SpySalesOrderItem;
use Spryker\Zed\Oms\Communication\Plugin\Oms\Condition\AbstractCondition;
use Spryker\Zed\Oms\Dependency\Plugin\Condition\ConditionInterface;

class IsPaymentAuthorizedCondition extends AbstractCondition implements ConditionInterface
{

    /**
     * @api
     *
     * @param \Orm\Zed\Sales\Persistence\SpySalesOrderItem $orderItem
     *
     * @return bool
     */
    public function check(SpySalesOrderItem $orderItem)
    {
        return true;
    }

}
```

* After implementing the command and conditions, you need now to register them in the OMS module. To do so, go to `OmsDependencyProvider` in `src/Pyz/Zed/Oms/` and extend the `getConditionPlugins()` and `getCommandPlugins()` methods:

```php
<?php
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        $container = parent::provideBusinessLayerDependencies($container);
        $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
            $commandCollection->add(new PayCommand(), 'Demo/Pay');

            return $commandCollection;
        });

        $container->extend(self::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {
             $conditionCollection->add(new IsPaymentAuthorizedCondition(), 'Demo/IsPaymentAuthorized');

             return $conditionCollection;
        });

        return $container;
    }
```

* Now, refresh the state machine graph, you should see everything correctly implemented and the red messages are gone.

## 3. Activate the State Machine

The final step is to activate and use the state machine by hooking it into the checkout. To do so:

* Open the configuration file: `config/Shared/config_default.php`.
* Change the invoice payment configuration to use the `Demo01` state machine instead of `DummyPayment01`.

```php
<?php
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    DummyPaymentConfig::PAYMENT_METHOD_INVOICE => 'Demo01',
    ...
];
```

Next time you checkout with “Invoice” payment, the new `Demo01` state machine will be used.

## Testing the State Machine
That’s it! You have just built a new order process. To test it:

* Go to the [demoshop](https://spryker.com/), choose a product and add it to cart, checkout using Invoice, and complete the order.

* Open the [orders page](http://zed.mysprykershop.com/sales) in Zed UI and then open your order. This order is now applying the process you have defined in the state machine. All the manual events add buttons using the event names you defined, while the `onEnter` ones move automatically.

* You can click on the state machine name `Demo01` under the process column to see what the current state for a specific item is. The current state has a yellowish background color.

* Now, click on **ship** to move the item into the next state.

* Click again on the state machine name `Demo01` and check the current state.
* You can keep moving the item until the order is closed.

## Nice Addition
Along with the nice representation of the state machine as graph, Spryker provides a flag called happy to add green arrows in the graph in order to define the happy path of an order item. To add this flag, just write `happy = true` on the transitions that are a part of the happy path like this for example:

```php
<transition condition="Demo/IsPaymentAuthorized" happy="true">
        <source>paid</source>
        <target>shipped</target>
       <event>ship</event>
   </transition>
```

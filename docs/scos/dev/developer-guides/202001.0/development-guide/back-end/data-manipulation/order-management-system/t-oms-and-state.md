---
title: Creating an Order Management System - Spryker Commerce OS
originalLink: https://documentation.spryker.com/v4/docs/t-oms-and-state-machines-spryker-commerce-os
redirect_from:
  - /v4/docs/t-oms-and-state-machines-spryker-commerce-os
  - /v4/docs/en/t-oms-and-state-machines-spryker-commerce-os
---

{% info_block infoBox %}
This tutorial is also available on the Spryker Training web-site. For more information and hands-on exercises, visit the [Spryker Training](https://training.spryker.com/courses/developer-bootcamp
{% endinfo_block %} web-site.)

## Challenge Description
In this task, you will create a full order management process (OMS) using the Spryker state machine and then use it in your shop.

### 1. Create the State Machine Skeleton
    
In this order process, you will use the following states: _new_, _paid_, _shipped_, _returned_, _refunded_, _unauthorized_, and _closed_.

You will build all the transitions and events between these states as well. The skeleton of Spryker state machines is simply an XML file.
1. Create a new XML file in `config/Zed/oms` and call it **Demo01.xml**.
2. Add the **Demo01** state machine process schema as following:

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
    
3. Activate the OMS process in `config_default.php` in `config/Shared` by adding a name of the process _Demo01_ to the key `[OmsConstants::ACTIVE_PROCESSES]`.

```php

$config[OmsConstants::ACTIVE_PROCESSES] = [
	'Demo01'
];
```
    
4. Now, let's go back to the skeleton XML and add the first state. Simply, add a state element with the name.

```xml
<states>
	<state name="new" />
    </states>
```
    
5. Check the state machine graph while building it.
    1. Go to the **Maintenance → OMS** page in the Backend Office, you will see your state machine **Demo01**.
    2. Click on it and you will see the graph that represents your XML file. 
{% info_block infoBox %}
Whenever you change the skeleton in the XML file, refresh the page so see the new changes.
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
    
7. The next step is to add the transitions with the statuses' events. 

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

8. Now, add the event to the events section and in the transition you already have. Refresh the graph afterwards.

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

9. Finally, add rest of the transitions and events:

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
The skeleton of the order process is now done. Refresh the graph and check your process.
{% endinfo_block %}

### 2. Add a Command and a Condition to the State Machine

Order process usually needs PHP implementations for certain functionalities like calling a payment provider or checking if a payment is authorized or not.
To do so, Spryker introduces **Commands** and **Conditions**:

* Commands are used for any implementation of any functionality used in the process.
* Conditions are used to replace an if-then statement in your process.

They are both implemented in PHP and injected in the state machine skeleton.

1. Add a dummy command to perform the payment. 

{% info_block infoBox %}
In a real scenario, this command would call a payment provider to authorize the payment.
{% endinfo_block %}

A command in the Spryker state machine is added to an event. So add the command **Pay** to the pay event.

```xml
<event name="pay" onEnter="true" command="Demo/Pay" />
```

{% info_block infoBox %}
Refresh the graph again. You will see that the command is added with the label not implemented. This means that the PHP implementation is not hooked yet.
{% endinfo_block %}

2. The next step is to add the command and hook it into the skeleton. The command is simply a Spryker plugin connected to the OMS module. 

{% info_block infoBox %}
For the demo, we will add the command plugin directly to the OMS module. In a real life scenario, you can include the plugin in any other module depending on your software design of your shop.
{% endinfo_block %}

Add the command plugin to `src/Pyz/Zed/Oms/Communication/Plugin/Command/Demo` and call it `PayCommand`.

As the command is a plugin, it should implement some interface. The interface for the command here is `CommandByOrderInterface` which has the method `run()`.

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

3. The next step is to hook the command to your state machine using the `OmsDependencyProvider`. 

IIn the `OmsDependencyProvider`, there is a method called `extendCommandPlugins()` which is called from `provideBusinessLayerDependencies()` one.

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
Refresh the graph. You should not see the not implemented label anymore meaning that the state machine  recognizes the command.
{% endinfo_block %}

4. The next step is to add the condition in the same way but using the `ConditionInterface` interface for the plugin instead of the command one. The state machine engine recognizes where to move next using the event name. In this case, the transitions `paid->shipped` and `paid->unauthorized` should use the same event name with a condition on one of the transitions. 

{% info_block infoBox %}
The machine then will examine the condition, if it returns true then go to shipped state, otherwise go to unauthorized.
{% endinfo_block %}

The skeleton will look like this:

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

The condition plugin:

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

And the `OmsDependencyProvider`:

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

### 3. Use the State Machine for Your Orders
    
The final step is to use the state machine by hooking it into the checkout.

To do so, open the configuration file `config/Shared/config_default.php` and make the invoice payment method use the **Demo01** process.
    
```php
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
	DummyPaymentConfig::PAYMENT_METHOD_INVOICE => 'Demo01',
];
```
    
That's it! Your process should be working now.
    
### 4. Test the State Machine
    
You have just built a new order process. To test it, do the following:
1. Go to the [shop](http://www.de.suite.local/), chose a product, add it to cart, and checkout using the Invoice payment method.
2. Open the [orders page](http://zed.de.demoshop.local/sales) in Zed UI and then open your order.

{% info_block infoBox %}
This order is now applying the process you have defined in the state machine. 
{% endinfo_block %}
    
3. You will notice that there is a button next to your order called **ship**; this one triggers the manual event ship.
4. You can click on the last state name under the state column to see what the current state for a specific item is.

{% info_block infoBox %}
 The current state has a yellowish background color.
{% endinfo_block %}
    
5. Click on **ship** to move the item into the next state.
6. Click again on the last state name and check the current state.

{% info_block warningBox %}
You can keep moving the item until the order is closed.
{% endinfo_block %}
    
### Nice Addition
    
Along with the nice representation of the state machine as a graph, Spryker provides a flag called **happy**.

This flag adds green arrows on the transitions in order to define the happy path of an order item.

To add this flag, just write `happy = "true"` on the transitions that are a part of your process happy path and refresh the graph.
    
<!-- Last review date: Jul 11, 2019 -->
    
[//]: # (by Dmitry Lymarenko, Yuliia Boiko)


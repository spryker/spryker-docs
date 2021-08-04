---
title: Episerver - Order referenced commands
originalLink: https://documentation.spryker.com/v6/docs/episerver-order-referenced-commands
redirect_from:
  - /v6/docs/episerver-order-referenced-commands
  - /v6/docs/en/episerver-order-referenced-commands
---

The Episerver module has four different commands:

* `\SprykerEco\Zed\Episerver\Communication\Plugin\Oms\Command\EpiserverNewOrderPlugin`
* `\SprykerEco\Zed\Episerver\Communication\Plugin\Oms\Command\EpiserverOrderCanceledPlugin`
* `\SprykerEco\Zed\Episerver\Communication\Plugin\Oms\Command\EpiserverPaymentNotReceivedPlugin`
* `\SprykerEco\Zed\Episerver\Communication\Plugin\Oms\Command\EpiserverShippingConfirmationPlugin`
  

You can use these commands in `\Pyz\Zed\Oms\OmsDependencyProvider::getCommandPlugins`

**OmsDependencyProvider**

```php
...
use SprykerEco\Zed\Episerver\Communication\Plugin\Oms\Command\EpiserverNewOrderPlugin;
...
  
/**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Spryker\Zed\Oms\Communication\Plugin\Oms\Command\CommandCollection
 */
protected function getCommandPlugins(Container $container)
{
    $collection = parent::getCommandPlugins($container);
  
    ...
    $collection->add(new EpiserverNewOrderPlugin(), 'Episerver/SendNewOrderRequest');
    $collection->add(new EpiserverOrderCanceledPlugin(), 'Episerver/SendOrderCanceledRequest');
    $collection->add(new EpiserverPaymentNotReceivedPlugin(), 'Episerver/PaymentNotReceivedRequest');
    $collection->add(new EpiserverShippingConfirmationPlugin(), 'Episerver/ShippingConfirmedRequest');
    ...
  
    return $collection;
}
```

After that you are ready to use commands in the OMS setup:

**OmsDependencyProvider**

```html
<events>
    <event name="authorize" onEnter="true" command="Episerver/SendNewOrderRequest"/>
    <event name="shipped_confirmed"  manual="true" command="Episerver/ShippingConfirmedRequest"/>
    <event name="pay" manual="true" command="Episerver/PaymentNotReceivedRequest" />
    <event name="cancel" manual="true" command="Episerver/SendOrderCanceledRequest" />
</events>
```

**oms-statemachine**

```html
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">
 
    <process name="OptivoPayment01" main="true">
        <states>
            <state name="new" reserved="true"/>
            <state name="shipping confirmed" reserved="true"/>
            <state name="payment pending" reserved="true"/>
            <state name="invalid">
                <flag>exclude from customer</flag>
            </state>
            <state name="cancelled">
                <flag>exclude from customer</flag>
            </state>
            <state name="optivo_cancelled" reserved="true"/>
        </states>
 
        <transitions>
            <transition happy="true" condition="DummyPayment/IsAuthorized">
                <source>new</source>
                <target>shipping confirmed</target>
                <event>authorize</event>
            </transition>
 
            <transition happy="true">
                <source>shipping confirmed</source>
                <target>payment pending</target>
                <event>shipped_confirmed</event>
            </transition>
 
            <transition>
                <source>new</source>
                <target>invalid</target>
                <event>authorize</event>
            </transition>
 
            <transition>
                <source>payment pending</source>
                <target>cancelled</target>
                <event>pay</event>
            </transition>
 
            <transition>
                <source>cancelled</source>
                <target>optivo_cancelled</target>
                <event>cancel</event>
            </transition>
 
        </transitions>
 
        <events>
            <event name="authorize" onEnter="true" command="Optivo/SendNewOrderRequest"/>
            <event name="shipped_confirmed"  manual="true" command="Optivo/ShippingConfirmedRequest"/>
            <event name="pay" manual="true" command="Optivo/PaymentNotReceivedRequest" />
            <event name="cancel" manual="true" command="Optivo/SendOrderCanceledRequest" />
        </events>
    </process>
 
</statemachine>
```

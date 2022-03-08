---
title: Integrating Seven Senders
template: howto-guide-template
---

This document describes how to integrate the Seven Senders technology partner.

## Integration

## Oms commands

Seven Senders module has two different commands:

* `\SprykerEco\Zed\Sevensenders\Communication\Plugin\Oms\Command\SevensendersOrderPlugin`
* `\SprykerEco\Zed\Sevensenders\Communication\Plugin\Oms\Command\SevensendersShipmentPlugin`

You can use this commands in `\Pyz\Zed\Oms\OmsDependencyProvider::getCommandPlugins`
```php
...
use Spryker\Zed\Oms\Communication\Plugin\Oms\Command\SendOrderConfirmationPlugin;
use Spryker\Zed\Oms\Communication\Plugin\Oms\Command\SendOrderShippedPlugin;
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
 $collection->add(new SevenordersOrderPlugin(), 'Sevensenders/NewOrder');
 $collection->add(new SevenordersShipmentPlugin(), 'Sevensenders/NewShipment');
 ...

 return $collection;
}
```

After you are ready to use commands in OMS setup:
```xml
<events>
 <event name="shipping_confirmed" onEnter="true" command="Sevensenders/NewOrder"/>
 <event name="shipping_delivered" manual="true" command="Sevensenders/NewShipment"/>
</events>
```

## Oms conditions

Sevensenders module has two different conditions:

* `SprykerEco\Zed\Sevensenders\Communication\Plugin\Oms\Condition\IsSuccessfulPreviousOrderResponseConditionPlugin`
* `SprykerEco\Zed\Sevensenders\Communication\Plugin\Oms\Condition\IsSuccessfulPreviousShipmentResponseConditionPlugin`

You can use these commands in `\Pyz\Zed\Oms\OmsDependencyProvider::getConditionPlugins`
```php
...
use SprykerEco\Zed\Sevensenders\Communication\Plugin\Oms\Condition\IsSuccessfulPreviousOrderResponseConditionPlugin;
use SprykerEco\Zed\Sevensenders\Communication\Plugin\Oms\Condition\IsSuccessfulPreviousShipmentResponseConditionPlugin;
...

/**
 * @param \Spryker\Zed\Kernel\Container $container
 *
 * @return \Spryker\Zed\Oms\Communication\Plugin\Oms\Condition\ConditionCollection
 */
protected function getConditionPlugins(Container $container)
{
 $collection = parent::getConditionPlugins($container);

 ...
 $collection->add(new IsSuccessfulPreviousOrderResponseConditionPlugin(), 'Sevensenders/IsSuccessfulResponse');
 $collection->add(new IsSuccessfulPreviousShipmentResponseConditionPlugin(), 'Sevensenders/IsSuccessfulResponse');
 ...

 return $collection;
}
```

After you are ready to use commands in OMS setup:
```xml
<transition happy="true" condition="Sevensenders/IsSuccessfulResponse">
 <source>new</source>
 <target>shipping confirmed</target>
 <event>shipping_confirmed</event>
</transition>
```

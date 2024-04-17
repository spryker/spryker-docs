---
title: Inxmail order referenced commands
description: Learn about the order referenced commands for Inxmail in Spryker.
last_updated: Jun 16, 2021
template: howto-guide-template
redirect_from:
    - /docs/scos/dev/technology-partner-guides/202200.0/marketing-and-conversion/customer-communication/inxmail/inxmail-order-referenced-commands.html
    - /docs/scos/dev/technology-partner-guides/202204.0/marketing-and-conversion/customer-communication/inxmail/inxmail-order-referenced-commands.html
---

Inxmail module has four different commands:

* `\SprykerEco\Zed\Inxmail\Communication\Plugin\Oms\Command\InxmailNewOrderPlugin`
* `\SprykerEco\Zed\Inxmail\Communication\Plugin\Oms\Command\InxmailOrderCanceledPlugin`
* `\SprykerEco\Zed\Inxmail\Communication\Plugin\Oms\Command\InxmailPaymentNotReceivedPlugin`
* `\SprykerEco\Zed\Inxmail\Communication\Plugin\Oms\Command\InxmailShippingConfirmationPlugin`

You can use this commands in `\Pyz\Zed\Oms\OmsDependencyProvider::getCommandPlugins`
```php
 ...
 use SprykerEco\Zed\Inxmail\Communication\Plugin\Oms\Command\InxmailNewOrderPlugin;
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
 $collection->add(new InxmailNewOrderPlugin(), 'Inxmail/SendNewOrderRequest');
 ...

 return $collection;
 }
 ```

After that you are ready to use commands in OMS setup:
```php
 <events>
 <event name="authorize" onEnter="true" manual="true" command="Inxmail/SendNewOrderRequest"/>
 <event name="pay" manual="true" timeout="1 hour" />
 <event name="export" onEnter="true" manual="true" command="Oms/SendOrderConfirmation"/>
 <event name="ship" manual="true" command="Oms/SendOrderShipped"/>
 <event name="stock-update" manual="true"/>
 <event name="close" manual="true" timeout="1 hour"/>
 <event name="return" manual="true" />
 </events>
 ```

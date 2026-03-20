---
title: Episerver order reference commands
description: Learn about the order reference commands for Episerver in Spryker.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/episerver-order-referenced-commands
originalArticleId: e7a03c79-0815-4b92-963d-37675be9561a
redirect_from:
  - /2021080/docs/episerver-order-referenced-commands
  - /2021080/docs/en/episerver-order-referenced-commands
  - /docs/episerver-order-referenced-commands
  - /docs/en/episerver-order-referenced-commands
  - /docs/scos/user/technology-partners/202204.0/marketing-and-conversion/customer-communication/episerver/technical-details-and-howtos/episerver-order-referenced-commands.html
  - /docs/scos/dev/technology-partner-guides/202200.0/marketing-and-conversion/customer-communication/episerver/episerver-order-reference-commands.html
  - /docs/scos/dev/technology-partner-guides/202204.0/marketing-and-conversion/customer-communication/episerver/episerver-order-reference-commands.html
related:
  - title: Episerver - Integration into a project
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/customer-communication/episerver/integrate-episerver.html
  - title: Episerver - Installation and Configuration
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/customer-communication/episerver/install-and-configure-episerver.html
  - title: Episerver - API Requests
    link: docs/pbc/all/miscellaneous/page.version/third-party-integrations/marketing-and-conversion/customer-communication/episerver/episerver-api.html
---

The Episerver module has four different commands:

- `\SprykerEco\Zed\Episerver\Communication\Plugin\Oms\Command\EpiserverNewOrderPlugin`
- `\SprykerEco\Zed\Episerver\Communication\Plugin\Oms\Command\EpiserverOrderCanceledPlugin`
- `\SprykerEco\Zed\Episerver\Communication\Plugin\Oms\Command\EpiserverPaymentNotReceivedPlugin`
- `\SprykerEco\Zed\Episerver\Communication\Plugin\Oms\Command\EpiserverShippingConfirmationPlugin`


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

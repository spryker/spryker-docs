---
title: Integrate Vertex
description: Find out how you can integrate Vertex into your Spryker shop
draft: true
last_updated: Aug 3, 2023
template: howto-guide-template
---

## Step 1 - Integrate ACP connector module for tax calculation

To enable the Vertex integration, use the [spryker/tax-app](https://github.com/spryker/tax-app) ACP connector module.

To integrate Vertex you have to install the following Spryker module:

  *  `"spryker/tax-app": "^0.1.0"`

Next follow these steps to integrate the connector module for the Vertex app.

### 1. Configure shared configs.

Add the following config to `config/Shared/config_default.php`:

```php
// ...

use Generated\Shared\Transfer\SubmitPaymentTaxInvoiceTransfer;

// ...

$config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] = [
    // ...
    
    SubmitPaymentTaxInvoiceTransfer::class => 'tax-commands',
];

$config[MessageBrokerConstants::CHANNEL_TO_TRANSPORT_MAP] = [
    // ...
    
    'tax-commands' => 'http',
];

$config[MessageBrokerAwsConstants::CHANNEL_TO_SENDER_TRANSPORT_MAP] = [
    // ...
    
    'tax-commands' => 'http',
];
```

### 2. Configure Payment OMS if you plan to send invoices to Vertex via OMS.

There is an example of how to configure payment `config/Zed/oms/{your_payment_oms}.xml`.

```xml
<?xml version="1.0"?>
<statemachine
    xmlns="spryker:oms-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

    <process name="SomePaymentProcess" main="true">

        <!-- other configurations -->
        
        <states>

            <!-- other states -->
            
            <state name="tax invoice submitted" reserved="true" display="oms.state.paid"/>

            <!-- other states -->
            
        </states>

        <transitions>

            <!-- other transitions -->

            <transition happy="true">
                <source>paid</source> <!-- Suggested that paid transition should be the source, but it's up to you -->
                <target>tax invoice submitted</target>
                <event>submit tax invoice</event>
            </transition>

            <!-- other transitions -->

            <transition happy="true">
                <source>tax invoice submitted</source>
                
                <!-- Here the contents of target transition -->
                
            </transition>

            <!-- other transitions -->
            
        </transitions>

        <events>

            <!-- other events -->

            <event name="submit tax invoice" onEnter="true" command="TaxApp/SubmitPaymentTaxInvoice"/>

            <!-- other events -->
            
        </events>
        
    </process>
    
</statemachine>
```

### 3. Configure Oms Dependency Provider

Add the config to `src/Pyz/Zed/Oms/OmsDependencyProvider.php`:

```php
// ...
    
use Spryker\Zed\TaxApp\Communication\Plugin\Oms\Command\SendPaymentTaxInvoicePlugin;

// ...

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendCommandPlugins(Container $container): Container
    {
         $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
             
             // ...
             
             $commandCollection->add(new SendPaymentTaxInvoicePlugin(), 'TaxApp/SubmitPaymentTaxInvoice');

             // ...
            
             return $commandCollection;
        });
        
        return $container;
    }

```

### 4. Configure Calculation Dependency Provider

Add the following to `src/Pyz/Zed/Calculation/CalculationDependencyProvider.php`

```php
// ...

use Spryker\Zed\TaxApp\Communication\Plugin\Calculation\TaxAppCalculationPlugin;

// ...

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CalculationExtension\Dependency\Plugin\CalculationPluginInterface>
     */
    protected function getQuoteCalculatorPluginStack(Container $container): array
    {
        /** @var array<\Spryker\Zed\Calculation\Dependency\Plugin\CalculationPluginInterface> $pluginStack */
        $pluginStack = [
            // ...
        
            new TaxAppCalculationPlugin(),
        
            // ...
        ];
        
        return $pluginStack;
    }

// ...
```

### 5. Configure what data has to be sent to Vertex

Additional data for Spryker quote and order objects can be added as plugins in  `src/Pyz/Zed/TaxApp/TaxAppDependencyProvider.php`:

{% info_block infoBox "Note" %}

Please pay attention that you have to implement that plugin stack on your side. The explanation of what they should be will be provided below.

{% endinfo_block %}

```php
<?php

namespace Pyz\Zed\TaxApp;

// ...

class TaxAppDependencyProvider extends SprykerTaxAppDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\TaxAppExtension\Dependency\Plugin\CalculableObjectTaxAppExpanderPluginInterface>
     */
    protected function getCalculableObjectExpanderPluginCollection(): array
    {
        return [
            // Put your Calculable Object Expander plugins here
        ];
    }

    /**
     * @return array<\Spryker\Zed\TaxAppExtension\Dependency\Plugin\OrderTaxAppExpanderPluginInterface>
     */
    protected function getOrderExpanderPluginCollection(): array
    {
        return [
             // Put your Order Expander plugins here
        ];
    }
}
```

Usually, tax apps require Order/Cart and Order/Cart Items expander plugins. You can check example implementation of these plugins for the Vertex app.

## Step 2 - Integrate the Vertex app

### 1. Configure Vertex Specific Metadata Transfers

First of all it's necessary to define specific Vertex Tax Metadata transfers and extend several other transfers with them.

```xml

<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="spryker:transfer-01
    http://static.spryker.com/transfer-01.xsd">

    <!-- Calculable Object is extended with SaleTaxMetadata -->
    <transfer name="CalculableObject">
        <property name="taxMetadata" type="SaleTaxMetadata" strict="true"/>
    </transfer>

    <!-- Order is extended with SaleTaxMetadata -->
    <transfer name="Order">
        <property name="taxMetadata" type="SaleTaxMetadata" strict="true"/>
    </transfer>

    <!-- Expense is extended with ItemTaxMetadata -->
    <transfer name="Expense">
        <property name="taxMetadata" type="ItemTaxMetadata" strict="true"/>
    </transfer>

    <!-- Item is extended with ItemTaxMetadata -->
    <transfer name="Item">
        <property name="taxMetadata" type="ItemTaxMetadata" strict="true"/>
    </transfer>

    <!-- Product Option is extended with ItemTaxMetadata -->
    <transfer name="ProductOption">
        <property name="taxMetadata" type="ItemTaxMetadata" strict="true"/>
    </transfer>

    <!-- Sales Tax Metadata. It contains Vertex tax metadata which is related to Order or Quote in general. -->
    <transfer name="SaleTaxMetadata" strict="true">
        <property name="seller" type="array" associative="true" singular="_"/>
        <property name="customer" type="array" associative="true" singular="_"/>
    </transfer>

    <!-- Items Tax Metadata. It contains Vertex tax metadata which is related to Item.-->
    <transfer name="ItemTaxMetadata" strict="true">
        <property name="product" type="array" associative="true" singular="_"/>
        <property name="flexibleFields" type="array" associative="true" singular="_"/>
    </transfer>

</transfers>

```

In general `SaleTaxMetadata` and `ItemTaxMetadata` are designed to be equal to Vertex Tax Calculation API request body. So you are free to extend them as you need according to Vertex API structure.
`SaleTaxMetadata` is equal to Invoicing/Quotation request payload excluding LineItems.
`ItemTaxMetadata` is equal to Line Item API Payload.

### 2. Implement Vertex Specific Metadata Extender Plugins 

Here explained how different Vertex Tax Metadata expander plugins could be organized.

#### Customer Class Code expanders

You could introduce them like:

`Pyz/Zed/{YourDesiredModule}/Communication/Plugin/Order/OrderCustomerWithVertexCodeExpanderPlugin.php`

With contents:

```php
<?php

namespace Pyz\Zed\{YourDesiredModule}\Communication\Plugin\Order;

use Generated\Shared\Transfer\OrderTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\TaxAppExtension\Dependency\Plugin\OrderTaxAppExpanderPluginInterface;

class OrderCustomerWithVertexCodeExpanderPlugin extends AbstractPlugin implements OrderTaxAppExpanderPluginInterface
{
    /**
     * @param \Generated\Shared\Transfer\OrderTransfer $orderTransfer
     *
     * @return \Generated\Shared\Transfer\OrderTransfer
     */
    public function expand(OrderTransfer $orderTransfer): OrderTransfer
    {
        $orderTransfer->getTaxMetadata()->setCustomerClassCode('CustomerClassCode');

        return $orderTransfer;
    }
}
```

For Calculation process:

`Pyz/Zed/{YourDesiredModule}/Communication/Plugin/Quote/CalculableObjectCustomerWithVertexCodeExpanderPlugin.php`

with contents:

```php
<?php

namespace Spryker\Zed\{YourDesiredModule}\Communication\Plugin\Quote;

use Generated\Shared\Transfer\CalculableObjectTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\TaxAppExtension\Dependency\Plugin\CalculableObjectTaxAppExpanderPluginInterface;

class CalculableObjectCustomerWithVertexCodeExpanderPlugin extends AbstractPlugin implements CalculableObjectTaxAppExpanderPluginInterface
{
    /**
     * @param \Generated\Shared\Transfer\CalculableObjectTransfer $quoteTransfer
     *
     * @return \Generated\Shared\Transfer\CalculableObjectTransfer
     */
    public function expand(CalculableObjectTransfer $quoteTransfer): CalculableObjectTransfer
    {
        $quoteTransfer->getTaxMetadata()->setCustomerClassCode('CustomerClassCode');

        return $quoteTransfer;
    }
}
```

#### Product Class Code Expanders

For Order Items:

`Pyz/Zed/{YourDesiredModule}/Communication/Plugin/Order/OrderItemVertexProductClassCodeExpanderPlugin.php`

and for Quote Items

`Pyz/Zed/{YourDesiredModule}/Communication/Plugin/Quote/CalculableObjectItemWithVertexProductClassCodeExpanderPlugin.php`

Contents of both plugins would be pretty similar:

```php
// ...
class ItemWithVertexClassCodeExpanderPlugin extends AbstractPlugin implements CalculableObjectTaxAppExpanderPluginInterface
{
    /**
     * @param \Generated\Shared\Transfer\CalculableObjectTransfer $calculableObjectTransfer
     *
     * @return \Generated\Shared\Transfer\CalculableObjectTransfer
     */
    public function expand(CalculableObjectTransfer $calculableObjectTransfer): CalculableObjectTransfer
    {
        foreach ($calculableObjectTransfer->getItems() as $itemTransfer) {
            $itemTransfer->getTaxMetadata()->setProduct(['productClass' => 'ProductClassCode']);
        }

        return $calculableObjectTransfer;
    }
}
```

PLease pay attention: The same Product Class Code extension should be done for all Product Options and other Order Expenses because in Vertex prospective they all are separate items for tax calculation. To find them a proper place you can refer to transfer extension described above.


#### Flexible fields extension

Flexible fields extension plugins would look like similar to Item Product Class Code extension plugins.
For example:

```php

class ItemWithFlexibleFieldsExpanderPlugin extends AbstractPlugin implements CalculableObjectTaxAppExpanderPluginInterface
{
    // ...
    
    /**
     * @param \CalculableObjectTransfer $calculableObjectTransfer
     * 
     * @return \CalculableObjectTransfer
     */
    public function expand(CalculableObjectTransfer $calculableObjectTransfer): CalculableObjectTransfer
    {
        foreach ($calculableObjectTransfer->getItems() as $itemTransfer) {
            $itemTransfer
                ->getTaxMetadata()
                ->setFlexibleFields(
                    [
                        'flexibleCodeFields' => [
                            [
                                'fieldId' => 1,
                                'value' => 'Code',
                            ],
                        ],
                    ],
                );
        }

        return $calculableObjectTransfer;
    }
}
```

So in general the plugin stack could look like this:

```php

namespace Pyz\Zed\TaxApp;

// ...

class TaxAppDependencyProvider extends SprykerTaxAppDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\TaxAppExtension\Dependency\Plugin\CalculableObjectTaxAppExpanderPluginInterface>
     */
    protected function getCalculableObjectExpanderPluginCollection(): array
    {
        return [
            new CalculableObjectCustomerWithTaxCodeExpanderPlugin(), // to extend quote with customer class code
            new CalculableObjectExpensesWithTaxCodeExpanderPlugin(), // to extend quote expenses with product class codes
            new CalculableObjectItemProductOptionWithTaxCodeExpanderPlugin(), // to extend quote item product options with product class codes
            new CalculableObjectItemWithProductClassCodeExpandePlugin(), // to extend quote items with product class codes
            new CalculableObjectItemWithFlexibleFieldsExpanderPlugin(), // to extend quote items with flexible fields
        ];
    }

    /**
     * @return array<\Spryker\Zed\TaxAppExtension\Dependency\Plugin\OrderTaxAppExpanderPluginInterface>
     */
    protected function getOrderExpanderPluginCollection(): array
    {
        return [
            new OrderCustomerWithTaxCodeExpanderPlugin(), // to extend order with customer class code
            new OrderExpensesWithTaxCodeExpanderPlugin(), // to extend order expenses with product class codes
            new OrderItemProductOptionWithTaxCodeExpanderPlugin(), // to extend order item product options with product class codes
            new OrderItemWithProductClassCodeExpandePlugin(), // to extend order items with product class codes
            new OrderItemWithFlexibleFieldsExpanderPlugin(), // to extend order items with flexible fields
        ];
    }
}

```

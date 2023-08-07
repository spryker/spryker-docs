---
title: Integrate Vertex
description: Find out how you can integrate Vertex into your Spryker shop
draft: true
last_updated: Aug 3, 2023
template: howto-guide-template
---

## Step 1 - Integrate the Tax App module

To enable the Tax app integration, use the [spryker/tax-app](https://github.com/spryker/tax-app) module.

The Tax app requires the following Spryker modules:

  *  `"spryker/calculation-extension": "^1.0.0"`
  *  `"spryker/event": "^2.1.0"`
  *  `"spryker/event-behavior": "^1.23.0"`
  *  `"spryker/kernel": "^3.30.0"`
  *  `"spryker/log": "^3.0.0"`
  *  `"spryker/message-broker": "^1.5.0"`
  *  `"spryker/message-broker-extension": "^1.0.0"`
  *  `"spryker/propel-orm": "^1.0.0"`
  *  `"spryker/sales": "^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0 || ^10.0.0 || ^11.0.0"`
  *  `"spryker/store": "^1.16.0"`
  *  `"spryker/tax-app-extension": "^0.1.0"`
  *  `"spryker/transfer": "^3.27.0"`

Follow these steps to integrate Tax App.

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

### 2. Configure Payment OMS if you plan to send invoices to Tax App via OMS.

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

### 5. Configure Tax App Dependency Provider

Tax App Dependency Provider could have next configuration `src/Pyz/Zed/TaxApp/TaxAppDependencyProvider.php`:

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
            new CalculableObjectCustomerWithTaxCodeExpanderPlugin(),
            new CalculableObjectExpensesWithTaxCodeExpanderPlugin(),
            new CalculableObjectItemProductOptionWithTaxCodeExpanderPlugin(),
            new CalculableObjectItemWithTaxTaxCodeExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\TaxAppExtension\Dependency\Plugin\OrderTaxAppExpanderPluginInterface>
     */
    protected function getOrderExpanderPluginCollection(): array
    {
        return [
            new OrderCustomerWithTaxCodeExpanderPlugin(),
            new OrderExpensesWithTaxCodeExpanderPlugin(),
            new OrderItemProductOptionWithTaxCodeExpanderPlugin(),
            new OrderItemWithTaxTaxCodeExpanderPlugin(),
        ];
    }
}
```

{% info_block infoBox "Note" %}

Please pay attention that you have to implement that plugin stack on your side. `YourModule` - means that you'll put them wherever you suggest in some module.

{% endinfo_block %}

Usually Tax app requires Order/Cart and Order/Cart Items. You can check example implementation of these plugins for the Vertex Tax App.

## Step 2 - Integrate the Vertex App

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
`SaleTaxMetadata` is equal to Ivoicing/Quotation request payload excluding LineItems.
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
        /** @var \Generated\Shared\Transfer\OrderTransfer $orderTransfer */
        $orderTransfer = $this->getFactory()->createCustomerVertexTaxMetadataExpander()->expand($orderTransfer);

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
        /** @var \Generated\Shared\Transfer\CalculableObjectTransfer $quoteTransfer */
        $quoteTransfer = $this->getFactory()->createCustomerVertexTaxMetadataExpander()->expand($quoteTransfer);

        return $quoteTransfer;
    }
}
```

In this case `CustomerVertexTaxMetadataExpander` will do something similar to:

```php
// ...

class CustomerVertexTaxMetadataExpander {
    // ...
    
    public function expand($orderTransfer)
    {
        return $orderTransfer->getTaxMetadata()->setCustomerClassCode('CustomerClassCode');
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
        /** @var \Generated\Shared\Transfer\CalculableObjectTransfer $calculableObjectTransfer */
        $calculableObjectTransfer = $this->getFactory()->createItemProductClassCodeExpander()->expand($calculableObjectTransfer);

        return $calculableObjectTransfer;
    }
}
```

Where `ItemProductClassCodeExpander` will do next:

```php
// ...

class ItemProductClassCodeExpander
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
            $itemTransfer->getTaxMetadata()->setProduct(['productClass' => 'ProductClassCode']);
        }

        return $transfer;
    }
}
```

PLease pay attention: The same Product Class Code extension should be done for all Product Options and other order expenses because in Vertex prospective they all are separate items for tax calculation. To find them a proper place you can refer to transfer extension described above.


#### Flexible fields extension

Flexible fields extension plugins would look like similar to Item Product Class Code extension plugins.
There is how flexible field expander could be implemented:

```php

class ItemFlexibleFieldExpander
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

        return $transfer;
    }
}
```

So in general the plugin stack could look like:

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

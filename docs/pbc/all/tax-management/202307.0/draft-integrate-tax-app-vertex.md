---
title: Integrate Vertex Tax App
draft: true
description: Integrate Vertex Tax App to automatically calculate taxes.
last_updated: Aug 3, 2023
template: concept-topic-template
---

## Prerequisites

Before you can integrate the Vertex Tax app you have to check this guide {Tax App Integration}. 

You also have to connect Tax App Vertex app to you account.

# Vertex Tax App Integration

1. # Configure Vertex Specific Metadata Transfers

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

2. # Implement Vertex Specific Metadata Extender Plugins 

Here explained how different Vertex Tax Metadata expander plugins could be organized.

1. Customer Class Code expanders:

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

2. Product Class Code Expanders:

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


3. Flexible fields extension.

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

---
title: Install Vertex
description: Find out how you can install Vertex in your Spryker shop
draft: true
last_updated: Aug 3, 2023
template: howto-guide-template
related:
  - title: Vertex
    link: docs/pbc/all/tax-management/page.version/vertex/vertex.html
---

## Prerequisites

- Before you can integrate Vertex, make sure that your project is ACP-enabled. See [App Composition Platform installation](/docs/acp/user/app-composition-platform-installation.html) for details.

- The Vertex app catalog page lists specific packages which must be installed or upgraded before you can use the Vertex app. To check the list of the necessary packages, in the Back Office, go to **Apps**-> **Vertex**.

Adjust your installation to comply with the listed requirements before proceeding.

## Integrate ACP connector module for tax calculation

To enable the Vertex integration, use the [spryker/tax-app](https://github.com/spryker/tax-app) ACP connector module.

To integrate the connector module for the Vertex app, follow the steps below.

### 1. Configure shared configs

Add the following config to `config/Shared/config_default.php`:

```php
// ...

use Generated\Shared\Transfer\ConfigureTaxAppTransfer;
use Generated\Shared\Transfer\DeleteTaxAppTransfer;
use Generated\Shared\Transfer\SubmitPaymentTaxInvoiceTransfer;

// ...

$config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] =
$config[MessageBrokerAwsConstants::MESSAGE_TO_CHANNEL_MAP] = [
    // ...
    ConfigureTaxAppTransfer::class => 'tax-commands',
    DeleteTaxAppTransfer::class => 'tax-commands',
    SubmitPaymentTaxInvoiceTransfer::class => 'tax-commands',
];

$config[MessageBrokerConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] = [
    // ...
    
    'tax-commands' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
];

$config[MessageBrokerConstants::CHANNEL_TO_SENDER_TRANSPORT_MAP] = [
    // ...
    
    'tax-commands' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
];
```

### 2. Configure Calculation Dependency Provider

Add the following to `src/Pyz/Zed/Calculation/CalculationDependencyProvider.php`:

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
        
            // Please put this plugin after all other tax calculation plugins.
        
            new TaxAppCalculationPlugin(),
        
            // ...
        ];
        
        return $pluginStack;
    }
    
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CalculationExtension\Dependency\Plugin\CalculationPluginInterface>
     */
    protected function getOrderCalculatorPluginStack(Container $container): array
    {
        return [
            // ...
        
            # Please put this plugin after all other tax calculation plugins.        
            new TaxAppCalculationPlugin(),
        
            // ...
        ];
    }

// ...
```

{% info_block infoBox "Performance Improvements" %}

Spryker has its own Taxes functionality that is pre-installed to the Checkout via Calculation module. When you decided to use external Tax calculation provider for the performance improvements it worths to disable following plguins:

in `\Pyz\Zed\Calculation\CalculationDependencyProvider::getQuoteCalculatorPluginStack()`:

- TaxAmountCalculatorPlugin
- ItemTaxAmountFullAggregatorPlugin
- TaxRateAverageAggregatorPlugin
- TaxTotalCalculatorPlugin

in `\Pyz\Zed\Calculation\CalculationDependencyProvider::getOrderCalculatorPluginStack()`:

- TaxAmountCalculatorPlugin
- ItemTaxAmountFullAggregatorPlugin
- TaxAmountAfterCancellationCalculatorPlugin
- OrderTaxTotalCalculationPlugin

{% endinfo_block %}

### 3. (Optional) If you plan to send invoices to Vertex through OMS, configure Payment OMS

The following code sample shows how to configure payment `config/Zed/oms/{your_payment_oms}.xml`.

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
                
                <!-- Here are the contents of the target transition -->
                
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

Configure Oms Dependency Provider.
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

## Integrate the Vertex app

To integrate the Vertex app, follow the steps below. 

### 1. Configure Vertex Specific Metadata Transfers

Define specific Vertex Tax Metadata transfers and extend several other transfers with them:

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

`SaleTaxMetadata` and `ItemTaxMetadata` are designed to be equal to the Vertex Tax Calculation API request body. You can extend them as you need according to the Vertex API structure.

`SaleTaxMetadata` is equal to the Invoicing/Quotation request payload, excluding LineItems.

`ItemTaxMetadata` is equal to Line Item API Payload.

### 2. Implement Vertex Specific Metadata Extender Plugins

There are several types of expander plugins you have to introduce.

#### Configure Customer Class Code Expander plugins

The following code sample shows how to introduce the following expander plugin:

`Pyz/Zed/{YourDesiredModule}/Communication/Plugin/Order/OrderCustomerWithVertexCodeExpanderPlugin.php`

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
        $orderTransfer->getTaxMetadata()->setCustomer(['customerCode' => ['classCode' => 'vertex-customer-code']]);

        return $orderTransfer;
    }
}
```

The following code sample shows how to introduce the following expander plugin:

`Pyz/Zed/{YourDesiredModule}/Communication/Plugin/Quote/CalculableObjectCustomerWithVertexCodeExpanderPlugin.php`


```php
<?php

namespace Spryker\Zed\{YourDesiredModule}\Communication\Plugin\Quote;

use Generated\Shared\Transfer\CalculableObjectTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\TaxAppExtension\Dependency\Plugin\CalculableObjectTaxAppExpanderPluginInterface;

class CalculableObjectCustomerWithVertexCodeExpanderPlugin extends AbstractPlugin implements CalculableObjectTaxAppExpanderPluginInterface
{
    /**
     * @param \Generated\Shared\Transfer\CalculableObjectTransfer $calculableObjectTransfer
     *
     * @return \Generated\Shared\Transfer\CalculableObjectTransfer
     */
    public function expand(CalculableObjectTransfer $calculableObjectTransfer): CalculableObjectTransfer
    {
        $calculableObjectTransfer->getTaxMetadata()->setCustomer(['customerCode' => ['classCode' => 'vertex-customer-code']]);

        return $calculableObjectTransfer;
    }
}
```

#### Configure Customer Exemption Certificate Expander plugins

For order:

`Pyz/Zed/{YourDesiredModule}/Communication/Plugin/Order/OrderCustomerWithVertexExemptionCertificateExpanderPlugin.php`

and for quote:

`Pyz/Zed/{YourDesiredModule}/Communication/Plugin/Quote/CalculableObjectCustomerWithVertexExemptionCertificateExpanderPlugin.php`

The following code sample shows how to implement the previously mentioned plugins:

```php
// ...
class OrderCustomerWithVertexExemptionCertificateExpanderPlugin extends AbstractPlugin implements CalculableObjectTaxAppExpanderPluginInterface
{
    /**
     * @param \Generated\Shared\Transfer\CalculableObjectTransfer $calculableObjectTransfer
     *
     * @return \Generated\Shared\Transfer\CalculableObjectTransfer
     */
    public function expand(CalculableObjectTransfer $calculableObjectTransfer): CalculableObjectTransfer
    {
        $calculableObjectTransfer->getTaxMetadata()->setCustomer(['exemptionCertificate' => ['exemptionCertificateNumber' => 'vertex-exemption-certificate-number']]);

        return $calculableObjectTransfer;
    }
}
```

#### Configure Product Class Code Expander plugins

For order items:

`Pyz/Zed/{YourDesiredModule}/Communication/Plugin/Order/OrderItemVertexProductClassCodeExpanderPlugin.php`

and for quote items:

`Pyz/Zed/{YourDesiredModule}/Communication/Plugin/Quote/CalculableObjectItemWithVertexProductClassCodeExpanderPlugin.php`

The contents of both plugins are similar:

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
            $itemTransfer->getTaxMetadata()->setProduct(['productClass' => 'vertex-product-class-code']);
        }

        return $calculableObjectTransfer;
    }
}
```

{% info_block infoBox "Use same Product Class Code" %}

The same Product Class Code extension must be used for all the product options and other order expenses because, in Vertex's perspective, all of them are separate items for tax calculation. To find them a proper place, you can refer to the transfers' definition, which is outlined in the [Configure Vertex Specific Metadata Transfers](#Configure Vertex Specific Metadata Transfers).

{% endinfo_block %}

#### Configure Flexible fields extension

The following code sample shows how to introduce the flexible fields extension:

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
                                'value' => 'vertex-flexible-code-value',
                            ],
                        ],
                    ],
                );
        }

        return $calculableObjectTransfer;
    }
}
```

### 3. Configure Tax App Dependency Provider

As a result, the plugin stack can look like this:

```php

namespace Pyz\Zed\TaxApp;

// The following plugins are for Marketplace only.
use Spryker\Zed\MerchantProfile\Communication\Plugin\TaxApp\MerchantProfileAddressCalculableObjectTaxAppExpanderPlugin;
use Spryker\Zed\MerchantProfile\Communication\Plugin\TaxApp\MerchantProfileAddressOrderTaxAppExpanderPlugin;
use Spryker\Zed\ProductOfferAvailability\Communication\Plugin\TaxApp\ProductOfferAvailabilityCalculableObjectTaxAppExpanderPlugin;
use Spryker\Zed\ProductOfferAvailability\Communication\Plugin\TaxApp\ProductOfferAvailabilityOrderTaxAppExpanderPlugin;

class TaxAppDependencyProvider extends SprykerTaxAppDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\TaxAppExtension\Dependency\Plugin\CalculableObjectTaxAppExpanderPluginInterface>
     */
    protected function getCalculableObjectExpanderPluginCollection(): array
    {
        return [
            new CalculableObjectCustomerWithTaxCodeExpanderPlugin(), // to extend quote with customer class code
            new CalculableObjectCustomerWithVertexExemptionCertificateExpanderPlugin(), // to extend quote with customer exemption certificate
            new CalculableObjectExpensesWithTaxCodeExpanderPlugin(), // to extend quote expenses with product class codes
            new CalculableObjectItemProductOptionWithTaxCodeExpanderPlugin(), // to extend quote item product options with product class codes
            new CalculableObjectItemWithProductClassCodeExpandePlugin(), // to extend quote items with product class codes
            new CalculableObjectItemWithFlexibleFieldsExpanderPlugin(), // to extend quote items with flexible fields
            
            // The following plugins are for Marketplace only.
            new MerchantProfileAddressCalculableObjectTaxAppExpanderPlugin(),
            new ProductOfferAvailabilityCalculableObjectTaxAppExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\TaxAppExtension\Dependency\Plugin\OrderTaxAppExpanderPluginInterface>
     */
    protected function getOrderExpanderPluginCollection(): array
    {
        return [
            new OrderCustomerWithTaxCodeExpanderPlugin(), // to extend order with customer class code
            new OrderCustomerWithVertexExemptionCertificateExpanderPlugin(), // to extend order with customer exemption certificate
            new OrderExpensesWithTaxCodeExpanderPlugin(), // to extend order expenses with product class codes
            new OrderItemProductOptionWithTaxCodeExpanderPlugin(), // to extend order item product options with product class codes
            new OrderItemWithProductClassCodeExpandePlugin(), // to extend order items with product class codes
            new OrderItemWithFlexibleFieldsExpanderPlugin(), // to extend order items with flexible fields
            
            // The following plugins are for Marketplace only.
            new MerchantProfileAddressOrderTaxAppExpanderPlugin(),
            new ProductOfferAvailabilityOrderTaxAppExpanderPlugin(),
        ];
    }
}

```

### 4. Configure Product Offer Stock Dependency Provider (Marketplace only)

As a result, the plugin stack can look like this:

```php

namespace Pyz\Zed\ProductOfferStock;

use Spryker\Zed\ProductOfferStock\ProductOfferStockDependencyProvider as SprykerProductOfferStockDependencyProvider;
use Spryker\Zed\StockAddress\Communication\Plugin\Stock\StockAddressStockTransferProductOfferStockExpanderPlugin;

class ProductOfferStockDependencyProvider extends SprykerProductOfferStockDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductOfferStockExtension\Dependency\Plugin\StockTransferProductOfferStockExpanderPluginInterface>
     */
    protected function getStockTransferExpanderPluginCollection(): array
    {
        return [
            new StockAddressStockTransferProductOfferStockExpanderPlugin(),
        ];
    }
}

```

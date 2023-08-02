---
title: Integrate Tax App
description: Integrate Tax App to automatically calculate taxes using Acp Apps.
last_updated: Aug 3, 2023
template: concept-topic-template
---

To enable the Tax app integration, use the [spryker/tax-app](https://github.com/spryker/tax-app) module.


## Prerequisites

Before you can integrate the Tax app, make sure that your project is ACP-enabled. See [App Composition Platform installation](/docs/acp/user/app-composition-platform-installation.html) for details.

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

## Integrate Tax App

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

Please pay attention that you have to implement that plugin stack on your side.
"YourModule" - means that you'll put them wherever you suggest in som module.

Usually Tax app requires Order/Cart and Order/Cart Items. You can check example implementation of these plugins for the Vertex Tax App.




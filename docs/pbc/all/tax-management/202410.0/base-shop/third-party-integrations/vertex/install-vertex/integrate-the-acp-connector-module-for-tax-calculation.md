---
title: Integrate the ACP connector module for tax calculation
description: Learn how you can configure and integrate Vertex via Spryker App Compositon Platform into your Spryker project.
draft: true
last_updated: Jan 10, 2024
template: howto-guide-template
related:
  - title: Vertex
    link: docs/pbc/all/tax-management/page.version/base-shop/third-party-integrations/vertex/vertex.html

---

To [install Vertex](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/install-vertex/install-vertex.html), you need to integrate the [spryker/tax-app](https://github.com/spryker/tax-app) ACP connector module first.

To integrate the connector module for the Vertex app, follow these steps.

### 1. Configure shared configs

Add the following config to `config/Shared/config_default.php`:

```php
use Generated\Shared\Transfer\ConfigureTaxAppTransfer;
use Generated\Shared\Transfer\DeleteTaxAppTransfer;
use Generated\Shared\Transfer\SubmitPaymentTaxInvoiceTransfer;
use Spryker\Shared\MessageBroker\MessageBrokerConstants;
use Spryker\Shared\TaxApp\TaxAppConstants;
use Spryker\Zed\OauthAuth0\OauthAuth0Config;
use Spryker\Zed\MessageBrokerAws\MessageBrokerAwsConfig;

//...
$config[TaxAppConstants::TENANT_IDENTIFIER] = getenv('SPRYKER_TENANT_IDENTIFIER') ?: '';

$config[MessageBrokerConstants::MESSAGE_TO_CHANNEL_MAP] = [
    //...
    ConfigureTaxAppTransfer::class => 'tax-commands',
    DeleteTaxAppTransfer::class => 'tax-commands',
    SubmitPaymentTaxInvoiceTransfer::class => 'payment-tax-invoice-commands',
];

$config[MessageBrokerConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP] = [
    //...
    'tax-commands' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
];

$config[MessageBrokerConstants::CHANNEL_TO_SENDER_TRANSPORT_MAP] = [
    //...
    'payment-tax-invoice-commands' => MessageBrokerAwsConfig::HTTP_CHANNEL_TRANSPORT,
];

// ----------------------------------------------------------------------------
// ------------------------------ OAUTH ---------------------------------------
// ----------------------------------------------------------------------------
//...
$config[TaxAppConstants::OAUTH_PROVIDER_NAME] = OauthAuth0Config::PROVIDER_NAME;
$config[TaxAppConstants::OAUTH_GRANT_TYPE] = OauthAuth0Config::GRANT_TYPE_CLIENT_CREDENTIALS;
$config[TaxAppConstants::OAUTH_OPTION_AUDIENCE] = 'aop-app';
```

### 2. Configure the Calculation plugin stack

Update `src/Pyz/Zed/Calculation/CalculationDependencyProvider.php` as follows:

```php
//...

use Spryker\Zed\Calculation\Communication\Plugin\Calculator\ItemDiscountAmountFullAggregatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\PriceToPayAggregatorPlugin;
use Spryker\Zed\TaxApp\Communication\Plugin\Calculation\TaxAppCalculationPlugin;

//...

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CalculationExtension\Dependency\Plugin\CalculationPluginInterface>
     */
    protected function getQuoteCalculatorPluginStack(Container $container): array
    {
        /** @var array<\Spryker\Zed\Calculation\Dependency\Plugin\CalculationPluginInterface> $pluginStack */
        $pluginStack = [
            //...

            # Suggested plugins order is shown.

            new ItemDiscountAmountFullAggregatorPlugin(),

            # This plugin is replacing other tax calculation plugins in the stack and will use them as a fallback.
            # No other tax calculation plugins except for TaxTotalCalculatorPlugin should be present in the stack.
            new TaxAppCalculationPlugin(),

            new PriceToPayAggregatorPlugin(),

            //...
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
            //...

            # Suggested plugins order is shown.

            new ItemDiscountAmountFullAggregatorPlugin(),

            # This plugin is replacing other tax calculation plugins in the stack and will use them as a fallback.
            # No other tax calculation plugins except for TaxTotalCalculatorPlugin should be present in the stack.
            new TaxAppCalculationPlugin(),

            new PriceToPayAggregatorPlugin(),

            //...
        ];
    }

//...
```

{% info_block infoBox "Updating from TaxApp module version <=0.2.3" %}

Pay attention to the position of `TaxAppCalculationPlugin` in the list of plugins: it should be placed after `ItemDiscountAmountFullAggregatorPlugin` and before `PriceToPayAggregatorPlugin`.

Previously, we recommended to disable the default tax calculation plugins. This is not required anymore, as with the new implementation, the default tax plugins are called only if Vertex is disconnected or disabled.

{% endinfo_block %}

Create or update `src/Pyz/Zed/TaxApp/TaxAppDependencyProvider.php` as follows:

```php
//...

use Spryker\Zed\Calculation\Communication\Plugin\Calculator\ItemTaxAmountFullAggregatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\PriceToPayAggregatorPlugin;
use Spryker\Zed\Tax\Communication\Plugin\Calculator\TaxAmountAfterCancellationCalculatorPlugin;
use Spryker\Zed\Tax\Communication\Plugin\Calculator\TaxAmountCalculatorPlugin;
use Spryker\Zed\Tax\Communication\Plugin\Calculator\TaxRateAverageAggregatorPlugin;

//...

    /**
     * {@inheritDoc}
     *
     * @return array<\Spryker\Zed\CalculationExtension\Dependency\Plugin\CalculationPluginInterface>
     */
    protected function getFallbackQuoteCalculationPlugins(): array
    {
        return [
            # These plugins will be called if TaxApp configuration is missing or TaxApp is disabled.
            # Please note that this list includes PriceToPayAggregatorPlugin - this plugin isn't a part of tax calculation logic but it's required by TaxRateAverageAggregatorPlugin.
            new TaxAmountCalculatorPlugin(),
            new ItemTaxAmountFullAggregatorPlugin(),
            new PriceToPayAggregatorPlugin(),
            new TaxRateAverageAggregatorPlugin(),
        ];
    }

    /**
     * {@inheritDoc}
     *
     * @return array<\Spryker\Zed\CalculationExtension\Dependency\Plugin\CalculationPluginInterface>
     */
    protected function getFallbackOrderCalculationPlugins(): array
    {
        return [
            # These plugins will be called if TaxApp configuration is missing or TaxApp is disabled.
            # Please note that this list includes PriceToPayAggregatorPlugin - this plugin isn't a part of tax calculation logic but it's required by TaxAmountAfterCancellationCalculatorPlugin.
            new TaxAmountCalculatorPlugin(),
            new ItemTaxAmountFullAggregatorPlugin(),
            new PriceToPayAggregatorPlugin(),
            new TaxAmountAfterCancellationCalculatorPlugin(),
        ];
    }
    
//...
```

In general, `getFallbackQuoteCalculationPlugins()` and `getFallbackOrderCalculationPlugins()` methods should contain the tax calculation plugins, which are replaced by `TaxAppCalculationPlugin` in `\Pyz\Zed\Calculation\CalculationDependencyProvider`.
The code snipped above is an example fo such configuration based on the Spryker default tax calculation plugins.
Tax calculation plugins moved:
- from `getQuoteCalculatorPluginStack` method: `TaxAmountCalculatorPlugin`, `ItemTaxAmountFullAggregatorPlugin`, `PriceToPayAggregatorPlugin`, `TaxRateAverageAggregatorPlugin`
- from `getOrderCalculatorPluginStack` method: `TaxAmountCalculatorPlugin`, `ItemTaxAmountFullAggregatorPlugin`, `PriceToPayAggregatorPlugin`, `TaxAmountAfterCancellationCalculatorPlugin`

{% info_block infoBox "Fallback behavior" %}

There are three different failure scenarios where `TaxAppCalculationPlugin` might need to use a fallback logic:

1. Vertex App isn't connected: fallback plugins defined in `getFallbackQuoteCalculationPlugins()` and `getFallbackOrderCalculationPlugins()` will be used to calculate taxes.
2. Vertex App is disabled: fallback plugins defined in `getFallbackQuoteCalculationPlugins()` and `getFallbackOrderCalculationPlugins()` will be used to calculate taxes.
3. Vertex App is not responding or is responding with an error: tax value will be set to zero, and the customer will be able to proceed with the checkout.

{% endinfo_block %}

### 3. Configure the Shop Application dependency provider

Add the following code to `src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php`:

```php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use SprykerShop\Yves\CartPage\Widget\CartSummaryHideTaxAmountWidget;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @phpstan-return array<class-string<\Spryker\Yves\Kernel\Widget\AbstractWidget>>
     *
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            //...

            # This widget is replacing Spryker default tax display in cart summary page with text stating that tax amount will be calculated during checkout process.
            CartSummaryHideTaxAmountWidget::class,
        ];
    }
}

```

If you have custom Yves templates or make your own Frontend, add `CartSummaryHideTaxAmountWidget` to your template. The core template is located at `SprykerShop/Yves/CartPage/Theme/default/components/molecules/cart-summary/cart-summary.twig`.

Here is an example with `CartSummaryHideTaxAmountWidget`:

```html
{% raw %}
<li class="list__item spacing-y">
    {{ 'cart.total.tax_total' | trans }}
    {% widget 'CartSummaryHideTaxAmountWidget' args [data.cart] only %}
    {% nowidget %}
        <span class="float-right">{{ data.cart.totals.taxTotal.amount | money(true, data.cart.currency.code) }}</span>
    {% endwidget %}
</li>
{% endraw %}
```


### 4. Configure the Message Broker dependency provider

Add the following code to `src/Pyz/Zed/MessageBroker/MessageBrokerDependencyProvider.php`:

```php

namespace Pyz\Zed\MessageBroker;

use Spryker\Zed\MessageBroker\MessageBrokerDependencyProvider as SprykerMessageBrokerDependencyProvider;
use Spryker\Zed\TaxApp\Communication\Plugin\MessageBroker\TaxAppMessageHandlerPlugin;

class MessageBrokerDependencyProvider extends SprykerMessageBrokerDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MessageBrokerExtension\Dependency\Plugin\MessageHandlerPluginInterface>
     */
    public function getMessageHandlerPlugins(): array
    {
        return [
            //...

            # This plugin is handling messages sent from Vertex app to SCCOS.
            new TaxAppMessageHandlerPlugin(),
        ];
    }
}

```

### 5. Configure channels in `MessageBroker` configuration

Add the following code to `src/Pyz/Zed/MessageBroker/MessageBrokerConfig.php`:

```php
namespace Pyz\Zed\MessageBroker;

use Spryker\Zed\MessageBroker\MessageBrokerConfig as SprykerMessageBrokerConfig;

class MessageBrokerConfig extends SprykerMessageBrokerConfig
{
    /**
     * @return array<string>
     */
    public function getDefaultWorkerChannels(): array
    {
        return [
            //...
            'tax-commands',
        ];
    }

    //...
}
```

### 6. Optional: Sending tax invoices to Vertex and handling refunds

Configure payment `config/Zed/oms/{your_payment_oms}.xml`as in the following example:

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

#### Configure the Oms dependency provider
Add the config to `src/Pyz/Zed/Oms/OmsDependencyProvider.php`:

```php
//...

use Spryker\Zed\TaxApp\Communication\Plugin\Oms\Command\SubmitPaymentTaxInvoicePlugin;
use Spryker\Zed\TaxApp\Communication\Plugin\Oms\OrderRefundedEventListenerPlugin;

//...

    # This configuration is necessary for Invoice functionality
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendCommandPlugins(Container $container): Container
    {
         $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {

             //...

             $commandCollection->add(new SubmitPaymentTaxInvoicePlugin(), 'TaxApp/SubmitPaymentTaxInvoice');

             //...

             return $commandCollection;
        });

        return $container;
    }
    
//...
    
    # This configuration is necessary for Refund functionality
    /**
     * @return array<\Spryker\Zed\OmsExtension\Dependency\Plugin\OmsEventTriggeredListenerPlugin>
     */
    protected function getOmsEventTriggeredListenerPlugins(): array
    {
        return [
            new OrderRefundedEventListenerPlugin(),
        ];
    }
    
//...
```

This configuration of `getOmsEventTriggeredListenerPlugins` method is required to ensure that the correct tax amount will be used during the refund process.

{% info_block infoBox "OMS configuration requirement" %}

The refund functionality will only work if the OMS event is called `refund`.

{% endinfo_block %}


## Next step
[Integrate the Vertex app](/docs/pbc/all/tax-management/{{page.version}}/base-shop/third-party-integrations/vertex/install-vertex/integrate-the-vertex-app.html)
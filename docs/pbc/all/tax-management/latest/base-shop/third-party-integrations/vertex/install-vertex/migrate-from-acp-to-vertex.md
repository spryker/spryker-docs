---
title: Migrate from the ACP Vertex app
description: Learn how to migrate from the ACP-based Vertex tax app to the direct spryker-eco/vertex module.
last_updated: Mar 25, 2026
template: howto-guide-template
related:
  - title: Integrate Vertex
    link: docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/vertex/install-vertex/integrate-vertex.html
  - title: Vertex
    link: docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/vertex/vertex.html
---

This document describes how to migrate from the MessageBroker-based [ACP Vertex](https://docs-archive.spryker.com/docs/pbc/all/tax-management/202507.0/base-shop/third-party-integrations/vertex/vertex) integration to the direct `spryker-eco/vertex` module.

{% info_block infoBox "Info" %}

The tax calculation logic remains the same. The ECO module communicates directly with the Vertex API from your application instead of going through the MessageBroker.

{% endinfo_block %}

## 1. Install and integrate the module

Follow the [Integrate Vertex](/docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/vertex/install-vertex/integrate-vertex.html) guide to install and set up the module.

## 2. Remove old ACP plugins and configuration

### 2a. Remove the TaxApp MessageBroker handler

In `src/Pyz/Zed/MessageBroker/MessageBrokerDependencyProvider.php`, remove the following import and plugin registration:

```php
// Remove this use statement:
use Spryker\Zed\TaxApp\Communication\Plugin\MessageBroker\TaxAppMessageHandlerPlugin;

// Remove from getMessageHandlerPlugins():
new TaxAppMessageHandlerPlugin(),
```

{% info_block infoBox "Info" %}

If TaxApp was the only ACP app using the MessageBroker, you can also disable the `message-broker-consume-channels` cronjob in `config/Zed/cronjobs/jenkins.php` and set `MessageBrokerConstants::IS_ENABLED` to `false` in `config/Shared/config_default.php` to stop unnecessary background processing.

{% endinfo_block %}

### 2b. Remove the TaxApp publisher plugin for DMS projects

In `src/Pyz/Zed/Publisher/PublisherDependencyProvider.php`, remove the following import and plugin registration:

```php
// Remove this use statement:
use Spryker\Zed\TaxApp\Communication\Plugin\Publisher\Store\RefreshTaxAppStoreRelationPublisherPlugin;

// In getTaxAppPlugins(), return an empty array:
protected function getTaxAppPlugins(): array
{
    return [];
}
```

### 2c. Replace the TaxApp calculation plugin

In `src/Pyz/Zed/Calculation/CalculationDependencyProvider.php`, replace `TaxAppCalculationPlugin` with `VertexCalculationPlugin` in both quote and order calculator stacks:

```php
// Remove:
use Spryker\Zed\TaxApp\Communication\Plugin\Calculation\TaxAppCalculationPlugin;

// Add:
use SprykerEco\Zed\Vertex\Communication\Plugin\Calculation\VertexCalculationPlugin;
```

In `getQuoteCalculatorPluginStack()` and `getOrderCalculatorPluginStack()`, replace:

```php
// Before:
new TaxAppCalculationPlugin(),

// After:
new VertexCalculationPlugin(),
```

### 2d. Replace the TaxApp OMS plugins

In `src/Pyz/Zed/Oms/OmsDependencyProvider.php`, replace the plugins:

```php
// Remove:
use Spryker\Zed\TaxApp\Communication\Plugin\Oms\Command\SubmitPaymentTaxInvoicePlugin;
use Spryker\Zed\TaxApp\Communication\Plugin\Oms\OrderRefundedEventListenerPlugin;

// Add:
use SprykerEco\Zed\Vertex\Communication\Plugin\Oms\Command\VertexSubmitPaymentTaxInvoicePlugin;
use SprykerEco\Zed\Vertex\Communication\Plugin\Oms\VertexOrderRefundedEventListenerPlugin;
```

In `extendCommandPlugins()`, replace:

```php
// Before:
$commandCollection->add(new SubmitPaymentTaxInvoicePlugin(), 'TaxApp/SubmitPaymentTaxInvoice');

// After:
$commandCollection->add(new VertexSubmitPaymentTaxInvoicePlugin(), 'Vertex/SubmitPaymentTaxInvoice');
```

In `getOmsEventTriggeredListenerPlugins()`, replace:

```php
// Before:
new OrderRefundedEventListenerPlugin(),

// After:
new VertexOrderRefundedEventListenerPlugin(),
```

### 2e. Replace the TaxApp Glue Storefront API plugin

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, replace the plugin:

```php
// Remove:
use Spryker\Glue\TaxAppRestApi\Plugin\TaxValidateIdResourceRoutePlugin;

// Add:
use SprykerEco\Glue\Vertex\Plugin\VertexTaxValidateIdResourceRoutePlugin;
```

In `getResourceRoutePlugins()`, replace:

```php
// Before:
new TaxValidateIdResourceRoutePlugin(),

// After:
new VertexTaxValidateIdResourceRoutePlugin(),
```

### 2f. Update OMS state machine XML

Update your OMS process XML files—for example, `config/Zed/oms/DummyPayment01.xml`—to reference the new command name:

```xml
<!-- Before: -->
<event name="submit tax invoice" onEnter="true" command="TaxApp/SubmitPaymentTaxInvoice"/>

<!-- After: -->
<event name="submit tax invoice" onEnter="true" command="Vertex/SubmitPaymentTaxInvoice"/>
```

### 2g. Clean up config_default.php

Remove TaxApp-specific configuration and MessageBroker channel mappings from `config/Shared/config_default.php`:

```php
// Remove these transfer use statements:
use Generated\Shared\Transfer\ConfigureTaxAppTransfer;
use Generated\Shared\Transfer\DeleteTaxAppTransfer;
use Generated\Shared\Transfer\SubmitPaymentTaxInvoiceTransfer;

// Remove this use statement:
use Spryker\Shared\TaxApp\TaxAppConstants;

// Remove TaxAppConstants from OAuth and tenant assignments:
// $config[TaxAppConstants::OAUTH_PROVIDER_NAME] = ...
// $config[TaxAppConstants::OAUTH_GRANT_TYPE] = ...
// $config[TaxAppConstants::OAUTH_OPTION_AUDIENCE] = ...
// $config[TaxAppConstants::TENANT_IDENTIFIER] = ...

// Remove TaxApp MessageBroker channel mappings from $config[MessageBrokerConstants::CHANNEL_TO_RECEIVER_TRANSPORT_MAP]:
// ConfigureTaxAppTransfer::class => 'tax-commands',
// DeleteTaxAppTransfer::class => 'tax-commands',
// SubmitPaymentTaxInvoiceTransfer::class => 'payment-tax-invoice-commands',
```

## 3. Add new Vertex configuration

### 3a. Add Vertex credentials

In `config/Shared/config_default.php`, add the following:

```php
use SprykerEco\Shared\Vertex\VertexConstants;

$config[VertexConstants::IS_ACTIVE] = getenv('VERTEX_IS_ACTIVE') ?: null;
$config[VertexConstants::CLIENT_ID] = getenv('VERTEX_CLIENT_ID') ?: null;
$config[VertexConstants::CLIENT_SECRET] = getenv('VERTEX_CLIENT_SECRET') ?: null;
$config[VertexConstants::SECURITY_URI] = getenv('VERTEX_SECURITY_URI') ?: null;
$config[VertexConstants::TRANSACTION_CALLS_URI] = getenv('VERTEX_TRANSACTION_CALLS_URI') ?: null;

// Optional: Tax ID Validator (Vertex Validator / Taxamo)
$config[VertexConstants::TAXAMO_API_URL] = getenv('TAXAMO_API_URL') ?: null;
$config[VertexConstants::TAXAMO_TOKEN] = getenv('TAXAMO_TOKEN') ?: null;
```

### 3b. Override feature flags

Create `src/Pyz/Zed/Vertex/VertexConfig.php`:

```php
<?php

namespace Pyz\Zed\Vertex;

use SprykerEco\Zed\Vertex\VertexConfig as SprykerEcoVertexConfig;

class VertexConfig extends SprykerEcoVertexConfig
{
    public function isTaxIdValidatorEnabled(): bool
    {
        return true;
    }

    public function isTaxAssistEnabled(): bool
    {
        return true;
    }

    public function isInvoicingEnabled(): bool
    {
        return true;
    }
}
```

### 3c. Register expander and fallback plugins

Create `src/Pyz/Zed/Vertex/VertexDependencyProvider.php`:

```php
<?php

namespace Pyz\Zed\Vertex;

use Spryker\Zed\Calculation\Communication\Plugin\Calculator\ItemTaxAmountFullAggregatorPlugin;
use Spryker\Zed\Calculation\Communication\Plugin\Calculator\PriceToPayAggregatorPlugin;
use Spryker\Zed\MerchantProfile\Communication\Plugin\TaxApp\MerchantProfileAddressCalculableObjectTaxAppExpanderPlugin;
use Spryker\Zed\MerchantProfile\Communication\Plugin\TaxApp\MerchantProfileAddressOrderTaxAppExpanderPlugin;
use Spryker\Zed\ProductOfferAvailability\Communication\Plugin\TaxApp\ProductOfferAvailabilityCalculableObjectTaxAppExpanderPlugin;
use Spryker\Zed\ProductOfferAvailability\Communication\Plugin\TaxApp\ProductOfferAvailabilityOrderTaxAppExpanderPlugin;
use Spryker\Zed\Tax\Communication\Plugin\Calculator\TaxAmountAfterCancellationCalculatorPlugin;
use Spryker\Zed\Tax\Communication\Plugin\Calculator\TaxAmountCalculatorPlugin;
use Spryker\Zed\Tax\Communication\Plugin\Calculator\TaxRateAverageAggregatorPlugin;
use SprykerEco\Zed\Vertex\Communication\Plugin\Order\OrderCustomerWithVertexCodeExpanderPlugin;
use SprykerEco\Zed\Vertex\Communication\Plugin\Order\OrderExpensesWithVertexCodeExpanderPlugin;
use SprykerEco\Zed\Vertex\Communication\Plugin\Order\OrderItemProductOptionWithVertexCodeExpanderPlugin;
use SprykerEco\Zed\Vertex\Communication\Plugin\Order\OrderItemWithVertexSpecificFieldsExpanderPlugin;
use SprykerEco\Zed\Vertex\Communication\Plugin\Quote\CalculableObjectCustomerWithVertexCodeExpanderPlugin;
use SprykerEco\Zed\Vertex\Communication\Plugin\Quote\CalculableObjectExpensesWithVertexCodeExpanderPlugin;
use SprykerEco\Zed\Vertex\Communication\Plugin\Quote\CalculableObjectItemProductOptionWithVertexCodeExpanderPlugin;
use SprykerEco\Zed\Vertex\Communication\Plugin\Quote\CalculableObjectItemWithVertexSpecificFieldsExpanderPlugin;
use SprykerEco\Zed\Vertex\VertexDependencyProvider as SprykerVertexDependencyProvider;

class VertexDependencyProvider extends SprykerVertexDependencyProvider
{
    /**
     * @return array<\SprykerEco\Zed\Vertex\Dependency\Plugin\CalculableObjectVertexExpanderPluginInterface|\Spryker\Zed\TaxAppExtension\Dependency\Plugin\CalculableObjectTaxAppExpanderPluginInterface>
     */
    protected function getCalculableObjectVertexExpanderPlugins(): array
    {
        return [
            new CalculableObjectCustomerWithVertexCodeExpanderPlugin(),
            new CalculableObjectExpensesWithVertexCodeExpanderPlugin(),
            new CalculableObjectItemProductOptionWithVertexCodeExpanderPlugin(),
            new CalculableObjectItemWithVertexSpecificFieldsExpanderPlugin(),
            new MerchantProfileAddressCalculableObjectTaxAppExpanderPlugin(),
            new ProductOfferAvailabilityCalculableObjectTaxAppExpanderPlugin(),
        ];
    }

    /**
     * @return array<\SprykerEco\Zed\Vertex\Dependency\Plugin\OrderVertexExpanderPluginInterface|\Spryker\Zed\TaxAppExtension\Dependency\Plugin\OrderTaxAppExpanderPluginInterface>
     */
    protected function getOrderVertexExpanderPlugins(): array
    {
        return [
            new OrderCustomerWithVertexCodeExpanderPlugin(),
            new OrderExpensesWithVertexCodeExpanderPlugin(),
            new OrderItemProductOptionWithVertexCodeExpanderPlugin(),
            new OrderItemWithVertexSpecificFieldsExpanderPlugin(),
            new MerchantProfileAddressOrderTaxAppExpanderPlugin(),
            new ProductOfferAvailabilityOrderTaxAppExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\CalculationExtension\Dependency\Plugin\CalculationPluginInterface>
     */
    protected function getFallbackQuoteCalculationPlugins(): array
    {
        return [
            new TaxAmountCalculatorPlugin(),
            new ItemTaxAmountFullAggregatorPlugin(),
            new PriceToPayAggregatorPlugin(),
            new TaxRateAverageAggregatorPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\CalculationExtension\Dependency\Plugin\CalculationPluginInterface>
     */
    protected function getFallbackOrderCalculationPlugins(): array
    {
        return [
            new TaxAmountCalculatorPlugin(),
            new ItemTaxAmountFullAggregatorPlugin(),
            new PriceToPayAggregatorPlugin(),
            new TaxAmountAfterCancellationCalculatorPlugin(),
        ];
    }
}
```

## 4. Set up the database and transfers

```bash
vendor/bin/console propel:install
vendor/bin/console transfer:generate
```

## 5. Import glossary data

The module provides translation data for tax validation messages.

**Option 1: Import using the module's configuration file**

```bash
vendor/bin/console data:import --config=vendor/spryker-eco/vertex/data/import/vertex.yml
```

**Option 2: Copy file content and import individually**

Copy content from `vendor/spryker-eco/vertex/data/import/*.csv` to the corresponding files in `data/import/common/common/`. Then run:

```bash
vendor/bin/console data:import glossary
```

**Option 3: Add to the project's main import configuration**

Add the import actions to your project's main data import configuration file and include them in your regular import pipeline.

## 6. Verify the migration

1. Clear caches: `vendor/bin/console cache:empty-all`.
2. Place a test order and verify that tax calculation works.
3. If invoicing is enabled, verify that the `Vertex/SubmitPaymentTaxInvoice` OMS command triggers correctly.
4. If tax ID validation is enabled, test the `POST /tax-id-validate` Glue Storefront API endpoint.

For detailed verification steps, see [Verify Vertex connection](/docs/pbc/all/tax-management/latest/base-shop/third-party-integrations/vertex/verify-vertex-connection.html).

## Summary of changes

| Component | ACP (before) | ECO (after) |
|-----------|-------------|-------------|
| Tax calculation plugin | `TaxAppCalculationPlugin` | `VertexCalculationPlugin` |
| OMS invoice command | `SubmitPaymentTaxInvoicePlugin` (`TaxApp/...`) | `VertexSubmitPaymentTaxInvoicePlugin` (`Vertex/...`) |
| OMS refund listener | `OrderRefundedEventListenerPlugin` | `VertexOrderRefundedEventListenerPlugin` |
| Glue tax validation | `TaxValidateIdResourceRoutePlugin` | `VertexTaxValidateIdResourceRoutePlugin` |
| MessageBroker handler | `TaxAppMessageHandlerPlugin` | Removed (not needed) |
| Publisher plugin | `RefreshTaxAppStoreRelationPublisherPlugin` | Removed (not needed) |
| Configuration | `TaxAppConstants` + OAuth | `VertexConstants` + direct API credentials |
| Communication | Via MessageBroker (async) | Direct Vertex API calls (sync) |

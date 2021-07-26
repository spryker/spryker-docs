---
title: Marketplace Dummy Payment
last_updated: July 23, 2021
description: This document describes the process how to integrate the Marketplace Dummy Payment feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Dummy Payment feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Dummy Payment feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| - | - | - |
| Spryker Core | 202001.0   | [Spryker Core feature integration](https://documentation.spryker.com/docs/spryker-core-feature-integration) |
| Marketplace Merchant | dev-master | [Marketplace Merchant feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-merchant-feature-integration.html)


### 1) Install required modules using Сomposer

Install the required modules:

```bash
composer require spryker/dummy-marketplace-payment ^0.2.2 --update-with-dependencies 
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| PaymentExtension | vendor/spryker/payment-extension |
| StepEngine | vendor/spryker/step-engine |

{% endinfo_block %}

### 2) Set up transfer objects

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following transfer objects are generated:

| TRANSFER | TYPE | EVENT  | PATH  |
| --------- | ------- | ----- | ------------- |
| DummyMarketplacePayment | class | created | src/Generated/Shared/Transfer/DummyMarketplacePayment |
| Payment.dummyMarketplacePaymentInvoice | attribute | created | src/Generated/Shared/Transfer/Payment |
| Order.dummyMarketplacePaymentInvoice | attribute | created | src/Generated/Shared/Transfer/Order |
| Quote.payment | attribute | created | src/Generated/Shared/Transfer/Quote |

{% endinfo_block %}

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
| --------- | ------- | ----- | ------------- |
| MerchantProductItemPaymentMethodFilterPlugin | Filters PaymentMethodTransfer with DummyMarketplacePaymentProvider from the PaymentMethodsTransfer if QuoteTransfer has not only merchant items. |  | Spryker\Zed\DummyMarketplacePayment\Communication\Plugin\Payment\MerchantProductItemPaymentMethodFilterPlugin |
| DummyMarketplacePaymentHandlerPlugin | Adds step that expands QuoteTransfer with DummyMarketplacePayment provider name and method name to StepHandlerPluginCollection. |  | Spryker\Yves\DummyMarketplacePayment\Plugin\StepEngine\DummyMarketplacePaymentHandlerPlugin |
| DummyMarketplacePaymentInvoiceSubFormPlugin | Adds InvoiceSubForm and its data provider to SubFormPluginCollection. |  | Spryker\Yves\DummyMarketplacePayment\Plugin\StepEngine\SubForm\DummyMarketplacePaymentInvoiceSubFormPlugin |

**Spryker\Zed\DummyMarketplacePayment\Communication\Plugin\Payment\MerchantProductItemPaymentMethodFilterPlugin**

```php
<?php

namespace Pyz\Zed\Payment;

use Spryker\Zed\DummyMarketplacePayment\Communication\Plugin\Payment\MerchantProductItemPaymentMethodFilterPlugin;
use Spryker\Zed\Payment\PaymentDependencyProvider as SprykerPaymentDependencyProvider;


class PaymentDependencyProvider extends SprykerPaymentDependencyProvider
{
    /**
     * @return \Spryker\Zed\PaymentExtension\Dependency\Plugin\PaymentMethodFilterPluginInterface[]
     */
    protected function getPaymentMethodFilterPlugins(): array
    {
        return [
            new MerchantProductItemPaymentMethodFilterPlugin(),
        ];
    }
}
```

**Spryker\Yves\DummyMarketplacePayment\Plugin\StepEngine\DummyMarketplacePaymentHandlerPlugin**

```php
<?php

namespace Pyz\Yves\CheckoutPage;

use Spryker\Shared\DummyMarketplacePayment\DummyMarketplacePaymentConfig;
use Spryker\Yves\DummyMarketplacePayment\Plugin\StepEngine\DummyMarketplacePaymentHandlerPlugin;
use Spryker\Yves\Kernel\Container;
use Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginCollection;
use SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerShopCheckoutPageDependencyProvider;

class CheckoutPageDependencyProvider extends SprykerShopCheckoutPageDependencyProvider
{
    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function extendPaymentMethodHandler(Container $container): Container
    {
        $container->extend(static::PAYMENT_METHOD_HANDLER, function (StepHandlerPluginCollection $paymentMethodHandler) {
            $paymentMethodHandler->add(
                new DummyMarketplacePaymentHandlerPlugin(),
                DummyMarketplacePaymentConfig::PAYMENT_METHOD_DUMMY_MARKETPLACE_PAYMENT_INVOICE
            );
            
            return $paymentMethodHandler;
        });

        return $container;
    }
}
```

**Spryker\Yves\DummyMarketplacePayment\Plugin\StepEngine\SubForm\DummyMarketplacePaymentInvoiceSubFormPlugin**

```php
<?php

namespace Pyz\Yves\CheckoutPage;

use Spryker\Yves\DummyMarketplacePayment\Plugin\StepEngine\SubForm\DummyMarketplacePaymentInvoiceSubFormPlugin;
use Spryker\Yves\Kernel\Container;
use Spryker\Yves\StepEngine\Dependency\Plugin\Form\SubFormPluginCollection;
use SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerShopCheckoutPageDependencyProvider;

class CheckoutPageDependencyProvider extends SprykerShopCheckoutPageDependencyProvider
{
    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function extendSubFormPluginCollection(Container $container): Container
    {
        $container->extend(static::PAYMENT_SUB_FORMS, function (SubFormPluginCollection $paymentSubFormPluginCollection) {
            $paymentSubFormPluginCollection->add(new DummyMarketplacePaymentInvoiceSubFormPlugin());

            return $paymentSubFormPluginCollection;
        });

        return $container;
    }
}
```
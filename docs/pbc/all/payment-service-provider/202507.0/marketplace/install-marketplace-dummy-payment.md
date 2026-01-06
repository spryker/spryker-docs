---
title: Install Marketplace Dummy Payment
last_updated: Oct 05, 2021
description: This document describes the process how to integrate the Marketplace Dummy Payment into a Spryker project.
template: feature-integration-guide-template
redirect_from:
    - /docs/marketplace/dev/feature-integration-guides/202311.0/marketplace-dummy-payment-feature-integration.html
---

This document describes how to integrate the Marketplace Dummy Payment into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Dummy Payment feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| - | - | - |
| Spryker Core | {{page.version}}   | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Payments | {{page.version}}   | [Install the Payments feature](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/install-and-upgrade/install-the-payments-feature.html) |
| Checkout | {{page.version}} | [Install the Checkout feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-checkout-feature.html) |
| Marketplace Merchant | {{page.version}} | [Install the Marketplace Merchant feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html) |
| Marketplace Order Management | {{page.version}} | [Install the Marketplace Order Management feature](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/install-features/install-the-marketplace-order-management-feature.html) |


### 1) Install required modules using Сomposer

Install the required modules using Composer:

```bash
composer require spryker/dummy-marketplace-payment:^0.2.2 --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| DummyMarketplacePayment | vendor/spryker/dummy-marketplace-payment |

{% endinfo_block %}

### 2) Set up configuration

Add the following configuration:

| CONFIGURATION | SPECIFICATION | NAMESPACE |
| ------------- | ------------ | ------------ |
| config_default-docker.php | Default docker specific configuration of entire application | config/Shared/config_default-docker.php |
| config_default.php | Default configuration of entire application | config/Shared/config_default.php |

**config/Shared/config_default-docker.php**

```php
use Spryker\Shared\DummyMarketplacePayment\DummyMarketplacePaymentConfig;


$config[OmsConstants::ACTIVE_PROCESSES] = [
    'MarketplacePayment01',
];
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    DummyMarketplacePaymentConfig::PAYMENT_METHOD_DUMMY_MARKETPLACE_PAYMENT_INVOICE => 'MarketplacePayment01',
];
```

**config/Shared/config_default.php**

```php
use Spryker\Shared\DummyMarketplacePayment\DummyMarketplacePaymentConfig;

$config[OmsConstants::ACTIVE_PROCESSES] = [
    'MarketplacePayment01',
];
$config[SalesConstants::PAYMENT_METHOD_STATEMACHINE_MAPPING] = [
    DummyMarketplacePaymentConfig::PAYMENT_METHOD_DUMMY_MARKETPLACE_PAYMENT_INVOICE => 'MarketplacePayment01',
];
```

### 3) Set up transfer objects

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following transfer objects are generated:

| TRANSFER | TYPE | EVENT  | PATH  |
| --------- | ------- | ----- | ------------- |
| DummyMarketplacePayment | class | created | src/Generated/Shared/Transfer/DummyMarketplacePayment |
| Payment.dummyMarketplacePaymentInvoice | property | created | src/Generated/Shared/Transfer/Payment |
| Order.dummyMarketplacePaymentInvoice | property | created | src/Generated/Shared/Transfer/Order |

{% endinfo_block %}

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
| --------- | ------- | ----- | ------------- |
| MerchantProductItemPaymentMethodFilterPlugin | If not all order items contain of product reference, then filters dummy marketplace payment methods out. |  | Spryker\Zed\DummyMarketplacePayment\Communication\Plugin\Payment\MerchantProductItemPaymentMethodFilterPlugin |

**src/Pyz/Zed/Payment/PaymentDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Payment;

use Spryker\Zed\DummyMarketplacePayment\Communication\Plugin\Payment\MerchantProductItemPaymentMethodFilterPlugin;
use Spryker\Zed\Payment\PaymentDependencyProvider as SprykerPaymentDependencyProvider;


class PaymentDependencyProvider extends SprykerPaymentDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\PaymentExtension\Dependency\Plugin\PaymentMethodFilterPluginInterface>
     */
    protected function getPaymentMethodFilterPlugins(): array
    {
        return [
            new MerchantProductItemPaymentMethodFilterPlugin(),
        ];
    }
}
```

### 5) Import data

1. Extend and import payment method data:

**data/import/payment_method.csv**

```csv
payment_method_key,payment_method_name,payment_provider_key,payment_provider_name,is_active
dummyMarketplacePaymentInvoice,Invoice,DummyMarketplacePayment,Dummy Marketplace Payment,1
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
|-|-|-|-|-|
| payment_method_key | &check; | string | dummyMarketplacePaymentInvoice | Payment method key. |
| payment_method_name | &check; | string | Invoice | Payment method name. |
| payment_provider_key | &check; | string | DummyMarketplacePayment | Payment provider key. |
| payment_provider_name | &check; | string | Dummy Marketplace Payment | Payment provider name. |
| is_active |  | boolean | 1 | Is payment method active. |

2. Extend and import payment store data:

**data/import/payment_method_store.csv**

```csv
payment_method_key,store
dummyMarketplacePaymentInvoice,DE
dummyMarketplacePaymentInvoice,AT
dummyMarketplacePaymentInvoice,US
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
|-|-|-|-|-|
| payment_method_key | &check; | string | dummyMarketplacePaymentInvoice | Payment method key. |
| store | &check; | string | DE | Store identifier. |

3. Import data:

```bash
console data:import payment-method
console data:import payment-method-store
```

{% info_block warningBox "Verification" %}

Make sure that the new payment method is added to the `spy_payment_method` and `spy_payment_method_store` tables in the database.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Dummy Payment feature frontend.

### 1) Add translations

Append glossary according to your configuration:

**data/import/glossary.csv**

```yaml
DummyMarketplacePaymentInvoice,Invoice,en_US
DummyMarketplacePaymentInvoice,Auf Rechnung,de_DE
dummyMarketplacePaymentInvoice.invoice,Pay with invoice:,en_US
dummyMarketplacePaymentInvoice.invoice,Auf Rechnung bezahlen:,de_DE
checkout.payment.provider.DummyMarketplacePayment,Dummy Marketplace Payment,en_US
checkout.payment.provider.DummyMarketplacePayment,Beispiel Marktplatz Zahlungsmethode,de_DE
```

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data is added to the `spy_glossary_key` and `spy_glossary_translation` tables in the database.

{% endinfo_block %}

### 2) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
| --------- | ------- | ----- | ------------- |
| DummyMarketplacePaymentHandlerPlugin | Expands Payment transfer with payment provider and payment selection. |  | Spryker\Yves\DummyMarketplacePayment\Plugin\StepEngine\DummyMarketplacePaymentHandlerPlugin |
| DummyMarketplacePaymentInvoiceSubFormPlugin | Creates sub form for Invoice payment method. |  | Spryker\Yves\DummyMarketplacePayment\Plugin\StepEngine\SubForm\DummyMarketplacePaymentInvoiceSubFormPlugin |

**src/Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php**

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
    public function provideDependencies(Container $container): Container
    {
        $container = parent::provideDependencies($container);
        $container = $this->extendPaymentMethodHandler($container);
        $container = $this->extendSubFormPluginCollection($container);

        return $container;
    }

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

{% info_block warningBox "Verification" %}

Add a merchant product to a shopping cart, go to checkout and make sure that Dummy Payment Invoice payment method is available.

{% endinfo_block %}

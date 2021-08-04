---
title: Glue- Payments Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/payments-api-feature-integration-201907
redirect_from:
  - /v3/docs/payments-api-feature-integration-201907
  - /v3/docs/en/payments-api-feature-integration-201907
---

<section contenteditable="false" class="errorBox"><div class="content">

**The following Feature Integration Guide expects the basic feature to be in place.**
The current guide only adds the Payment Management API functionality.
</div></section>

## Install Feature API
### Prerequisites
To start the feature integration, overview and install the necessary features:

| Name | Version | Required sub-feature |
| --- | --- | --- |
| Spryker Core | 201907.0 | [Glue Application Feature Integration](/docs/scos/dev/migration-and-integration/201907.0/feature-integration-guides/glue-api/glue-applicatio)  |
| Payments | 201907.0 |  |

### 1)  Install the Required Modules Using Composer
Run the following command to install the required modules:

```bash
composer require spryker/payments-rest-api:"1.0.0" --update-with-dependencies
```

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
    
Make sure that the following modules are installed:

| Module | Expected Directory |
| --- | --- |
| `CheckoutRestApiExtension` | `vendor/spryker/checkout-rest-api-extension` |
| `PaymentsRestApi` | `vendor/spryker/payments-rest-api` |
</div></section>

### 2) Set Up Configuration
Put all the payment methods available in the shop to  `PaymentConfig`, for example:

<details open>
<summary>src/Pyz/Zed/Payment/PaymentConfig.php</summary>
    
```php
<?php
 
namespace Pyz\Zed\Payment;
 
use Spryker\Zed\Payment\PaymentConfig as SprykerPaymentConfig;
 
class PaymentConfig extends SprykerPaymentConfig
{
    /**
     * @uses \Spryker\Shared\DummyPayment\DummyPaymentConfig::PROVIDER_NAME
     */
    protected const DUMMY_PAYMENT_PROVIDER_NAME = 'DummyPayment';
 
    /**
     * @uses \Spryker\Shared\DummyPayment\DummyPaymentConfig::PAYMENT_METHOD_NAME_INVOICE
     */
    protected const DUMMY_PAYMENT_PAYMENT_METHOD_NAME_INVOICE = 'invoice';
 
    /**
     * @uses \Spryker\Shared\DummyPayment\DummyPaymentConfig::PAYMENT_METHOD_NAME_CREDIT_CARD
     */
    protected const DUMMY_PAYMENT_PAYMENT_METHOD_NAME_CREDIT_CARD = 'credit card';
 
    /**
     * @return array
     */
    public function getSalesPaymentMethodTypes(): array
    {
        return [
            static::DUMMY_PAYMENT_PROVIDER_NAME => [
                static::DUMMY_PAYMENT_PAYMENT_METHOD_NAME_CREDIT_CARD,
                static::DUMMY_PAYMENT_PAYMENT_METHOD_NAME_INVOICE,
            ],
        ];
    }
}
```

</br>
</details>

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
    
Make sure that calling `Pyz\Zed\Payment\PaymentConfig::getSalesPaymentMethodTypes()` returns an array of the payment methods available in the shop grouped by the payment provider.
</div></section>

### 3) Set Up Transfer Objects
#### Install payment methods
In order to have payment methods available for the checkout, you need to extend `RestPaymentTransfer` with project-specific payment method transfers installed in your project:

<details open>
<summary>src/Pyz/Shared/CheckoutRestApi/Transfer/checkout_rest_api.transfer.xml</summary>

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">
 
    <transfer name="RestPayment">
        <property name="DummyPayment" type="DummyPayment"/>
        <property name="DummyPaymentInvoice" type="DummyPayment"/>
        <property name="DummyPaymentCreditCard" type="DummyPayment"/>
    </transfer>
 
</transfers>
```
    
</br>
</details>

<p>Run the following command to generate transfer changes:

```bash
console transfer:generate
```
</p>

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
    
Make sure that the following changes have occurred:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `RestCheckoutRequestAttributes` | class | created | `src/Generated/Shared/Transfer/RestCheckoutRequestAttributesTransfer.php` |
| `RestPayment` | class | created | `src/Generated/Shared/Transfer/RestPaymentTransfer.php` |
</div></section>
<section contenteditable="false" class="warningBox"><div class="content">

Make sure that the newly generated transfer object `src/Generated/Shared/Transfer/RestPaymentTransfer.php` contains the `DummyPayment`, `DummyPaymentInvoice`, and `DummyPaymentCreditCard` fields.
</div></section>

### 4) Set Up Behavior
#### Add the required data to the database
Activate the following plugin:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `SalesPaymentMethodTypeInstallerPlugin` | Installs available payment methods. | None | `Spryker\Zed\Payment\Communication\Plugin\Installer` |

<details open>
<summary>src/Pyz/Zed/Installer/InstallerDependencyProvider.php</summary>
    
```php
<?php
 
namespace Pyz\Zed\Installer;
 
use Spryker\Zed\Installer\InstallerDependencyProvider as SprykerInstallerDependencyProvider;
use Spryker\Zed\Payment\Communication\Plugin\Installer\SalesPaymentMethodTypeInstallerPlugin;
 
class InstallerDependencyProvider extends SprykerInstallerDependencyProvider
{
    /**
     * @return \Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface[]
     */
    public function getInstallerPlugins()
    {
        return [
            new SalesPaymentMethodTypeInstallerPlugin(),
        ];
    }
}
```

</br>
</details>

{% info_block warningBox %}
To make sure that `SalesPaymentMethodTypeInstallerPlugin` is successfully activated, run  `vendor/bin/console setup:init-db and verify` that the  `spy_sales_payment_method_type` table contains the available payment methods as provided in `PaymentConfig`.
{% endinfo_block %}

<!-- Last review date: November 11, 2019 by Eugenia Poidenko, Yuliia Boiko and Volodymyr Volkov -->

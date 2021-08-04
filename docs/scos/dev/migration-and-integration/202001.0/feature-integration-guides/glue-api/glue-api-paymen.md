---
title: Glue API- Payments Feature Integration
originalLink: https://documentation.spryker.com/v4/docs/glue-api-payments-feature-integration
redirect_from:
  - /v4/docs/glue-api-payments-feature-integration
  - /v4/docs/en/glue-api-payments-feature-integration
---

<section contenteditable="false" class="errorBox"><div class="content">

**The following Feature Integration Guide expects the basic feature to be in place.**
The current guide only adds the Payment Management API functionality.
</div></section>

Follow the steps below to install Payments feature API.

## Prerequisites
To start the feature integration, overview and install the necessary features:

| Name | Version | Required sub-feature |
| --- | --- | --- |
| Spryker Core | master | [Glue Application Feature Integration](https://documentation.spryker.com/v4/docs/glue-application-feature-integration-201907)  |
| Payments | master |  |

## 1)  Install the Required Modules Using Composer
Run the following command to install the required modules:

```bash
composer require spryker/payments-rest-api:"1.1.0" --update-with-dependencies
```

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
    
Make sure that the following modules are installed:

| Module | Expected Directory |
| --- | --- |
| `PaymentsRestApi` | `vendor/spryker/payments-rest-api` |
</div></section>

## 2) Set Up Configuration
Put all the payment methods available in the shop to  `CheckoutRestApiConfig`, for example:

<details open>
<summary>src/Pyz/Glue/CheckoutRestApi/CheckoutRestApiConfig.php</summary>
    
```php
<?php
 
namespace Pyz\Glue\PaymentsRestApi;
 
use Spryker\Glue\PaymentsRestApi\PaymentsRestApiConfig as SprykerPaymentsRestApiConfig;
use Spryker\Shared\DummyPayment\DummyPaymentConfig;
 
class PaymentsRestApiConfig extends SprykerPaymentsRestApiConfig
{
    protected const PAYMENT_METHOD_PRIORITY = [
        DummyPaymentConfig::PAYMENT_METHOD_INVOICE => 1,
        DummyPaymentConfig::PAYMENT_METHOD_CREDIT_CARD => 2,
    ];
 
    protected const PAYMENT_METHOD_REQUIRED_FIELDS = [
        DummyPaymentConfig::PROVIDER_NAME => [
            DummyPaymentConfig::PAYMENT_METHOD_INVOICE => [
                'dummyPaymentInvoice.dateOfBirth',
            ],
            DummyPaymentConfig::PAYMENT_METHOD_CREDIT_CARD => [
                'dummyPaymentCreditCard.cardType',
                'dummyPaymentCreditCard.cardNumber',
                'dummyPaymentCreditCard.nameOnCard',
                'dummyPaymentCreditCard.cardExpiresMonth',
                'dummyPaymentCreditCard.cardExpiresYear',
                'dummyPaymentCreditCard.cardSecurityCode',
            ],
        ],
    ];
}
```

</br>
</details>

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
    
Make sure that calling `Pyz\Zed\Payment\PaymentConfig::getSalesPaymentMethodTypes()` returns an array of the payment methods available in the shop grouped by the payment provider.
</div></section>

## 3) Set Up Transfer Objects
### Install payment methods
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

## 4) Set Up Behavior
### Add the required data to the database
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

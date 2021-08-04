---
title: Payments API Feature Integration
originalLink: https://documentation.spryker.com/v2/docs/payments-api-feature-integration-201903
redirect_from:
  - /v2/docs/payments-api-feature-integration-201903
  - /v2/docs/en/payments-api-feature-integration-201903
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:


| Name |  Version|Required sub-feature  |
| --- | --- | --- |
|  Spryker Core| 201903.0 | Feature API |
| Payments | 201903.0 |  |

### 1)  Install the Required Modules Using Composer
Run the following command to install the required modules:
`composer require spryker/payments-rest-api:"1.0.0" --update-with-dependencies`

{% info_block infoBox %}
Make sure that the following modules are installed:<br><table><th>Module</th><th>Expected Directory</th><tr><td>`CheckoutRestApiExtension`</td><td>`vendor/spryker/checkout-rest-api-extension`</td></tr><tr><td>`PaymentsRestApi`</td><td>`vendor/spryker/payments-rest-api`</td></tr><tr></tr></table>
{% endinfo_block %}

### 2) Set up Configuration
Put all the payment methods available in the shop to `PaymentConfig`. For example:

**`src/Pyz/Zed/Payment/PaymentConfig.php`**
```php
&lt;?php
 
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
            static::DUMMY_PAYMENT_PROVIDER_NAME =&gt; [
                static::DUMMY_PAYMENT_PAYMENT_METHOD_NAME_CREDIT_CARD,
                static::DUMMY_PAYMENT_PAYMENT_METHOD_NAME_INVOICE,
            ],
        ];
    }
}
```
{% info_block infoBox %}
Make sure that calling `Pyz\Zed\Payment\PaymentConfig::getSalesPaymentMethodTypes(
{% endinfo_block %}` returns the array of payment methods available in the shop grouped by the payment provider.)

## 3) Set up Transfer Objects
#### Install Payment Methods
In order to have payment methods available for the checkout, you'll need to extend RestPaymentTransfer with the project-specific installed payment methods transfers:
**`src/Pyz/Shared/CheckoutRestApi/Transfer/checkout_rest_api.transfer.xml`**
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

Run the following command to generate transfer changes:
`console transfer:generate`

Make sure that the following changes are present in transfer objects:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `RestCheckoutRequestAttributes` | class |created  | `src/Generated/Shared/Transfer/RestCheckoutRequestAttributesTransfer.php` |
| `RestPayment` | class | created | `src/Generated/Shared/Transfer/RestPaymentTransfer.php` |

{% info_block infoBox %}
Make sure that the newly generated transfer object `src/Generated/Shared/Transfer/RestPaymentTransfer.php` contains the `DummyPayment`, `DummyPaymentInvoice`, and `DummyPaymentCreditCard` fields.
{% endinfo_block %}

### 4) Set up Behavior
#### Fill the database with the required data
Activate the following plugin:

| Plugin |Specification  | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `SalesPaymentMethodTypeInstallerPlugin` | 	Installs available payment methods. | None | `Spryker\Zed\Payment\Communication\Plugin\Installer` |

**`src/Pyz/Zed/Installer/InstallerDependencyProvider.php`**
```php
&lt;?php
 
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

{% info_block infoBox %}
To verify that `SalesPaymentMethodTypeInstallerPlugin` is successfully activated, run `vendor/bin/console setup:init-db` and make sure the `spy_sales_payment_method_type` table in the database contains the available payment methods (provided in `PaymentConfig`
{% endinfo_block %}.)

_Last review date: Apr 25, 2019_ <!-- by Eugenia Poidenko and Dmitry Beirak -->

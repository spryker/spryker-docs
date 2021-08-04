---
title: Glue API- Payments Feature Integration
originalLink: https://documentation.spryker.com/v5/docs/glue-api-payments-feature-integration
redirect_from:
  - /v5/docs/glue-api-payments-feature-integration
  - /v5/docs/en/glue-api-payments-feature-integration
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
| Spryker Core | master | [Glue Application Feature Integration](https://documentation.spryker.com/docs/en/glue-application-feature-integration-201907)  |
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


## 3) Set Up Transfer Objects
### Install payment methods
To have payment methods available for the checkout,  extend `RestPaymentTransfer` with project-specific payment method transfers:

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

{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `RestCheckoutRequestAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCheckoutRequestAttributesTransfer.php` |
| `QuoteTransfer` | class | created | `src/Generated/Shared/Transfer/QuoteTransfer.php` |
| `PaymentTransfer` | class | created | `src/Generated/Shared/Transfer/PaymentTransfer.php` |
| `RestPaymentTransfer` | class | created | `src/Generated/Shared/Transfer/RestPaymentTransfer.php` |
| `RestPaymentMethodsAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestPaymentMethodsAttributesTransfer.php` |
| `RestCheckoutTransfer` | class | created | `src/Generated/Shared/Transfer/RestCheckoutTransfer.php` |
| `PaymentMethodTransfer` | class | created | `src/Generated/Shared/Transfer/PaymentMethodTransfer.php` |
| `PaymentProviderTransfer` | class | created | `src/Generated/Shared/Transfer/PaymentProviderTransfer.php` |
| `PaymentMethodsTransfer` | class | created | `src/Generated/Shared/Transfer/PaymentMethodsTransfer.php` |
| `RestCheckoutDataTransfer` | class | created | `src/Generated/Shared/Transfer/RestCheckoutDataTransfer.php` |
| `PaymentProviderCollectionTransfer` | class | created | `src/Generated/Shared/Transfer/PaymentProviderCollectionTransfer.php` |
| `RestCheckoutDataResponseAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCheckoutDataResponseAttributesTransfer.php` |
| `RestPaymentMethodTransfer` | class | created | `src/Generated/Shared/Transfer/RestPaymentMethodTransfer.php` |
| `RestPaymentTransfer.DummyPayment` | property | created | `src/Generated/Shared/Transfer/RestPaymentTransfer.php` |
| `RestPaymentTransfer.DummyPaymentInvoicet` | property | created | `src/Generated/Shared/Transfer/RestPaymentTransfer.php` |
| `RestPaymentTransfer.DummyPaymentCreditCard` | property | created | `src/Generated/Shared/Transfer/RestPaymentTransfer.php` |

{% endinfo_block %}


## 4) Set Up Behavior
### Enable resources and relationships
Activate the following plugin:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `PaymentMethodsByCheckoutDataResourceRelationshipPlugin` | Adds payment-methods resource as relationship in case `RestCheckoutDataTransfer` is provided as payload. | None | `Spryker\Glue\PaymentsRestApi\Plugin\GlueApplication` |

<details open>
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>
    
```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\CheckoutRestApi\CheckoutRestApiConfig;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\PaymentsRestApi\Plugin\GlueApplication\PaymentMethodsByCheckoutDataResourceRelationshipPlugin;
 
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            CheckoutRestApiConfig::RESOURCE_CHECKOUT_DATA,
            new PaymentMethodsByCheckoutDataResourceRelationshipPlugin()
        );
 
        return $resourceRelationshipCollection;
    }
}
```

</br>
</details>

{% info_block warningBox "Verification" %}

To verify `PaymentMethodsByCheckoutDataResourceRelationshipPlugin` is activated, send a POST request to `http://glue.mysprykershop.com/checkout-data?include=payment-methods` and make sure that `checkout-data` resource has a relationship to the `payment-methods` resources.

{% endinfo_block %}

### Configure mapping
Mappers should be configured on a project level to map the data from the request into `QuoteTransfer`:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- |--- |
| PaymentsQuoteMapperPlugin | Adds a mapper that maps Payments information to `QuoteTransfer`. | None | `Spryker\Zed\PaymentsRestApi\Communication\Plugin\CheckoutRestApi` |

<details open>
<summary>src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiDependencyProvider.php</summary>
    
```php
<?php
 
namespace Pyz\Zed\CheckoutRestApi;
 
use Spryker\Zed\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Zed\PaymentsRestApi\Communication\Plugin\CheckoutRestApi\PaymentsQuoteMapperPlugin;
 
class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
    /**
     * @return \Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\QuoteMapperPluginInterface[]
     */
    protected function getQuoteMapperPlugins(): array
    {
        return [
            new PaymentsQuoteMapperPlugin(),
        ];
    }
}
```

</br>
</details>

{% info_block warningBox "Verification" %}

To verify that `PaymentsQuoteMapperPlugin` is activated, send a POST request to `http://glue.mysprykershop.com/checkout` and make sure the order contains the payment method you provided in the request.

{% endinfo_block %}


| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| SelectedPaymentMethodCheckoutDataResponseMapperPlugin | Maps the selected payment method data to the checkout-data resource attributes. | None | `Spryker\Glue\PaymentsRestApi\Plugin\CheckoutRestApi` |

<details open>
<summary>src/Pyz/Glue/CheckoutRestApi/CheckoutRestApiDependencyProvider.php</summary>
    
```php
<?php

namespace Pyz\Glue\CheckoutRestApi;
 
use Spryker\Glue\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Glue\PaymentsRestApi\Plugin\CheckoutRestApi\SelectedPaymentMethodCheckoutDataResponseMapperPlugin;
 
class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\CheckoutRestApiExtension\Dependency\Plugin\CheckoutDataResponseMapperPluginInterface[]
     */
    protected function getCheckoutDataResponseMapperPlugins(): array
    {
        return [
            new SelectedPaymentMethodCheckoutDataResponseMapperPlugin(),
        ];
    }
} 

```

</br>
</details>

{% info_block warningBox "Verification" %}

To verify that SelectedPaymentMethodCheckoutDataResponseMapperPlugin is activated, send a POST request to the `http://glue.mysprykershop.com/checkout-data` endpoint with payment method name and payment provider name, and make sure that you get not empty "selectedPaymentMethods" attribute in the response:

{% endinfo_block %}

## Related Features

| Feature | Link |
| --- | --- |
| Checkout API | [Glue API: Checkout Feature Integration](https://documentation.spryker.com/docs/en/checkout-feature-integration-201907) |

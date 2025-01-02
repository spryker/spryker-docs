

{% info_block errorBox %}


The following feature integration Guide expects the basic feature to be in place.
The current guide only adds the Payment Management API functionality.

{% endinfo_block %}


Follow the steps below to install Payments feature API.

## Prerequisites

To start the feature integration, overview and install the necessary features:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html)  |
| Payments | {{page.version}} | [Install the Payments feature](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/install-and-upgrade/install-the-payments-feature.html) |

## 1)  Install the required modules using Composer

Run the following command to install the required modules:

```bash
composer require spryker/payments-rest-api:"1.1.0" --update-with-dependencies
```

{% info_block warningBox “Verification” %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| PaymentsRestApi | vendor/spryker/payments-rest-api |

{% endinfo_block %}

## 2) Set up configuration

Put all the payment methods available in the shop to  `CheckoutRestApiConfig`, for example:

**src/Pyz/Glue/CheckoutRestApi/CheckoutRestApiConfig.php**

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


## 3) Set up transfer objects

### Install payment methods

To have payment methods available for the checkout,  extend `RestPaymentTransfer` with project-specific payment method transfers:

**src/Pyz/Shared/CheckoutRestApi/Transfer/checkout_rest_api.transfer.xml**

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


Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| RestCheckoutRequestAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestCheckoutRequestAttributesTransfer.php |
| QuoteTransfer | class | created | src/Generated/Shared/Transfer/QuoteTransfer.php |
| PaymentTransfer | class | created | src/Generated/Shared/Transfer/PaymentTransfer.php |
| RestPaymentTransfer | class | created | src/Generated/Shared/Transfer/RestPaymentTransfer.php |
| RestPaymentMethodsAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestPaymentMethodsAttributesTransfer.php |
| RestCheckoutTransfer | class | created | src/Generated/Shared/Transfer/RestCheckoutTransfer.php |
| PaymentMethodTransfer | class | created | src/Generated/Shared/Transfer/PaymentMethodTransfer.php |
| PaymentProviderTransfer | class | created | src/Generated/Shared/Transfer/PaymentProviderTransfer.php |
| PaymentMethodsTransfer | class | created | src/Generated/Shared/Transfer/PaymentMethodsTransfer.php |
| RestCheckoutDataTransfer | class | created | src/Generated/Shared/Transfer/RestCheckoutDataTransfer.php |
| PaymentProviderCollectionTransfer | class | created | src/Generated/Shared/Transfer/PaymentProviderCollectionTransfer.php |
| RestCheckoutDataResponseAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestCheckoutDataResponseAttributesTransfer.php |
| RestPaymentMethodTransfer | class | created | src/Generated/Shared/Transfer/RestPaymentMethodTransfer.php |
| RestPaymentTransfer.DummyPayment | property | created | src/Generated/Shared/Transfer/RestPaymentTransfer.php |
| RestPaymentTransfer.DummyPaymentInvoice | property | created | src/Generated/Shared/Transfer/RestPaymentTransfer.php |
| RestPaymentTransfer.DummyPaymentCreditCard | property | created | src/Generated/Shared/Transfer/RestPaymentTransfer.php |

{% endinfo_block %}


## 4) Set up behavior

### Enable resources and relationships

Activate the following plugin:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| PaymentMethodsByCheckoutDataResourceRelationshipPlugin | Adds payment-methods resource as relationship in case `RestCheckoutDataTransfer` is provided as payload. | None | Spryker\Glue\PaymentsRestApi\Plugin\GlueApplication |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

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

{% info_block warningBox "Verification" %}

To verify `PaymentMethodsByCheckoutDataResourceRelationshipPlugin` is activated, send a POST request to `https://glue.mysprykershop.com/checkout-data?include=payment-methods` and make sure that `checkout-data` resource has a relationship to the `payment-methods` resources.

{% endinfo_block %}

### Configure mapping

Mappers should be configured on a project level to map the data from the request into `QuoteTransfer`:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- |--- |
| PaymentsQuoteMapperPlugin | Adds a mapper that maps Payments information to `QuoteTransfer`. | None | `Spryker\Zed\PaymentsRestApi\Communication\Plugin\CheckoutRestApi` |

**src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiDependencyProvider.php**

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


{% info_block warningBox "Verification" %}

To verify that `PaymentsQuoteMapperPlugin` is activated, send a POST request to `https://glue.mysprykershop.com/checkout` and make sure the order contains the payment method you provided in the request.

{% endinfo_block %}


| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| SelectedPaymentMethodCheckoutDataResponseMapperPlugin | Maps the selected payment method data to the checkout-data resource attributes. | None | Spryker\Glue\PaymentsRestApi\Plugin\CheckoutRestApi |

**src/Pyz/Glue/CheckoutRestApi/CheckoutRestApiDependencyProvider.php**

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


{% info_block warningBox "Verification" %}

To verify that SelectedPaymentMethodCheckoutDataResponseMapperPlugin is activated, send a POST request to the `https://glue.mysprykershop.com/checkout-data` endpoint with payment method name and payment provider name, and make sure that you get not empty "selectedPaymentMethods" attribute in the response:

{% endinfo_block %}

## Install related features

| FEATURE | LINK |
| --- | --- |
| Checkout API | [Install the Checkout Glue API](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-checkout-glue-api.html) |

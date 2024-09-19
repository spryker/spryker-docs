---
title: Integrate Unzer Glue API
description: Integrate Unzer Glue API into your project
last_updated: Aug 11, 2022
template: feature-integration-guide-template
redirect_from:
  - /docs/pbc/all/payment-service-providers/unzer/install-unzer/integrate-unzer-glue-api.html
  - /docs/pbc/all/payment-service-provider/202307.0/third-party-integrations/unzer/install-unzer/integrate-unzer-glue-api.html
---

This document describes how to integrate [Unzer](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/unzer/unzer.html) Glue API into a Spryker project.

## Install feature core

Follow the steps below to install the Unzer Glue API feature core.

### Prerequisites

Install the required features:

| NAME               | INSTALLATION GUIDE                                                                                                                                 |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| Unzer              | [Unzer feature integration](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/unzer/install-unzer/integrate-unzer.html)                                     |
| Glue API: Checkout | [Install the Checkout Glue API](/docs/scos/dev/feature-integration-guides/202204.0/glue-api/glue-api-checkout-feature-integration.html) |
| Glue API: Payments | [Install the Payments Glue API](/docs/scos/dev/feature-integration-guides/202204.0/glue-api/glue-api-payments-feature-integration.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-eco/unzer-rest-api
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE       | EXPECTED DIRECTORY                 |
|--------------|------------------------------------|
| UnzerRestApi | vendor/spryker-eco/unzer-rest-api  |

{% endinfo_block %}

### 2) Set up configuration

Put all the payment methods available in the shop to `PaymentsRestApiConfig`:

**src/Pyz/Glue/PaymentsRestApi/PaymentsRestApiConfig.php**

```php
<?php

namespace Pyz\Glue\PaymentsRestApi;

use Spryker\Glue\PaymentsRestApi\PaymentsRestApiConfig as SprykerPaymentsRestApiConfig;
use SprykerEco\Shared\Unzer\UnzerConfig;

class PaymentsRestApiConfig extends SprykerPaymentsRestApiConfig
{
    /**
     * @var array<string, int>
     */
    protected const PAYMENT_METHOD_PRIORITY = [
        UnzerConfig::PAYMENT_METHOD_KEY_CREDIT_CARD => 1,
        UnzerConfig::PAYMENT_METHOD_KEY_SOFORT => 2,
        UnzerConfig::PAYMENT_METHOD_KEY_BANK_TRANSFER => 3,
    ];

     /**
     * @var array<string, array<string, array<string>>>
     */
    protected const PAYMENT_METHOD_REQUIRED_FIELDS = [
        UnzerConfig::PAYMENT_PROVIDER_NAME => [
            UnzerConfig::PAYMENT_METHOD_KEY_CREDIT_CARD => [
                'unzerPayment.paymentResource.id',
            ],
            UnzerConfig::PAYMENT_METHOD_KEY_SOFORT => [
                'unzerPayment.paymentResource.id',
            ],
        ],
    ];
}
```

{% info_block warningBox "Verification" %}

Make sure that calling `Pyz\Zed\Payment\PaymentConfig::getSalesPaymentMethodTypes()` returns an array of the payment methods available in the shop grouped by the payment provider.

{% endinfo_block %}

---

### 3) Set up transfer objects

Generate transfers:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure the following transfers have been created:

| TRANSFER                           | TYPE  | EVENT   | PATH                                                                     |
|------------------------------------|-------|---------|--------------------------------------------------------------------------|
| RestCheckoutData                   | class | created | src/Generated/Shared/Transfer/RestCheckoutDataTransfer                   |
| Quote                              | class | created | src/Generated/Shared/Transfer/QuoteTransfer                              |
| UnzerCredentials                   | class | created | src/Generated/Shared/Transfer/UnzerCredentialsTransfer                   |
| UnzerKeypair                       | class | created | src/Generated/Shared/Transfer/UnzerKeypairTransfer                       |
| RestCheckoutDataResponseAttributes | class | created | src/Generated/Shared/Transfer/RestCheckoutDataResponseAttributesTransfer |
| CheckoutResponse                   | class | created | src/Generated/Shared/Transfer/CheckoutResponseTransfer                   |
| CheckoutData                       | class | created | src/Generated/Shared/Transfer/CheckoutDataTransfer                       |
| RestCheckoutRequestAttributes      | class | created | src/Generated/Shared/Transfer/RestCheckoutRequestAttributesTransfer      |
| RestPayment                        | class | created | src/Generated/Shared/Transfer/RestPaymentTransfer                        |
| RestUnzerPayment                   | class | created | src/Generated/Shared/Transfer/RestUnzerPaymentTransfer                   |
| UnzerPaymentResource               | class | created | src/Generated/Shared/Transfer/UnzerPaymentResourceTransfer               |

{% endinfo_block %}

---

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION  | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| UnzerCheckoutDataResponseMapperPlugin | Maps `RestCheckoutDataTransfer.unzerCredentials.unzerKeypair.publicKey` to `RestCheckoutDataResponseAttributesTransfer.unzerPublicKey` while `RestCheckoutDataTransfer.unzerCredentials` is specified. | None  | SprykerEco\Glue\UnzerRestApi\Plugin\CheckoutRestApi |
| UnzerCheckoutDataExpanderPlugin | Expands the `RestCheckoutDataTransfer.quote` transfer property with `UnzerCredentialsTransfer` according to added items. | None  | SprykerEco\Zed\UnzerRestApi\Communication\Plugin\CheckoutRestApi |
| UnzerNotificationResource | Adds Unzer notification resource.  | None | SprykerEco\Glue\UnzerRestApi\Plugin\GlueJsonApiConventionExtension |

**src/Pyz/Glue/CheckoutRestApi/CheckoutRestApiDependencyProvider.php**

```php
namespace Pyz\Glue\CheckoutRestApi;

use Spryker\Glue\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use SprykerEco\Glue\UnzerRestApi\Plugin\CheckoutRestApi\UnzerCheckoutDataResponseMapperPlugin;

class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\CheckoutRestApiExtension\Dependency\Plugin\CheckoutDataResponseMapperPluginInterface>
     */
    protected function getCheckoutDataResponseMapperPlugins(): array
    {
        return [
            new UnzerCheckoutDataResponseMapperPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiDependencyProvider.php**

```php
namespace Pyz\Zed\CheckoutRestApi;

use Spryker\Zed\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use SprykerEco\Zed\UnzerRestApi\Communication\Plugin\CheckoutRestApi\UnzerCheckoutDataExpanderPlugin;

class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\CheckoutDataExpanderPluginInterface>
     */
    protected function getCheckoutDataExpanderPlugins(): array
    {
        return [
            new UnzerCheckoutDataExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Glue/GlueStorefrontApiApplication/GlueStorefrontApiApplicationDependencyProvider.php**

```php
namespace Pyz\Glue\GlueStorefrontApiApplication;

use Spryker\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider as SprykerGlueStorefrontApiApplicationDependencyProvider;
use SprykerEco\Glue\UnzerRestApi\Plugin\GlueJsonApiConventionExtension\UnzerNotificationResource;

class GlueStorefrontApiApplicationDependencyProvider extends SprykerGlueStorefrontApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface>
     */
    protected function getResourcePlugins(): array
    {
        return [
            new UnzerNotificationResource(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that the following API requests work:
1. Create a cart by sending the `POST https://glue.mysprykershop.com/carts`.
2. Add at least one item to the cart by sending `POST https://glue.mysprykershop.com/{{cart_uuid}}/items`.
3. Check result by sending the `POST https://glue.mysprykershop.com/checkout-data?include=payment-methods` request.

**Request Example:**
```json
{
  "data":
  {
    "type": "checkout-data",
    "attributes":
    {
      "idCart": "{{cart_uuid}}",
      "payments": [
        {
          "paymentMethodName": "Unzer Sofort",
          "paymentProviderName": "Unzer"
        }
      ]
    }
  }
}
```

{% info_block warningBox "Verification" %}

Ensure that the request body differs for each Unzer payment method:
- Property `paymentMethodName` of `payments` must be replaced by the used method—for example, `Unzer Sofort` or `Unzer Credit Card`.
- Property `paymentResource` of `payments` is not required for `Unzer Sofort`, `Unzer Marketplace Sofort`, and `Unzer Bank Transfer`.

{% endinfo_block %}

<details><summary>Response example:</summary>

```json
{
  "data": {
    "type": "checkout-data",
    "id": null,
    "attributes": {
      "unzerPublicKey": "string",
      ...
    },
    "links": {
      "self": "https://glue.mysprykershop.com/checkout-data?include=payment-methods"
    },
    "relationships": {
      "payment-methods": {
        "data": [
          {
            "type": "payment-methods",
            "id": "1"
          }
        ]
      }
    },
    ...
  },
  "included": [
    {
      "type": "payment-methods",
      "id": "1",
      "attributes": {
        "paymentMethodName": "Unzer Sofort",
        "paymentProviderName": "Unzer",
        "priority": 1,
        "requiredRequestData": [
          "paymentMethod",
          "paymentProvider",
          "unzerPayment.paymentResource.id"
        ]
      },
      "links": {
        "self": "https://glue.mysprykershop.com/payment-methods/1"
      }
    },
    ...
  ]
}
```

</details>

4. Check result by sending the `POST https://glue.mysprykershop.com/checkout` request.

**Request example:**
```json
{
  "data": {
    "type": "checkout",
    "attributes": {
      "idCart": "{{cart_uuid}}",
      "payments": [
        {
          "paymentMethodName": "Unzer Credit Card",
          "paymentProviderName": "Unzer",
          "paymentSelection": "unzerCreditCard",
          "unzerCreditCard": {
            "paymentResource": {
              "id": "{{payment_resource}}"
            }
          },
          "amount": "{{amount}}"
        }
      ],
      ...
    }
  }
}
```

{% info_block warningBox "Verification" %}

Ensure that the request body differs for each Unzer payment method:
- Property `paymentMethodName` of `payments` must be replaced by the used method—for example, `Unzer Sofort` or `Unzer Credit Card`.
- Property `paymentResource` of `payments` is not required for `Unzer Sofort`, `Unzer Marketplace Sofort`, and  `Unzer Bank Transfer`.
- Property `paymentSelection` of `payments` has to be replaced by used method—for example, `unzerSofort`, `unzerCreditCard`, or `unzerMarketplaceCreditCard`.

{% endinfo_block %}

**Response example:**
```json
{
    "data": {
        "type": "checkout",
        "id": null,
        "attributes": {
            "redirectUrl": "https://payment.unzer.com/v1/redirect/3ds/{{id}}",
            "isExternalRedirect": true,
            ...
        },
        "links": {
            "self": "https://glue.mysprykershop.com/checkout"
        }
    }
}
```

{% endinfo_block %}

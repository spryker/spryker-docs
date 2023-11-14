

This document describes how to install the Service Points Cart feature.

## Prerequisites

Install the required features:

| NAME                    | VERSION           | INSTALLATION GUIDE                                                                                                                                                                               |
|-------------------------|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Service Points          | {{page.version}}  | [Install the Service Points feature](/docs/pbc/all/service-points/{{page.version}}/unified-commerce/install-and-upgrade/install-the-service-points-feature.html)                                                    |
| Cart                    | {{page.version}}  | [Install the Cart feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/feature-overviews/cart-feature-overview/cart-feature-overview.html) |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/service-points-cart: "{{page.version}}" --update-with-dependencies
composer require spryker/service-point-carts-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                    | EXPECTED DIRECTORY                          |
|---------------------------|---------------------------------------------|
| ServicePointCart          | vendor/spryker/service-point-cart           |
| ServicePointCartExtension | vendor/spryker/service-point-cart-extension |
| ServicePointCartPage      | vendor/spryker-shop/service-point-cart-page |
| ServicePointCartsRestApi  | vendor/spryker/service-point-carts-rest-api |

{% endinfo_block %}

## 2) Add translations

1. Append the glossary according to your configuration:

```csv
service_point_cart.checkout.validation.error,Selected service point "%uuid%" is not available for the store "%store_name%",en_US
service_point_cart.checkout.validation.error,Der ausgewählte Servicepunkt "%uuid%" ist für den Shop "%store_name%" nicht verfügbar,de_DE
```

## 3) Set up behavior

Register the plugins:

| PLUGIN                                         | SPECIFICATION                                                                                  | PREREQUISITES | NAMESPACE                                                                 |
|------------------------------------------------|------------------------------------------------------------------------------------------------|---------------|---------------------------------------------------------------------------|
| ServicePointCheckoutPreConditionPlugin         | Validates if `QuoteTransfer.items.servicePoint` is active and available for the current store. | None          | Spryker\Zed\ServicePointCart\Communication\Plugin\Checkout                |
| ReplaceServicePointQuoteItemsQuoteMapperPlugin | Replaces quote items using applicable strategy if shipments are provided.                      | None          | Spryker\Zed\ServicePointCartsRestApi\Communication\Plugin\CheckoutRestApi |

**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\ServicePointCart\Communication\Plugin\Checkout\ServicePointCheckoutPreConditionPlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface>
     */
    protected function getCheckoutPreConditions(Container $container): array
    {
        return [
            new ServicePointCheckoutPreConditionPlugin(),
        ];
    }
```

{% info_block warningBox "Verification" %}

1. Add an item to cart and proceed to checkout.
2. Select a service point.
3. Deactivate the service point.
4. Proceed to the *Summary* page.
5. On the *Summary* page, make sure you get the validation error.

{% endinfo_block %}

**src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CheckoutRestApi;

use Spryker\Zed\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Zed\ServicePointCartsRestApi\Communication\Plugin\CheckoutRestApi\ReplaceServicePointQuoteItemsQuoteMapperPlugin;

class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\QuoteMapperPluginInterface>
     */
    protected function getQuoteMapperPlugins(): array
    {
        return [
            new ReplaceServicePointQuoteItemsQuoteMapperPlugin() # Has to be placed before PaymentsQuoteMapperPlugin
        ];
    }
```

{% info_block warningBox "Verification" %}

Please follow the steps below to complete the process:
1. Prepare two product offers for the same product, one with support for pickup shipment type and a connection to the service point, and another without support for pickup shipment type.
2. Add the product offer that does not support the pickup shipment type to the cart.
3. Proceed to the checkout-data resource in the GLUE API.
4. Select a service point for the item.
5. Send a POST request to the checkout-data resource.
6. Check that the selected service point is returned in the response.
7. Lastly, make sure that the product offer has been replaced with the one that has the service point connection.

{% endinfo_block %}

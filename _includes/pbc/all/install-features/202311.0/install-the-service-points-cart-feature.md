

This document describes how to install the Service Points Cart feature.

## Prerequisites

Install the required features:

| NAME                    | VERSION           | INSTALLATION GUIDE                                                                                                                                                                               |
|-------------------------|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Service Points          | {{page.version}}  | [Install the Service Points feature](/docs/pbc/all/service-points/{{page.version}}/unified-commerce/install-and-upgrade/install-the-service-points-feature.html)                                                    |
| Cart                    | {{page.version}}  | [Install the Cart feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/cart-feature-overview/cart-feature-overview.html) |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/service-points-cart: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                    | EXPECTED DIRECTORY                          |
|---------------------------|---------------------------------------------|
| ServicePointCart          | vendor/spryker/service-point-cart           |
| ServicePointCartExtension | vendor/spryker/service-point-cart-extension |
| ServicePointCartPage      | vendor/spryker-shop/service-point-cart-page |

{% endinfo_block %}

## 2) Add translations

1. Append the glossary according to your configuration:

```csv
service_point_cart.checkout.validation.error,Selected service point "%uuid%" is not available for the store "%store_name%",en_US
service_point_cart.checkout.validation.error,Der ausgewählte Servicepunkt "%uuid%" ist für den Shop "%store_name%" nicht verfügbar,de_DE
```

## 3) Set up behavior

Register the plugins:

| PLUGIN                                           | SPECIFICATION                                                                                    | PREREQUISITES | NAMESPACE                                                   |
|--------------------------------------------------|--------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------|
| ServicePointCheckoutPreConditionPlugin           | Validates if `QuoteTransfer.items.servicePoint` is active and available for the current store.  | None          | Spryker\Zed\ServicePointCart\Communication\Plugin\Checkout  |

{% info_block warningBox "Verification" %}

1. Add an item to cart and proceed to checkout.
2. Select a service point.
3. Deactivate the service point.
4. Proceed to the *Summary* page.
    On the *Summary* page, make sure you get the validation error.

{% endinfo_block %}

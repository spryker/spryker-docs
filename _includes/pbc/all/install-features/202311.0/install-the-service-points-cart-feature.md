

This document describes how to integrate the Service Points Cart feature into a Spryker project.

## Install feature core

Follow the steps below to install the Service Points Cart feature.

### Prerequisites

To start feature integration, integrate the required features:

| NAME                    | VERSION           | INTEGRATION GUIDE                                                                                                                                                                               |
|-------------------------|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Service Points          | {{page.version}}  | [Install the Service Points feature](/docs/pbc/all/service-points/{{page.version}}/unified-commerce/install-and-upgrade/install-the-service-points-feature.html)                                                    |
| Cart                    | {{page.version}}  | [Install the Cart feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/cart-feature-overview/cart-feature-overview.html) |

### 1) Install the required modules using Composer

```bash
composer require spryker-feature/service-points-cart: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                  | EXPECTED DIRECTORY                          |
|-------------------------|---------------------------------------------|
| ServicePointCart        | vendor/spryker/service-point-cart           |
| ServicePointCartPage    | vendor/spryker-shop/service-point-cart-page |

{% endinfo_block %}

### 2) Add translations

1. Append the glossary according to your configuration:

```csv
service_point_cart.checkout.validation.error,Selected service point "%uuid%" is not available for the store "%store_name%",en_US
service_point_cart.checkout.validation.error,Der ausgewählte Servicepunkt "%uuid%" ist für den Shop "%store_name%" nicht verfügbar,de_DE
```

### 3) Set up behavior

Register plugins:

| PLUGIN                                           | SPECIFICATION                                                                                    | PREREQUISITES | NAMESPACE                                                   |
|--------------------------------------------------|--------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------|
| ServicePointCheckoutPreConditionPlugin           | Validates if `QuoteTransfer.items.servicePoint` are active and available for the current store.  | None          | Spryker\Zed\ServicePointCart\Communication\Plugin\Checkout  |

{% info_block warningBox "Verification" %}

* Make sure that if you deactivate service point selected during the checkout, you will receive the corresponding validation error on checkout summary page.

{% endinfo_block %}

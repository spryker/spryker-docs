

This document describes how to integrate the Marketplace Order Management + Order Threshold feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Order Management Feature + Order Threshold feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME  | VERSION | INTEGRATION GUIDE |
| -------------- | --------- | -------------|
| Order Threshold | {{page.version}}  | [Order Threshold feature integration](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-checkout-feature.html) |
| Marketplace Order Management | {{page.version}} | [Marketplace Order Management feature integration](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/install-features/install-the-marketplace-order-management-feature.html) |

### Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/merchant-sales-order-threshold-gui:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| ------------------ | -------------- |
| MerchantSalesOrderThresholdGui | spryker/merchant-sales-order-threshold-gui |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that merchant orders have correct threshold expenses shown in order-overview page in `http://zed.mysprykershop.com/merchant-sales-order-merchant-user-gui/detail?id-merchant-sales-order={% raw %}{{idMerchantSalesOrder}}{% endraw %}`

{% endinfo_block %}

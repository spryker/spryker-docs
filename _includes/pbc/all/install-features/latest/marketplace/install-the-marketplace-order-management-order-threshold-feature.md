

This document describes how to install the Marketplace Order Management + Order Threshold feature.

## Install feature core

Follow the steps below to install the Marketplace Order Management Feature + Order Threshold feature core.

### Prerequisites

Install the required features:

| NAME  | VERSION | INSTALLATION GUIDE |
| -------------- | --------- | -------------|
| Order Threshold | {{page.version}}  | [Install the Order Threshold feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-checkout-feature.html) |
| Marketplace Order Management | {{page.version}} | [Install the Marketplace Order Management feature](/docs/pbc/all/order-management-system/latest/marketplace/install-features/install-the-marketplace-order-management-feature.html) |

### Install the required modules using Composer

Install the required modules using Composer:

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

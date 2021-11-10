---
title: Marketplace Order Management + Order Threshold feature integration
last_updated: Dec 16, 2020
description: This document describes the process how to integrate the Marketplace Order Management Feature + Order Threshold feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Order Management + Order Threshold feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Order Management Feature + Order Threshold feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME  | VERSION | INTEGRATION GUIDE |
| -------------- | --------- | -------------|
| Order Threshold | {{page.version}}  | [Order Threshold feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/checkout-feature-integration.html) |
| Marketplace Order Management | {{page.version}} | [Marketplace Order Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-order-management-feature-integration.html) |

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

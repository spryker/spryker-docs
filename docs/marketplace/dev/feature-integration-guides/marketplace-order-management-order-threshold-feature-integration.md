---
title: Marketplace Order Management + Order Threshold feature integration
last_updated: Dec 16, 2020
description: This document describes the process how to integrate the Marketplace Order Management Feature + Order Threshold feature into a Spryker project.
template: feature-integration-guide-template
---

## Install feature core
Follow the steps below to install the Marketplace Order Management Feature + Order Threshold feature core.

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME  | VERSION | INTEGRATION GUIDE |
| -------------- | --------- | -------------|
| Order Threshold              | dev-master  | [Order Threshold feature integration](https://documentation.spryker.com/docs/order-threshold-feature-integration) |
| Marketplace Order Management | 202001.0    | [Marketplace Order Management feature integration](docs/marketplace/dev/feature-integration-guides/marketplace-order-management-feature-integration.html) |

### 1) Install the required modules using composer

Run the following commands to install the required modules:

```bash
composer require spryker/merchant-sales-order-threshold-gui:"^0.1.0" --update-with-dependencies
```

---

**Verification**

Make sure that the following modules have been installed:

| MODULE    | EXPECTED DIRECTORY    |
| ------------------ | -------------- |
| MerchantSalesOrderThresholdGui | spryker/merchant-sales-order-threshold-gui |

---
---

**Verification**

Make sure that Merchant Orders have correct threshold expenses shown in order-overview page in `http://zed.mysprykershop.com/merchant-sales-order-merchant-user-gui/detail?id-merchant-sales-order={% raw %}{{idMerchantSalesOrder}}{% endraw %}`

---

---
title: Marketplace Shipment + Customer feature integration
last_updated: Jul 06, 2021
description: This document describes the process how to integrate Marketplace Shipment + Customer feature into your project
tags:
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Shipment + Customer feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Shipment + Customer feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| --------- | ------ | -----------|
| Marketplace Shipment | {{page.version}} | [Marketplace Shipment feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-shipment-feature-integration.html) |
| Customer | {{page.version}} | [Customer account management feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/customer-account-management-feature-integration.html)  |

### 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN  | SPECIFICATION | PREREQUISITES | NAMESPACE |
| ------------ | ----------- | ----- | ------------ |
| MerchantShipmentCheckoutAddressStepPreGroupItemsByShipmentPlugin | Sets shipment merchant reference in the initial checkout step to avoid wrong grouping by merchant reference. |  | Spryker\Yves\MerchantShipment\Plugin\CustomerPage|

<details>
<summary markdown='span'>ssrc/Pyz/Yves/CustomerPage/CustomerPageDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Yves\CustomerPage;

use SprykerShop\Yves\CustomerPage\CustomerPageDependencyProvider as SprykerShopCustomerPageDependencyProvider;
use Spryker\Yves\MerchantShipment\Plugin\CustomerPage\MerchantShipmentCheckoutAddressStepPreGroupItemsByShipmentPlugin;

class CustomerPageDependencyProvider extends SprykerShopCustomerPageDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\CustomerPageExtension\Dependency\Plugin\CheckoutAddressStepPreGroupItemsByShipmentPluginInterface[]
     */
    protected function getCheckoutAddressStepPreGroupItemsByShipmentPlugins(): array
    {
        return [
            new MerchantShipmentCheckoutAddressStepPreGroupItemsByShipmentPlugin(),
        ];
    }
}
```

</details>

{% info_block warningBox "Verification" %}

Make sure that during the checkout steps, items and their shipments have the same merchant reference attached to them.

{% endinfo_block %}

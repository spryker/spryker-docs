---
title: Marketplace Shipment + Customer feature integration
description: Integrate Marketplace Shipment + Customer feature into your project
tags:
---

This document describes how to integrate the Marketplace Shipment + Customer feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Shipment + Customer feature core.

### Prerequisites
| NAME | VERSION |
| --------- | ------ |
| Marketplace Shipment | dev-master | 
| Customer | 202001.0 | 

### 1) Set up behavior
Enable the following behaviors by registering the plugins:

| PLUGIN  | SPECIFICATION | PREREQUISITES | NAMESPACE |
| ------------ | ----------- | ----- | ------------ |
| MerchantShipmentCheckoutAddressStepPreGroupItemsByShipmentPlugin | Sets shipment merchant reference in the initial checkout step to avoid wrong grouping by merchant reference. | None | Spryker\Yves\MerchantShipment\Plugin\CustomerPage|

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

---
**Verification**

Make sure that during the checkout steps, items and their shipments have the same merchant reference attached to them.

---
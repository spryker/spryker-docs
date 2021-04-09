---
title: Marketplace Order Management + Customer Account Management feature integration
last_updated: Jan 06, 2021
summary: This document describes the process how to integrate the Marketplace Order Management Feature + Order Threshold feature into a Spryker project.
---


## Install feature front end

Follow the steps below to install the Marketplace Order Management Feature + Order Threshold feature front end.

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME                    | VERSION |
| ---------------------------- | ----------- |
| Marketplace Order Management | dev-master  |
| Customer Account Management  | 202001.0    |

## 1) Set up the transfer objects

Run the following commands to generate transfer changes.

```bash
console transfer:generate
```

---

**Verification**

Make sure that the following changes were applied in transfer objects.

| TRANSFER  | TYPE  | EVENT | PATH  |
| ---------------- | --------- | --------- | ------------------------------- |
| ShopContext.merchantReference | attribute | created   | src/Generated/Shared/Transfer/ShopContextTransfer |

---

### 2) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | NAMESPACE|
| ------------------- | ------------------ | ------------------- |
| MerchantSwitchCartAfterCustomerAuthenticationSuccessPlugin | Sets merchant reference value to cookies if a customer's quote contains it, and the quote is not empty. | SprykerShop\Yves\MerchantSwitcherWidget\Plugin\CustomerPage |



```php
<?php

namespace Pyz\Yves\CustomerPage;

use SprykerShop\Yves\CustomerPage\CustomerPageDependencyProvider as SprykerShopCustomerPageDependencyProvider;
use SprykerShop\Yves\MerchantSwitcherWidget\Plugin\CustomerPage\MerchantSwitchCartAfterCustomerAuthenticationSuccessPlugin;

class CustomerPageDependencyProvider extends SprykerShopCustomerPageDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\CustomerPageExtension\Dependency\Plugin\AfterCustomerAuthenticationSuccessPluginInterface[]
     */
    protected function getAfterCustomerAuthenticationSuccessPlugins(): array
    {
        return [
            new MerchantSwitchCartAfterCustomerAuthenticationSuccessPlugin(),
        ];
    }
}
```

---

**Verification**

Make sure that after customers log in, their selected merchant is not changed and set correctly.

---
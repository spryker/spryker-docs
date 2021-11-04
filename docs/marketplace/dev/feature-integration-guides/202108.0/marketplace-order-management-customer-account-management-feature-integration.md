---
title: Marketplace Order Management + Customer Account Management feature integration
last_updated: Jan 06, 2021
description: This document describes the process how to integrate the Marketplace Order Management Feature + Order Threshold feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Order Management + Customer Account Management feature into a Spryker project.

## Install feature front end

Follow the steps below to install the Marketplace Order Management + Customer Account Management feature front end.

### Prerequisites

To start feature integration, integrate the required features:

| NAME  | VERSION | INTEGRATION GUIDE |
| ------------------ | ----------- | ----------|
| Marketplace Order Management |  {{page.version}} | [Marketplace Order Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-order-management-feature-integration.html) |
| Customer Account Management  | {{page.version}}    | [Customer Account Management feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/customer-account-management-feature-integration.html)

### 1) Set up the transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes were applied in transfer objects.

| TRANSFER  | TYPE | EVENT | PATH |
| ---------------- | --------- | --------- | ------------------------------- |
| ShopContext.merchantReference | attribute | created   | src/Generated/Shared/Transfer/ShopContextTransfer |

{% endinfo_block %}

### 2) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE|
| ------------------- | ------------------ | ------------------- |------------------- |
| MerchantSwitchCartAfterCustomerAuthenticationSuccessPlugin | Sets merchant reference value to cookies if a customer's quote contains it, and the quote is not empty. |  | SprykerShop\Yves\MerchantSwitcherWidget\Plugin\CustomerPage |



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

{% info_block warningBox "Verification" %}

Make sure that after customers log in, their selected merchant is not changed and set correctly.

{% endinfo_block %}

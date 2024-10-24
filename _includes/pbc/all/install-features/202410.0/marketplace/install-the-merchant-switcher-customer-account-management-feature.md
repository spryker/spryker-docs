

This document describes how to install the Merchant Switcher + Customer Account Management feature.

## Install feature frontend

Follow the steps below to install the Marketplace Order Management + Customer Account Management feature frontend.

### Prerequisites

Install the required features:

| NAME  | VERSION | INSTALLATION GUIDE |
| ------------------ | ----------- | ----------|
| Merchant Switcher | {{page.version}} | [Install the Merchant Switcher feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-merchant-switcher-feature.html)|
| Customer Account Management  | {{page.version}}    | [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html) |

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
     * @return array<\SprykerShop\Yves\CustomerPageExtension\Dependency\Plugin\AfterCustomerAuthenticationSuccessPluginInterface>
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

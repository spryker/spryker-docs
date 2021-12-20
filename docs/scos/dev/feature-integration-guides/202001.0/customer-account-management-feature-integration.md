---
title: Customer Account Management feature integration
description: The guide walks you through the process of adding Redirect support for Customer login functionality to your project.
last_updated: Mar 5, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v4/docs/customer-account-management-feature-integration-201907
originalArticleId: 6ac887b1-c311-4ebb-89a7-8fafe1e697d9
redirect_from:
  - /v4/docs/customer-account-management-feature-integration-201907
  - /v4/docs/en/customer-account-management-feature-integration-201907
---

{% info_block errorBox "Attention!" %}
The following feature integration guide expects the basic feature to be in place. The current feature integration guide only adds **Redirect support for Customer login functionality**.
{% endinfo_block %}

## Install Feature Frontend
### Prerequisites
Please overview and install the necessary features before beginning the integration step.

| Name | Version |
| --- | --- |
| Spryker Core | 201907.0 |

### 1) Install the required modules using Composer
Run the following command(s) to install the required modules:
```bash
composer require spryker-feature/customer-account-management: "^201907.0" --update-with-dependencies
```
{% info_block warningBox "Verification" %}
Make sure that the following modules were installed:<table><thead><tr><td>Module</td><td>Expected Directory</td></tr></thead><tbody><tr><td>`CustomerPage`</td><td>`vendor/spryker-shop/customer-page`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Behavior
Enable the following behaviors by registering the plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `RedirectUriCustomerRedirectStrategyPlugin` | Redirects just logged in Customer to the provided "redirectURI" in parameters. | None | `SprykerShop\Yves\CustomerPage\Plugin\CustomerPage` |

src/Pyz/Yves/CustomerPage/CustomerPageDependencyProvider.php

```php
<?php

namespace Pyz\Yves\CustomerPage;

use SprykerShop\Yves\CustomerPage\CustomerPageDependencyProvider as SprykerShopCustomerPageDependencyProvider;
use SprykerShop\Yves\CustomerPage\Plugin\CustomerPage\RedirectUriCustomerRedirectStrategyPlugin;

class CustomerPageDependencyProvider extends SprykerShopCustomerPageDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\CustomerPageExtension\Dependency\Plugin\CustomerRedirectStrategyPluginInterface[]
     */
    protected function getAfterLoginCustomerRedirectPlugins(): array
    {
        return [
            new RedirectUriCustomerRedirectStrategyPlugin(),
        ];
    }
}
```    

{% info_block warningBox "Verification" %}
Make sure, that when you follow the `https://mysprykershop.com/login?redirectUri=/cart` link, you are redirected to Cart page after login.
{% endinfo_block %}

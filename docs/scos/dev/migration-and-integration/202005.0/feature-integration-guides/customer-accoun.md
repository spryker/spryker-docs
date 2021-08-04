---
title: Customer Account Management Feature Integration
originalLink: https://documentation.spryker.com/v5/docs/customer-account-management-feature-integration
redirect_from:
  - /v5/docs/customer-account-management-feature-integration
  - /v5/docs/en/customer-account-management-feature-integration
---

{% info_block errorBox "Included features" %}

The following feature integration guide expects the basic feature to be in place. The current feature integration guide only adds:
* Redirect support for Customer login functionality.
* Password set and reset console commands for customers.
* Double opt-in for customer registration.

{% endinfo_block %}

## Install Feature Core

Follow the steps below to install the feature core.

### Prerequisites

Overview and install the necessary features before beginning the integration step.


| Name | Version |
| --- | --- |
| Spryker Core | dev-master |
	
### 1) Install the Required Modules Using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/customer-account-management: "^dev-master" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Ensure that the following modules have been installed:


| Module | Expected Directory |
| --- | --- |
| Customer | vendor/spryker/customer |

{% endinfo_block %}

### 2) Set up Transfer Objects

Run the following command to generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure that you have triggered the following changes in transfer objects:


| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| CustomerCriteriaFilterTransfer | class | created | src/Generated/Shared/Transfer/CustomerCriteriaFilterTransfer |

{% endinfo_block %}


			
			


### 3) Set up Behavior

Enable the following behaviors by registering the plugins:


| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| CustomerPasswordResetConsole | Generates password restoration keys and sends a password reset email to the customers without a password. Sends a password reset email to all the customers if the corresponding command option is provided. | None | SprykerShop\Zed\Customer\Communication\Console |
| CustomerPasswordSetConsole | Sends the password reset email to all the customers with the empty password value in the database. | None | SprykerShop\Zed\Customer\Communication\Console |

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\Customer\Communication\Console\CustomerPasswordResetConsole;
use Spryker\Zed\Customer\Communication\Console\CustomerPasswordSetConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Symfony\Component\Console\Command\Command[]
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new CustomerPasswordResetConsole(),
            new CustomerPasswordSetConsole(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that running the `console customer:password:reset`command sends the password reset emails to all customers:

1. Send the password reset email to all the customers inside the database:
```bash
console customer:password:reset
```

2. Open the `spy_customer.restore_password_key` table and ensure that all the customers have the password reset hash.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Ensure that running the `console customer:password:set`command sends the password reset emails to all the customers without passwords:
1. Send password reset emails to all the customers without passwords:

```bash
console customer:password:set
```

2. Open the  `spy_customer.restore_password_key` table and ensure that all the customers without passwords have the password reset hash.

{% endinfo_block %}




## Install Feature Front End
Follow the steps below to install the feature front end.

### Prerequisites
Overview and install the necessary features before beginning the integration step.

| Name | Version |
| --- | --- |
| Spryker Core | master |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:
```bash
composer require spryker-feature/customer-account-management: "^dev-master" --update-with-dependencies
```
{% info_block warningBox "Verification" %}

Ensure that the following modules were installed:
| Module | Expected Directory |
| --- | --- |
| `CustomerPage` | `vendor/spryker-shop/customer-page` |

{% endinfo_block %}

### 2) Set up Behavior
Enable the following behaviors by registering the plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `RedirectUriCustomerRedirectStrategyPlugin` | Redirects a customer who has just logged in to the `redirectURI` provided in parameters. | None | `SprykerShop\Yves\CustomerPage\Plugin\CustomerPage` |

**src/Pyz/Yves/CustomerPage/CustomerPageDependencyProvider.php**

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

Ensure, that when you open `https://mysprykershop.com/login?redirectUri=/cart`, you are redirected to *Cart* page after login.

{% endinfo_block %}


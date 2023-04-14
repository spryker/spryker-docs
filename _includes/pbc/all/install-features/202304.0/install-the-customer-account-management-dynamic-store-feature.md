
This document describes how to ingrate the Customer Account Management feature + Dynamis Store feature into a Spryker project.

## Install feature core

Follow the steps below to install the Customer Account Management feature + Dynamis Store feature.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |


### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require pryker-feature/customer-account-management:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}  

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| CustomerAccess | vendor/spryker/customer-access |

{% endinfo_block %}


### 2) Set up configuration

Add the following configuration to your project:

| CONFIGURATION  | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| CustomerConfig::getCustomerSequenceNumberPrefix() (See below in `src/Pyz/Zed/Customer/CustomerConfig.php`) | Provides a prefix used during customer reference generation. | Pyz\Zed\Customer |


**src/Pyz/Zed/Customer/CustomerConfig.php**

```php
<?php

namespace Pyz\Zed\Customer;

use Spryker\Zed\Customer\CustomerConfig as SprykerCustomerConfig;

class CustomerConfig extends SprykerCustomerConfig
{
    /**
     * {@inheritDoc}
     *
     * @return string|null
     */
    public function getCustomerSequenceNumberPrefix(): ?string
    {
        return 'customer';
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the following configuration has been set:

| CONFIGURATION | EXPECTED VALUE |
| --- | --- | --- |
| CustomerConfig::getCustomerSequenceNumberPrefix() | customer |

{% endinfo_block %}

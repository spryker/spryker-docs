This document describes how to install [Dynamic Multistore](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/dynamic-multistore-feature-overview.html) + the [Customer Account Management](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/customer-account-management-feature-overview/customer-account-management-feature-overview.html) feature.

## Install feature core

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |
| Customer Account Management | {{page.version}} |


### Set up configuration

Provide a prefix used during customer reference generation. If no prefix is provided, it will use the current store name, which can lead to issues in Dynamic Store setup.

Add the following configuration in `Pyz\Zed\Customer\CustomerConfig::getCustomerSequenceNumberPrefix()`.


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

1. [Create a customer](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/customers/create-customers.html).
2. On the **Customers** page, next to the created customer, click **View**.
3. On the **View Customer** page, make sure that the **Customer Reference** contains the prefix you've configured.



{% endinfo_block %}

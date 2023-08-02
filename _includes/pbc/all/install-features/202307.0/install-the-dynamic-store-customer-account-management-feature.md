{% info_block warningBox %}

Dynamic Multistore is currently running under an Early Access Release. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %} 

This document describes how to integrate the Dynamic Store + Customer Account Management feature into a Spryker project.

## Install feature core

Follow the steps below to install the Customer Account Management feature + Dynamic Store feature.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |
| Customer Account Management | {{page.version}} |


### Set up configuration

Add the following configuration to your project:

| CONFIGURATION  | SPECIFICATION                                                                                                                                                    | NAMESPACE |
| --- |------------------------------------------------------------------------------------------------------------------------------------------------------------------| --- |
| CustomerConfig::getCustomerSequenceNumberPrefix() (See below in `src/Pyz/Zed/Customer/CustomerConfig.php`) | Provides a prefix used during customer reference generation. If no prefix provided it will use current store name that can lead to issues in Dynamic Store setup | Pyz\Zed\Customer |


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

Steps: 

1. Go to the Customers page in the Back Office.
2. Click Add Customer in the top-right corner of the Customers page.
3. On the Add a customer page, enter the customer's information. The customer's information must include a first name, last name, and the email address that will be linked to the new account. The email address is important for completing the registration (by accessing the link that will be sent by email), or for later use of the forgot password functionality.
4. Send the password token by email by selecting the Send password token through email checkbox. After saving the customer data, an email will be sent to the customer containing a link. By accessing the link, the customer will be able to set a password for the account.
5. Click Save.
6. Check the customer on the detail page view. Customer Reference should be generated with the prefix that was set in the configuration.



{% endinfo_block %}

{% info_block warningBox %}

Dynamic Multistore is currently running under an Early Access Release. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.
{% endinfo_block %} 

This document describes how to integrate the Dynamic Store + Availability Notification feature into a Spryker project.

## Install feature core

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |
| Availability Notification | {{page.version}} |


### Set up configuration

Add the following configuration to your project:

| CONFIGURATION  | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| AvailabilityNotificationConstants::REGION_TO_YVES_HOST_MAPPING (See below in `config/Shared/config_default.php`) | Defines regions to Yves host mapping. | Spryker\Shared\AvailabilityNotification |


**config/Shared/config_default.php**

```php

<?php

use Spryker\Shared\AvailabilityNotification\AvailabilityNotificationConstants;

$config[AvailabilityNotificationConstants::REGION_TO_YVES_HOST_MAPPING] = [
    'EU' => getenv('SPRYKER_YVES_HOST_EU'),
    'US' => getenv('SPRYKER_YVES_HOST_US'),
];

```

{% info_block warningBox "Verification" %}  

To verify the email links are correct, make sure that the following configuration is correct:

1. Add a new product and make it unavailable.
2. As a customer, subscribe to its availability notifications on Yves.
3. Make the product available.
4. Check your mailbox for the email about the product’s availability.

Check that the link in the email is correct and leads to the product details page on Yves use the correct host.


{% endinfo_block %}


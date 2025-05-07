This document describes how to install [Dynamic Multistore](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/dynamic-multistore-feature-overview.html) + the [Availability Notification](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/availability-notification-feature-overview.html) feature.

## Install feature core

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |
| Availability Notification | {{page.version}} |


### Set up configuration

Add the following configuration:

| CONFIGURATION  | SPECIFICATION | NAMESPACE | COMMENTS |
| --- | --- | --- | --- |
| AvailabilityNotificationConstants::REGION_TO_YVES_HOST_MAPPING | Defines regions to Yves host mapping. | Spryker\Shared\AvailabilityNotification | See in `config/Shared/config_default.php` that follows. |


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
2. As a customer, subscribe to the product's availability notifications on the Storefront.
3. Make the product available.
4. In your mailbox, open the email about the product's availability.
5. Check if the link to the product opens the correct Product Details page.
    The link should have the correct hostname.


{% endinfo_block %}

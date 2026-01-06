

This document describes how to install the Glue API - Availability Notification feature.

Follow the steps below to integrate the Glue API - Availability Notification feature.

## Prerequisites

Install the required features:

| NAME | VERSION |
|-|-|
| Availability Notification | 202507.0 |

## 1) Install required modules using Composer

Install the required modules using Composer:

```bash
composer require spryker/availability-notifications-rest-api --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| AvailabilityNotificationsRestApi | vendor/spryker/availability-notifications-rest-api |

{% endinfo_block %}

## 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure that the following changes have occurred in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| RestAvailabilityNotificationRequestAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestAvailabilityNotificationRequestAttributesTransfer.php |
| RestAvailabilityNotificationsAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestAvailabilityNotificationsAttributesTransfer.php |
| AvailabilityNotificationSubscriptionCollectionTransfer | class | created | src/Generated/Shared/Transfer/AvailabilityNotificationSubscriptionCollectionTransfer.php |
| AvailabilityNotificationCriteriaTransfer | class | created | src/Generated/Shared/Transfer/AvailabilityNotificationCriteriaTransfer.php |

{% endinfo_block %}

## 3) Enable resources and relationships

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| AvailabilityNotificationsResourceRoutePlugin | Registers the availability-notifications resource. | None | Spryker\Glue\AvailabilityNotificationsRestApi\Plugin\GlueApplication |
| CustomerAvailabilityNotificationsResourceRoutePlugin | Registers the customers/{customerReference}/availability-notifications resource. | None | Spryker\Glue\AvailabilityNotificationsRestApi\Plugin\GlueApplication |
| MyAvailabilityNotificationsResourceRoutePlugin | Registers the my-availability-notifications resource. | None | Spryker\Glue\AvailabilityNotificationsRestApi\Plugin\GlueApplication |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\AvailabilityNotificationsRestApi\Plugin\GlueApplication\AvailabilityNotificationsResourceRoutePlugin;
use Spryker\Glue\AvailabilityNotificationsRestApi\Plugin\GlueApplication\CustomerAvailabilityNotificationsResourceRoutePlugin;
use Spryker\Glue\AvailabilityNotificationsRestApi\Plugin\GlueApplication\MyAvailabilityNotificationsResourceRoutePlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new AvailabilityNotificationsResourceRoutePlugin(),
            new CustomerAvailabilityNotificationsResourceRoutePlugin(),
            new MyAvailabilityNotificationsResourceRoutePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that you can send the following requests:

- `GET https://glue.mysprykershop.com/my-availability-notifications`
- `GET https://glue.mysprykershop.com/customers/{customerReference}/availability-notifications`
- `POST https://glue.mysprykershop.com/availability-notifications`

```json
{
    "data" : {
        "type" : "availability-notifications",
        "attributes" : {
            "sku" : {% raw %}{{{% endraw %}some_existing_sku{% raw %}}}{% endraw %},
            "email" : {% raw %}{{{% endraw %}some_valid_email{% raw %}}}{% endraw %}
        }
    }
}
```

- `DELETE https://glue.mysprykershop.com/availability-notifications/{subscription_key}`.

{% endinfo_block %}

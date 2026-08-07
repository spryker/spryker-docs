---
title: Install the Availability Notification Glue API
description: Learn how to integrate the Glue API - Availability Notification feature into your Spryker based project
last_updated: Aug 7, 2026
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/glue-api-availability-notification-feature-integration
originalArticleId: d9bc0dfd-658f-412c-a127-d967b568de67
redirect_from:
  - /docs/pbc/all/warehouse-management-system/latest/install-and-upgrade/install-features/install-the-availability-notification-glue-api.html
  - /2021080/docs/glue-api-availability-notification-feature-integration
  - /2021080/docs/en/glue-api-availability-notification-feature-integration
  - /docs/glue-api-availability-notification-feature-integration
  - /docs/en/glue-api-availability-notification-feature-integration
  - /docs/scos/dev/feature-integration-guides/201903.0/glue-api/glue-api-availability-notification-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/201907.0/glue-api/glue-api-availability-notification-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/202005.0/glue-api/glue-api-availability-notification-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/202311.0/glue-api/glue-api-availability-notification-feature-integration.html
  - /docs/pbc/all/warehouse-management-system/202204.0/base-shop/install-and-upgrade/install-features/install-the-availability-notification-glue-api.html
related:
  - title: Install the Availability Notification feature
    link: docs/pbc/all/warehouse-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-availability-notification-feature.html
  - title: Managing availability notifications
    link: docs/pbc/all/warehouse-management-system/latest/base-shop/manage-using-glue-api/glue-api-manage-availability-notifications.html
  - title: Retrieve subscriptions to availability notifications
    link: docs/pbc/all/warehouse-management-system/latest/base-shop/manage-using-glue-api/glue-api-retrieve-subscriptions-to-availability-notifications.html
---

This document describes how to install the Glue API - Availability Notification feature.

Follow the steps below to integrate the Glue API - Availability Notification feature.

## Prerequisites

Install the required features:

| NAME | VERSION |
|-|-|
| Availability Notification | {{page.release_tag}} |

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

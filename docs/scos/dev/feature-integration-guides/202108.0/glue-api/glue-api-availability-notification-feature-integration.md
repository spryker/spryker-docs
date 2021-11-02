---
title: Glue API - Availability Notification feature integration
description: Integrate the Glue API - Availability Notification feature into your project
last_updated: Jun 18, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/glue-api-availability-notification-feature-integration
originalArticleId: d9bc0dfd-658f-412c-a127-d967b568de67
redirect_from:
  - /2021080/docs/glue-api-availability-notification-feature-integration
  - /2021080/docs/en/glue-api-availability-notification-feature-integration
  - /docs/glue-api-availability-notification-feature-integration
  - /docs/en/glue-api-availability-notification-feature-integration
---

This document describes how to integrate the Glue API - Availability Notification feature into a Spryker project.

Follow the steps below to integrate the Glue API - Availability Notification feature.

## Prerequisites
To start feature integration, overview and install the necessary features:

| NAME | VERSION |
|-|-|
| Availability Notification | {{page.version}} |

## 1) Install required modules using Composer

Install the required modules:
```bash
composer require spryker/availability-notifications-rest-api --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Ensure that the following modules have been installed:

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

* `GET http://glue.mysprykershop.com/my-availability-notifications`

* `GET http://glue.mysprykershop.com/customers/{customerReference}/availability-notifications`

* `POST http://glue.mysprykershop.com/availability-notifications`

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

* `DELETE http://glue.mysprykershop.com/availability-notifications/{subscription_key}`.

{% endinfo_block %}

---
title: Availability Notification feature walkthrough
last_updated: Aug 12, 2021
description: The Availability Notification feature allows customers to subscribe to product availability notifications of out-of-stock products.
template: concept-topic-template
---

The _Availability Notification_ feature allows customers to subscribe to product availability notifications to receive emails when an out-of-stock product is back in stock.


To learn more about the feature and to find out how end users use it, see [Availability Notification feature overview](/docs/scos/user/features/{{page.version}}/availability-notification-feature-overview.html) for business users.


## Entity diagram

The following scheme illustrates relations between Availability, `AvailabilityNotification`, `AvailabilityNotificationWidget`, and `ProductDetailPage` modules:

<div class="width-100">

![availability-notification-entity-diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Mailing+&+Communication/Product+is+Available+Again/module-diagram.png)

</div>


## Related Developer articles

|INTEGRATION GUIDES  | GLUE API GUIDES  |
|---------|---------|
| [Availability Notification feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/availability-notification-feature-integration.html)  | [Managing availability notifications](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/managing-availability-notifications/managing-availability-notifications.html)  |
| [Glue API: Availability Notification feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-availability-notification-feature-integration.html) | [Retrieving subscriptions to availability notifications](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/managing-availability-notifications/retrieving-subscriptions-to-availability-notifications.html)  |

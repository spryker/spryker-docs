---
title: Availability Notification feature overview
description: The feature lets registered and guest users subscribe to the newsletter by specifying the email address they wish to receive the notifications to
last_updated: Aug 12, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/availability-notification-feature-overview
originalArticleId: 12e075cf-e5a0-4281-bef7-73f3b724bf35
redirect_from:
  - /2021080/docs/availability-notification-feature-overview
  - /2021080/docs/en/availability-notification-feature-overview
  - /docs/availability-notification-feature-overview
  - /docs/en/availability-notification-feature-overview
  - /docs/scos/user/features/202311.0/availability-notification-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/202311.0/checkout-feature-walkthrough.html
  - /docs/pbc/all/warehouse-management-system/202204.0/base-shop/availability-notification-feature-overview.html
---

When customers visit an out-of-stock product page, they usually search for the shop which has the product in stock. The Back Office user of the original store can replenish the stock; however, it does not mean that the customer is still there to buy it. The *Availability Notification* feature provides a way to notify you about the demand for the product, so you can prioritize the product replenishment and notify the customer once it's available again.

The feature works in the form of a newsletter for both guest and registered users. Guest users subscribe by entering the email address they want to receive the notification to:
![Guest subscription](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Mailing+&+Communication/Product+is+Available+Again/guest-subscription.png)

Registered users subscribe to the newsletter in the same way, but the email address set up in their account is already entered when they visit a page with an out-of-stock product:
![Registered user subscription](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Mailing+&+Communication/Product+is+Available+Again/registered-user-subscription.png)

Registered users can change the pre-entered email address to any other one.

Once a customer subscribed, the email address input field is replaced with the **Do not notify me when back in stock** button.
![Do not notify me when back in stock button](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Mailing+&+Communication/Product+is+Available+Again/do-not-notify-button.png)

An email about a successful subscription is sent to the entered email address:
![Email about successful subscription](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Mailing+&+Communication/Product+is+Available+Again/successful-subscription.png)

If a customer clicks **Do not notify me when back in stock**, they receive an email about a successful cancellation of the subscription:
![Cancellation of subscription](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Mailing+&+Communication/Product+is+Available+Again/successful-unsubscription.png)

Those who subscribed to the newsletter receive an email once the product is available, no matter how the availability status becomes positive.
![Product is available](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Mailing+&+Communication/Product+is+Available+Again/product-is-available.png)

{% info_block infoBox %}

Each email sent as a part of the subscription contains the **unsubscribe from this list** button, as shown on the preceding screenshot.

{% endinfo_block %}

A Back Office user cannot manage newsletter subscriptions.

A developer can manage the newsletter text files in `/src/Spryker/Zed/AvailabilityNotification/Presentation/Mail` and check the list of subscriptions in the `spy_availability_subscription`database table.

## Related Developer documents

|INSTALLATION GUIDES  | GLUE API GUIDES  |
|---------|---------|
| [Install the Availability Notification feature](/docs/pbc/all/warehouse-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-availability-notification-feature.html)  | [Manage availability notifications](/docs/pbc/all/warehouse-management-system/latest/base-shop/manage-using-glue-api/glue-api-manage-availability-notifications.html)  |
| [Install the Availability Notification Glue API](/docs/pbc/all/warehouse-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-availability-notification-glue-api.html) | [Retrieve subscriptions to availability notifications](/docs/pbc/all/warehouse-management-system/latest/base-shop/manage-using-glue-api/glue-api-retrieve-subscriptions-to-availability-notifications.html)  |

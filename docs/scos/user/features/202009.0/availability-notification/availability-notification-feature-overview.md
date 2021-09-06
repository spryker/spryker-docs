---
title: Availability  Notification feature overview
description: The feature allows both registered and guest users to subscribe to the newsletter by specifying the email address they wish to receive the notifications to
originalLink: https://documentation.spryker.com/v6/docs/availability-notification-feature-overview
originalArticleId: 431d46cc-b57f-410a-a2f0-9bf0c6fa12a3
redirect_from:
  - /v6/docs/availability-notification-feature-overview
  - /v6/docs/en/availability-notification-feature-overview
---

When customers visit an out-of-stock product’s page, they usually search for the shop which has the product in stock. The Back Office user of the original store will replenish the stock; however, it does not mean that the customer will still be there to buy it. The *Availability Notification* feature provides a way to notify you about the demand for the product, so you can prioritize the product replenishment and notify the customer once it is done.
The feature works in the form of a newsletter for both guest users and registered ones. Guest users subscribe by entering the email address they would like to receive the notification to:
![Guest subscription](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Mailing+&+Communication/Product+is+Available+Again/guest-subscription.png)

Registered users subscribe to the newsletter in the same way, but the email address set up in their account is already entered when they visit a page with an out-of-stock product:
![Registered user subscription](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Mailing+&+Communication/Product+is+Available+Again/registered-user-subscription.png)

Registered users can change the pre-entered email address to any other one.

Once a customer subscribed, the email address input field is replaced with the **Do not notify me when back in stock** button.
![Do not notify me when back in stock button](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Mailing+&+Communication/Product+is+Available+Again/do-not-notify-button.png)

An email about a successful subscription is sent to the entered email address:
![Email about successful subscription](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Mailing+&+Communication/Product+is+Available+Again/successful-subscription.png)

If a customer clicks **Do not notify me when back in stock**, they will receive an email about a successful cancellation of the subscription:
![Cancellation of subscription](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Mailing+&+Communication/Product+is+Available+Again/successful-unsubscription.png)

Those who subscribed to the newsletter will receive an email once the product is available, no matter how the availability status  becomes positive.
![Product is available](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Mailing+&+Communication/Product+is+Available+Again/product-is-available.png)

{% info_block infoBox %}
Each email sent as a part of the subscription contains the unsubscribe from this list button as shown on the screenshot above.
{% endinfo_block %}

Currently, there is no Zed UI for the feature. The newsletter text files are located in `/src/Spryker/Zed/AvailabilityNotification/Presentation/Mail`.

A Back Office user can check the list of subscriptions in the `spy_availability_subscription`database table.




---
title: Availability  Notification feature overview
description: The feature allows both registered and guest users to subscribe to the newsletter by specifying the email address they wish to receive the notifications to
last_updated: Jan 8, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v4/docs/back-in-stock-notification-feature-overview
originalArticleId: b58e715c-adce-4830-9036-637b5817f5f1
redirect_from:
  - /v4/docs/back-in-stock-notification-feature-overview
  - /v4/docs/en/back-in-stock-notification-feature-overview
  - /v4/docs/back-in-stock-notification
  - /v4/docs/en/back-in-stock-notification
---

When customers visit an out-of-stock product’s page, they usually search for the shop which has the product in stock. The Back Office user of the original store can replenish the stock; however, it does not mean that the customer is still be there to buy it. The *Availability Notification* feature provides a way to notify you about the demand for the product, so you can prioritize the product replenishment and notify the customer once it is available again.

The feature works in the form of a newsletter for both guest and registered users. Guest users subscribe by entering the email address they would like to receive the notification to:
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
Each email sent as a part of the subscription contains the **unsubscribe from this list** button as shown on the screenshot above.
{% endinfo_block %}

Currently, a Back Office user cannot manage newsletter subscriptions.

A developer can manage the newsletter text files in `/src/Spryker/Zed/AvailabilityNotification/Presentation/Mail` and check the list of subscriptions in the `spy_availability_subscription`database table.

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Availability Notification feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/availability-notification-feature-walkthrough.html) for developers.

{% endinfo_block %}

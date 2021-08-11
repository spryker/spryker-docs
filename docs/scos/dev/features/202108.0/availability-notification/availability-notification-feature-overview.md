---
title: Availability  Notification feature overview
description: The feature allows both registered and guest users to subscribe to the newsletter by specifying the email address they wish to receive the notifications to
originalLink: https://documentation.spryker.com/2021080/docs/availability-notification-feature-overview
redirect_from:
  - /2021080/docs/availability-notification-feature-overview
  - /2021080/docs/en/availability-notification-feature-overview
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




## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/managing-availability-notifications" class="mr-link">Manage availability notifications via Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/availability-notifications-module-relations" class="mr-link">See the module relations for the Availability Notifications feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/retrieving-subscriptions-to-availability-notifications" class="mr-link">Retrieve subscriptions to availability notifications via Glue API</a></li>                
                <li><a href="https://documentation.spryker.com/docs/availability-notification-feature-integration" class="mr-link">Integrate the Availability Notification feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/glue-api-availability-notification-feature-integration" class="mr-link">Integrate the Availability Notification Glue API</a></li>
            </ul>
        </div>
        </div>
</div> 

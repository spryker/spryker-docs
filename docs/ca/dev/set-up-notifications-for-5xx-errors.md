---
title: Set up a notifications for 5xx errors
description: Set up email notifications for 5xx errors in Spryker Cloud using AWS Simple Notification Service, ensuring prompt alerts for server issues impacting performance.
template: howto-guide-template
last_updated: Oct 6, 2023
redirect_from:
  - /docs/cloud/dev/spryker-cloud-commerce-os/setting-up-notifications-for-5xx-errors.html
---

This document describes how to set up email notifications for 5xx errors via [Simple Notification Service](https://docs.aws.amazon.com/sns/latest/dg/welcome.html). The notifications are sent if, during a two-minute period, more than 20% of requests are getting 5xx responses.


To set up the notifications, do the following:

1. In the AWS Management Console, go to **Services** > **[Simple Notification Service](https://eu-central-1.console.aws.amazon.com/sns)**.

2. In the navigation pane, select **Topics**.

3. In the *Topics* list, select the `{environment_name}>-allowed-cloudwatch_alarms` topic.


4. On the topic's page, select *Create subscription*.

5. On the *Create subscription* page, for **Protocol**, select **Email**.
  This adds the **Endpoint** field.

6. For **Endpoint**, enter the email address you want to receive the notifications to.

7. Select **Create subscription**.
  This opens the page of the subscription with the success message displayed.

8. To confirm the subscription, navigate to your mailbox and, in the confirmation email, select the confirmation link.
  This opens the confirmation page with the success message displayed.

{% info_block warningBox "Verification" %}

Return to the subscription's page in the AWS Management Console. Refresh the page and check that the subscription's status is *Confirmed*.

{% endinfo_block %}


You've set up the notifications and will receive emails about 5xx errors to the specified email address.

---
title: Mailing and Notifications feature overview
last_updated: Nov 18, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v5/docs/mailing-communication
originalArticleId: 1ebba1fb-9858-4684-b6eb-f3e70c5082e1
redirect_from:
  - /v5/docs/mailing-communication
  - /v5/docs/en/mailing-communication
  - /v5/docs/newsletter-subscription
  - /v5/docs/en/newsletter-subscription
  - /v5/docs/transactional-email-management
  - /v5/docs/en/transactional-email-management
---

The *Mailing & Notifications* feature allows you to manage newsletters and notifications.

## Newsletter subscriptions

Offer Newsletter Subscriptions to your customers to increase loyalty. Send updates on product related news, special offers or any other update you wish to share. The Spryker Commerce OS offers opt-in and opt-out options.

The newsletter subscription locates in the **Newsletter** section of the user profile.

All your customers need to do is to agree for the newsletter subscription. Once they submit the agreement form, an email is triggered to confirm that the request is received and the sign-up is successful.

![Newsletter](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Mailing+%26+Communication/Newsletter+Subscription/subscribe-to-the-newsletter.gif)

## Transactional email management

Keep your customers updated with a variety of emails you can either send via the internal SMTP system or an external email provider of your choice.

Automated Emails regarding order status, shipping or transactions are just a few examples of how you can support the purchase process and increase brand loyalty.

The following links provide additional information about the Mail module, plugins, and procedures:

*  `MailTypePlugin` creation and  registration—[HowTo - Create and Register a MailTypePlugin](/docs/scos/dev/tutorials-and-howtos/howtos/howto-create-and-register-a-mailtypeplugin.html)
*  `MailProviderPlugin` general overview and the registration procedure—[HowTo - Create and Register a Mail Provider](/docs/scos/dev/tutorials-and-howtos/howtos/howto-create-and-register-a-mail-provider.html)
*  Tutorial that helps to understand the procedure for sending an email—[Tutorial - Sending a Mail](/docs/scos/dev/tutorials-and-howtos/introduction-tutorials/tutorial-sending-an-email.html).


{% info_block warningBox "Developer guides" %}

Are you a developer? See [Mailing & Notification feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/mailing-and-notifications-feature-walkthrough.html) for developers.

{% endinfo_block %}

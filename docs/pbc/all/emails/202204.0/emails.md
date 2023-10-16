---
title: Emails
last_updated: Jul 22, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/mailing-notifications-feature-overview
originalArticleId: 12c026d5-7e62-4361-9f6c-02423aae791c
redirect_from:
  - /2021080/docs/mailing-notifications-feature-overview
  - /2021080/docs/en/mailing-notifications-feature-overview
  - /docs/mailing-notifications-feature-overview
  - /docs/en/mailing-notifications-feature-overview
  - /docs/scos/user/features/202200.0/mailing-and-notifications-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/202200.0/mailing-and-notifications-feature-walkthrough.html  
---

The *Emails* capability lets you manage newsletters and notifications.

## Newsletter subscriptions

This feature allows you to offer Newsletter subscriptions to your customers to increase loyalty. Send updates on product-related news, special offers, or any other update you wish to share. The Spryker Commerce OS offers opt-in and opt-out options for handling newsletters.

The newsletter subscription is located in the **Newsletter** section of the user profile.

All your customers need to do is to subscribe to the newsletter. Once they submit the agreement form, an email is sent to confirm that the request was received and the sign-up was successful.

![Newsletter](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Mailing+%26+Communication/Newsletter+Subscription/subscribe-to-the-newsletter.gif)

## Transactional email management

Keep your customers updated with a variety of emails you can either send by the internal SMTP system, or by an external email provider of your choice.

Automated emails about the status of your order, shipping, or transactions are just a few examples of how you can support the purchase process and increase brand loyalty.

The following links provide additional information about the Mail module, its plugins, and procedures:

* `MailTypePlugin` creation and registration—[HowTo: Create and register a `MailTypePlugin`](/docs/pbc/all/emails/{{page.version}}/howto-create-and-register-a-mailtypeplugin.html)
* `MailProviderPlugin` general overview and the registration procedure—[HowTo: Create and register a mail provider](/docs/pbc/all/emails/{{page.version}}/howto-create-and-register-a-mail-provider.html)
* A tutorial about the procedure for sending an email—[Tutorial: Sending a mail](/docs/pbc/all/emails/{{page.version}}/tutorial-sending-an-email.html).


## Related Developer documents

 | TUTORIALS AND HOWTOS |
|---------|
| [HowTo: Create and Register a MailTypePlugin](/docs/pbc/all/emails/{{page.version}}/howto-create-and-register-a-mailtypeplugin.html) |
| [HowTo: Create and Register a Mail Provider](/docs/pbc/all/emails/{{page.version}}/howto-create-and-register-a-mail-provider.html)  |
| [HowTo: Create and register a MailTypeBuilderPlugin](/docs/pbc/all/emails/{{page.version}}/howto-create-and-register-a-mail-type-builder-plugin.html) |
| [Tutorial: Sending an email](/docs/pbc/all/emails/{{page.version}}/tutorial-sending-an-email.html)  |

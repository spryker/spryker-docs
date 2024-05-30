---
title: Email service
description: SCCOS is shipped with Amazon Simple Email Service
last_updated: Dec 15, 2023
template: concept-topic-template
---
{% info_block warningBox %}

By default, production and non production SES accounts are sandboxed. This means, that emails can only be sent to emails that have been verified beforehand. This is done to prevent potentially unfinished features/functions from sending spam emails and damaging the email service's or mail domain's reputation. 
- Non production environment should not normally be moved out of the SES Sandbox.
- Production environments can be moved out of the SES Sandbox during go live preparation and once your sender email domain has been verified. You can find the corresponding request under "Infrastructure Change Request/Access Management" in our Case Assistant in both Partner and Support Portal.

{% endinfo_block %}

There is the native mail service included with Spryker Cloud Commerce OS - [Amazon Simple Email Service](https://console.aws.amazon.com/ses/). You can use it as is or integrate a third-party service. If you choose to use it, keep the following in mind:

- To send emails from an email address, verification is required. For details, see [Verify email addresses](/docs/ca/dev/email-service/verify-email-addresses.html).
- Emails are subject to quota restrictions. For details, see [Email quota restrictions](/docs/ca/dev/email-service/email-quota-restrictions.html).

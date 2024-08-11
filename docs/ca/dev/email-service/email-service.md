---
title: Email service
description: SCCOS is shipped with Amazon Simple Email Service
last_updated: Dec 15, 2023
template: concept-topic-template
---

There is the native mail service included with Spryker Cloud Commerce OS - [Amazon Simple Email Service](https://console.aws.amazon.com/ses/). You can use it as is or integrate a third-party service. If you choose to use it, keep the following in mind:

- To send emails from an email address, verification is required. For details, see [Verify email addresses](/docs/ca/dev/email-service/verify-email-addresses.html).
- Emails are subject to quota restrictions. For details, see [Email quota restrictions](/docs/ca/dev/email-service/email-quota-restrictions.html).

{% info_block warningBox %}

By default, production and non-production SES accounts are sandboxed. Emails can only be sent to emails that were verified beforehand. This prevents potentially unfinished features or functions from sending spam emails and damaging the email service's or mail domain's reputation.
- Non-production environment shouldn't normally be moved out of SES sandbox.
- Production environments can be moved out of SES sandbox during the go-live preparation and once your sender email domain was verified. You can find the corresponding request under "Infrastructure Change Request/Access Management" in our Case Assistant in both Partner and Support Portals.

{% endinfo_block %}

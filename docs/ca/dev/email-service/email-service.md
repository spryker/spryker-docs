---
title: Email service
description: Set up email services in Spryker Cloud Commerce OS with Amazon SES, covering email verification, quota restrictions, and third-party service integration.
last_updated: Aug 19, 2026
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

## Email sending error handling

When an email fails to send—for example, because the SES account is in sandbox mode and the recipient or sender address is not verified—the system handles the failure gracefully instead of throwing an unhandled exception. The behavior varies by application layer:

| Layer | Behavior on email failure |
| --- | --- |
| **All layers** | The error is logged centrally with the SMTP error code, sender address, recipient addresses, and exception message. The application continues operating without interruption. |
| **Yves (Storefront)** | The user sees a notification with the error message. For flows where email is secondary (for example, customer registration), the primary action still completes successfully. For flows where email is the primary action (for example, forgot password), the action is marked as failed. |
| **Back Office (OMS)** | Order management processes like order confirmation or shipment notification continue executing. The email failure is logged but does not block the OMS transition. |
| **Back Office (non-OMS)** | Actions like company deactivation or user password reset complete successfully. The email failure is logged. |
| **Merchant Portal** | The process continues without interruption. The email failure is logged. |
| **Glue API** | When email is the primary action (for example, forgot password), the API returns HTTP 422 with error details. When email is secondary (for example, registration), the API returns a success response. |

The error message format is: `The email failed to send. Error code: [SMTP_CODE].`

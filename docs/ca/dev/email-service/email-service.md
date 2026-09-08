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

When an email fails to send—for example, because the SES account is in sandbox mode and the recipient or sender address is not verified—the system handles the failure gracefully instead of throwing an unhandled exception.

All email errors are caught in a single place—`MailHandler::sendMail()`—so individual callers like customer registration, password reset, or OMS don't need their own error handling. The behavior varies by context:

| Context | Behavior on email failure |
| --- | --- |
| **All contexts** | The error is logged with the error code, mail type, and exception message. The application continues operating without interruption. |
| **Yves (Storefront)** | A translated flash message is shown to the user via the Messenger. The primary action (for example, registration) still completes successfully. |
| **Back Office** | A translated flash message is shown to the user via the Messenger. Actions like company deactivation or user password reset complete successfully. |
| **OMS** | Order management processes like order confirmation or shipment notification continue executing. The email failure is logged but does not block the OMS transition. No flash message is shown because OMS runs in CLI context. |
| **CLI** | No flash messages are added. CLI context is excluded from Messenger notifications by default. |
| **Glue API** | For the forgot-password endpoint, the API returns HTTP 422 with error details. For other flows, the API returns a success response. Messenger flash messages are not used for API responses. |

### Error message translation

The user-facing error message uses the glossary key `mail.error.send_failed` with a `%errorCode%` parameter. Default translations:

| Locale | Translation |
| --- | --- |
| en_US | The email failed to send. Error code: %errorCode%. |
| de_DE | Die E-Mail konnte nicht gesendet werden. Fehlercode: %errorCode%. |

To customize the message, update the glossary key in your project's `glossary.csv` or through the Back Office glossary management.

### Suppressing flash messages in specific contexts

By default, Messenger error notifications are suppressed in CLI context (for example, OMS console commands) and enabled everywhere else (Back Office, Merchant Portal, Storefront). To customize this behavior, override `MailHandler::isMessengerNotificationEnabled()` at the project level.

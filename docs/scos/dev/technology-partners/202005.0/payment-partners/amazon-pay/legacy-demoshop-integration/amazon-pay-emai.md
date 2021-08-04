---
title: Amazon Pay - Email Notifications
originalLink: https://documentation.spryker.com/v5/docs/amazon-pay-email-notification-demoshop
redirect_from:
  - /v5/docs/amazon-pay-email-notification-demoshop
  - /v5/docs/en/amazon-pay-email-notification-demoshop
---

Since Amazon Pay requires some emails being sent in specific situations, please implement on a project level following authorization status update logic.

### UpdateOrderAuthorizationStatusTransaction

Once the order authorization state is <b>Suspended</b>, the customer should receive an email stating that the order requires customer's interaction.

Suggested email template for <b>Suspended</b> status is:

<b>Theme:</b> Please update your payment information

<b>Content:</b>

```xml
Valued customer,

Thank you very much for your order at Spryker Shop.
Amazon Pay was not able to process your payment.
Please navigate to
https://payments.amazon.com/en/jr/your-account/orders?language=en_GB
and update the payment information for your order. Afterward, we will
automatically request payment again from Amazon Pay and you will receive a
confirmation email.

Kind regards
```

Once the order authorization is <b>Declined</b>, the customer should receive an email stating that the order requires customer's interaction.

Suggested email template for <b>Declined</b> status is:

<b>Theme:</b> Please contact us regarding your order

<b>Content:</b>

```xml
Valued customer,

Unfortunately, Amazon Pay declined the payment for your order in our online
Spryker Shop.
Please contact us.

Kind regards
```

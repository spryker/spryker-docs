---
title: Amazon Pay - Email Notifications
description: You can find the details for authorization status update logic in the Spryker Legacy Demoshop.
originalLink: https://documentation.spryker.com/2021080/docs/amazon-pay-email-notification-demoshop
originalArticleId: 66796b86-547a-43d9-a154-059398639191
redirect_from:
  - /2021080/docs/amazon-pay-email-notification-demoshop
  - /2021080/docs/en/amazon-pay-email-notification-demoshop
  - /docs/amazon-pay-email-notification-demoshop
  - /docs/en/amazon-pay-email-notification-demoshop
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

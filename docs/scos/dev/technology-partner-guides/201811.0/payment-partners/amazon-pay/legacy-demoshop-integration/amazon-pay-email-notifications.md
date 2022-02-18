---
title: Amazon Pay - Email Notifications
description: You can find the details for authorization status update logic in the Spryker Legacy Demoshop.
last_updated: Oct 23, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v1/docs/amazon-pay-email-notification-demoshop
originalArticleId: f989f6a4-f4cb-404f-bf74-8f3f8244fd59
redirect_from:
  - /v1/docs/amazon-pay-email-notification-demoshop
  - /v1/docs/en/amazon-pay-email-notification-demoshop
related:
  - title: Obtaining an Amazon Order Reference and information about shipping addresses
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/obtaining-an-amazon-order-reference-and-information-about-shipping-addresses.html
  - title: Amazon Pay - Rendering a “Pay with Amazon” Button on the Cart Page
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-rendering-a-pay-with-amazon-button-on-the-cart-page.html
  - title: Amazon Pay - State Machine
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-state-machine.html
  - title: Amazon Pay - Support of Bundled Products
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-support-of-bundled-products.html
  - title: Handling orders with Amazon Pay API
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/handling-orders-with-amazon-pay-api.html
  - title: Amazon Pay - Order Reference and Information about Shipping Addresses
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-order-reference-and-information-about-shipping-addresses.html
  - title: Configuring Amazon Pay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/configuring-amazon-pay.html
  - title: Amazon Pay - Sandbox Simulations
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/amazon-pay-sandbox-simulations.html
  - title: Handling orders with Amazon Pay API
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/legacy-demoshop-handling-orders-with-amazon-pay-api.html
  - title: Amazon Pay - Sandbox Simulations
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-sandbox-simulations.html
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

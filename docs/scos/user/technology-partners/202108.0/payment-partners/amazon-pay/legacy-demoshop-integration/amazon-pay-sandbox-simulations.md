---
title: Amazon Pay - Sandbox Simulations
description: In this article, you can get information about sandbox simulations for the Amazon Pay module in Spryker Legacy Demoshop.
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/amazon-pay-simulations-demoshop
originalArticleId: ab5dadb3-318e-43cf-bb32-c7f1572203c8
redirect_from:
  - /2021080/docs/amazon-pay-simulations-demoshop
  - /2021080/docs/en/amazon-pay-simulations-demoshop
  - /docs/amazon-pay-simulations-demoshop
  - /docs/en/amazon-pay-simulations-demoshop
related:
  - title: Amazon Pay - Configuration for the Legacy Demoshop
    link: docs/scos/user/technology-partners/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-configuration-for-the-legacy-demoshop.html
  - title: Amazon Pay - Refund
    link: docs/scos/user/technology-partners/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-refund.html
  - title: Amazon Pay - API
    link: docs/scos/user/technology-partners/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-api.html
  - title: Amazon Pay - Email Notifications
    link: docs/scos/user/technology-partners/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-email-notifications.html
  - title: Amazon Pay - State Machine
    link: docs/scos/user/technology-partners/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-state-machine.html
  - title: Amazon Pay - Order Reference and Information about Shipping Addresses
    link: docs/scos/user/technology-partners/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-order-reference-and-information-about-shipping-addresses.html
  - title: Amazon Pay - Support of Bundled Products
    link: docs/scos/user/technology-partners/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-support-of-bundled-products.html
  - title: Amazon Pay - Rendering a “Pay with Amazon” Button on the Cart Page
    link: docs/scos/user/technology-partners/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-rendering-a-pay-with-amazon-button-on-the-cart-page.html
---

In order to reproduce some edge cases like declined payment or pending capture, Amazon provides two solutions. The first is special methods marked with a red star on payment widget.

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Amazon+Pay/amazon_payment_widget.png)

It allows reproducing different cases of `decline` payment workflow.

But there are more edge cases like expired authorization or pending capture for which there is only one way to reproduce - pass simulation string as `SellerNote` parameter of API request.

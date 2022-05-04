---
title: Amazon Pay - Refund
description: This article contain information on the refund process for the Amazon Pay module in Spryker.
last_updated: Aug 27, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/amazon-pay-refund-demoshop
originalArticleId: 410e67bd-ed67-4050-81f6-a4323bb00f1d
redirect_from:
  - /v6/docs/amazon-pay-refund-demoshop
  - /v6/docs/en/amazon-pay-refund-demoshop
related:
  - title: Amazon Pay - Configuration for the Legacy Demoshop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-configuration-for-the-legacy-demoshop.html
  - title: Handling orders with Amazon Pay API
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/legacy-demoshop-handling-orders-with-amazon-pay-api.html
  - title: Amazon Pay - Email Notifications
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-email-notifications.html
  - title: Amazon Pay - Sandbox Simulations
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-sandbox-simulations.html
  - title: Amazon Pay - State Machine
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-state-machine.html
  - title: Amazon Pay - Order Reference and Information about Shipping Addresses
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-order-reference-and-information-about-shipping-addresses.html
  - title: Amazon Pay - Support of Bundled Products
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-support-of-bundled-products.html
  - title: Amazon Pay - Rendering a “Pay with Amazon” Button on the Cart Page
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-rendering-a-pay-with-amazon-button-on-the-cart-page.html
---

After the successful authorization and capture processes, the order should be closed. This blocks any modifications to an order. From this state only Refund operation is possible. The refund can be partial if more than one item is set to refund or full.

Amazon only requires the amount of money which has to be refunded, and the calculation has to be implemented on the shop's side. Spryker OS provides a module for calculating the amount to refund. Regardless of the chosen setting, the refund is always asynchronous. Once requested, an order goes to "refund pending" status and then IPN notification will notify the shop if the refund was accepted or declined.

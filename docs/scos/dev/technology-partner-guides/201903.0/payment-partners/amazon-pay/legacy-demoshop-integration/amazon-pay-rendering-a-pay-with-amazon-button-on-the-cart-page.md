---
title: Amazon Pay - Rendering a “Pay with Amazon” Button on the Cart Page
description: This article describes the way how to render the Pay with Amazon button on the cart page.
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v2/docs/amazon-pay-rendering-pay-demoshop
originalArticleId: 6e0d1b73-f57e-4208-b654-b8fb22c24641
redirect_from:
  - /v2/docs/amazon-pay-rendering-pay-demoshop
  - /v2/docs/en/amazon-pay-rendering-pay-demoshop
related:
  - title: Obtaining an Amazon Order Reference and information about shipping addresses
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/obtaining-an-amazon-order-reference-and-information-about-shipping-addresses.html
  - title: Amazon Pay - Support of Bundled Products
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-support-of-bundled-products.html
  - title: Amazon Pay - Refund
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-refund.html
  - title: Handling orders with Amazon Pay API
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/handling-orders-with-amazon-pay-api.html
  - title: Configuring Amazon Pay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/configuring-amazon-pay.html
  - title: Amazon Pay - Sandbox Simulations
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/amazon-pay-sandbox-simulations.html
  - title: Handling orders with Amazon Pay API
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/legacy-demoshop-handling-orders-with-amazon-pay-api.html
  - title: Amazon Pay - Sandbox Simulations
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-sandbox-simulations.html
  - title: Amazon Pay - Email Notifications
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-email-notifications.html
  - title: Amazon Pay - Order Reference and Information about Shipping Addresses
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-order-reference-and-information-about-shipping-addresses.html
---

Usually the checkout page includes information for the buyer to review, items in the cart, prices, total price information and some other order related details.

From this page, the buyer can proceed to checkout by clicking a related GUI element (for example hyperlink or button).

Amazon Pay provides its own GUI element, a button which renders by Amazon Javascript code snippet and looks as follows:
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Amazon+Pay/amazonpay_button.png)   

If the buyer is a registered Amazon customer, clicking the button prompts to enter their Amazon login and password.

If correct, Amazon creates an order reference and passes it to the shop.

Using this reference and Amazon Pay credentials it is possible to run Handling orders with Amazon Pay API queries.

**To insert the Amazon Pay button in your shop, add the following widget on your page:**:
```xml
{% raw %}{{{% endraw %} render(path('amazonpay_paybutton')) {% raw %}}}{% endraw %}
```

Configuration is used from your current settings profile.

**Results**:

If everything was done properly, the clickable button will be displayed and by clicking it, the user will see a popup window with Amazon prompt to login.

The Popup looks as follows:
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Amazon+Pay/amazon_popup.png) 

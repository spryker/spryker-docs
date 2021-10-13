---
title: Heidelpay - Workflow for Errors
description: This article describes the procedure for handling errors in Heidelpay.
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/heidelpay-error-workflow
originalArticleId: 713eed1e-896c-4cff-a82f-00472ce39c45
redirect_from:
  - /v3/docs/heidelpay-error-workflow
  - /v3/docs/en/heidelpay-error-workflow
related:
  - title: Heidelpay
    link: docs/scos/user/technology-partners/201811.0/payment-partners/heidelpay/heidelpay.html
  - title: Heidelpay - Credit Card Secure
    link: docs/scos/user/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-payment-methods/heidelpay-credit-card-secure.html
  - title: Heidelpay - Configuration for SCOS
    link: docs/scos/user/technology-partners/201811.0/payment-partners/heidelpay/scos-integration/heidelpay-configuration-for-scos.html
  - title: Heidelpay - Integration into the Legacy Demoshop
    link: docs/scos/user/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-integration-into-the-legacy-demoshop.html
  - title: Heidelpay - Paypal Authorize
    link: docs/scos/user/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-payment-methods/heidelpay-paypal-authorize.html
  - title: Heidelpay - Integration into SCOS
    link: docs/scos/user/technology-partners/201811.0/payment-partners/heidelpay/scos-integration/heidelpay-integration-into-scos.html
  - title: Heidelpay - Direct Debit
    link: docs/scos/user/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-payment-methods/heidelpay-direct-debit.html
  - title: Heidelpay - Installation
    link: docs/scos/user/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-installation.html
  - title: Heidelpay - Easy Credit
    link: docs/scos/user/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-payment-methods/heidelpay-easy-credit.html
  - title: Heidelpay - Invoice Secured B2C
    link: docs/scos/user/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-payment-methods/heidelpay-invoice-secured-b2c.html
---

From the user's perspective, there is almost no difference between successful and unsuccessful order flow.

The only exception is a redirect to the URL after the `placeOrderAction` (`/checkout/place-order`) is complete. Both URLs can be configured as follows:
```php
 $config[HeidelpayConstants::CONFIG_YVES_URL] = 'http://' . $config[ApplicationConstants::HOST_YVES];

 //url which is used in case if order was successfuly handled by Heidelpay
 $config[HeidelpayConstants::CONFIG_YVES_CHECKOUT_SUCCESS_URL] = 'http://' . $config[ApplicationConstants::HOST_YVES] . '/checkout/success';

 //url which is used in case if order was unsuccessfully handled by Heidelpay
 $config[HeidelpayConstants::CONFIG_YVES_CHECKOUT_PAYMENT_FAILED_URL] = 'http://' . $config[ApplicationConstants::HOST_YVES] . '/heidelpay/payment-failed?error_code=%s';
 ```
Data flow containing information about the Heidelpay transaction error is marked red.
![Click Me](https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/heidelpay-error-handling-workflow.png) 

---
title: Heidelpay workflow for errors
description: This article describes the procedure for handling errors in Heidelpay.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/heidelpay-error-workflow
originalArticleId: 0330a859-8c49-422b-8ad6-700adf488be6
redirect_from:
  - /2021080/docs/heidelpay-error-workflow
  - /2021080/docs/en/heidelpay-error-workflow
  - /docs/heidelpay-error-workflow
  - /docs/en/heidelpay-error-workflow
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/heidelpay/heidelpay-workflow-for-errors.html
  - /docs/scos/user/technology-partners/202311.0/payment-partners/heidelpay/technical-details-and-howtos/heidelpay-workflow-for-errors.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/heidelpay/heidelpay-workflow-for-errors.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/heidelpay/heidelpay-workflow-for-errors.html
related:
  - title: Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/heidelpay.html
  - title: Integrating the Credit Card Secure payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-credit-card-secure-payment-method-for-heidelpay.html
  - title: Configuring Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/configure-heidelpay.html
  - title: Integrating the Paypal Authorize payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-paypal-authorize-payment-method-for-heidelpay.html
  - title: Integrating Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-heidelpay.html
  - title: Integrating the Direct Debit payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-direct-debit-payment-method-for-heidelpay.html
  - title: Installing Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/install-heidelpay.html
  - title: Integrating the Easy Credit payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-easy-credit-payment-method-for-heidelpay.html
  - title: Integrating the Invoice Secured B2C payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-invoice-secured-b2c-payment-method-for-heidelpay.html

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

[Heidelpay error handling workflow](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/technology-partner-guides/payment-partners/heidelpay/heidelpay-workflow-for-errors.md/heidelpay-error-handling-workflow.png)

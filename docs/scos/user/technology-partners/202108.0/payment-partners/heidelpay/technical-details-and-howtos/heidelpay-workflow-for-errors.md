---
title: Heidelpay - Workflow for Errors
description: This article describes the procedure for handling errors in Heidelpay.
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/heidelpay-error-workflow
originalArticleId: 0330a859-8c49-422b-8ad6-700adf488be6
redirect_from:
  - /2021080/docs/heidelpay-error-workflow
  - /2021080/docs/en/heidelpay-error-workflow
  - /docs/heidelpay-error-workflow
  - /docs/en/heidelpay-error-workflow
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

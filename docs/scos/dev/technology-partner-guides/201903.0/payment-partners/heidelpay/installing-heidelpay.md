---
title: Installing Heidelpay
description: This article contains installation information for the Heidelpay module into the Spryker Legacy Demoshop.
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v2/docs/heidelpay-installation
originalArticleId: 8d842c97-7455-4933-b3a3-012dedb5537b
redirect_from:
  - /v2/docs/heidelpay-installation
  - /v2/docs/en/heidelpay-installation
related:
  - title: Heidelpay
    link: docs/scos/user/technology-partners/page.version/payment-partners/heidelpay.html
  - title: Integrating Heidelpay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/integrating-heidelpay.html
  - title: Integrating the Credit Card Secure payment method for Heidelpay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-credit-card-secure-payment-method-for-heidelpay.html
  - title: Configuring Heidelpay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/configuring-heidelpay.html
  - title: Integrating the Direct Debit payment method for Heidelpay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-direct-debit-payment-method-for-heidelpay.html
  - title: Integrating the Paypal Authorize payment method for Heidelpay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-paypal-authorize-payment-method-for-heidelpay.html
  - title: Heidelpay workflow for errors
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/heidelpay-workflow-for-errors.html
  - title: Integrating Heidelpay into the Legacy Demoshop
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/integrating-heidelpay-into-the-legacy-demoshop.html
  - title: Integrating the Split-payment Marketplace payment method for Heidelpay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-split-payment-marketplace-payment-method-for-heidelpay.html
  - title: Integrating the Easy Credit payment method for Heidelpay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-easy-credit-payment-method-for-heidelpay.html
---

To install Heidelpay, if necessary, add  the Heidelpay repo to your repositories in composer.json:

 ```php
 "repositories": [
 ...
 {
 "type": "git",
 "url": "https://github.com/spryker-eco/Heidelpay.git"
 }
 ],
 ```

and run the following console command:
```php
composer require spryker-eco/heidelpay
```

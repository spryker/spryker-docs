---
title: Installing Heidelpay
description: This article contains installation information for the Heidelpay module into the Spryker Legacy Demoshop.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/heidelpay-installation
originalArticleId: b3bc4292-2daf-4054-b987-2adcf53414a8
redirect_from:
  - /2021080/docs/heidelpay-installation
  - /2021080/docs/en/heidelpay-installation
  - /docs/heidelpay-installation
  - /docs/en/heidelpay-installation
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/heidelpay/installing-heidelpay.html
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/heidelpay/installing-heidelpay.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/heidelpay/install-heidelpay.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/heidelpay/installing-heidelpay.html
related:
  - title: Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/heidelpay.html
  - title: Integrating Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-heidelpay.html
  - title: Integrating the Credit Card Secure payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-credit-card-secure-payment-method-for-heidelpay.html
  - title: Configuring Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/configure-heidelpay.html
  - title: Integrating the Direct Debit payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-direct-debit-payment-method-for-heidelpay.html
  - title: Integrating the Paypal Authorize payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-paypal-authorize-payment-method-for-heidelpay.html
  - title: Heidelpay workflow for errors
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/heidelpay-workflow-for-errors.html
  - title: Integrating the Split-payment Marketplace payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-split-payment-marketplace-payment-method-for-heidelpay.html
  - title: Integrating the Easy Credit payment method for Heidelpay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/heidelpay/integrate-payment-methods-for-heidelpay/integrate-the-easy-credit-payment-method-for-heidelpay.html
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

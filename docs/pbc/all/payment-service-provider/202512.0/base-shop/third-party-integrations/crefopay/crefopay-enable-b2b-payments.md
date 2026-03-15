---
title: CrefoPay—Enabling B2B payments
description: Learn how to enable the CrefoPay B2B payments for your Spryker Cloud Commerce OS.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/crefopay-business-to-business-model
originalArticleId: 14cda40b-6339-44f2-971c-b4282dcf02c8
redirect_from:
  - /2021080/docs/crefopay-business-to-business-model
  - /2021080/docs/en/crefopay-business-to-business-model
  - /docs/crefopay-business-to-business-model
  - /docs/en/crefopay-business-to-business-model
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/crefopay/crefopay-enabling-b2b-payments.html
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/crefopay/crefopay-enabling-b2b-payments.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/crefopay/crefopay-enable-b2b-payments.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/crefopay/crefopay-enabling-b2b-payments.html
related:
  - title: Integrating CrefoPay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/crefopay/integrate-crefopay.html
  - title: CrefoPay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/crefopay/crefopay.html
  - title: Installing and configuring CrefoPay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/crefopay/install-and-configure-crefopay.html
  - title: CrefoPay payment methods
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/crefopay/crefopay-payment-methods.html
  - title: CrefoPay capture and refund Processes
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/crefopay/crefopay-capture-and-refund-processes.html
  - title: CrefoPay callbacks
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/crefopay/crefopay-callbacks.html
  - title: CrefoPay notifications
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/crefopay/crefopay-notifications.html
---

CrefoPay module enables B2B strategy in payments.

To enable the B2B business model for CrefoPay:

1. Set `$config[CrefoPayConstants::IS_BUSINESS_TO_BUSINESS]` to true.
2. Add company data into `QuoteTransfer` on project level. It should be done before customer goes to checkout payment step.

**Company Data**

```php
$quoteTransfer->setCrefoPayCompany(
    (new CrefoPayApiCompanyTransfer())
        ->setCompanyName('Company Name')
        ->setCompanyRegisterType('UNKNOWN')
        ->setCompanyRegistrationID('registration-id')
        ->setCompanyTaxID('tax-id')
        ->setCompanyVatID('vat-id')
        ->setEmail('business.email@company.com')
);
```

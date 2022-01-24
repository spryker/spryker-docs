---
title: Enabling B2B in CrefoPay payments
description: CrefoPay module provides B2B strategy in payments.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/crefopay-business-to-business-model
originalArticleId: 14cda40b-6339-44f2-971c-b4282dcf02c8
redirect_from:
  - /2021080/docs/crefopay-business-to-business-model
  - /2021080/docs/en/crefopay-business-to-business-model
  - /docs/crefopay-business-to-business-model
  - /docs/en/crefopay-business-to-business-model
related:
  - title: Integrating CrefoPay
    link: docs/scos/user/technology-partners/page.version/payment-partners/crefopay/crefopay-integration-into-a-project.html
  - title: CrefoPay
    link: docs/scos/user/technology-partners/page.version/payment-partners/crefopay/crefopay.html
  - title: Installing and configuring CrefoPay
    link: docs/scos/user/technology-partners/page.version/payment-partners/crefopay/crefopay-installation-and-configuration.html
  - title: CrefoPay payment methods
    link: docs/scos/user/technology-partners/page.version/payment-partners/crefopay/crefopay-provided-payment-methods.html
  - title: CrefoPay - Capture and Refund Processes
    link: docs/scos/user/technology-partners/page.version/payment-partners/crefopay/crefopay-technical-details-and-howtos/crefopay-capture-and-refund-processes.html
  - title: CrefoPay - Callback
    link: docs/scos/user/technology-partners/page.version/payment-partners/crefopay/crefopay-technical-details-and-howtos/crefopay-callback.html
  - title: CrefoPay - Notifications
    link: docs/scos/user/technology-partners/page.version/payment-partners/crefopay/crefopay-technical-details-and-howtos/crefopay-notifications.html
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

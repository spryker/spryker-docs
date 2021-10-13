---
title: CrefoPay - Business to Business Model
description: CrefoPay module provides B2B strategy in payments.
template: concept-topic-template
originalLink: https://documentation.spryker.com/v2/docs/crefopay-business-to-business-model
originalArticleId: 6c20fa20-5f73-4da0-983a-ac6011d09370
redirect_from:
  - /v2/docs/crefopay-business-to-business-model
  - /v2/docs/en/crefopay-business-to-business-model
related:
  - title: CrefoPay - Integration
    link: docs/scos/user/technology-partners/201811.0/payment-partners/crefopay/crefopay-integration-into-a-project.html
  - title: CrefoPay
    link: docs/scos/user/technology-partners/201811.0/payment-partners/crefopay/crefopay.html
  - title: CrefoPay - Installation and Configuration
    link: docs/scos/user/technology-partners/201811.0/payment-partners/crefopay/crefopay-installation-and-configuration.html
  - title: CrefoPay - Provided Payment Methods
    link: docs/scos/user/technology-partners/201811.0/payment-partners/crefopay/crefopay-provided-payment-methods.html
  - title: CrefoPay - Capture and Refund Processes
    link: docs/scos/user/technology-partners/201811.0/payment-partners/crefopay/crefopay-technical-details-and-howtos/crefopay-capture-and-refund-processes.html
  - title: CrefoPay - Callback
    link: docs/scos/user/technology-partners/201811.0/payment-partners/crefopay/crefopay-technical-details-and-howtos/crefopay-callback.html
  - title: CrefoPay - Notifications
    link: docs/scos/user/technology-partners/201811.0/payment-partners/crefopay/crefopay-technical-details-and-howtos/crefopay-notifications.html
---

CrefoPay module enables B2B strategy in payments.

To enable the B2B business model for CrefoPay:

1. Set `$config[CrefoPayConstants::IS_BUSINESS_TO_BUSINESS]` to true.
2. Add company data into `QuoteTransfer` on project level. It should be done before customer goes to checkout payment step.
<details open>
<summary>Company Data</summary>
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

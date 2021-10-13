---
title: CrefoPay - Business to Business Model
description: CrefoPay module provides B2B strategy in payments.
template: concept-topic-template
originalLink: https://documentation.spryker.com/v1/docs/crefopay-business-to-business-model
originalArticleId: e847cdcf-82e3-4d2c-b4e1-c13b21c7ea0b
redirect_from:
  - /v1/docs/crefopay-business-to-business-model
  - /v1/docs/en/crefopay-business-to-business-model
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

---
title: Disabling address updates from the backend application for RatePay
description: Disable address updates from the backend application for Ratepay.
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v4/docs/ratepay-disable-address-updates
originalArticleId: 11d477f5-1b64-48d1-8f7c-588d7e36eff9
redirect_from:
  - /v4/docs/ratepay-disable-address-updates
  - /v4/docs/en/ratepay-disable-address-updates
  - /docs/scos/user/technology-partners/202001.0/payment-partners/ratepay/technical-details-and-howtos/ratepay-how-to-disable-address-updates-from-the-backend-application.html
related:
  - title: RatePay
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay/ratepay.html
  - title: RatePay - Payment Workflow
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/technical-details-and-howtos/ratepay-payment-workflow.html
  - title: RatePay - Facade
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/technical-details-and-howtos/ratepay-facade.html
  - title: RatePay - Invoice
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-payment-methods/ratepay-invoice.html
  - title: RatePay- Core Module Structure Diagram
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay/ratepay-core-module-structure-diagram.html
  - title: RatePay - Installment
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-payment-methods/ratepay-installment.html
  - title: RatePay - Prepayment
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-payment-methods/ratepay-prepayment.html
  - title: RatePay - State Machine Commands and Conditions
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/technical-details-and-howtos/ratepay-state-machine-commands-and-conditions.html
  - title: RatePay - Direct Debit
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-payment-methods/ratepay-direct-debit.html
---

To disable updates on addresses from the backend application, follow the steps described below:

**Step 1**:

* Overwrite on project side
`/vendor/spryker/spryker/Bundles/Sales/src/Spryker/<br>Zed/Sales/Presentation/Detail/boxes/addresses.twig`
* Remove ' `Edit`' button

**Step 2**:

* Overwrite on project side
`/vendor/spryker/spryker/Bundles/Sales/src/Spryker/<br>Zed/Sales/Communication/Controller/EditController.php`
* Disable ' `addressAction`'

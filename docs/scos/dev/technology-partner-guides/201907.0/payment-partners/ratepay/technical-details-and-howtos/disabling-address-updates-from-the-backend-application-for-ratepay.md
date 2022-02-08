---
title: Disabling address updates from the backend application for RatePay
description: Disable address updates from the backend application for Ratepay.
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/ratepay-disable-address-updates
originalArticleId: 7e74a2af-bfd9-4923-9bbf-91e475ae0fa9
redirect_from:
  - /v3/docs/ratepay-disable-address-updates
  - /v3/docs/en/ratepay-disable-address-updates
  - /docs/scos/user/technology-partners/201907.0/payment-partners/ratepay/technical-details-and-howtos/ratepay-how-to-disable-address-updates-from-the-backend-application.html
related:
  - title: RatePay
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay.html
  - title: RatePay - Payment Workflow
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/technical-details-and-howtos/ratepay-payment-workflow.html
  - title: RatePay - Facade
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/technical-details-and-howtos/ratepay-facade.html
  - title: Integrating the Invoice payment method for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/integrating-payment-methods-for-ratepay/ratepay-invoice.html
  - title: RatePay- Core Module Structure Diagram
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-core-module-structure-diagram.html
  - title: Integrating the Installment payment method for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/integrating-payment-methods-for-ratepay/ratepay-installment.html
  - title: RatePay - Prepayment
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/integrating-payment-methods-for-ratepay/ratepay-prepayment.html
  - title: RatePay - State Machine Commands and Conditions
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/technical-details-and-howtos/ratepay-state-machine-commands-and-conditions.html
  - title: Integrating the Direct Debit payment method for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/integrating-payment-methods-for-ratepay/ratepay-direct-debit.html
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

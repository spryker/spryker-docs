---
title: RatePay - How to Disable Address Updates from the Backend Application
description: Disable address updates from the backend application for Ratepay.
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/ratepay-disable-address-updates
originalArticleId: a9f1412a-e53b-4ff3-b0af-a79370c3db2e
redirect_from:
  - /2021080/docs/ratepay-disable-address-updates
  - /2021080/docs/en/ratepay-disable-address-updates
  - /docs/ratepay-disable-address-updates
  - /docs/en/ratepay-disable-address-updates
related:
  - title: RatePay - Invoice
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay/ratepay-payment-methods/ratepay-invoice.html
  - title: RatePay - Facade
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay/technical-details-and-howtos/ratepay-facade.html
  - title: RatePay - Prepayment
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay/ratepay-payment-methods/ratepay-prepayment.html
  - title: RatePay - Payment Workflow
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay/technical-details-and-howtos/ratepay-payment-workflow.html
  - title: RatePay- Core Module Structure Diagram
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay/ratepay-core-module-structure-diagram.html
  - title: RatePay - Direct Debit
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay/ratepay-payment-methods/ratepay-direct-debit.html
  - title: RatePay - State Machine Commands and Conditions
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay/technical-details-and-howtos/ratepay-state-machine-commands-and-conditions.html
---

To disable updates on addresses from the backend application, follow the steps described below:

**Step 1**:
* Overwrite on project side `/vendor/spryker/spryker/Bundles/Sales/src/Spryker/<br>Zed/Sales/Presentation/Detail/boxes/addresses.twig`.
* Remove the `Edit` button.

**Step 2**:
* Overwrite on project side `/vendor/spryker/spryker/Bundles/Sales/src/Spryker/<br>Zed/Sales/Communication/Controller/EditController.php`.
* Disable `addressAction`.

---
title: Disabling address updates from the backend application for RatePay
description: Disable address updates from the backend application for RatePay
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/ratepay-disable-address-updates
originalArticleId: a9f1412a-e53b-4ff3-b0af-a79370c3db2e
redirect_from:
  - /2021080/docs/ratepay-disable-address-updates
  - /2021080/docs/en/ratepay-disable-address-updates
  - /docs/ratepay-disable-address-updates
  - /docs/en/ratepay-disable-address-updates
  - /docs/scos/user/technology-partners/202108.0/payment-partners/ratepay/technical-details-and-howtos/ratepay-how-to-disable-address-updates-from-the-backend-application.html
related:
  - title: Integrating the Invoice payment method for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/integrating-payment-methods-for-ratepay/ratepay-invoice.html
  - title: RatePay - Facade
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/technical-details-and-howtos/ratepay-facade.html
  - title: RatePay - Prepayment
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/integrating-payment-methods-for-ratepay/ratepay-prepayment.html
  - title: RatePay - Payment Workflow
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/technical-details-and-howtos/ratepay-payment-workflow.html
  - title: RatePay- Core Module Structure Diagram
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-core-module-structure-diagram.html
  - title: Integrating the Direct Debit payment method for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/integrating-payment-methods-for-ratepay/ratepay-direct-debit.html
  - title: RatePay - State Machine Commands and Conditions
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/technical-details-and-howtos/ratepay-state-machine-commands-and-conditions.html
---

To disable updates on addresses from the backend application, follow the steps described below:

**Step 1**:
* Overwrite on project side `/vendor/spryker/spryker/Bundles/Sales/src/Spryker/<br>Zed/Sales/Presentation/Detail/boxes/addresses.twig`.
* Remove the `Edit` button.

**Step 2**:
* Overwrite on project side `/vendor/spryker/spryker/Bundles/Sales/src/Spryker/<br>Zed/Sales/Communication/Controller/EditController.php`.
* Disable `addressAction`.

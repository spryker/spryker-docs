---
title: CrefoPay - Callback
description: Callbacks are redirects performed by the CrefoPay system.
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/crefopay-callback
originalArticleId: a436e286-4950-4fb3-800a-329c557f3638
redirect_from:
  - /v3/docs/crefopay-callback
  - /v3/docs/en/crefopay-callback
related:
  - title: Integrating CrefoPay
    link: docs/scos/user/technology-partners/page.version/payment-partners/crefopay/crefopay-integration-into-a-project.html
  - title: Installing and configuring CrefoPay
    link: docs/scos/user/technology-partners/page.version/payment-partners/crefopay/crefopay-installation-and-configuration.html
  - title: Enabling B2B in CrefoPay payments
    link: docs/scos/user/technology-partners/page.version/payment-partners/crefopay/crefopay-technical-details-and-howtos/crefopay-business-to-business-model.html
  - title: CrefoPay payment methods
    link: docs/scos/user/technology-partners/page.version/payment-partners/crefopay/crefopay-provided-payment-methods.html
  - title: CrefoPay - Capture and Refund Processes
    link: docs/scos/user/technology-partners/page.version/payment-partners/crefopay/crefopay-technical-details-and-howtos/crefopay-capture-and-refund-processes.html
  - title: CrefoPay - Notifications
    link: docs/scos/user/technology-partners/page.version/payment-partners/crefopay/crefopay-technical-details-and-howtos/crefopay-notifications.html
---

Callbacks are redirects performed by the CrefoPay system. The CrefoPay system redirects customers back to the URLs configured for the merchants shop. For each shop, you can define a single URL of each of the following types: confirmation, success and error.
These callbacks are used only for payment methods that redirect to a different page like PayPal.

Callback URLs can be configured in merchant back end and must have the following format:

* Confirmation URL: `http://de.mysprykershop.com/crefo-pay/callback/confirmation `
* Success URL: `http://de.mysprykershop.com/crefo-pay/callback/success`
* Failure URL: `http://de.mysprykershop.com/crefo-pay/callback/failure`

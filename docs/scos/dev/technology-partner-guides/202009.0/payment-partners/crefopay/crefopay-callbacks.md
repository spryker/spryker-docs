---
title: CrefoPay callbacks
description: Callbacks are redirects performed by the CrefoPay system.
last_updated: Aug 27, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/crefopay-callback
originalArticleId: 34d953c5-f06b-4260-977b-95fedca5d9fb
redirect_from:
  - /v6/docs/crefopay-callback
  - /v6/docs/en/crefopay-callback
related:
  - title: Integrating CrefoPay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/crefopay/integrating-crefopay.html
  - title: Installing and configuring CrefoPay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/crefopay/installing-and-configuring-crefopay.html
  - title: CrefoPay — Enabling B2B payments
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/crefopay/crefopay-enabling-b2b-payments.html
  - title: CrefoPay payment methods
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/crefopay/crefopay-payment-methods.html
  - title: CrefoPay capture and refund Processes
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/crefopay/crefopay-capture-and-refund-processes.html
  - title: CrefoPay notifications
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/crefopay/crefopay-notifications.html
---

Callbacks are redirects performed by the CrefoPay system. The CrefoPay system redirects customers back to the URLs configured for the merchants shop. For each shop, you can define a single URL of each of the following types: confirmation, success and error.
These callbacks are used only for payment methods that redirect to a different page like PayPal.

Callback URLs can be configured in merchant back end and must have the following format:

* Confirmation URL: `http://de.mysprykershop.com/crefo-pay/callback/confirmation `
* Success URL: `http://de.mysprykershop.com/crefo-pay/callback/success`
* Failure URL: `http://de.mysprykershop.com/crefo-pay/callback/failure`

---
title: CrefoPay - Callback
description: Callbacks are redirects performed by the CrefoPay system.
template: concept-topic-template
originalLink: https://documentation.spryker.com/v1/docs/crefopay-callback
originalArticleId: 6b459597-184f-46c2-8bf4-507e27ad2813
redirect_from:
  - /v1/docs/crefopay-callback
  - /v1/docs/en/crefopay-callback
---

Callbacks are redirects performed by the CrefoPay system. The CrefoPay system redirects customers back to the URLs configured for the merchants shop. For each shop, you can define a single URL of each of the following types: confirmation, success and error.
These callbacks are used only for payment methods that redirect to a different page like PayPal.

Callback URLs can be configured in merchant back end and must have the following format:

* Confirmation URL: `http://de.mysprykershop.com/crefo-pay/callback/confirmation `
* Success URL: `http://de.mysprykershop.com/crefo-pay/callback/success`
* Failure URL: `http://de.mysprykershop.com/crefo-pay/callback/failure`

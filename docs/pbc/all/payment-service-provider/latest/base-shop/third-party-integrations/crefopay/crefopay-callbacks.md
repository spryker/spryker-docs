---
title: CrefoPay callbacks
description: Learn about Crefopay Callbacks and how to configure for your Spryker Cloud Commece OS Shop.
last_updated: Jun 16, 2021
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/crefopay/crefopay-callbacks.html
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/crefopay/crefopay-callbacks.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/crefopay/crefopay-callbacks.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/crefopay/crefopay-callbacks.html
related:
  - title: Integrating CrefoPay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/crefopay/integrate-crefopay.html
  - title: Installing and configuring CrefoPay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/crefopay/install-and-configure-crefopay.html
  - title: CrefoPay—Enabling B2B payments
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/crefopay/crefopay-enable-b2b-payments.html
  - title: CrefoPay payment methods
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/crefopay/crefopay-payment-methods.html
  - title: CrefoPay capture and refund Processes
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/crefopay/crefopay-capture-and-refund-processes.html
  - title: CrefoPay notifications
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/crefopay/crefopay-notifications.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


Callbacks are redirects performed by the CrefoPay system. The CrefoPay system redirects customers back to the URLs configured for the merchants shop. For each shop, you can define a single URL of each of the following types: confirmation, success and error.
These callbacks are used only for payment methods that redirect to a different page like PayPal.

Callback URLs can be configured in merchant back end and must have the following format:

- Confirmation URL: `http://de.mysprykershop.com/crefo-pay/callback/confirmation`
- Success URL: `http://de.mysprykershop.com/crefo-pay/callback/success`
- Failure URL: `http://de.mysprykershop.com/crefo-pay/callback/failure`

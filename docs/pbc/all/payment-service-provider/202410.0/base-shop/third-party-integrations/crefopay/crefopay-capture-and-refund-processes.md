---
title: CrefoPay capture and refund Processes
description: This article describes the capture and refund processes for the Crefopay module in Spryker Commerce OS.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/crefopay-capture-refund-processes
originalArticleId: b57a3941-69d9-4057-a0b7-c17964e161bf
redirect_from:
  - /2021080/docs/crefopay-capture-refund-processes
  - /2021080/docs/en/crefopay-capture-refund-processes
  - /docs/crefopay-capture-refund-processes
  - /docs/en/crefopay-capture-refund-processes
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/crefopay/crefopay-capture-and-refund-processes.html
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/crefopay/crefopay-capture-and-refund-processes.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/crefopay/crefopay-capture-and-refund-processes.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/crefopay/crefopay-capture-and-refund-processes.html
related:
  - title: Integrating CrefoPay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/crefopay/integrate-crefopay.html
  - title: CrefoPay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/crefopay/crefopay.html
  - title: Installing and configuring CrefoPay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/crefopay/install-and-configure-crefopay.html
  - title: CrefoPay callbacks
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/crefopay/crefopay-callbacks.html
  - title: CrefoPay—Enabling B2B payments
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/crefopay/crefopay-enable-b2b-payments.html
  - title: CrefoPay payment methods
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/crefopay/crefopay-payment-methods.html
  - title: CrefoPay notifications
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/crefopay/crefopay-notifications.html
---

CrefoPay module can have different capture and refund processes:

* separate transaction for each order item and expense;
* combined transaction for all order items.

For these purposes, the module has different OMS plugins:

* `CapturePlugin`
* `CaptureSplitPlugin`
* `RefundPlugin`
* `RefundSplitPlugin`

You can use the following settings to manage expenses behavior:

* `$config[CrefoPayConstants::CAPTURE_EXPENSES_SEPARATELY]`
* `$config[CrefoPayConstants::REFUND_EXPENSES_WITH_LAST_ITEM]`

With `CapturePlugin` in place, the amount of items in order is captured as one transaction. If you use `$config[CrefoPayConstants::CAPTURE_EXPENSES_SEPARATELY]`, separate transaction will be created for all expenses. `CaptureSplitPlugin` triggers a separate transaction for each order item.

`RefundSplitPlugin` triggers a separate refund call for each order item that you want to refund. `RefundPlugin` implemented for case when you want to refund amount that can be more than item amount.

{% info_block warningBox "Note" %}

You'll get an exception if you trigger Refund process for items with different CaptureIDs (items captured in different transactions).

{% endinfo_block %}

`$config[CrefoPayConstants::REFUND_EXPENSES_WITH_LAST_ITEM]` allows you to refund expenses. It refunds them after the last item has been refunded.

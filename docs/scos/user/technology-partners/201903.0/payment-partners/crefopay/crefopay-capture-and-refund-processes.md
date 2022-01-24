---
title: CrefoPay - Capture and Refund Processes
description: This article describes the capture and refund processes for the Crefopay module in Spryker Commerce OS.
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v2/docs/crefopay-capture-refund-processes
originalArticleId: bd2e579e-8f75-4390-bb32-3d8616b558dd
redirect_from:
  - /v2/docs/crefopay-capture-refund-processes
  - /v2/docs/en/crefopay-capture-refund-processes
related:
  - title: Integrating CrefoPay
    link: docs/scos/user/technology-partners/page.version/payment-partners/crefopay/crefopay-integration-into-a-project.html
  - title: CrefoPay
    link: docs/scos/user/technology-partners/page.version/payment-partners/crefopay/crefopay.html
  - title: Installing and configuring CrefoPay
    link: docs/scos/user/technology-partners/page.version/payment-partners/crefopay/crefopay-installation-and-configuration.html
  - title: CrefoPay - Callback
    link: docs/scos/user/technology-partners/page.version/payment-partners/crefopay/crefopay-technical-details-and-howtos/crefopay-callback.html
  - title: CrefoPay — Enabling B2B payments
    link: docs/scos/user/technology-partners/page.version/payment-partners/crefopay/crefopay-technical-details-and-howtos/crefopay-business-to-business-model.html
  - title: CrefoPay payment methods
    link: docs/scos/user/technology-partners/page.version/payment-partners/crefopay/crefopay-provided-payment-methods.html
  - title: CrefoPay - Notifications
    link: docs/scos/user/technology-partners/page.version/payment-partners/crefopay/crefopay-technical-details-and-howtos/crefopay-notifications.html
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

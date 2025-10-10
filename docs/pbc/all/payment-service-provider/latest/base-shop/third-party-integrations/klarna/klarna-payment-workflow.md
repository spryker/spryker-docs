---
title: Klarna payment workflow
description: In this article, you will find part payment request flow with Klarna and how it can enhance your Spryker Cloud Commerce OS project.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/klarna-payment-workflow
originalArticleId: 3c541e8f-7983-4f74-acce-a34aebb26c36
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/klarna/klarna-payment-workflow.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/klarna/klarna-payment-workflow.html  
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/klarna/klarna-payment-workflow.html
related:
  - title: Klarna - Invoice Pay in 14 days
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/klarna/klarna-invoice-pay-in-14-days.html
  - title: Klarna
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/klarna/klarna.html
  - title: Klarna - Part Payment Flexible
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/klarna/klarna-part-payment-flexible.html
  - title: Klarna state machine commands and conditions
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/klarna/klarna-state-machine-commands-and-conditions.html
---

Both `Part Payment` and `Invoice` payment methods have the same request flow. It basically consists of the following steps:
- Pre-check: reserves the amount of the purchase.
- Check order status: checks if the order status is `pending accepted`. If it's not, OMS waits for 2 hours and then calls again `KlarnaApi` to retrieve the status of the order. In case the status is `denied` the order is canceled.
- Capture payment: activates the reservation that corresponds to the given reference number.
- Update payment: if activation fails, we need to update the reservation that corresponds to the given reference number.
- Refund: performs a partial refund.
- Cancel: cancels a reservation.

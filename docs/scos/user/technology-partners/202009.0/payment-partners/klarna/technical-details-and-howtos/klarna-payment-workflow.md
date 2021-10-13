---
title: Klarna - Payment Workflow
description: In this article, you will find part payment request flow with Klarna.
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/klarna-payment-workflow
originalArticleId: 5eff2e0c-e945-452f-94d3-bf8671f712e7
redirect_from:
  - /v6/docs/klarna-payment-workflow
  - /v6/docs/en/klarna-payment-workflow
---

Both `Part Payment` and `Invoice` payment methods have the same request flow. It basically consists of the following steps:

* Pre-check: reserves the amount of the purchase
* Check order status: checks if the order status is `pending accepted`. If it's not, OMS waits for 2 hours and then calls again `KlarnaApi` to retrieve the status of the order. In case the status is `denied` the order is canceled.
* Capture payment: activates the reservation that corresponds to the given reference number
* Update payment: if activation fails, we need to update the reservation that corresponds to the given reference number
* Refund: performs a partial refund.
* Cancel: cancels a reservation.

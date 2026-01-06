---
title: "Unzer: Strategies of refunding shipping costs"
description: Depending on your requirements you can refund shipping costs in different ways.
last_updated: Jun 17, 2022
template: concept-topic-template
redirect_from:
  - /docs/pbc/all/payment/unzer/howto-tips-use-cases/refund-shipping-costs.html
  - /docs/pbc/all/payment-service-providers/unzer/howto-tips-use-cases/refund-shipping-costs.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/unzer/howto-tips-use-cases/refund-shipping-costs.html
---

The Spryker integration with Unzer offers multiple strategies to refund shipping costs. Ask a developer in your team to enable the strategy that suit your needs.

If you use the `UnzerConstants::LAST_SHIPMENT_ITEM_EXPENSES_REFUND_STRATEGY`, the shipping costs will be refunded when the last sales order item of a shipment is refunded.

If you use the `UnzerConstants::LAST_ORDER_ITEM_EXPENSES_REFUND_STRATEGY`, the shipping costs will be refunded when the last sales order item of the whole order is refunded. In a marketplace context, the whole order will be the merchant order.

If you use the `UnzerConstants::NO_EXPENSES_REFUND_STRATEGY`, the shipping costs will never be refunded.

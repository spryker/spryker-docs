---
title: Payone PayPal payment method flow
description: Payone offers your customers to pay with PayPal.
template: howto-guide-template
last_updated: Now 8, 2024
redirect_from:
   - /docs/aop/user/apps/payone.html
   - /docs/acp/user/apps/payone.html
   - /docs/pbc/all/payment-service-providers/payone/payone.html
   - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/payone/integration-in-the-back-office/payone-integration-in-the-back-office.html
   - /docs/pbc/all/payment-service-provider/202404.0/base-shop/third-party-integrations/payone/integration-in-the-back-office/payone-integration-in-the-back-office.html
---

When customers pay with PayPal, the flow is as follows:

1. Customer is redirected to the PayPal website.
2. Customer logs in.
3. On the PayPal website, the customer either cancels or validates the transaction.
4. Customer is redirected to the checkout page where a message about order being placed or canceled is displayed.

When paying with PayPal, customers can do the following:

- Cancel the entire order before shipment and receive the money back; this voids the preauthorization without charging a fee.
- Cancel the order after it's ready for shipment and receive the money back; this issues a refund.
- Return part or all of the items from an order; this refunds the money for the returned items or for the full order respectively.

When customers pay with PayPal, a shop owner can do the following:

- Charge a customer once their order is ready to be shipped, that is, capture the funds.
- Cancel an entire order, that is, void the existing preauthorization. This doesn't charge the customer.
- Cancel one or more items from an order before shipment. The curtomer is charged only for the items that are going to be shipped.

## Other Payment method flows

* [Credit Card](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/payone/app-composition-platform-integration/payment-method-flows/credit-card.html)
* [PayPal Express](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/payone/app-composition-platform-integration/payment-method-flows/pay-pal-express.html)

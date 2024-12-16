---
title: Payone Credit Card
description: Payone offers your customers to pay with Credit Card.
template: howto-guide-template
last_updated: Now 8, 2024
redirect_from:
   - /docs/aop/user/apps/payone.html
   - /docs/acp/user/apps/payone.html
   - /docs/pbc/all/payment-service-providers/payone/payone.html
   - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/payone/integration-in-the-back-office/payone-integration-in-the-back-office.html
   - /docs/pbc/all/payment-service-provider/202404.0/base-shop/third-party-integrations/payone/integration-in-the-back-office/payone-integration-in-the-back-office.html
---

## Credit card payment flow

When customers pay with a credit card (with optional support of 3DS), the flow is as follows:

1. Customer provides their credit card payment credentials and pays the required amount for the placed order.
2. The customer's credit card data is validated.
3. Customer receives a payment message, whether the payment or authorization was successful.

When paying with a credit card, customers can do the following:

- Repeat payments as often as they want if the payment (preauthorization) has failed, or cancel and close the payment page.
- Cancel the entire order before shipment and receive the money back, that is, void the existing preauthorization without being charged a fee.
- Cancel the order after it is ready for shipment and receive the money back, that is, trigger a refund.
- Return the order or its items after it has been successfully shipped and is refunded for the returned items or the entire order.

When customers pay with a credit card, a shop owner can do the following:


- Charge customers once the order is ready to be shipped, that is, capture the funds.
- Cancel the entire customer order, that is, void the existing preauthorization. In this case, the customer is not charged anything.
- Cancel one or more items of a customer's order before shipment. The customer is not charged for the canceled items.

## Other Payment method flows

* [Learn more about the PayPal payment flow.](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/payone/app-composition-platform-integration/payment-method-flows/pay-pal.html)
* [Learn more about the PayPal Express payment flow.](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/payone/app-composition-platform-integration/payment-method-flows/pay-pal-express.html)

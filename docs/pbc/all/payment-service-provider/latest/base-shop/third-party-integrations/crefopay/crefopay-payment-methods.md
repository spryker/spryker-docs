---
title: CrefoPay payment methods
description: CrefoPay supports key payment methods across different regions, channels, and verticals.- bill, cash on delivery, credit card, direct debit, Paypal, cash in advance, sofort payment
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/crefopay-provided-payment-methods
originalArticleId: a5a58535-f49a-42aa-8c26-e6987beb21bc
redirect_from:
  - /2021080/docs/crefopay-provided-payment-methods
  - /2021080/docs/en/crefopay-provided-payment-methods
  - /docs/crefopay-provided-payment-methods
  - /docs/en/crefopay-provided-payment-methods
  - /docs/scos/dev/technology-partner-guides/202200.0/payment-partners/crefopay/crefopay-payment-methods.html
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/crefopay/crefopay-payment-methods.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/crefopay/crefopay-payment-methods.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/crefopay/crefopay-payment-methods.html
  - /docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/crefopay/crefopay-payment-methods.html
related:
  - title: Integrating CrefoPay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/crefopay/integrate-crefopay.html
  - title: CrefoPay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/crefopay/crefopay.html
  - title: Installing and configuring CrefoPay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/crefopay/install-and-configure-crefopay.html
  - title: CrefoPay capture and refund Processes
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/crefopay/crefopay-capture-and-refund-processes.html
  - title: CrefoPay—Enabling B2B payments
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/crefopay/crefopay-enable-b2b-payments.html
  - title: CrefoPay callbacks
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/crefopay/crefopay-callbacks.html
  - title: CrefoPay notifications
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/crefopay/crefopay-notifications.html
---

CrefoPay supports key payment methods across different regions, channels, and verticals. This article gives overview of these payment methods.

## Bill

After checkout, shop generates a bill/invoice with the account information and payment reference provided by CrefoPay included.

Account information and payment reference are provided in response to a reserve call.

You can find the state machine example  in `vendor/spryker-eco/crefo-pay/config/Zed/Oms/CrefoPayBill01.xml`

## Cash on Delivery

After checkout, user makes payment only after receiving the product. This payment is not made via CrefoPay checkout, so CrefoPay cannot process it. As a result, merchants have to process 'Cash on Delivery' payments separately.

You can find the state machine example in `vendor/spryker-eco/crefo-pay/config/Zed/Oms/CrefoPayCashOnDelivery01.xml`

## Credit Card

You can find the state machine example in `vendor/spryker-eco/crefo-pay/config/Zed/Oms/CrefoPayCrediCard01.xml`

## Credit Card with 3D Secure

If a credit card holder is registered with 3D Secure process, once a purchase is confirmed, they are forwarded to the entry page of their bank where they need to enter the password sent by their bank. Payment is carried out only after the correct password is entered. MasterCard's solution is "MasterCard Secure Code" while Visa's is "Verified by Visa".

You can find the state machine example in `vendor/spryker-eco/crefo-pay/config/Zed/Oms/CrefoPayCrediCard3D01.xml`

## Direct Debit

Direct Debit's processed by the bank system once it's transferred to the bank gateway. This can take several days. While being processed, the order has PayPending status.

As a result of the reconciliation process, the bank system provides feedback which is evaluated automatically within CrefoPay system:

- In case of a positive feedback, the status of the order is set to Paid.
- In case of a negative return, it gets the Paymentfailed status.
- In case CrefoPay does not receive any feedback (which is a rare case), CrefoPay system waits for the so-called grace period to pass.
- In case CrefoPay system does not receive a negative feedback within this grace period, the status of the order is set to Paid.

In case CrefoPay does not receive any feedback (which is a rare case), CrefoPay system waits for the so-called grace period to pass. If CrefoPay system does not receive a negative feedback within this grace period, the status of the order is set to Paid.

You can find the state machine example in `vendor/spryker-eco/crefo-pay/config/Zed/Oms/CrefoPayDirectDebit01.xml`

## PayPal

During checkout, user is redirected to PayPal login page. After a successful authentication or cancellation, PayPal informs CrefoPay about the outcome. Then, CrefoPay performs a callback and redirects the user back to the shop.

You can find the state machine example in `vendor/spryker-eco/crefo-pay/config/Zed/Oms/CrefoPayPayPal01.xml`

## Cash in Advance

After checkout, shop delivers the order after payment has been received from the user.

The shop learns about the incoming payment by receiving a notification from the Merchant Notification Service.

You can find the state machine example in `vendor/spryker-eco/crefo-pay/config/Zed/Oms/CrefoPayPrepaid01.xml`

## SofortÜberweisung

After confirmation an order during checkout, the user is redirected to the SOFORTBank website where they can select a bank. This takes them to the entry page of the selected bank to authenticate. Then, they trigger an online bank transfer from this environment. Similarly to PayPal, SofortÜberweisung informs CrefoPay about the outcome, CrefoPay performs a callback and redirects the user back to the shop.

You can find the state machine example in `vendor/spryker-eco/crefo-pay/config/Zed/Oms/CrefoPaySofort01.xml`

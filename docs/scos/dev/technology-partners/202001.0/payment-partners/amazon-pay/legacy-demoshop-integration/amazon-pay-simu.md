---
title: Amazon Pay - Sandbox Simulations
originalLink: https://documentation.spryker.com/v4/docs/amazon-pay-simulations-demoshop
redirect_from:
  - /v4/docs/amazon-pay-simulations-demoshop
  - /v4/docs/en/amazon-pay-simulations-demoshop
---

In order to reproduce some edge cases like declined payment or pending capture, Amazon provides two solutions. The first is special methods marked with a red star on payment widget.

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Amazon+Pay/amazon_payment_widget.png)
It allows reproducing different cases of `decline` payment workflow.

But there are more edge cases like expired authorization or pending capture for which there is only one way to reproduce - pass simulation string as `SellerNote` parameter of API request.

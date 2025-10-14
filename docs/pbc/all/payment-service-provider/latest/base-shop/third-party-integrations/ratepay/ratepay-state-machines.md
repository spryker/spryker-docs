---
title: RatePay state machines
description: Managing RatePay with state machines by creating a new state machine that include RatePay payments.
last_updated: Jun 16, 2021
template: concept-topic-template
redirect_from:
- /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/ratepay/ratepay-state-machines.html
- /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/ratepay/ratepay-state-machines.html
- /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/ratepay/ratepay-state-machines.html
- /docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/ratepay/ratepay-state-machines.html
---

We use state machines for handling and managing orders and payments. To integrate RatePAY payments, a state machine for RatePAY should be created.

A basic and fully functional state machine for each payment method is already built:
- `RatepayInvoice01.xml`
- `RatepayPrepayment01.xml`
- `RatepayElv01.xml`
- `RatepayInstallment01.xml`

You can use the same state machines or build new ones. The state machine commands and conditions trigger RatePay facade methods calls in order to perform the needed requests to RatePAY.

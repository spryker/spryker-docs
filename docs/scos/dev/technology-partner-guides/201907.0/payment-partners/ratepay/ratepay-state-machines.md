---
title: RatePay state machines
description: Offer intelligent payment solutions for handling most popular paylater models like invoice and installments on the internet for the DACH region by integrating RatePay into the Spryker-based shop.
last_updated: Jan 20, 2020
template: concept-topic-template
---

We use state machines for handling and managing orders and payments. To integrate RatePAY payments, a state machine for RatePAY should be created.

A basic and fully functional state machine for each payment method is already built:
* `RatepayInvoice01.xml`
* `RatepayPrepayment01.xml`
* `RatepayElv01.xml`
* `RatepayInstallment01.xml`

You can use the same state machines or build new ones. The state machine commands and conditions trigger RatePay facade methods calls in order to perform the needed requests to RatePAY.

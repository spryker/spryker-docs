---
title: Understand how payment methods are displayed in the checkout process
description: Depending on your credentials type and the number of merchants in the cart, some payment methods are hidden.
last_updated: Jun 17, 2022
template: concept-topic-template
---

# Understand how payment methods are displayed in the checkout process

Depending on your Unzer credentials type defined in the back-office, the display of the payment method will follow a specific logic.

## Standard type credentials

Whenever a customer goes through the checkout process, we call Unzer to know all the payment methods currently enabled in your account. We compare this list with the active payment methods for this store. We display all payment methods that are at the intersection of the Unzer data and the Spryker data.

## Marketplace type credentials

Whenever a customer goes through the checkout process, we call Unzer to know all the payment methods currently enabled in your account. We compare this list with the active payment methods for this store and all the payment methods enabled for all the merchants inside the cart (defined in Unzer).

### Single merchant inside the cart

We display all payment methods enabled for a marketplace business model in Unzer

* Credit Card
* Sofort
* Unzer Bank Transfer

We display all the payment methods enabled for the merchant that are not yet compatible with a marketplace business model

##### Example

In your Unzer account the following payment methods are enabled for the marketplace business model

* Credit Card
* Sofort

For the Merchant A, the following payment methods are enabled

* Credit Card
* PayPal
* Apple Pay

The customers in the checkout process will see the following payment methods in the checkout process

* Credit Card
* Sofort
* PayPal
* Apple Pay

### Multiple merchants in the cart
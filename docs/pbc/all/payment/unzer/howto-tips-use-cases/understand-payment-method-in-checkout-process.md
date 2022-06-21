---
title: Understand how payment methods are displayed in the checkout process
description: Depending on your credentials type and the number of merchants in the cart, some payment methods are hidden.
last_updated: Jun 22, 2022
template: concept-topic-template
---

# Understand how payment methods are displayed in the checkout process

Depending on your Unzer credentials type defined in the Back Office, the display of the payment method will follow a specific logic.

## Standard type credentials

Whenever a customer goes through the checkout process, Unzer is called to know all the payment methods that are currently enabled in your account. This list is compared against the active payment methods for this store. All payment methods that are at the intersection of the Unzer data and the Spryker data are displayed.

## Marketplace type credentials

Whenever a customer goes through the checkout process, Unzer is called to know all the payment methods that are currently enabled in your account. This list is compared against the active payment methods for this store and all the payment methods enabled for all the merchants inside the cart (defined in Unzer).

### Single merchant inside the cart

All payment methods enabled for a marketplace business model in Unzer are displayed:

* Credit Card
* Sofort
* Unzer Bank Transfer

We display all the payment methods enabled for the merchant that are not yet compatible with a marketplace business model.

#### Example

In your Unzer account, the following payment methods are enabled for the marketplace business model:

* Credit Card
* Sofort

For the merchant A, the following payment methods are enabled:

* Credit Card
* PayPal
* Apple Pay

The customers in the checkout process see the following payment methods in the checkout process:

* Credit Card
* Sofort
* PayPal
* Apple Pay

### Multiple merchants in the cart

All payment methods enabled for a marketplace business model in Unzer are displayed:

* Credit Card
* Sofort
* Unzer Bank Transfer

#### Example

In your Unzer account, the following payment methods are enabled for the marketplace business model

* Credit Card
* Unzer Bank Transfer

For the merchant A, the following payment methods are enabled:

* Credit Card
* PayPal
* Apple Pay

For the merchant B, the following payment methods are enabled:

* Credit Card
* Google Pay

The customers in the checkout process see the following payment methods in the checkout process:

* Credit Card
* Unzer Bank Transfer

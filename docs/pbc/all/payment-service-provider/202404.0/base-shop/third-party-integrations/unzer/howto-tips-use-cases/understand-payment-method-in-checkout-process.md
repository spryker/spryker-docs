---
title: Understand how payment methods are displayed in the checkout process
description: Depending on your credentials type and the number of merchants in the cart, some payment methods are hidden.
last_updated: Jun 22, 2022
template: concept-topic-template
redirect_from:
  - /docs/pbc/all/payment-service-providers/unzer/howto-tips-use-cases/understand-payment-method-in-checkout-process.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/unzer/howto-tips-use-cases/understand-payment-method-in-checkout-process.html
---

Depending on your Unzer credentials type defined in the Back Office, the display of the payment method follows a specific logic.

## Standard type credentials

Whenever a customer goes through the checkout process, Unzer is called to know all the payment methods currently enabled in your account. This list is compared against the active payment methods for this store. All payment methods at the intersection of the Unzer data and the Spryker data are displayed.

## Marketplace type credentials

Whenever a customer goes through the checkout process, Unzer is called to know all the payment methods currently enabled in your account. The list is compared against the active payment methods of the store, and all the payment are methods enabled for the merchants (in Unzer) inside the cart.

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

For merchant A, the following payment methods are enabled:

* Credit Card
* PayPal
* Apple Pay

The customers in the checkout process see the following payment methods in the checkout process:

* Credit Card
* Sofort
* PayPal
* Apple Pay

{% info_block infoBox %}

 For all the marketplace compatible payment methods, Spryker uses the marketplace Unzer credentials. For all the other payment methods, Spryker uses merchant-specific Unzer credentials.

Based on the preceding example, Spryker uses the marketplace Unzer credentials for the Credit Card and Sofort payment methods. For PayPal and Apple Pay, Spryker uses the merchant-specific Unzer credentials.

{% endinfo_block %}

### Multiple merchants in the cart

All payment methods enabled for a marketplace business model in Unzer are displayed:

* Credit Card
* Sofort
* Unzer Bank Transfer

#### Example

In your Unzer account, the following payment methods are enabled for the marketplace business model.

* Credit Card
* Unzer Bank Transfer

For merchant A, the following payment methods are enabled:

* Credit Card
* PayPal
* Apple Pay

For merchant B, the following payment methods are enabled:

* Credit Card
* Google Pay

The customers in the checkout process see the following payment methods in the checkout process:

* Credit Card
* Unzer Bank Transfer

{% info_block infoBox %}

For all the marketplace compatible payment methods, Spryker uses the marketplace Unzer credentials . For all the other payment methods, Spryker uses merchant-specific Unzer credentials.

Based on the example above, Spryker will use the marketplace Unzer credentials for the Credit Card and Unzer Bank Transfer payment methods.

{% endinfo_block %}

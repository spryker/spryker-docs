---
title: Checkout feature overview
description: The checkout workflow is a multi-step process that can be fullly customized to fit your needs.
last_updated: Jul 19, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/checkout
originalArticleId: 7dcc5635-2a15-410c-9a0b-bc62a13dd3a1
redirect_from:
  - /2021080/docs/checkout
  - /2021080/docs/en/checkout
  - /docs/checkout
  - /docs/en/checkout
---



Offer customers a smooth shopping experience by customizing the checkout workflow. Add, delete, and configure any checkout step, like customer account login, shipment and payment methods, or checkout overview.

With the *Checkout* feature, you can enable customers to select single or multiple products and add wishlist items to their cart, as well as integrate different carriers and delivery methods.

Control the values of the orders your customers place by defining order thresholds.

Fulfilling small orders is not always worthwhile for the business, as operating costs, time, and effort spent on processing them often overweight the profit gained. In such cases, implementing a minimum threshold might be the solution. The *Order Thresholds* feature provides you with multiple options of defining thresholds. You can define a minimum threshold and disallow placing orders with smaller values or request customers to pay a fee.

Per your business requirements, you can also set up a maximum threshold to disallow placing orders above a defined threshold.

In a B2B scenario, you can define any type of threshold for each [merchant relation](/docs/scos/user/features/{{page.version}}/merchant-b2b-contracts-feature-overview.html) separately.

With order thresholds, you can:

* Get buyers to place bigger orders, which can increase your sales
* Prevent waste of resources on small orders
* Ensure that the cost of items sold is not too high for each transaction, which, in the long run, can make your business more profitable
* Support promotional campaigns, for example, by offering free shipping for orders above a threshold

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Get a general idea of Multi-step Checkout](/docs/scos/user/features/{{page.version}}/checkout-feature-overview/multi-step-checkout-overview.html)  |
| [Get a general idea of Order Thresholds](/docs/scos/user/features/{{page.version}}/checkout-feature-overview/order-thresholds-overview.html)  |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Checkout feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/checkout-feature-walkthrough.html) for developers.

{% endinfo_block %}

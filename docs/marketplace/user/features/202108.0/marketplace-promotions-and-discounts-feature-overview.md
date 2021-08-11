---
title: Marketplace Promotions and Discounts feature overview
description: This document contains concept information for the Marketplace Promotions and Discounts feature.
template: concept-topic-template
---

The *Marketplace Promotions and Discounts* feature ensures that the discounts are applied to orders. 

Discounts are applied to merchant orders in the form of the [cart rules](https://documentation.spryker.com/docs/promotions-discounts-feature-overview#cart-rule). In current implementation, it is not possible to create a cart rule based on any merchant parameters, such as merchant or product offer. However, it is still possible to create cart rules for the merchant products. See [Creating a cart rule](https://documentation.spryker.com/docs/creating-a-cart-rule) for more details.

Based on the business logic, discounts can be applied in the following ways:

* The discount is applied to the whole Marketplace order. In such a scenario, the discount is distributed among all the merchant orders and calculated according to the total volume of each of the items.

![Merchant discount 1](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Order+Management/mp-discount-1.png)

* The discount is related to a single product item in the Marketplace order. In this case, the whole discount is assigned only to the merchant order that contains the discounted item.

![Merchant discount 2](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Order+Management/mp-discount-2.png)

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Marketplace Promotions and Discounts feature walkthrough](/docs/marketplace/dev/feature-walkthroughs/{{ page.version }}/marketplace-promotions-and-discounts-feature-walkthrough.html) for developers.

{% endinfo_block %}

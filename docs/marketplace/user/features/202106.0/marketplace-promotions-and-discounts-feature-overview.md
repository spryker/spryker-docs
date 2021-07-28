---
title: Marketplace Promotions and Discounts feature overview
description: This document contains concept information for the Marketplace Promotions and Discounts feature in the Spryker Cloud Commerce OS.
template: concept-topic-template
---

Marketplace Promotions and Discounts feature ensures that the discounts are correctly applied. 

Discount logic for merchant orders follows these rules:

* If the discount applies to the whole Marketplace order, the discount is distributed among all the merchant orders and calculated according to the total volume of each of the items.

![Merchant discount 1](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Marketplace+and+Merchant+orders/Merchant+order+feature+overview/mp-discount.png)

* If the discount is related to a single product item, then the whole discount is assigned only to the merchant order that contains the discounted item.

![Merchant discount 2](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Marketplace+and+Merchant+orders/Merchant+order+feature+overview/mp-discount-2.png)

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Marketplace Promotions and Discounts](/docs/marketplace/dev/feature-walkthroughs/{{ page.version }}/marketplace-promotions-and-discounts.html) feature walkthrough for developers.

{% endinfo_block %}
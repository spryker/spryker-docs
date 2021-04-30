---
title: Merchant order module relations
template: concept-topic-template
---

The schema below illustates relations between modules in the [Merchant Order](https://documentation.spryker.com/marketplace/docs/merchant-order-feature-overview) feature.

![Merchant order module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Marketplace+and+Merchant+orders/Merchant+order+feature+overview/merchant-order-module-relations.png)

*Merchant Order total* is the sum of the totals making up the merchant order. The *Merchant Order total* is in one to one relation to the *Merchant Order*. The *Merchant Order total* is in many to one relation to the *Marketplace/Sales Order total*. The sum of all the merchant order totals and Marketplace-assigned expenses equals the *Marketplace order total*.

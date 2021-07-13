---
title: "Reference: Merchant order module relations"
description: This document contains module schema for the Merchant order feature in the Spryker Commerce OS.
template: concept-topic-template
---

The schema below illustrates relations between modules in the Merchant Order entity of the [Marketplace Order Management](/docs/marketplace/dev/feature-walkthroughs/{{ page.version }}/marketplace-order-management/marketplace-order-management.html) feature.

![Merchant order module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Marketplace+and+Merchant+orders/Merchant+order+feature+overview/merchant-order-module-relations.png)

*Merchant Order total* is the sum of the totals making up the merchant order. The *Merchant Order total* is in one to one relation to the *Merchant Order*. The *Merchant Order total* is in many to one relation to the *Marketplace/Sales Order total*. The sum of all the merchant order totals and Marketplace-assigned expenses equals the *Marketplace order total*.

---
title: Back Office for Marketplace Operator
description: This document describes how a marketplace operator works in the Back Office.
template: concept-topic-template
---

A *marketplace operator* is a company that owns the marketplace. In a marketplace business model, one or more of such a company's employees represent a marketplace operator and manage the store. We call such users as [marketplace administrators](/docs/marketplace/user/intro-to-the-spryker-marketplace/marketplace-personas.html#marketplace-administrator). Depending on the marketplace model, the marketplace operator either manages only other merchants' orders or also sells products as a [main merchant](/docs/marketplace/user/features/{{site.version}}/marketplace-merchant-feature-overview/main-merchant-concept.html)).  

## Merchant management

Merchant accounts are created in the Back Office, and a [marketplace administrator](/docs/marketplace/user/intro-to-the-spryker-marketplace/marketplace-personas.html#marketplace-administrator) is required to facilitate their creation. In the **Marketplace&nbsp;<span aria-label="and then">></span> Merchants** section of the Back Office, a marketplace operator manages merchants, that is:

* Creates merchants
* Edits merchants
* Approves and denies merchants
* Activates and deactivates merchants

For detailed instructions about managing merchants, see [Managing merchants](/docs/marketplace/user/back-office-user-guides/{{site.version}}/marketplace/merchants/managing-merchants.html).

## Offer management

In a marketplace, multiple merchants can sell the same product. That's why, instead of creating duplicate products, merchants create offers. Only the offers approved by a marketplace administrator are displayed in the Storefront. In the **Marketplace&nbsp;<span aria-label="and then">></span> Offers** section of the Back Office, a marketplace administrator manages offers as follows:

* Views offers
* Approves and denies offers

For detailed instructions about managing offers, see [Managing merchant product offers](/docs/marketplace/user/back-office-user-guides/{{site.version}}/marketplace/offers/managing-merchant-product-offers.html).

## Order management

Since many merchants sell products simultaneously, the order management of a marketplace is complex and requires a marketplace operator to facilitate their fulfillment. In **Marketplace&nbsp;<span aria-label="and then">></span> Orders** of the Back Office, a marketplace administrator manages marketplace orders as follows:

* Views marketplace orders.
* Changes marketplace order states.
* Creates marketplace returns.
* Views marketplace returns.
* Edits custom order references of marketplace orders.
* Claims marketplace orders.
* Comments on marketplace orders.
* Edits billing addresses of marketplace orders.

For detailed instructions on managing orders, see [Managing marketplace orders](/docs/marketplace/user/back-office-user-guides/{{site.version}}/marketplace/orders/managing-marketplace-orders.html).

### Return management

As a part of order management, a marketplace administrator helps merchants manage marketplace order returns. In the **Marketplace&nbsp;<span aria-label="and then">></span> Returns** section of the Back Office, a marketplace administrator manages marketplace order returns as follows:

* Sets marketplace return states
* Prints marketplace return slips

For detailed instructions on managing returns, see [Managing marketplace returns](/docs/marketplace/user/back-office-user-guides/{{site.version}}/sales/managing-marketplace-returns.html).


## Main merchant sales

In an [enterprise marketplace business model](/docs/marketplace/user/intro-to-the-spryker-marketplace/marketplace-concept.html), apart from managing the marketplace, a marketplace operator sells products as a [main merchant](/docs/marketplace/user/features/{{site.version}}/marketplace-merchant-feature-overview/main-merchant-concept.html). In the Back Office, they manage their orders and returns in **Sales&nbsp;<span aria-label="and then">></span> My Orders** and **Sales&nbsp;<span aria-label="and then">></span> My returns** sections, respectively. With their own orders, they can perform the same actions as they do with other merchants' as described in [Order management](#order-management) and [Return management](#return-management). Apart from that, they can create and edit shipments for their orders.

For detailed instructions about managing main merchant orders and returns, see [Managing main merchant orders](/docs/marketplace/user/back-office-user-guides/{{site.version}}/sales/managing-main-merchant-orders.html) and [Managing main merchant returns](/docs/marketplace/user/back-office-user-guides/{{site.version}}/sales/managing-main-merchant-returns.html).

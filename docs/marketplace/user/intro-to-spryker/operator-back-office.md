---
title: Operator Back Office
description: This document describes how a Marketplace Operator works in the Back Office.
template: concept-topic-template
---

A *maketplace operator* is a company that owns the marketplace. In a marketplace business model, one or more of such a company's employees represent the marketplace operator and manage the store. Depending on the marketplace model, the marketplace operator either manages only merchant orders or also sells products as a [main merchant](main-merchant-concept.md).  

## Merchant management

Merchant accounts are created in different ways, and a marketplace operator is required to facilitate their creation. In the **Marketplace** > **Merchants** section of the Back Office, a marketplace operator manages merchants as follows:

* Creates merchants
* Edits merchants
* Approves and denies merchants
* Activates and deactivates merchants

For detailed instructions on managing merchants, see [Managing merchants](../back-office-user-guides/202106.0/marketplace/merchants/managing-merchants.md).

## Offer management

In a marketplace, multiple merchants can sell the same product. That's why, instead of creating duplicate products, merchants create offers. Only the offers approved by a marketplace operator are displayed in the marketplace. In the **Marketplace** > **Offers** section of the Back Office, a marketplace operator manages offers as follows:

* Views offers
* Approves and denies offers

For detailed instructions on managing offers, see [Managing offers](../back-office-user-guides/202106.0/marketplace/offers/managing-offers.md).

## Order management

Since many merchants sell products simultaneously, the order management of a marketplace is complex and requires a marketplace operator to facilitate their fulfillment. In the **Marketplace** > **Orders** section of the Back Office, a marketplace operator manages marketplace orders as follows:

* Views marketplace orders
* Changes marketplace orders states
* Creates marketplace returns
* Views marketplace retruns
* Edits custom order references of marketplace orders
* Claims marketplace orders
* Comments on marketplace orders
* Edits billing addresses of marketplace orders

For detailed instructions on managing orders, see [Managing orders](../back-office-user-guides/202106.0/marketplace/orders/managing-orders.md).

### Return management

As a part of order management, a marketplace operator helps merchants manage marketplace order returns. In the **Marketplace** > **Returns** section of the Back Office, a marketplace operator manages marketplace order returns as follows:

* Sets marketplace return states
* Prints marketplace return slips

For detailed instructions on managing returns, see [Managing returns](../back-office-user-guides/202106.0/marketplace/returns/managing-returns.md).


## Main merchant sales

In a [enterprise marketplace business model](marketplace-concept.md), apart from managing the marketplace, a marketplace operator sells products as a main merchant. In the Back Office, they manage their orders and returns in **Sales** > **My Orders** and **Sales** > **My returns** sections respectively. With their own orders, they can perform the same actions as they do with other merchants' as described in [Order management](#order-management) and [Return management](#return-management). Apart from that, they can create and edit shipments for their orders.

For detailed instructions on managing main merchant orders and returns, see [Managing main merchant orders](../back-office-user-guides/202106.0/sales/orders/managing-main-merchant-orders.md) and [Managing main merchant returns](../back-office-user-guides/202106.0/sales/returns/managing-main-merchant-returns.md).

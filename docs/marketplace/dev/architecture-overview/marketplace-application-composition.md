---
title: Marketplace Application composition
description: The following document shows how Spryker Marketplace looks in general.
template: concept-topic-template
---

This document describes what the Spryker Marketplace looks like on an application level.

## Composition of the applications

The following diagram illustrates the composition of the Marketplace application:

![Applications composition](https://confluence-connect.gliffy.net/embed/image/3a83f861-b25e-4ef5-aee7-e7da0b182cfa.png?utm_medium=live&utm_source=custom)

### Storefront API
Storefront API is a REST API-based Storefront application for customers. This is where customers browse the catalog and place orders.

### Yves
Yves is a customer-facing HTML-based Storefront application where customers browse the catalog and place orders.

### Backend Gateway
Backend Gateway is a Storefront-oriented application. This is where a storefront (Yves/Glue) changes the state of the system (stock reservations, order placement, payments).

### Merchant Portal
Merchant Portal is a merchant-focused application. Merchants use the Merchant Portal to manage their catalog and fulfill customer orders. Check out [Merchant Portal's architecture](/docs/marketplace/dev/architecture-overview/marketplace-merchant-portal-architecture-overview.html) for more details.

### Marketplace Operator Back Office
Back Office for the Marketplace Operator is a marketplace owner-centric or admin-centric application. Marketplace Operator here takes care of the whole Marketplace, including listing global products, managing merchants, and managing categories.

The Back Office also includes facilities oriented to the Operator-As-A-Merchant case, such as offers and orders management. Check out [Marketplace in the Back Office](/docs/marketplace/dev/architecture-overview/marketplace-in-back-office.html) for more details.

{% info_block warningBox "Important Note" %}

Ensure that Back Office is protected by a secure VPN connection.

{% endinfo_block %}

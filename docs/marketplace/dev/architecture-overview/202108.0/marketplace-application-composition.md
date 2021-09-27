---
title: Marketplace Application composition
description: The following document shows how Spryker Marketplace looks in general. As a result of reading this document, you will have a better understanding of what the Spryker Marketplace looks like on an application level.
template: concept-topic-template
---

The following document shows how Spryker Marketplace looks in general. As a result of reading this document, you will have a better understanding of what the Spryker Marketplace looks like on an application level.


## Composition of the Applications

The following diagram illustrates how the application is composed. It is intentionally simplified, see [Marketplace infrastructure system requirements](/docs/marketplace/dev/setup/system-infrastructure-requirements.html) for more details.

![Applications composition](https://confluence-connect.gliffy.net/embed/image/3a83f861-b25e-4ef5-aee7-e7da0b182cfa.png?utm_medium=live&utm_source=custom)

### Storefront API
Storefront API is a REST API-based storefront application for customers. This is where customers browse the catalog and place orders.

### Yves 
Yves is a customer-facing HTML-based storefront application where customers browse the catalog and place orders.

### Backend Gateway
Backend Gateway is a Storefront-oriented application. This is where a storefront (Yves/Glue) changes the state of the system (stock reservations, order placement, payments, etc.).

### Merchant Portal
Merchant Portal is a merchant-focused application. Merchants use this system to manage their catalog and fulfill customer orders. Check out [Merchant Portal's architecture](/docs/marketplace/dev/architecture-overview/{{page.version}}/marketplace-merchant-portal-architecture-overview.html) for more details.

### Marketplace Operator Back Office 
Back Office for the Marketplace Operator is a marketplace owner-centric or admin-centric application. Marketplace Operator here takes care of the whole Marketplace, including listing global products, managing merchants, and managing categories.

The Back Office also includes facilities oriented to the Operator-As-A-Merchant case, such as offers and orders management. Check out Marketplace in Backoffice<!---LINK--> for more details.

{% info_block warningBox "Important Note" %}

Ensure that Back Office is protected by a secure VPN connection.

{% endinfo_block %}

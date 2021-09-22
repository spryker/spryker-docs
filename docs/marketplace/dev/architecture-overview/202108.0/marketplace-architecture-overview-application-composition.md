---
title: Marketplace Application Composition
description:
template: concept-topic-template
---
This document depicts how a Spryker Marketplace looks like in general. After reading this odc you will now: 

- how the Spryker Marketplace is composed on application level


## Composition of Applications

The following diagram explains the application composition, it is internationally simplified, learn more details on the [Marketplace infrastructure system requirements here](/docs/marketplace/dev/setup/system-infrastructure-requirements.html).

![Applications composition](https://confluence-connect.gliffy.net/embed/image/3a83f861-b25e-4ef5-aee7-e7da0b182cfa.png?utm_medium=live&utm_source=custom)

### Storefront API
Is a customer-facing REST API-based store-front application. This is the place where customer browses catalog and make orders.

### Yves 
Is a customer-facing HTML-based store-front application. This is the place where customer browses catalog and make orders.

### Backend Gateway
Storefront application-oriented application. This is the place how a storefront (Yves/Glue) changes the state of the system (Stock reservation, order placement, payments, etc).

### Merchant Portal
Is a merchant-centric application. This is the place where merchant manages their catalog and fulfill customer orders. Learn more about Merchant Portal here (todo: link to Merchant Portal architecture overview).

### Markteplace Operator Backoffice 
Is a marketplace owner-oriented application or admin-centric application. Here the Marketplace Operator manages the whole Marketplace, including global Product list, Merchant management, Category management, and others.

Backoffice also has some facilities oriented to Operator-As-A-Merchant case such as Offers and Orders management. Read more about Marketplace in Backoffice  (todo: link to Marketplace in Backoffice  overview).

_Important Note: Make sure to protect Backoffice be a secure VPN connection._ 

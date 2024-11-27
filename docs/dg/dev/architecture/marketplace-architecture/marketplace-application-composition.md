---
title: Marketplace Application composition
description: Explore Spryker's Marketplace Application Composition, detailing its modular, scalable architecture designed to enhance marketplace functionality with customized extensions and adaptable service integrations.
template: concept-topic-template
last_updated: Sep 21, 2023
redirect_from:
  - /docs/marketplace/dev/architecture-overview/marketplace-application-composition.html
  - /docs/scos/dev/architecture/marketplace-architecture/marketplace-application-composition.html
related:
  - title: Marketplace domain model
    link: docs/marketplace/dev/architecture-overview/marketplace-domain-model.html
  - title: Marketplace Merchant Portal architecture overview
    link: docs/marketplace/dev/architecture-overview/marketplace-merchant-portal-architecture-overview.html
  - title: Marketplace in the Back Office
    link: docs/marketplace/dev/architecture-overview/marketplace-in-back-office.html
---

The following diagram illustrates the composition of the Marketplace application:

![Applications composition](https://confluence-connect.gliffy.net/embed/image/3a83f861-b25e-4ef5-aee7-e7da0b182cfa.png?utm_medium=live&utm_source=custom)

## Storefront API

Storefront API is a REST API-based Storefront application for customers. This is where customers browse the catalog and place orders.

## Yves

Yves is a customer-facing HTML-based Storefront application where customers browse the catalog and place orders.

## Backend gateway

Backend Gateway is a Storefront-oriented application. This is where a storefront (Yves/Glue) changes the state of the system: stock reservations, order placement, and payments.

## Merchant Portal

Merchant Portal is a merchant-focused application. Merchants use the Merchant Portal to manage their catalog and fulfill customer orders. For more details, see [Marketplace Merchant Portal architecture overview](/docs/dg/dev/architecture/marketplace-architecture/marketplace-merchant-portal-architecture-overview.html).

## Marketplace Operator Back Office

Back Office for the marketplace operator is a marketplace owner-centric or admin-centric application. Marketplace Operator here takes care of the marketplace, including listing global products, managing merchants, and managing categories.

The Back Office also supports the Operator-As-A-Merchant case by letting the marketplace operator manage offers and orders. Check out [Marketplace in the Back Office](/docs/dg/dev/architecture/marketplace-architecture/marketplace-in-back-office.html) for more details.

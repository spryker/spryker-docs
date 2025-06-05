---
title: Marketplace Merchant Portal architecture overview
description: This document explains how a Spryker Marketplace MerchantPortal is designed.
template: concept-topic-template
last_updated: Sep 21, 2023
redirect_from:
  - /docs/marketplace/dev/architecture-overview/marketplace-merchant-portal-architecture-overview.html
  - /docs/scos/dev/architecture/marketplace-architecture/marketplace-merchant-portal-architecture-overview.html
related:
  - title: Marketplace Application composition
    link: docs/marketplace/dev/architecture-overview/marketplace-application-composition.html
  - title: Marketplace domain model
    link: docs/marketplace/dev/architecture-overview/marketplace-domain-model.html
  - title: Marketplace in the Back Office
    link: docs/marketplace/dev/architecture-overview/marketplace-in-back-office.html
---
This document explains how a Spryker Marketplace MerchantPortal is designed.

The following diagrams outline the relation between Zed, MerchantPortal, Back Office, and DB. To learn more about MerchantPortal, see [Marketplace MerchantPortal Core feature](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/marketplace-merchant-portal-core-feature-overview/marketplace-merchant-portal-core-feature-overview.html).

![MerchantPortal Architecture overview](https://confluence-connect.gliffy.net/embed/image/4b06167a-3c9a-483c-8b57-32544b211fc5.png?utm_medium=live&utm_source=custom)

## Zed and Merchant Portal

Zed is an application layer in Spryker that serves as a base for backend-oriented applications such as the following:
- Merchant Portal
- Back Office
- Gateway
- Console: DataImport, Pub&Sync

This means that Merchant Portal shares the codebase with these applications, and the internal Zed infrastructure is available within the Merchant Portal runtime. It allows for faster development and easier customizations of marketplace applications.

## Merchant Portal security

While addressing different concerns, both Merchant Portal and Back Office have direct access to the main database where all the application transactions are stored.

The Marketplace Operator Back Office application is hidden behind a VPN secure connection, but Merchant Portal needs to be exposed to WAN directly. It raises security risks, such as unauthorized data access, and imposes higher requirements on both the Application and Infrastructure layers.


### Security of the Spryker Marketplace Merchant Portal application

The main database contains all the data of your system. It consists of the Merchant-specific data (MerchantOrders, MerchantOffers, and MerchantProducts) that should never be available to other Merchants in the system.

To provide an additional layer of protection for sensitive data, we have developed the [Persistence ACL for MerchantPortal](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/marketplace-merchant-portal-core-feature-overview/persistence-acl-configuration.html). It filters all the data coming from the database on query level.

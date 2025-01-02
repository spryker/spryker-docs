---
title: Marketplace in the Back Office
description: Learn how to manage the Spryker Marketplace in the Back Office with features for product and order management, user roles, and efficient operational control.
template: concept-topic-template
last_updated: Sep 21, 2023
redirect_from:
  - /docs/marketplace/dev/architecture-overview/marketplace-in-back-office.html
  - /docs/scos/dev/architecture/marketplace-architecture/marketplace-in-back-office.html
related:
  - title: Merchant Portal architecture overview
    link: docs/marketplace/dev/architecture-overview/marketplace-merchant-portal-architecture-overview.html
  - title: Marketplace Application composition
    link: docs/marketplace/dev/architecture-overview/marketplace-application-composition.html
  - title: Marketplace domain model
    link: docs/marketplace/dev/architecture-overview/marketplace-domain-model.html
---

This document describes the marketplace modules used for the Back Office.

## Spryker Core Back Office

The [Spryker Core Back Office feature](https://github.com/spryker-feature/spryker-core-back-office) provides the core functionality of the Back Office, which is a prerequisite for Back Office-related features in the Marketplace.

## Marketplace GUI modules for the Back Office

Marketplace offers the following types of GUI modules for the Back Office.

### `{DomainName}Gui`

this type of module provides UI for the Marketplace operators to manage global Marketplace domain objects such as Orders, Products, Merchants, and others.
  For example, [MerchantProfileGui](https://github.com/spryker/merchant-profile-gui) serves as an admin panel for managing Merchants across the entire system.

### `{DomainName}MerchantUserGui`

this type of module provides UI for marketplace operator to manage their own domain objects such as MerchantOrders, Offers, Products, and others.
  For example, [MerchantSalesOrderMerchantUserGui](https://github.com/spryker/merchant-sales-order-merchant-user-gui) is a UI for managing marketplace operator MerchantOrders. Modules of this type require the presence of a connection between a user and a merchant.
  A user without this connection cannot use the page at all.

### Business logic in GUI modules

Don't put any business logic into your GUI modules. Business logic should reside in principal modules. For example, `ProductGui` resides in `Product`.

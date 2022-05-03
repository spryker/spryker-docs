---
title: Marketplace in the Back Office
description: This document explains how Marketplace functionality is presented in the Back Office.
template: concept-topic-template
related:
  - title: Merchant Portal architecture overview
    link: docs/marketplace/dev/architecture-overview/marketplace-merchant-portal-architecture-overview.html
---

The following document explains the Marketplace functionality in the Back Office.

{% info_block infoBox%}

The [Spryker Core Back Office feature](https://github.com/spryker-feature/spryker-core-back-office) provides the core functionality of the Back Office, which is a prerequisite for Back Office-related features in the Marketplace.

{% endinfo_block %}

Marketplace offers two types of GUI modules for the Back Office:
- `{DomainName}Gui`—this type of module provides UI for the Marketplace operators to manage global Marketplace domain objects such as Orders, Products, Merchants, and others.
  For example, [MerchantProfileGui](https://github.com/spryker/merchant-profile-gui) serves as an admin panel for managing Merchants across the entire system.
- `{DomainName}MerchantUserGui`—this type of module provides UI for marketplace operator to manage their own domain objects such as MerchantOrders, Offers, Products, and others.
  For example, [MerchantSalesOrderMerchantUserGui](https://github.com/spryker/merchant-sales-order-merchant-user-gui) is a UI for managing marketplace operator MerchantOrders. Modules of this type require the presence of a connection between a user and a merchant.
  A user without this connection cannot use the page at all.

{% info_block warningBox  %}

Don't put any business logic into your GUI modules.
In all cases, business logic should reside in a principal module (for example, `ProductGui` resides in `Product`).

{% endinfo_block %}

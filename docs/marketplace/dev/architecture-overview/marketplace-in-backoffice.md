---
title: Marketplace in Backoffice
description: This document explains how Marketplace functionality is presented in Backoffice. 
template: concept-topic-template
related:
  - title: Merchant Portal architecture overview
    link: docs/marketplace/dev/architecture-overview/marketplace-merchant-portal-architecture-overview.html
---
This document explains how Marketplace functionality is presented in Backoffice. 

{% info_block infoBox%}

The base Backoffice functionality is provided by [Spryker Core Back Office feature](https://github.com/spryker-feature/spryker-core-back-office)
which is a prerequisite of Backoffice related features in Marketplace.
{% endinfo_block %}

Marketplace provides two types of Gui modules for Backoffice:
- {DomainName}Gui - this type of modules provides UI for marketplace operator to manage global Marketplace domain objects such as Orders, Products, Merchants, and others.
 For example [MerchantProfileGui](https://github.com/spryker/merchant-profile-gui) serves as an admin panel for managing Merchants on the whole system.
- {DomainName}MerchantUserGui -  this type of modules provides UI for marketplace operator to manage its own domain objects such as MerchantOrders, Offers, Products, and others.
 For example, [MerchantSalesOrderMerchantUserGui](https://github.com/spryker/merchant-sales-order-merchant-user-gui) serves as a UI for managing marketplace operator MerchantOrders. These type of modules will requires presence of the connection between User and Merchant.
 In case a User does not have this connection, the page will not work for such a User at all.


{% info_block warningBox  %}

Keep your Gui modules clean by not placing any business logic into them.
The business logic should always reside in a principal module (e.g. for `ProductGui` the principal module is `Product`)
{% endinfo_block %}




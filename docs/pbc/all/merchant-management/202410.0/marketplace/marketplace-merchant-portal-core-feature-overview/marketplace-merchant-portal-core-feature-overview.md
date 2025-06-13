---
title: Marketplace Merchant Portal Core feature overview
description: Marketplace MerchantPortal Core enables server configuration and the basic functionality of the Merchant Portal such as secure login.
template: concept-topic-template
last_updated: Jan 12, 2024
redirect_from:
  - /docs/marketplace/dev/feature-walkthroughs/202403.0/marketplace-merchant-portal-core-feature-walkthrough/marketplace-merchant-portal-core-feature-walkthrough.html
  - /docs/pbc/all/merchant-management/202403.0/marketplace/marketplace-merchant-portal-core-feature-overview/marketplace-merchant-portal-core-feature-overview.md
---

The Marketplace Merchant Portal Core enables server configuration and basic functions of the Merchant Portal application, such as secure login, GUI tables, and dashboards. Merchant Portal and Back Office are separate applications with different entry points, bootstraps, and possibilities to register application plugins, configure application base URLs, and debug.

To learn more about the Marketplace Application, see [Marketplace Application Composition](/docs/dg/dev/architecture/marketplace-architecture/marketplace-application-composition.html).


Login and logout in the Merchant Portal are provided by the `SecurityMerchantPortalGui` module, which also provides the `ZedMerchantUserSecurityPlugin` for extending the Merchant Portal firewall.

## Module dependency graph

The following diagram illustrates the dependencies between the modules for the Marketplace Merchant Portal Core feature.

![Modules relation](https://confluence-connect.gliffy.net/embed/image/2e0be237-6e7b-4488-8d4b-811707c14ea0.png?utm_medium=live&utm_source=custom)


### Main Marketplace MerchantPortal Core feature modules

The following table lists the main MerchantPortal Core modules:

| NAME | DESCRIPTION |
| -------------- | ------------------ |
| [Acl](https://github.com/spryker/acl) | Acl is part of the Store Administration. The purpose of this module is to define roles, groups, privileges, and resources to manage access privileges to Zed Administration Interface.   |
| [AclEntity](https://github.com/spryker/acl-entity) | This module provides a database structure for `AclEntitySegment` and `AclEntityRule` as well as methods for managing them.   |
| [AclMerchantPortal](https://github.com/spryker/acl-merchant-portal) | Acl and merchant entities are connected through this module.   |
| [GuiTable](https://github.com/spryker/gui-table) | This module provides base functionality for building GuiTables.    |
| [MerchantPortalApplication](https://github.com/spryker/merchant-portal-application) | This module provides basic infrastructure for the MerchantPortal modules.   |
| [MerchantUser](https://github.com/spryker/merchant-user) | Merchant user module provides data structure, facade methods and plugins that let users relate to merchants.  |
| [MerchantUserPasswordResetMail](https://github.com/spryker/merchant-user-password-reset-mail) | This module provides possibility to reset password for the merchant user.   |
| [Navigation](https://github.com/spryker/navigation) | This module manages multiple navigation menus that can be displayed on the frontend.   |
| [SecurityMerchantPortalGui](https://github.com/spryker/security-merchant-portal-gui) | This module provides security rules and authentication for merchant users.   |
| [UserMerchantPortalGui](https://github.com/spryker/user-merchant-portal-gui) | This module module provides components for merchant user management.    |
| [ZedUi](https://github.com/spryker/zed-ui) | This module provides base UI components for Zed application.   |

### Optional Marketplace MerchantPortal Core feature modules

The following table lists optional MerchantPortal Core modules:

| NAME | DESCRIPTION |
| -------------------- | --------------------- |
| [DashboardMerchantPortalGui](https://github.com/spryker/dashboard-merchant-portal-gui) | This module contains the dashboard and its related components for the Merchant Portal.  |
| [DashboardMerchantPortalGuiExtension](https://github.com/spryker/dashboard-merchant-portal-gui-extension) | This module provides extension interfaces for the `DashboardMerchantPortalGui` module.|
| [MerchantUserExtension](https://github.com/spryker/merchant-user-extension) | This module provides plugin interfaces to extend `MerchantUser` module from another modules.  |
| [UserMerchantPortalGuiExtension](https://github.com/spryker/user-merchant-portal-gui-extension) | This module provides plugin interfaces to extend the `UserMerchantPortalGui` module from the other modules. |

## Domain model

The following schema illustrates the Marketplace MerchantPortal Core domain model:

![Domain model](https://confluence-connect.gliffy.net/embed/image/2f5bae0d-8b37-45f5-ad08-06ca5c0c562d.png?utm_medium=live&utm_source=custom)

## Gui table

`GuiTable` is a Spryker infrastructure component, which displays data as tables and provides search, filtering, sorting, and various interactions with table rows.
`GuiTable` components are widely used in the Marketplace Merchant Portal for displaying orders, offers, and products.
The `GuiTable` frontend component knows how to create the table itself, where to go for the data, and how to interpret the provided data based on the configuration provided.

{% info_block warningBox "Table design" %}

To learn more about table design, see [Table design](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/table-design/table-design.html).

{% endinfo_block %}

## Related Developer documents

|INSTALLATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  | REFERENCES  |
|---------|---------|---------|--------|
| [Install the Marketplace Merchant Portal Core feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html)          |          | [File details: merchant_user.csv](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant-user.csv.html)           | [GUI modules concept](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-portal-core-feature-overview/gui-modules.html) |
|        |          |          | [How to create a new GUI module](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/tutorials-and-howtos/create-gui-modules.html)  |
|        |          |          | [How to create a new Gui table](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/tutorials-and-howtos/create-gui-tables.html)  |
|        |          |          | [How to extend an existing Gui table](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/tutorials-and-howtos/extend-gui-tables.html)  |
|        |          |          | [How to create a new Gui table filter type](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/tutorials-and-howtos/create-gui-table-filter-types.html)  |
|        |          |          | [How to extend Merchant Portal dashboard](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/tutorials-and-howtos/extend-merchant-portal-dashboard.html)  |

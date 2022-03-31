---
title: Marketplace Merchant Portal Core feature walkthrough
description: Marketplace MerchantPortal Core enables server configuration and the basic functionality of the Merchant Portal such as security login.
template: concept-topic-template
---

The Marketplace Merchant Portal Core enables server configuration and basic functions of the Merchant Portal application, such as security login, GUI tables, and dashboards. Merchant Portal and Back Office are separate applications with different entry points, bootstraps, and possibilities to register application plugins, configure application base URLs, debug.

{% info_block warningBox "Note" %}

To learn more about the Marketplace Application, see [Marketplace Application Composition](/docs/marketplace/dev/architecture-overview/marketplace-application-composition.html).

{% endinfo_block %}

Login and logout in the Merchant Portal are provided by the `SecurityMerchantPortalGui` module, which also provides the `MerchantUserSecurityPlugin` for extending the Merchant Portal firewall.

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
| [MerchantUser](https://github.com/spryker/merchant-user) | Merchant user module provides data structure, facade methods and plugins  that allow users to relate to merchants.  |
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
| [UserMerchantPortalGuiExtension](https://github.com/spryker/user-merchant-portal-gui-extension) | This module provides plugin interfaces to extend the `UserMerchantPortalGui` module from the other modules.

## Domain model

The following schema illustrates the Marketplace MerchantPortal Core domain model:

![Domain model](https://confluence-connect.gliffy.net/embed/image/2f5bae0d-8b37-45f5-ad08-06ca5c0c562d.png?utm_medium=live&utm_source=custom)

## Gui Table

GuiTable is a Spryker infrastructure component which displays data as tables and provides search, filtering, sorting, and various interactions with table rows.
GuiTables are widely used in the Marketplace Merchant Portal for displaying orders, offers, products etc.
GuiTable frontend component knows how to create the table itself, where to go for the data, and how to interpret the provided data based on the configuration provided.

{% info_block warningBox "Table design" %}

To learn more about Table design, see [Table design](/docs/marketplace/dev/front-end/table-design/).

{% endinfo_block %}

## Related Developer articles

|INTEGRATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  | REFERENCES  |
|---------|---------|---------|--------|
| [Marketplace Merchant Portal Core feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-portal-core-feature-integration.html)          |          | [File details: merchant_user.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-user.csv.html)           | [GUI modules concept](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-merchant-portal-core-feature-walkthrough/gui-modules-concept.html) |
|        |          |          | [How to create a new GUI module](/docs/marketplace/dev/howtos/how-to-create-gui-module.html)  |
|        |          |          | [How to create a new Gui table](/docs/marketplace/dev/howtos/how-to-create-gui-table.html)  |
|        |          |          | [How to extend an existing Gui table](/docs/marketplace/dev/howtos/how-to-extend-gui-table.html)  |
|        |          |          | [How to create a new Gui table filter type](/docs/marketplace/dev/howtos/how-to-add-new-guitable-filter-type.html)  |
|        |          |          | [How to extend Merchant portal dashboard](/docs/marketplace/dev/howtos/how-to-extend-merchant-portal-dashboard.html)  |

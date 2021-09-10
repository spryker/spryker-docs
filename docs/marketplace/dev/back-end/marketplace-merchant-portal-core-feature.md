---
title: Marketplace Merchant Portal Core feature
description:
template: concept-topic-template
---

Follow the [Marketplace Merchant Portal Core feature integration guide](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-merchant-portal-core-feature-integration.html) to install the Marketplace Merchant Portal Core.

Marketplace MerchantPortal Core enables server configuration and the basic functionality of the Merchant Portal 
such as security login, GUI tables, dashboard etc. Merchant Portal and Back-office are different applications with 
different entry points, bootstraps, and possibility to register application plugins, configuring of application 
base URLs, debugging etc.

## Modules relation

![Modules relation](https://confluence-connect.gliffy.net/embed/image/2e0be237-6e7b-4488-8d4b-811707c14ea0.png?utm_medium=live&utm_source=custom)


### Main Marketplace MerchantPortal Core feature modules

| NAME | DESCRIPTION | 
| -------------------- | --------------------- |
| [Acl](https://github.com/spryker/acl) | Acl is part of the Store Administration functionality. With this module you will define roles, groups, privileges and resources for managing access privileges to Zed Administration Interface.
| [AclEntity](https://github.com/spryker/acl-entity) | This module providers DB structure for AclEntitySegment and AclEntityRule and methods for managing them.
| [AclMerchantPortal](https://github.com/spryker/acl-merchant-portal) | This module provides a connection between ACL and merchant entities.
| [GuiTable](https://github.com/spryker/gui-table) | This module provides base functionality for building GuiTables. 
| [MerchantPortalApplication](https://github.com/spryker/merchant-portal-application) | This module provides basic infrastructure for MerchantPortal modules. 
| [MerchantUser](https://github.com/spryker/merchant-user) | Merchant user module provides data structure, facade methods and plugins for user relation to merchant. 
| [MerchantUserPasswordResetMail](https://github.com/spryker/merchant-user-password-reset-mail) | This module provides possibility to reset password for the merchant user.
| [Navigation](https://github.com/spryker/navigation) | This module manages multiple navigation menus that can be displayed on the frontend. 
| [SecurityMerchantPortalGui](https://github.com/spryker/security-merchant-portal-gui) | This module provides security rules and authentication for merchant users.
| [UserMerchantPortalGui](https://github.com/spryker/user-merchant-portal-gui) | This module module provides components for merchant user management. 
| [ZedUi](https://github.com/spryker/zed-ui) | This module provides base UI components for Zed application.

### Optional Marketplace MerchantPortal Core feature modules

| NAME | DESCRIPTION | 
| -------------------- | --------------------- |
| [DashboardMerchantPortalGui](https://github.com/spryker/dashboard-merchant-portal-gui) | This module contains the dashboard and its related components for the Merchant portal.
| [DashboardMerchantPortalGuiExtension](https://github.com/spryker/dashboard-merchant-portal-gui-extension) | This module provides extension interfaces for DashboardMerchantPortalGui module.
| [MerchantUserExtension](https://github.com/spryker/merchant-user-extension) | This module provides plugin interfaces to extend MerchantUser module from another modules.
| [UserMerchantPortalGuiExtension](https://github.com/spryker/user-merchant-portal-gui-extension) | This module provides plugin interfaces to extend UserMerchantPortalGui module from the other modules.

## Domain model

![Domain model](https://confluence-connect.gliffy.net/embed/image/2f5bae0d-8b37-45f5-ad08-06ca5c0c562d.png?utm_medium=live&utm_source=custom)

## Learn more

- [GUI modules concept](/docs/marketplace/dev/back-end/marketplace-merchant-portal-core-feature/gui-modules-concept.html)
- [GUI tables concept](/docs/marketplace/dev/back-end/marketplace-merchant-portal-core-feature/gui-table.html)
- [How to extend Merchant portal dashboard?](/docs/marketplace/dev/howtos/how-to-extend-merchant-portal-dashboard.html)
- [Login and Logout in Merchant Portal](/docs/marketplace/dev/back-end/marketplace-merchant-portal-core-feature/login-and-logout.html)

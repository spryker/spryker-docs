---
title: Marketplace Merchant Portal Security feature walkthrough
description: This article provides reference information about Merchant Portal Users login restriction to Backoffice.
last_updated: Jan 18, 2022
template: feature-walkthrough-template
---

The *Marketplace Merchant Portal Security* feature provides Merchant Users access restriction to the Backoffice using Backoffice login page.

## Module dependency graph

The following diagram illustrates the dependencies between the modules for the *Marketplace Merchant Portal Product Management* feature.

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/77465db4-620b-4fb8-8b33-b8e6dbc97442.png?utm_medium=live&utm_source=confluence)

| NAME                  | DESCRIPTION                                                                                                                                                                                     |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Acl                   | Acl is part of the Store Administration functionality. With this module you will define roles, groups, privileges and resources for managing access privileges to Zed Administration Interface. |
| AclMerchantPortal     | This module provides a connection between ACL and merchant entities.                                                                                                                            |
| MerchantUser | Merchant user module provides data structure, facade methods and plugins for user relation to merchant.                                                                                         |
| MerchantUserExtension | Provides plugin interfaces to extend MerchantUser module from another modules.                                                                                                                  |
| Security              | Module provides Zed UI interface for User authentication.                                                                                                                                       |
| SecurityExtension     | Module provides extension interfaces for the SecurityGui module.                                                                                                                                |


## Related Developer articles

| INTEGRATION GUIDES                                                                                                                                                                                    |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Marketplace Merchant Portal Security feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-portal-security-feature-integration.html) |

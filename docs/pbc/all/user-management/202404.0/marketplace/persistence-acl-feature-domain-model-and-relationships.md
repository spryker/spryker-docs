---
title: "Persistence ACL feature: Domain model and relationships"
last_updated: Nov 05, 2021
description: Technical details about the Persistence ACL feature.
template: concept-topic-template
---

The following module dependency graph and table list the main modules of the Persistence ACL feature and their interaction.

![Module dependency graph](https://confluence-connect.gliffy.net/embed/image/b15ac7bf-e35f-4298-90da-b7d0c8227be9.png?utm_medium=live&utm_source=custom)

| MODULE | DESCRIPTION |
|-----|-----|
| Acl | `\Spryker\Zed\Acl\Business\AclFacade::getUserRoles()` is used to get logged in user `AclRoles`. |
| AclExtension | `Spryker\Zed\AclExtension\Dependency\Plugin\AclRolePostSavePluginInterface` is used to save `AclEntityRules` for `AclRole`.|
| AclEntityDataImport | `AclEntityRule` and `AclEntitySegment` are used to import data. |
| AclEntityExtension |  In `/Spryker/Zed/AclEntityExtension/Dependency/Plugin/AclEntityDisablerPluginInterface`, `AclEntityDisablerPluginInterface` determines whether the feature is enabled. <br /> `\Spryker\Zed\AclEntityExtension\Dependency\Plugin\AclEntityMetadataConfigExpanderPluginInterface` is used in `\Spryker\Zed\AclEntity\Business\AclEntityFacade::getAclEntityMetadataConfig()` to expand the module configuration. |
| PropelOrm | The module is used as a container for Propel library. |
| User | `\Spryker\Zed\User\Business\UserFacade::hasCurrentUser()` is used to check if the user is logged in. <br /> `\Spryker\Zed\User\Business\UserFacade::getCurrentUser()` is used to determine which `AclEntityRules` should be considered during query processing. |

## Domain model

The following schema illustrates the Persistence ACL domain model:

![Domain model](https://confluence-connect.gliffy.net/embed/image/4fe4c0ba-1192-4aca-97f8-d996dfccc583.png?utm_medium=live&utm_source=custom)

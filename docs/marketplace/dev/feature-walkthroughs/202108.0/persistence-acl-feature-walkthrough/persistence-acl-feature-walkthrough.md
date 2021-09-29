---
title: Persistence ACL feature walkthrough
last_updated: Sep 14, 2021
template: concept-topic-template
---

## Overview
Persistence ACL feature allows to manage authorisation at the database entity level, and even a set of entities (segments). 
This feature supports a flexible system of inheritance of rights, which simplifies the configuration of access in the system. 
We will talk about it, as well as about other capabilities of the module below.
As the name suggests, the Persistence ACL runs in the Persistence layer.

## Limitations
The module based on Propel ORM (namely Propel Behavior and Propel Hooks). If you do not use PropelOrm to interact with data in your system, this module will not work.

## Module dependency graph
![Module dependency graph](https://confluence-connect.gliffy.net/embed/image/b15ac7bf-e35f-4298-90da-b7d0c8227be9.png?utm_medium=live&utm_source=custom)

| MODULE | DESCRIPTION |
|-----|-----|
| Acl | `\Spryker\Zed\Acl\Business\AclFacade::getUserRoles()` used to obtain logged in user `AclRoles`. |
| AclExtension | `Spryker\Zed\AclExtension\Dependency\Plugin\AclRolePostSavePluginInterface` used to save `AclEntityRules` for `AclRole`.|
| AclEntityDataImport | `AclEntityRule` and `AclEntitySegment` are used for the data imports. |
| AclEntityExtension |  `\Spryker\Zed\AclEntityExtension\Dependency\Plugin\AclEntityDisablerPluginInterface` used in `\Spryker\Zed\AclEntity\Business\AclEntityFacade::isActive()` to determine if feature enabled. <br /> `\Spryker\Zed\AclEntityExtension\Dependency\Plugin\AclEntityMetadataConfigExpanderPluginInterface` used in `\Spryker\Zed\AclEntity\Business\AclEntityFacade::getAclEntityMetadataConfig()` to expand the module configuration. |
| PropelOrm | The module used as a container for Propel library. |
| User | `\Spryker\Zed\User\Business\UserFacade::hasCurrentUser()` used to check if the user is logged in. <br /> `\Spryker\Zed\User\Business\UserFacade::getCurrentUser()` used to determine `AclEntityRules` which should be considered during query processing. |

## Domain model
![Domain model](https://confluence-connect.gliffy.net/embed/image/4fe4c0ba-1192-4aca-97f8-d996dfccc583.png?utm_medium=live&utm_source=custom)

## How it works
![The module in application layers](https://confluence-connect.gliffy.net/embed/image/13f16eaa-9491-43ab-887d-0004c716eef4.png?utm_medium=live&utm_source=custom)
Persistence ACL supports permission check for both: when executing queries and when performing actions on Active Record models.
After installation and configuration, code injected into the Active Record model and Query classes that checks the user's permissions for appropriate actions.
The module is based on Propel hooks.

**_Important: if you execute quires to the database outside of Propel API, they WILL NOT be handled by Persistence ACL_**

The following hooks used during model operations:
- preInsert
- preUpdate
- preDelete
During query execution:
- preSelectQuery
- preUpdateQuery
- preDeleteQuery

When a query to the database is issued, the query will be intercepted and modified with additional joins to narrow down the result of the query to only the records the are available to the current user.
If the user tries to perform a restricted action on an Active Record model (such an update, delete or create),
an `\Spryker\Zed\AclEntity\Persistence\Exception\OperationNotAuthorizedException will be thrown.`

## Learn more
- Configuration <!---LINK-->
- Rules and scopes <!---LINK-->
- Execution flow <!---LINK-->

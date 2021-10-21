---
title: Persistence ACL feature walkthrough
last_updated: Sep 14, 2021
template: concept-topic-template
---

## Overview
With the Persistence ACL feature, you may manage authorization at the database entity level, or even within a set of entities (segments). This feature enables a flexible system of inheritance of rights, simplifying the configuration of access. 

The Persistence ACL runs in the Persistence layer, as its name suggests. Next, we will discuss the peculiarities and capabilities of the module.

## Limitations
The module is based on the Propel ORM (namely Propel Behavior and Propel Hooks). If you are not using `PropelOrm` to interact with data in your system, this module will not work.

## Module dependency graph

The module dependency graph and table below list the main modules of the Persistence ACL feature and their interaction.

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

## How it works

Persistence ACL supports permission checks both when executing queries and when performing actions on Active Record models. Upon installation and configuration, code is injected into the Active Record model and Query classes that check the user's permissions for the appropriate actions. This module uses Propel hooks.

![The module in application layers](https://confluence-connect.gliffy.net/embed/image/13f16eaa-9491-43ab-887d-0004c716eef4.png?utm_medium=live&utm_source=custom)

{% info_block warningBox "Important!" %}

If you execute queries outside of Propel API, they WILL NOT be handled by Persistence ACL.

{% endinfo_block %}

During model operations, the following hooks are used:

- `preInsert`

- `preUpdate`

- `preDelete`

  
Query execution is performed using the following hooks:

- `preSelectQuery`

- `preUpdateQuery`

- `preDeleteQuery`

A query sent to the database is intercepted and modified with additional joins to limit the results of the query to only those records available to the current user. If the user attempts to perform a restricted action on an Active Record model (such as updating, deleting, or creating), an `\Spryker\Zed\AclEntity\Persistence\Exception\OperationNotAuthorizedException` is thrown.

## Learn more

- [Configuration](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/persistence-acl-feature-walkthrough/configuration.html)
- [Rules and scopes](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/persistence-acl-feature-walkthrough/rules-and-scopes/rules-and-scopes.html) 
- [Execution flow](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/persistence-acl-feature-walkthrough/execution-flow.html) 

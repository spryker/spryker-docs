---
title: Persistence ACL feature overview
last_updated: Nov 05, 2021
description: With the Persistence ACL feature, you can manage authorization at the database entity level, or even within a set of entities or segments.
template: feature-walkthrough-template
redirect_from:
  - /docs/marketplace/dev/feature-walkthroughs/202212.0/persistence-acl-feature-walkthrough/persistence-acl-feature-walkthrough.html
---

With the Persistence ACL feature, you can manage authorization at the database entity level, or even within a set of entities or segments. This feature enables a flexible system of inheritance of rights, simplifying the configuration of access.

Persistence ACL runs in the Persistence layer, as its name suggests.

## Limitations
The module is based on the Propel ORM (namely Propel Behavior and Propel Hooks). If you are not using `PropelOrm` to interact with data in your system, this module will not work.



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

A query sent to the database is intercepted and modified with additional joins to limit the results of the query to only those records available to the current user. If the user attempts to perform a restricted action on an Active Record model (such as updating, deleting, or creating), then `\Spryker\Zed\AclEntity\Persistence\Exception\OperationNotAuthorizedException` is thrown.

## Learn more

- [Configuration](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-portal-core-feature-overview/persistence-acl-configuration.html)
- [Rules and scopes](/docs/pbc/all/user-management/{{page.version}}/marketplace/persistence-acl-feature-overview/rules-and-scopes/rules-and-scopes.html)
- [Execution flow](/docs/pbc/all/user-management/{{page.version}}/marketplace/persistence-acl-feature-overview/execution-flow.html)

## Related Developer documents

|INSTALLATION GUIDES  | REFERENCES  | HOWTOS  |
|---------|---------|---------|
| [Install the ACL feature](/docs/pbc/all/user-management/{{page.version}}/base-shop/install-and-upgrade/install-the-acl-feature.html)   | [Persistence ACL feature configuration](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-portal-core-feature-overview/persistence-acl-configuration.html) | [HowTo: Split products by stores](/docs/marketplace/dev/howtos/how-to-split-products-by-stores.html)|
|  | [Execution flow](/docs/pbc/all/user-management/{{page.version}}/marketplace/persistence-acl-feature-overview/execution-flow.html) |    |
|  | [Rules and scopes](/docs/pbc/all/user-management/{{page.version}}/marketplace/persistence-acl-feature-overview/rules-and-scopes/rules-and-scopes.html) |    |
|  | [Global scope](/docs/pbc/all/user-management/{{page.version}}/marketplace/persistence-acl-feature-overview/rules-and-scopes/global-scope.html) |    |
|  | [Segment scope](/docs/pbc/all/user-management/{{page.version}}/marketplace/persistence-acl-feature-overview/rules-and-scopes/segment-scope.html) |  |
|  | [Inherited scope](/docs/pbc/all/user-management/{{page.version}}/marketplace/persistence-acl-feature-overview/rules-and-scopes/inherited-scope.html) |  |
|  | [Composite entity](/docs/pbc/all/user-management/{{page.version}}/marketplace/persistence-acl-feature-overview/rules-and-scopes/composite-entity.html) |   |

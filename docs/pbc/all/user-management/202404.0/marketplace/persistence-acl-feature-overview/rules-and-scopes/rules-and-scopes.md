---
title: Rules and scopes
last_updated: Nov 05, 2021
description: The rule, in contrast to the configuration, is tied to the user (and his role) and determines the user's rights towards the entity.
template: concept-topic-template
redirect_from:
---

The functionality of this feature is based on such fundamental concepts as Rule and Configuration.
It is important to understand that the rule, in contrast to the configuration, is tied to the user (and his role) and determines the user's rights towards the entity.

## Rule
One of the fundamental concepts of the Persistence ACL module is an entity rule. It determines the capabilities and permissions of the current user. The rule is an entry in the `spy_acl_entity_rule` table.

| COLUMN | DESCRIPTION | DATA EXAMPLE |
|-----|-----|-----|
| id_acl_entity_rule | Auto incremental primary key. | |
| fk_acl_entity_segment | A reference to the data segment to which the rule applies. The segment concept is described below. | |
| fk_acl_role | The foreign key of the role to which the rule applies. Rules are not applied to specific users, but to roles, which makes their use extremely flexible. | |
| entity | Entity class. You must specify the full namespace without a leading slash. | `Orm\Zed\Product\Persistence\SpyProductAbstract`, `Orm\Zed\Store\Persistence\SpyStore` |
| permission_mask | An integer representation of the binary permission mask. For more details, see [Permission concept](#permission-concept) documentation. | `AclEntityConstants::OPERATION_MASK_READ`, <br />`AclEntityConstants::OPERATION_MASK_READ \| AclEntityConstants::OPERATION_MASK_UPDATE`, <br /> `AclEntityConstants::OPERATION_MASK_CRUD` |
| scope | There are 3 types of rules: *Global*, *Segment* and *Inherited*. Their features and differences are described below. | `AclEntityConstants::SCOPE_GLOBAL`, `AclEntityConstants::SCOPE_SEGMENT`, `AclEntityConstants::SCOPE_INHERITED` |

## Scope

The concept of scopes is very flexible. It lets you create any rules that suit the needs of your system. For example:

- Grant read-only access to "All Products".
- Grant read-write access to "All Products".
- Grant read-write to "All Products in DE store".
- Grant read-write to "All Products in DE store" and read-only to "All Products".
- Grant read-write to "All Orders, Products, Offers of Merchant VideoKing".
- Grant read access to "All Users that have Orders of Merchant VideoKing".
- Grant read access to "All Shipments that are connected to Orders of Merchant VideoKing".
- Grant read-write for "Products that have  prices >= 1000$" and read-only for "All Products".

As mentioned above, there are 3 types of scopes: `global`, `segment` and `inherited`.
In the database layer scope represented as enum:

| Scope | Database value |
|-----|-----|
| global | 0 |
| segment | 1 |
| inherited | 2 |

Depending on the scope, the system behaves differently. Read the documentation for each of them:
- [Global scope](/docs/pbc/all/user-management/{{page.version}}/marketplace/persistence-acl-feature-overview/rules-and-scopes/global-scope.html)
- [Segment scope](/docs/pbc/all/user-management/{{page.version}}/marketplace/persistence-acl-feature-overview/rules-and-scopes/segment-scope.html)
- [Inherited scope](/docs/pbc/all/user-management/{{page.version}}/marketplace/persistence-acl-feature-overview/rules-and-scopes/inherited-scope.html)
- [Composite entity](/docs/pbc/all/user-management/{{page.version}}/marketplace/persistence-acl-feature-overview/rules-and-scopes/composite-entity.html)

## Default rule

If a user performs any operation on an entity for which he has no rules, the default rule is triggered. The default rule can be configured both within a specific class and in a general context.

A class context takes precedence over a general context. Persistence ACL feature is especially useful when all database tables are connected simultaneously. For more details, see configuration<!--](/docs/pbc/all/user-management/{{page.version}}/marketplace/persistence-acl-feature-overview/persistence-acl-feature-configuration.html#connect-persistence-acl-feature-to-all-database-tables) check that the link works -->. Thus, you can define publicly available entities such as `Country`, `Currency`, and `Region`.

The default rule configuration is described in the [configuration document](/docs/pbc/all/user-management/{{page.version}}/marketplace/persistence-acl-feature-overview/persistence-acl-feature-configuration.html).

{% info_block infoBox "Info" %}

We recommend keeping the default permission for global context as 0 (no permission at all), which will ensure that sensitive data is protected by default.

{% endinfo_block %}

## Permission concept
Permission mask (`spy_acl_entity_rule.permission_mask)` is a binary representation of the operations that this rule allows.
Every CRUD operation has its own binary mask.

| Operation | Binary mask | Integer representation |
|-----|-----|-----|
| Read |`0b1` | 1 |
| Create |`0b10` | 2  |
| Update |`0b100` | 4 |
| Delete |`0b1000` | 8 |

For details, see [Spryker\Shared\AclEntity\AclEntityConstants](https://github.com/spryker/acl-entity/blob/master/src/Spryker/Shared/AclEntity/AclEntityConstants.php).

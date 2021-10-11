---
title: Rules and scopes
last_updated: Sep 14, 2021
template: concept-topic-template
---

The functionality of this feature based on such fundamental concepts as Rule and Configuration.
It is very important to understand that the rule, in contrast to the configuration, which is common for the system,
is tied to the user (more precisely to his roles) and determines the user's rights regarding the entity.

## Rule
One of the fundamental concepts of the Persistence ACL module is an entity rule.
It is the rule that determines the capabilities and permissions of the current user.
The rule is an entry in the `spy_acl_entity_rule` table.

| Column | Description | Data example |
|-----|-----|-----|
| id_acl_entity_rule | auto incremental primary key | |
| fk_acl_entity_segment | A reference to the data segment to which the rule applies. The segment concept is described below. | |
| fk_acl_role | The foreign key to the role to which the rule is applied. The rules are applied not to specific users, but to roles, which makes their use extremely flexible. | |
| entity | Entity class. You must specify the full namespace without a leading slash. | `Orm\Zed\Product\Persistence\SpyProductAbstract`, `Orm\Zed\Store\Persistence\SpyStore` |
| permission_mask | An integer representation of the binary permission mask (see [Permission concept](#permission-concept) documentation) . | `AclEntityConstants::OPERATION_MASK_READ`, <br />`AclEntityConstants::OPERATION_MASK_READ \| AclEntityConstants::OPERATION_MASK_UPDATE`, <br /> `AclEntityConstants::OPERATION_MASK_CRUD` |
| scope | There are 3 types of rules: Global, Segment and Inherited. Their features and differences are described below | `AclEntityConstants::SCOPE_GLOBAL`, `AclEntityConstants::SCOPE_SEGMENT`, `AclEntityConstants::SCOPE_INHERITED` |

## Scope
The concept of scopes is very flexible. It allows you to create any rules to suit the needs of your system. For example:
- Grant read-only access to "All Products"
- Grant read-write access to "All Products"
- Grant read-write to "All Products in DE store"
- Grant read-write to "All Products in DE store" and read-only to "All Products"
- Grant read-write to "All Orders, Products, Offers of Merchant VideoKing"
- Grant read access to "All Users that have Orders of Merchant VideoKing"
- Grant read access to "All Shipments that are connected to Orders of Merchant VideoKing"
- Grant read-write for "Products that have  prices >= 1000$" and read-only for "All Products"

As mentioned above, there are 3 types of scopes: `global`, `segment` and `inherited`.
In the database layer scope represented as enum

| Scope | Database value |
|-----|-----|
| global | 0 |
| segment | 1 |
| inherited | 2 |

The behavior of the system differs depending on the scope used. Please read the documentation for each of them:segment-scope.md
- [Global scope](./global-scope.html)
- [Segment scope](./segment-scope.html)
- [Inherited scope](./inherited-scope.html)
- [Composite entity](./composite-entity.html)

## Default rule

When a user performs any operations with an entity for which he has no rules, the default rule triggered.
The default rule can be configured both in the context of a specific class and in a general context.
The class context takes precedence over the general context.
This feature is especially in demand when the Persistence ACL feature connected to all database tables at once (See [configuration](../configuration.html#connect-persistence-acl-feature-to-all-tables) for details).
Thus, you can define such publicly available entities as `Country`, `Currency`, `Region`, etc.
The configuration of the default rule described in the [configuration section](../configuration.html).

**_The default rule for global context is recommended to keep as 0 (no permission at all), this will ensure the sensitive data is protected by default._**

## Permission concept
Permission mask (`spy_acl_entity_rule.permission_mask)` is a binary representation of the operations that this rule allows.
Each CRUD operation has its own binary mask.

| Operation | Binary mask | Integer representation |
|-----|-----|-----|
| Read |`0b1` | 1 |
| Create |`0b10` | 2  |
| Update |`0b100` | 4 |
| Delete |`0b1000` | 8 |

See [Spryker\Shared\AclEntity\AclEntityConstants](https://github.com/spryker/acl-entity/blob/master/src/Spryker/Shared/AclEntity/AclEntityConstants.php) for details.

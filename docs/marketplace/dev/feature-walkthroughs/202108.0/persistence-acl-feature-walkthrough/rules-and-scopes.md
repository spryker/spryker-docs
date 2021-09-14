---
title: Rules and scopes
last_updated: Sep 14, 2021
template: concept-topic-template
---

The functionality of this module based on such fundamental concepts as Rule and Configuration.
It is very important to understand that the rule tied to the user (more precisely to the user roles) and determines user rights regarding the entity.
The configuration is common for the entire system and determines such things as the rules for inheriting one entity from another, default entity permissions, segmentation settings, etc.

## Rule
One of the fundamental concepts of the Persistence ACL module is a rule.
It is the rule that determines the capabilities and permissions of the current user.
The rule is an entry in the `spy_acl_entity_rule` table.

| Column | Description | Data example |
|-----|-----|-----|
| id_acl_entity_rule | auto incremental primary key | 1, 5, 115 |
| fk_acl_entity_segment | A reference to the data segment to which the rule applies. The segment concept is described below. | 1, 15, 124 |
| fk_acl_role | The reference to the role to which the rule is applied. The rules are applied not to specific users, but to roles, which makes their use extremely flexible. | 12, 56, 221 |
| entity | Entity class. You must specify the full namespace without a leading slash. | `Orm\Zed\Product\Persistence\SpyProductAbstract`, `Orm\Zed\Store\Persistence\SpyStore` |
| permission_mask | An integer representation of the binary permission mask. The permission mask concept  is described below. | 1, 4, 5, 15 |
| scope | There are 3 types of rules: Global, Segment and Inherited. Their features and differences are described below | 0, 1, 2 |

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

### Global
![Global scope](https://confluence-connect.gliffy.net/embed/image/61268adb-9b3c-46f4-a83c-ed5862420298.png?utm_medium=live&utm_source=custom)

The global scope rules applied globally to the entire collection of specified entities.
If the user has a global rule with the corresponding permission, then Persistence ACL will not restrict the user in his actions at all.
If the current user has a global scope rule with the appropriate permission, the original query to the database will remain unchanged.

`spy_acl_entity_rule`

| fk_acl_entity_segment | fk_acl_role | entity | permission_mask | scope |
|-----|-----|-----|-----|-----|
| null | 15  | `Orm\Zed\Sales\Persistence\SpySalesOrder` | 1 | 0 |

Query before Persistence ACL
```sql
SELECT * FROM `spy_sales_order` ORDER BY `updated_at` DESC;
```

Query after Persistence ACL
```sql
SELECT * FROM `spy_sales_order` ORDER BY `updated_at` DESC;
```

### Segment
![Segment scope](https://confluence-connect.gliffy.net/embed/image/bf400b2a-6872-479c-a3df-e4686894eace.png?utm_medium=live&utm_source=custom)

The segment rules allow you to grant permissions to subset records of the same type.
A subset can contain as many records as you want.
There are few examples of data segments:
- Orders of DE store
- Orders of total of > 100$
- Orders of US store
- Orders from customer #3


`spy_acl_entity_rule`

| fk_acl_entity_segment | fk_acl_role | entity | permission_mask | scope |
|-----|-----|-----|-----|-----|
| 3 | 15 | `Orm\Zed\Sales\Persistence\SpySalesOrder` | 1 | 0 |

`spy_acl_entity_segment`

| id_acl_entity_segment | name | reference |
|-----|-----|-----|
| 3 | Orders of DE store | orders-de |

`spy_acl_entity_segment_sales_order`

| fk_sales_order | fk_acl_entity_segment |
|-----|-----|
| 35 | 3 |
| 36 | 3 |
| 1115 | 3 |

Query before Persistence ACL
```sql
SELECT * FROM `spy_sales_order` ORDER BY `updated_at` DESC;
```

Query after Persistence ACL
```sql
SELECT `spy_sales_order`.* 
FROM `spy_sales_order` 
  INNER JOIN `spy_acl_entity_segment_sales_order` 
    ON (`spy_sales_order`.`id_sales_order`=`spy_acl_entity_segment_sales_order`.`fk_sales_order` 
      AND `spy_acl_entity_segment_sales_order`.`fk_acl_entity_segment` IN (3))
ORDER BY `spy_sales_order`.`updated_at` DESC;
```

### Inherited
![Inherited scope](https://confluence-connect.gliffy.net/embed/image/e473a9ca-2eb7-481d-b0c4-72d2563ec466.png?utm_medium=live&utm_source=custom)
Inherited scope rules used when you need to grant access to an entity (child) that inherits from another entity (parent).
Here are some examples of inheritance:
- MerchantProductAbstracts → Merchants (through `MerchantProductAbstract.fk_merchant`)
- MerchantSalesOrders → Merchants (through `MerchantSalesOrder.merchant_reference`)
- Shipments → Orders (through `Shipment.order_reference`)

Inheritance rules (child → parent relation) set in the configuration. The configuration described below.

Let's look at an example where a user has a configuration where SpyMerchantProductAbstract inherits from SpyMerchant, and the user has 2 rules:
- inherited for `MerchantProductAbstract`
- segment for `Merchant`

`spy_acl_entity_rule`

| fk_acl_entity_segment | fk_acl_role | entity | permission_mask | scope |
|-----|-----|-----|-----|-----|
| null | 15 | `Orm\Zed\MerchantProduct\Persistence\SpyMerchantProductAbstract` | 1 | 2 |
| 5 | 15 | `Orm\Zed\Merchant\Persistence\SpyMerchant` | 1 | 1 |

`spy_acl_entity_segment`

| id_acl_entity_segment | name | reference |
|-----|-----|-----|
| 5 | Merchant Video King | merchant-video-king |

`spy_acl_entity_segment_merchant`

| fk_merchant | fk_acl_entity_segment |
|-----|-----|
| 112 | 5 |

Query before Persistence ACL
```sql
SELECT * FROM `spy_merchant_product_abstract` ORDER BY `updated_at` DESC;
```

Query after Persistence ACL
```sql
SELECT `spy_merchant_product_abstract`.* 
FROM `spy_merchant_product_abstract`
  INNER JOIN `spy_merchant` ON (`spy_merchant_product_abstract`.`fk_merchant` = `spy_merchant`.`id_merchant`)
  INNER JOIN `spy_acl_entity_segment_merchant`
    ON (`spy_merchant`.`id_merchant` = `spy_acl_entity_segment_merchant`.`fk_merchant` 
      AND `spy_acl_entity_segment_merchant`.`fk_acl_entity_segment` IN (5))
ORDER BY `spy_merchant_product_abstract`.`updated_at` DESC; 
```

It is very important to understand that permissions checked in the context of roles. The rules of one role do not affect the rules of another.
Below is an example with two roles:
1. DE product manager (Full CRUD for products in DE store)
2. US product viewer (View only for products in US store)

`spy_acl_role`

| id_acl_role | name | reference |
|-----|-----|-----|
| 1 | DE product manager | de_product_manager |
| 2 | US product viewer | us_product_viewer  |

`spy_acl_entity_rule`

| id_acl_entity_rule | fk_acl_entity_segment | fk_acl_role | entity | permission_mask | scope |
|-----|-----|-----|-----|-----|-----|
| 1 | null | 1 | `Orm\Zed\Product\Persistence\SpyProduct` | 15 | 2 |
| 2 | null | 1 | `Orm\Zed\Product\Persistence\SpyProductAbstract` | 15 | 2 |
| 3 | null | 1 | `Orm\Zed\Product\Persistence\SpyProductAbstractStore` | 15 | 2 |
| 4 | 1 | 1 | `Orm\Zed\Store\Persistence\SpyStore` | 1  | 1 |
| 5 | null | 2 | `Orm\Zed\Product\Persistence\SpyProduct` | 1  | 2 |
| 6 | null | 2 | `Orm\Zed\Product\Persistence\SpyProductAbstract` | 1  | 2 |
| 7 | null | 2 | `Orm\Zed\Product\Persistence\SpyProductAbstractStore` | 1  | 2 |
| 8 | 2 | 2 | `Orm\Zed\Store\Persistence\SpyStore` | 1  | 1 |

Note that rules with IDs 1, 2, 3 and 4 refer to one role (`fk_acl_role`: 1), and 5, 6, 7 and 8 to another (` fk_acl_role`: 2).
The context of a rule is limited by the role to which it is bound.
That is why a user with such set of roles and rules will be able to
- Perform CRUD actions for products in the DE store
- Read only for products in the US store

### Default rule

When a user performs any operations with an entity for which he has no rules, the default rule triggered.
The default rule can be configured both in the context of a specific class and in a general context.
The class context takes precedence over the general context.
This feature is especially in demand when the Persistence ACL module connected to all database tables at once.
Thus, you can define such publicly available entities as `Country`, `Currency`, `Region`, etc.
The configuration of the default rule described in the configuration section.

## Composite entity

![Composite entity](https://confluence-connect.gliffy.net/embed/image/e57de4b7-b231-4e9b-8e5f-7cf64ed78874.png?utm_medium=live&utm_source=custom)

Some Domain Entities represented by multiple tables in the database.
In order to make the feature usable, CompositeEntity concept introduced:
A Composite entity consists of one Main Entity and one or more SubEntities.
Access granted implicitly. One AclEntityRule for Main Entity will grant access to all its Sub Entities.
A Sub Entity cannot be used in AclEntityRule or Segment as a standalone one.

Composite entity examples:
- ProductAbstract
    - ProductAbstract + ProductConcrete + ProductPrice + ProductImage + ProductOptions
- Merchant
    - Merchant + MerchantProfile + MerchantUser + MerchantStore
- Order
    - Order + OrderItems + OrderTotals

If the user makes a request for a sub entity, the main entity will be joined, and the rules for the main entity will be applied.

`spy_acl_entity_rule`

| fk_acl_entity_segment | fk_acl_role | entity | permission_mask | scope |
|-----|-----|-----|-----|-----|
| 18 | 15 | `\Orm\Zed\Merchant\Persistence\SpyMerchant` | 1 | 1 |

`spy_acl_entity_segment_merchant`

| id_acl_entity_segment | name | reference |
|-----|-----|-----|
| 18 | Merchant Video King | merchant-video-king |

Query before Persistence ACL
```sql
SELECT * FROM `spy_merchant_profile`;
```

Query after Persistence ACL
```sql
SELECT `spy_merchant_profile`.* 
FROM `spy_merchant_profile`
  INNER JOIN `spy_merchant` ON (`spy_merchant_profile`.`fk_merchant` = `spy_merchant`.`id_merchant`)
  INNER JOIN `spy_acl_entity_segment_merchant`
    ON (`spy_merchant`.`id_merchant` = `spy_acl_entity_segment_merchant`.`fk_merchant` 
      AND `spy_acl_entity_segment_merchant`.`fk_acl_entity_segment` IN (18)); 
```

## Permission mask
Permission mask (`spy_acl_entity_rule.permission_mask)` is a binary representation of the operations that this rule allows.
Each CRUD operation has its own binary mask.

| Operation | Binary mask | Integer representation |
|-----|-----|-----|
| Read |`0b1` | 1 |
| Create |`0b10` | 2  |
| Update |`0b100` | 4 |
| Delete |`0b1000` | 8 |

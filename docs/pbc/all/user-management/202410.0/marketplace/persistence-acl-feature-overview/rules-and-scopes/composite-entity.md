---
title: Composite entity
last_updated: Nov 05, 2021
description: Composite entities of one Main Entity and one or more SubEntities and are represented by multiple tables in the database.
template: concept-topic-template
---

There are some Domain Entities represented by multiple tables in the database. To make the feature usable, the CompositeEntity concept was introduced: Composite entities consist of one Main Entity and one or more SubEntities. Access is granted implicitly. An AclEntityRule for the Main Entity grants access to all its Sub Entities. Sub Entities cannot be used as standalone entities in an AclEntityRule or Segment.

Composite entity examples:

- ProductAbstract
  - ProductAbstract + ProductConcrete + ProductPrice + ProductImage + ProductOptions
- Merchant
  - Merchant + MerchantProfile + MerchantUser + MerchantStore
- Order
  - Order + OrderItems + OrderTotals

![Composite entity](https://confluence-connect.gliffy.net/embed/image/e57de4b7-b231-4e9b-8e5f-7cf64ed78874.png?utm_medium=live&utm_source=custom)

If a user requests a sub entity, the main entity will be joined, and the rules for the main entity will apply.

`spy_acl_entity_rule`

| fk_acl_entity_segment | fk_acl_role | entity | permission_mask | scope |
|-----|-----|-----|-----|-----|
| 18 | 15 | `\Orm\Zed\Merchant\Persistence\SpyMerchant` | 1 | 1 |

`spy_acl_entity_segment_merchant`

| id_acl_entity_segment | name | reference |
|-----|-----|-----|
| 18 | Merchant Video King | merchant-video-king |

Query before the Persistence ACL:
```sql
SELECT * FROM `spy_merchant_profile`;
```

Query after the Persistence ACL:
```sql
SELECT `spy_merchant_profile`.* 
FROM `spy_merchant_profile`
  INNER JOIN `spy_merchant` ON (`spy_merchant_profile`.`fk_merchant` = `spy_merchant`.`id_merchant`)
  INNER JOIN `spy_acl_entity_segment_merchant`
    ON (`spy_merchant`.`id_merchant` = `spy_acl_entity_segment_merchant`.`fk_merchant` 
      AND `spy_acl_entity_segment_merchant`.`fk_acl_entity_segment` IN (18)); 
```

Although the composite entity has similar functionality to the internalized scope, there are some differences.

## Inherited scope vs Composite entity 

| FUNCTIONALITY | INHERITED SCOPE | COMPOSITE ENTITY |
|-----|-----|-----|
| Access granted through | Rule | Configuration |
| Permission mask is defined by | Rule | Inherit from Composite root |
| Assigned to | User (through the role) | Common for all users |
| Inherit permissions from the composite object | No | Yes |
| Require additional relation condition | At least `Read` permission rule for the parent | No | 

---
title: Composite entity
last_updated: Sep 14, 2021
template: concept-topic-template
---

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

The functionality of the composite entity is very similar to the internalized scope, however, it has some differences.

## Inherited scope vs Composite entity 
| | Inherited scope | Composite entity |
|-----|-----|-----|
| Access granted through | Rule | Configuration |
| Permission mask is defined by | Rule | Inherit from Composite root |
| Assigned to | User (through the role) | Common for all users |
| Can inherit permissions from the composite object | No | Yes |

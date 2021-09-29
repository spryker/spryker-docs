---
title: Inherited scope
last_updated: Sep 14, 2021
template: concept-topic-template
---

![Inherited scope](https://confluence-connect.gliffy.net/embed/image/e473a9ca-2eb7-481d-b0c4-72d2563ec466.png?utm_medium=live&utm_source=custom)
Inherited scope rules used when you need to grant access to an entity (child) that inherits from another entity (parent).
Here are some examples of inheritance:
- MerchantProductAbstracts → Merchants (through `MerchantProductAbstract.fk_merchant`)
- MerchantSalesOrders → Merchants (through `MerchantSalesOrder.merchant_reference`)
- Shipments → Orders (through `Shipment.order_reference`)

Inheritance rules (child → parent relation) set in the configuration (learn more about [Persistence ACL configuration](../configuration.html)).

Inherited scope functionality has one feature: it is enough to have **read** access right to the parent for successful inheritance for any operation (create/read/update/delete). 

Let's look at an example where a user has a configuration where SpyMerchantProductAbstract inherits from SpyMerchant, and the user has 2 rules:
- inherited for `MerchantProductAbstract`
- segment for `Merchant`

`spy_acl_entity_rule`

| fk_acl_entity_segment | fk_acl_role | entity | permission_mask | scope |
|-----|-----|-----|-----|-----|
| null | 15 | `Orm\Zed\MerchantProduct\Persistence\SpyMerchantProductAbstract` | `AclEntityConstants::OPERATION_MASK_READ` | `AclEntityConstants::SCOPE_INHERITED` |
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

It is very important to understand that permissions checked in the context of roles. 
The rules of one role do not affect the rules of another (learn more about [Execution Flow](../execution-flow.html)).
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
When a user has both roles and performs Update on a Product, the Persistence ACL engine will do the following:
- it will only find role #1 (because it has a rule that allows to update a product)
- the role #2 will not be taken into consideration at all as this role doesn't allow to update products.
  The context of a rule is limited by the role to which it is bound.
  That is why a user with such set of roles and rules will be able to
- Perform CRUD actions for products in the DE store
- Read only for products in the US store

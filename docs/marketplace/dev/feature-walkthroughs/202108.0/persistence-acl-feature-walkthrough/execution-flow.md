---
title: Execution flow
last_updated: Sep 14, 2021
template: concept-topic-template
---
## Query processing flow
Query processing flow

The process of selecting and applying a rule for a query and when performing a model action are similar, but still they have some difference.
If the user does not have enough permissions during query execution, the system will change the query so that the result of executing will be an empty collection.
![Query execution flow](https://confluence-connect.gliffy.net/embed/image/c84bb011-1c7c-45e7-84b3-f98b2fee8e08.png?utm_medium=live&utm_source=custom)

When processing a query, Persistence ACL will do the following:
- Find User Roles that have Rules for the Entity from the query and the Operation from the Query.
- Take all the Rule from the Role found and filter the Query performed.

If the remaining rules have different scopes, only those rules that apply to the highest priority scopes will be applied.

Scope priority is configurable. To configure it you should override `\Spryker\Zed\AclEntity\AclEntityConfig::getScopePriority()`.

The default priority

| Scope | Priority |
|-----|-----|
| global | 2 |
| inherited | 1 |
| segment | 0 |

You can see that rules with a global scoped have the highest priority, and rules with a segment scoped have the lowest priority by default.

### Example of select query
```php
use Orm\Zed\Merchant\Persistence\Map\SpyMerchantTableMap;
use Orm\Zed\Merchant\Persistence\SpyMerchantQuery;

$merchantQuery = SpyMerchantQuery::create()->orderBy(SpyMerchantTableMap::COL_UPDATED_AT);
$merchantCollection = $merchantQuery->find();
```

`spy_acl_entity_rule`

id_acl_entity_rule | fk_acl_entity_segment | fk_acl_role | entity | permission_mask | scope |
|-----|-----|-----|-----|-----|-----|
| 1 | null | 15 | `Orm\Zed\Country\Persistence\SpyCountry` | 1 | 0 |
| 2 | 12 | 15 | `Orm\Zed\Merchant\Persistence\SpyMerchant` | 15 | 1 |
| 3 | null | 15 | `Orm\Zed\Sales\Persistence\SpySalesOrderItem` | 7 | 2 |
| 4 | null | 15 | `Orm\Zed\Customer\Persistence\SpyCustomer` | 1 | 0 |
| 5 | null | 15 | `Orm\Zed\Merchant\Persistence\SpyMerchant` | 6 | 0 |
| 6 | 138 | 15 | `Orm\Zed\Merchant\Persistence\SpyMerchant` | 1 | 1 |

The rules with id `1`, `3`, `4` filtered out because they belong not to `Orm\Zed\Merchant\Persistence\SpyMerchant`.
The rules with id `5` filtered out because it doesn't relate to query operation (query has `read` operation, but rule configured for `create` and `update` actions).
Only the rules with id `2` and `6` will be considered for the given query. Both of them have `segment` scope.
Persistence ACL modifies the query in such a way that only those records to which the user has rights will be returned:

Query before Persistence ACL
```sql
SELECT * FROM `spy_merchant` order by `updated_at`;
```

Query after Persistence ACL
```sql
SELECT `spy_merchant`.* 
FROM `spy_merchant`
  INNER JOIN `spy_acl_entity_segment_merchant` 
    ON (`spy_merchant`.`id_merchant` = `spy_acl_entity_segment_merchant`.`fk_merchant`
      AND `spy_acl_entity_segment_merchant`.`fk_acl_entity_segment` IN (12, 138))
ORDER BY `spy_merchant`.`updated_at`;
```

## Model action processing flow

The process of processing models actions is generally similar to the process of processing a query, but there are some differences:
If the user performs unauthorized actions on the Active Record model (create, update or delete), then an exception will be thrown.

![Model action execution flow](https://confluence-connect.gliffy.net/embed/image/c84bb011-1c7c-45e7-84b3-f98b2fee8e08.png?utm_medium=live&utm_source=custom)

### Example of create action

```php
use Orm\Zed\Product\Persistence\SpyProductAbstract;

$productAbstractEntity = new SpyProductAbstract();
$productAbstractEntity->setSku('006');

$productAbstractEntity->save();
```

`spy_acl_entity_rule`

id_acl_entity_rule | fk_acl_entity_segment | fk_acl_role | entity | permission_mask | scope |
|-----|-----|-----|-----|-----|-----|
| 1 | null | 15 | `Orm\Zed\Country\Persistence\SpyCountry` | 1 | 0 |
| 2 | 3 | 15 | `Orm\Zed\Product\Persistence\SpyProductAbstract` | 13 | 1 |
| 3 | null | 15 | `Orm\Zed\Store\Persistence\SpyStore` | 1  | 0 |
| 4 | null | 16 | `Orm\Zed\Product\Persistence\SpyProductAbstract` | 7 | 0 |

The rules with id `1` and `3` filtered out because they don't belong to `Orm\Zed\Product\Persistence\SpyProductAbstract`.
The rule with id `2` filtered out because it does not grant `create` permission, so rule ID `4` will apply, and the create operation will be allowed.

If there were no rule with id `4`, a `Spryker\Zed\AclEntity\Persistence\Exception\OperationNotAuthorizedException` would be thrown.


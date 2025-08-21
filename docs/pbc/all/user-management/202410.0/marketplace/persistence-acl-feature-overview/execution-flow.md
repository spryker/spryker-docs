---
title: Execution flow
last_updated: Nov 05, 2021
description: Performing model actions and selecting and applying rules for a query share some similarities, but they have some differences as well. A user with insufficient permissions during query execution will be forced to run a query that results in an empty collection when the system executes the query.
template: concept-topic-template
redirect_from:
---

## Query processing flow

Performing model actions and selecting and applying rules for a query share some similarities, but they have some differences as well. A user with insufficient permissions during query execution will be forced to run a query that results in an empty collection when the system executes the query.

![Query processing flow](https://confluence-connect.gliffy.net/embed/image/9f520855-8387-4dda-a028-abe70e11611a.png?utm_medium=live&utm_source=custom)

Persistence ACL will do the following when processing a query:

- Identify the User Roles that have Rules for the Entity and Operation from the query.
- Filter the Query performed, based on all the rules in the Role found.

Whenever there are multiple rules with different scopes, only those that apply to the higher priority scopes are applied.

The priority of scope is configurable. To modify it, you should override `\Spryker\Zed\AclEntity\AclEntityConfig::getScopePriority()`.

The default priority:

| SCOPE | PRIORITY |
|-----|-----|
| global | 2 |
| inherited | 1 |
| segment | 0 |

By default, rules with a global scope have the highest priority, and rules with a segment scope have the lowest priority.

### Example of the select query

You can check the logic of selecting rules based on the following query.

```php
use Orm\Zed\Merchant\Persistence\Map\SpyMerchantTableMap;
use Orm\Zed\Merchant\Persistence\SpyMerchantQuery;

$merchantQuery = SpyMerchantQuery::create()->orderBy(SpyMerchantTableMap::COL_UPDATED_AT);
$merchantCollection = $merchantQuery->find();
```

`spy_acl_entity_rule`

| id_acl_entity_rule | fk_acl_entity_segment | fk_acl_role | entity | permission_mask | scope |
|-----|-----|-----|-----|-----|-----|
| 1 | null | 15 | `Orm\Zed\Country\Persistence\SpyCountry` | 1 | 0 |
| 2 | 12 | 15 | `Orm\Zed\Merchant\Persistence\SpyMerchant` | 15 | 1 |
| 3 | null | 15 | `Orm\Zed\Sales\Persistence\SpySalesOrderItem` | 7 | 2 |
| 4 | null | 15 | `Orm\Zed\Customer\Persistence\SpyCustomer` | 1 | 0 |
| 5 | null | 15 | `Orm\Zed\Merchant\Persistence\SpyMerchant` | 6 | 0 |
| 6 | 138 | 15 | `Orm\Zed\Merchant\Persistence\SpyMerchant` | 1 | 1 |

All rules with ID `1`, `3`, `4` are filtered out since they do not belong to `Orm\Zed\Merchant\Persistence\SpyMerchant`. The rule with ID `5` is filtered out since it does not relate to query operation (query has read operation, but rule is configured for `create` and `update` actions). For the given query, only the rules with ids `2` and `6` will be considered. They both have `segment` scope.

The Persistence ACL modifies the query so that only records that the user has access to are returned:

Query before the Persistence ACL:

```sql
SELECT * FROM `spy_merchant` order by `updated_at`;
```

Query after the Persistence ACL:

```sql
SELECT `spy_merchant`.*
FROM `spy_merchant`
  INNER JOIN `spy_acl_entity_segment_merchant`
    ON (`spy_merchant`.`id_merchant` = `spy_acl_entity_segment_merchant`.`fk_merchant`
      AND `spy_acl_entity_segment_merchant`.`fk_acl_entity_segment` IN (12, 138))
ORDER BY `spy_merchant`.`updated_at`;
```

## Model action processing flow

Model actions are generally handled the same way as queries, but there are certain differences:

Exceptions are thrown if a user performs unauthorized actions on the Active Record model (create, update or delete).

![Model action processing flow](https://confluence-connect.gliffy.net/embed/image/c84bb011-1c7c-45e7-84b3-f98b2fee8e08.png?utm_medium=live&utm_source=custom)

### Example of the create action

You can check the logic of selecting rules based on the following query.

```php
use Orm\Zed\Product\Persistence\SpyProductAbstract;

$productAbstractEntity = new SpyProductAbstract();
$productAbstractEntity->setSku('006');

$productAbstractEntity->save();
```

`spy_acl_entity_rule`

| id_acl_entity_rule | fk_acl_entity_segment | fk_acl_role | entity | permission_mask | scope |
|-----|-----|-----|-----|-----|-----|
| 1 | null | 15 | `Orm\Zed\Country\Persistence\SpyCountry` | 1 | 0 |
| 2 | 3 | 15 | `Orm\Zed\Product\Persistence\SpyProductAbstract` | 13 | 1 |
| 3 | null | 15 | `Orm\Zed\Store\Persistence\SpyStore` | 1  | 0 |
| 4 | null | 16 | `Orm\Zed\Product\Persistence\SpyProductAbstract` | 7 | 0 |

The rules with ID `1` and `3` are filtered out since they do not belong to `Orm\Zed\Product\Persistence\SpyProductAbstract`. Because rule ID `2` does not grant permission to `create`, the rule with ID `4` will apply instead, and the creation will be allowed.

If there were no rule with ID `4`, a `Spryker\Zed\AclEntity\Persistence\Exception\OperationNotAuthorizedException` would be thrown.

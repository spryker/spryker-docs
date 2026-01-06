---
title: Global scope
last_updated: Nov 05, 2021
description: Global scope rules apply to an entire collection of entities (for example, Users, Orders).
template: concept-topic-template
---

Global scope rules apply to an entire collection of entities (for example, Users, Orders).

As long as the user has the corresponding global rule with permissions, the Persistence ACL will not restrict the user from performing their actions. Accordingly, if the current user has the appropriate permission on a global scope rule, the database query will remain unchanged.

![Global scope](https://confluence-connect.gliffy.net/embed/image/61268adb-9b3c-46f4-a83c-ed5862420298.png?utm_medium=live&utm_source=custom)

`spy_acl_entity_rule`

| fk_acl_entity_segment | fk_acl_role | entity | permission_mask | scope |
|-----|-----|-----|-----|-----|
| null | 15  | `Orm\Zed\Sales\Persistence\SpySalesOrder` | `AclEntityConstants::OPERATION_MASK_READ` | `AclEntityConstants::SCOPE_GLOBAL` |

Query before the Persistence ACL:

```sql
SELECT * FROM `spy_sales_order` ORDER BY `updated_at` DESC;
```

Query after the Persistence ACL:

```sql
SELECT * FROM `spy_sales_order` ORDER BY `updated_at` DESC;
```


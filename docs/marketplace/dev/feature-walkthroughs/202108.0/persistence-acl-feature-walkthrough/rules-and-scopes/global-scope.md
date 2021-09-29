---
title: Global scope
last_updated: Sep 14, 2021
template: concept-topic-template
---

![Global scope](https://confluence-connect.gliffy.net/embed/image/61268adb-9b3c-46f4-a83c-ed5862420298.png?utm_medium=live&utm_source=custom)

The global scope rules applied globally to an entire entity collection (e.g Users, Orders. etc).
If the user has a global rule with the corresponding permission, then Persistence ACL will not restrict the user in his actions at all.
If the current user has a global scope rule with the appropriate permission, the original query to the database will remain unchanged.

`spy_acl_entity_rule`

| fk_acl_entity_segment | fk_acl_role | entity | permission_mask | scope |
|-----|-----|-----|-----|-----|
| null | 15  | `Orm\Zed\Sales\Persistence\SpySalesOrder` | `AclEntityConstants::OPERATION_MASK_READ` | `AclEntityConstants::SCOPE_GLOBAL` |

Query before Persistence ACL
```sql
SELECT * FROM `spy_sales_order` ORDER BY `updated_at` DESC;
```

Query after Persistence ACL
```sql
SELECT * FROM `spy_sales_order` ORDER BY `updated_at` DESC;
```


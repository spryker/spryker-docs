---
title: Segment scope
last_updated: Nov 05, 2021
description: The segment rules let you grant permissions to subset of an entity collection. Segment entities are connected through a plain many-to-many tables, this allows minimizing performance impact.
template: concept-topic-template
---

The segment rules let you grant permissions to subset of an entity collection.
Segment entities are connected through a plain many-to-many tables, this allows minimizing performance impact.

A subset can contain as many records as you want.
There are few examples of data segments:

- Orders of DE store
- Orders of total of > 100$
- Orders of US store
- Orders from customer #3

![Segment scope](https://confluence-connect.gliffy.net/embed/image/bf400b2a-6872-479c-a3df-e4686894eace.png?utm_medium=live&utm_source=custom)

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

Query before the Persistence ACL:
```sql
SELECT * FROM `spy_sales_order` ORDER BY `updated_at` DESC;
```

Query after the Persistence ACL:
```sql
SELECT `spy_sales_order`.*
FROM `spy_sales_order`
  INNER JOIN `spy_acl_entity_segment_sales_order`
    ON (`spy_sales_order`.`id_sales_order`=`spy_acl_entity_segment_sales_order`.`fk_sales_order`
      AND `spy_acl_entity_segment_sales_order`.`fk_acl_entity_segment` IN (3))
ORDER BY `spy_sales_order`.`updated_at` DESC;
```

## Dynamic segments
Since segments are defined using a many-to-many table, projects can create dynamic segments.

By handling events such as `Product created` and `Product updated`, you can maintain a special segment of products (for example,red products).

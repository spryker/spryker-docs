---
title: Migrate CTEs, Raw SQL queries, Views, Procedures etc.
description: This document describes how to migrate CTEs, Raw SQL queries, Views, Procedures etc.
template: howto-guide-template
---

# Migrate CTEs, Raw SQL queries, Views, Procedures etc.

{% info_block infoBox %}

## Resources for assessment Backend

{% endinfo_block %}

`CTE` performance in `MariaDB` is not as performant as in `PostgreSQL`, therefore it’s better to replace `CTE` implementation
with raw `SQL` styled bulk inserts. However, `MariaDB` is still compatible with `CTE` and this implementation can remain
in place if the performance is efficient enough.

1. Rework `CTE` usage to raw `SQL` styled bulk inserts if `CTE` performance with `MariaDB` is not efficient enough.
2. Review code and migrate old DB specific raw `SQL` to be compatible with `MariaDB`.
3. Having the list of custom DB structures from prerequisites each of them has to be migrated to `MariaDB`, this is related to:
    * temporary tables
    * materialised views
    * etc.
4. Procedures and Functions have to be doubled checked individually since there might be compatibility issues between RDBMSs
    different from `MariaDB`.

## Example of similar CTE and bulk insert query

CTE:
```sql
WITH records AS (
    SELECT
      input.discount,
      input.warehouses,
      input.concrete_sku,
      input.is_active,
      input.attributes,
      input.sku_product_abstract,
      id_product as idProduct,
      id_product_abstract as fk_product_abstract
    FROM (
           SELECT
             unnest(? :: INTEGER []) AS discount,
             unnest(? :: TEXT []) AS warehouses,
             unnest(? :: VARCHAR []) AS concrete_sku,
             unnest(? :: BOOLEAN []) AS is_active,
             json_array_elements(?) AS attributes,
             unnest(? :: VARCHAR []) AS sku_product_abstract
         ) input
      LEFT JOIN spy_product ON spy_product.sku = input.concrete_sku
      INNER JOIN spy_product_abstract a on sku_product_abstract = a.sku 
),
    updated AS (
    UPDATE spy_product
    SET
      discount = records.discount,
      warehouses = records.warehouses,
      sku = records.concrete_sku,
      fk_product_abstract = records.fk_product_abstract,
      is_active = records.is_active,
      attributes = records.attributes,
      updated_at = now()
    FROM records
    WHERE records.concrete_sku = spy_product.sku
    RETURNING id_product,sku
  ),
    inserted AS(
    INSERT INTO spy_product (
      id_product,
      discount,
      warehouses,
      sku,
      is_active,
      attributes,
      fk_product_abstract,
      created_at,
      updated_at
    ) (
      SELECT
        nextval('spy_product_pk_seq'),
        discount,
        warehouses,
        concrete_sku,
        is_active,
        attributes,
        fk_product_abstract,
        now(),
        now()
      FROM records
      WHERE idProduct is null
    ) RETURNING id_product,sku
  )
SELECT updated.id_product,sku FROM updated UNION ALL SELECT inserted.id_product,sku FROM inserted;
```

Bulk insert:
```sql
INSERT INTO `spy_product` (`fk_product_abstract`, `discount`, `warehouses`, `sku`, `is_active`, `attributes`, `created_at`, `updated_at`)
VALUES (..., ..., ..., ..., ..., ..., ..., ...),
    (..., ..., ..., ..., ..., ..., ..., ...),
    .....
ON DUPLICATE KEY UPDATE
    `fk_product_abstract` = VALUES(`fk_product_abstract`),
    `discount` = VALUES(`discount`),
    `warehouses` = VALUES(`warehouses`),
    `is_active` = VALUES(`is_active`),
    `attributes` = VALUES(`attributes`),
    `updated_at` = VALUES(`updated_at`);
```

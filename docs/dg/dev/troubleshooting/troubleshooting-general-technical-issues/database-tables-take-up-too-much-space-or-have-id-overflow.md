---
title: Database tables take up too much space or have ID overflow
description: Learn how you can Configure transition logs to be removed automatically within your Spryker projects.
last_updated: Jun 4, 2025
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/database-tables-take-up-too-much-space-or-have-id-overflow
originalArticleId: 5c025e16-bfc2-4dcf-ba35-137044daa486
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/the-spy-oms-transition-log-table-takes-up-too-much-space.html
- /docs/dg/dev/troubleshooting/troubleshooting-general-technical-issues/the-spy-oms-transition-log-table-takes-up-too-much-space.html
---

Some database tables may require periodic monitoring, particularly in large-scale projects with a high volume of orders. Potential issues include excessive table size or the risk of an ID column reaching its maximum value.

{% info_block errorBox "Manipulating tables" %}

When solving issues using the following examples, make sure to follow them precisely. Table manipulations can significantly your shop. Always double-check all details before proceeding.


{% endinfo_block %}

## Cause

By default, table size is not limited and old records are not deleted.

## Tables to monitor

- `spy_oms_transition_log`
- `spy_oms_state_machine_lock`
- All tables the application frequently inserts into

## What to monitor

- Disk space occupied by big tables
- ID overflow: over integer field capacity, usually 2B for signed ints and 4B for unsigned

## Solutions

To prevent or mitigate issues related to table size or ID overflow, consider one of the following approaches based on your data retention needs and operational constraints.


### Delete old records

If historical data in the table is no longer relevant and only recent records need to be retained, remove the outdated entries:

```sql
DELETE FROM
	spy_oms_transition_log
WHERE
	created_at < CURRENT_DATE - interval '90' day;
```

Advantages:

- Reduces table size
- Simple and fast solution
- Allows retaining records from the most recent period

Disadvantages:

- Doesn't resolve the ID overflow issue
- Not suitable for tables containing important or critical data

### Truncate table

If the table data is no longer needed, you can truncated it to free up space and reset the ID counter:

```sql
TRUNCATE TABLE spy_oms_transition_log;
```

Advantages:

- Reduces table size
- Resolves the ID overflow issue
- Simple and fast solution

Disadvantages:

- Doesn't allow retaining records from the most recent period
- Not suitable for tables containing important or critical data

### Change the data type of auto-increment ID column

If a table has meaningful data that can't be removed, change the field type of the auto-incremented field from `INT` (2 bln, 2^31-1 limit) to `BIGINT` (2^63-1 limit) to prevent future overflow issues.

```sql
ALTER TABLE spy_oms_transition_log
MODIFY COLUMN id_oms_transition_log BIGINT auto_increment NOT NULL
```

```xml
<table name="spy_oms_transition_log" identifierQuoting="true">
    <column name="id_oms_transition_log" required="true" type="BIGINT" autoIncrement="true" primaryKey="true"/>
</table>
```

{% info_block infoBox "" %}

[spryker/oms:11.34.0](https://github.com/spryker/oms/releases/tag/11.34.0) is the minimum recommended version to avoid the problem with overflows in the `spy_oms_state_machine_lock` table.

We recommend upgrading Spryker modules as soon as Spryker releases important updates. The recommended interval is three months.

{% endinfo_block %}

Advantages:

- Resolves the ID overflow issue
- Allows all records to remain in the table

Disadvantages:

- Doesn't reduce table size
- If the table is large, this operation may be resource-intensive and require a maintenance window outside of business hours



























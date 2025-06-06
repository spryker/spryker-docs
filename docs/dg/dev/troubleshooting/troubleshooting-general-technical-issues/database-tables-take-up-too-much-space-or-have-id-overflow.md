---
title: Database tables take up too much space or have ID overflow
description: Learn how you can Configure transition logs to be removed automatically within your Spryker projects.
last_updated: Jun 4, 2025
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/database-tables-take-up-too-much-space-or-have-id-overflow
originalArticleId: 5c025e16-bfc2-4dcf-ba35-137044daa486
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/the-spy-oms-transition-log-table-takes-up-too-much-space.html
- /docs/the-spy-oms-transition-log-table-takes-up-too-much-space.html
---

Certain database tables may require periodic monitoring, particularly in large-scale projects with a high volume of orders. Potential issues include excessive table size or the risk of an ID column reaching its maximum value.

{% info_block errorBox "Manipulating tables" %}

Table manipulations can affect a shop greatly. It is not safe to do so, and we recommend double-checking all the details before you proceed. The instructions below can help you solve issues. Make sure to follow them exactly.

{% endinfo_block %}

## Cause

By default, nothing limits the table size or deletes old records.

## Tables to monitor

- `spy_oms_transition_log`;
- `spy_oms_state_machine_lock`;
- all tables that application frequently inserts into.

## What to monitor

- disk space occupied by big tables;
- ID overflow (over integer field capacity, usually 2B for signed ints and 4B for unsigned).

## Solutions

### Delete old records

If historical data in the table is no longer relevant and only recent records need to be retained, an SQL query can be used to remove the outdated entries.

```sql
DELETE FROM
	spy_oms_transition_log
WHERE
	created_at < CURRENT_DATE - interval '90' day;
```

Advantages:

- reduces table size;
- simple and fast solution;
- allows retaining records from the most recent period.

Disadvantages:

- does not resolve the ID overflow issue;
- not suitable for tables containing important or critical data.

### Truncate table

If the table data is no longer needed, it can be truncated to free up space and reset the ID counter.

```sql
TRUNCATE TABLE spy_oms_transition_log;
```

Advantages:

- reduces table size;
- resolves the ID overflow issue;
- simple and fast solution.

Disadvantages:

- does not allow retaining records from the most recent period;
- not suitable for tables containing important or critical data.

### Change data type of autoincrement ID column

If a table has meaningful data that can't be removed - change the field type of the auto-incremented field from INT (2 bln, 2^31-1 limit) to BIGINT (2^63-1 limit), practically making this issue unrealistically for the future.

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

[spryker/oms:11.34.0](https://github.com/spryker/oms/releases/tag/11.34.0) is minimal recommended version to avoid the problem with overflows within the `spy_oms_state_machine_lock` table.

It is recommended to upgrade Spryker modules as soon as Spryker releases important updates. Recommended interval is 3 months.

{% endinfo_block %}

Advantages:

- resolves the ID overflow issue;
- allows all records to remain in the table.

Disadvantages:

- Does not reduce table size.
- if the table is large enough, this operation may be resource-intensive and require a maintenance window outside of business hours.

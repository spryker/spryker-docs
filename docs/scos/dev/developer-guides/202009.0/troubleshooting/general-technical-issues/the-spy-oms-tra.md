---
title: The spy_oms_transition_log table takes up too much space
originalLink: https://documentation.spryker.com/v6/docs/the-spy-oms-transition-log-table-takes-up-too-much-space
redirect_from:
  - /v6/docs/the-spy-oms-transition-log-table-takes-up-too-much-space
  - /v6/docs/en/the-spy-oms-transition-log-table-takes-up-too-much-space
---

The `spy_oms_transition_log` table stores the history of order management system transitions. The logs are kept for debugging reasons. If you don't need them or you have backed them up, you can remove them.

{% info_block errorBox "Manipulating tables" %}

Table manipulations can affect a shop greatly. It is not safe to do so, and we recommend double-checking all the details before you proceed. The instructions below can help you solve a storage space issue. Make sure to follow them exactly.

{% endinfo_block %}

## Cause
By default, nothing limits the table size or deletes old records.

## Solution
Schedule the following SQL query to delete all the logs older than 90 days. You can adjust the time interval per your requirements.

```sql
DELETE FROM
	spy_oms_transition_log
WHERE
	created_at < CURRENT_DATE - interval '90' day;
```

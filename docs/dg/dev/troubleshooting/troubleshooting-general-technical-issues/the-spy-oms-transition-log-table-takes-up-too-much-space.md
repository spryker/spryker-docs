---
title: The spy_oms_transition_log table takes up too much space
description: Configure transition logs to be removed automatically.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/the-spy-oms-transition-log-table-takes-up-too-much-space
originalArticleId: 5c025e16-bfc2-4dcf-ba35-137044daa486
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/the-spy-oms-transition-log-table-takes-up-too-much-space.html
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

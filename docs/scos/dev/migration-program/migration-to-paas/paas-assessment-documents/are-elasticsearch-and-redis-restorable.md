---
title: Are ElasticSearch and Redis restorable?
description: This document allows you to assess if ElasticSearch and Redis are restorable.
template: howto-guide-template
---


## Resources for assessment

Backend

## Description

Based on prerequisites data identify if the environment is restorable via default Spryker utilities: `sync:data` and `publisher:trigger-events`.

## Formula for calculating the migration effort

### sync:data

Measurements were performed with the following prerequisites:

* `spy_*_storage` table with:
    * 10 GB size;
    * 7 000 000 rows;
* production-like environment;
* single Jenkins `queue:worker:start` task.

To do Redis restoration `sync:data {resource_name}` command has been executed and we have got the following numbers:

* `sync:data` command execution took **1h**;
* messages consumption with single worker task in Jenkins took another **4h** after `sync:data` completion.

In total it took **5h**. We assume to have no major differences for ES-based synchronisation.

Let’s do some math to understand how much time we need to get 1 GB of data synchronised:

`10 GB = 5h = 7 000 000 rows / 10 = 1 GB = 0.5h = 700 000 rows`

So **1 GB** or **700 000 rows** in `_storage` or `_search` tables could be synchronised in approximately **0.5h**.
Increasing the number of worker tasks in Jenkins can speed it up, for the phase of messages consumption which
took **4h** in this experiment.

So query size and amount of `_storage` & `_search` tables to see the approximate total time of restoration.

### publish:trigger-events

No formula can be invented here because it highly depends on each exact listener implementation.

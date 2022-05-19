---
title: Queue task flow in New Relic
description: This guideline explains how to enable queue task flow in New Relic.
last_updated: May 16, 2022
template: concept-topic-template
---

By default, the `spryker/monitoring` module groups all New Relic transactions generated from a console command by the command’s name. For example, `ooms:check-timeout`.

This strategy works in most cases, but you might want to override this behavior. For example, `queue:task:start {queue_name}`. With the default naming strategy, all the calls of the command with different queues are named `queue:task:start`. Transaction data is aggregated under the same name for all types of queue processors.

In New Relic dashboard, this looks as follows:

![Transactions under the same name](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/guidelines/performance-guidelines/elastic-computing/enable-queue-task-flow-in-new-relic.md/transactions-under-the-same-name.png)

{% info_block infoBox "" %}

Although transactions are collected under the same name, you can still query the data from a needed queue using [NRQL](https://docs.newrelic.com/docs/query-your-data/nrql-new-relic-query-language/get-started/nrql-syntax-clauses-functions/).

{% endinfo_block %}



## Group transactions by queue name

Enable `spryker/monitoring` module to aggregate `queue:task:start` transactions not only by command name, but by command and the first argument.

1. Provide an advanced extendable infrastructure for [New relic monitoring transaction](https://docs.newrelic.com/docs/apm/transactions/intro-transactions/transactions-new-relic-apm/) naming strategies. This lets you implement, configure, and override the default transaction naming behavior.
2. Implement the strategy that enables configured console commands to apply naming that groups transaction by command name and first argument.
3. Enable the new strategy for `queue:task:start` on the project level.

As a result, the transactions are displayed as follows:

![Aggregation of transactions](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/guidelines/performance-guidelines/elastic-computing/enable-queue-task-flow-in-new-relic.md/transactions-under-the-same-name.png)

## Integrate

For enabling queue task flow in New Relic, see Spryker elastic computing.

## Implementation details
![Class diagram]()

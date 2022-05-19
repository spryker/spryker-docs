---
title: New Relic transactions grouping by queue names
description: Enhanced New Relic queue flow groups transactions by queue names.
last_updated: May 16, 2022
template: concept-topic-template
---

By default, the `spryker/monitoring` module groups all New Relic transactions generated from a console command by the command’s name. For example, `ooms:check-timeout`.

This strategy works in most cases, and you can still query the data from a needed queue using [NRQL](https://docs.newrelic.com/docs/query-your-data/nrql-new-relic-query-language/get-started/nrql-syntax-clauses-functions/). But you might want to override this behavior. For example, `queue:task:start {queue_name}`. With the default naming strategy, all the calls of the command with different queues are named `queue:task:start`. Transaction data is aggregated under the same name for all types of queue processors.

In New Relic dashboard, this looks as follows:

![Transactions under the same name](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/guidelines/performance-guidelines/elastic-computing/enable-queue-task-flow-in-new-relic.md/transactions-under-the-same-name.png)

## Group transactions by queue name

As queue name usually comes as the first argument of a command, to enable sorting by names, you need to need to enable sorting by the first argument as follows:

1. Integrate the `spryker/monitoring` module.
2. Provide an advanced extendable infrastructure for [New relic monitoring transaction](https://docs.newrelic.com/docs/apm/transactions/intro-transactions/transactions-new-relic-apm/) naming strategies. This lets you implement, configure, and override the default transaction naming behavior.
3. Implement the strategy that enables configured console commands to apply naming that groups transaction by command name and first argument.
4. Enable the new strategy for `queue:task:start` on the project level.

As a result, the transactions are displayed as follows:

![Aggregation of transactions](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/guidelines/performance-guidelines/elastic-computing/enable-queue-task-flow-in-new-relic.md/aggregation-of-transactions.png)

## Integrate New Relic transactions grouping by queue names

For enabling queue task flow in New Relic, see Spryker elastic computing.

## Implementation details
![Class diagram]()

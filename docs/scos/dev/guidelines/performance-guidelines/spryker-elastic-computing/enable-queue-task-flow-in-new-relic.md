---
title: Enable queue task flow in New Relic
description: This guideline explains how to enable queue task flow in New Relic.
last_updated: May 16, 2022
template: concept-topic-template
---

By default, the `spryker/monitoring` module groups all console command New Relic transactions by command’s name e.g. `ooms:check-timeout`.

This strategy works in most cases, but you might want to override this behavior.

For example, `queue:task:start {queue_name}`. With the default naming strategy all calls of the command with all different queues are named `queue:task:start`. Transaction data is aggregated under the same name for all types for queue processors.

In New Relic dashboard, this looks as follows:

![New relic one]()

> :info: Transaction data is harvested and can be queried by attribute with NRQL.

## Goal

Enable `spryker/monitoring` module to aggregate `queue:task:start` transactions not only by command name, but by command and the first argument. As a result,

![Aggregation of transactions]

## Solution

1. Provide an advanced extendable infrastructure for [New relic monitoring transaction](https://docs.newrelic.com/docs/apm/transactions/intro-transactions/transactions-new-relic-apm/) naming strategies. This lets you implement, configure, and override the default transaction naming behavior.
2. Implement the strategy that enables configured console commands to apply naming that groups transaction by command name and first argument.
3. Enable the new strategy for `queue:task:start` on the project level.

## Project enablement

For enabling queue task flow in New Relic, see “Spryker elastic computing” document.

## Implementation details
![Class diagram]()

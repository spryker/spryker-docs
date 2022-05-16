---
title: Enable queue task flow in New Relic
description: This guideline explains how to enable queue task flow in New Relic.
last_updated: May 16, 2022
template: concept-topic-template
---

# Problem statement
By default `spryker/monitoring` module groups all console command New Relic transactions by command’s name e.g. `ooms:check-timeout`.

For most cases this transaction naming strategy would work, but there are cases when this behaviour needs to be overridden. 

Let’s consider command `queue:task:start [queue_name]`. With default naming strategy all calls of the command with all different queues will be named the same `queue:task:start` thus making transaction data aggregated under the same name for all types for queue processors.

In New Relic panel this will leads to the situation as on the following illustration:

> :info: Transaction data is harvested and can be queried by attribute with NRQL.

# Goal

Enable `spryker/monitoring` module to aggregate `queue:task:start` transactions not only by command name, but command and first argument. Result of the desired behaviour is illustrated on the following screenshot.

# Solution

1. Provide an advanced extendable infrastructure for [New relic monitoring transaction](https://docs.newrelic.com/docs/apm/transactions/intro-transactions/transactions-new-relic-apm/) naming strategies that will allow to implement, configure and override default transaction naming behaviour. 
2. Implement strategy that will allow for configured console commands apply naming that groups transaction by command name and first argument.
3. Enable new strategy for queue:task:start at the project level.

# Project enablement
For enabling queue task flow in New Relic, please see “Spryker elastic computing” document.

# Implementation details
Class diagram
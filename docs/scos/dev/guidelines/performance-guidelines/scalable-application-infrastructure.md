---
title: Scalable application infrastructure for publish and sync workers
description: This guideline explains how to use scalable application infrastructure.
last_updated: May 16, 2022
template: concept-topic-template
---


Performing compute-intensive operations with significant amount of data without proper resource management inevitably leads to inefficient computation resource utilization and increases processing time.

This document describes the methods of improving performance and efficiency of resource utilization by queue processing operation.

## Thread pool size

`THREAD_POOL_SIZE` defines the maximum number of parallel processes for all queues. It's default value is `0`, which means that scalable infrastructure is disabled.

At the beginning of the processing, queues contain a different number of messages. To process all messages efficiently, processes need to be distributed among queues according to the number of messages per queue.

> :info: `max_children` value must be reviewed in **php-fpm** server configuration according to configured `THREAD_POOL_SIZE`.

Configuring the right number for `THREAD_POOL_SIZE` affects the resulting scaling behavior and processing efficiency. In general, setting `THREAD_POOL_SIZE` to the number of CPU cores plus one is a good starting point. However, make sure to consider the characteristics of your set of queues.

{% info_block infoBox "" %}

Setting `THREAD_POOL_SIZE` to more than `0` disables the `DEFAULT_MAX_QUEUE_WORKER` parameter.

{% endinfo_block %}


## Query priority

In some cases, a smaller amount of messages may require more workers for processing. To balance such cases, use the `QUEUE_PRIORITY` configurable parameter.

`QUEUE_PRIORITY` - real number configurable ratio per queue. If a queue has higher priority in processing, based on this ration, it gets more workers in proportion to the number of messages. The default value is `1`.

Configured `QUEUE_PRIORITY` and `THREAD_POOL_SIZE` with consideration of each other may increase efficiency of resource utilization even further. You can fine tune these parameters based on properly collected statistics of worker execution (e.g. New Relic).

## Workers distribution

For effective worker management, the following calculations are used.

Queue weight is calculated by the formula:

`w = l * p`

Symbols:

* `w` — weight of queue.

* `l` — length of queue.

* `p` — configured queue priority value.

Total weight of all queues is calculated by the formula:

`W = SUM(w)`

Symbols:

* `W` — evaluated total weight of all queues with respect of QUEUE_PRIORITY value.

* `w` — weight of queue.

The number of workers per queue is calculated by the formula:

`n = w * N / W`

Symbols:

* `n` — number of workers for particular queue.

* `N` — thread pool size.

* `w` — weight of queue.

> :warning: In case of insufficient pool size notification must be sent.

## RAM distribution

To exclude runtime memory limit issues, the memory allocated to each worker must be also managed.

The amount of RAM available for workers is calculated based on `memory_get_usage();` and `ini_get('memory_limit');` and distributed evenly. Formula:

`r = R / N`

Symbols:

* `r` — amount of RAM per worker.

* `R` — total RAM available for worker pool.

* `N` — thread pool size.

## Project enablement

For enabling Scalable application infrastructure for publish and sync workers, see “Spryker elastic computing”.

## Implementation details

Module diagram

Class diagram

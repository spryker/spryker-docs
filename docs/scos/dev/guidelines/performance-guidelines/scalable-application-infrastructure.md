---
title: Scalable application infrastructure for P&S workers
description: This guideline explains how to use Scalable application infrastructure.
last_updated: May 16, 2022
template: concept-topic-template
---

# Problem statement
Performing compute-intensive operations over significant amount of data without proper resource management inevitably leads to inefficient computation resource utilisation and increasing wall time of the operation.

# Goal
Improve performance and efficiency of resource utilisation by queue processing operation. 

# Solution
### Thread pool size
`THREAD_POOL_SIZE` - configurable parameter defining the max number of parallel processes for all queues.

If `0` is set - scalable infrastructure is disabled. Default value is `0`.

> :info: Configuring `THREAD_POOL_SIZE >` 0 disables `DEFAULT_MAX_QUEUE_WORKER` parameter.

At the beginning of the processing different queues contains different number of messages. In order to process all messages efficiently processes must be distributed among queues according to the number of messages per queue.

> :info: `max_children` value must be reviewed in **php-fpm** server configuration according to configured `THREAD_POOL_SIZE`.

Configuring the right number for `THREAD_POOL_SIZE` will define the resulting scaling behaviour and processing efficiency to a great extent. Choosing the right one depends on the characteristics of a particular set of queue and needs to be considered individually. In general, choosing `THREAD_POOL_SIZE` equals to the number of CPU cores + 1 is a good starting point.

### Query priority
In some cases smaller amount of messages may require more workers for processing. In order to balance such cases a configurable parameter is introduced:

`QUEUE_PRIORITY` - real number configurable ratio per queue. If some queue has higher priority in processing this ratio will allow to allocate more workers with proportion to the number of messages. Default value 1.

Configured `QUEUE_PRIORITY` and T`HREAD_POOL_SIZE` with consideration of each other may increase efficiency of resource utilisation even further. Fine tuning of these two parameters can be done based on properly collected statistics of worker execution (e.g. New Relic).

### Workers distribution
For effective worker management, a set of following calculations is used. 

Queue weight is calculated by the next formula:

`w = l * p`

Where:

`w` - weight of queue. 

`l` - length of queue. 

`p` - configured queue priority value.

Total weight of all queues is calculated by:

`W = SUM(w)`

`W` - evaluated total weight of all queues with respect of QUEUE_PRIORITY value.

For calculating a number of workers per queue, a following formula is used:

`n = w * N / W`

Where:

`n` - number of workers for particular queue.

`N` - thread pool size. 

`w` - weight of queue.

> :warning: In case of insufficient pool size notification must be sent.

### RAM distribution

In order to exclude runtime memory limit issues memory allocated to each worker must be also managed.

Amount of RAM available for workers is calculated based on `memory_get_usage();` and `ini_get('memory_limit');` and distributed evenly:

`r = R / N`

Where:

`r` - amount of RAM per worker.

`R` - total RAM available for worker pool.

`N` - thread pool size.

# Project enablement

For enabling Scalable application infrastructure for P&S workers, please see “Spryker elastic computing” document.

# Implementation details
Module diagram


Class diagram

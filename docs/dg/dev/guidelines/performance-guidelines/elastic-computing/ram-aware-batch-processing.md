---
title: RAM-aware batch processing
description: RAM-aware batch processing increases memory consumption efficiency for long-running operations.
last_updated: May 16, 2022
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/guidelines/performance-guidelines/elastic-computing/ram-aware-batch-processing.html
related:
  - title: New Relic transactions grouping by queue names
    link: docs/scos/dev/guidelines/performance-guidelines/elastic-computing/new-relic-transaction-grouping-by-queue-names.html
  - title: Storage caching for primary-replica database setups
    link: docs/scos/dev/guidelines/performance-guidelines/elastic-computing/storage-caching-for-primary-replica-db-setups.html
---

Long-running PHP operations like data import may consume a considerable amount of memory during execution. However, in some cases, a significant amount of available memory is not used.

The following chart represents a memory consumption profile for a long-lasting PHP operation.

Legend:

* Blue: memory consumption of pure data read from source.

* Red: memory consumption peak produced by the data already processed before insertion.

* Steps in red: memory leak.

![Memory consumption profile](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/guidelines/performance-guidelines/elastic-computing/memory-consumption-profile.png)

For bulk data imports we used to define batch size, like 2000 or 5000 items. On the prior image, memory consumption reaches the level that corresponds to the batch size, which leaves a lot of  unused memory.

Using less memory generates more I/O operations, which subsequently increases the operation's processing time. Having more data in memory for processing decreased number of I/O and the processing time.

## Dynamic memory allocation

To use the memory more efficiently the batch size is now calculated based on the amount of memory available for current thread. When memory is full by some threshold value, processing of the current batch is performed.

The algorithm uses the following variables:
* Allowed total memory for PHP thread
* Currently used memory
* Maximum used memory during the execution of current thread
* Graduality factor
* Memory threshold percent

Implementation is based on principle of gradual calculation of memory threshold. Before reaching a hard threshold of memory limit, a program passes a configurable number of soft thresholds. More memory is allocated as a program reaches a soft threshold.

## Graduality factor

Graduality factor is a number that defines how many steps a program needs to take before a maximum allowed memory usage is reached.

The larger the graduality factor is, the more approximation steps the program takes, and the higher the accuracy is. A smaller gradually factor calculates the memory limit faster but with less accuracy.

## Memory threshold percentage

Memory threshold percentage is an integer that defines the percentage of available system memory that can be used for data import.

This is a protection from consuming all memory and crushing the program.

## Integrate RAM-aware batch processing

For instructions, see [Integrate RAM-aware batch processing](/docs/dg/dev/integrate-and-configure/integrate-elastic-computing.html#integrate-ram-aware-batch-processing).

## Implementation details

![RAM-aware butch processing impmlementation details](https://confluence-connect.gliffy.net/embed/image/c0012831-d1d8-4836-abb0-fab467240363.png?utm_medium=live&utm_source=custom)

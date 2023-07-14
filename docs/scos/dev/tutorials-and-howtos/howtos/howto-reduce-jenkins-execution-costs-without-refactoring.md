---
title: "HowTo: Reduce Jenkins execution by up to 80% without P&S and Data importers refactoring"
description: Save Jenkins related costs or speedup background jobs processing by implementing a custom single Worker for all stores.
last_updated: Jul 15, 2023
template: howto-guide-template
originalLink: ??
originalArticleId: ??
redirect_from:
---


# The Challenge

Our out-of-the-box (OOTB) system requires a specific command (Worker - `queue:worker:start`) to be continuously running for each store to process queues and ensure propagation of information. In addition to this command, there are other commands such as OMS processing, import, export, etc. When these processes are not functioning or running slowly, there is a delay in data changes being reflected on the frontend, causing dissatisfaction among customers and leading to disruption of business processes. 

# Explanation

By default, our system has a limit of two Jenkins executors for each environment. This limit is usually not a problem for single-store setups, but it becomes critical when there are multiple stores. Without increasing this limit, processing becomes slow because only two Workers are scanning queues and running tasks at a time, while other Workers for different stores have to wait. Moreover, even when some stores don't have messages to process, we still need to run a Worker just for scanning purposes, which occupies Jenkins executors, CPU time, and memory.

Increasing the number of processes per queue can lead to issues such as Jenkins hanging, crashing, or becoming unresponsive. Although memory consumption and CPU utilisation are not generally high (around 20-30%), there can be spikes in memory consumption due to a random combination of several workers processing heavy messages for multiple stores simultaneously. 

There are two potential solutions to address this problem: application optimisation and better background job orchestration.

# Proposed Solution

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/OneWorker-diagram.png)

The solution described here is targeted at small to medium projects but can be improved and applied universally, but it hasn't been tested fully in such conditions yet.

The proposed solution is to use one Worker (`queue:worker:start`) for all stores, regardless of the number of stores. Instead of executing these steps for one store within one process and having multiple processes for multiple stores, we can have one process that scans all queues for all stores and spawns child processes the same way as the OOTB solution. However, instead of determining the number of processes based on the presence of a single message, we can analyse the total number of messages in the queue to make an informed decision on how many processes should be launched at any given moment.

## The Process Pool

In computer science, a pool refers to a collection of resources that are kept in memory and ready to use. In this context, we have a fixed-sized pool (fixed-size array) where new processes are only run if there is space available among the other running processes. This approach allows us to have better control over the number of processes launched by the OOTB solution, resulting in more predictable memory consumption.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/NewWorker+Flow.png)

We define the total number of simultaneously running processes for the entire setup on the EC2 instance level. This makes it easier to manage, as we can monitor the average memory consumption for the process pool. If it's too low, we can increase the pool size, and if it's too high, we can decrease it. Additionally, we check the available memory (RAM) and prevent spawning additional processes if it is too low, ensuring system stability. Execution statistics provide valuable insights for decision-making, including adjusting the pool size or scaling up/down the EC2 instance.

The following params exist:

- pool size (default 5-10)
- free mem buffer - min amount of RAM (MB) system should have in order to spawn a new child process (default 750mb)

## Worker Statistics and Logs

With the proposed solution, we gather better statistics to understand the "health" of the worker and make informed decisions. We can track the number of tasks executed per queue/store, distribution of error codes, cycles, and various metrics related to skipping cycles, cooldown, available slots, and memory limitations. These statistics help us monitor performance, identify bottlenecks, and optimize resource allocation.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/stats-log.png)

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/stats-summary.png)

## Error Logging

In addition to statistics, we also capture the output of children's processes in the standard output of the main worker process. This simplifies troubleshooting by providing logs with store and queue names.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/stats-error-log.png)

## Edge Cases/Limitation

Child processes are killed at the end of each minute, which means those batches that were in progress - will be abandoned and return to the source queue to be processed during the next run. While we didn’t notice any issues with this approach, please note that this is still experimental approach and may or may not improve in future. The recommendation to mitigate this is to use smaller batches to ensure children processes are running within seconds or up to 10s (rough estimate) - to reduce the number of messages that will be retried.

## Implementation


Two ways are possible

1. Applying a patch, although it may require conflict resolution, since it is applied on project level and each project may have unique customisations already in place.

```bash
git apply one-worker.diff
```

2. Integrating it manually, using the patch as a source.


Please see attached diffs fror an example implementation. [Here's a diff](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/one-worker.diff).

In the project the functionality can be activated and deactivated using the following configuration flag:

```php
$config[QueueConstants::QUEUE_ONE_WORKER_ALL_STORES] = (bool)getenv('QUEUE_ONE_WORKER_ALL_STORES') ?? false;
```

You can set the flag by setting the following environment variable:

```
QUEUE_ONE_WORKER_ALL_STORES
```

# Summary

The proposed solution was developed was tested in a project environment. It has shown positive results, with significant improvements in data-import processing time. While this solution is suitable for small to medium projects, it has the potential to be applied universally. Code Examples can be found in the attached diff files that show the implementation in a project.

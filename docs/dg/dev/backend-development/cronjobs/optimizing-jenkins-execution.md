---
title: Optimizing Jenkins execution with the resource-aware queue worker
description: Learn how to enable and configure the resource-aware queue worker for optimized, stable background job processing in Spryker.
last_updated: Feb 20, 2026
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-costs-without-refactoring.html
  - /docs/dg/dev/backend-development/cronjobs/reduce-jenkins-execution-costs-without-p&s-and-data-importers-refactoring.html
related:
  - title: Cronjobs
    link: docs/dg/dev/backend-development/cronjobs/cronjobs.html
  - title: "Best practices: Jenkins stability"
    link: docs/ca/dev/best-practices/best-practises-jenkins-stability.html
  - title: Jenkins operational best practices
    link: docs/ca/dev/best-practices/jenkins-operational-best-practices.html
  - title: Stable Workers
    link: docs/dg/dev/backend-development/cronjobs/stable-workers.html
  - title: Configure event queues
    link: docs/dg/dev/backend-development/data-manipulation/event/configure-event-queues.html
  - title: Infrastructure and worker configuration guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/infrastructure-worker-configuration-guidelines.html
---

Spryker ships a **resource-aware queue worker** (`ResourceAwareQueueWorker`) that replaces the default queue worker with a production-grade implementation focused on system stability and efficient resource utilization. It is available starting from the `202512.0` release.

This document explains the problem it solves, how to enable and configure it, how it works internally, and how to back-port the concept to older Spryker versions.

## Problem

The default Spryker system requires a `queue:worker:start` command to be continuously running for each store to process queues. In multi-store setups, this creates several challenges:

- **Jenkins executor exhaustion**: By default, Jenkins has two executors. With multiple stores, workers compete for executor slots, causing delays.
- **Unpredictable memory consumption**: Multiple workers processing heavy messages simultaneously can spike memory usage, causing crashes or out-of-memory (OOM) conditions.
- **No resource awareness**: The default worker spawns child processes based on message presence, without considering available system resources.
- **Per-store overhead**: Even stores with empty queues occupy an executor slot for scanning.

## Solution overview

The resource-aware queue worker replaces per-store workers with a single worker that manages a fixed-size process pool and monitors system resources before spawning child processes.

![Resource-aware queue worker diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/OneWorker-diagram.png)

Key features:

- **Process pool**: A fixed-size array (default 5) of concurrent processes shared across all queues and stores, providing predictable resource consumption.
- **Memory monitoring**: Checks available system memory before spawning each child process, preventing OOM conditions.
- **Memory leak detection**: Tracks its own memory growth and exits gracefully when a leak is detected, allowing Jenkins to restart it cleanly.
- **Dynamic queue prioritization**: Intelligent strategy that prioritizes queues based on message volume and configurable modes (publish-first, sync-first, biggest-first).
- **Comprehensive statistics**: Tracks cycles, process counts, error rates, and queue-level metrics for operational visibility.
- **Graceful shutdown**: Handles Unix signals for clean termination and waits for child processes to complete.

## Enabling the resource-aware queue worker

### Prerequisites

- Spryker `202512.0` or later.
- RabbitMQ as the queue adapter.

### Step 1: Register the metrics plugin

Register the `RabbitMqQueueMetricsReaderPlugin` in your `QueueDependencyProvider` to supply queue metrics (message counts, batch sizes) to the worker:

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php

use Spryker\Client\RabbitMq\Plugin\Queue\RabbitMqQueueMetricsReaderPlugin;

class QueueDependencyProvider extends SprykerQueueDependencyProvider
{
    /**
     * @return array<\Spryker\Client\QueueExtension\Dependency\Plugin\QueueMetricsReaderPluginInterface>
     */
    protected function getQueueMetricsReaderPlugins(): array
    {
        return [
            new RabbitMqQueueMetricsReaderPlugin(),
        ];
    }
}
```

### Step 2: Enable via configuration

Add the following to `config/Shared/config_default.php`:

```php
use Spryker\Shared\Queue\QueueConstants;

// Enable the resource-aware worker
$config[QueueConstants::RESOURCE_AWARE_QUEUE_WORKER_ENABLED] = (bool)getenv('RESOURCE_AWARE_QUEUE_WORKER_ENABLED') ?: true;
```

You can also enable it per environment using the `RESOURCE_AWARE_QUEUE_WORKER_ENABLED` environment variable.

### Step 3: Configure a single Jenkins job

Replace per-store `queue:worker:start` jobs with a single job:

```php
// config/Zed/cronjobs/jenkins.php
$jobs[] = [
    'name' => 'queue-worker',
    'command' => '$PHP_BIN vendor/bin/console queue:worker:start',
    'schedule' => '* * * * *',
    'enable' => true,
    'stores' => ['DE'], // Use any one store/region as the entry point
];
```

The resource-aware worker automatically processes queues for all stores and regions.

## Configuration reference

All configuration constants are defined in `Spryker\Shared\Queue\QueueConstants`. They can be set in `config/Shared/config_default.php` and overridden with environment variables where supported.

### Core settings

| Constant                              | Environment variable                  | Type                   | Default | Description                                                                                                                       |
|:--------------------------------------|:--------------------------------------|:-----------------------|:--------|:----------------------------------------------------------------------------------------------------------------------------------|
| `RESOURCE_AWARE_QUEUE_WORKER_ENABLED` | `RESOURCE_AWARE_QUEUE_WORKER_ENABLED` | boolean                | `false` | Enables the resource-aware worker. When turned off, the default worker is used.                                                   |
| `QUEUE_WORKER_MAX_THRESHOLD_SECONDS`  | `QUEUE_WORKER_MAX_THRESHOLD_SECONDS`  | integer (seconds)      | `59`    | Maximum runtime per worker invocation. Set to slightly under one minute so Jenkins can restart the worker on the next cron cycle. |
| `QUEUE_WORKER_INTERVAL_MILLISECONDS`  | `QUEUE_WORKER_INTERVAL_MILLISECONDS`  | integer (milliseconds) | `1000`  | Minimum delay between spawning consecutive child processes. Lower values (100-500) increase throughput at the cost of CPU.        |

### Process pool settings

| Constant                                                      | Environment variable         | Type                   | Default | Description                                                                             |
|:--------------------------------------------------------------|:-----------------------------|:-----------------------|:--------|:----------------------------------------------------------------------------------------|
| `QUEUE_WORKER_MAX_PROCESSES`                                  | `QUEUE_WORKER_MAX_PROCESSES` | integer                | `5`     | Maximum number of concurrent child processes across all queues and stores. Range: 5-10. |
| `QUEUE_WORKER_PROCESSES_COMPLETE_TIMEOUT`                     | -                            | integer (seconds)      | `300`   | Maximum time to wait for child processes to complete after the main loop ends.          |
| `QUEUE_WORKER_CHECK_PROCESSES_COMPLETE_INTERVAL_MILLISECONDS` | -                            | integer (milliseconds) | `1000`  | Interval for checking whether child processes have completed during the shutdown wait.  |

### Memory management settings

| Constant                                   | Environment variable                       | Type                 | Default | Description                                                                                                                                                                                                    |
|:-------------------------------------------|:-------------------------------------------|:---------------------|:--------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `QUEUE_WORKER_FREE_MEMORY_BUFFER`          | `QUEUE_WORKER_FREE_MEMORY_BUFFER`          | integer (megabytes)  | `750`   | Minimum free system memory required before spawning a new child process.                                                                                                                                       |
| `QUEUE_WORKER_MEMORY_READ_PROCESS_TIMEOUT` | `QUEUE_WORKER_MEMORY_READ_PROCESS_TIMEOUT` | integer (seconds)    | `5`     | Timeout for reading system memory information from `/proc/meminfo`.                                                                                                                                            |
| `QUEUE_WORKER_IGNORE_MEMORY_READ_FAILURE`  | -                                          | boolean              | `false` | When `true`, treats unreadable memory as "enough memory" instead of throwing an exception.                                                                                                                     |
| `QUEUE_WORKER_MEMORY_MAX_GROWTH_FACTOR`    | -                                          | integer (percentage) | `50`    | Maximum allowed worker memory growth before the worker exits to prevent memory leaks. For example, `50` means the worker exits if its own memory consumption grows by more than 50% from the initial baseline. |

### Queue prioritization settings

| Constant                                              | Type              | Default | Description                                                                                                                               |
|:------------------------------------------------------|:------------------|:--------|:------------------------------------------------------------------------------------------------------------------------------------------|
| `QUEUE_PROCESSING_WORKER_DYNAMIC_MODE`                | integer (bitmask) | `0`     | Controls queue prioritization modes. Modes can be combined using bitwise OR. See [Queue processing strategy](#queue-processing-strategy). |
| `QUEUE_PROCESSING_BIG_QUEUE_THRESHOLD_BATCHES_AMOUNT` | integer           | `100`   | Number of batches that defines the threshold for a queue to be considered "big" for prioritization purposes.                              |
| `QUEUE_PROCESSING_LIMIT_OF_PROCESSES_PER_QUEUE`       | integer           | `10`    | Maximum number of concurrent processes per individual queue.                                                                              |

### Example configuration

**config/Shared/config_default.php**

```php
use Spryker\Shared\Queue\QueueConstants;

// Enable the resource-aware worker
$config[QueueConstants::RESOURCE_AWARE_QUEUE_WORKER_ENABLED] = (bool)getenv('RESOURCE_AWARE_QUEUE_WORKER_ENABLED') ?: true;

// Process pool
$config[QueueConstants::QUEUE_WORKER_MAX_PROCESSES] = 10;

// Memory management
$config[QueueConstants::QUEUE_WORKER_FREE_MEMORY_BUFFER] = (int)getenv('QUEUE_WORKER_FREE_MEMORY_BUFFER') ?: 750;
$config[QueueConstants::QUEUE_WORKER_MEMORY_READ_PROCESS_TIMEOUT] = (int)getenv('QUEUE_WORKER_MEMORY_READ_PROCESS_TIMEOUT') ?: 5;

// Timing
$config[QueueConstants::QUEUE_WORKER_MAX_THRESHOLD_SECONDS] = 59;
$config[QueueConstants::QUEUE_WORKER_INTERVAL_MILLISECONDS] = 1000;

// Process completion
$config[QueueConstants::QUEUE_WORKER_PROCESSES_COMPLETE_TIMEOUT] = 600;
```

## How it works

### Main execution loop

When `queue:worker:start` is executed with the resource-aware worker enabled, the following flow runs for the configured threshold duration (default 59 seconds):

![Resource-aware worker flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/NewWorker+Flow.png)

1. **Cycle start**: The worker increments cycle counter.
2. **Process scan**: Iterates through the process pool to detect completed processes, free slots, and log errors from failed processes.
3. **Memory check**: Reads free system memory from `/proc/meminfo`. If free memory is below the configured buffer, the cycle is skipped.
4. **Slot check**: If no free process slot is available, the cycle is skipped.
5. **Cooldown check**: If the minimum delay between spawns has not elapsed, the cycle is skipped.
6. **Process spawn**: The queue processing strategy selects the next queue. A child process (`queue:task:start <queue-name>`) is spawned and placed into the free slot.
7. **Memory leak check**: The worker compares its own current memory usage against the initial baseline. If growth exceeds the configured threshold, the worker exits gracefully.
8. **Shutdown**: After the main loop, the worker waits for all remaining child processes to complete (up to the configured timeout), then logs statistics.

### Process pool

The process pool is a fixed-size array (`SplFixedArray`) where each slot holds a reference to a running child process. This design provides:

- **Predictable concurrency**: At most N processes run simultaneously, regardless of the number of stores or queues.
- **Predictable memory consumption**: Since the pool size is fixed, you can estimate maximum memory usage as `pool_size * max_memory_per_task + worker_overhead`.
- **Efficient slot reuse**: Completed processes free their slots immediately for new work.

### System resource monitoring

The `SystemResourcesManager` provides two key capabilities:

**Free memory detection** reads `/proc/meminfo` (with a fallback to `cat /proc/meminfo` via subprocess) and returns the maximum of `MemFree` and `MemAvailable` in megabytes. Before every process spawn, the worker checks whether free memory exceeds the configured buffer.

**Worker memory growth tracking** captures the initial `memory_get_peak_usage()` on first invocation and calculates the percentage growth on each subsequent check. If growth exceeds the configured factor (default 50%), the worker exits gracefully. Since Jenkins restarts it on the next cron cycle, this effectively prevents indefinite memory leaks.

### Queue processing strategy

The `DynamicOrderQueueProcessingStrategy` combines multiple prioritization modes to determine which queue to process next. It scans all queues for all stores, calculates a priority score for each, and returns them in priority order.

**Available modes** (combinable via bitwise OR):

| Mode                 | Value | Behavior                                                         |
|:---------------------|:------|:-----------------------------------------------------------------|
| Default order        | `0`   | Processes queues in definition order                             |
| Prefer publish       | `2`   | Prioritizes publish queues                                       |
| Prefer sync          | `4`   | Prioritizes sync queues                                          |
| Prefer big           | `8`   | Prioritizes queues with more than the configured batch threshold |
| Prefer small         | `16`  | Prioritizes queues below the batch threshold                     |
| Prefer default store | `32`  | Prioritizes the default store's queues                           |
| Prefer fast          | `64`  | Prioritizes fast-processing queues                               |
| Prefer slow          | `128` | Prioritizes slow-processing queues                               |
| Only preferred       | `256` | Restricts processing to only preferred queues                    |

**Queues with fewer messages than one batch size receive the lowest priority** to avoid wasting process slots on near-empty queues.

**Per-queue process limits** prevent any single queue from monopolizing the entire pool. The `QUEUE_PROCESSING_LIMIT_OF_PROCESSES_PER_QUEUE` constant caps how many concurrent processes target the same queue.

The strategy also supports **runtime dynamic settings updates** through `DynamicSettingsUpdaterPluginInterface` plugins, allowing modes and thresholds to be adjusted during execution based on external signals.

## Worker statistics and logs

The resource-aware worker collects comprehensive statistics during each invocation and prints a summary at the end.

![Worker statistics log](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/stats-log.png)

**Cycle metrics**:

- Total cycles executed
- Skip cycles (throttled due to resource constraints)
- Empty cycles (no messages in any queue)
- No-slot cycles (all process pool slots are busy)
- No-memory cycles (insufficient free system memory)
- Cooldown cycles (minimum spawn interval not yet elapsed)

**Process metrics**:

- Total processes spawned
- Failed processes (non-zero exit code)
- Maximum concurrent processes observed

**Queue metrics**:

- Per-queue task counts
- Per-store or per-region task counts
- Error distribution by exit code

**Success rate** is calculated as `(spawned - failed) / spawned * 100%`.

![Worker statistics summary](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/stats-summary.png)

### Error logging

Output from failed child processes is captured in the main worker's standard output, including the command line, standard output, and error output. This simplifies troubleshooting by providing all relevant information in one log stream.

![Error logging](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/stats-error-log.png)

Use the `-vvv` flag when running `queue:worker:start` to see detailed debug-level output, including per-cycle memory and timing information.

## Tuning recommendations

### Process pool size

Start with the default of 5 and adjust based on observation:

- **Increase** if statistics show frequent no-slot cycles and your system has available memory and CPU.
- **Decrease** if you observe memory pressure, OOM conditions, or high CPU contention.
- A good starting point is 1-2 processes per available CPU core.

### Free memory buffer

The default 750 MB works for most environments. Adjust based on your host's total RAM and per-task memory consumption:

- **Small hosts (4 GB RAM)**: Use 512-750 MB.
- **Large hosts (8+ GB RAM)**: You can increase the pool size while keeping the buffer at 750 MB.
- The buffer must accommodate: the memory needed by the next spawned process, plus headroom for memory spikes in already running processes.

### Spawn interval

The default 1000 ms (1 second) is conservative. For latency-sensitive environments:

- Lower to 100-500 ms for faster throughput.
- Higher values reduce CPU overhead from the worker's main loop.

### Monitoring

Use the worker statistics to identify bottlenecks:

- **High no-memory cycles**: Reduce pool size or increase instance memory.
- **High no-slot cycles**: Increase pool size if resources allow.
- **High empty cycles**: Queues are mostly idle; the worker is working as expected.
- **Failed processes**: Investigate the error output for root causes (memory limits, database connection issues).

{% info_block warningBox "Performance monitoring" %}

Instance performance also depends on other jobs running on Jenkins, such as data import and custom plugins. These can affect the overall performance and runtime of your Publish and Synchronize processes. Always analyze them with [Application Performance Monitoring](/docs/dg/dev/integrate-and-configure/configure-services.html#new-relic) or [local profiling](/docs/scos/dev/tutorials-and-howtos/howtos/howto-setup-xdebug-profiling.html).

{% endinfo_block %}

## Backporting to older Spryker versions

If you are on a Spryker version prior to `202512.0` and cannot upgrade, you can implement the resource-aware worker concept at the project level. This section provides a high-level guide for the approach.

{% info_block warningBox "Unsupported customization" %}

The following is a project-level customization and is not officially supported by Spryker. The built-in `ResourceAwareQueueWorker` in `202512.0` supersedes this approach. Upgrade when possible.

{% endinfo_block %}

### Required components

1. **Custom Worker class**: Implement `WorkerInterface` with a fixed-size process pool (`SplFixedArray`), a main loop bounded by a time threshold, and free memory checks before each process spawn. The worker should iterate through its pool to detect completed processes and reuse freed slots.

2. **System resources manager**: Create a class that reads `/proc/meminfo` to determine free system memory and tracks the worker's own memory growth using `memory_get_peak_usage(true)`.

3. **Queue scanner**: Build a component that queries RabbitMQ for message counts per queue per store. Implement a cooldown period (for example, 5 seconds) to avoid repeatedly scanning empty queues.

4. **Queue processing strategy**: Implement a strategy interface with a `getNextQueue()` method. A simple ordered strategy iterates through queues; a more advanced strategy can prioritize based on message volume.

5. **Process manager extension**: Extend the Spryker `ProcessManager` to prefix queue names with store codes, enabling a single worker to distinguish processes across stores.

6. **RabbitMQ metrics exposure**: Expose the RabbitMQ `queue_declare` passive method to the business layer, allowing the scanner to read queue statistics without modifying queue state.

### Integration

Wire the components through a custom `QueueBusinessFactory`:

- Override `createWorker()` to return your custom worker based on a config flag.
- Register the custom factory in the project-level `QueueDependencyProvider`.
- Configure a single Jenkins job instead of per-store jobs.

### Configuration

Define project-level constants for pool size, memory buffer, memory read timeout, and memory growth threshold, mirroring the constants described in [Configuration reference](#configuration-reference).

## Stable workers

For Spryker PaaS environments, **Stable Workers** provide an alternative approach to background job optimization. Both the resource-aware queue worker and Stable Workers address the same core problems (memory management, process isolation, and stability), but they differ in scope:

- **Resource-aware queue worker**: Runs within Jenkins or any scheduler. Manages its own process pool and memory monitoring. Suitable for self-hosted, isolated, or non-Jenkins setups.
- **Stable Workers**: A PaaS-managed service using Amazon ECS with configurable capacity providers and Auto Scaling Groups. Provides infrastructure-level isolation and scaling.

Both solutions can coexist. Stable Workers handle P&S workloads while the resource-aware queue worker can manage other queue-based jobs on Jenkins.

For more details, see [Stable Workers](/docs/dg/dev/backend-development/cronjobs/stable-workers.html).

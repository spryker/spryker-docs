---
title: "HowTo: Reduce Jenkins execution by up to 80% without P&S and Data importers refactoring"
description: Save Jenkins related costs or speed up background jobs processing by implementing a single custom Worker for all stores.
last_updated: Jul 15, 2023
template: howto-guide-template
redirect_from:
---


# The Challenge

Our out-of-the-box (OOTB) system requires a specific command (Worker - `queue:worker:start`) to be continuously running for each store to process queues and ensure the propagation of information. In addition to this command, there are other commands such as OMS processing, import, export, and more. When these processes are not functioning or running slowly, there is a delay in data changes being reflected on the frontend, causing dissatisfaction among customers and leading to disruption of business processes. 

# Explanation

By default, our system has a limit of two Jenkins executors for each environment. This limit is usually not a problem for single-store setups, but it becomes a potentially critical issue when there are multiple stores. Without increasing this limit, processing becomes slow because only two Workers are scanning queues and running tasks at a time, while other Workers for different stores have to wait. On top of this, even when some stores don't have messages to process, we still need to run a Worker just for scanning purposes, which occupies Jenkins executors, CPU time, and memory.

Increasing the number of processes per queue can lead to issues such as Jenkins hanging, crashing, or becoming unresponsive. Although memory consumption and CPU utilization are not generally high (around 20-30%), there can be spikes in memory consumption due to a random combination of several workers simultaneously processing heavy messages for multiple stores. 

There are two potential solutions to address this problem: application optimization and better background job orchestration.

# Proposed Solution

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/OneWorker-diagram.png)

The solution described here is targeted at small to medium projects but can be improved and applied universally. However, it hasn't been fully tested in such conditions yet.

The proposed solution is to use one Worker (`queue:worker:start`) for all stores, regardless of the number of stores. Instead of executing these steps for one store within one process and having multiple processes for multiple stores, we can have one process that scans all queues for all stores and spawns child processes the same way as the OOTB solution. However, instead of determining the number of processes based on the presence of a single message, we can analyse the total number of messages in the queue to make an informed decision on how many processes should be launched at any given moment.

## The Process Pool

In computer science, a pool refers to a collection of resources that are kept in memory and ready to use. In this context, we have a fixed-sized pool (fixed-size array) where new processes are only ran if there is space available among the other running processes. This approach allows us to have better control over the number of processes launched by the OOTB solution, resulting in more predictable memory consumption.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/NewWorker+Flow.png)

We define the total number of simultaneously running processes for the entire setup on the EC2 instance level. This makes it easier to manage, as we can monitor the average memory consumption for the process pool. If it's too low, we can increase the pool size, and if it's too high, we can decrease it. Additionally, we check the available memory (RAM) and prevent spawning additional processes if it is too low, ensuring system stability. Execution statistics provide valuable insights for decision-making, including adjusting the pool size or scaling the EC2 instance up or down.

The following parameters exist:

- pool size (default 5-10)
- free memory buffer - minimum amount of RAM (MB) the system should have in order to spawn a new child process (default 750mb)

## Worker Statistics and Logs

With the proposed solution, we gather better statistics to understand the health of the worker and make informed decisions. We can track the number of tasks executed per queue/store, the distribution of error codes, cycles, and various metrics related to skipping cycles, cooldown, available slots, and memory limitations. These statistics help us monitor performance, identify bottlenecks, and optimize resource allocation.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/stats-log.png)

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/stats-summary.png)

## Error Logging

In addition to statistics, we also capture the output of children's processes in the standard output of the main worker process. This simplifies troubleshooting by providing logs with store and queue names.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/stats-error-log.png)

## Edge Cases/Limitation

Child processes are killed at the end of each minute, which means those batches that were in progress will be abandoned and will return to the source queue to be processed during the next run. While we didn’t notice any issues with this approach, please note that this is still an experimental approach and may or may not change in the future. The recommendation to mitigate this is to use smaller batches to ensure children processes are running within seconds or up to 10s (rough estimate), to reduce the number of messages that will be retried.

## Implementation


There are two methods possible for implementing this:

1. Applying a patch, although it may require conflict resolution, since it is applied on project level and each project may have unique customizations already in place. See attached diffs for an example implementation. [Here's a diff](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/one-worker.diff).

```bash
git apply one-worker.diff
```

2. Integrating it manually, using the patch as a source and the following sections as guide.


### A new Worker implementation

This is a completely custom implementation, which doesn't extend anything and is built based on the ideas described above.

The new implementation provides such features as: 
- spawns only single process per loop iteration
- checks free system memory before each launch
- ignores processes limits per queue in favour of one limit of simultaneously running processes (process pool size)
- doesn't wait for child processes to finish. This is not elegant solution, but it works and there are few recommendations on how to mitigate potential risks related to that
- it also gathers statistics and processes output for build a summary report at the end of each Worker invocation

<details open>
<summary>src/Pyz/Zed/Queue/Business/Worker/NewWorker.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

declare(strict_types=1);

namespace Pyz\Zed\Queue\Business\Worker;

use Psr\Log\LoggerInterface;
use Pyz\Zed\Queue\Business\Strategy\QueueProcessingStrategyInterface;
use Pyz\Zed\Queue\Business\SystemResources\SystemResourcesManagerInterface;
use Pyz\Zed\Queue\QueueConfig;
use SplFixedArray;
use Spryker\Client\Queue\QueueClientInterface;
use Spryker\Zed\Queue\Business\Process\ProcessManagerInterface;
use Spryker\Zed\Queue\Business\SignalHandler\SignalDispatcherInterface;
use Spryker\Zed\Queue\Business\Worker\WorkerInterface;
use Spryker\Zed\Queue\Communication\Console\QueueWorkerConsole;

class NewWorker implements WorkerInterface
{
    /**
     * @var \Spryker\Zed\Queue\Business\Process\ProcessManagerInterface
     */
    protected ProcessManagerInterface $processManager;

    /**
     * @var \Pyz\Zed\Queue\QueueConfig
     */
    protected QueueConfig $queueConfig;

    /**
     * @var \Spryker\Client\Queue\QueueClientInterface
     */
    protected QueueClientInterface $queueClient;

    /**
     * @var array<string>
     */
    protected array $queueNames;

    /**
     * @var \Spryker\Zed\Queue\Business\SignalHandler\SignalDispatcherInterface
     */
    protected SignalDispatcherInterface $signalDispatcher;

    /**
     * @var \Psr\Log\LoggerInterface
     */
    protected LoggerInterface $logger;

    /**
     * @var \Pyz\Zed\Queue\Business\Strategy\QueueProcessingStrategyInterface
     */
    protected QueueProcessingStrategyInterface $queueProcessingStrategy;

    /**
     * @var \SplFixedArray<\Symfony\Component\Process\Process>
     */
    protected SplFixedArray $processes;

    /**
     * @var int
     */
    private int $runningProcessesCount = 0;

    /**
     * @var \Pyz\Zed\Queue\Business\Worker\WorkerStats
     */
    private WorkerStats $stats;

    /**
     * @var \Pyz\Zed\Queue\Business\SystemResources\SystemResourcesManagerInterface
     */
    private SystemResourcesManagerInterface $sysResManager;

    /**
     * @var array<string, float>
     */
    private array $timers = [];

    public function __construct(
        ProcessManagerInterface $processManager,
        QueueConfig $queueConfig,
        QueueClientInterface $queueClient,
        array $queueNames,
        QueueProcessingStrategyInterface $queueProcessingStrategy,
        SignalDispatcherInterface $signalDispatcher,
        SystemResourcesManagerInterface $sysResManager,
        LoggerInterface $logger
    ) {
        $this->processManager = $processManager;
        $this->queueConfig = $queueConfig;
        $this->queueClient = $queueClient;
        $this->queueNames = $queueNames;
        $this->queueProcessingStrategy = $queueProcessingStrategy;
        $this->signalDispatcher = $signalDispatcher;
        $this->signalDispatcher->dispatch($this->queueConfig->getSignalsForGracefulWorkerShutdown());
        $this->sysResManager = $sysResManager;
        $this->logger = $logger;

        $this->processes = new SplFixedArray($this->queueConfig->getQueueWorkerMaxProcesses());
        $this->stats = new WorkerStats();
    }

    /**
     * @param string $timerName
     * @param string $message
     * @param string $level
     * @param int $intervalSec
     *
     * @return void
     */
    protected function logNotOftenThan(string $timerName, string $message, string $level = 'debug', int $intervalSec = 1): void
    {
        if (microtime(true) - ($this->timers[$timerName] ?? 0) >= $intervalSec) {
            $this->timers[$timerName] = microtime(true);
            $this->logger->$level($message);
        }
    }

    /**
     * @param string $command
     * @param array<string, mixed> $options
     *
     * @return void
     */
    public function start(string $command, array $options = []): void
    {
        $maxThreshold = $this->queueConfig->getQueueWorkerMaxThreshold();
        $delayIntervalMilliseconds = $this->queueConfig->getQueueWorkerInterval();
        $shouldIgnoreZeroMemory = $this->queueConfig->shouldIgnoreNotDetectedFreeMemory();

        $startTime = microtime(true);
        $lastStart = 0;
        $maxMemGrowthFactor = 0;

        while (microtime(true) - $startTime < $maxThreshold) {
            $this->stats->addCycle();

            if (!$this->sysResManager->enoughResources($shouldIgnoreZeroMemory)) {
                $this->logNotOftenThan('no-mem', 'NO MEMORY');
                $this->stats->addNoMemCycle()->addSkipCycle();

                continue;
            }

            $freeIndex = $this->removeFinishedProcesses();
            if ($freeIndex === null) {
                $this->logNotOftenThan(
                    'no-proc',
                    sprintf('BUSY: no free slots available for a new process, waiting'),
                );

                $this->stats
                    ->addNoSlotCycle()
                    ->addSkipCycle();
            } elseif ((microtime(true) - $lastStart) * 1000 > $delayIntervalMilliseconds) {
                $lastStart = microtime(true);
                $this->executeQueueProcessingStrategy($freeIndex);
            } else {
                $this->stats
                    ->addCooldownCycle()
                    ->addSkipCycle();
            }

            $this->logNotOftenThan(
                'time-mem',
                sprintf('TIME: %0.2f sec' . "\n", microtime(true) - $startTime) .
                sprintf('FREE MEM = %d MB', $this->sysResManager->getFreeMemory()),
                'info',
            );

            $ownMemGrowthFactor = $this->sysResManager->getOwnPeakMemoryGrowth();
            $maxMemGrowthFactor = max($ownMemGrowthFactor, $maxMemGrowthFactor);
            $this->logNotOftenThan(
                'own-mem',
                sprintf('OWN MEM: GROWTH FACTOR = %d%%', $ownMemGrowthFactor),
                'info',
            );
            if ($ownMemGrowthFactor > $this->queueConfig->maxAllowedWorkerMemoryGrowthFactor()) {
                $this->logger->emergency(sprintf('Worker memory grew more than %d%%, probably a memory leak, exiting', $ownMemGrowthFactor));

                break;
            }
        }

        // to re-scan previously logged processes and update stats
        $this->removeFinishedProcesses();
        $this->processManager->flushIdleProcesses();

        $this->logger->info('DONE');
        $this->logger->info(var_export($this->stats->getStats(), true));
        $this->logger->info(sprintf('Success Rate = %d%%', $this->stats->getSuccessRate()));
        $this->logger->info(var_export($this->stats->getCycleEfficiency(), true));
        $this->logger->info(sprintf('Worker memory growth factor = %d%%', $maxMemGrowthFactor));
    }

    /**
     * Runs as many times as it can per X minutes
     *
     * Strategy defines:
     *  - what to run and how many
     *  - what is current and next proc
     *  - what it needs to make a decision
     *
     * Strategy can be different, later on we can inject some
     * smart strategy that will delegate actual processing to another one
     * depending on something
     *
     * @param int $freeIndex
     *
     * @return void
     */
    protected function executeQueueProcessingStrategy(int $freeIndex): void
    {
        $queueTransfer = $this->queueProcessingStrategy->getNextQueue();
        if (!$queueTransfer) {
            $this->logger->debug('EMPTY: no more queues to process');
            $this->stats->addEmptyCycle()->addSkipCycle();

            return;
        }

        $this->logger->info(sprintf(
            'RUN [%d +1] %s:%s',
            $this->runningProcessesCount,
            $queueTransfer->getStoreName(),
            $queueTransfer->getQueueName(),
        ));

        $process = $this->processManager->triggerQueueProcess(
            sprintf(
                'APPLICATION_STORE=%s %s %s',
                $queueTransfer->getStoreName(),
                QueueWorkerConsole::QUEUE_RUNNER_COMMAND,
                $queueTransfer->getQueueName(),
            ),
            sprintf('%s.%s', $queueTransfer->getStoreName(), $queueTransfer->getQueueName()),
        );

        $this->processes[$freeIndex] = $process;
        $this->runningProcessesCount++;

        $this->stats->addProcQty('new');
        $this->stats->addQueueQty($queueTransfer->getQueueName());
        $this->stats->addStoreQty($queueTransfer->getStoreName());
        $this->stats->addQueueQty(sprintf('%s:%s', $queueTransfer->getStoreName(), $queueTransfer->getQueueName()));
    }

    /**
     * Removes finished processes from the processes array
     * Returns the first index of the array that is available for new processes
     *
     * @return int|null
     */
    protected function removeFinishedProcesses(): ?int
    {
        $freeIndex = -1;
        $runningProcCount = 0;

        foreach ($this->processes as $idx => $process) {
            if (!$process) {
                $freeIndex = $freeIndex >= 0 ? $freeIndex : $idx;

                continue;
            }

            if ($process->isRunning()) {
                $runningProcCount++;

                continue;
            }

            unset($this->processes[$idx]); // won't affect foreach

            $freeIndex = $freeIndex >= 0 ? $freeIndex : $idx;

            $this->logger->debug(sprintf('DONE %s', $process->getExitCodeText()));
            if ($process->getExitCode() !== 0) {
                $this->stats->addProcQty('failed');

                $this->logger->error(sprintf('> --- FREE: %d MB', $this->sysResManager->getFreeMemory()));
                $this->logger->error($process->getCommandLine());
                $this->logger->error('Std output:' . $process->getOutput());
                $this->logger->error('Error output: ' . $process->getErrorOutput());
                $this->logger->error('< ---');
            }

            $this->stats->addErrorQty($process->getExitCodeText());
        }

        if ($this->runningProcessesCount !== $runningProcCount) {
            $this->logger->info(sprintf('RUNNING PROC = %d', $runningProcCount));
        }

        // current vs previous
        $this->stats->addProcQty('max', (int)max($this->runningProcessesCount, $runningProcCount));

        $this->runningProcessesCount = $runningProcCount; // current

        return $runningProcCount === $this->processes->count() ?
            null :
            $freeIndex;
    }
}
```
</details>

### Configuration

#### Enable/Disable custom Worker

In the project, the functionality can be activated and deactivated using the following configuration flag:

```php
$config[QueueConstants::QUEUE_ONE_WORKER_ALL_STORES] = (bool)getenv('QUEUE_ONE_WORKER_ALL_STORES') ?? false;
```

You can set the flag by setting the following environment variable:

```
QUEUE_ONE_WORKER_ALL_STORES
```

#### The Pool Size

```php
$config[QueueConstants::QUEUE_WORKER_MAX_PROCESSES] = (int)getenv('QUEUE_ONE_WORKER_POOL_SIZE') ?? 10;
```

Defines how many PHP processes (`queue:task:start QUEUE-NAME`) allowed to run simultaneously within Worker regardless of number of stores or queuues.


#### Free Memory Buffer

```php
$config[QueueConstants::QUEUE_WORKER_FREE_MEMORY_BUFFER] = (int)getenv('QUEUE_WORKER_FREE_MEMORY_BUFFER') ?: 750;
```

Defines the minimum amount of free memory (in megabytes) which must be available in the EC2 instance in order to spawn a new child process for a queue. Measured before spawning each child process.

- The system should always have spare resources, because each `queue:task:start ...` command can consume different amount of resources, which is not easily predictable. Due to this, this buffer must be set with such limitations in mind.
    
    - to accomodate a new process it is going to launch
    - to leave space for any sporadic memory consumption change of already running processes

- when there's not enough memory, the Worker will wait (non-blocking, while doing other things like queue scanning, etc) with corresponding logging and statistic accumulation for further CLI report generation (as mentioned in the sections above)

- There are two options for when the Worker cannot detect the available memory: either assume it is zero and wait until it can read this info, meaning no processes will be launched during this period of time, or to throw an exception, considering this is critical information for further processing. This behavior can be configured with the following flag


```php
$config[QueueConstants::QUEUE_WORKER_IGNORE_MEM_READ_FAILURE] = false; // default false - meaning there will be an exception if the Worker can't read the system memory info
```

#### Other Important Parameters

```php
$config[QueueConstants::QUEUE_WORKER_MAX_THRESHOLD_SECONDS] = 3600; // default is 60 seconds, 1 minute, it is safe to have it as 1 hour instead
```

How much more memory Worker can consume compared to its starting memory consumption, before it is considered critical. This setting is useful to detect a memory leak, if such a thing happens during a period of long running Worker execution. 

In this case, the Worker will finish its execution and Jenkins will be responsible for spawning a new instance.

```php
$config[QueueConstants::QUEUE_WORKER_MEMORY_MAX_GROWTH_FACTOR] = 50; // in percent %
```


# When to use and when not to use it?

Currently this solution proved to be useful for multi-store setup environments with more than 2 stores operated within a single AWS region, although projects with only 2 stores can benefit with this solution as well.

At the same time it worth mentioning that for it does not make sense to apply this customization for a single store setup. Although there are no drawbacks, it won't provide any significant benefits in performance, just better logging.


- In summary, this HowTo can be applied to multi-store setup with at least 2 stores within one AWS region to gain such benefits as potential cost reduction from scaling down a Jenkins instance, or to speed Publish and Synchronize processing instead.

- it can't help much for single store setups or for multi-store setup where each store is hosted in a different AWS region.


# Summary

The proposed solution was developed was tested in a project environment. It has shown positive results, with significant improvements in data-import processing time. While this solution is suitable for small to medium projects, it has the potential to be applied universally. Code Examples can be found in the attached diff files that show the implementation in a project.


{% info_block warningBox "Important Note" %}
While this solution can be used to either save cloud costs because of down-scaling Jenkins instance or speed up background processing, it is not guaranteed, because each project is unique and EC2 ("Jenkins" jobs) instance performance also depends on other jobs like data import and custom plugins which may affect performance significantly.
{% endinfo_block %}

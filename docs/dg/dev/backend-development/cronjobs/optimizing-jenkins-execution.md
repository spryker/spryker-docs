---
title: Optimizing Jenkins execution
description: Optimize Jenkins execution for cronjobs in Spryker’s backend. Enhance task automation performance and improve the efficiency of your ecommerce platform.
last_updated: Jul 15, 2023
template: howto-guide-template
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-costs-without-refactoring.html

---


Our out-of-the-box (OOTB) system requires a specific command (Worker - `queue:worker:start`) to be continuously running for each store to process queues and ensure the propagation of information. In addition to this command, there are other commands such as OMS processing, import, export, and more. When these processes are not functioning or running slowly, there is a delay in data changes being reflected on the frontend, causing dissatisfaction among customers and leading to disruption of business processes.

By default, our system has a limit of two Jenkins executors for each environment. This limit is usually not a problem for single-store setups, but it becomes a potentially critical issue when there are multiple stores. Without increasing this limit, processing becomes slow because only two Workers are scanning queues and running tasks at a time, while other Workers for different stores have to wait. On top of this, even when some stores don't have messages to process, we still need to run a Worker just for scanning purposes, which occupies Jenkins executors, CPU time, and memory.

Increasing the number of processes per queue can lead to issues such as Jenkins hanging, crashing, or becoming unresponsive. Although memory consumption and CPU utilization are not generally high (around 20-30%), there can be spikes in memory consumption due to a random combination of several workers simultaneously processing heavy messages for multiple stores.

There are two potential solutions to address this problem: application optimization and better background job orchestration.

## Solution

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/OneWorker-diagram.png)

The solution described here is targeted at small to medium projects but can be improved and applied universally. However, it wasn't fully tested in such conditions.

The proposed solution is to use one Worker (`queue:worker:start`) for all stores, regardless of the number of stores. Instead of executing these steps for one store within one process and having multiple processes for multiple stores, we can have one process that scans all queues for all stores and spawns child processes the same way as the OOTB solution. However, instead of determining the number of processes based on the presence of a single message, we can analyse the total number of messages in the queue to make an informed decision on how many processes should be launched at any given moment.

## The process pool

In computer science, a pool refers to a collection of resources that are kept in memory and ready to use. In this context, we have a fixed-sized pool (fixed-size array) where new processes are only ran if there is space available among the other running processes. This approach allows us to have better control over the number of processes launched by the OOTB solution, resulting in more predictable memory consumption.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/NewWorker+Flow.png)

We define the total number of simultaneously running processes for the entire setup on the EC2 instance level. This makes it easier to manage, as we can monitor the average memory consumption for the process pool. If it's too low, we can increase the pool size, and if it's too high, we can decrease it. Additionally, we check the available memory (RAM) and prevent spawning additional processes if it is too low, ensuring system stability. Execution statistics provide valuable insights for decision-making, including adjusting the pool size or scaling the EC2 instance up or down.

The following parameters exist:

- pool size (default 5-10)
- free memory buffer - minimum amount of RAM (MB) the system should have in order to spawn a new child process (default 750mb)

## Worker statistics and logs

With the proposed solution, we gather better statistics to understand the health of the worker and make informed decisions. We can track the number of tasks executed per queue/store, the distribution of error codes, cycles, and various metrics related to skipping cycles, cooldown, available slots, and memory limitations. These statistics help us monitor performance, identify bottlenecks, and optimize resource allocation.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/stats-log.png)

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/stats-summary.png)

## Error logging

In addition to statistics, we also capture the output of children's processes in the standard output of the main worker process. This simplifies troubleshooting by providing logs with store and queue names.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/stats-error-log.png)

## Edge cases and limitation

Child processes are killed at the end of each minute, which means those batches that were in progress will be abandoned and will return to the source queue to be processed during the next run. While we didn’t notice any issues with this approach, please note that this is still an experimental approach and may or may not change in the future. The recommendation to mitigate this is to use smaller batches to ensure children processes are running within seconds or up to 10s (rough estimate), to reduce the number of messages that will be retried.

## Implementation


There are two methods possible for implementing this:

1. Applying a patch, although it may require conflict resolution since it is applied on the project level and each project may have unique customizations already in place. See the attached diffs for an example implementation. [Here's a diff](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/one-worker.diff).

```bash
git apply one-worker.diff
```

2. Integrating it manually, using the patch as a source and the following sections as guide.


### A new Worker implementation

This is a custom implementation, which doesn't extend anything and is built based on the ideas described above.

The new implementation provides such features as:
- spawns only single process per loop iteration
- checks free system memory before each launch
- ignores processes limits per queue in favour of one limit of simultaneously running processes (process pool size)
- doesn't wait for child processes to finish. This is not elegant solution, but it works and there are few recommendations on how to mitigate potential risks related to that
- it also gathers statistics and processes output for build a summary report at the end of each Worker invocation (check the patch for details)

The main components of the solution are

- NewWorker custom worker implementation
- SystemResourcesManager - a class to provide system and worker's own memory information
- Strategy - several implementations possible, a class decides which queue will be next for processing, depending on any custom logic, we have implemented two
    - `\Pyz\Zed\Queue\Business\Strategy\OrderedQueuesStrategy` strategy which processes queues in the order these were defined in `\Pyz\Zed\Queue\QueueDependencyProvider::getProcessorMessagePlugins`,
    - `\Pyz\Zed\Queue\Business\Strategy\BiggestFirstStrategy` - processes those queues which have the biggest amount of messages first
- QueueScanner component - scannes queues to get such information as amount of messages to provide this info to a Strategy
- custom RabbitMQ client to expose `queue_declare` (https://www.rabbitmq.com/amqp-0-9-1-reference.html#queue.declare) method to the Business layer code, this method returns queue statistics for existing queue and does not change anything in a queue.
- slightly modified `\Spryker\Zed\Queue\Business\Process\ProcessManager` - to store information about a queue in a context of store

<details>
<summary>src/Pyz/Zed/Queue/Business/Worker/NewWorker.php</summary>

```php
class NewWorker implements WorkerInterface
{
    // ...    
    /**
     * @var \SplFixedArray<\Symfony\Component\Process\Process>
     */
    protected SplFixedArray $processes;
    // ...

    public function __construct(...)
    {
        // ...
        // can be configured in config and/or using environment variable QUEUE_ONE_WORKER_POOL_SIZE,
        // average recommended values are 5-10
        // defines how many PHP processes (`queue:task:start QUEUE-NAME`) allowed to run simultaneously
        // within NewWorker regardless of number of stores or queues
        $this->processes = new SplFixedArray($this->queueConfig->getQueueWorkerMaxProcesses());
    }

    public function start(string $command, array $options = []): void
    {
        // env var - QUEUE_WORKER_MAX_THRESHOLD_SECONDS
        // default is 60 seconds, 1 minute, it is safe to have it as 1 hour instead
        $maxThreshold = $this->queueConfig->getQueueWorkerMaxThreshold();

        // minimum interval after starting one process before executing another
        // config - QUEUE_WORKER_INTERVAL_MILLISECONDS, default is 1000 - 1s, recommended value = 100, 0.1s
        $delayIntervalMilliseconds = $this->queueConfig->getQueueWorkerInterval();

        // when false - there will be an exception thrown if the Worker can't read the system memory info
        // otherwise - memory info will be returned as 0, so the system will continue to work, but not launching processes
        // because it'll think there is no memory available
        // QUEUE_WORKER_IGNORE_MEM_READ_FAILURE, default = false
        $shouldIgnoreZeroMemory = $this->queueConfig->shouldIgnoreNotDetectedFreeMemory();

        $startTime = microtime(true);
        $lastStart = 0;
        $maxMemGrowthFactor = 0;

        while (microtime(true) - $startTime < $maxThreshold) {
            if (!$this->sysResManager->isEnoughResources($shouldIgnoreZeroMemory)) {
                // optional logging here
                continue;
            }

            $freeIndex = $this->removeFinishedProcesses();
            if ($freeIndex === null) {
                // any optional logging here for the case when there are no slots available
            } elseif ((microtime(true) - $lastStart) * 1000 > $delayIntervalMilliseconds) {
                $lastStart = microtime(true);
                $this->executeQueueProcessingStrategy($freeIndex);
            } else {
                // any optional logging for cooldown period
            }

            $ownMemGrowthFactor = $this->sysResManager->getOwnPeakMemoryGrowth();
            $maxMemGrowthFactor = max($ownMemGrowthFactor, $maxMemGrowthFactor);

            // QUEUE_WORKER_MEMORY_MAX_GROWTH_FACTOR, 50 by default
            // measures how much Worker own memory consumption increased after first iteration
            // when more than 50% - it is considered a memory leak and Worker will finish its operation
            // allowing Jenkins to run Worker again
            if ($ownMemGrowthFactor > $this->queueConfig->maxAllowedWorkerMemoryGrowthFactor()) {
                $this->logger->emergency(sprintf('Worker memory grew more than %d%%, probably a memory leak, exiting', $ownMemGrowthFactor));
                break;
            }
        }

        // to re-scan previously logged processes and update stats
        $this->removeFinishedProcesses();
        $this->processManager->flushIdleProcesses();

        // here you can have any summary logging/stats, similar as we have in the patch
    }

    // ...

    /**
     * Removes finished processes from the processes fixed array
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

            // any custom logging here
        }

        return $runningProcCount === $this->processes->count() ? null : $freeIndex;
    }

    // ...

    /**
     * Strategy defines which queue to return for processing,
     * it can have any other custom dependencies to make a decision.
     *
     * Strategy can be different, we can inject some smart strategy
     * which will delegate actual processing to another one depending on something, e.g. store operation times or time zones, etc.
     *
     * @param int $freeIndex
     *
     * @return void
     */
    protected function executeQueueProcessingStrategy(int $freeIndex): void
    {
        $queueTransfer = $this->queueProcessingStrategy->getNextQueue();
        if (!$queueTransfer) {
            // logging
            return;
        }

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
    }

    // ...
```
</details>

### System Resource Manager

Available free system memory measured before spawning each child process.
The system should always have spare resources, because each `queue:task:start ...` command can consume different amount of resources, which is not easily predictable.
Because of this, this buffer must be set with such limitations in mind.

- to accomodate a new process it is going to launch
- to leave space for any sporadic memory consumption change of already running processes

<details>
<summary>src/Pyz/Zed/Queue/Business/SystemResources/SystemResourcesManager.php</summary>

```php
class SystemResourcesManager implements SystemResourcesManagerInterface
{
    // ...

    /**
     * Executed frequently in a loop within X minutes
     * We have a choice on what to do in case we failed to determine free memory (e.g. 0)
     *   A. consider we have NO free memory, so no processes will run
     *   B. consider it as a critical issue and throw an error
     * ...
     */
    public function enoughResources(bool $shouldIgnore = false): bool
    {
        $freeMemory = $this->getFreeMemory();
        if ($freeMemory === 0 && !$shouldIgnore) {
            throw new RuntimeException('Could not detect free memory and configured not to ignore that.');
        }

        // can be configured from config and/or environment variable - QUEUE_WORKER_FREE_MEMORY_BUFFER, in megabytes
        // default recommended value - 750 MB
        return $freeMemory > $this->queueConfig->getFreeMemoryBuffer();
    }

    /**
     * Read and parse system memory info
     */
    public function getFreeMemory(): int
    {
        $memory = $this->readSystemMemoryInfo();
        if (!preg_match_all('/(Mem\w+[l|e]):\s+(\d+)/msi', $memory, $matches, PREG_SET_ORDER)) {
            return 0;
        }

        $free = round((int)$matches[1][2] ?? 0) / 1024;
        $available = round((int)$matches[2][2] ?? 0) / 1024;

        return (int)max($free, $available);
    }

    /**
     * By how much own Worker memory consumption increased after first method invocation
     * @return int % of initial Worker consumption
     */
    public function getOwnPeakMemoryGrowth(): int
    {
        if (!$this->ownInitialMemoryConsumption) {
            $this->ownInitialMemoryConsumption = memory_get_peak_usage(true);
        }

        $diffNow = memory_get_peak_usage(true) - $this->ownInitialMemoryConsumption;

        return $diffNow <= 0 ? 0 : (int)round(100 * $diffNow / $this->ownInitialMemoryConsumption);
    }

    /**
     * @return string
     */
    private function readSystemMemoryInfo(): string
    {
        //
        $memoryReadProcessTimeout = $this->queueConfig->memoryReadProcessTimeout();
        $memory = @file_get_contents('/proc/meminfo') ?? '';

        return $memory ?? 0;
    }
```
</details>

### QueueScanner

This component is responsible for reading information about queues, mainly - amount of messages.
Key feature here - is cooldown period of default 5 seconds, it means that if all queues are empty, it won't re-scan those right await but will wait (non blocking) until cooldown timeout passes. Obviously it'll add up to 5s delay when new messages appear, but it won't be noticable, and as soon as there are always some messages present - the cooldown timeout is not applied.

<details>
<summary>src/Pyz/Zed/Queue/Business/QueueScanner.php</summary>

```php
class QueueScanner implements QueueScannerInterface
{
    // ...

    public function scanQueues(array $storeTransfers = [], int $emptyScanCooldownSeconds = 5): ArrayObject
    {
        // ...

        $sinceLastScan = microtime(true) - $this->lastScanAt;
        $lastEmptyScanTimeoutPassed = $this->lastScanWasEmpty && ($sinceLastScan > $emptyScanCooldownSeconds);

        if (!$this->lastScanWasEmpty || $lastEmptyScanTimeoutPassed) {
            $queueList = $this->directScanQueues($storeTransfers);

            $this->lastScanAt = microtime(true);
            $this->lastScanWasEmpty = $queueList->count() === 0;

            return $queueList;
        }

        return new ArrayObject();
    }

    /**
     * @param array<\Generated\Shared\Transfer\StoreTransfer> $storeTransfers
     *
     * @return \ArrayObject<\Generated\Shared\Transfer\QueueTransfer>
     */
    protected function directScanQueues(array $storeTransfers): ArrayObject
    {
        // ...
        $queuesPerStore = new ArrayObject();
        foreach ($storeTransfers as $storeTransfer) {
            foreach ($this->queueNames as $queueName) {

                $queueMessageCount = $this->mqClient->getQueueMetrics(
                    $queueName,
                    $storeTransfer->getName(),
                )['messageCount'] ?? 0;

                if ($queueMessageCount === 0) {
                    continue;
                }

                $queuesPerStore->append((new QueueTransfer())
                    ->setQueueName($queueName)
                    ->setStoreName($storeTransfer->getName())
                    ->setMsgCount($queueMessageCount)
                    ->setMsgToChunkSizeRatio(1), // default value
                );

                // ...
            }
        }

        return $queuesPerStore;
    }

    // ...
```
</details>

### Customized process manager

The idea here is simple - just to add store code as a prefix to a queue name, and without additional code modifications - it'll work with all queues/stores combinations correctly within one Worker.

<details>
<summary>src/Pyz/Zed/Queue/Business/Process/ProcessManager.php</summary>

```php
class ProcessManager extends SprykerProcessManager implements ProcessManagerInterface
{
    public function triggerQueueProcessForStore(string $storeCode, string $command, string $queue): Process
    {
        return $this->triggerQueueProcess($command, $this->getStoreBasedQueueName($storeCode, $queue));
    }

    public function getBusyProcessNumberForStore(string $storeCode, string $queueName): int
    {
        return $this->getBusyProcessNumber($this->getStoreBasedQueueName($storeCode, $queueName));
    }

    protected function getStoreBasedQueueName(string $storeCode, string $queueName): string
    {
        return sprintf('%s.%s', $storeCode, $queueName);
    }
}
```
</details>

### Simple ordered strategy

And really simple, yet useful - a simple ordered strategy to define any logic to return the next queue to process. It uses a custom `\Pyz\Zed\Queue\Business\Strategy\CountBasedIterator` which provides some additional optional sorting/repeating benefits for more complex strategies, but without additional configuration - works as a simple [ArrayIterator](https://www.php.net/manual/en/class.arrayiterator.php).

To discover alternative use cases for a Strategy component, feel free to investigate the previously mentioned `\Pyz\Zed\Queue\Business\Strategy\BiggestFirstStrategy` which you can find in the attached patch.

<details>
<summary>src/Pyz/Zed/Queue/Business/Strategy/OrderedQueuesStrategy.php</summary>

```php
class OrderedQueuesStrategy implements QueueProcessingStrategyInterface
{
    // ...

    /**
     * @param \Pyz\Zed\Queue\Business\QueueScannerInterface $queueScanner
     * @param \Psr\Log\LoggerInterface $logger
     */
    public function __construct(QueueScannerInterface $queueScanner, LoggerInterface $logger)
    {
        $this->queueScanner = $queueScanner;
        $this->currentIterator = new CountBasedIterator(new ArrayIterator());
    }

    /**
     * @return \Generated\Shared\Transfer\QueueTransfer|null
     */
    public function getNextQueue(): ?QueueTransfer
    {
        if (!$this->currentIterator->valid()) {
            $queuesPerStore = $this->getQueuesWithMessages();
            $this->currentIterator = new CountBasedIterator($queuesPerStore->getIterator());
        }

        /** @var \Generated\Shared\Transfer\QueueTransfer|null $queueTransfer */
        $queueTransfer = $this->currentIterator->current();
        $this->currentIterator->next();

        return $queueTransfer;
    }

    /**
     * @return \ArrayObject<int, \Generated\Shared\Transfer\QueueTransfer>
     */
    protected function getQueuesWithMessages(): ArrayObject
    {
        return $this->queueScanner->scanQueues();
    }
```
</details>


## When to use and when not to use it?

Currently, this solution proved to be useful for multi-store setup environments with more than 2 stores operated within a single AWS region, although projects with only two stores can benefit from this solution as well.

At the same time, it is worth mentioning that it does not make sense to apply this customization for a single-store setup. Although there are no drawbacks, it won't provide any significant benefits in performance, just better logging.

- In summary, this HowTo can be applied to multi-store setup with at least 2 stores within one AWS region to gain such benefits as potential cost reduction from scaling down a Jenkins instance, or to speed Publish and Synchronize processing instead.

- it can't help much for single-store setups or for multi-store setup where each store is hosted in a different AWS region.


## Summary

The proposed solution was developed was tested in a project environment. It has shown positive results, with significant improvements in data-import processing time. While this solution is suitable for small to medium projects, it has the potential to be applied universally. Code Examples can be found in the attached diff files that show the implementation in a project.


{% info_block warningBox "Performance monitoring" %}
Keep in mind that instance performance also depends on other jobs, such as data import and custom plugins. These jobs can significantly affect the overall performance and runtime of your Publish and Synchronize processes. Therefore, always analyze them with [Application Performance Monitoring](/docs/dg/dev/sdks/the-docker-sdk/202307.0/configure-services.html#new-relic) or [local application profiling](https://docs.spryker.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-setup-xdebug-profiling.html).
{% endinfo_block %}

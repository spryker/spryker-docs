---
title: Reduce Jenkins execution without P&S and data importers refactoring
description: Save Jenkins-related costs or speed up background jobs processing by implementing a single custom Worker for all stores.
last_updated: Jul 15, 2023
template: howto-guide-template
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-costs-without-refactoring.html
---

By default, the system requires the `queue:worker:start` command to be continuously running for each store to process queues and ensure the propagation of information. In addition to this command, there are other commands such as OMS processing, import, export, and more. When these processes aren't functioning or running slowly, there is a delay in data changes being reflected on the frontend, causing dissatisfaction among customers and leading to disruption of business processes. 

By default, Spryker has a limit of two Jenkins executors for each environment. This limit is usually not a problem for single-store setups, but it can be a critical issue when there are multiple stores. Without increasing this limit, processing becomes slow because only two Workers are scanning queues and running tasks at a time, while other Workers for different stores have to wait. On top of this, even when some stores don't have messages to process, we still need to run a Worker just for scanning purposes, which occupies Jenkins executors, CPU time, and memory.

Increasing the number of processes per queue can lead to issues such as Jenkins hanging, crashing, or becoming unresponsive. Although memory consumption and CPU usage aren't generally high (around 20-30%), there can be spikes in memory consumption due to a random combination of several workers simultaneously processing heavy messages for multiple stores. 

There are two potential solutions to address this problem that can be implemented simultaneously: application optimization and better background job orchestration.

## Application optimization

For details on the application optimization, see the following documents: 
- [Performance guidelines](https://docs.spryker.com/docs/scos/dev/guidelines/performance-guidelines/performance-guidelines.html)
- [Troubleshooting performance issues](https://docs.spryker.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/troubleshooting-performance-issues.html)
  
## Background job orchestration

The background job orchestration implies using one Worker (`queue:worker:start`) for all stores, regardless of the number of stores. Instead of executing these steps for one store within one process and having multiple processes for multiple stores, you can have one process that scans all queues for all stores and spawns child processes the same way as the default solution. However, instead of determining the number of processes based on the presence of a single message, you can analyze the total number of messages in the queue to make an informed decision on how many processes should be launched at any given moment.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/OneWorker-diagram.png)

The background job orchestration solution proved to be useful for multi-store setup environments with more than two stores operated within a single AWS region, although projects with only two stores can benefit from this solution as well. When you have at least two stores within one AWS region, the background job orchestration can potentially help reduce costs from scaling down a Jenkins instance or to speed up Publish and Synchronize processing instead.

However, it doesn't make sense to apply this customization for a single-store setup or for a multi-store setup where each store is hosted in a different AWS region. Although there are no drawbacks, it won't provide any significant benefits in performance but rather just enhance logging.

The background job orchestration solution was developed and tested in a project environment. It has shown positive results, with significant improvements in data-import processing time. While this solution is suitable for small to medium projects, it has the potential to be applied universally. However, it hasn't been fully tested in such conditions.


{% info_block warningBox "Performance monitoring" %}

Keep in mind that instance performance also depends on other jobs, such as data import and custom plugins. These jobs can significantly affect the overall performance and runtime of your Publish and Synchronize processes. Therefore, always analyze them with [Application Performance Monitoring](/docs/dg/dev/integrate-and-configure/configure-services.html#new-relic) or [local application profiling](/docs/scos/dev/tutorials-and-howtos/howtos/howto-setup-xdebug-profiling.html).

{% endinfo_block %}


### The process pool

A pool refers to a collection of resources that are kept in memory and ready to use. In this context, there is a fixed-size pool or array where new processes are only run if there is space available among the other running processes. This approach enables better control over the number of processes launched by the default solution, resulting in more predictable memory consumption.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/NewWorker+Flow.png)

We define the total number of simultaneously running processes for the entire setup on the EC2 instance level. This makes it easier to manage, as we can monitor the average memory consumption for the process pool. If it's too low, we can increase the pool size, and if it's too high, we can decrease it. Additionally, we check the available memory (RAM) and prevent spawning additional processes if it is too low, ensuring system stability. Execution statistics provide valuable insights for decision-making, including adjusting the pool size or scaling the EC2 instance up or down.

The following parameters exist:

- Pool size (default is 5-10)
- Free memory buffer - minimum amount of RAM (MB) the system should have in order to spawn a new child process (default is 750 MB)

### Worker statistics and logs

With the background job orchestration solution, we gather better statistics to understand the health of the Worker and make informed decisions. We can track the number of tasks executed per queue or store, the distribution of error codes, cycles, and various metrics related to skipping cycles, cooldown, available slots, and memory limitations. These statistics help us monitor performance, identify bottlenecks, and optimize resource allocation.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/stats-log.png)

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/stats-summary.png)

### Error logging

In addition to statistics, we also capture the output of children's processes in the standard output of the main worker process. This simplifies troubleshooting by providing logs with store and queue names.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/stats-error-log.png)

### Edge cases and limitation

Child processes are killed at the end of each minute, which means those batches that were in progress will be abandoned and will return to the source queue to be processed during the next run. While we didn’t notice any issues with this approach, keep in mind that this is still an experimental approach and may or may not change in the future. The recommendation to mitigate this is to use smaller batches to ensure children processes are running within seconds or up to roughly 10 seconds, to reduce the number of messages that will be retried.

## Background job orchestration solution implementation

There are two ways to implement the background job orchestration:

1. Applying a patch, although it may require conflict resolution since it is applied on the project level, and each project may have unique customizations already in place. See [these diffs](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-reduce-jenkins-execution-cost-without-refactoring/one-worker.diff) for an example implementation. 

```bash
git apply one-worker.diff
```

2. Integrating it manually, using the patch as a source and the following sections as guide.


### A new Worker implementation

This is a custom implementation, which doesn't extend anything and is built based on the ideas described in the previous sections.

The new worker implementation provides such features as: 
- Spawns only a single process per loop iteration.
- Checks free system memory before each launch.
- Ignores processes limits per queue in favor of one limit of simultaneously running processes (process pool size).
- Doesn't wait for child processes to finish. This isn't an elegant solution, but it works, and there are some recommendations on how to mitigate potential risks related to that.
- It gathers statistics and processes output for building a summary report at the end of each Worker invocation. Check the patch for details.

The main components of the solution are:

- NewWorker custom worker implementation.
- SystemResourcesManager - a class to provide the system and worker memory information.
- Strategy - several implementations possible, a class decides which queue is next for processing, depending on any custom logic. We have implemented two:
    - `\Pyz\Zed\Queue\Business\Strategy\OrderedQueuesStrategy` strategy which processes queues in the order these were defined in `\Pyz\Zed\Queue\QueueDependencyProvider::getProcessorMessagePlugins`.
    - `\Pyz\Zed\Queue\Business\Strategy\BiggestFirstStrategy` - first processes those queues which have the biggest amount of messages.
- QueueScanner component - scans queues to get such information as amount of messages to provide this info to a strategy.
- Custom RabbitMQ client to expose the [queue_declare method ](https://www.rabbitmq.com/amqp-0-9-1-reference.html#queue.declare) to the Business layer code. This method returns queue statistics for the existing queue and doesn't change anything in a queue.
- Slightly modified `\Spryker\Zed\Queue\Business\Process\ProcessManager` to store information about a queue in the context of a store.

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

### System resource manager

Available free system memory is measured before spawning each child process.
The system should always have spare resources, because each `queue:task:start ...` command can consume different amount of resources, which isn't easily predictable. 
Because of this, this buffer must be set with the following limitations in mind:
    
- To accommodate a new process it's going to launch.
- To leave space for any sporadic memory consumption change of already running processes.

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

The QueueScanner component is responsible for reading information about queues, primarily the amount of messages they contain. Its key feature is a default cooldown period of 5 seconds. This cooldown period ensures that if all queues are empty, the component won't immediately rescan them but will instead wait without blocking until the cooldown timeout elapses. While this may introduce a five-second delay when new messages appear, it will not be noticeable. Furthermore, since there are always some messages available, the cooldown timeout isn't applied.

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

ProcessManager adds store code as a prefix to a queue name. It works correctly with all combinations of queues and stores within one Worker and doesn't require additional code modifications.

<details open>
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

The OrderedQueuesStrategy component defines logic to return the next queue to process. It uses a custom `\Pyz\Zed\Queue\Business\Strategy\CountBasedIterator`, which provides some additional optional sorting or repeating benefits for more complex strategies, but without additional configuration - it works as a simple [ArrayIterator](https://www.php.net/manual/en/class.arrayiterator.php).

To discover alternative use cases for a Strategy component, you can investigate  [\Pyz\Zed\Queue\Business\Strategy\BiggestFirstStrategy](#a-new-worker-implementation).

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

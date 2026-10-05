---
title: Integrate Symfony Scheduler
description: Learn how to integrate and configure Symfony Scheduler module in a Spryker project.
last_updated: October 5, 2026
template: howto-guide-template
---

This document describes how to integrate and configure Symfony Scheduler module into a Spryker project.

## Install

{% info_block warningBox "Requirements" %}

The Symfony Scheduler module requires:

- PHP 8.3 or higher.
- `symfony/scheduler` `^6.4` or `^7.4`.
- The `ext-pcntl` PHP extension, if you want parallel workers to shut their subprocesses down on a signal.
- An AMQP broker, if you run scheduled jobs asynchronously (see [Run scheduled jobs asynchronously](#run-scheduled-jobs-asynchronously)). The synchronous setup needs no broker.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Check if the following modules have been installed. Installing `spryker/symfony-scheduler` with Composer pulls the dependencies (`Lock`, `Redis`, `Gui`, `SymfonyMessengerExtension`) in automatically:

| MODULE                    | EXPECTED DIRECTORY                         |
|---------------------------|--------------------------------------------|
| SymfonyMessenger          | vendor/spryker/symfony-messenger           |
| SymfonyMessengerExtension | vendor/spryker/symfony-messenger-extension |
| SymfonyScheduler          | vendor/spryker/symfony-scheduler           |
| SymfonySchedulerExtension | vendor/spryker/symfony-scheduler-extension |
| Lock                      | vendor/spryker/lock                        |
| Redis                     | vendor/spryker/redis                       |
| Gui                       | vendor/spryker/gui                         |

The `Lock` module guards each scheduled job against concurrent execution, `Redis` backs the job status storage and the Back Office controls, and `Gui` provides the Back Office **Scheduler** page.

If modules are present, proceed to the next step. If not, install the missing modules using Composer before proceeding.

{% endinfo_block %}

Install the required modules using Composer:

```shell
composer require spryker/symfony-scheduler spryker/symfony-messenger
```

## Configure

To configure the Symfony Scheduler module, you need to define your scheduled tasks and their execution intervals.
With the current implementation you can add them in the module config or provide them via a plugin.

### Configure via Module Config

If you want to execute some console commands on a cron schedule, you can define them in the `getCronJobs` method of the `SymfonySchedulerConfig` class.
For each job a transport is created in the Symfony Messenger module under the name of the job, and a handler runs the command in a subprocess. Which handler plugin you register decides *where* that subprocess runs:

| PLUGIN | BEHAVIOR |
|---|---|
| `AsyncCompiledCronTransportsHandlerProviderPlugin` | Queues the due job for a separate worker to run. Recommended — see [Run scheduled jobs asynchronously](#run-scheduled-jobs-asynchronously). |
| `CompiledCronTransportsHandlerProviderPlugin` | Runs the due job inside the polling loop. Deprecated, and the default until you configure the asynchronous setup. |

The rest of this section applies to both.

**src/Pyz/Client/SymfonyScheduler/SymfonySchedulerConfig.php**

```php
<?php

namespace Pyz\Client\SymfonyScheduler;

use Spryker\Client\SymfonyScheduler\SymfonySchedulerConfig as SprykerSymfonySchedulerConfigAlias;
use Spryker\Shared\MessageBroker\MessageBrokerConstants;

class SymfonySchedulerConfig extends SprykerSymfonySchedulerConfigAlias
{
    public function getCronJobs(): array
    {
        $jobs = [
            'queue-worker-start' => [
                'command' => '$PHP_BIN vendor/bin/console queue:worker:start',
                'schedule' => '* * * * *',
            ],
            'check-oms-conditions' => [
                'command' => '$PHP_BIN vendor/bin/console oms:check-condition',
                'schedule' => '* * * * *',
            ],
            'check-oms-timeouts' => [
                'command' => '$PHP_BIN vendor/bin/console oms:check-timeout',
                'schedule' => '* * * * *',
            ],
            'clear-oms-locks' => [
                'command' => '$PHP_BIN vendor/bin/console oms:clear-locks',
                'schedule' => '0 6 * * *',
                'priority' => 100,
            ],
        ];

        return $jobs;
    }
}
```

The job name is an unique key of job definition and it will be used as a transport name in the Symfony Messenger module.
The `command` is the console command that you want to execute.
The `schedule` is the cron expression that defines when the job should be executed. You can also use aliases like `@hourly`, `@daily`, etc.
The `no_lock` option is optional and defines whether the job runs without acquiring a lock. By default (`no_lock` omitted or `false`), the job is guarded in two places: its schedule is locked, so only one worker advances it and emits a given occurrence, and its execution is locked, so the command never runs twice at the same time. Setting `no_lock` to `true` removes both, which lets several workers run the job concurrently. Only set it for jobs that are idempotent or otherwise safe to run concurrently.
The `priority` option is optional and defines the consumption order of the job's transport by the worker. The higher the number, the earlier the job is polled. When omitted, priority defaults to `0`.
In addition you can also provide a `store` or a `region`, which works in the same way as originally in `jenkins.php`

### Configure via new plugin

If your use case is more complex than just executing a console command, you can create a new plugin that implements `\Spryker\Shared\SymfonySchedulerExtension\Dependency\Plugin\SchedulerHandlerProviderPluginInterface`.
In example below you can see that we define messages, handlers and schedules for the job.
Messages and handlers are concepts from the Symfony Messenger module. They will be used to trigger and process the job. Schedules are the expressions that define when the job should be executed. It can be simple cron expression or a more complex one like callback trigger, combination of multiple triggers or even a custom trigger that you can implement by yourself.
You don't need to map messages and handlers separately in the SymfonyMessenger module, because the SymfonyScheduler module will take care of things like defining the transport and mapping the message to the handler for the transport.

```php
<?php

namespace Pyz\Client\FooBar\Plugin\SymfonyScheduler;

use Symfony\Component\Scheduler\RecurringMessage;
use Symfony\Component\Scheduler\Schedule;

class FooBarSchedulerHandlerProviderPlugin implements SchedulerHandlerProviderPluginInterface
{
    public function getHandlers(): array
    {
        return [
            RecurringReportGenerationMessage::class => [ //You can have multiple handlers for the same message
                new ReportGenerationHandler(),
            ],
        ];
    }
    public function getSchedules(): array
    {
        $schedule = new Schedule();
        $schedule->add(RecurringMessage::cron('* * * * *'), (new RecurringReportGenerationMessage('report for today'))) // every day at midnight

        return [
            'report-generation' => $schedule // transport name will be "report-generation"
        ];
    }
}
```

## Wiring plugins

If you define your jobs with the first option (via config) or with separate plugin, you need to wire plugins in the Symfony Scheduler Dependency Provider by adding the following code:

***src/Pyz/Client/SymfonyScheduler/SymfonySchedulerDependencyProvider.php***

```php
<?php

namespace Pyz\Client\SymfonyScheduler;

use Spryker\Client\SymfonyScheduler\Plugin\SymfonyScheduler\AsyncCompiledCronTransportsHandlerProviderPlugin;
use Spryker\Client\SymfonyScheduler\SymfonySchedulerDependencyProvider as SprykerSymfonySchedulerDependencyProvider;

class SymfonySchedulerDependencyProvider extends SprykerSymfonySchedulerDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\SymfonySchedulerExtension\Dependency\Plugin\SchedulerHandlerProviderPluginInterface>
     */
    protected function getSchedulerHandlerProviderPlugins(): array
    {
        return [
            new AsyncCompiledCronTransportsHandlerProviderPlugin(), //Plugin that provides handlers for jobs defined in the config
            new FooBarSchedulerHandlerProviderPlugin(), //Plugin that provides scheduled jobs separately
        ];
    }
}
```

`AsyncCompiledCronTransportsHandlerProviderPlugin` queues each due job instead of running it in the polling loop, so a long-running job cannot hold up the jobs behind it. It needs the asynchronous execution tier to be configured; until that is in place, register the deprecated `CompiledCronTransportsHandlerProviderPlugin` instead, which runs jobs inline. See [Run scheduled jobs asynchronously](#run-scheduled-jobs-asynchronously).

## Register the scheduler transports with Symfony Messenger

Scheduled jobs are executed through the Symfony Messenger worker, so the scheduler ships a set of plugins that register its transports, message-to-handler mapping, transport factory, and the Back Office control plugins with the Symfony Messenger module. Wire them in the Symfony Messenger dependency provider.

**src/Pyz/Client/SymfonyMessenger/SymfonyMessengerDependencyProvider.php**

```php
<?php

namespace Pyz\Client\SymfonyMessenger;

use Spryker\Client\SymfonyMessenger\SymfonyMessengerDependencyProvider as SprykerSymfonyMessengerDependencyProvider;
use Spryker\Client\SymfonyScheduler\Plugin\SymfonyMessenger\AsyncSchedulerJobMessageMappingProviderPlugin;
use Spryker\Client\SymfonyScheduler\Plugin\SymfonyMessenger\AsyncSchedulerJobTransportConfigProviderPlugin;
use Spryker\Client\SymfonyScheduler\Plugin\SymfonyMessenger\AsyncSchedulerJobTransportFactoryProviderPlugin;
use Spryker\Client\SymfonyScheduler\Plugin\SymfonyMessenger\CompiledCronTransportGroupAwarePlugin;
use Spryker\Client\SymfonyScheduler\Plugin\SymfonyMessenger\SchedulerAvailableTransportConfigProviderPlugin;
use Spryker\Client\SymfonyScheduler\Plugin\SymfonyMessenger\SchedulerMessageMappingProviderPlugin;
use Spryker\Client\SymfonyScheduler\Plugin\SymfonyMessenger\SchedulerTransportFactoryProviderPlugin;

class SymfonyMessengerDependencyProvider extends SprykerSymfonyMessengerDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\SymfonyMessengerExtension\Dependency\Plugin\TransportFactoryProviderPluginInterface>
     */
    protected function getTransportFactoryProviderPlugins(): array
    {
        return [
            new SchedulerTransportFactoryProviderPlugin(),
            new AsyncSchedulerJobTransportFactoryProviderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Shared\SymfonyMessengerExtension\Dependency\Plugin\AvailableTransportConfigProviderPluginInterface>
     */
    protected function getAvailableTransportConfigProviderPlugins(): array
    {
        return [
            new SchedulerAvailableTransportConfigProviderPlugin(),
            new AsyncSchedulerJobTransportConfigProviderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Shared\SymfonyMessengerExtension\Dependency\Plugin\MessageMappingProviderPluginInterface>
     */
    protected function getMessageMappingProviderPlugins(): array
    {
        return [
            new SchedulerMessageMappingProviderPlugin(),
            new AsyncSchedulerJobMessageMappingProviderPlugin(),
        ];
    }

    protected function getGroupAwareTransportsPlugins(): array
    {
        return [
            new CompiledCronTransportGroupAwarePlugin(),
        ];
    }

}
```

Plugins for the schedules themselves:

- `SchedulerAvailableTransportConfigProviderPlugin` registers one Messenger transport per scheduled job, together with the job's `priority`. It supersedes the deprecated `SchedulerAvailableTransportProviderPlugin`.
- `SchedulerTransportFactoryProviderPlugin`, `SchedulerMessageMappingProviderPlugin`, and `CompiledCronTransportGroupAwarePlugin` provide the scheduler transport factory, the message-to-handler mapping, and the transport grouping respectively.

Plugins for the asynchronous execution queue. Register them only when you run jobs asynchronously; they are listed above so the dependency provider is complete in one place:

- `AsyncSchedulerJobTransportFactoryProviderPlugin` provides the factory that builds the job queue's transport.
- `AsyncSchedulerJobTransportConfigProviderPlugin` registers that queue as a receiver you can name on the command line.
- `AsyncSchedulerJobMessageMappingProviderPlugin` routes a queued job to the handler that runs it under a per-job lock.

{% info_block infoBox "Disabling a job no longer pauses its transport" %}

Earlier versions registered `DisabledSchedulerJobTransportGuardPlugin` under `getTransportConsumeGuardPlugins()` to skip a disabled job's transport. That plugin is deprecated and must no longer be wired: pausing a transport stops its schedule from advancing, which freezes the stored schedule state and makes re-enabling the job replay every occurrence it missed while disabled. The disabled state is now applied by the handler, so the schedule keeps advancing and the job is simply not run. Remove the plugin from `getTransportConsumeGuardPlugins()` when you upgrade.

{% endinfo_block %}

## Run scheduled jobs asynchronously

By default a due job is executed by the same loop that polls the schedules, so that loop is blocked until the command finishes. A job that takes longer than its interval therefore delays every job behind it, and the jobs with the lowest priority can be delayed indefinitely.

Running jobs asynchronously separates the two responsibilities:

- A **trigger** worker polls the schedules and publishes each due job to a queue. It never runs a command, so its loop stays free.
- One or more **executor** workers consume that queue and run the commands.

### Configure the queue connection

The scheduler publishes to and consumes from its own AMQP connection, configured under its own constants. Point it at the broker the project already runs:

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\SymfonyMessenger\SymfonyMessengerConstants;
use Spryker\Shared\SymfonyScheduler\SymfonySchedulerConstants;

// Reuses the broker the Symfony Messenger queue transport already points at.
$config[SymfonySchedulerConstants::SYMFONY_SCHEDULER_AMQP_HOST] = $config[SymfonyMessengerConstants::QUEUE_AMQP_HOST];
$config[SymfonySchedulerConstants::SYMFONY_SCHEDULER_AMQP_PORT] = $config[SymfonyMessengerConstants::QUEUE_AMQP_PORT];
$config[SymfonySchedulerConstants::SYMFONY_SCHEDULER_AMQP_USERNAME] = $config[SymfonyMessengerConstants::QUEUE_AMQP_USERNAME];
$config[SymfonySchedulerConstants::SYMFONY_SCHEDULER_AMQP_PASSWORD] = $config[SymfonyMessengerConstants::QUEUE_AMQP_PASSWORD];
$config[SymfonySchedulerConstants::SYMFONY_SCHEDULER_AMQP_VIRTUAL_HOST] = $config[SymfonyMessengerConstants::QUEUE_AMQP_VIRTUAL_HOST];
```

| CONSTANT | DESCRIPTION |
|---|---|
| `SYMFONY_SCHEDULER_AMQP_HOST` | Broker host. |
| `SYMFONY_SCHEDULER_AMQP_PORT` | Broker port. Defaults to `5672`. |
| `SYMFONY_SCHEDULER_AMQP_USERNAME` | Username. Defaults to `spryker`. |
| `SYMFONY_SCHEDULER_AMQP_PASSWORD` | Password. |
| `SYMFONY_SCHEDULER_AMQP_VIRTUAL_HOST` | Virtual host. Defaults to `/`. |
| `SYMFONY_SCHEDULER_AMQP_DSN` | A complete DSN, used when `SYMFONY_SCHEDULER_AMQP_HOST` is not set. |

The queue name and its transport options come from `\Spryker\Client\SymfonyScheduler\SymfonySchedulerConfig` and can be overridden at the project level:

| METHOD | DEFAULT | DESCRIPTION |
|---|---|---|
| `getJobTransportName()` | `scheduler-jobs` | Name of the queue, and the receiver name you pass to the consumer. |
| `getJobTransportDsn()` | `scheduler-amqp://scheduler-jobs` | DSN of the queue transport. The scheme is owned by the scheduler's own transport factory. |
| `getJobQueueTransportOptions(string $queueName)` | `auto_setup`, exchange and queue declaration | AMQP options for the queue. |
| `getJobExecutionLockTtl()` | `360.0` | Seconds a job's execution lock is held. Covers the handler's 300-second command timeout with a margin. |

{% info_block infoBox "The scheduler builds this transport itself" %}

The queue transport is created by the scheduler rather than by the shared Symfony Messenger transport creation, so it is unaffected by the serializer and transport options that apply to the queue adapter. This is why it uses a scheme of its own (`scheduler-amqp://`) and why its connection is configured separately from `SymfonyMessengerConstants::QUEUE_*`.

{% endinfo_block %}

### Register the plugins

Register `AsyncCompiledCronTransportsHandlerProviderPlugin` in the Symfony Scheduler dependency provider (see [Wiring plugins](#wiring-plugins)) and the three `AsyncSchedulerJob*` plugins in the Symfony Messenger dependency provider (see [Register the scheduler transports with Symfony Messenger](#register-the-scheduler-transports-with-symfony-messenger)).

### Run both tiers

Both tiers are the same consumer command with different receivers. Use `--worker-receivers` to dedicate one child process to the schedules, and `--parallel` to add executors:

```shell
vendor/bin/console symfonymessenger:consume scheduler-jobs --worker-receivers=compiled-cron-scheduler --parallel=3
```

This runs four processes: one trigger consuming `compiled-cron-scheduler`, and three executors consuming `scheduler-jobs`. Raising `--parallel` adds executors only. See [Consume transports in parallel](/docs/dg/dev/integrate-and-configure/integrate-symfony-messenger.html#consume-transports-in-parallel).

{% info_block warningBox "Run exactly one trigger" %}

Give the schedules a single dedicated child. Additional trigger processes do not share the polling work: each schedule is guarded by a lock that the holding worker keeps for its lifetime, so the jobs are split across the processes rather than balanced, and a process that loses every race sits idle.

{% endinfo_block %}

### How a job is prevented from running twice

Each job is locked for the duration of its command, under `scheduler:job:running:<name>`. A second copy of the same job — whether from an extra trigger or from the broker redelivering a message whose connection dropped — finds the lock held, is discarded, and is logged. The schedule produces the job again at its next due time.

A job configured with `no_lock` set to `true` is exempt and can run concurrently with itself.

{% info_block infoBox "If the lock store is unreachable" %}

Single execution cannot be guaranteed without the lock, so the job is skipped and an error is logged rather than run unguarded. The queue keeps draining, and the next due occurrence is unaffected.

{% endinfo_block %}

## Keep schedule state across restarts

Consumers are recycled regularly — for example by `--time-limit`. Each schedule records how far it has progressed in Redis, so a new process resumes from that point instead of restarting at the current time. Without it, every occurrence that fell due during a restart is skipped.

The state is stored through the scheduler's own Redis connection (see [Configure the job status storage](#configure-the-job-status-storage)):

| METHOD | DEFAULT | DESCRIPTION |
|---|---|---|
| `getScheduleStateStorageKeyPrefix()` | `scheduler:state:` | Prefix for the per-job schedule state. |

{% info_block warningBox "Occurrences missed during an outage are replayed" %}

Because the position is remembered, a trigger that starts after an outage publishes every occurrence it missed, not just the next one. For a job that runs every minute, an hour of downtime means roughly sixty queued runs. Keep this in mind for jobs that are expensive or that act on a backlog, and consider `no_lock` and interval choices accordingly.

{% endinfo_block %}

If the state cannot be reached, the scheduler logs a warning and falls back to per-process state: it keeps running, but each restart resets the schedule to the current time.

## Configure the job status storage

The Back Office scheduler page and the enable/disable and run-now controls persist their state (job statuses, disabled markers, and run requests) in Redis, through a connection the module configures under its own `SymfonySchedulerConstants` keys. This is a separate connection *configuration*, not a separate Redis instance: by default it resolves to the same key-value store Redis (same host, port, and database) as the storage, and the scheduler's own key prefixes (`scheduler:job:*`) keep its entries distinct from storage keys. Configure the connection in `config/Shared/config_default.php`:

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\SymfonyScheduler\SymfonySchedulerConstants;

// >>> SYMFONY SCHEDULER

$config[SymfonySchedulerConstants::SYMFONY_SCHEDULER_REDIS_PERSISTENT_CONNECTION] = true;
$config[SymfonySchedulerConstants::SYMFONY_SCHEDULER_REDIS_SCHEME] = getenv('SPRYKER_KEY_VALUE_STORE_PROTOCOL') ?: 'tcp';
$config[SymfonySchedulerConstants::SYMFONY_SCHEDULER_REDIS_HOST] = getenv('SPRYKER_KEY_VALUE_STORE_HOST');
$config[SymfonySchedulerConstants::SYMFONY_SCHEDULER_REDIS_PORT] = getenv('SPRYKER_KEY_VALUE_STORE_PORT');
$config[SymfonySchedulerConstants::SYMFONY_SCHEDULER_REDIS_USER] = getenv('SPRYKER_KEY_VALUE_USERNAME');
$config[SymfonySchedulerConstants::SYMFONY_SCHEDULER_REDIS_PASSWORD] = getenv('SPRYKER_KEY_VALUE_PASSWORD');
$config[SymfonySchedulerConstants::SYMFONY_SCHEDULER_REDIS_DATABASE] = $keyValueRegionNamespaces[$namespaceKey]['namespace'] ?? getenv('SPRYKER_KEY_VALUE_STORE_NAMESPACE') ?: 1;
$config[SymfonySchedulerConstants::SYMFONY_SCHEDULER_REDIS_DATA_SOURCE_NAMES] = json_decode(getenv('SPRYKER_KEY_VALUE_STORE_SOURCE_NAMES') ?: '[]', true) ?: [];
$config[SymfonySchedulerConstants::SYMFONY_SCHEDULER_REDIS_CONNECTION_OPTIONS] = json_decode(getenv('SPRYKER_KEY_VALUE_STORE_CONNECTION_OPTIONS') ?: '[]', true) ?: [];
```

The following `SymfonySchedulerConstants` keys are available:

| CONSTANT                                         | DESCRIPTION                                                             |
|--------------------------------------------------|-------------------------------------------------------------------------|
| `SYMFONY_SCHEDULER_REDIS_SCHEME`                 | Connection scheme/protocol, for example `tcp` or `redis`.               |
| `SYMFONY_SCHEDULER_REDIS_HOST`                   | Redis host.                                                             |
| `SYMFONY_SCHEDULER_REDIS_PORT`                   | Redis port.                                                             |
| `SYMFONY_SCHEDULER_REDIS_DATABASE`               | Redis database index.                                                   |
| `SYMFONY_SCHEDULER_REDIS_USER`                   | Username for Redis ACL authentication.                                  |
| `SYMFONY_SCHEDULER_REDIS_PASSWORD`               | Password.                                                               |
| `SYMFONY_SCHEDULER_REDIS_PERSISTENT_CONNECTION`  | Whether to use a persistent connection.                                 |
| `SYMFONY_SCHEDULER_REDIS_DATA_SOURCE_NAMES`      | Array of DSN strings for a cluster/replication setup.                   |
| `SYMFONY_SCHEDULER_REDIS_CONNECTION_OPTIONS`     | Array of connection options passed to the Redis client.                 |

The storage key prefixes and their time-to-live are defined in `\Spryker\Client\SymfonyScheduler\SymfonySchedulerConfig` and can be overridden at the project level:

| METHOD                              | DEFAULT                    | DESCRIPTION                                                                         |
|-------------------------------------|----------------------------|-------------------------------------------------------------------------------------|
| `getJobStatusStorageKeyPrefix()`    | `scheduler:job:status:`    | Prefix for per-job status records.                                                  |
| `getJobStatusTtl()`                 | `86400` (24 h)             | TTL of a status record; stale entries from a crashed worker auto-expire.            |
| `getJobDisabledStorageKeyPrefix()`  | `scheduler:job:disabled:`  | Prefix for the disabled marker. A job is disabled while its marker key exists (no TTL). |
| `getJobRunRequestStorageKeyPrefix()`| `scheduler:job:run:`       | Prefix for the on-demand run-request marker.                                        |
| `getJobRunRequestTtl()`             | `300` (5 min)              | TTL of a run request; a request that is never consumed auto-expires.                |

## Run the Scheduler

To run a scheduler you need to run the SymfonyMessenger consumer with the transport name that is configured for the job.

```shell
vendor/bin/console symfonymessenger:consume queue-worker-start report-generation
```

This runs the schedules and the jobs in one process. To stop a long-running job from delaying the others, run the jobs asynchronously instead — see [Run scheduled jobs asynchronously](#run-scheduled-jobs-asynchronously).

{% info_block warningBox "--parallel does not spread scheduler transports" %}

Adding `--parallel` to a command that consumes `schedule://` transports does not share the polling work. Each schedule is guarded by a lock that the worker holding it keeps for its lifetime, so the jobs are statically split across the child processes rather than balanced, and a child that loses every race does nothing. Use `--parallel` for the execution queue, where the processes are genuine competing consumers.

{% endinfo_block %}

Jobs configured with `no_lock` set to `true` are not guarded, so they can be executed concurrently. Use `no_lock` only for jobs that are safe to run that way (see [Configure via Module Config](#configure-via-module-config)).

## Monitor and control scheduled jobs in the Back Office

The module adds a **Scheduler** page in the Back Office under **Maintenance > Scheduler**. It lists every scheduled job in a live table (refreshed every 5 seconds) with the following columns: Name, Command, Schedule, Priority, Status, Started, Finished, Duration, and Actions.

The **Status** reflects the latest recorded execution state of each job:

| STATUS   | MEANING                                                                       |
|----------|-------------------------------------------------------------------------------|
| Waiting  | The job is registered and awaiting its next run.                              |
| Queued   | The job is due and has been published to the execution queue, but no executor has picked it up yet. Only occurs in the asynchronous setup. |
| Running  | The job is currently being executed by a worker.                              |
| Success  | The last execution finished successfully.                                     |
| Error    | The last execution failed; the captured output is available on the job's detail page. |
| Disabled | The job is disabled and will not be consumed until it is enabled again.       |

Statuses are recorded while a job is queued and while it runs, and are stored through the scheduler's Redis connection configuration (see [Configure the job status storage](#configure-the-job-status-storage)). `Disabled` is derived from the disabled marker and is never persisted as a status record.

The **Duration** column measures execution only. Time spent waiting in the queue is not counted, so a job that sits in `Queued` shows no duration until an executor starts it.

Each row provides the following actions:

- **View** — opens a detail page with the job's name, command, status, start/finish timestamps, and error message (if any).
- **Enable / Disable** — toggles the job. Disabling writes a marker to Redis, and the job is no longer run until it is enabled again. Its schedule keeps advancing while it is disabled, so enabling resumes from the current time rather than replaying the occurrences it missed. In the asynchronous setup the marker is checked twice: once before a job is queued, and again before a queued job is run, so disabling also stops a job that is already waiting in the queue.
- **Run now** — requests an immediate, one-off execution ahead of the cron schedule. A run-request marker is written to Redis; the scheduler's run-request-aware trigger consumes it on the next poll and fires the job exactly once. In the asynchronous setup this queues the job within a poll rather than running it there and then, so it starts as soon as an executor is free. The action is unavailable while a job is disabled or already running.

{% info_block infoBox "Requires the job status storage" %}

The Back Office page and the enable/disable and run-now controls require the scheduler's Redis connection to be configured. If Redis is unavailable, the controls fail open — a job is treated as enabled and no forced run is scheduled — so a Redis outage never pauses every job.

{% endinfo_block %}

## How it works

The Back Office controls add two decision points to this flow:

- A disabled job is skipped by the handler rather than by pausing its transport, so its schedule keeps advancing and the stored position stays current. In the asynchronous setup the check runs again before a queued job is executed, which also covers a job disabled after it was queued.
- When a **Run now** request exists for a job, the run-request-aware trigger returns the current time as the next run date, pre-empting the cron schedule so the message is yielded immediately. The request marker is consumed atomically, guaranteeing exactly one extra run.

## Running consumer as a background process

In order to run the consumer you can use a Jenkins in order to run it or any other manager like Stable Workers.

Jenkins example:

**config/Zed/cronjobs/jenkins.php**

```php
<?php

$jobs[] = [
        'name' => 'consume-queue',
        'command' => $logger . '$PHP_BIN vendor/bin/console symfonymessenger:consume queue-worker-start --time-limit=3600',
        'schedule' => '* * * * *',
        'enable' => true,
    ];
    $jobs[] = [
        'name' => 'consume-other-jobs',
        'command' => $logger . '$PHP_BIN vendor/bin/console symfonymessenger:consume scheduler-jobs'
            . ' --worker-receivers=compiled-cron-scheduler'
            . ' --parallel=3'
            . ' --time-limit=3600',
        'schedule' => '* * * * *',
        'enable' => true,
    ];

if (getenv('SPRYKER_CURRENT_REGION')) {
    foreach ($jobs as $job) {
        $job['region'] = getenv('SPRYKER_CURRENT_REGION');
    }
}
```

As you see we defined 2 Jenkins jobs. The first consumes the queue worker messages: that process runs for at least a minute, so giving it its own consumer keeps it from delaying everything else.

The second covers the remaining cron jobs and spawns four processes of its own — one trigger on `compiled-cron-scheduler` and three executors on `scheduler-jobs`. To add executor capacity, raise `--parallel` rather than defining more Jenkins jobs. If you have not configured the asynchronous setup, drop `scheduler-jobs` and `--worker-receivers` and consume `compiled-cron-scheduler` directly.

{% info_block infoBox "Dedicated and shared workers are additive" %}

`--worker-receivers` adds a process on top of the `--parallel` ones rather than taking one of them, so the command above runs `1 + 3` processes. Raising `--parallel` by one adds one executor and leaves the trigger alone.

{% endinfo_block %}
{% info_block warningBox "Important" %}
Jenkins by default has 2 executors so both of those jobs will be running in parallel. It's not possible to use this setup with 1 executor as the second job will never start because the first one will be running all the time.
{% endinfo_block %}
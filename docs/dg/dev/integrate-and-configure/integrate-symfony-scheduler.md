---
title: Integrate Symfony Scheduler
description: Learn how to integrate and configure Symfony Scheduler module in a Spryker project.
last_updated: July 29, 2026
template: howto-guide-template
---

This document describes how to integrate and configure Symfony Scheduler module into a Spryker project.

## Install

{% info_block warningBox "Verification" %}

Check if the following modules have been installed:

| MODULE                    | EXPECTED DIRECTORY                         |
|---------------------------|--------------------------------------------|
| SymfonyMessenger          | vendor/spryker/symfony-messenger           |
| SymfonyScheduler          | vendor/spryker/symfony-scheduler           |
| SymfonySchedulerExtension | vendor/spryker/symfony-scheduler-extension |

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
This configuration will be then processed by the `CompiledCronTransportsHandlerProviderPlugin` and for each job a transport will be created in the Symfony Messenger module with the name of the job. The command will be executed by a handler that is also provided by the same plugin and it will execute the command in a subprocess.

**src/Pyz/Zed/SymfonyScheduler/SymfonySchedulerConfig.php**

```php
<?php

namespace Pyz\Zed\SymfonyScheduler;

use Spryker\Shared\MessageBroker\MessageBrokerConstants;
use Spryker\Zed\SymfonyScheduler\SymfonySchedulerConfig as SprykerSymfonySchedulerConfigAlias;

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
The `no_lock` option is optional and it defines whether the job should be executed without acquiring a lock. This can be useful for jobs that are safe to run in parallel.
The `priority` option is optional and defines the consumption order of the job's transport by the worker. The higher the number, the earlier the job is polled. When omitted, priority defaults to `0`.
In addition you can also provide a `store` or a `region`, which works in the same way as originally in `jenkins.php`

### Configure via new plugin

If your use case is more complex than just executing a console command, you can create a new plugin that implements `\Spryker\Shared\SymfonySchedulerExtension\Dependency\Plugin\SchedulerHandlerProviderPluginInterface`.
In example below you can see that we define messages, handlers and schedules for the job.
Messages and handlers are concepts from the Symfony Messenger module. They will be used to trigger and process the job. Schedules are the expressions that define when the job should be executed. It can be simple cron expression or a more complex one like callback trigger, combination of multiple triggers or even a custom trigger that you can implement by yourself.
You don't need to map messages and handlers separately in the SymfonyMessenger module, because the SymfonyScheduler module will take care of things like defining the transport and mapping the message to the handler for the transport.

```php
<?php

namespace Pyz\Zed\FooBar\Communication\Plugin\SymfonyScheduler;

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

***src/Pyz/Zed/SymfonyScheduler/SymfonySchedulerDependencyProvider.php***

```php
<?php

namespace Pyz\Zed\SymfonyScheduler;

use Spryker\Zed\SymfonyScheduler\Communication\Plugin\SymfonyScheduler\CompiledCronTransportsHandlerProviderPlugin;
use Spryker\Zed\SymfonyScheduler\SymfonySchedulerDependencyProvider as SprykerSymfonySchedulerDependencyProvider;

class SymfonySchedulerDependencyProvider extends SprykerSymfonySchedulerDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\SymfonySchedulerExtension\Dependency\Plugin\SchedulerHandlerProviderPluginInterface>
     */
    protected function getSchedulerHandlerProviderPlugins(): array
    {
        return [
            new CompiledCronTransportsHandlerProviderPlugin(), //Plugin that provides handlers for jobs defined in the config
            new FooBarSchedulerHandlerProviderPlugin(), //Plugin that provides scheduled jobs separately
        ];
    }
}
```

## Register the scheduler transports with Symfony Messenger

Scheduled jobs are executed through the Symfony Messenger worker, so the scheduler ships a set of plugins that register its transports, message-to-handler mapping, transport factory, and the Back Office control plugins with the Symfony Messenger module. Wire them in the Symfony Messenger dependency provider.

**src/Pyz/Client/SymfonyMessenger/SymfonyMessengerDependencyProvider.php**

```php
<?php

namespace Pyz\Client\SymfonyMessenger;

use Spryker\Client\SymfonyMessenger\SymfonyMessengerDependencyProvider as SprykerSymfonyMessengerDependencyProvider;
use Spryker\Zed\SymfonyScheduler\Communication\Plugin\SymfonyMessenger\CompiledCronTransportGroupAwarePlugin;
use Spryker\Zed\SymfonyScheduler\Communication\Plugin\SymfonyMessenger\DisabledSchedulerJobTransportGuardPlugin;
use Spryker\Zed\SymfonyScheduler\Communication\Plugin\SymfonyMessenger\SchedulerAvailableTransportConfigProviderPlugin;
use Spryker\Zed\SymfonyScheduler\Communication\Plugin\SymfonyMessenger\SchedulerMessageMappingProviderPlugin;
use Spryker\Zed\SymfonyScheduler\Communication\Plugin\SymfonyMessenger\SchedulerTransportFactoryProviderPlugin;

class SymfonyMessengerDependencyProvider extends SprykerSymfonyMessengerDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\SymfonyMessengerExtension\Dependency\Plugin\TransportFactoryProviderPluginInterface>
     */
    protected function getTransportFactoryProviderPlugins(): array
    {
        return [
            new SchedulerTransportFactoryProviderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Shared\SymfonyMessengerExtension\Dependency\Plugin\AvailableTransportConfigProviderPluginInterface>
     */
    protected function getAvailableTransportConfigProviderPlugins(): array
    {
        return [
            new SchedulerAvailableTransportConfigProviderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Shared\SymfonyMessengerExtension\Dependency\Plugin\MessageMappingProviderPluginInterface>
     */
    protected function getMessageMappingProviderPlugins(): array
    {
        return [
            new SchedulerMessageMappingProviderPlugin(),
        ];
    }

    protected function getGroupAwareTransportsPlugins(): array
    {
        return [
            new CompiledCronTransportGroupAwarePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Shared\SymfonyMessengerExtension\Dependency\Plugin\TransportConsumeGuardPluginInterface>
     */
    protected function getTransportConsumeGuardPlugins(): array
    {
        return [
            new DisabledSchedulerJobTransportGuardPlugin(),
        ];
    }
}
```

- `SchedulerAvailableTransportConfigProviderPlugin` registers one Messenger transport per scheduled job, together with the job's `priority`. It supersedes the deprecated `SchedulerAvailableTransportProviderPlugin`.
- `DisabledSchedulerJobTransportGuardPlugin` lets the worker skip the transport of a job that has been disabled from the Back Office. See [Pause a transport at runtime](/docs/dg/dev/integrate-and-configure/integrate-symfony-messenger.html).
- `SchedulerTransportFactoryProviderPlugin`, `SchedulerMessageMappingProviderPlugin`, and `CompiledCronTransportGroupAwarePlugin` provide the scheduler transport factory, the message-to-handler mapping, and the transport grouping respectively.

## Configure the job status storage

The Back Office scheduler page and the enable/disable and run-now controls persist their state (job statuses, disabled markers, and run requests) in a dedicated Redis connection, separate from the storage key-value store. Configure this connection in `config/Shared/config_default.php`:

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

The storage key prefixes and their time-to-live are defined in `\Spryker\Zed\SymfonyScheduler\SymfonySchedulerConfig` and can be overridden at the project level:

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

The scheduler transport is safe to consume in parallel — each scheduled job is guarded by the Lock facade in the cron jobs builder, so the same schedule is never executed by more than one worker at the same time. You can therefore add the `--parallel` (`-p`) option to spread the load across several worker processes:

```shell
vendor/bin/console symfonymessenger:consume compiled-cron-scheduler --parallel=4
```

## Monitor and control scheduled jobs in the Back Office

The module adds a **Scheduler** page in the Back Office under **Maintenance > Scheduler**. It lists every scheduled job in a live table (refreshed every 5 seconds) with the following columns: Name, Command, Schedule, Priority, Status, Started, Finished, Duration, and Actions.

The **Status** reflects the latest recorded execution state of each job:

| STATUS   | MEANING                                                                       |
|----------|-------------------------------------------------------------------------------|
| Waiting  | The job is registered and awaiting its next run.                              |
| Running  | The job is currently being executed by a worker.                              |
| Success  | The last execution finished successfully.                                     |
| Error    | The last execution failed; the captured output is available on the job's detail page. |
| Disabled | The job is disabled and will not be consumed until it is enabled again.       |

Statuses are recorded by the `CommandHandler` while a job runs and are stored in the dedicated Redis connection (see [Configure the job status storage](#configure-the-job-status-storage)). `Disabled` is derived from the disabled marker and is never persisted as a status record.

Each row provides the following actions:

- **View** — opens a detail page with the job's name, command, status, start/finish timestamps, and error message (if any).
- **Enable / Disable** — toggles the job. Disabling writes a marker to Redis; the `DisabledSchedulerJobTransportGuardPlugin` then makes the worker skip that job's transport, so the job is no longer executed until it is enabled again. Enabling removes the marker.
- **Run now** — requests an immediate, one-off execution ahead of the cron schedule. A run-request marker is written to Redis; the scheduler's run-request-aware trigger consumes it on the next worker poll and fires the job exactly once. The action is unavailable while a job is disabled or already running.

{% info_block infoBox "Requires the job status storage" %}

The Back Office page and the enable/disable and run-now controls require the dedicated Redis connection to be configured. If the connection is unavailable, the controls fail open — a job is treated as enabled and no forced run is scheduled — so a Redis outage never pauses every job.

{% endinfo_block %}

## How it works

The Back Office controls add two decision points to this flow:

- Before iterating a transport, the worker asks every transport consume-guard plugin whether the transport may be consumed. `DisabledSchedulerJobTransportGuardPlugin` returns `false` for a disabled job, so its transport is skipped for that iteration.
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
        'command' => $logger . '$PHP_BIN vendor/bin/console symfonymessenger:consume compiled-cron-scheduler --time-limit=3600',
        'schedule' => '* * * * *',
        'enable' => true,
    ];

if (getenv('SPRYKER_CURRENT_REGION')) {
    foreach ($jobs as $job) {
        $job['region'] = getenv('SPRYKER_CURRENT_REGION');
    }
}
```

As you see we defined 2 jobs, one for consuming the queue worker messages and another one for consuming the rest of the jobs. 
Queue worker process runs at least a minute so consumer will try to re-schedule the job every minute and this will leave rest of the jobs waiting. Because of that queue worker have its own consumer process. The rest of the jobs can be consumed by another consumer process that will be running in parallel.
To scale a single consumer across multiple worker processes instead of defining additional Jenkins jobs, add the `--parallel=N` option to the command (see [Run the Scheduler](#run-the-scheduler)).
{% info_block warningBox "Important" %}
Jenkins by default has 2 executors so both of those jobs will be running in parallel. It's not possible to use this setup with 1 executor as the second job will never start because the first one will be running all the time.
{% endinfo_block %}
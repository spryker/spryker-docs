---
title: Integrate Symfony Scheduler
description: Learn how to integrate and configure Symfony Scheduler module in a Spryker project.
last_updated: February 10, 2026
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

## Run the Scheduler

To run a scheduler you need to run the SymfonyMessenger consumer with the transport name that is configured for the job.

```shell
vendor/bin/console symfonymessenger:consume queue-worker-start report-generation
```

## How it works

```mermaid
flowchart TD
    Start([symfonymessenger:consume alias])
    
    subgraph Messenger[Symfony Messenger]
        BuildWorker[Build Worker, list of transports, message→handler mapping and run worker]
        RunWorker[Run Worker]
        IterateTransports[Iterate transport names one by one]
        GetMessage[Get a message from the transport]
        RunGenerator[Run a message generator]
    end
    
    subgraph Scheduler[Symfony Scheduler]
        CheckMessage[Check for message associated with transport\nuntil nothing is to process]
        IsUpToRunning{Is message up to running?}
        DoesLockExist{Does lock exist?}
        CreateLock[Create lock]
        YieldMessage[Yield the message]
        ReleaseLock[Release lock]
    end
    
    subgraph Spryker[Spryker code]
        GetGenerated[Get generated message]
        CheckHandlers[Check for handlers for message]
        RunHandler[Run a CommandHandler and wait for its execution]
        Subprocess[[Subprocess is running]]
    end

    Start --> BuildWorker
    BuildWorker --> RunWorker
    RunWorker --> IterateTransports
    IterateTransports --> GetMessage
    GetMessage --> RunGenerator
    RunGenerator --> CheckMessage

    CheckMessage --> IsUpToRunning
    IsUpToRunning -->|+| DoesLockExist
    IsUpToRunning -->|no| CheckMessage

    DoesLockExist -->|+| CreateLock
    DoesLockExist -->|yes| CheckMessage

    CreateLock --> YieldMessage
    YieldMessage --> GetGenerated

    GetGenerated --> CheckHandlers
    CheckHandlers --> RunHandler
    RunHandler <--> Subprocess

    RunHandler --> ReleaseLock
    ReleaseLock --> CheckMessage

    %% also model the transport-iteration loop
    CheckMessage --> IterateTransports
```

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
{% info_block warningBox "Important" %}
Jenkins by default has 2 executors so both of those jobs will be running in parallel. It's not possible to use this setup with 1 executor as the second job will never start because the first one will be running all the time.
{% endinfo_block %}
---
title: Multi process run console
description: Describes the MultiProcessRunConsole command for long-running worker processes or repeated console command execution in a controlled and restartable way.
keywords: MultiProcessRunConsole, Jenkins, Command, Console, Worker.
last_updated: Nov 10, 2025
template: howto-guide-template
related:
  - title: Cronjobs
    link: docs/dg/dev/backend-development/cronjobs/cronjobs.html
  - title: Jenkins stability best practices
    link: docs/ca/dev/best-practices/best-practises-jenkins-stability.html
  - title: Jenkins operational best practices
    link: docs/ca/dev/best-practices/jenkins-operational-best-practices.html
---

## Overview

The `MultiProcessRunConsole` command is designed for long-running worker processes or repeated console command execution in a controlled and restartable way.

It allows you to:

- Automatically restart console commands in the Jenkins job.

- Run commands in a continuous loop with an expected maximum execution time limit.

- Execute commands in separate processes to prevent shared memory or cache collisions.

- Enforce child process execution timeouts.

## Installing the `MultiProcessRunConsole`

1. Require the package:

```bash
composer require spryker/console:"^4.16.0"
```

2. Add a console command to `src/Pyz/Zed/Console/ConsoleDependencyProvider.php`:

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\Communication\Plugin\Console\MultiProcessRunConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    protected function getConsoleCommands(Container $container): array
    {
        $commands = [
            // ...
            new MultiProcessRunConsole(),
        ];
    }
}
```

3. Configure in `config/Zed/cronjobs/jenkins.php`:

```php
/* Example of usage multi-process:run in jenkins config */
$jobs[] = [
    'name' => 'multi-process-update-product-label-relations',
    'command' => '$PHP_BIN vendor/bin/console multi-process:run \"product-label:relations:update -vvv --no-touch\" 20 --separate_thread',
    'schedule' => '* * * * *',
    'enable' => true,
];
```

{% info_block infoBox "Info" %}

⚠️ **Important — Quoting matters**

When you use `multi-process:run`, ensure that the child command is properly quoted.

Use double quotes ("...") around the child command if it contains spaces or options.

Escape quotes inside the string (\"...\") in `config/Zed/cronjobs/jenkins.php` to ensure the full child command is passed correctly.

{% endinfo_block %}


## Command Arguments and Options

| Name                             | Type                | Required | Default | Description                                                                                                                                                                                                                              |
| -------------------------------- |---------------------|----------| ------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **`child`**                      | Argument (Required) | yes      | —       | The child console command to execute, for example: `"queue:task:start publish"`                                                                                                                                                          |
| **`total_timeout`**              | Argument            | no       | `600`   | Total duration (in seconds) to keep running the loop. Seting to `0` makes it run endlessly, which is not recommended, since it folly occupies executor.                                                                                  |
| **`--separate_thread`, `-s`**    | Option              | no       | `false` | Runs each child console command in a separate child sub-process. Prevents memory leaks and state collisions.                                                                                                                             |
| **`--child_timeout`, `-t`**      | Option              | no       | `60`    | Expected maximum execution time for each child sub-process, in seconds.                                                                                                                                                                           |
| **`--child_min_duration`, `-m`** | Option              | no       | `0`     | Minimum execution time for child console command excution including child sub-process. If the command finishes too quickly, the process waits to reach this time. Leave the default one to start the next command execution immediately. |


## Common Use Cases

### Continuous queue workers

If your application requires immediate processing of the publish queue, the following Jenkins job might be of a great help for you.

```php
vendor/bin/console multi-process:run "queue:task:start publish" 60
```

- Restarts `queue:task:start publish` every time it finishes.
- Doesn't spawn a separate process for each execution
- Runs for a total of 60 seconds.

### Continuous OMS Condition Check Runner

The Spryker command `console oms:check-condition` is responsible for evaluating OMS state machine transitions.
In high-load systems or asynchronous processing setups, it's useful to run this command in a loop to continuously check pending orders instead of relying on cron every minute.

```php
vendor/bin/console multi-process:run "oms:check-condition" 280 -t 300 --separate_thread
```

- Restarts `oms:check-condition` every time it finishes.
- Runs for a total of 280 seconds.
- Limits each child execution to 300 seconds.
- Run the command in a separate process to eliminate process cache collisions.

### Continuous event processing

You can also use background commands to publish delayed events from the queue.  
This approach ensures that the event queue stays continuously drained without requiring a cron job every minute.

```php
vendor/bin/console multi-process:run "event:process:publish" 280 -t 300 --separate_thread
```

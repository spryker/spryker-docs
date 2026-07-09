---
title: ProcessTimedOutException after queue-task-start
description: Learn how to fix the exception after running queue-task-start within your Spryker based projects.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/processtimedoutexception-after-queue-task-start.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


## Description

After running `queue:task:start`, the following exception is thrown:

```bash
Symphony\Component\Process\Exception\ProcesstimedOutException - Exception: The process "/app/vendor/bin/console queue:task:start event" exeeded the timeout of 60 seconds in /app/vendor/symfony/process/Process.php (1335)
```

## Cause

The problem occurs when the task runs for longer than the max execution time specified in the PHP settings.

## Solution

In the PHP settings, increase `max_execution_time`.
If you use Docker, you can increase the max execution time in the *deploy.yml* file, for example:

```yaml
image:
  tag: ...
  php:
    ini:
      'max_execution_time': 300
```

---
title: ProcessTimedOutException after queue-task-start
originalLink: https://documentation.spryker.com/2021080/docs/processtimedoutexception-after-queuetaskstart
redirect_from:
  - /2021080/docs/processtimedoutexception-after-queuetaskstart
  - /2021080/docs/en/processtimedoutexception-after-queuetaskstart
---

## Description
After running `queue:task:start`, the following exception is thrown:

```
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

  - /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/processtimedoutexception-after-queue-task-start.html
---
title: ProcessTimedOutException after queue-task-start
description: Learn how to fix the exception after running queue-task-start
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/processtimedoutexception-after-queuetaskstart
originalArticleId: e480ba5c-9f2c-49ff-b238-1e907b2c61ce
redirect_from:
  - /2021080/docs/processtimedoutexception-after-queuetaskstart
  - /2021080/docs/en/processtimedoutexception-after-queuetaskstart
  - /docs/processtimedoutexception-after-queuetaskstart
  - /docs/en/processtimedoutexception-after-queuetaskstart
  - /v6/docs/processtimedoutexception-after-queuetaskstart
  - /v6/docs/en/processtimedoutexception-after-queuetaskstart
related:
  - title: A command fails with a `Killed` message
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/a-command-fails-with-a-killed-message.html
  - title: Class Silex/ControllerProviderInterface not found
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/class-silex-controllerproviderinterface-not-found.html
  - title: Composer version 2 compatibility issues
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/composer-version-2-compatibility-issues.html
  - title: ERROR - remove spryker_logs - volume is in use
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/error-remove-spryker-logs-volume-is-in-use.html
  - title: Error response from daemon - OCI runtime create failed - .... \\\"no such file or directory\\\"\""- unknown
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/error-response-from-daemon-oci-runtime-create-failed-no-such-file-or-directory-unknown.html
  - title: Fail whale on the frontend
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/fail-whale-on-the-front-end.html
  - title: No data on the Storefront
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/no-data-on-the-storefront.html
  - title: PHPStan memory issues
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/phpstan-memory-issues.html
  - title: RabbitMQ - Zed.CRITICAL- PhpAmqpLib\Exception\AMQPChannelClosedException - Channel connection is closed
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/rabbitmq-zed.critical-phpamqplib-exception-amqpchannelclosedexception-channel-connection-is-closed.html
  - title: Router generates absolute URL with localhost
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/router-generates-absolute-url-with-localhost.html
  - title: RuntimeException - Failed to execute regex - PREG_JIT_STACKLIMIT_ERROR
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/runtimeexception-failed-to-execute-regex-preg-jit-stacklimit-error.html
  - title: The spy_oms_transition_log table takes up too much space
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/the-spy-oms-transition-log-table-takes-up-too-much-space.html
  - title: Unable to resolve hosts for Mail, Jenkins, and RabbitMQ
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/unable-to-resolve-hosts-for-mail-jenkins-and-rabbitmq.html
---

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

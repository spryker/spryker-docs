  - /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/rabbitmq-zed.critical-phpamqplib-exception-amqpchannelclosedexception-channel-connection-is-closed.html
---
title: RabbitMQ- Zed.CRITICAL- PhpAmqpLib\Exception\AMQPChannelClosedException - Channel connection is closed
description: Learn how to fix the issue when events are not consumed or are consumed slowly.
last_updated: May 3, 2023
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/rabbitmq-zedcritical-phpamqplibexceptionamqpchannelclosedexception-channel-connection-is-closed
originalArticleId: 39daf8b8-9e73-4c76-a6ee-372d3e5bbca6
redirect_from:
  - /2021080/docs/rabbitmq-zedcritical-phpamqplibexceptionamqpchannelclosedexception-channel-connection-is-closed
  - /2021080/docs/en/rabbitmq-zedcritical-phpamqplibexceptionamqpchannelclosedexception-channel-connection-is-closed
  - /docs/rabbitmq-zedcritical-phpamqplibexceptionamqpchannelclosedexception-channel-connection-is-closed
  - /docs/en/rabbitmq-zedcritical-phpamqplibexceptionamqpchannelclosedexception-channel-connection-is-closed
  - /v6/docs/rabbitmq-zedcritical-phpamqplibexceptionamqpchannelclosedexception-channel-connection-is-closed
  - /v6/docs/en/rabbitmq-zedcritical-phpamqplibexceptionamqpchannelclosedexception-channel-connection-is-closed
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
  - title: ProcessTimedOutException after queue-task-start
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/processtimedoutexception-after-queue-task-start.html
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

Events are not consumed or are consumed much slower than normal. In RabbitMQ exception.log, the following exception can be found (often also with Broken Pipe reference):

```php
Zed.CRITICAL: PhpAmqpLib\Exception\AMQPChannelClosedException - Channel connection is closed.
```

## Cause

There are several potential reasons for this error. The most common cause is that during P&S chunks take too much time to be processed and RabbitMQ is closing its TCP connection as it anticipates either a timeout or no further connection to happen.

## Solution

It is best to profile the job where you are experiencing this error to understand what exactly makes processing the chunks expensive. Temporary mitigation of the issue might be possible as explained below:

**Adjusting CHUNK_SIZE**

Using smaller chunk sizes might help to alleviate the issue because it reduces the time until a chunk is fully processed. If you are running a standard publishing setup, you can adjust the following value in `config_default.php`. 

```php
$config[EventConstants::EVENT_CHUNK] = 200;
```

---
title: RabbitMQ- Zed.CRITICAL- PhpAmqpLib\Exception\AMQPChannelClosedException - Channel connection is closed
description: Learn how to fix the issue when events are not consumed or are consumed slowly.
last_updated: Jun 16, 2021
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

Events are not consumed or are consumed slowly. In RabbitMQ exception.log, the following exception can be found:

```
Zed.CRITICAL: PhpAmqpLib\Exception\AMQPChannelClosedException - Channel connection is closed.
```

## Cause

The exact reason for the error is unknown, but we've noticed that it occurs predominantly in large Spryker environments with many product updates.  We continue to explore the root cause.

## Solution

We have discovered two options that helped to resolve the error:

**1. Implementing RabbitMQ lazy queues**
One possible solution can be implementing RabbitMQ lazy queues to reduce RAM usage. This is already implemented for PaaS customers.
Configuring RabbitMQ to put messages on disk and load them into memory only when they are needed (lazy queuing) can help. For instructions on how to do this, see the CloudAMQ article [Stopping the stampeding herd problem with lazy queues](https://www.cloudamqp.com/blog/2017-07-05-solving-the-thundering-herd-problem-with-lazy-queues.html).

**2. Adjusting CHUNK_SIZE**
Using smaller chunk sizes for export and storage sync in RabbitMQ might also help to alleviate the issue. Include the following values in the config file used:

```
$config[SynchronizationConstants::EXPORT_MESSAGE_CHUNK_SIZE] = 200;
$config[SynchronizationConstants::DEFAULT_SYNC_STORAGE_QUEUE_MESSAGE_CHUNK_SIZE] = 200;
$config[SynchronizationConstants::DEFAULT_SYNC_SEARCH_QUEUE_MESSAGE_CHUNK_SIZE] = 200;
$config[EventConstants::EVENT_CHUNK] = 200;
```

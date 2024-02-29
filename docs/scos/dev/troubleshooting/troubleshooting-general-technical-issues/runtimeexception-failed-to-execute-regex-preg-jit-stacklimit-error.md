  - /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/runtimeexception-failed-to-execute-regex-preg-jit-stacklimit-error.html
---
title: RuntimeException- Failed to execute regex- PREG_JIT_STACKLIMIT_ERROR
description: This troubleshooting guide will help you to fix the error `RuntimeException- Failed to execute regex- PREG_JIT_STACKLIMIT_ERROR`.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/runtimeexception-failed-to-execute-regex-preg-jit-stacklimit-error
originalArticleId: 53d95154-60db-40db-b4b8-6e0c4ae9233b
redirect_from:
  - /2021080/docs/runtimeexception-failed-to-execute-regex-preg-jit-stacklimit-error
  - /2021080/docs/en/runtimeexception-failed-to-execute-regex-preg-jit-stacklimit-error
  - /docs/runtimeexception-failed-to-execute-regex-preg-jit-stacklimit-error
  - /docs/en/runtimeexception-failed-to-execute-regex-preg-jit-stacklimit-error
  - /v6/docs/runtimeexception-failed-to-execute-regex-preg-jit-stacklimit-error
  - /v6/docs/en/runtimeexception-failed-to-execute-regex-preg-jit-stacklimit-error
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
  - title: RabbitMQ - Zed.CRITICAL- PhpAmqpLib\Exception\AMQPChannelClosedException - Channel connection is closed
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/rabbitmq-zed.critical-phpamqplib-exception-amqpchannelclosedexception-channel-connection-is-closed.html
  - title: Router generates absolute URL with localhost
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/router-generates-absolute-url-with-localhost.html
  - title: The spy_oms_transition_log table takes up too much space
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/the-spy-oms-transition-log-table-takes-up-too-much-space.html
  - title: Unable to resolve hosts for Mail, Jenkins, and RabbitMQ
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/unable-to-resolve-hosts-for-mail-jenkins-and-rabbitmq.html
---

## Description
```bash
[RuntimeException]                                  
Failed to execute regex: PREG_JIT_STACKLIMIT_ERROR
```

This error is received when using composer (`composer require`) to add additional modules.

## Cause
The error is thrown if the [backtracking/recursion limit](https://www.php.net/manual/en/pcre.configuration.php) is not high enough.

## Solution
Either increase the limits to your requirements or switch off PCRE's just-in-time compilation in your php.ini:
```bash
pcre.jit=0
```
You can also switch off PCRE just in time compilation using your `deploy.yml`.
```bash
image:
  tag: ...
  php:
    ini:
      'pcre.jit': 0
```

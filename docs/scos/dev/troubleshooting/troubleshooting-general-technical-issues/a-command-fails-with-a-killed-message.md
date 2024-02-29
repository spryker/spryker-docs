  - /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/a-command-fails-with-a-killed-message.html
---
title: A command fails with a `Killed` message
description: Learn how to resolve the issue with a command returning a `killed` message.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/a-command-fails-with-a-killed-message
originalArticleId: 09c3dd70-4e87-4604-b5d3-844e49e4c853
redirect_from:
  - /2021080/docs/a-command-fails-with-a-killed-message
  - /2021080/docs/en/a-command-fails-with-a-killed-message
  - /docs/a-command-fails-with-a-killed-message
  - /docs/en/a-command-fails-with-a-killed-message
  - /v6/docs/a-command-fails-with-a-killed-message
  - /v6/docs/en/a-command-fails-with-a-killed-message
related:
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
  - title: RabbitMQ - Zed.CRITICAL - PhpAmqpLib\Exception\AMQPChannelClosedException - Channel connection is closed
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

Running a CLI command with a long execution time returns a `Killed` message.

## Solution

* In PHP settings, increase `max_execution_time`. In Docker based projects, you can do it via a Deploy file as follows:

```yaml
image:
  tag: ...
  php:
    ini:
      'max_execution_time': 300
```

* Increase `PropelConfig` class timeout:

**/b2c/vendor/spryker/propel/src/Spryker/Zed/Propel/PropelConfig.php**

```php

class PropelConfig extends AbstractBundleConfig
{
    public const DB_ENGINE_MYSQL = 'mysql';
    public const DB_ENGINE_PGSQL = 'pgsql';

    protected const PROCESS_TIMEOUT = {process_timeout_value};

    ...
}
```

Replace `{process_timeout_value}` with a suitable value. We recommend setting the value that is just enough to run the command. Setting an unreasonably big value may cause performance issue.

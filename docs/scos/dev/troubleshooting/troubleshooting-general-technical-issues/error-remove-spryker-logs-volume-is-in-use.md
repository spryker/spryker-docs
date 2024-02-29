  - /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/error-remove-spryker-logs-volume-is-in-use.html
---
title: ERROR- remove spryker_logs- volume is in use
description: The solution to the `ERROR- remove spryker_logs- volume is in use` error.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/error-remove-spryker-logs-volume-is-in-use
originalArticleId: 2c841376-da36-4778-8964-306d0088f3d6
redirect_from:
  - /2021080/docs/error-remove-spryker-logs-volume-is-in-use
  - /2021080/docs/en/error-remove-spryker-logs-volume-is-in-use
  - /docs/error-remove-spryker-logs-volume-is-in-use
  - /docs/en/error-remove-spryker-logs-volume-is-in-use
  - /v6/docs/error-remove-spryker-logs-volume-is-in-use
  - /v6/docs/en/error-remove-spryker-logs-volume-is-in-use
related:
  - title: A command fails with a `Killed` message
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/a-command-fails-with-a-killed-message.html
  - title: Class Silex/ControllerProviderInterface not found
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/class-silex-controllerproviderinterface-not-found.html
  - title: Composer version 2 compatibility issues
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/composer-version-2-compatibility-issues.html
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
  - title: RabbitMQ- Zed.CRITICAL - PhpAmqpLib\Exception\AMQPChannelClosedException - Channel connection is closed
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

You get the error `ERROR: remove spryker_logs: volume is in use - [{container_hash}]`

## Solution

1. Run the command:

```
docker rm -f {container_hash}
```

2. Repeat the failed command.

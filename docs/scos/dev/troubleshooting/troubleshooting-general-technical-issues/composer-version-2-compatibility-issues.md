  - /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/composer-version-2-compatibility-issues.html
---
title: Composer version 2 compatibility issues
description: Learn how to solve Composer version 2 compatibility issues.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/composer-version-2-compatibility-issues
originalArticleId: b110284a-a19f-4c7b-a8fd-769b3dff6ed2
redirect_from:
  - /2021080/docs/composer-version-2-compatibility-issues
  - /2021080/docs/en/composer-version-2-compatibility-issues
  - /docs/composer-version-2-compatibility-issues
  - /docs/en/composer-version-2-compatibility-issues
  - /v6/docs/composer-version-2-compatibility-issues
  - /v6/docs/en/composer-version-2-compatibility-issues
related:
  - title: A command fails with a `Killed` message
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/a-command-fails-with-a-killed-message.html
  - title: Class Silex/ControllerProviderInterface not found
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/class-silex-controllerproviderinterface-not-found.html
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

After running `composer update spryker/{module_name}`, you get an error similar to the following:

```bash
Problem 1
- ocramius/package-versions is locked to version 1.4.2 and an update of this package was not requested.
- ocramius/package-versions 1.4.2 requires composer-plugin-api ^1.0.0 -> found composer-plugin-api[2.0.0] but it does not match the constraint.
Problem 2
- sllh/composer-versions-check is locked to version v2.0.3 and an update of this package was not requested.
- sllh/composer-versions-check v2.0.3 requires composer-plugin-api ^1.0 -> found composer-plugin-api[2.0.0] but it does not match the constraint.
Problem 3
- ocramius/package-versions 1.4.2 requires composer-plugin-api ^1.0.0 -> found composer-plugin-api[2.0.0] but it does not match the constraint.
- jean85/pretty-package-versions 1.2 requires ocramius/package-versions ^1.2.0 -> satisfiable by ocramius/package-versions[1.4.2].
- jean85/pretty-package-versions is locked to version 1.2 and an update of this package was not requested.
ocramius/package-versions only provides support for Composer 2 in 1.8+, which requires PHP 7.4.
If you can not upgrade PHP you can require composer/package-versions-deprecated to resolve this with PHP 7.0+.
```

## Solution

Run the following commands:

```bash
composer self-update --2
composer remove sllh/composer-versions-check --ignore-platform-reqs
composer require spryker-sdk/phpstan-spryker:^0.3 -W --ignore-platform-reqs

git commit && git push
```

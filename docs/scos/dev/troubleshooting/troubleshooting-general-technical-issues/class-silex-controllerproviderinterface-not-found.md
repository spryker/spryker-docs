  - /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/class-silex-controllerproviderinterface-not-found.html
---
title: Class Silex/ControllerProviderInterface not found
description: Learn how to fix the issue when class Silex/ControllerProviderInterface is not found
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/class-silexcontrollerproviderinterface-not-found
originalArticleId: 1ed7e7c7-6975-4cdc-855c-3f5e8006a555
redirect_from:
  - /2021080/docs/class-silexcontrollerproviderinterface-not-found
  - /2021080/docs/en/class-silexcontrollerproviderinterface-not-found
  - /docs/class-silexcontrollerproviderinterface-not-found
  - /docs/en/class-silexcontrollerproviderinterface-not-found
  - /v6/docs/class-silexcontrollerproviderinterface-not-found
  - /v6/docs/en/class-silexcontrollerproviderinterface-not-found
  - /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/fail-whale-on-the-front-end.html
related:
  - title: A command fails with a `Killed` message
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/a-command-fails-with-a-killed-message.html
  - title: Composer version 2 compatibility issues
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/composer-version-2-compatibility-issues.html
  - title: ERROR - remove spryker_logs - volume is in use
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/error-remove-spryker-logs-volume-is-in-use.html
  - title: Error response from daemon- OCI runtime create failed- .... \\\"no such file or directory\\\"\""- unknown
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

## Description

When a project still uses Silex, but modules were updated to the newest versions, where Silex is moved to the require-dev dependency, class `Silex/ControllerProviderInterface` is not found.

## Cause

The current version (1.0.4) of this module uses `SprykerShop\Yves\CheckoutPage\Plugin\Provider\CheckoutPageControllerPlugin`which is no longer functional in the latest Spryker Core.

## Solution

Until a new version of this module is provided, users can work around this issue by overriding `EasycreditController` and using `CheckoutPageRouteProviderPlugin` instead of `CheckoutPageControllerPlugin`. Also, see [Silex replacement](/docs/dg/dev/upgrade-and-migrate/silex-replacement/silex-replacement.html).

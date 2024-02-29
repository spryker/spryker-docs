  - /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/the-spy-oms-transition-log-table-takes-up-too-much-space.html
---
title: The spy_oms_transition_log table takes up too much space
description: Configure transition logs to be removed automatically.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/the-spy-oms-transition-log-table-takes-up-too-much-space
originalArticleId: 5c025e16-bfc2-4dcf-ba35-137044daa486
redirect_from:
  - /2021080/docs/the-spy-oms-transition-log-table-takes-up-too-much-space
  - /2021080/docs/en/the-spy-oms-transition-log-table-takes-up-too-much-space
  - /docs/the-spy-oms-transition-log-table-takes-up-too-much-space
  - /docs/en/the-spy-oms-transition-log-table-takes-up-too-much-space
  - /v6/docs/the-spy-oms-transition-log-table-takes-up-too-much-space
  - /v6/docs/en/the-spy-oms-transition-log-table-takes-up-too-much-space
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
  - title: RabbitMQ - Zed.CRITICAL - PhpAmqpLib\Exception\AMQPChannelClosedException - Channel connection is closed
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/rabbitmq-zed.critical-phpamqplib-exception-amqpchannelclosedexception-channel-connection-is-closed.html
  - title: Router generates absolute URL with localhost
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/router-generates-absolute-url-with-localhost.html
  - title: RuntimeException - Failed to execute regex - PREG_JIT_STACKLIMIT_ERROR
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/runtimeexception-failed-to-execute-regex-preg-jit-stacklimit-error.html
  - title: Unable to resolve hosts for Mail, Jenkins, and RabbitMQ
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/unable-to-resolve-hosts-for-mail-jenkins-and-rabbitmq.html
---

The `spy_oms_transition_log` table stores the history of order management system transitions. The logs are kept for debugging reasons. If you don't need them or you have backed them up, you can remove them.

{% info_block errorBox "Manipulating tables" %}

Table manipulations can affect a shop greatly. It is not safe to do so, and we recommend double-checking all the details before you proceed. The instructions below can help you solve a storage space issue. Make sure to follow them exactly.

{% endinfo_block %}

## Cause

By default, nothing limits the table size or deletes old records.

## Solution

Schedule the following SQL query to delete all the logs older than 90 days. You can adjust the time interval per your requirements.

```sql
DELETE FROM
	spy_oms_transition_log
WHERE
	created_at < CURRENT_DATE - interval '90' day;
```

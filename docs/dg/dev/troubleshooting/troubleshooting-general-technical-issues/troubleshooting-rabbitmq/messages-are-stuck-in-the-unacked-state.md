---
title: Messages are stuck in the Unacked state
description: This troubleshooting guide suggests solution strategies for messages that get stuck in the unacked status
last_updated: Oct 31, 2022
template: troubleshooting-guide-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/troubleshooting-rabbitmq/messages-are-stuck-in-the-unacked-state.html

related:
  - title: Messages are moved to error queues
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/troubleshooting-rabbitmq/messages-are-moved-to-error-queues.html
  - title: Messages are stuck without error notifications
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/troubleshooting-rabbitmq/messages-are-stuck-without-error-notifications.html
---

## Description

Messages are getting stuck or do not get consumed from RabbitMQ queues. They are not getting moved to the error queue and there is no visible error in CloudWatch log groups. Instead, the messages are stuck in the `Ready` queue and are moved to the `Unacked` state and not consumed and moved back, or are stuck in the `Unacked` state.

## Cause

This is most often caused by the consumption process not being able to successfully finish to do OOM error.

## Solution

Unfortunately, this is tricky to diagnose in a PaaS environment as you may lack debugging tools. However, you can try to reduce the [chunk size](/docs/dg/dev/guidelines/performance-guidelines/architecture-performance-guidelines.html#publish-and-synchronization). For this, adjust the following configuration in the `default_config.php` file of your project:

```bash
$config[EventConstants::EVENT_CHUNK]
```

Try to reduce it drastically—for example, reduce to 100 and redeploy.
Then, you can move back the stuck messages from `Unacked` to the `ready` state so that the consumers can try to consume them again by force closing the connections as the following example shows.

![Force Close RabbitMQ Connections](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/rabbitmq_troubleshooting_force_close_connection.gif)

Once the queue worker process runs, the messages are attempted to be consumed again.

If the messages are still not consumable, try to reproduce this behavior locally by dumping your database and publishing the messages in your local development environment as explained in [HowTo: Do better deployments](https://docs.spryker.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-do-better-deployments.html#ingest-staging-or-production-data).

If the messages are consumed in your local environment without a problem, get in touch with our [support](https://docs.spryker.com/docs/scos/user/intro-to-spryker/support/how-to-contact-spryker-support.html) and include the information that you have tested the consumption locally.

---
title: Messages stuck in unacked state
description: This article suggests solution strategies for when messages get stuck in unacked status
last_updated: Oct 31, 2022
template: troubleshooting-guide-template
---

## Description
Messages are getting stuck or do not get consumed from RabbitMQ queues. They are not getting moved to the error queue and there is no visible error in CloudWatch log groups. Instead, the messages are stuck in the “Ready” queue and are getting moved to unacked state and not consumed and moved back, or are stuck in unacked state.

## Cause
This is most often caused by the consumption process not being able to successfully finish to do OOM error

## Solution
Unfortunately, this is tricky to diagnose on a PaaS environment as you will be lacking debugging tools, however, you can try to reduce [chunk size](https://docs.spryker.com/docs/scos/dev/guidelines/performance-guidelines/architecture-performance-guidelines.html#publish-and-synchronization) by adjusting 
```bash
$config[EventConstants::EVENT_CHUNK]
```
in default_config.php file in your project. You should try to reduce it drastically, to say, 100 and redeploy.
You can then move back the stuck messages from unacked state to ready state so that the consumers can try to consume them again by force closing the connections as shown below. 
![Force Close RabbitMQ Connections](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/rabbitmq_troubleshooting_force_close_connection.gif "Force Close RabbitMQ Connections")
Once the queue worker process runs, the messages will be attempted to be consumed again.
If the messages are still not consumable, you should try to reproduce this behavior locally by trying to dump your database and trying to publish the messages in your local development environment as explained in this [public documentation](https://docs.spryker.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-do-better-deployments.html#ingest-staging-or-production-data). 
If the messages are consumed in your local environment without a problem, get in touch with our [support](https://docs.spryker.com/docs/scos/user/intro-to-spryker/support/how-to-contact-spryker-support.html) and include the information that you have tested the consumption locally.

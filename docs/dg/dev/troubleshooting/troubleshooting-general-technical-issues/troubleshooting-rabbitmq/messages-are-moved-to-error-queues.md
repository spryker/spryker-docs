---
title: Messages are moved to error queues
description: This troubleshooting guide describes how to approach diagnosing why messages are moved to error queues in RabbitMQ
last_updated: Oct 31, 2022
template: troubleshooting-guide-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/troubleshooting-rabbitmq/messages-are-moved-to-error-queues.html

related:
  - title: Messages are stuck in the Unacked state
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/troubleshooting-rabbitmq/messages-are-stuck-in-the-unacked-state.html
  - title: Messages are stuck without error notifications
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/troubleshooting-rabbitmq/messages-are-stuck-without-error-notifications.html
---

## Description

Some or all messages are not processed and consumed from the queue as normal, but they are moved to their respective error queues, where they stay unprocessed.

## Cause

The following causes this problem:
- You are exceeding the request entity size restriction of Elasticsearch. In this case, you can find the error message Request entity too large in the RabbitMQ error queues. To check that, see the [Solution](#solution) section.
- Data issues like unmet dependencies. You try to publish a product that references a category that is not in Elasticsearch, or you try to publish information that does not meet the data schema in Redis are frequent causes.

## Solution

The solution depends on the error the consumer encounters. You can check what the reason is, but getting a message from the error queue, you can find the messages using RabbitMQ UI. The following steps show how this can be done:

![Access RabbitMQ Error Queues](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/rabbit_mq_troubleshooting_access-rabbitmq-error-queues.gif)

1. Either the request size needs to be reduced, or your Elasticsearch instance needs to be upscaled. [Get in touch with our support](https://spryker.force.com/support/s/), so we can determine the best course of action in your particular case.
2. To make the messages consumable, mitigate the error. This is best done in your local development environment as your options to debug the publish and sync process, and the consumption process of the listeners are much better. For this, you can import your staging or production database (that contains the data that you cannot publish correctly) locally, as described in [HowTo: Do better deployments](https://docs.spryker.com/docs/scos/dev/tutorials-and-howtos/howtos/howto-do-better-deployments.html#ingest-staging-or-production-data).

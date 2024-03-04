---
title: Messages are stuck without error notifications
description: This troubleshooting guide describes how to deal with messages that get stuck in queues without visible error notifications
last_updated: Oct 31, 2022
template: troubleshooting-guide-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/troubleshooting-rabbitmq/messages-are-stuck-without-error-notifications.html

related:
  - title: Messages are moved to error queues
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/troubleshooting-rabbitmq/messages-are-moved-to-error-queues.html
  - title: Messages are stuck in the Unacked state
    link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/troubleshooting-rabbitmq/messages-are-stuck-in-the-unacked-state.html
---

## Description

Messages are getting stuck or do not get consumed from RabbitMQ queues. They are not getting moved to the error queue, and there is no visible error in CloudWatch log groups. Instead, the messages are stuck in the `Ready` queue without being moved to the `Unacked` queue.

## Cause

This symptom usually indicates that the queue worker responsible for consuming the messages from the stuck queue is not running. Switch to your Jenkins instance and validate that the queue worker for the queue.

![Jenkins Job Queue Worker](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/rabbit_mq_troublehsooting_find_queue_worker.png)

The naming of the queue worker corresponds to the virtual host of the affected queue in RabbitMQ is running and does not encounter errors.

![Rabbit MQ Vhosts](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/rabbit_mq_troublehsooting_find_vhosts_name.png)

If the queue worker runs but encounters errors, you can view the error message. For this, click the job and open the console output.

![Jenkins Job Console Output](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/rabbit_mq_troubleshooting_find_console_output.png)

## Solution

If the queue worker encounters errors, you need to solve these errors. If the queue worker does not run, start up the queue worker by ensuring that the project is enabled.

![Enable Jenkins Project](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/rabbit_mq_troubleshooting_enable_project.png)

Then, start building the project by clicking **Build Now**.

![Build Jenkins Project](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/rabbit_mq_troubleshooting_queue_worker_build_now.png)

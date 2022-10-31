---
title: Messages are stuck without error messages
description: This troubleshooting guide describes how to deal with messages getting stuck in queues without visible error messages
last_updated: Oct 31, 2022
template: troubleshooting-guide-template
---

## Description

Messages are getting stuck/do not get consumed from RabbitMQ queues. They are not getting moved to the error queue and there is no visible error in CloudWatch log groups. Instead, the messages are stuck in the “Ready” queue without being moved to the `Unacked` queue.

## Cause

This symptom usually indicates that the queue worker responsible for consuming the messages from the stuck queue is not running. Switch to your Jenkins instance and validate that the queue worker for the queue.

![Jenkins Job Queue Worker](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/rabbit_mq_troublehsooting_find_queue_worker.png)

The naming of the queue worker corresponds to the virtual host of the affected queue in RabbitMQ is running and does not encounter errors.

![Rabbit MQ Vhosts](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/rabbit_mq_troublehsooting_find_vhosts_name.png)

If you see that the queue worker runs, but encounters errors, you can view the error message. For this, click the job and open the console output.

![Jenkins Job Console Output](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/rabbit_mq_troubleshooting_find_console_output.png)

## Solution

If you see that the queue worker encounters errors, you need to solve these errors. If the queue worker just does not run, start up the queue worker by making sure that the project is enabled.

![Enable Jenkins Project](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/rabbit_mq_troubleshooting_enable_project.png)

After that, start building the project by clicking **Build Now**.

![Build Jenkins Project](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/rabbit_mq_troubleshooting_queue_worker_build_now.png)

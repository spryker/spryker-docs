---
title: Slow Publish and Synchronization
description: Publish and Synchronization is slow on all or some actions.
template: troubleshooting-guide-template
last_updated: Feb 23, 2023
redirect_from:
    - /docs/scos/dev/troubleshooting/troubleshooting-performance-issues/slow-p-and-s.html
    - /docs/scos/dev/troubleshooting/troubleshooting-performance-issues/slow-publish-and-synchronization.html

related:
    - title: Troubleshooting RabbitMQ
      link: docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/troubleshooting-rabbitmq/troubleshooting-rabbitmq.html

---

Publish and Synchronization is slow on all or some actions.

## Cause

There are two possible causes for the slow PUblish and Synchronization:

* All the PUblish and Synchronization events go to the **event** message queue.

![an-event-message-queue](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/slow-p-and-s/an-event-message-queue.png)

* Messages that are not used on the project.

## Solution

1. [Integrate multi-queue publish structure](/docs/dg/dev/integrate-and-configure/integrate-multi-queue-publish-structure.html).
The Publish action, in this case, can look like this:

![publish-action](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/slow-p-and-s/publish-action.png)

2. Check and disable messages that are not used on the project.

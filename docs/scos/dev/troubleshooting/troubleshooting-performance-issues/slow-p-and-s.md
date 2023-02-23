---
title: Slow P&S
description: P&S is slow on all or some actions.
template: troubleshooting-guide-template
last_updated: Feb 23, 2023
---

P&S is slow on all or some actions.

## Cause

There are two possible causes for this:

* All the P&S events go to an **event** message queue.

![an-event-message-queue](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/slow-p-and-s/an-event-message-queue.png)

* Messages that are not used on the project.

## Solution

1. [Integrate multi-queue publish structure](https://docs.spryker.com/docs/scos/dev/technical-enhancement-integration-guides/integrating-multi-queue-publish-structure.html).
The Publish action, in this case, can look like this:

![publish-action](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/slow-p-and-s/publish-action.png)

2. Check and disable messages that are not used on the project.

## Related links:

https://docs.spryker.com/docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/troubleshooting-general-technical-issues.html  (Rabbit MQ section)

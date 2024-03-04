---
title: Redis session lock
description: Redis Session Lock
template: troubleshooting-guide-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-performance-issues/redis-session-lock.html

last_updated: Feb 23, 2023
---

Some actions, parts of the website, or the whole website is slow.

## Cause

A possible cause is the pessimistic Redis session Lock.

An example of a pessimistic Redis session Lock in the New Relic report:

![pessimistic-redis-session-lock-in-new-relic-report](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/redis-session-lock/pessimistic-redis-session-lock-in-new-relic-report.png)

## Solution

Follow the approaches from the [architecture performance guidelines](/docs/dg/dev/guidelines/performance-guidelines/architecture-performance-guidelines.html#optimistic-vs-pessimistic-locking).

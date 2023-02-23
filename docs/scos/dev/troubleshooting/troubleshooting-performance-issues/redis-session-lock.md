---
title: Redis Session Lock
description: Redis Session Lock
template: troubleshooting-guide-template
last_updated: Feb 23, 2023
---

Some actions, parts of the website, or the whole website is slow.

## Cause

A possible cause is the pessimistic Redis Session lock.

An example of a pessimistic Redis Session lock in the New Relic report:

TODO: add image from https://spryker.atlassian.net/wiki/spaces/CORE/pages/3696165904/Redis+lock

## Solution

Check performance guidelines: [Architecture performance guidelines](https://docs.spryker.com/docs/scos/dev/guidelines/performance-guidelines/architecture-performance-guidelines.html#optimistic-vs-pessimistic-locking)


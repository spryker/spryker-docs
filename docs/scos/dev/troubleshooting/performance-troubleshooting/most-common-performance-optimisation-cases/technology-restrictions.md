---
title: Technology restrictions
description: Technology restrictions
template: troubleshooting-guide-template
---

## Technology restrictions

Some actions, parts of website or all website is slow.

## Cause

Possible cause is technology restriction.

## Solution

Before using some technology we need to understand all the ups and downsides of it.

A beautiful example is Redis. It is fast. But if used in the wrong way can lead to some performance degradation. If we search against “*“ or “Wildkey“ in Redis with big DB we will see: 

NewRelic(DB): 

TODO: add image from https://spryker.atlassian.net/wiki/spaces/CORE/pages/3689710362/Technology+restrictions

NewRelic (Breakdown): 

TODO: add image from https://spryker.atlassian.net/wiki/spaces/CORE/pages/3689710362/Technology+restrictions

As we see here the majority of all time takes “Redis keys“. So this is something we would need to optimize!

How?

Update your functionality to use exact keys instead of “*“

How does it look in the code? Similar to


```$this->storageClient->getKeys(self::RESOURCE . ':*');```

More information: [KEYS](https://redis.io/commands/keys/)

What to do?

Learn your technology and check Profiling to guide you! 


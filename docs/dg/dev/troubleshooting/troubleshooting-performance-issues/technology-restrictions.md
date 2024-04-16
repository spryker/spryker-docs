---
title: Technology restrictions
description: Fix the issue with slow actions, parts of the website, or the entire webiste related to technology restrictions.
template: troubleshooting-guide-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-performance-issues/technology-restrictions.html

last_updated: Mar 1, 2023
---

Some actions, parts of the website, or the entire website are slow.

## Cause

A possible cause is technology restriction.

## Solution

Before using some technology, you need to understand all its advantages and disadvantages.

A good example is Redis. It is fast, but if used incorrectly, it can lead to performance degradation. If we search against `*` or `Wildkey` in Redis with a large DB, we get the following results:

NewRelic—DB:

![new-relic-db](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/technology-restrictions/new-relic-db.png)

NewRelic—Breakdown:

![new-relic-breakdown](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/troubleshooting/troubleshooting-performance-issues/technology-restrictions/new-relic-breakdown.png)

As you can see, the *Redis keys* take most of the time. Therefore, they need optimization. You can optimize them by updating your functionality to use exact [keys](https://redis.io/commands/keys/) instead of `*`.

In the code, this would look similar to this line:

```php
$this->storageClient->getKeys(self::RESOURCE . ':*');
```

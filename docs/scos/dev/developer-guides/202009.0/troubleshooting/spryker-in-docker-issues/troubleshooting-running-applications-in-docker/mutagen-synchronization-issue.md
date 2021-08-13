---
title: Mutagen synchronization issue
description: Learn how to fix the Mutagen synchronization issue
originalLink: https://documentation.spryker.com/v6/docs/mutagen-synchronization-issue
originalArticleId: 6df7c76d-4b87-4fd5-b805-b89764336c4b
redirect_from:
  - /v6/docs/mutagen-synchronization-issue
  - /v6/docs/en/mutagen-synchronization-issue
---

## Description
There is a synchronization issue.

## Solution
* Restart your OS.
* Run the commands:
```
docker/sdk trouble
mutagen sync list
mutagen sync terminate <all sessions in the list>
docker/sdk up
```

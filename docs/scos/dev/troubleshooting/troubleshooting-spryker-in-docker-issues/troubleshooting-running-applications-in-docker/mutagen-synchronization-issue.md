---
title: Mutagen synchronization issue
description: Learn how to fix the Mutagen synchronization issue
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mutagen-synchronization-issue
originalArticleId: c02d26b0-4cfd-4274-8253-c6ff27aa3b3d
redirect_from:
  - /2021080/docs/mutagen-synchronization-issue
  - /2021080/docs/en/mutagen-synchronization-issue
  - /docs/mutagen-synchronization-issue
  - /docs/en/mutagen-synchronization-issue
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

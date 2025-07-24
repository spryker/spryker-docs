---
title: Mutagen synchronization issue
description: Learn how to fix the Mutagen synchronization issue when running applications in docker with your Spryker projects.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mutagen-synchronization-issue
originalArticleId: c02d26b0-4cfd-4274-8253-c6ff27aa3b3d
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/mutagen-synchronization-issue.html
---

## Description

There is a synchronization issue.

## Solution

- Restart your OS.
- Run the commands:

```bash
docker/sdk trouble
mutagen sync list
mutagen sync terminate <all sessions in the list>
docker/sdk up
```

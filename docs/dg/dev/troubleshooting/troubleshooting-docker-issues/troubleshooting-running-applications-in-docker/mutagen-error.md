---
title: Mutagen error
description: Learn how to fix the Mutagen error when running applications in docker with your Spryker projects.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mutagen-error
originalArticleId: b1896a64-b124-48a9-9fc5-33c950a620ad
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/mutagen-error.html
---

## Description

You get the error:

```bash
unable to reconcile Mutagen sessions: unable to create synchronization session (spryker-dev-codebase): unable to connect to beta: unable to connect to endpoint: unable to dial agent endpoint: unable to create agent command: unable to probe container: container probing failed under POSIX hypothesis (signal: killed) and Windows hypothesis (signal: killed)
```

## Solution

1. Restart your OS.
2. If the error persists: Check [Mutagen documentation](https://mutagen.io/documentation/introduction).
